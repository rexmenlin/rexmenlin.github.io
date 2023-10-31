---
sidebar_position: 19
---

在我們花了不少時間終於完整的完成ATM付款並成功架設Heroku網站後取回PayToken，更新付款資訊。有了這些基礎後，我們在實作信用卡的部份基本上都可以用**走到飛**的狀態來進行。

有興趣可以參考從Day12開始到Day17的文章，Day17基本上已將完整的流程與架構做了完成度很高的鋪墊。

* [Day12 - [豐收款] 為BackendURL中收到PayToken鋪路，Django來了。](https://ithelp.ithome.com.tw/articles/10273325)
* [Day17 - [豐收款] 永豐API虛擬帳戶付款與PayToken查詢與更新狀態](https://ithelp.ithome.com.tw/articles/10276465)

### 刷好刷滿！提供信用卡給客戶吧

![https://ithelp.ithome.com.tw/upload/images/20211003/20130354CIbQWMFzjO.png](https://ithelp.ithome.com.tw/upload/images/20211003/20130354CIbQWMFzjO.png)

![https://ithelp.ithome.com.tw/upload/images/20211003/20130354sGZMrneDG7.png](https://ithelp.ithome.com.tw/upload/images/20211003/20130354sGZMrneDG7.png)

以上為永豐規格書中提供的信用卡刷卡內容，和ATM的流程稍有不同就是在於PayToken的取得方式，下面來說明。

### 流程拆解

按照先前的ATM付款流程，信用卡的流程差在沒有中間的BackendURL的等待呼叫過程，整個流程從我們的電商平台到取得信用卡刷卡位置轉址，再轉回來，流程是銜接在一起的。

1. [View] 提供模擬建立新的信用卡付款訂單的網頁 (`/order/create_card_order`) 
   * 亂數產生訂單總金額
   * 呼叫Model相對的`create_new_card_order`
2. [Model] 建立新信用卡付款的訂單 (APIService: `CreateOrder`)
   * 建立`CreditCardMessage`類別物件 (繼承至`ApiMessage`)
   * 執行`set_shop_data()`設定訂單相關資料
     * 提供`ReturnURL`網址，待刷卡完成後導回網頁，並處理由永豐回傳的`PayToken`。
   * 執行`create_new_order()`方法進行各種所需流程之資料準備(加密、運算簽章等)，最後叫用API
   * 以`ResponseCard`類別物件取回回傳值，最重要的是`CardPayURL`。 (繼承至`ResponseMessage`)
   * 更新Payment Model ORM物件 → 自動更新資料庫 
3. 導入或提供信用卡URL，讓消費者進行刷卡
   * 接下來為人工流程，於頁面中輸入信用卡資訊，在此我們使用永豐提供的測試信用卡資料刷入。
   * 刷完卡後，永豐會依照我們先前傳入的`ReturnURL`網址將頁面導回
4. [View] 於ReturnURL頁面(`/order/card_return`)取回`PayToken值`
5. [Model] 包裝PayToken進行API呼叫 (APIService: `OrderPayQuery`)
   * 建立`QueryByPaytokenMessage`類別物件 (繼承至`ApiMessage`)
   * 執行`set_paytoken_json()`設定PayToken所需相關資料
   * 執行`send_query()`方法進行各種所需流程之資料準備(加密、運算簽章等)，最後叫用API
   * 以`ResponsePayToken`類別物件取回回傳值 (繼承至`ResponseMessage`)
   * 取出PayToken問回的訂單，將付款狀態寫回Payment Model ORM物件 → 自動更新資料庫

### 物件導向類別規劃

和先前流程一樣，因為我們已經建立了兩套共用的父類別(`ApiMessage`、`ResponseMessage`)，分別可從中繼承擴充新的Message呼叫方法以及擴充取回的response內容。

所以我們就新增一個`CreditCardMessage`(繼承`ApiMessage`)，以及`ResponseCard`(繼承`ResponseMessage`)，因此更新一下我們的物件架構圖。

![https://ithelp.ithome.com.tw/upload/images/20211003/20130354AdLcomfxd3.png](https://ithelp.ithome.com.tw/upload/images/20211003/20130354AdLcomfxd3.png)

#### 建立信用卡付款類別CreditCardMessage

```python
class CreditCardMessage(ApiMessage):
    return_url = "https://kummyshop.herokuapp.com/order/card_return"

    def __init__(self):
        super().__init__("OrderCreate")
        self.shop_data = None

    def set_shop_data(self, will_paid=True, amount=100, auto_billing="Y"):
        self.shop_data = CreditCardMessage.gen_default_shop_data(self.shop_no, will_paid, amount)
        self.shop_data["PayType"] = "C"
        self.shop_data["CardParam"]["AutoBilling"] = auto_billing
        self.shop_data["ReturnURL"] = CreditCardMessage.return_url
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
        tmp_data["PrdtName"] = "信用卡訂單"

        return tmp_data
```

##### 程式說明

這邊和ATM基本上很像，差異僅在ATMParam與CardParam的部份，至於PrdtName則僅作個註記用途，沒有太實際的功能性。主要還是初始化後，設定shop_data後，就可以進行Send API的流程。

另外就是我們需要準備好`ReturnURL`給永豐API，屆時刷卡完成後會再導回我們的網頁。

實際流程當然相當複雜，只是我們先前將Code經過整理後，目前只要有新的作法就可以疊加在已架構好的程式架構上進行叫用，無需每次都要重覆複製貼上一堆八、九成都一樣的的程式碼，這就是實踐程式碼的DRY(Don't repeat yourself)精神。

至於其他程式段，請參閱[Day17](https://ithelp.ithome.com.tw/articles/10276465)的部份，在此就不再貼過來佔版面。

#### 建立Response回傳類別CreditCardMessage

```python
class ResponseCard(ResponseMessage):
    def __init__(self, resp_json, hash_id):
        super().__init__(resp_json, hash_id)

        self.orderno = self.dec_resp_json["OrderNo"]
        self.amount = self.dec_resp_json["Amount"]
        self.tsno = self.dec_resp_json["TSNo"]
        self.status = self.dec_resp_json["Status"]
        self.desc = self.dec_resp_json["Description"]
        self.card_pay_url = self.dec_resp_json["CardParam"]["CardPayURL"]
```

這裡就是針對`CardPayURL`進行處理，簡單來說，就是我們既然要提供顧客刷卡服務，且透過永豐API，那我們要作的其實是建立訂單後請永豐給我們一個信卡用刷卡的金流網址，我們收到後就可以將客戶導入後刷卡，待刷卡完成後會再導回我們的頁面 (我們先前提供的`ReturnURL`要用在這裡)。而導回我們的頁面，另一個要點是要處理`PayToken`。

### 直接來試刷了！

待我們將程式碼佈署上Heroku後，就可以馬上來試用。

建立新訂單，取回信用卡刷卡位置，點選導入刷卡網址：
![https://ithelp.ithome.com.tw/upload/images/20211003/20130354KzBMa0Zp49.png](https://ithelp.ithome.com.tw/upload/images/20211003/20130354KzBMa0Zp49.png)

進行刷卡，雖然永豐開發規格書上有提供測試用的刷卡卡號，但畢竟不是完全的公開資料，不確定被有心人士拿去亂使用會不會造成相關單位困擾，所以還是馬賽克一下。
![https://ithelp.ithome.com.tw/upload/images/20211003/201303541CnfiiLBLf.png](https://ithelp.ithome.com.tw/upload/images/20211003/201303541CnfiiLBLf.png)

#### 網頁導回來了，但發生了錯誤！

在刷卡成功後，網頁回來是回來了，但卻發生了以下的錯誤。

```
500 Internal Server Error
```

原先因為Heroku上面我使用另一組production_settings設定檔，上面DEBUG是False，導致看不出原因。

以下是永豐的文件說提到，無論是ReturnURL或BackendURL都是以下面方式將PayToken傳入：
![https://ithelp.ithome.com.tw/upload/images/20211003/20130354ZnUycKvu5f.png](https://ithelp.ithome.com.tw/upload/images/20211003/20130354ZnUycKvu5f.png)

#### 真相只有一個

後來使用了`F12`大法，透過Network方式查看Request的內容，發現如下內容。
![https://ithelp.ithome.com.tw/upload/images/20211003/20130354hbDe5IsWEw.png](https://ithelp.ithome.com.tw/upload/images/20211003/20130354hbDe5IsWEw.png)

於是解讀了一下，原先在ATM的BackendURL中，我是使用POST中將JSON內容從Raw Data方法取回，但一樣的方式會出現錯誤。

另外我再將DEBUG Mode打開後，確認他是透過`POST Form`的方式回傳PayToken，而非JSON。

![https://ithelp.ithome.com.tw/upload/images/20211003/20130354NxgTDXOAyz.png](https://ithelp.ithome.com.tw/upload/images/20211003/20130354NxgTDXOAyz.png)

以此可證實，透過`ReturnURL`回傳的PayToken值，是需要使用POST Form去抓取的。
(這部份永豐的開發規格書可能要註明一下)

> 上方的PayToken的值會和我等會兒下面頁面截圖上的值不同，因為頁面是後來全部修正完後重新上版跑過，所以兩者值不一樣是可想而知。

#### 重新修改[View] card_return

```python
def card_return(request):
    pay_token_dic = {"PayToken": request.POST.get("PayToken"), "ShopNo": request.POST.get("ShopNo")}
    print(" --- PayToken: {}, ShopNo: {}".format(pay_token_dic["PayToken"], pay_token_dic["ShopNo"]))
    create_new_paytoken(pay_token_dic["PayToken"])
    update_order_by_paytoken(pay_token_dic)
    return HttpResponse("PayToken: {}<br />ShopNo: {}".format(pay_token_dic["PayToken"], pay_token_dic["ShopNo"]))
```

##### 程式說明

首先，我們先直接從POST中取資料，而非先前的`request.body`。取得後，一樣是需要將PayToken拿去重新經過一連串的加密包裝後取回付款狀態，並且更新。先前都寫好包裝好的程式碼，這時候就可以1分鐘內實作完成。

再看一下頁面，果然可以了！

> 當然，實際的電商頁面不會是這樣把PayToken印在畫面上，一切都是為了測試API的流程與驗證而已。真正要做的是將由PayToken問回來的付款結果，更新在畫面上，告知顧客他刷卡成功了。這部份就交給各位來實作了。

![https://ithelp.ithome.com.tw/upload/images/20211003/20130354MoTs5mTloO.png](https://ithelp.ithome.com.tw/upload/images/20211003/20130354MoTs5mTloO.png)

一樣的我們回到pgAdmin中看一下資料的更新狀態，也都符合我們的預期。!![https://ithelp.ithome.com.tw/upload/images/20211003/20130354mX2coEcose.png](https://ithelp.ithome.com.tw/upload/images/20211003/20130354mX2coEcose.png)

這樣總算是將豐收款的兩大功能：`ATM虛擬帳戶付款`與`信用卡付款服務`完成了！

![/images/emoticon/emoticon07.gif](/images/emoticon/emoticon07.gif)