---
sidebar_position: 5
---
昨天用了Postman先小試身手，從測試環境取得了必要的發語詞Nonce的值(還記得這個60秒就會過期了吧)，現在要來了解一下正式使用API溝通的時候會需要的一些流程。

接下來其實不會以永豐開發規格書的順序來實作，會以我認為較符合情境順序的方式來說明。首先我們在呼叫API前，要先拆解一下所需要的必要項目。

在規格書中會看到這張圖：

![https://ithelp.ithome.com.tw/upload/images/20210918/20130354B5NxWkdKmH.png](https://ithelp.ithome.com.tw/upload/images/20210918/20130354B5NxWkdKmH.png)

主要說明的是每一次的API呼叫(不管你是要用哪一種服務，舉凡是要建立訂單用信用卡支付、還是要查詢付款狀態等)，都會需要的6個欄位以及其來源提供方和組成的方式。

所以先搞定這個麻煩的起手式組成，接下來才能好好的來看應用面。



除了開發規格書有整理的表面，我也針對這6個必要欄位作說明：(我認為要先解釋Message後，才解釋Sign比較清楚)

| 參數       | 說明                                                         |
| ---------- | ------------------------------------------------------------ |
| Version    | API版本，目前能傳的為固定值："1.0.0"                         |
| ShopNo     | 我們從永豐取得的商店代號固定值："NA0249_001"                 |
| APIService | 要呼叫的API服務名稱，目前有四支可呼叫：<br />"OrderCreate"<br />"OrderQuery"<br />"OrderPayQuery" |
| Nonce      | 從Nonce API服務中取得，每次呼叫都要記得拿新的放入。          |
| Message    | 經AES加密演算法後的交易訊息內容`密文`<br />註：運算細節文章中再來說明 |
| Sign       | 安全簽章，主要用途是API接收端可用來驗證上面的Message在傳遞過程中沒有被非法篡改過。<br />註：運算細節文章中再來說明 |

很顯然的，除了那些固定或選擇性範圍的值之外，我們必須花一點篇幅來解釋一下的是`Message`和`Sign`這兩個欄位，這兩個看似複雜的欄位也是銀行依金管會所頒佈的「電子銀行業務安全控管作業基準」的安全設計原則中有關「訊息隱密性」以及「訊息完整性」、「無法否認傳送訊息」等而對應的設計。

### Message欄位的組成

Message欄位的組成，依開發規格書說明如下：

> 可還原的原始交易`訊息內文` +`HashID (32 位元值 )`+`IV (16 位元值)` 三要素進行 AES CBC 加密產生 。

因此從這句話來拆解，又可分為其中三個要素：

* **訊息內文** (JSON格式，規格需依所需叫用的服務而定)
* **Hash ID** (從我們一開始Email中取得的4個Hash神秘編碼運算而來)
* **IV值** (Initial Vector，初始向量值)

先準備好上面三個要素後，再把它們用`AES加密演算法(CBC)`摻在一起做成撒尿牛丸(?)，上面所需要的`Message`欄位就是這樣來的。

不過在看了開發規格書中的加/解密範例網址，「Hash ID」這個名稱似乎有些前後命名不一致，在該網址中是稱作「AES Key」，我比較偏好的是這個命名。

總之，在AES-CBC加密過程會需要`加密金鑰(AES Key)`以及`初始向量(IV)`，將原本明文的內文加密成密文。
接下來就是一一把這過程所需的要素準備好。

#### 訊息內文

依據要呼叫的不同API服務，會有定義所需要傳遞給永豐API銀行端的一套訊息內文欄位。

我們就先以`建立訂單交易 (信用卡訂單)`作為範例，目前我們的重點是在於理解Message與Sign的產生過程，因此訊息內文可先以開發規格書中的範例作內容即可(先不用理解每個JSON欄位的意義)，後續我們套用到自己的情境時再來講究內容的設計與選用。

```
{
    "ShopNo": "NA0249_001",
    "OrderNo": "C201804300001",
    "Amount": 50000,
    "CurrencyID": "TWD",
    "PayType": "C",
    "CardParam": { "AutoBilling": "Y" },
    "PrdtName": "信用卡訂單",
    "ReturnURL": "http://10.11.22.113:8803/QPay.ApiClient/Store/Return",
    "BackendURL": "http://10.11.22.113:8803/QPay.ApiClient/AutoPush/PushSuccess"
}
```

以上就是我們所需要的`訊息內文`的JSON內容，接著往下看。

#### Hash ID

也就是上面談到的「AES Key」(加密金鑰)，這個Hash ID欄位的組成，依開發規格書說明如下：

> Hash ID 是透過位元運算(XOR)將四組 Hash 計算產出的， 將 A1/A2 以 XOR 運 算所得的字串， 再 與 B1/B2 以 XOR 運算 出來的字串，二個相加後將英文轉換為大寫， 為長度為 32 的字串 (例 : 17D8E6558DC60E702A6B57E1B9B7060D)

![https://ithelp.ithome.com.tw/upload/images/20210918/201303541HsP5BbZO7.png](https://ithelp.ithome.com.tw/upload/images/20210918/201303541HsP5BbZO7.png)

快把Email中收到的四個Hash碼拿出來，前兩個一組做XOR運算，後兩個一組XOR運算，再把兩組運算後的字串拼接在一起後，轉成全大寫，這就是我們需要的Hash ID。

我們直接使用Python來跑一次：

```python
A1, A2, B1, B2 = "86D50DEF3EB7400E", "01FD27C09E5549E5", "9E004965F4244953", "7FB3385F414E4F91"

def bytes_xor_to_hexstring(ba1, ba2):
    return bytes([a ^ b for a, b in zip(ba1, ba2)]).hex()
    
ba_xor_A = bytes_xor_to_hexstring(bytes.fromhex(A1), bytes.fromhex(A2))
ba_xor_B = bytes_xor_to_hexstring(bytes.fromhex(B1), bytes.fromhex(B2))

hash_id = "{}{}".format(ba_xor_A, ba_xor_B).upper()
print(hash_id)  
#output: 87282A2FA0E209EBE1B3713AB56A06C2
```

##### 程式說明

在上面的`bytes_xor_to_hexstring()` function中，主要是可接受兩個一組的Hash參數值(bytes型別)，並將這兩組bytes使用zip()將每個同index的元素組成兩兩一組，再進行`XOR`的運算，最終將這樣的運算結果以Python獨特的List comprehension產生新的XOR結果的List。

由於XOR後會是一般的List，因此需要使用bytes()轉型後，再使用hex()方法將其結果轉換為16進位(HEX)字串。

在呼叫上述function之前，需要使用bytes.fromhex()將16進位樣式的字串轉換成bytes，才可傳入`bytes_xor_to_hexstring()`中。

最後將A1/A2產生的字串結果和B1/B2產生的字串結果作字串拼接起來再一起使用upper()轉成大寫，這就是我們的目標Hash ID的值。

> Production版本的擴充建議：
>
> 若是真的要運用在Production環境，可以考慮到以下幾點：
>
> * 進行四個Hash值的特定長度以及16進位字多的檢查
> * 兩兩進行比對時確認長度相同 (第一點若有實作，其實已可滿足)
> * 這四個值即使看起來不會有所變動，但仍然應從外部屬性檔中讀入，而非寫死在程式碼中

另外補充說明一下，既然是AES的對稱加密，因此我們辛苦產生的這把金鑰：Hash ID，既然原先的4組Hash代碼是由永豐提供給我們，就表示對於我們這個商家而言，他們也必然會擁有和我們一樣的Hash ID。以便我們在未來作加密後的API溝通的內容，永豐API在收到密文的內容是有辦法使用解密法解開，還原回原文。

好囉，把AES-CBC加密需要的金鑰(Hash ID)也準備好了，接下來就是IV值的準備！明日再寫。
