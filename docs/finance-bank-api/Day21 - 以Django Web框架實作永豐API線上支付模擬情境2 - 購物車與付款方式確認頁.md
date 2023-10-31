---
sidebar_position: 22
---

我們今天簡單帶一點Django Template繼承的概念，也就是當你有每一頁面具備無論在哪一樣都有相同的內容片段時，可採用這個方式把相同的部份拆出來，而具體不同的功能頁面只要先繼承後，再實作有差異的程式段，和程式碼把共用的地方設計成父類別，子類別先繼承後再進行override是一樣的概念。

### 建立一個base.html Template

先在Django App根目錄下，建立一個templates的目錄，然後建立一個base.html

記得在settings.py中，TEMPLATES底下的DIRS，改成如下：

```
    'DIRS': [os.path.join(BASE_DIR, 'templates')],
```

註：前面記得import os

```html
{% load bootstrap5 %}
<!DOCTYPE html>
<html>

  <head>
    <meta charset="UTF-8">
    <title>{% block title %}{% endblock %}</title>
    <meta charset="utf-8">
    <meta name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="favicon.ico">
    {% bootstrap_css %}
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">庫米狗屋 ● KummyShop</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarsExample02" aria-controls="navbarsExample02"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsExample02">
          <ul class="navbar-nav me-auto">
            <li class="nav-item active">
              <a class="nav-link" href="{% url 'order_create_entrance' %}"><span
                  class="sr-only">回狗屋</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="{% url 'my_orders' %}">我的訂單</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <section class="pt-5 pb-5">
      <div class="jumbotron ">
        <div class="container">
          {% block body %}{% endblock %}
        </div>
      </div>
    </section>
  {% bootstrap_javascript %}
  <script src="https://unpkg.com/vue@next"></script>
  {% block script %}{% endblock %}
  </body>
</html>
```

##### 程式說明

把你到時候子頁面想換掉的地方都透`{% block blockname %}{% endblock %}`來挖洞設置，以上面為例，我先設定以下的block區：

* title
* body
* script

另外我引入了`Vue.js`的CDN進去，讓前端頁面可支援Vue的使用，當然你也可以使用其他的前端框架。

### 開設一個建立訂單入口頁

有了剛剛的模版Base後，我們就可以很輕鬆的開設繼承的子頁面，然後只要把上面三個挖洞的區域重新填入我們要的html區段即可。

#### [View]在order app下增加一個新的def order_create_entrance

```python
def order_create_entrance(request):
    context = {
        "title": "下好離手，準備付款",
        "desc": "以下是我們幫你隨機挑選好的訂單，如果有不喜歡的商品請順心接受，偶爾這樣也不是壞事。接著請選擇你的付款方式囉！"
               }
    return render(request, 'order/order_create_entrance.html', context)
```

如同昨天的greetings test示範，我們新增兩個context變數`title`和`desc`，將他傳遞至template中。

接下來我們就要看重頭戲了

#### [Template] 看一下繼承Template與Override的Block

```html
{% extends "base.html" %}

{% block title %}{{ title }}{% endblock %}

{% block body %}
<div id="app" class="col-xs-12 col-md-10 align-self-center">
<h1 class="display-4 text-center  mb-3 mt-5">[[ title ]]</h1>
<p class="lead  text-center">[[ desc ]]</p>
<div class="justify-content-center d-flex mt-3 mb-1">
</div>
</div>
{% endblock %}

{% block script %}
<script>
  const EventHandling = {
    data() {
      return {
        title: "{{ title }}",
        desc: "{{ desc }}"
      }
    },
    methods: {
    },
    delimiters: ['[[', ']]'],
  }
Vue.createApp(EventHandling).mount('#app')
</script>
{% endblock %}
```

##### 程式說明

最前面先使用`{% extends "base.html" %}`告知我們的這一頁，是繼承自另一個作為共同頁面Template而來。再來，就將先前定義的三個block都先長起來，然後把中間的部份填入我們所需要的內容，到時候生成最終版頁面的時候，就會連同base.html的內容一起整合運算後，才render給client端。

接著要解釋前，先Run起來看一下結果。
![https://ithelp.ithome.com.tw/upload/images/20211006/201303545ln1mooM6L.png](https://ithelp.ithome.com.tw/upload/images/20211006/201303545ln1mooM6L.png)

#### 咦，看起來好奇怪呀？

上面的程式碼如果有先看過昨天的文章的話，會覺得我們是不是寫錯了，怎麼裡面有些Django的變數綁定不是使用`{{ var }}`卻變成`[[ var ]]`呢！？

#### Vue，我加了Vue。

原來是我們把這個前端頁面也套用了Vue了的關係。

由於Vue和Django Template都使用`{{ var }}`的方式來bind，所以會有所衝突，因此在下面的Vue宣當時重新定義了Vue的delimiters為`[[`和`]]`。

你可以注意到，我恰好是將Django context的2個變數，和Vue的data綁定的2個變數都取一樣的名稱。如果你嘗試的將上面的頁面的`[[`和`]]`改成`{{`與`}}`，再跑一次頁面會發現頁面都一樣呀！哪有你說的衝突呢！？

如果你看一下原始碼就會發現他們的不同之處，為了解釋給各位理解，我就只換一個。
把Body區段的`[[ title ]]`換成`{{ title }}`，而`[[ desc ]]`保留原樣。

```html
<div id="app" class="col-xs-12 col-md-10 align-self-center">
<h1 class="display-4 text-center  mb-3 mt-5">下好離手，準備付款</h1>
<p class="lead  text-center">[[ desc ]]</p>
<div class="justify-content-center d-flex mt-3 mb-1">
</div>

<!-- 省略掉其他部份 -->

<script>
  const EventHandling = {
    data() {
      return {
        title: "下好離手，準備付款",
        desc: "以下是我們幫你隨機挑選好的訂單，如果有不喜歡的商品請順心接受，偶爾這樣也不是壞事。接著請選擇你的付款方式囉！"
      }
    },
    methods: {
    },
    delimiters: ['[[', ']]'],
  }
Vue.createApp(EventHandling).mount('#app')
</script>
```

上面的意思就是說，只有`[[ desc ]]`是**真正被Vue的data binding起了作用**，是在前端網頁被執行時才運算完成。但`{{ title }}`的部份，是**被Django Template的context變數綁定在後端產生前就被替換了**，因此HTML傳遞到前端Browser時看到就已經是靜態結果了。

沒聽懂也沒關係，總之，如果你有混用Django Template以及使用Vue的朋友，要記得作delimiters的重新定義。然後習慣另一個新的重定義語法，一樣可以讓兩套機制順利運行。

#### 完整網頁內容

```python
{% extends "base.html" %}

{% block title %}{{ title }}{% endblock %}

{% block body %}
<div id="app" class="row g-3 align-self-center">
<h1 class="display-4 text-center  mb-3 mt-5">{{ title }}</h1>
<p class="lead  text-center">{{ desc }}</p>
<hr/>
<div class="">
    <form action="{% url 'order_create_next' %}"  method="POST">
        <span>以下是這次訂單的商品，最後一次確認喔！</span>
        <div class="form-check " v-for="(item, index) in cart_items">
          <input class="form-check-input" type="checkbox" :value="item.price" :id="item.id" v-model="checked_items">
          <label class="form-check-label" :for="item.id">
            [[ item.item_name ]] / NT$ [[ item.price ]]
          </label>
        </div>

        <div>Total NT$ <span class="fs-3 text-primary">[[ sum_amount() ]]</span></div>
        <input type="hidden" name="amount" v-model="amount"></hidden>
        <hr/>
        <br />
        <div>選擇付款方式：</div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="payment" id="payment_atm" value="atm">
          <label class="form-check-label" for="payment_atm">
            使用永豐ATM虛擬帳號轉帳
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="payment" id="payment_card" value="card">
          <label class="form-check-label" for="payment_card">
            使用永豐線上信用卡刷卡支付
          </label>
        </div>
        <br />
        <button type="submit" class="btn btn-primary">付款去！</button>
    </form>
</div>

</div>
{% endblock %}

{% block script %}
<script>

  const EventHandling = {
    data() {
      return {
        cart_items: [
            {"id": 1, "item_name": "抹茶狗骨頭", "price": 750},
            {"id": 2, "item_name": "臘腸狗專用晚宴西裝", "price": 4900},
            {"id": 3, "item_name": "潮流嘻哈喝水碗", "price": 1200},
            {"id": 4, "item_name": "小型屁孩犬雞肉飼料(10KG裝)", "price": 3500},
            {"id": 5, "item_name": "冬涼夏熱毛孩專用萬用毯", "price": 1799}
          ],
        checked_items: [],
        amount: 0
      }
    },
    methods: {
        sum_amount: function() {
           this.amount = this.checked_items.reduce(function(a, b){
                return a + b;
           }, 0);
           return this.amount;
        }
    },
    delimiters: ['[[', ']]']
  }
Vue.createApp(EventHandling).mount('#app')
</script>
{% endblock %}
```

##### 程式說明

我們簡化購物車流程，直接使用Vue裡面先把5個庫米狗屋嚴選好物直接幫顧客列好好了，最後只需要勾選確認想要的產品就可以進入最終流程了！是不是快速又方便呢。

前面為了示範Vue與Django Template的混用，但實際title與desc兩個部份不太需要使用到Vue來綁定，因此把那段改成純使用Django Template的變數取代，甚至直接在這頁輸入明確文字其實也不是不行。但如果未來是有需要使用i18n多國語系的話，還是會將UI上的文字部份以變數方式取代，只是其內容不是用context的方式傳遞，可參考[這篇文章](https://zoejoyuliao.medium.com/django-%E5%9C%8B%E9%9A%9B%E5%8C%96-i18n-%E4%B8%80-%E5%9C%A8-template-%E6%96%B0%E5%A2%9E-i18n-%E6%A8%99%E7%B1%A4%E7%94%9F%E6%88%90-po-mo-%E6%AA%94-1d41f2fcfc78)進行i18n設定。

在這個頁面裡，Form裡面會使用POST方式，準備了2個主要的變數要往action頁面(`order_create_next`)傳遞，這兩個數值的內容，一個是由checkbox勾選商品時會計算累積金額，放到hidden input `amount`欄位中。

這裡使用了Javascript Array的一個特殊的方法`reduce()`，可放入累加函數，用這個方式很精簡的可快速計算所勾選的商品的總金額。有興趣了解進階用法可參考[這篇](https://w3c.hexschool.com/blog/a2cb755f)文章。

另一個就是我們的radio buttons選擇付款方式，名稱為`payment`。

完成付款前確認UI畫面如下：
![https://ithelp.ithome.com.tw/upload/images/20211006/20130354TRVF45cSk5.png](https://ithelp.ithome.com.tw/upload/images/20211006/20130354TRVF45cSk5.png)

所以我們還需要準備一個新的View def `order_create_next`來接收這一個POST後的頁面，待接收完後我們就可以繼續呼叫後面的API流程了！

請明天繼續看下去囉。