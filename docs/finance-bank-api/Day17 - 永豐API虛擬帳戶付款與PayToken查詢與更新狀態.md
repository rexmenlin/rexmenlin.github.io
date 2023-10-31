---
sidebar_position: 18
---

在經過了多日有一天沒一天的研究、寫Code與寫作，今天假日花了一點時間將原本從Jupyter Notebook零零散散的Code，搬到PyCharm後也是細細碎碎的程式碼重新進行重構與翻修，能寫成物件導向的方式就調整，終於將完整的ATM虛擬帳戶的實作完成了，有了這個基礎，剩下的信用卡付款就很簡單了。

### 流程拆解

先分享一下我的實作流程：

1. [View] 提供模擬建立新ATM付款訂單的網頁 (`/order/create_atm_order`) 
   * 亂數產生訂單總金額
   * 呼叫Model相對的`create_new_atm_order`
2. [Model] 建立新ATM虛擬帳戶的訂單 (APIService: `CreateOrder`)
   * 建立`AtmAccountMessage`類別物件 (繼承至`ApiMessage`)
   * 執行`set_shop_data()`設定訂單相關資料
     * 提供`BackendURL`網址作為Webhook，讓永豐API之後呼叫回傳`PayToken` (`/order/get_pay_token`) 
   * 執行`create_new_order()`方法進行各種所需流程之資料準備(加密、運算簽章等)，最後叫用API
   * 以`ResponseATM`類別物件取回回傳值 (繼承至`ResponseMessage`)
   * 更新Payment Model ORM物件 → 自動更新資料庫

-----

↑↗→↘↓↙←↖↑↗→↘↓↙←↖↑↗→↘↓↙←↖↑↗→↘↓↙←↖↑
等待`/order/get_pay_token`被永豐API呼叫 (十分鐘內) 
↑↗→↘↓↙←↖↑↗→↘↓↙←↖↑↗→↘↓↙←↖↑↗→↘↓↙←↖↑

-----

3. [View] 於BackendURL收到API的PayToken (`/order/get_pay_token`) 
   * 呼叫Model相對的`update_order_by_paytoken()`
4. [Model] 包裝PayToken進行API呼叫 (APIService: `OrderPayQuery`)
   * 建立`QueryByPaytokenMessage`類別物件 (繼承至`ApiMessage`)
   * 執行`set_paytoken_json()`設定PayToken所需相關資料
   * 執行`send_query()`方法進行各種所需流程之資料準備(加密、運算簽章等)，最後叫用API
   * 以`ResponsePayToken`類別物件取回回傳值 (繼承至`ResponseMessage`)
   * 取出PayToken問回的訂單，將付款狀態寫回Payment Model ORM物件 → 自動更新資料庫

### 物件導向類別規劃

![https://ithelp.ithome.com.tw/upload/images/20211002/20130354pB6yTW2aZF.png](https://ithelp.ithome.com.tw/upload/images/20211002/20130354pB6yTW2aZF.png)

由以上可以看出，無論是ATM的流程，或是PayToken的流程都有相似的運作基底，因此我會實作幾個主要的類別：

1. 通用工具class `SinopacUtil`：含取得nonce、計算hash_id、AES加密、產生安全簽章等方法
2. 共同父類別：
   * class `ApiMessage`：無關哪一種API叫用所需的內容與流程
   * class `ResponseMessage`：無關一種API叫用後取得response內容與流程的基礎 (AES解密)
3. 明確應用子類別：
   * [ApiMessage] sub-class `AtmAccountMessage`：呼叫建立ATM虛擬帳戶付款之訂單API訊息呼叫，相關的參數需設定，例如總金額、付款方式、是否模擬付款、最後付款日期…等。
   * [ApiMessage] sub-class `QueryByPaytokenMessage`：呼叫以PayToken查詢相關付款資訊的API訊息呼叫，相關的參數需設定為PayToken與ShopNo之JSON。
   * [ResponseMessage] sub-class `AtmAccountMessage`：取得有關成功建立ATM訂單後的回傳值解密結果，其屬性是為了建立Payment Table用。
   * [ResponseMessage] sub-class `ResponsePayToken`：取得有關成功以PayToken查詢後的回傳值解密結果，其屬性是為了更新**付款狀態**至Payment Table用。

### 程式碼集合

以上先把上面這幾段Code分享完整內容，但部份實作先前文章已說明就不再詳述

#### 通用工具class SinopacUtil

```python
class SinopacUtil:
    # 無論ATM或信用卡都會用到
    backend_url = "https://kummyshop.herokuapp.com/order/get_pay_token"

    @staticmethod
    def bytes_xor_to_hexstring(ba1, ba2):
        return bytes([a ^ b for a, b in zip(ba1, ba2)]).hex()

    @staticmethod
    def get_hash_id(A1, A2, B1, B2):
        ba_xor_A = SinopacUtil.bytes_xor_to_hexstring(bytes.fromhex(A1), bytes.fromhex(A2))
        ba_xor_B = SinopacUtil.bytes_xor_to_hexstring(bytes.fromhex(B1), bytes.fromhex(B2))
        return "{}{}".format(ba_xor_A, ba_xor_B).upper()

    @staticmethod
    def gen_order_no(will_paid=True):
        today = date.today()
        year = today.year
        month = today.month

        order_no = "A{}{:02}{}".format(year, month, SinopacUtil.get_rand_part_str(will_paid))
        return order_no

    @staticmethod
    def get_aes_iv(nonce):
        return hashlib.sha256(nonce.encode('UTF-8')).hexdigest().upper()[-16:]

    @staticmethod
    def get_new_nonce(shop_no):
        url = "https://sandbox.sinopac.com/QPay.WebAPI/api/Nonce"
        req_param = {
            "ShopNo": shop_no
        }
        response = requests.post(url=url, json=req_param).json()
        return str(response["Nonce"])

    @staticmethod
    def get_message(ori_shop_data, hash_id, iv):
        hash_id_ba = bytes(hash_id, 'utf-8')
        print("- hash_id_ba: {}".format(hash_id_ba))

        iv_ba = bytes(iv, 'utf-8')
        print("- iv_ba: {}".format(iv_ba))

        data_string = json.dumps(ori_shop_data, ensure_ascii=False, separators=(',', ':'))
        print(data_string)

        print("-- len of AES key: {}".format(len(hash_id_ba)))
        cipher = AES.new(key=hash_id_ba, mode=AES.MODE_CBC, iv=iv_ba)
        message = cipher.encrypt(pad(bytes(data_string, 'utf-8'), AES.block_size))
        return message.hex().upper()

    @staticmethod
    def get_sign(ori_shop_data, hash_id, nonce):
        sorted_shop_data = {key: ori_shop_data.get(key) for key in sorted(ori_shop_data.keys(), key=str.casefold)}
        print("* sorted_shop_data: {}".format(sorted_shop_data))

        removed_rule_values_shop_data = {key: value for key, value in sorted_shop_data.items() if
                                         SinopacUtil.check_passed_rule_param(value)}
        print("* removed_rule_values_shop_data: {}".format(removed_rule_values_shop_data))

        url_param = urllib.parse.urlencode(removed_rule_values_shop_data)
        print("* url_param: {}".format(url_param))

        url_param_no_percent_encode = urllib.parse.unquote(url_param).replace("+", " ")
        print("- url_param_no_percent_encode: {}".format(url_param_no_percent_encode))

        final_shop_data = "{}{}{}".format(url_param_no_percent_encode, nonce, hash_id)
        print("- final_shop_data: {}".format(final_shop_data))

        sign = hashlib.sha256(final_shop_data.encode('UTF-8')).hexdigest().upper()
        print("- sign: {}".format(sign))
        return sign


    @staticmethod
    def check_passed_rule_param(value):
        if value is None:
            return False
        elif type(value) is dict or type(value) is list:
            return False
        elif type(value) is str and not value.strip():
            return False
        else:
            return True

    @staticmethod
    def get_rand_part_str(will_paid):
        rand_part = 9
        gen_digit = 6

        if will_paid:
            while rand_part % 10 == 9:
                rand_part = randrange(0, 10 ** ((gen_digit - 1) + 1))
        else:
            rand_part = randrange(0, 10 ** (gen_digit - 1)) * 10 + 9
        return "{:000006}".format(rand_part)
```

#### 共同父類別class ApiMessage

```python
class ApiMessage:
    shop_no = "NA0249_001"
    api_url = "https://sandbox.sinopac.com/QPay.WebAPI/api/Order"
    A1, A2, B1, B2 = "86D50DEF3EB7400E", "01FD27C09E5549E5", "9E004965F4244953", "7FB3385F414E4F91"

    def __init__(self, api_service):

        self.hash_id = SinopacUtil.get_hash_id(ApiMessage.A1, ApiMessage.A2, ApiMessage.B1, ApiMessage.B2)
        self.nonce = SinopacUtil.get_new_nonce(ApiMessage.shop_no)
        print("Nonce: " + self.nonce)
        self.iv = SinopacUtil.get_aes_iv(self.nonce)
        print("IV: " + self.iv)

        self.api_service = api_service
        self.api_base_param = {
            "Version": "1.0.0",
            "ShopNo": ApiMessage.shop_no,
            "APIService": api_service,
            "Sign": "",
            "Nonce": self.nonce,
            "Message": ""
        }
        self.plain_message = None
        self.msg = None
        self.sign = None

    def _set_plain_msg_to_proc_msg_sign(self, plain_message):
        self.plain_message = plain_message

        # AES encryption for Message
        self.msg = SinopacUtil.get_message(self.plain_message, self.hash_id, self.iv)
        print("- msg: " + self.msg)
        self.api_base_param["Message"] = self.msg

        # SHA-256 for Sign
        self.sign = SinopacUtil.get_sign(self.plain_message, self.hash_id, self.nonce)
        print("- sign in SHA256: " + self.sign)
        self.api_base_param["Sign"] = self.sign

    def _send_api(self):
        print("-- Final request: " + json.dumps(self.api_base_param))
        response = requests.post(url=self.api_url, json=self.api_base_param).json()
        print("-- Final Response: " + json.dumps(response))
        return response

    @staticmethod
    def _gen_temp_shop_data():
        tmp_data = {
            "ShopNo": "",
            "OrderNo": "",
            "Amount": 0,
            "CurrencyID": "TWD",
            "PayType": "",
            "ATMParam": {},
            "CardParam": {},
            "PrdtName": "",
            "ReturnURL": "",
            "BackendURL": ""
        }
        return tmp_data        
```

#### 建立ATM虛擬帳戶付款之訂單類別AtmAccountMessage

```python
class AtmAccountMessage(ApiMessage):
    return_url = "https://kummyshop.herokuapp.com/order/return"

    def __init__(self):
        super().__init__("OrderCreate")
        self.shop_data = None

    def set_shop_data(self, will_paid=True, amount=100, expire_days=10):
        self.shop_data = AtmAccountMessage.gen_default_shop_data(self.shop_no, will_paid, amount)
        self.shop_data["PayType"] = "A"
        self.shop_data["ATMParam"]["ExpireDate"] = AtmAccountMessage.gen_expire_date(expire_days)
        self.shop_data["ReturnURL"] = AtmAccountMessage.return_url
        self.shop_data["BackendURL"] = SinopacUtil.backend_url
        print("- shop_data: {}".format(self.shop_data))
        super()._set_plain_msg_to_proc_msg_sign(self.shop_data)

    def create_new_order(self):
        print("Send API...")
        return super()._send_api()

    @staticmethod
    def gen_default_shop_data(shop_no, will_paid=True, amount=100):
        tmp_data = ApiMessage._gen_temp_shop_data()
        tmp_data["ShopNo"] = shop_no
        tmp_data["OrderNo"] = SinopacUtil.gen_order_no(will_paid)
        tmp_data["Amount"] = amount * 100
        tmp_data["PrdtName"] = "虛擬帳號訂單"

        return tmp_data

    @staticmethod
    def gen_expire_date(days=10):
        expire_date = datetime.now() + timedelta(days=days)
        return expire_date.strftime("%Y%m%d")
```

#### 以PayToken查詢相關付款資訊類別QueryByPaytokenMessage

```python
class QueryByPaytokenMessage(ApiMessage):
    def __init__(self):
        super().__init__("OrderPayQuery")
        self.paytoken_json = None

    def set_paytoken_json(self, paytoken_json):
        self.paytoken_json = paytoken_json
        print("- paytoken_json: {}".format(self.paytoken_json))
        super()._set_plain_msg_to_proc_msg_sign(self.paytoken_json)

    def send_query(self):
        print("Send API...")
        return super()._send_api()
```

#### 共同父類別class ResponseMessage

```python
class ResponseMessage:
    def __init__(self, resp_json, hash_id):
        self.hash_id = hash_id
        self.resp_json = resp_json
        self.resp_nonce = resp_json["Nonce"]
        self.resp_msg = resp_json["Message"]
        self.resp_ori_sign = resp_json["Sign"]
        self.dec_resp_json = self.__msg_dec()

    def __msg_dec(self):
        dec = ResponseMessage.aes_dec(self.resp_msg, self.resp_nonce, self.hash_id)
        print("- Decryption of Response: {}".format(dec))
        dec_resp_json = json.loads(dec)

        resp_gen_sign = SinopacUtil.get_sign(dec_resp_json, self.hash_id, self.resp_nonce)
        print("- 重新產生Sign值: {}".format(resp_gen_sign))
        return dec_resp_json


    @staticmethod
    def aes_dec(data_string, resp_nonce, hash_id):
        hash_id_ba = hash_id.encode("utf-8")
        iv_ba = SinopacUtil.get_aes_iv(resp_nonce).encode("utf-8")
        cipher = AES.new(key=hash_id_ba, mode=AES.MODE_CBC, iv=iv_ba)
        message = bytes.decode(unpad(cipher.decrypt(bytes.fromhex(data_string)), AES.block_size), "utf-8")
        return message
```

#### ATM查詢結果類別ResponseATM

```python
class ResponseATM(ResponseMessage):
    def __init__(self, resp_json, hash_id):
        super().__init__(resp_json, hash_id)

        self.orderno = self.dec_resp_json["OrderNo"]
        self.amount = self.dec_resp_json["Amount"]
        self.tsno = self.dec_resp_json["TSNo"]
        self.status = self.dec_resp_json["Status"]
        self.desc = self.dec_resp_json["Description"]
        self.atm_param = self.dec_resp_json["ATMParam"]
        self.atm_pay_no = self.atm_param["AtmPayNo"]
        self.web_atm_url = self.atm_param["WebAtmURL"]
        self.otp_url = self.atm_param["OtpURL"]
```

#### 以PayToken查詢完的付款資訊結果類別ResponsePayToken

```python
class ResponsePayToken(ResponseMessage):
    def __init__(self, resp_json, hash_id):
        super().__init__(resp_json, hash_id)

        self.paytoken = self.dec_resp_json["PayToken"]
        self.tsresult = self.dec_resp_json["TSResultContent"]
        self.orderno = self.tsresult["OrderNo"]
        self.tsno = self.tsresult["TSNo"]
        self.status = self.tsresult["Status"]
        self.aptype = self.tsresult["APType"]
        self.paydate = self.tsresult["PayDate"]
```

### 結果驗證

待我們把所有的Code都更新上Heroku後，確最最後的佈署訊息Verifying deploy... done.後，我們就可以看一下，執行的結果了。

![https://ithelp.ithome.com.tw/upload/images/20211002/20130354zpWS8WfhC8.png](https://ithelp.ithome.com.tw/upload/images/20211002/20130354zpWS8WfhC8.png)

#### STEP1: 在View中執行建立新單

![https://ithelp.ithome.com.tw/upload/images/20211002/20130354uzrBcWm3RC.png](https://ithelp.ithome.com.tw/upload/images/20211002/20130354uzrBcWm3RC.png)

#### STEP2: 查詢目前資料庫狀態，新訂單資料進來了

直接在pgAdmin中查詢最新資料，最上方這筆資料就是我們等待被永豐API呼叫BackendURL後更新的資料，目前狀態仍然是在等待中。
![https://ithelp.ithome.com.tw/upload/images/20211002/20130354WRX2mk00VI.png](https://ithelp.ithome.com.tw/upload/images/20211002/20130354WRX2mk00VI.png)

#### STEP3: BackendURL被呼叫，更新資料庫付款狀態

PayToken所查詢到的回傳結果解密response如下：

```
{
   "ShopNo":"NA0249_001",
   "PayToken":"8ab3058e04bd1a58b54232987530c4faa6e97be7b1de009c1d230f125c7802c9",
   "Date":"202110022135",
   "Status":"S",
   "Description":"S0000 – 處理成功",
   "TSResultContent":{
      "APType":"PayOut",
      "TSNo":"NA024900000479",
      "OrderNo":"A202110235940",
      "ShopNo":"NA0249_001",
      "PayType":"A",
      "Amount":"9440300",
      "Status":"S",
      "Description":"",
      "PayDate":"202110022130"
   }
}
```

最後再確認資料庫的更新狀態：
![https://ithelp.ithome.com.tw/upload/images/20211002/20130354pWOcr2vuOm.png](https://ithelp.ithome.com.tw/upload/images/20211002/20130354pWOcr2vuOm.png)

沒錯，大師兄回來了！好感人！
太棒了！這一刻等了好久呀，拍張照片記錄一下！
![/images/emoticon/emoticon74.gif](https://ithelp.ithome.com.tw/images/emoticon/emoticon74.gif)