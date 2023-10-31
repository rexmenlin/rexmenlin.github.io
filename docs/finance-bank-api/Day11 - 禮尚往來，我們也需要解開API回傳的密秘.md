---

sidebar_position: 12
---

回顧昨天拿到的response，乍看之下以為API將我們傳給他的內容原封不動傳回來了。
但實際上比對一下內容就會發現，API也給了我們一串我們需自行解開的密文。

其中有三個關鍵：

* Nonce
* Sign
* Message

請睜大眼睛看一下，這個Nonce和我們傳給他的Nonce**不一樣**，所以千萬不要拿自己剛那個Nonce自作聰明的往下作。

在我們經過這麼多天的特訓後，應該閉著眼睛都可知道如何解開這個密文，以及驗證這個密文是由永豐API正確無誤無遭人竄改的內容吧！

```python
#-- Response: {'Version': '1.0.0', 'ShopNo': 'NA0249_001', 'APIService': 'OrderCreate', 'Sign': '8A001F83ABF5EAF292119ADBFDBCFE7F34A535781E8F77A7B0D09A9FD56E90BF', 'Nonce': 'NjM3NjgxMDcxMzg2OTUuMTo4MTQwODE2NzBiMGUyYTdiNTAzZDExN2Q5NDhmOGMzMTVlZWRhOGI5ODY2OGUyOGNkMGFiM2MzZDhiNGEzZGRi', 'Message': '4AAC75A87C46EC473D94FFFB270DCAF3263CC5DB5F3E49ABCEE8E28A073F16D750469AEE4E77A1F0237DEA7043CD79273E0300D94286C81DF70B4A2C2BEA54DDA7AE4F137D109E9E6FBF4494FDCA9749C61F1DD9A30CFC7A831735D5811B26FAABC23B7C1E6CD7329974AE866EC2A72F09574E2A0C334A8F227FFF1462489E8187CCE9986940272C7B7BB1A676171F898D03909CD96EA6981B6EA7CB02003ED4DC1D95190F76DCB071E4BEDDDB55BB4D1EC7B06681D0FA583051112DDC36B1A3459A14C28789E5EBF02451EC77AC0F0DDBE00D2B07FF0D7BE195E866AF3D341CC21E8C346D2A72C4541898595F81AB60894049A32A5C551C91E4F492EF3F33F32268A8EDAB1AFBAA49F6ED1833BFD756F1955FA6BB1A3FC38773FE42E53DA5B82911073356C3A2211DE51810C5CDB54E73FFCC67BA0441BB7F53BCB4D640BD73F06336BE1FEA4A0ACFA316F07F0A5FE232380CBF245AF01777BBDF770EDD08F77F853BDC2715FDA066F271C58F31424C47B1593829E7D67A5105224AEBF10D99DB2CFC9F6483440601DAACFB20251D724DFD8447C0A28408921966A3084E97C564017973A9B8CED71F00371F391663196D8021CEF2B74C86AF0EACD275A5BFE8F2D1B787648F64EF2CCEB4CB8834B8E1'}
```

```python
def aes_dec(data_string, resp_nonce):
    hash_id_ba = hash_id.encode("utf-8")    
    iv_ba = get_aes_iv(resp_nonce).encode("utf-8")
    cipher = AES.new(key=hash_id_ba, mode=AES.MODE_CBC, iv=iv_ba)

    message = bytes.decode(unpad(cipher.decrypt(bytes.fromhex(data_string)), AES.block_size), "utf-8")
    return message

resp_nonce = resp["Nonce"]
resp_msg = resp["Message"]
resp_ori_sign = resp["Sign"]

dec = aes_dec(resp_msg, resp_nonce)
print("- Decryption of Response: {}".format(dec))

#{"OrderNo":"A202109838256","ShopNo":"NA0249_001","TSNo":"NA024900000227","Amount":79900,"Status":"S","Description":"S0000 – 處理成功","PayType":"A","ATMParam":{"AtmPayNo":"99922530174963","WebAtmURL":"https://sandbox.sinopac.com/QPay.WebPaySite/Bridge/PayWebATM?TD=NA024900000227&TK=82cd04db-cd70-4bf8-8215-73675e920fd9","OtpURL":"https://sandbox.sinopac.com/QPay.WebPaySite/Bridge/PayOTP?TD=NA024900000227&TK=82cd04db-cd70-4bf8-8215-73675e920fd9"}}    
```

##### 程式說明

我們取回來的值，會先拆開第一層的json，Version、ShopNo、APIService原則上會和我們呼叫時的內容是一樣的。而我們要先將`Message`值取出來要做AES解密，而`Sign`值取出來要做比對驗證確認其內容不可否認性(non-repudiation)。而`Nonce`值是要重新產生這次解密的`IV`值的基礎。

我們要撰寫一個AES-CBC的解密`aes_dec()`，其實內容和加密差不多。將取回來的Message密文和Nonce傳入後，使用AES的`decrypt()`將結果解出來，由於雙方採用的AES是對稱式加密，因此我們手上的**AES Key**，就是我們先前的`Hash ID`。成功解密後，我們就會拿回人類看的懂的第二階的JSON內容。

記得當我們在加密時有做過pad()的padding手法，一樣的我們在解密時也需要做反向的unpad()，把原本有padding的值再拿掉，否則有時候解回原文時最後在尾巴會產生亂碼。

接下來，我們就要把JSON內容再拿出`訊息內文`來重新計算`Sign`的內容。

```python
resp_json = json.loads(dec)

resp_gen_sign = get_sign(resp_json, hash_id, resp_nonce)

print("- 重新產生Sign值: {}".format(resp_gen_sign))
# Output: - 重新產生Sign值: 52BA786E4E6BBE5DB5A41FF8B656565EB529D135B276BFC3D17D0BB9467F4B4C

print("- Sign驗證結果，是否樣同？ {}".format(resp_ori_sign == resp_gen_sign ))
# Output: - Sign驗證結果，是否樣同？ True
```

##### 程式說明

原本我們解密回來的是一個JSON字串，所以要把字串經由`json.loads()`轉成Python Dictionary。這一整串就是`訊息內文`，加上`Hash ID`以及新取回的`Nonce`，規則和先前是一樣的，因此就重覆使用我們撰寫好的`get_sign()`進行計算，會得到新的Sign值內容：`52BA786E4E6BBE5DB5A41FF8B656565EB529D135B276BFC3D17D0BB9467F4B4C`

我們立刻把這一串安全簽章拿去和API回傳給我們的比對一下，**完全相同**！

需要把這一個驗證步驟也做完後，才算是完整的流程，但開心之餘，我們是不是忘了什麼？

### 最重要的事

還有一件最重要的事，當然就是要解析API回傳給我們的JSON內容：

* 確認狀態`Status`：要收到`S`才代表成功
* 確認狀態描述內容`Description`：若是成功的話，會是`S0000 – 處理成功`
* 永豐端的交易序號`TSNo`：我們的例子比拿到了`NA024900000227`
* 虛擬帳號相關資訊`ATMParam`：
  * 最重要的在這兒裡呀，本集最重要的主角：`AtmPayNo`，如果顧客不是選擇使用WebATM網頁上轉帳的話，可在電商的頁面上顯示這個虛擬帳號讓他們使用慣用的方法轉帳。我們的例子拿到了`99922530174963`。
  * 永豐也提供了線上WebATM的方式繳款，我們只需要提供連結即可，即`WebAtmURL`。
  * 另一個是使用永豐銀行簡訊動態密碼(OTP)的付款網址，即`OtpURL`。

把值從Dictionary中取出即可，這部份很簡單：

```python
tsno = resp_json["TSNo"]
print(tsno)
# Output: NA024900000227

status = resp_json["Status"]
print(status)
# Output: S

desc = resp_json["Description"]
print(desc)
# Output: S0000 – 處理成功

atm_param = resp_json["ATMParam"]

atm_pay_no = atm_param["AtmPayNo"]
print(atm_pay_no)
# Output: 99922530174963

web_atm_url = atm_param["WebAtmURL"]
print(web_atm_url)
# Output: https://sandbox.sinopac.com/QPay.WebPaySite/Bridge/PayWebATM?TD=NA024900000227&TK=82cd04db-cd70-4bf8-8215-73675e920fd9

otp_url = atm_param["OtpURL"]
print(otp_url)
# Output: https://sandbox.sinopac.com/QPay.WebPaySite/Bridge/PayOTP?TD=NA024900000227&TK=82cd04db-cd70-4bf8-8215-73675e920fd9
```

#### 有關PayToken

在規格書有提到：

> 豐收款會依 BackendURL 或 ReturnURL 將訊息 內 Token 傳送給商戶，商 戶會收到一組 Token 值後使用「 6.5訊息查詢服務」來確認內容...

但由於使用虛擬帳戶的要求時，`ReturnURL`為**必填**，但`BackendURL`並不是。其實我不是很確定`ReturnURL`會在什麼情況下被用到。我先假設是使用永豐的WebATM或OTP的服務時，畢竟是在永豐的網站作業，而連過去的網址帶了一些資訊應該可讓永豐後台mapping到我們這筆交易資料，也理當在執行完付款動作後，就可以將使用者轉址回我們當初提供的`ReturnURL`的網址中。

但若顧客並沒有想要使用永豐的WebATM或OTP時，表示顧客想記下虛擬帳戶，使用其他的轉帳方法來完成支付動作。這樣一來，接下來的付款流程就和永豐可控的網站是脫鉤的狀態，因此`ReturnURL`似乎就沒有機會被叫用了。
那這樣一來，當初非必填的`BackendURL`就似乎變的至關重要了，因為這變成是在這個情境下唯一能取得`PayToken`的機會。

需要有PayToken，我們才能使用`OrderPayQuery`來查詢訂單的付款狀態，需要能查詢我們才能在電商的訂單後台中，更新付款狀態讓客戶確認。想像一下如果你是顧客，付完款後，一定會想要確認網站的狀態是否更新成「已付款」，才會安心。

我試圖想使用`WebAtmURL`來看看完成後，是否會進行轉址。但我從取回的網址連線後，發現這個測試網頁是無法使用的，畫面如下：
![https://ithelp.ithome.com.tw/upload/images/20210924/20130354KyNDmGQfGC.png](https://ithelp.ithome.com.tw/upload/images/20210924/20130354KyNDmGQfGC.png)

目前還沒有辦法實現被轉入`ReturnURL`，而且這個轉址雖然是Client Side轉址，但轉過去後取得網址列的參數(主要是要拿PayToken)後，也是需要透過Server Side程式去處理與儲存，而不是靠顧客的Browser的前端程式。因此也是想找時間實作一個我方的`BackendURL` 讓永指API可回報`PayToken`。