---
sidebar_position: 20
---

細數一下之前實作的API功能，有建立訂單以及選擇支付方式(ATM虛擬帳號、信用卡付款)，拿到永豐API透過`ReturnURL`或`BackendURL`回傳給我們的PayToken去問回付款狀態，現在即將進入最後一個永豐API的功能：**訂單交易查詢**

若是在上面透過`ReturnURL`或`BackendURL`回傳PayToken失效 (任何可能的原因)，永豐API還提供了一個主動由電商帶時間區間條件來查詢訂單狀態的功能。

開發規格書中提到的使用時機：

> 收款紀錄都可透過此API查詢，若有交易遲未收到豐收款的主動通知，您可透過本API介面，利用條件篩選，主動發起查詢，減少掉單問題。

而注意事項如下：

> A. 訂單查詢時至少要選擇其一條件 (1)訂單編號 (2)收款方式 (3)交易起迄 (4)付款狀態
> B. 每次查詢筆數上限為 300 筆，建議條件範圍不要設定過大。

| 參數名稱           | 說明                                                                  |
| -------------- | ------------------------------------------------------------------- |
| ShopNo         | 商店號碼                                                                |
| OrderNo        | 商戶訂單編號                                                              |
| PayType        | 收款方式                                                                |
| OrderDateTimeS | 交易日期(起)，例如 2017/5/3 00:00 則帶 201705030000                           |
| OrderDateTimeE | 交易日期(迄)，例如 2017/5/3 23:59 則帶 201705032359                           |
| PayDateTimeS   | 付款日期(起)，例如 2017/5/3 00:00 則帶 201705030000                           |
| PayDateTimeE   | 付款日期(迄)，例如 2017/5/3 23:59 則帶 201705032359                           |
| PayFlag        | 依付款狀態為條件查詢<br />ATM - Y:已轉帳/N:未轉帳/O:逾期<br />；信用卡 - Y：已請款/N:未請款/O:逾期 |

#### 流程說明

我們可以提供多種條件組合來查詢訂單，在查詢結果是會出現**符合結果的多筆訂單**內容，因此和先前的response不同之處在於我們需要從`OrderList`多性中拿回List的結果。

合理的用法如下：

1. 帶入OrderNo與PayFlag，直接查詢該訂單的狀態
2. 帶入交易起迄區間，這個方式比較傾向用來作電商後台定期排程，來防止掉單最後一道防線
   但由於會拿回太多的訂單List，因此這個方式非有必要應避免這樣處理。

由於我實際呼叫後，發現鐵人賽的參數者都是共用相同的ShopNo，因此用時間區間會把一脫拉庫與自己不相關的訂單也都取回。所以我主要會以單筆OrderNo進行查詢。

#### 查詢訂單資料類別OrderQueryMessage

```python
class OrderQueryMessage(ApiMessage):
    def __init__(self):
        super().__init__("OrderQuery")
        self.query_cond = None

    def set_query_conditions(self, orderno="", pay_type="",
                             order_date_time_s="", order_date_time_e="",
                             pay_date_time_s="", pay_date_time_e="", pay_flag=""):
        self.query_cond = {
            "ShopNo": self.shop_no,
            "OrderNo": orderno,
            "PayType": pay_type,
            "OrderDateTimeS": order_date_time_s,
            "OrderDateTimeE": order_date_time_e,
            "PayDateTimeS": pay_date_time_s,
            "PayDateTimeE": pay_date_time_e,
            "PayFlag": pay_flag
        }

        print("- Query_data: {}".format(self.query_cond))
        super()._set_plain_msg_to_proc_msg_sign(self.query_cond)

    def query_orders(self):
        print("Send API...")
        return super()._send_api()
```

如同先前作法一樣，我們會將這個訂單查詢拆成兩個方法叫用，一個是先設定所需要的查詢條件`set_query_conditions()`，設定完後再呼叫實際叫用API的`query_orders()`方法。

這裡我們將條件參數都設定了預設值，主要是希望到時使用時可依帶明確參數方式傳值進來，增加使用的彈性。

#### 查訂單回傳值類別ResponseOrderQuery

```python
class ResponseOrderQuery(ResponseMessage):
    def __init__(self, resp_json, hash_id):
        super().__init__(resp_json, hash_id)
```

在這邊的回傳值不像上次會直接更新Payment資料表，因此暫時留空，我們目標只希望把結果取回就好。這需要商業邏輯先行定義好，是否需要啟動連帶的更新動作，則可將取回的資料在後續進行訂單付款狀態更新。

### [Model]查詢訂單方法query_orders_by_conditions

```python
def query_orders_by_conditions(orderno="", pay_type="",
                             order_date_time_s="", order_date_time_e="",
                             pay_date_time_s="", pay_date_time_e="", pay_flag=""):
    query_api = OrderQueryMessage()
    query_api.set_query_conditions(orderno=orderno, pay_type=pay_type,
                             order_date_time_s=order_date_time_s, order_date_time_e=order_date_time_e,
                             pay_date_time_s=pay_date_time_s, pay_date_time_e=pay_date_time_e, pay_flag=pay_flag)
    resp = ResponseOrderQuery(query_api.query_orders(), query_api.hash_id)
    print("-- Response: " + str(resp.dec_resp_json))
    return str(resp.dec_resp_json)
```

### [View]查詢單筆訂單

```python
def order_query(request):
    resp = query_orders_by_conditions(pay_type="A", orderno="A202110507397", pay_flag="Y")
    return HttpResponse(resp)
```

例如，我們以固定的OrderNo進行查詢，而且僅希望ATM虛擬帳戶，且付款成功的才回傳回來。

結果如下：

```
{
   "ShopNo":"NA0249_001",
   "Date":"202110032253",
   "Status":"S",
   "Description":"S0000 – 處理成功",
   "OrderList":[
      {
         "OrderNo":"A202110507397",
         "TSNo":"NA024900000369",
         "TSDate":"202110012243",
         "PayDate":"202110012245",
         "Amount":79900,
         "PayType":"A",
         "PayStatus":"1A400",
         "ExpireDate":"202110112359",
         "RefundFlag":"N",
         "RefundStatus":"",
         "RefundDate":"",
         "PrdtName":"虛擬帳號訂單",
         "ATMParam":{
            "AtmPayNo":"99922530175613",
            "WebAtmURL":"https://sandbox.sinopac.com/QPay.WebPaySite/Bridge/PayWebATM?TD=NA024900000369&TK=3a83b2d6-76d0-4e66-a32b-66d55ceb74f3",
            "OtpURL":"https://sandbox.sinopac.com/QPay.WebPaySite/Bridge/PayOTP?TD=NA024900000369&TK=3a83b2d6-76d0-4e66-a32b-66d55ceb74f3",
            "BankNo":"807",
            "AcctNo":"01700100003411"
         },
         "RefundAmount":0
      }
   ]
}
```

雖然僅回傳一筆回來，不過一樣會放在List型別的`OrderList`中，需要再加工將資料取出。

另外最後再提一下，若是在ReturnURL或BackendURL有成功被回傳的情況下，基本上我們是可以作到自動化更新付款狀態，因此當顧客進到會員後台查詢他的訂單內容時，是會即時更新。但難免在例如我們提供的伺服器有異常時，例如BackendURL有十分鐘重新丟一次，至多五次的retry機制。因此如果在永豐API嘗試回呼我們的伺服器但未果時，而且也超過上限，我們總不會希望訂單的付款狀態永遠無法更新。

在這個狀態下，才會使用今天介紹的這支主動詢問訂單程式。可以寫成排程，類似是每幾小時進行詢問尚未更新的狀態，但一樣的，我們也是需要有自己的retry上限與邏輯。這部份都是在商務邏輯上需要設計與實作的，不可能永無止盡一直去照三餐詢問一個可能永遠不會有結果的消息。(如此悲傷)

目前已把所有功能都完成了，接下來看是要作更貼近電商模擬情境的實作，還是用剩下的天數來寫`Shioaji`證券程式交易呢？就讓我們看下去吧。