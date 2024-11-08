---
sidebar_position: 7
---
在昨天講完了`Message`的密文產生細節流程後，回過頭來我再來談`Sign`安全簽章，我認為這順序比較容易理解。其實這整段API的呼叫，可分為幾個要素：
* 溝通真正的主體：**訊息內文**
* 機密目標1： 不可被有心人士攔截訊息；即使被攔截了，也要確保訊息內容不被解析。
  若無法達成，會造成以下問題：
    * 機敏訊息被他人取得
    * 訊息被神不知鬼不覺地篡改與重送
    解決方法：將訊息內文進行**加密**
* 機密目標2： 若不幸訊息被攔截、破解、篡改或送重，要能夠有機制驗證與識別出來。
    * 需將`訊息內文`以及上述作AES加密的`AES Key`與`IV`的**產生依據** (也就是並非直接拿金鑰或IV來運用)，由API端講定規則，將上述要素透過安全雜湊的演算法產生數位簽章。

### 接收端如何作驗證？
由傳送端(商家)依規則與重要元素產生的數位簽章，
當商家呼叫API時，先前已經經由AES對稱加密法產生出密文`Message`，因此接收端(永豐API)當然有與加密相同的`AES Key`來對密文作解密。因此接收端目前可從中取出`訊息內文`的明文。

接著，永豐API會另外收到一個安全簽章`Sign`，還記得當初是如何產生這個`Sign`的方法嗎？
再複習一次：「需將`訊息內文`以及上述作AES加密的`AES Key`與`IV`的**產生依據** (也就是並非直接拿金鑰或IV來運用)，由API端講定規則，將上述要素透過安全雜湊的演算法產生數位簽章。」

剛剛已經從AES解密拿回`訊息內文`了，那剩下的**產生依據**，既然當初這些都是永豐提供的，他們當然都有這些值。只需要依據講好的規則，再運作一次，然後「**比對這個剛剛做出來的Sign和商家傳來的Sign是否相同**」即可。(因為雜湊演算法是不可逆推的，因此只需比對結果是否一樣就好)

當然，其中還會有機制去多比對Nonce值是否在效期內，以及是否被重覆使用過，甚至判斷是否為商家的IP等。這些上面說明的所有作法的目的，都是為了驗證一件事：
「即使API收到了一個密文，也順利解開，看起來也很合理的內容，到底是不是該商家傳來的」

但有一個很重要的前提是，商家有好好保護自己的機敏訊息：**那4個需要拼了命保護不可洩漏的Hash代碼。**
雖然商店編號(ShopNo)也很重要，因為有這個就可以透過API問到Nonce值，但我相信正式的運作機制下，在申請服務的初期就會綁定好商家主機固定IP。因此即使其他人亂猜中商店編號，無法從正確的IP位置發送訊息是會被拒絕的。

### 說了這麼多，來實作吧
Sign的製作材料會需要三個：
* 訊息內文
* Nonce
* Hash ID

最後把上述三個黏起來後再做一次`SHA256`

#### 「訊息內文」需要加工一下
這個訊息內文不是直接把我們打算要傳的JSON格式直接傳出去，而是要符合以下規格：
> * 先移除所有空值的參數，參數值前後不可有空白。
> * 將剩餘所有參數值依照「參數名稱」由小至大排序 (不分大小寫即 A < B and a < B )，組成如param1=value1&param2=value2 的字串。
> * 如為多節點參數則不參與 sign 值演算 。

![https://ithelp.ithome.com.tw/upload/images/20210919/20130354dF1ZoqgKBU.png](https://ithelp.ithome.com.tw/upload/images/20210919/20130354dF1ZoqgKBU.png)

所以這張規格書的內文JSON範例的黃色部份，就是依據上面規則後需要放入的屬性與值。
沒標黃色的為「空值」或是「多節點參數」，沒有入場券，因此他們就不要放進去了。

我們一樣先以開發規格書中的範例內容進行處理，先確保寫出來的Python程式可以達成和他一樣的結果。
這裡面的處理有一些地方需要慢慢處理與嘗試，光完成這些步驟就花了一點時間，先看一下完整的Python Code：

```python
import urllib

shop_data = {
    "ShopNo": "BA0026_001", "OrderNo": "A201804270001", "Amount": 50000, "CurrencyID": "TWD", "PayType": "A",
    "ATMParam": { "ExpireDate": "20180502" },
    "CardParam": { },
    "ConvStoreParam": { }, "PrdtName": "虛擬帳號訂單", "ReturnURL": "http://10.11.22.113:8803/QPay.ApiClient/Store/Return", "BackendURL": "http://10.11.22.113:8803/QPay.ApiClient/AutoPush/PushSuccess"
}

print("* The original dictionary : {}".format(shop_data))
# Output: * The original dictionary : {'ShopNo': 'BA0026_001', 'OrderNo': 'A201804270001', 'Amount': 50000, 'CurrencyID': 'TWD', 'PayType': 'A', 'ATMParam': {'ExpireDate': '20180502'}, 'CardParam': {}, 'ConvStoreParam': {}, 'PrdtName': '虛擬帳號訂單', 'ReturnURL': 'http://10.11.22.113:8803/QPay.ApiClient/Store/Return', 'BackendURL': 'http://10.11.22.113:8803/QPay.ApiClient/AutoPush/PushSuccess'}

def check_passed_rule_param(value):
    if value is None:
        return False
    elif type(value) is dict or type(value) is list:
        return False
    elif type(value) is str and not value.strip():
        return False
    else:
        return True

sorted_shop_datat = {key: shop_data.get(key) for key in sorted(shop_data.keys(), key=str.casefold)}
print("* sorted_shop_datat: {}".format(sorted_shop_datat))
# Output: * sorted_shop_datat: {'Amount': 50000, 'ATMParam': {'ExpireDate': '20180502'}, 'BackendURL': 'http://10.11.22.113:8803/QPay.ApiClient/AutoPush/PushSuccess', 'CardParam': {}, 'ConvStoreParam': {}, 'CurrencyID': 'TWD', 'OrderNo': 'A201804270001', 'PayType': 'A', 'PrdtName': '虛擬帳號訂單', 'ReturnURL': 'http://10.11.22.113:8803/QPay.ApiClient/Store/Return', 'ShopNo': 'BA0026_001'}

removed_rule_values_shop_data = {key: value for key, value in sorted_shop_datat.items() if check_passed_rule_param(value)}
print("* removed_rule_values_shop_data: {}".format(removed_rule_values_shop_data))
# Output: * removed_rule_values_shop_data: {'Amount': 50000, 'BackendURL': 'http://10.11.22.113:8803/QPay.ApiClient/AutoPush/PushSuccess', 'CurrencyID': 'TWD', 'OrderNo': 'A201804270001', 'PayType': 'A', 'PrdtName': '虛擬帳號訂單', 'ReturnURL': 'http://10.11.22.113:8803/QPay.ApiClient/Store/Return', 'ShopNo': 'BA0026_001'}

urlparam = urllib.parse.urlencode(removed_rule_values_shop_data)
print("* urlparam: {}".format(urlparam))
# Output: * urlparam: Amount=50000&BackendURL=http%3A%2F%2F10.11.22.113%3A8803%2FQPay.ApiClient%2FAutoPush%2FPushSuccess&CurrencyID=TWD&OrderNo=A201804270001&PayType=A&PrdtName=%E8%99%9B%E6%93%AC%E5%B8%B3%E8%99%9F%E8%A8%82%E5%96%AE&ReturnURL=http%3A%2F%2F10.11.22.113%3A8803%2FQPay.ApiClient%2FStore%2FReturn&ShopNo=BA0026_001

urlparam_no_percent_encode = urllib.parse.unquote(urlparam).replace("+", " ")
print("* urlparam_no_percent_encode: {}".format(urlparam_no_percent_encode))
# Output: * urlparam_no_percent_encode: Amount=50000&BackendURL=http://10.11.22.113:8803/QPay.ApiClient/AutoPush/PushSuccess&CurrencyID=TWD&OrderNo=A201804270001&PayType=A&PrdtName=虛擬帳號訂單&ReturnURL=http://10.11.22.113:8803/QPay.ApiClient/Store/Return&ShopNo=BA0026_001

```

##### 程式說明
幾個地方需要處理：
* 不分大小寫，將JSON中的`屬性(Key)`的部份作排序(A->Z)
* 僅保留符合規則的屬性
* 將JSON中的屬性鍵值轉成類似URL的參數方式相接呈現
* 使用URLEncode模組轉出會以URI percent-encoding rules方式呈現屬性值(會加上百分比符號開頭)，要再轉換回UTF-8編碼(主要是讓中文正確顯示)

**1. 忽略大小寫的重新排序**
將原面JSON的物件的Key值作sorted()，以字串方式排序，但要加上`str.casefold`才會忽略大小寫的ASCII值。先取得排序過後的Key List後，再使用Dictionary Comprehension方法把排序過後的物件(以Dictionary結構組成)產生回來，如此一來我們就拿到了屬性排序過後的JSON。

**2. 去掉不要的屬性**
我們先準備好一個規則過濾的布林function，主要是用在Dictionary Comprehension後的if條件式。意思就是我們把原本已排序好的新Dictionary重新跑一遍，只會留下規則過濾器結果為True的值。所以我們就會拿到那些沒有「多節點」或「空值」的內文版本。

**3. 使用URLEncode模組幫忙轉出**
透過好用的urllib.parse.urlencode()就可以將Dictionary轉出成URL的參數表示法。但這裡轉出後會將非英數字的符號或編碼轉成以百分比開頭的URI percent-encoding rules編碼文字。

**4. 把文字編碼的呈現再最後調整一下**
永豐文件中是會希望保留原始帶有類似中文的內文去做後續雜湊運算，因此我們需要再加一點工。透過urllib.parse.unquote()方法將百分比編碼法則再轉回原本的編碼。另外若原本參數裡面(不是前後)有空白的話，轉出來的url參數會將空白變成`+`，因此要再換回來一次，否則`Sign`的內容會因此而有所差異。

透過上面的步驟處理，我們就能夠取得`訊息內文`的部份。

#### 後面還有兩個跟屁蟲

![https://ithelp.ithome.com.tw/upload/images/20210920/20130354raQrsODH8h.png](https://ithelp.ithome.com.tw/upload/images/20210920/20130354raQrsODH8h.png)

但在開發規格中，把上面最終我們取得的URLEncode這串結果稱之為「內文**雜湊**」，我個人認為這個步驟使用**雜湊**這個詞彙似乎是不太正確。這裡沒有用到任何雜湊的技術。

接下來還要再做兩個相當簡單的動作，將是將Nonce和Hash ID拼在上面這一串的後面，但文件中把這三個拼接在一起的產出結果稱之為「字串**雜湊**」，我一樣是覺得這個動作也沒有雜湊在裡面。~~(難道是雜亂的湊在一起！？)~~

總之，把這三個再拼接起來後，就可以進行最終的SHA256處理，離成功就在不遠處！

```python
import hashlib

nonce = "NjM2NjA0MzI4ODIyODguMzo3NzI0ZDg4ZmI5Nzc2YzQ1MTNhYzg2MTk3NDBlYTRhNGU0N2IxM2Q2M2JkMTIwOGU5YzZhMGFmNGY5MjA5YzVm"
hash_id = "17D8E6558DC60E702A6B57E1B9B7060D"

final_shop_data = "{}{}{}".format(urlparam_no_percent_encode, nonce, hash_id)
print(final_shop_data)
# Output: Amount=50000&BackendURL=http://10.11.22.113:8803/QPay.ApiClient/AutoPush/PushSuccess&CurrencyID=TWD&OrderNo=A201804270001&PayType=A&PrdtName=虛擬帳號訂單&ReturnURL=http://10.11.22.113:8803/QPay.ApiClient/Store/Return&ShopNo=BA0026_001NjM2NjA0MzI4ODIyODguMzo3NzI0ZDg4ZmI5Nzc2YzQ1MTNhYzg2MTk3NDBlYTRhNGU0N2IxM2Q2M2JkMTIwOGU5YzZhMGFmNGY5MjA5YzVm17D8E6558DC60E702A6B57E1B9B7060D

sign = hashlib.sha256(final_shop_data.encode('UTF-8')).hexdigest().upper()
print(sign)
# Output: A3EAEE3B361B7E7E9B0F6422B954ECA5D54CEC6EAB0880CB484AA6FDA4154331
```

##### 程式說明
這邊要處理的事情其實蠻簡單的，把許久不見的`Nonce`和`Hash ID`再請出來，然後字串黏一黏之後，用我們先前做過要產生Hash ID時的SHA256一樣，依樣畫葫蘆，就可以產生出最後的大魔王`Sign`了！

### 終於把API前置所需準備好了
為了要完成之後的每一次API叫用，我們一步一步把所需要的屬性都一個一個驗證且實作出來了，最困難的當然就是`Message`和`Sign`，接下來我們就可以使用我們自己產生的資料，來正式對永豐API作呼叫囉！
	