---
sidebar_position: 10
---

先前花了幾天的時間，終於把每次API發送前的安全規定的細碎精工給搞定了，也開了篇幅寫了一些關於十六進位轉換與Base64的差異等的小專題後，接下來就可以再回到使用情境面，來看我們身為商家角色要為我們的電商平台顧客提供怎麼樣的服務。

當我們顧客在選購商品服務到購物車後，確認為無時訂單會在此時建立，接著就要進到電商交易買賣的重頭戲--**線上付款**。

### 建立訂單且選擇提供顧客的付款方式

永豐銀行APIs的服務就可以在這個階段提供金流服務給客戶，目前提供了兩個線上付款的服務：

* 提供**虛擬帳號**供顧客進行轉帳付款服務
* 提供信用卡**線上刷卡**服務 (又分為有無**信用卡3D驗證**)

以上無論哪一種，在永豐API對應到的服務名稱都是`OrderCreate`

#### 實際呼叫OrderCreate：虛擬帳號篇

提供轉帳用的虛擬帳號給顧客，與信用卡刷卡、行動支付等比較起來，會是一個較不即時的行為。多半會給予顧客一定的期限，在顧客於一定時間內完成轉帳付款之後，我們預期會由永豐API主動告知我們(電商平台)顧客已完成付款，並且我們會把相關的訂單付款狀態作更新。

![https://ithelp.ithome.com.tw/upload/images/20210923/20130354NXTytMzxDK.png](https://ithelp.ithome.com.tw/upload/images/20210923/20130354NXTytMzxDK.png)

**階段一：由我們呼叫永豐API**

1. 訂單成立且顧客選擇希望付款方式為「銀行轉帳」
2. 我們依付款方式，呼叫`OrderCreate` API，並告知使用「虛擬帳號」服務。
   * 在這個步驟我們會順便傳送一個叫`BackendURL`的值，是為後續通知我們顧客付款狀態的更新
3. 取得API的回應，其中包含由永豐銀行依訂單產生的狀態、相關虛擬帳號等資訊，不過在此永豐會將回傳結果進行加密，我們需要反過來使用AES方式解密才能取得其中的交易資訊JSON。
4. 顯示在我們的頁面上，提示顧客轉帳的虛擬帳號，或轉至永豐提供的WebATM服務

**階段二：消費者付款行為**
5. 消費者可依期限內，透過其慣用的方法進行轉帳付款 (可以是實體ATM、線上非約定轉帳、線上WebATM…)

**階段三：永豐API端主動通知我們**
6. 在永豐銀行那端，只要在他所發出的虛擬帳號被繳款後，會有一個Mapping機制對應到當初我們傳送的`BackendURL`，因此會將該筆訂單的付款狀態查詢代碼(`PayToken`)傳到我們準備的接收網址。

**階段四：確認付款狀態**
7. 我們提供的網址若被永豐呼叫時，若能順利取得傳過來的`PayToken`，當然要自行撰寫程式去作好`PayToken`的儲存與管理工作。
8. 只要上面這個步驟有確實收到`PayToken`，就要先在Response中回報「成功結案」給永豐API。 (不然永豐API會再繼續發PayToken)。
9. 接下來就是要把剛剛的PayToken拿去問另一支API服務`OrderPayQuery`來取得該PayToken對應到的付款狀態細節。
10. 取得這些資訊後，我們應該要更新電商這筆訂單的付款狀態，讓消費者可透過電商頁來確認自己的付款狀態確定也是一致的。

### 簡單實作與驗證

開發規格書中，針對建立訂單交易的虛擬帳號，有以下的必填欄位：
| 參數名稱   | 說明                                                         | 我們的內容                                      |
| ---------- | ------------------------------------------------------------ | ----------------------------------------------- |
| ShopNo     | 商店號碼                                                     | NA0249_001                                      |
| OrderNo    | 訂單編號 (由商店產生)                                        | ex. A202109123456 (格式固定，但後六碼隨機動態產生)                                    |
| Amount     | 訂單總金額<br />需補上小數2位**。所以如果是10元，則Amount是1000。 | 79900<br /> 註：是799元，當然可設計隨機產生。                         |
| CurrencyID | 幣別<br />固定傳入`TWD`                                      | TWD                                             |
| PrdtName   | 收款名稱<br />最長60個中英文。                               | ATM虛擬帳號收款                                 |
| ReturnURL  | 將顧客導回付款完成頁面之網址                                 | https://127.0.0.1/sinopac/demoSite/payFinished/ (之後再實作) |
| PayType    | 收款方式<br />ATM虛擬帳號的話，固定傳入`A`。                 | A                                               |
| ExpireDate | 付款截止日<br />使用虛擬帳號為必填，若為2021/9/30，則填入20210930 | 執行日期+N天   

程式實作上會先以驗證與正確性為目標，主要把重點先放在發出request與取得response的結果符合預期為主，不會花太多時間在功能模組的設計，後面有時間再慢慢重構程式碼。

所以我會先走一遍Hard code版的request資料，之後再把類似OrderNo、Amount、ExpiredDate等值以訂單的產生器的方式作模擬，讓每次的訂單內容都可以有所不同以貼近真實的消費行為。

因此，一樣的我們盤點「階段一」的高階邏輯後，可大約展出下面的實作關鍵

1. 固定值準備：ShopNo、Hash四組代碼、產生Hash ID，儲存備用
2. 呼叫API取得Nonce值，儲存備用
3. 動態值準備：訂單號碼、總金保、虛擬帳號過期日期
4. 建立訂單訊息內文物件，並將上述相關值放入屬性中
5. 功能：處理AES加密流程，產生Message密文
6. 功能：處理安全簽章流程，產生Sign的SHA256
7. 建立OrderCreate的JSON物件，把上述產生的值放入屬性中，以此為request呼叫API
8. 解析API回傳的response，並進行AES解密
9. 判讀回傳狀態，並取出所需要資料以及處理後續流程

接著就可以開始來準備Python Code的實作了

```python
import urllib
import hashlib
import requests
import json
from Crypto.Cipher import AES 
from Crypto.Util.Padding import pad
import binascii
import datetime
from random import randrange
from datetime import date, timedelta, datetime
```

##### 程式說明

先引入我們會用到的module，由於我們會需要產生動態亂數的訂單號碼，所以會引入`random` module，以及要實作付款到期日，所以也需引入`datetime` module。

```python
shop_no = "NA0249_001"
A1, A2, B1, B2 = "86D50DEF3EB7400E", "01FD27C09E5549E5", "9E004965F4244953", "7FB3385F414E4F91"
```

##### 程式說明

上面shop_no與A1~A4的值是固定的，因此就先hard code寫在這裡。

```python
def bytes_xor_to_hexstring(ba1, ba2):
    return bytes([a ^ b for a, b in zip(ba1, ba2)]).hex()

def get_hash_id():
    ba_xor_A = bytes_xor_to_hexstring(bytes.fromhex(A1), bytes.fromhex(A2))
    ba_xor_B = bytes_xor_to_hexstring(bytes.fromhex(B1), bytes.fromhex(B2))
    return "{}{}".format(ba_xor_A, ba_xor_B).upper()

def get_new_nonce():
    url = "https://sandbox.sinopac.com/QPay.WebAPI/api/Nonce"
    req_param = {
        "ShopNo": shop_no
    }
    response = requests.post(url=url, json=req_param).json()
    return str(response["Nonce"])

def get_aes_iv(nonce):    
    return hashlib.sha256(nonce.encode('UTF-8')).hexdigest().upper()[-16:]
```

##### 程式說明

這邊準備了幾個function主要是將A1~A4 Hash代碼進行運算，主要產生Hash ID用途。
另外還有先前最早呼叫的取得nonce值的API。
有了nonce值後，就可以產生AES加密所需要的IV值。
以上可參考之前的文章：
[Day03 - [豐收款] 分析技術文件後，開始做個Nonce開胃菜吧！](https://ithelp.ithome.com.tw/articles/10266096)
[Day04 - [豐收款] 金流API的起手式，每次溝通都機密](https://ithelp.ithome.com.tw/articles/10266518)

在進行`message`的加密以及`sign`安全簽章之前，我們這次要模擬每次的訂單交易資料都不相同，因此我們要把原本完全hard code的shop_data訊息內文，寫一些function來動態產生資料。

明天再繼續，先前是將shop_data完全以開發規格書中的資料進行驗證，裡面的值都是死的，包含nonce值也是固定的。接下來我們將提供較為模擬且每次會不相同的訂單資料，然後來實際呼叫API。

* 產生亂數訂單(前面會帶入年、月，後面會產生亂碼訂單號，再依據「客戶是否會付款」進行尾碼處理)
* 可設定過期天數產生所需的過期日字串