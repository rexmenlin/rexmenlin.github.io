---
sidebar_position: 23
---

昨天使用了Bootstrap5、Vue，打造了我們的付款流程入口頁面後，今天要將之前的ATM虛擬帳戶轉帳付款以及信用卡線上刷卡的頁面也實作一下。

還記得我們昨天從`order_create_entrance`頁面送出form表單後，會執行action頁面`order_create_next`，接著就是要實作這個view以及Django Template。

### [View] order_create_next

先看一下view def的部份：

```python
def order_create_next(request):
    context = {
        "title": "訂單成立囉！",
        "desc": "請依照下列付款資訊完成付款，放心，我們不是詐騙集團，但這麼說好像也不會讓人多放心。",
        "amount": int(request.POST.get("amount")),
        "payment_type": request.POST.get("payment")
    }
    if context["payment_type"] == "atm":
        will_paid = True
        resp = create_new_atm_order(will_paid, context["amount"])
        context["order_no"] = resp.orderno
        context["atm_pay_no"] = resp.atm_pay_no
        context["atm_url"] = resp.web_atm_url
    elif context["payment_type"] == "card":
        will_paid = True
        auto_billing = "Y"
        resp = create_new_card_order(will_paid, context["amount"], auto_billing)
        context["order_no"] = resp.orderno
        context["card_pay_url"] = resp.card_pay_url
    else:
        pass

    return render(request, 'order/order_create_next.html', context)
```

##### 程式說明

我們會從前一頁傳入`amount`總金額以及`payment_type`付款方式兩個參數。要記得先將amount轉換成int的型態，否則後面在永豐的規則要把amount補2個零的時候，如果你把一個**長的像數字的字串**拿去x100的話…(笑)。

由於先前已實作好`create_new_atm_order()`以及`create_new_card_order()`這兩個針對ATM轉帳以及信用卡刷卡的方法，現在在後段實作上就發揮功效了！我們終於不用再辛辛苦苦面對那些加解密和安全簽章等等過程。要做的就只有當時我們需要傳入的參數，準備一下就好了。

這次有所差別的是，之前是使用亂數模擬付款金額，現在我們可以從前一頁所挑選的商品總金額正確的傳入。

上面的`payment_type`，我在這邊僅使用字串判斷，當然如果你要以更嚴謹的系統去設計與考量，中間有很多是可以去強化的，包含各種值域的檢查以及例外處理等，在此為避免失焦，這些都不在此demo設計範圍內。

上述兩種付款方式的選擇，主要差異在完成後的結果，ATM的話會拿回虛擬帳號`atm_pay_no`和線上WebATM網址`atm_url`。而信用卡的話會拿回信用卡刷卡網址`card_pay_url`。

準備好了，就可以來看本篇重點，`order_create_next.html` Template囉！

### 顯示模板

```html
{% extends "base.html" %}

{% block title %}{{ title }}{% endblock %}

{% block body %}
<div id="app" class="row g-3 align-self-center">
<h1 class="display-4 text-center  mb-3 mt-5">{{ title }}</h1>
<p class="lead  text-center">{{ desc }}</p>
<hr/>
<div class="container-fluid">
    <h3 class="mb-5">
      訂單號碼 <small class="text-muted">{{ order_no }}</small>
    </h3>
    {% if payment_type == "atm" %}
    <h6>您可以透過兩種方式進行ATM轉帳</h6>
    <div class="row">
        <div class="col border border-secondary rounded m-2">
            <p class="fs-5">1. 請轉帳至下方永豐銀行虛擬帳戶</p>
            <p>
                銀行代碼 <span class="primary fs-4">807</span>
            </p>
            <p>
                轉帳號碼 <span class="primary fs-4 text-primary">{{ atm_pay_no }}</span>
            </p>
            <p>
                轉帳金額 <span class="primary fs-4">NT$ {{ amount }}</span>
            </p>

        </div>
        <div class="col border border-secondary rounded m-2">
            <p class="fs-5">2. 點選下方按鈕進入永豐線上WebATM轉帳</p>
            <a href="{{ atm_url }}" class="btn btn-light btn-lg" tabindex="-1" role="button" aria-disabled="true">跳轉至永豐線上WebATM</a>

        </div>
    </div>
    {% else %}
    <p>
        您這次的總消費金額是 <span class="text-primary fs-4">NT$ {{ amount }}</span>，請點選以下按鈕，進入信用卡刷卡頁面。
    </p>
    <a href="{{ card_pay_url }}" class="btn btn-success btn-lg" tabindex="-1" role="button" aria-disabled="true">進入永豐線上信用卡刷卡頁面</a>
    {% endif %}
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

首先，這裡其實用不到Vue，如果把Django View轉入的context變數再轉成Vue的binding，[昨天文章](https://ithelp.ithome.com.tw/articles/10278404)已示範過，其實在這個頁面中是多此一舉，因此我這次會直接以Django Template的變數直接替換。

這裡使用了if的邏輯，將付款方式拆開顯示訂單成立後所需要有差別的資訊。

#### 1. ATM虛擬帳戶付款

我們提供了兩種ATM付款方式，一個是把虛擬帳戶顯示在UI上，讓使用者使用自己慣用的轉帳方法去轉帳，因此當然需要列出`轉入銀行代碼`、`轉入帳號`以及告知其`金額`。

第二種是直接將永豐提供的線上WebATM的網址給他(我們寫成一個按鈕讓User點選)，不過先前有說明，詢問永豐技術部門後，這次測試這個網址的測試功能是不提供的。

但為了情境模擬，我們還是列出來供假想顧客作選擇，是不是很貼心。

不過這個情境都不需要我們真的付款，因為永豐API會自動幫我們模擬付款的動作，需要等幾分鐘就是了，如果有一整個系列收看的朋友，應該還記得中間我們花了不少天在處理PayToken的取得與詢問的部份，就在於那個千呼萬喚始出來的`BackendURL`實作 (我們放到了Heroku平台上)，因此先前都作完了，這部份也無需擔心了。

#### 2. 信用卡刷卡

信用卡刷卡就比較單純，直接給他永豐信用卡線上刷卡頁面，所以導入後就可以使用先前的測試信用卡進行刷卡了。

#### 共同部份

當然我們在上面會先顯示出建立訂單成功後的訂單號碼。以及頁尾處提供可再回到購物頁面挑選喜歡的狗骨頭商品，或是到我的訂單頁面去，因為無論是ATM或信用卡刷卡，都不一定要求顧客要「立刻完成」，因此我們之後還會實作我的訂單列表頁，可以在那邊查詢到付款狀態或者繼續在那邊選擇付款。

就來看一下畫面吧！

1-1. 購物車最終確認情境1：ATM付款
![https://ithelp.ithome.com.tw/upload/images/20211007/20130354UFLITLjpdC.png](https://ithelp.ithome.com.tw/upload/images/20211007/20130354UFLITLjpdC.png)

1-2. ATM付款頁面
![https://ithelp.ithome.com.tw/upload/images/20211007/201303543MpqLpohUe.png](https://ithelp.ithome.com.tw/upload/images/20211007/201303543MpqLpohUe.png)

1-3. WebATM刷卡頁面(暫不提供測試環境，因此此畫面是「正常」的)
![https://ithelp.ithome.com.tw/upload/images/20211007/20130354Fvk1VoVzlq.png](https://ithelp.ithome.com.tw/upload/images/20211007/20130354Fvk1VoVzlq.png)

2-1. 購物車最終確認情境2：信用卡
![https://ithelp.ithome.com.tw/upload/images/20211007/2013035405bKXMVry6.png](https://ithelp.ithome.com.tw/upload/images/20211007/2013035405bKXMVry6.png)

2-2. 信用卡付款頁面
![https://ithelp.ithome.com.tw/upload/images/20211007/20130354w6R5f53YWY.png](https://ithelp.ithome.com.tw/upload/images/20211007/20130354w6R5f53YWY.png)

2-3. 永豐信用卡線上刷卡頁面
![https://ithelp.ithome.com.tw/upload/images/20211007/20130354R8Ff80u7Ac.png](https://ithelp.ithome.com.tw/upload/images/20211007/20130354R8Ff80u7Ac.png)

#### 結語

把情境頁面實作上來後，有沒有愈有模有樣了呢？比起先前只用數據驗證的階段，可用UI操作串接起來有趣多了。不過，信用卡刷卡還有一個`ReturnURL`的導回頁面，這個明天再繼續完成。

![/images/emoticon/emoticon13.gif](/images/emoticon/emoticon13.gif)