---
sidebar_position: 17
---

昨天抱病撰文，終於在本機端將單筆資料透過ORM的方法，成功將新增的訂單資料更新到Heroku Postgres資料庫中(非常感動)，今天我們要來完成剩下取得PayToken的最後一哩路。

### 只有拿到PayToken這麼簡單嗎

先前已經做好create order的View，可以新增資料，還記得有一個關鍵的`BackendURL`的參數是在我們呼叫API時會傳入的參數嗎？這個就是為了讓永豐API知道到時候要將PayToken傳回到哪裡讓我們接手進行處理。

這項功能其實在開發規格書中，是定義為「即時訊息通知」，老實說如果直接看名稱，不是很容易理解其功用，以為是類似Push Notifcation，但完全不是。這個功能純粹是永豐API會發送給尚未回報結案的TSNo，要傳給他們PayToken。

文件說明如下：

> STEP1：在「7.1 建立訂單交易」有傳送BackendURL且該訂單「付款完成」或「指定預計自動請款」完成請款時則會 透過此通知傳送訊息Token值給您，您收到後需回覆接收成功，如未回覆系統會每隔10分鐘重新發送一次，直到失敗5次後才會停止發送。
> STEP2：接收到Token值後，請透過用「7.3 訊息查詢服務」來確認訂單付款是否成功或是失敗。

因此我們要在這個讓API回呼的URL中，除了實作接收這個PayToken的「即時訊息通知」外，還連帶的要呼叫「訊息查詢服務」才能得到付款的結果。

#### STEP1： 開個網址接口來處理PayToken

這個「即時訊息通知」是一個被動被叫用的網頁，簡單說，這是我方電商提供的API (只是這個API是別人訂的規則)，另一種說法是我們提供了一個Webhook給一開始的API，在完成某些事後可以回呼叫用通知我們。

這個Webhook，也就是上面稱的`BackendURL`，裡面會傳入的東西就只有兩個屬性的JSON。

```
{
"ShopNo":"NA0249_001",
"PayToken":"da1547c3d0d1649af5049125b0880c0e227f31e107cbf4f0995bed28d0f066c1"
}
```

所以我們在Django的View中，取得request參數時，雖然是一個POST的Method，但我們取用這個資料需要使用`request.body`來拿到完整的JSON值。

先不論後面我們還需要做PayToken的查詢，但我們要回覆永豐API一個固定的結案狀態碼，固定就是用JSON包裝一個`Status`屬性，並回傳`S`。

```
{"Status": "S"}
```

簡單在View中準備一個`get_paytoken`，如下：

```python
def get_paytoken(request):
    if request.method == 'POST':
        result_str = request.body
        result_json = json.loads(result_str)
        print(" --- PayToken Callback: {}".format(result_json))
        update_order_by_paytoken(result_json)

        resp_json = {"Status": "S"}
    return HttpResponse(json.dumps(resp_json))
```

#### STEP2： 查詢顧客付款狀態

取得重要的PayToken後，接著就可以進行「訊息查詢服務」了。這個需呼叫的API Function為`OrderPayQuery`，他的輸入的`Message`值其實就是把剛剛BackendURL取回的JSON原封不動丟進去就行了。

但要呼叫的作法，需要和當初做`OrderCreate`一模一樣，該丟的API基礎參數以及加解密流程全都需要重作一遍，今天先把流程講完，這部份需要把可重覆使用的code整理過後，再來實作。

其中拿回的結果有很多屬性，較為重要的有：
| 屬性    | 說明                                                         |
| ------- | ------------------------------------------------------------ |
| APType  | 訊息類型<br />在這裡應為PayOut，表示「付款結果」的通知       |
| TSNo    | 豐收款的交易號碼，可以用此與資料庫作關聯，也可以用我們自己的訂單編號。 |
| Status  | 處理狀態<br />S：處理成功 正常<br/>F：處理失敗 錯誤          |
| PayDate | 付款時間/請款時間， 例如：2021/9/30 22:32 格式 202109302232 。 |

我們可以寫一個Model的方法來處理，

```python
def update_order_by_paytoken(paytoken_json):
    if paytoken_json:
        pay_token = paytoken_json["PayToken"]
        resp_json = SinopacAPI.query_by_paytoken(paytoken_json)
        tsno = resp_json["TSNo"]
        order_no = resp_json["OrderNo"]
        status = resp_json["Status"]

        order = Payment.objects.filter(order_no=order_no)
        order.status = status
        order.pay_token = pay_token
        order.lm_time = datetime.now()
        order.save()
        print(" Update Order Successfully.")
    else:
        print(" Update Order Fail.")
```

#### 紀錄被API回呼紀錄

若是我們的BackendURL有被API呼叫時，可建立一個PayToken的紀錄Table以作為Log使用。

```python
class PayToken(models.Model):
    pay_token = models.CharField(max_length=100, null=True)
    create_time = models.DateTimeField()


def create_new_paytoken(pay_token):
    new_paytoken = PayToken()
    new_paytoken.pay_token = pay_token
    new_paytoken.create_time = datetime.now()
    new_paytoken.save()
    print("--- Create New PayToken")
```

並行在原本View的get_paytoken()中，加入`create_new_paytoken(result_json["PayToken"])`，則可紀錄PayToken被回呼的紀錄。

```python
def get_paytoken(request):
    if request.method == 'POST':
        result_str = request.body
        result_json = json.loads(result_str)
        print(" --- PayToken Callback: {}".format(result_json))
        create_new_paytoken(result_json["PayToken"])
        update_order_by_paytoken(result_json)

        resp_json = {"Status": "S"}
    return HttpResponse(json.dumps(resp_json))
```

![https://ithelp.ithome.com.tw/upload/images/20211001/20130354y1PyEjiFaC.png](https://ithelp.ithome.com.tw/upload/images/20211001/20130354y1PyEjiFaC.png)

今天先寫到這兒，明天繼續實作OrderPayCreate的加解密API全流程實作。