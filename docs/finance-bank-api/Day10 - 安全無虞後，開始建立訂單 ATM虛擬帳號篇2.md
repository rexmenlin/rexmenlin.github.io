---

sidebar_position: 11
---

目前的情境是，我們的顧客已在電商平台把商品放入購物車，而且最後在~~失心瘋加上手滑~~的情境下，決定要購買，因此這份訂單需要先行成立，後面的階段才是將此訂單實際付款狀態串起來。

所以我們需要一個訂單編號的產生器，這裡在永豐API測試環境下，為了便於開發者測試因此有一個小規則，原文如下：

> 建立「測試虛擬帳號」訂單成功後，系統每隔5分鐘會自動模擬消費者付款完成；若訂單編號(OrderNo)尾數為9，系統即不進行付款動作，可用於測試「付款帳號逾期」情境，請特別注意您的訂單編號尾數。

* 尾數**是9**的訂單，會模擬顧客產生完後不會去用這個虛擬帳戶轉帳
* 尾數**非9**的訂單，會模擬顧客5分鐘之後會付款

而我們的訂單套用一個自訂的規則：
`A`+`年份`+`月份`+`六位數亂碼`

因此前面的部份我們要抓取今天的年份以及月份，和產生一個依據尾碼9的亂數六位數字。
當然這個規則是自己訂的，有興趣的你們也可以自己產生想要的訂單編號。

```python
def get_rand_part_str(will_paid):
    rand_part = 9
    gen_digit = 6

    if(will_paid):
        while rand_part % 10 == 9:
            rand_part = randrange(0, 10**((gen_digit-1)+1))
    else:  
        rand_part = randrange(0, 10**(gen_digit-1))*10 + 9  
    return "{:000006}".format(rand_part)

# 產生隨機訂單號碼
def gen_order_no(will_paid = True):
    today = date.today()
    year = today.year
    month = today.month

    order_no = "A{}{:02}{}".format(year, month, get_rand_part_str(will_paid))
    return order_no
```

##### 程式說明

我們在`get_rand_part_str(will_paid)`中，會傳入是否模擬顧客付款的布林值，這個會決定後面要不要是尾數9。
若是會付款的訂單，我們就產生一個至多六位數字的亂數，以一個while迴圈判斷，如果拿到9的話就重產生一個，直到不是尾數9為止。要判斷是不是尾數9，只需要將整個數字拿去求除以10的餘數，就是最右邊那位個位數字，再比對一下即可。

而若是不會付款的訂單，就只要產生五位數字後，乘以10，最後再加上一個9即可。

這樣只做了一半，因為要維持6位數，因此需要在string format上做一點設定，如此就可以回傳我們打造好的完美亂數6位數字串了。

而`gen_order_no(will_paid = True)`就是我們訂單的模擬產生器function，使用時傳入`will_paid`參數。

立刻來試試看：

```python
print(gen_order_no(True))
print(gen_order_no(True))
print(gen_order_no(True))
print(gen_order_no(False))
print(gen_order_no(False))
print(gen_order_no(False))

# Output: A202109021960
# Output: A202109008033
# Output: A202109644445

# 以下尾數都是9
# Output: A202109287019
# Output: A202109048299
# Output: A202109978419
```

另外我們需要產生一個付款過期日，這個只有在使用ATM虛擬帳號付款時才會需要，且是必要值。

```python
def gen_expire_date(days = 10):
    expire_date = datetime.now() + timedelta(days=days)  
    return expire_date.strftime("%Y%m%d")

print(gen_expire_date(10))
# Output: 20211005    
```

##### 程式說明

很簡單就是以今日加上需要的天數，再以`年` `月` `日`相連的方式輸出，用`strftime()`來設定輸出的格式化。

一樣來試一下加上10天後的日期作為付款過期日。
~~(這麼久應該也忘了要付錢了吧...)~~

接著我們就要產生一個`shop_data`的template作為基礎，再把需要異動的屬性重寫給值就好。

```python
# 取得基礎shop_data template，之後再修改裡面的值
def gen_default_shop_data(will_paid = True, amount = 100):
    tmp_data = {
        "ShopNo": shop_no,
        "OrderNo": gen_order_no(will_paid),
        "Amount": amount * 100,
        "CurrencyID": "TWD",
        "PayType": "",
        "ATMParam": { "ExpireDate": "" },
        "CardParam": { },
        "PrdtName": "虛擬帳號訂單",
        "ReturnURL": "",
        "BackendURL": ""
    }

    return tmp_data    
```

##### 程式說明

由於個取得訂單的樣版可和信用卡付款的共用，會產生時就先將無付款方式無關的必要屬性值在這個階段就也一併給值，例如`shop_no`，和可立馬產生一個訂單編號(呼叫`gen_order_no()`)和傳入訂單總金額`amount` (依規定後面補2個零，因此乘以100)。待取回這個共通式的訂單Dictionary物件後，再針對例如ATM虛擬帳戶來設定有關的值。

再來我們就要把之前有驗證過的，也是最複雜的AES-CBC產生`message`密文，和產生安全簽章`sign`的Function也加上去，相關文章請看Day05，再複習一下囉。
[Day05 - [豐收款] 繼續把加密這件事看下去](https://ithelp.ithome.com.tw/articles/10266741)

```python
def get_message(ori_shop_data, hash_id, iv):
    hash_id_ba = bytearray(hash_id, 'utf-8')

    iv_ba = bytearray(iv, 'utf-8')

    data_string = json.dumps(ori_shop_data, ensure_ascii=False, separators=(',', ':'))
    print(data_string)

    cipher = AES.new(key=hash_id_ba, mode=AES.MODE_CBC, iv=iv_ba)
    message = cipher.encrypt(pad(bytearray(data_string, 'utf-8'), AES.block_size))
    return message.hex().upper()

def check_passed_rule_param(value):
    if value is None:
        return False
    elif type(value) is dict or type(value) is list:
        return False
    elif type(value) is str and not value.strip():
        return False
    else:
        return True    

def get_sign(ori_shop_data, hash_id, nonce):
    sorted_shop_datat = {key: ori_shop_data.get(key) for key in sorted(ori_shop_data.keys(), key=str.casefold)}

    removed_rule_values_shop_data = {key: value for key, value in sorted_shop_datat.items() if check_passed_rule_param(value)}

    urlparam = urllib.parse.urlencode(removed_rule_values_shop_data)

    urlparam_no_percent_encode = urllib.parse.unquote(urlparam).replace("+", " ")

    final_shop_data = "{}{}{}".format(urlparam_no_percent_encode, nonce, hash_id)

    sign = hashlib.sha256(final_shop_data.encode('UTF-8')).hexdigest().upper()
    return sign
```

##### 程式說明

上面的加密與安全簽章的程式碼因為之前說明過，我就不再說明。

把以上的function都準備好了，我們就可以實際產生一個訂單並進行API呼叫了！

```python
def gen_shop_data_for_atm(will_paid, amount):
    shop_data = gen_default_shop_data(will_paid, amount)

    shop_data["PayType"] = "A"
    shop_data["ATMParam"]["ExpireDate"] = gen_expire_date(expire_days)
    shop_data["ReturnURL"] = return_url
    shop_data["BackendURL"] = backend_url

    return shop_data

def create_order_for_atm(nonce, will_paid, amount, expire_days, return_url, backend_url):
    url = "https://sandbox.sinopac.com/QPay.WebAPI/api/Order"

    shop_data = gen_shop_data_for_atm(will_paid, amount)

    print("- shop_data: {}".format(shop_data))

    msg = get_message(shop_data, hash_id, iv)
    print("- msg: "+ msg)

    sign = get_sign(shop_data, hash_id, nonce)
    print("- sign: " + sign)   

    req_param = {
        "Version": "1.0.0",
        "ShopNo": shop_no,
        "APIService": "OrderCreate",
        "Sign": sign,
        "Nonce": nonce,
        "Message": msg
    }

    print("-- Final request: "+ json.dumps(req_param))
    response = requests.post(url=url, json=req_param).json()
    return response
```

##### 程式說明

要呼叫API前，還有一個`request`的JSON格式要準備一下，就和我們昨天有整理的必填屬性的表格是一樣的。
所以就愉快的把產生好的`sign`、`nonce`以及`message`的內容放進去後，就可以使用`request.post()`方法叫用API了！

記得上面這個request內容要放在`json`參數裡面。

```python
# 開始實際產生訂單與呼叫
hash_id = get_hash_id()
print("- Hash ID: " + hash_id)

nonce = get_new_nonce()
print("- Nonce: " + nonce)  

iv = get_aes_iv(nonce)
print("- IV: " + iv)

will_paid = True
amount = 79900
expire_days = 10

# 先暫時使用手冊上的，之後再實作改掉
return_url = "http://10.11.22.113:8803/QPay.ApiClient/Store/Return"
backend_url = "http://10.11.22.113:8803/QPay.ApiClient/AutoPush/PushSuccess"

resp = create_order_for_atm(nonce, will_paid, amount, expire_days, return_url, backend_url)
print("-- Response: " + str(resp))
```

##### 程式說明

首先，我們先使用`gen_shop_data_for_atm(will_paid, amount)`產生一個基礎shop_data，再把所需要的ATM相關屬性值填入，但RuturnURL以及BackendURL的部份我們先暫時不實作，先給開發規格書提供的網址應付一下。

有了這個shop_data (訊息內文)以及hash_id、nonce、iv等，我們就可以一併把`message`和`sign`給做好。上面的程式碼會將這些值印出來，我們也可以再次觀察一下內容是不是如我們預期。

以下為輸出結果

```python
#- Hash ID: 87282A2FA0E209EBE1B3713AB56A06C2

#- Nonce: NjM3NjgxMDcxMzgyMDkuNTpjOTg1ZmY1M2ZjYThjOTQ0Y2E3NWJmMzJlOTk1ODNhNzQ3ODVlZjAzMzhkODEyZTdmM2NhOTBhMTFjMjA4ZjYy

#- IV: BBE520650BB697E9

#- shop_data: {'ShopNo': 'NA0249_001', 'OrderNo': 'A202109838256', 'Amount': 79900, 'CurrencyID': 'TWD', 'PayType': 'A', 'ATMParam': {'ExpireDate': '20211004'}, 'CardParam': {}, 'PrdtName': '虛擬帳號訂單', 'ReturnURL': 'http://10.11.22.113:8803/QPay.ApiClient/Store/Return', 'BackendURL': 'http://10.11.22.113:8803/QPay.ApiClient/AutoPush/PushSuccess'}

#- msg: E7F53668754D7606EA864A55306D6EF7E1FB3839C5CC60D4C8E53C65247B0EF820FDCDDCCFED904026D7B2DF50DA613703D88587D58F258F7918CAAB05E031D4B88799A9C48DC82B57B546C93F62CA4C597D55033F799E93CB65D65F076D989C070C900277F53FEA778D2C81BC84FD2F3591FEF398A587C32C49F367530FC945901D69FBE120448C687799F613923B2B9593C573B5CE7B4FCD39D5AFA3A5FFAC40A7145B119C1B99C34FA7CF6BF009B39DFAD5BA5AC51D62E11923C6BA6E2CA3800FDC0F36263DC3D37262B3E6D3E3760B23F173754350C2238AF5330EB67F8CFE355A39ABA69240C925F38F6D7007158FE3E492849AFA7D8F69EDA4983CE2D33D1A38951CFACC1FABE8E0BEA1434F18A93970836DE305B576C5395D0682E73846D936EA06133A48FC19A5ACCB24F5F73EC9690A232FFD40C512089A60FD57553001B2C4D09B21549DD489A1365A471E

#- sign in SHA256: B8566D3AF261827C6C5113E4D9DD7AFAFCA70D4F8196334A59E873110718176E


#-- Final request: {"Version": "1.0.0", "ShopNo": "NA0249_001", "APIService": "OrderCreate", "Sign": "B8566D3AF261827C6C5113E4D9DD7AFAFCA70D4F8196334A59E873110718176E", "Nonce": "NjM3NjgxMDcxMzgyMDkuNTpjOTg1ZmY1M2ZjYThjOTQ0Y2E3NWJmMzJlOTk1ODNhNzQ3ODVlZjAzMzhkODEyZTdmM2NhOTBhMTFjMjA4ZjYy", "Message": "E7F53668754D7606EA864A55306D6EF7E1FB3839C5CC60D4C8E53C65247B0EF820FDCDDCCFED904026D7B2DF50DA613703D88587D58F258F7918CAAB05E031D4B88799A9C48DC82B57B546C93F62CA4C597D55033F799E93CB65D65F076D989C070C900277F53FEA778D2C81BC84FD2F3591FEF398A587C32C49F367530FC945901D69FBE120448C687799F613923B2B9593C573B5CE7B4FCD39D5AFA3A5FFAC40A7145B119C1B99C34FA7CF6BF009B39DFAD5BA5AC51D62E11923C6BA6E2CA3800FDC0F36263DC3D37262B3E6D3E3760B23F173754350C2238AF5330EB67F8CFE355A39ABA69240C925F38F6D7007158FE3E492849AFA7D8F69EDA4983CE2D33D1A38951CFACC1FABE8E0BEA1434F18A93970836DE305B576C5395D0682E73846D936EA06133A48FC19A5ACCB24F5F73EC9690A232FFD40C512089A60FD57553001B2C4D09B21549DD489A1365A471E"}


#-- Response: {'Version': '1.0.0', 'ShopNo': 'NA0249_001', 'APIService': 'OrderCreate', 'Sign': '8A001F83ABF5EAF292119ADBFDBCFE7F34A535781E8F77A7B0D09A9FD56E90BF', 'Nonce': 'NjM3NjgxMDcxMzg2OTUuMTo4MTQwODE2NzBiMGUyYTdiNTAzZDExN2Q5NDhmOGMzMTVlZWRhOGI5ODY2OGUyOGNkMGFiM2MzZDhiNGEzZGRi', 'Message': '4AAC75A87C46EC473D94FFFB270DCAF3263CC5DB5F3E49ABCEE8E28A073F16D750469AEE4E77A1F0237DEA7043CD79273E0300D94286C81DF70B4A2C2BEA54DDA7AE4F137D109E9E6FBF4494FDCA9749C61F1DD9A30CFC7A831735D5811B26FAABC23B7C1E6CD7329974AE866EC2A72F09574E2A0C334A8F227FFF1462489E8187CCE9986940272C7B7BB1A676171F898D03909CD96EA6981B6EA7CB02003ED4DC1D95190F76DCB071E4BEDDDB55BB4D1EC7B06681D0FA583051112DDC36B1A3459A14C28789E5EBF02451EC77AC0F0DDBE00D2B07FF0D7BE195E866AF3D341CC21E8C346D2A72C4541898595F81AB60894049A32A5C551C91E4F492EF3F33F32268A8EDAB1AFBAA49F6ED1833BFD756F1955FA6BB1A3FC38773FE42E53DA5B82911073356C3A2211DE51810C5CDB54E73FFCC67BA0441BB7F53BCB4D640BD73F06336BE1FEA4A0ACFA316F07F0A5FE232380CBF245AF01777BBDF770EDD08F77F853BDC2715FDA066F271C58F31424C47B1593829E7D67A5105224AEBF10D99DB2CFC9F6483440601DAACFB20251D724DFD8447C0A28408921966A3084E97C564017973A9B8CED71F00371F391663196D8021CEF2B74C86AF0EACD275A5BFE8F2D1B787648F64EF2CCEB4CB8834B8E1'}
```

### 所以，成功了嗎？

看起來拿到了response，也是一個看不懂內容的json，難不成是永豐API不想解密把原本的東西再回傳給我們嗎？或是給我們一串也不想讓我們看的東西呢？這就是傳說中的以其人之道，還治其人之身嗎？

其實，開發規格書裡面都有寫呀，聰明的我們(自己講)應該知道怎麼做才對，
我們明天繼續看下去。