---
sidebar_position: 24
---

昨天寫完兩種付款方式，有提到原先信用卡刷卡後的結果導回頁`ReturnURL`我們還沒實作，今天就把這一頁完成。

先說明一下，信用卡刷卡時，不會立即得到結果，會透過我們在建立訂單時傳入的`ReturnURL`參數，待轉入永豐線上刷卡頁面後，會再透過這個網址導回我們的電商結果頁。細部流程如下

### 流程說明

1. [電商] 呼叫永豐API，建立信用卡付款方式的訂單，從response取回`card_pay_url`結果，我們將顧客導到這個網址去刷卡
2. [永豐] 在永豐的網頁進行刷卡，因此使用者的信用卡機敏資訊不會留在電商平台上
3. [永豐] 進行信用卡刷卡處理，先無論結果，完成後會將PayToken值傳入`ReturnURL`中
4. [電商] 這時候會透過ReturnURL將`PayToken`值帶回，我們將此值取出
5. [電商] 以`PayToken`呼叫永豐API`訊息查詢服務(OrderPayQuery)`
6. [永豐] 回傳付款狀態相關資訊
7. [電商] 將付款狀態結果顯示於頁面上，會分別顯示刷卡成功以及刷卡失敗不同狀態的資訊，若刷卡失敗我們可再提供一次刷卡連結果顧客

### View的card_return修改

先前我們有寫過View中的`card_return()`，當時只驗證一些資訊往來正不正確，現在要作一些小調整，但幅度不大。

```python
def card_return(request):
    pay_token_dic = {"PayToken": request.POST.get("PayToken"), "ShopNo": request.POST.get("ShopNo")}
    create_new_paytoken(pay_token_dic["PayToken"])
    result = update_order_by_paytoken(pay_token_dic)
    return render(request, 'order/card_return.html', result)
```

##### 程式說明

主要是當初我們呼叫`update_order_by_paytoken()`時，沒有回傳值，我們希望把整理過必要的資訊回傳值拿回來，在等一下的Template中作為判斷以及顯示相關結果的訊息

而另外我們把當初的HttpResponse改成了render方式導引到新準備的`order/card_return.html`中。

### Model中的`update_order_by_paytoken()`修改

```python
def update_order_by_paytoken(paytoken_json):
    result = {}
    if paytoken_json:
        pay_token = paytoken_json["PayToken"]
        create_new_paytoken(pay_token)

        paytoken_api = QueryByPaytokenMessage()
        paytoken_api.set_paytoken_json(paytoken_json)
        resp = ResponsePayToken(paytoken_api.send_query(), paytoken_api.hash_id)
        print("-- Response: " + str(resp.dec_resp_json))

        order = Payment.objects.get(order_no=resp.orderno)
        order.pay_status = resp.status
        order.pay_token = pay_token
        order.lm_time = datetime.now()
        order.save()

        result["order_no"] = order.order_no
        result["status_code"] = order.pay_status
        if order.pay_status == "S":
            result["pay_status"] = "刷卡成功"
        else:
            result["pay_status"] = "刷卡失敗"
        result["card_pay_url"] = order.card_pay_url

        print(" Update Order Successfully.")
    else:
        print(" Update Order Fail.")
    return result
```

##### 程式說明

在`update_order_by_paytoken()`中，我們主要準備了一個`result`作為回傳，把所需要的必要資訊整理成dictionary回傳回去，在這裡順便把`pay_status`中的代碼換成了可閱讀的顯示文字。

不過我必須再三強調，這樣的寫法並非產品等級的撰寫方法，這也不是在這系列文章中我打算實作的，那樣只會對主要要介紹永豐API的串接失焦了。但我們可以談一談可以怎麼做會比較好。

1. 在Model裡面即使使用了原本代碼要轉成可閱讀文字，並不會直接這樣處理，無論你的網站一開始是不是單一語言，這種最終要顯示在UI上的文字，不會在Model裡直接替換，至少需考量到i18n多國語系。
2. 即使沒有要做多國語系，這樣的UI文字替換，也不會在處理專職功能的商業邏輯中實作，好一點的方式會寫在回傳之後，再呼叫另一個專門處理代碼轉文字的Converter邏輯。
3. 上面這個Converter，另一個呼叫階段可擺在View的那層來處理(我說的是View，不是Template)，但不是在View層直接作代碼轉文字，而是在View那層"再呼叫處理轉換的邏輯"，畢竟這個最終的內容是屬於偏UI的內容。

但為了範例方便，我們就直接在Model裡處理掉了，但這絕對不是最好的作法。

### 可以來看Template了

```html
{% extends "base.html" %}

{% block title %}{{ title }}{% endblock %}

{% block body %}
<div id="app" class="row g-3 align-self-center">
<h1 class="display-4 text-center  mb-3 mt-5">信用卡刷卡結果</h1>
<p class="lead  text-center">感謝您使用永豐線上信用卡刷卡服務，以下是您的刷卡結果喔！</p>
<hr/>
<div class="container-fluid">
    <h3 class="mb-5">
      訂單號碼 <small class="text-muted">{{ order_no }}</small>
    </h3>
    <div class="border border-secondary rounded m-2 {% if status_code == 'S' %}bg-success{% else %}bg-danger{% endif %}
    text-white p-3">
        <h6>您的刷卡結果</h6>
        <p>
            <span class="primary fs-4">{{ pay_status }}</span>
        </p>
        {% if status_code != 'S' %}
            <a href="{{ card_pay_url }}" class="btn btn-light btn-lg" tabindex="-1" role="button" aria-disabled="true">再次使用永豐信用卡刷卡</a>
        {% endif %}

    </div>
    <br/><br/><br/><br/>
    <hr/>
    <div class="row mt-3">
        <div class="col text-center">
            <a href="{% url 'order_create_entrance' %}" class="btn btn-primary btn-lg" tabindex="-1" role="button" aria-disabled="true">繼續購買</a>
            &nbsp
            <a href="{% url 'my_orders' %}" class="btn btn-secondary btn-lg" tabindex="-1" role="button" aria-disabled="true">回到訂單</a>
        </div>
    </div>
</div>
</div>
{% endblock %}

{% block script %}
{% endblock %}
```

##### 程式說明

刷卡結果當然就直接把剛剛上面談半天的**刷卡結果的UI文字**直接以`{{ pay_status }}`顯示出來。但我們希望在結果的二分世界中，以顏色來作明顯的區隔，因此就可以拿`status_code`結果代碼對刷卡成功或失敗改變顏色，這裡透過Bootstrap的基本幾個色調來調整div的背景顏色。

* 成功：bg-success
* 失敗：bg-danger

然後在失敗的時候，再次將刷卡網址按鈕附上，讓顧客有機會再執行一次刷卡。

以下就是執行的UI畫面，我們先刻意刷一次錯誤的卡片：
![https://ithelp.ithome.com.tw/upload/images/20211008/20130354MSoC0oll9t.png](https://ithelp.ithome.com.tw/upload/images/20211008/20130354MSoC0oll9t.png)

![https://ithelp.ithome.com.tw/upload/images/20211008/20130354i9eWyjVYdN.png](https://ithelp.ithome.com.tw/upload/images/20211008/20130354i9eWyjVYdN.png)

所以立刻可以驗證那個重刷卡的按鈕，很好，又再次導入刷卡頁面，這次小心翼翼的輸入永豐提供給我們的測試信用卡卡號。如先前說明，因為非完全公開資料，為了怕有心人事拿去亂刷，我們就不在此公開這個測試頁面的內容和卡號。

![https://ithelp.ithome.com.tw/upload/images/20211008/20130354N5EtYIUk6Q.png](https://ithelp.ithome.com.tw/upload/images/20211008/20130354N5EtYIUk6Q.png)

![https://ithelp.ithome.com.tw/upload/images/20211008/20130354ljybM9gioZ.png](https://ithelp.ithome.com.tw/upload/images/20211008/20130354ljybM9gioZ.png)

刷卡成功了！看到綠綠顏色的就覺得很安全呀 (咦，股市的話好像就不是這種感覺...)

今天頭非常痛呀，原本想繼續寫訂單查詢狀態等的部份，但狀態不好只能寫到這裡了，明天再繼續吧。天寫完兩種付款方式，有提到原先信用卡刷卡後的結果導回頁`ReturnURL`我們還沒實作，今天就把這一頁完成。

先說明一下，信用卡刷卡時，不會立即得到結果，會透過我們在建立訂單時傳入的`ReturnURL`參數，待轉入永豐線上刷卡頁面後，會再透過這個網址導回我們的電商結果頁。細部流程如下

### 流程說明

1. [電商] 呼叫永豐API，建立信用卡付款方式的訂單，從response取回`card_pay_url`結果，我們將顧客導到這個網址去刷卡
2. [永豐] 在永豐的網頁進行刷卡，因此使用者的信用卡機敏資訊不會留在電商平台上
3. [永豐] 進行信用卡刷卡處理，先無論結果，完成後會將PayToken值傳入`ReturnURL`中
4. [電商] 這時候會透過ReturnURL將`PayToken`值帶回，我們將此值取出
5. [電商] 以`PayToken`呼叫永豐API`訊息查詢服務(OrderPayQuery)`
6. [永豐] 回傳付款狀態相關資訊
7. [電商] 將付款狀態結果顯示於頁面上，會分別顯示刷卡成功以及刷卡失敗不同狀態的資訊，若刷卡失敗我們可再提供一次刷卡連結果顧客

### View的card_return修改

先前我們有寫過View中的`card_return()`，當時只驗證一些資訊往來正不正確，現在要作一些小調整，但幅度不大。

```python
def card_return(request):
    pay_token_dic = {"PayToken": request.POST.get("PayToken"), "ShopNo": request.POST.get("ShopNo")}
    create_new_paytoken(pay_token_dic["PayToken"])
    result = update_order_by_paytoken(pay_token_dic)
    return render(request, 'order/card_return.html', result)
```

##### 程式說明

主要是當初我們呼叫`update_order_by_paytoken()`時，沒有回傳值，我們希望把整理過必要的資訊回傳值拿回來，在等一下的Template中作為判斷以及顯示相關結果的訊息

而另外我們把當初的HttpResponse改成了render方式導引到新準備的`order/card_return.html`中。

### Model中的`update_order_by_paytoken()`修改

```python
def update_order_by_paytoken(paytoken_json):
    result = {}
    if paytoken_json:
        pay_token = paytoken_json["PayToken"]
        create_new_paytoken(pay_token)

        paytoken_api = QueryByPaytokenMessage()
        paytoken_api.set_paytoken_json(paytoken_json)
        resp = ResponsePayToken(paytoken_api.send_query(), paytoken_api.hash_id)
        print("-- Response: " + str(resp.dec_resp_json))

        order = Payment.objects.get(order_no=resp.orderno)
        order.pay_status = resp.status
        order.pay_token = pay_token
        order.lm_time = datetime.now()
        order.save()

        result["order_no"] = order.order_no
        result["status_code"] = order.pay_status
        if order.pay_status == "S":
            result["pay_status"] = "刷卡成功"
        else:
            result["pay_status"] = "刷卡失敗"
        result["card_pay_url"] = order.card_pay_url

        print(" Update Order Successfully.")
    else:
        print(" Update Order Fail.")
    return result
```

##### 程式說明

在`update_order_by_paytoken()`中，我們主要準備了一個`result`作為回傳，把所需要的必要資訊整理成dictionary回傳回去，在這裡順便把`pay_status`中的代碼換成了可閱讀的顯示文字。

不過我必須再三強調，這樣的寫法並非產品等級的撰寫方法，這也不是在這系列文章中我打算實作的，那樣只會對主要要介紹永豐API的串接失焦了。但我們可以談一談可以怎麼做會比較好。

1. 在Model裡面即使使用了原本代碼要轉成可閱讀文字，並不會直接這樣處理，無論你的網站一開始是不是單一語言，這種最終要顯示在UI上的文字，不會在Model裡直接替換，至少需考量到i18n多國語系。
2. 即使沒有要做多國語系，這樣的UI文字替換，也不會在處理專職功能的商業邏輯中實作，好一點的方式會寫在回傳之後，再呼叫另一個專門處理代碼轉文字的Converter邏輯。
3. 上面這個Converter，另一個呼叫階段可擺在View的那層來處理(我說的是View，不是Template)，但不是在View層直接作代碼轉文字，而是在View那層"再呼叫處理轉換的邏輯"，畢竟這個最終的內容是屬於偏UI的內容。

但為了範例方便，我們就直接在Model裡處理掉了，但這絕對不是最好的作法。

### 可以來看Template了

```html
{% extends "base.html" %}

{% block title %}{{ title }}{% endblock %}

{% block body %}
<div id="app" class="row g-3 align-self-center">
<h1 class="display-4 text-center  mb-3 mt-5">信用卡刷卡結果</h1>
<p class="lead  text-center">感謝您使用永豐線上信用卡刷卡服務，以下是您的刷卡結果喔！</p>
<hr/>
<div class="container-fluid">
    <h3 class="mb-5">
      訂單號碼 <small class="text-muted">{{ order_no }}</small>
    </h3>
    <div class="border border-secondary rounded m-2 {% if status_code == 'S' %}bg-success{% else %}bg-danger{% endif %}
    text-white p-3">
        <h6>您的刷卡結果</h6>
        <p>
            <span class="primary fs-4">{{ pay_status }}</span>
        </p>
        {% if status_code != 'S' %}
            <a href="{{ card_pay_url }}" class="btn btn-light btn-lg" tabindex="-1" role="button" aria-disabled="true">再次使用永豐信用卡刷卡</a>
        {% endif %}

    </div>
    <br/><br/><br/><br/>
    <hr/>
    <div class="row mt-3">
        <div class="col text-center">
            <a href="{% url 'order_create_entrance' %}" class="btn btn-primary btn-lg" tabindex="-1" role="button" aria-disabled="true">繼續購買</a>
            &nbsp
            <a href="{% url 'my_orders' %}" class="btn btn-secondary btn-lg" tabindex="-1" role="button" aria-disabled="true">回到訂單</a>
        </div>
    </div>
</div>
</div>
{% endblock %}

{% block script %}
{% endblock %}
```

##### 程式說明

刷卡結果當然就直接把剛剛上面談半天的**刷卡結果的UI文字**直接以`{{ pay_status }}`顯示出來。但我們希望在結果的二分世界中，以顏色來作明顯的區隔，因此就可以拿`status_code`結果代碼對刷卡成功或失敗改變顏色，這裡透過Bootstrap的基本幾個色調來調整div的背景顏色。

* 成功：bg-success
* 失敗：bg-danger

然後在失敗的時候，再次將刷卡網址按鈕附上，讓顧客有機會再執行一次刷卡。

以下就是執行的UI畫面，我們先刻意刷一次錯誤的卡片：
![https://ithelp.ithome.com.tw/upload/images/20211008/20130354MSoC0oll9t.png](https://ithelp.ithome.com.tw/upload/images/20211008/20130354MSoC0oll9t.png)

![https://ithelp.ithome.com.tw/upload/images/20211008/20130354i9eWyjVYdN.png](https://ithelp.ithome.com.tw/upload/images/20211008/20130354i9eWyjVYdN.png)

所以立刻可以驗證那個重刷卡的按鈕，很好，又再次導入刷卡頁面，這次小心翼翼的輸入永豐提供給我們的測試信用卡卡號。如先前說明，因為非完全公開資料，為了怕有心人事拿去亂刷，我們就不在此公開這個測試頁面的內容和卡號。

![https://ithelp.ithome.com.tw/upload/images/20211008/20130354N5EtYIUk6Q.png](https://ithelp.ithome.com.tw/upload/images/20211008/20130354N5EtYIUk6Q.png)

![https://ithelp.ithome.com.tw/upload/images/20211008/20130354ljybM9gioZ.png](https://ithelp.ithome.com.tw/upload/images/20211008/20130354ljybM9gioZ.png)

刷卡成功了！看到綠綠顏色的就覺得很安全呀 (咦，股市的話好像就不是這種感覺...)

今天頭非常痛呀，原本想繼續寫訂單查詢狀態等的部份，但狀態不好只能寫到這裡了，明天再繼續吧。昨天抱病撰文，終於在本機端將單筆資料透過ORM的方法，成功將新增的訂單資料更新到Heroku Postgres資料庫中(非常感動)，今天我們要來完成剩下取得PayToken的最後一哩路。

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