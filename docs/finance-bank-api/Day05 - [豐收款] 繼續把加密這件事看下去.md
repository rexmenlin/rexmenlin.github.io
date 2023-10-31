---
sidebar_position: 6
---
中秋連假還要寫鐵人賽的文章真的是有一點吃力，雖然平常也只有晚上下班後可以撰寫文章，但連假畢竟有較多需要和家人一起互動的時間，要專注將心思放在文件撰寫與規格研究和測試上面，真的有一定的難度。

在昨天把Hash ID準備好後，接下來就是另一個要素：IV值。

#### IV值
在準備IV值前，稍為用很簡短的篇幅說明一下AES-CBC加解密法的明文、Key與IV的作用與關係。但由於解說AES原理的文章相當多，有興趣可以自行搜尋與閱讀，在此只解說讓沒用過AES-CBC的朋友了解為什麼我們需要這些東西的關鍵概念。


首先，AES-CBC是一個對稱式的區塊加密法，這裡的「對稱」指的是加密與解密所需要用到的**金鑰是相同**的，也就是上面提到的「Hash ID」或者「AES Key」。
而加密技術，伴隨而來的總是解密(被破解)的議題。如何增加被破解的難度與降低風險？簡單的說，如果你有一段一模一樣的明文，經由相同的金鑰去加密，很顯然的每一次執行加密，都會產生出一模一樣的結果。這樣對於有心人士若能夠獲取足夠的樣本資料，就有機會從中嘗試破解與分析，找出加密過程的可能規則。

於是就有了IV初始向量的概念，簡單說IV並非「密碼」，在原本加密過程中再加上一個參數(原則上每一次的加密IV都要不一樣)，如此一來，可讓原本**相同明文**使用**相同金鑰**產生的密文結果具備高度的差異性，因此可大大增加破解與分析的困難性。

還記得前面提到每一次要呼叫API時都要重新問一次且60秒就會過期的`Nonce`值嗎？他就是為了產生每次做AES-CBC區塊加密的IV值作為的基礎。

接下來就是要進行永豐API中雙方約定好的IV產生方式，也就是要把Nonce再進行一些些加工。

![https://ithelp.ithome.com.tw/upload/images/20210918/20130354Fn6DB6bnq7.png](https://ithelp.ithome.com.tw/upload/images/20210918/20130354Fn6DB6bnq7.png)

開發規格書中提到IV的產生方式
> Nonce 值經過 SHA256 運算後取右邊 16 位元字串

又出現了一個關鍵字`SHA256`，一樣簡單描述一下，SHA256是安全雜湊演算法2(SHA-2, Secure Hash Algorithm)的一個實作版本，而雜湊的目的是可快速的將任何不固定長度的原文經過演算後導出一個固定長度的摘要(摘要長度會依實作版本不同)。

> 若有需要進一步了解，這篇文章解釋的蠻清楚的：https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/602774/


從`原文A`→`HASH運算`→`摘要B`的過程，可以當成一種產生識別性代號的過程，而且是不可逆的(無法從B轉回A)，但需要強調的是這並非是「加密」之目的。他可以提供的好處是一來可不需拿A明文來做資料交換之使用，只需使用轉化過且較短的摘要B來使用，因為B摘要有一定程度可代表的是A所壓縮演化來的，即使稍為被修改過1%內容的A'，產生出來的摘要會和B有顯著的不同。

另一種目的是我在不需要儲存紀錄A原文的狀態下，要知道這個A和當初的A是相同的時候，只需要儲存紀錄相對應的摘要B，和即時作Hash運算後看B是否相同，可以以此推論來源的A是相同的。例如一般的會員系統中，在資料庫中為了避免資料可能外洩或被有權限取得資料的人非法使用，因此不會儲存會員的明文密碼，僅會儲存摘要雜湊碼，在會員登入時才動態比對兩者的摘要是相同。這也就是許多網站點選「忘記密碼」時，只能讓你重新改掉密碼，而無法「提供當初你的密碼」給你的原因。

因此如果有網站的「忘記密碼」功能可以把原本你的明文密碼寄給你的話，就要小心一下這個網站保護會員機敏資料的方式了。


接著我們就使用Python語言來實作一下，透過相關的雜湊套件即可快速產生我們要的結果，但在此之前可先使用SHA256 Online的網站先行確認一下我們想要做的結果會是什麼。
由於Nonce值是每一次都需要重啟，我們目前先是驗證運作的可行性，因此可以先拿開發規格書中的Nonce值來進行基礎的驗證。

(上面放入Nonce的值，下方會是SHA256的結果，但我們只需要最右邊16位字串)

https://emn178.github.io/online-tools/sha256.html

![https://ithelp.ithome.com.tw/upload/images/20210918/201303540bnS3R2S6D.png](https://ithelp.ithome.com.tw/upload/images/20210918/201303540bnS3R2S6D.png)

因此我們用Python程式來撰寫時，也希望可以拿到右側尾碼的`CB6FA68E42B655AB`這個結果。

```python
import hashlib
nonce = "NjM2NjA0MzI4ODIyODguMzo3NzI0ZDg4ZmI5Nzc2YzQ1MTNhYzg2MTk3NDBlYTRhNGU0N2IxM2Q2M2JkMTIwOGU5YzZhMGFmNGY5MjA5YzVm"
iv = hashlib.sha256(nonce.encode('UTF-8')).hexdigest().upper()[-16:]

print(iv)
#output: CB6FA68E42B655AB
```

##### 程式說明
使用Python的SHA先引入hashlib，將nonce以`UTF-8`編碼格式進行SHA256的16進位雜湊演算後，再依規定轉成全大寫字，並取得右側末位的16個字元作為IV最終結果。

看起來是成功的，這個輸出結果和我們使用SHA256 Online的網站看到的是一樣的。

#### 食材蒐集好了，可以進行AES加密了！
我們花了一些時間，終於把`內文訊息`、`Hash ID (AES Key)`、`IV`三樣食材準備好了，接下來就可以運用最後的AES-CBC神奇區塊加密鍋，把最終需要的成品`Message`給製作出來。

![https://ithelp.ithome.com.tw/upload/images/20210918/20130354hax9GSbcEk.png](https://ithelp.ithome.com.tw/upload/images/20210918/20130354hax9GSbcEk.png)

把上面這三樣再作個盤點整理：
1. 訊息內文
```python
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

2. Hash ID (AES Key)
```
87282A2FA0E209EBE1B3713AB56A06C2
```

3. IV值
由於IV值是每次都要從Nonce取用得來，因此這個值會是每次都不同的。

永豐提供了一個加解密測試頁面，我們就以使用測試網頁產生的值作為目標值，設法撰寫Python程式一步步達到和上面一模一樣的Message內文。
測試頁面：
https://sandbox.sinopac.com/QPay.ApiClient/Calc/Encrypt

![https://ithelp.ithome.com.tw/upload/images/20210919/20130354OV3RynyaO5.png](https://ithelp.ithome.com.tw/upload/images/20210919/20130354OV3RynyaO5.png)

![https://ithelp.ithome.com.tw/upload/images/20210919/20130354RA41tmGv9f.png](https://ithelp.ithome.com.tw/upload/images/20210919/20130354RA41tmGv9f.png)


首先會需要使用Python的AES功能前，要先確認是否有安裝`PyCryptodome`套件。
相關用法可參考官方文件：
https://pycryptodome.readthedocs.io/en/latest/src/cipher/classic.html#cbc-mode


Python Code如下：

```python
import json
from Crypto.Cipher import AES 
from Crypto.Util.Padding import pad

shop_data = {"ShopNo":"NA0001_001","OrderNo":"201807111119291750","Amount":50000,"CurrencyID":"TWD","PayType":"C","ATMParam":{},"CardParam":{"AutoBilling":"N","ExpMinutes":30},"PrdtName":"信用卡訂單","ReturnURL":"http://10.11.22.113:8803/QPay.ApiClient-Sandbox/Store/Return","BackendURL":"https://sandbox.sinopac.com/funBIZ.ApiClient/AutoPush/PushSuccess"}

data_string = json.dumps(shop_data, ensure_ascii=False, separators=(',', ':'))

print(data_string)
#output: {"ShopNo":"NA0001_001","OrderNo":"201807111119291750","Amount":50000,"CurrencyID":"TWD","PayType":"C","ATMParam":{},"CardParam":{"AutoBilling":"N","ExpMinutes":30},"PrdtName":"信用卡訂單","ReturnURL":"http://10.11.22.113:8803/QPay.ApiClient-Sandbox/Store/Return","BackendURL":"https://sandbox.sinopac.com/funBIZ.ApiClient/AutoPush/PushSuccess"}

key = b"4DA70F5E2D800D50B43ED3B537480C64"
iv = b"346BBE8E3F34FFEA"

cipher = AES.new(key=key, mode=AES.MODE_CBC, iv=iv)
message = cipher.encrypt(pad(bytearray(data_string, 'utf-8'), AES.block_size))

print(message.hex().upper())

#output: 4FE341D3A8C30C9A50573F3008F7B1CA8DD96FB2A4346D83936E5C4FDB21E87BA9E3D36A6635C6F5EBBD5438F3CA8FE97DEBB2ADBC82F92BF3C840B3128D8F00116536E7C936D7D587F6220C52C1367DF2BE9CBB16C6A7C6242AA8B38CD2E576328CF727E50FFA49B4F9FBE5DF10986C5299F9FC26E23E956AFDFB92B731FDA84ABEF1C89E0CD0A8CA8F7C23DC2D06E12A6F916EC47CDD9B4D4F87AC0B687EE1088A19F2C35C0FD8B0C97745B926FBAA48FEEDEB826C2C22743DB46781FF220ECA409FC150908540271E60184729C08C73275C54125C3F814FF33CA79A0E1B3902D446925FCC8235809FCBAB7E372D8C29E424CEFF0AD1CBD41E843714EB365158F2FC0B2E6FB48176D5CFF6B68F4BED4D7484C1A4723ABD059DA64A6703B30B0199B170FDF059899552FA1818ABA5B0D0E21014513985A738D59851EDF0B1CFB36A7B7B727109BE7789D284C75E5D694DFC9B7060DCBFD8C7915C95C4E0F29B

```

##### 程式說明
由於`內文訊息`是JSON格式，而Python的Dictionary Object本身就支援了幾乎和JSON是相同結構的表示法，因此可先以此方式準備這個內文訊息內容，再將之轉換成json格式的字串。

但這邊有幾點要格外注意：
1. 使用json.dumps()可直接將Python的Dictionary Object轉換成JSON字串
2. 若直接不帶額外參數轉換出來的JSON字串，會和永豐測試頁面的JSON字串有些許差異(中文會變成ASCII字符顯示而非中文，且dumps出來會加上一些空格。這樣最後做出來的AES加密結果會不同。

如果我們沒有修正，則內文dumps轉出後會呈現下面的情況：(注意原本中文的地方，以及多加上的空格)
```
{"ShopNo": "NA0001_001", "OrderNo": "201807111119291750", "Amount": 50000, "CurrencyID": "TWD", "PayType": "C", "ATMParam": {}, "CardParam": {"AutoBilling": "N", "ExpMinutes": 30}, "PrdtName": "\u4fe1\u7528\u5361\u8a02\u55ae", "ReturnURL": "http://10.11.22.113:8803/QPay.ApiClient-Sandbox/Store/Return", "BackendURL": "https://sandbox.sinopac.com/funBIZ.ApiClient/AutoPush/PushSuccess"}
```

因此我們在json.dumps()中傳入兩個參數來修正：
* 使用`ensure_ascii=False`讓字串以非ASCII碼呈現
* 使用`separators=(',', ':')`重新定義產生出來的JSON分格字符，原本逗號與冒號後會多帶一個空格，現在重新定義無空格版本給它。

修正完的結果就會是我們要的了 (無空格、ASCII亂碼修正)
```
{"ShopNo":"NA0001_001","OrderNo":"201807111119291750","Amount":50000,"CurrencyID":"TWD","PayType":"C","ATMParam":{},"CardParam":{"AutoBilling":"N","ExpMinutes":30},"PrdtName":"信用卡訂單","ReturnURL":"http://10.11.22.113:8803/QPay.ApiClient-Sandbox/Store/Return","BackendURL":"https://sandbox.sinopac.com/funBIZ.ApiClient/AutoPush/PushSuccess"}
```

而在AES加密過程時，除了把原明文資料、AES Key、IV的bytearray傳入，在cipher.encrypt()加密時要符合區塊長度的倍數，AES使用128 bit(16 bytes)的區塊長度，因此我們的明文也需要符合其倍數規則，因此可透過Crypto.Util.Padding中的pad()方法來作padding填補，所以在將明文的bytearray取出後可帶入`AES.block_size`作為填補參數。
例如原本內文長度為349 Bytes，經pad()後會自動填補為符合16 Bytes倍數規範的352 Bytes。

### 終於把Message密文準備好了
經過了這一連串的備料準備後，終於把傳說中的`Message`密文準備好了！
但還沒完呢，除了我們準備好的密文外，還有一個重要的安全簽章`Sign`要準備，才可以把最終呼叫API的所需欄位備齊。