---
sidebar_position: 25
---

今天這篇是我們實作**庫米狗屋●KummyShop**的情境電商模擬的最終章了！今天我們要把先前建的一堆訂單可以在**我的訂單**頁面呈現出來。

我們預計，可以在裡面看到：

* 訂單**排序**，新的在最上面
* 訂單會有**分頁**功能
* 會列出**訂單編號、總金額、付款方式、付款狀態、額外資訊或功能**(例如可以重新刷卡、顯示ATM轉帳帳號)
* 表格的列依不同狀態**區分顏色**：失敗為紅色、尚未付款為藍色，只有成功付款才會是白色。
* 將金額加上千位**逗號**、**日期格式化**、將原本付款方式、狀態代碼等換成**對應的文字**

### 簡化的部份說明

為了專注我們想談的功能，這邊作了很多的簡化，覺得和正式電商相比有缺少之處，都請自行腦補。

1. 沒有其他的User，所以也不用分了，所以全店的資料都歸同一個人所有，不用篩選了 (小孩才作選擇！)
2. 訂單裡面不會存當時選的商品內容，反正就是一筆一筆的訂單有金額以及當時選擇的付款方式
3. 不會多做額外的例外處理防護

那麼就可以開始往下看了。

### 準備一下取Order的Model

這支程式很簡單，我們需要可以取得以`id`來排序的降冪排序，最多回傳100筆資料。

```python
def get_my_orders(top=100):
    return Payment.objects.all().order_by('-id')[:top]
```

##### 程式說明

使用Model的`objects.all()`取回所有資料，但使用`order_by()`依`id`反向排序，作法就是在前面加上一個**減號**。而取排序後的前`top`筆資料，參數預設值為100。

### 接著在View新增my_orders

在這裡我們需要處理的是取得model中的orders資料，以及加上分頁的機制。我們可使用Django內建的`Paginator`模組來快速產生分頁的計算與資料切割，相當方便。

```python
from django.core.paginator import Paginator

def my_orders(request):
    page_number = request.GET.get('page', 1)
    orders_total = get_my_orders()
    paginator = Paginator(orders_total, 10)
    page_orders = paginator.page(page_number)
    context = {"page_orders": page_orders}
    return render(request, 'order/my_orders.html', context)
```

##### 程式說明

這裡需要使用`Paginagor`的類別來裝載我們取回的order資料，並設定其分頁一頁大小，我們設定10筆為一頁。
接著就可以從request傳入一個`page`參數來決定等一下返回給Template資料是第幾頁的資料內容，這些全部都交給paginator機制來運算。

### 更有效的處理代碼轉換問題

我們有很多的值都是以代碼儲存，那顯示的時候怎麼辦呢？
在上一篇文章有提到一些上次作了一小部份代碼轉換的想法，這次我們使用了Django Template的TemplateTags的作法來解決。

我們會需要準備兩個轉換代碼的方法，一個來處理**付款方式**(C或A)，一個來處理**付款狀態**(W、S、F)。我們需要在Django 對應的App底下(我們這裡是`order` App)，建立一個名為`TemplateTags`的目錄，在底下新增一個空白的`__init__.py`作為識別用途，以及一個我們要處理的邏輯`order_converter.py`。

在我們的Django目錄如下所示：
![https://ithelp.ithome.com.tw/upload/images/20211009/20130354DmA1eRuGa9.png](https://ithelp.ithome.com.tw/upload/images/20211009/20130354DmA1eRuGa9.png)

```python
from django import template

register = template.Library()


@register.filter
def convert_pay_status(value):
    convert_dict = {"W": "尚未付款", "S": "付款成功", "F": "付款失敗"}
    return convert_dict.get(value.upper())


@register.filter
def convert_pay_type(value):
    convert_dict = {"A": "ATM轉帳", "C": "信用卡"}
    return convert_dict.get(value.upper())
```

##### 程式說明

接著來說明一下這支converter會用到的部份，這個是要給Template使用的，所以我們要先行引入django的template以及使用其Library()方法建立一個filter註冊物件。

我們使用屬性宣告方式在這兩個方法前面加上`@register.filter`，接著就使用簡單的方式把對應的代碼作轉換後回傳。

這裡我們為了不失焦，不特別去處理其他的異常處理作法，但在產品級的系統裡，請要額外處理不在我們認知的值的處理機制。而且這樣的對應表，通常也會另外準備在外部的properties檔或資料庫中去定義，不會直接hard code在程式碼裡面。總之，鐵人賽這一系列文章中，僅處理需要的邏輯與簡易式寫法，不會特別去處理try/catch的異常處理機制，有需要參考者，請自行花時間去撰寫具備保護力(咦?)的程式碼喔！

### 重頭戲，我們的最後呈現Template

```html
{% extends "base.html" %}
{% load bootstrap5 %}
{% load humanize %}
{% load order_converter %}

{% block title %}{{ title }}{% endblock %}

{% block body %}
<nav id="app" class="row g-3 align-self-center">
<h1 class="display-4 text-center  mb-3 mt-5">我的訂單</h1>
<p class="lead  text-center">看看我都買了些什麼呀…</p>
<hr/>
<div class="">
<table class="table">
  <thead>
    <tr>
      <th scope="col">訂單號碼</th>
      <th scope="col">總金額</th>
      <th scope="col">訂單時間</th>
      <th scope="col">付款方式</th>
      <th scope="col">付款狀態</th>
      <th scope="col">動作</th>
    </tr>
  </thead>
  <tbody>
    {% for order in page_orders %}
    <tr class={% if order.pay_status == 'F' %}"table-danger"{% elif order.pay_status == 'W' %}table-info{% endif %}>
      <th scope="row">{{ order.order_no }}</th>
      <td>NT$ {{ order.amount|intcomma }}</td>
      <td>{{ order.create_time|date:'Y-m-d H:i' }}</td>
      <td>{{ order.pay_type|convert_pay_type }}</td>
      <td>{{ order.pay_status|convert_pay_status }}</td>
      <td>{% if order.pay_status == 'F' %}<a href="{{ order.card_pay_url }}" >重新刷卡</a>{% endif %}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>
</div>

<div class="text-center">
    <span class="current">
        第 {{ page_orders.number }} 頁 / 共 {{ page_orders.paginator.num_pages }} 頁
    </span>
</div>

<ul class="pagination justify-content-center">
    {% if page_orders.has_previous %}
        <li class="page-item"><a class="page-link" href="?page=1">第一頁</a></li>
        <li class="page-item"><a class="page-link" href="?page={{ page_orders.previous_page_number }}">上一頁</a></li>
    {% endif %}

    {% if page_orders.has_next %}
        <li class="page-item"><a class="page-link" href="?page={{ page_orders.next_page_number }}">下一頁</a></li>
        <li class="page-item"><a class="page-link" href="?page={{ page_orders.paginator.num_pages }}">最末頁</a></li>

    {% endif %}
</ul>

</div>
{% endblock %}

{% block script %}
{% endblock %}
```

##### 程式說明

剛前面有提到我們的幾個資料顯示處理要點，忘記的可以再到上面確認一下。

我們取回了具備已分頁完的order資料，因此我們想要在表面上，使用for迴圈把資料顯示在上面，所以需要在`tr`的地方加上所需的迴圈邏輯。

我們搭配使用了Bootstrap的Table顯示，因此等一下針對不同`付款狀態`會有不同的bootstrap的顏色，我們會帶入相對應的table color CSS。

#### 處理格式與代碼轉換

其中，我們會顯示五個欄位的值：**訂單編號、總金額、付款方式、付款狀態、額外資訊或功能**

在**總金額**的地方，我們需要將數字加上千位數逗號，這部份可使用`humanize`模組的`intcomma`功能，要使用之前，需在`settings.py`中的`INSTALLED_APPS`加上模組的設定才能使用。

```
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    'bootstrap5',
    'order',
    'greetings',
]
```

接著就可以很簡單在Template中的變數後面加上`|`後套入使用，如此一來`NT$ 12345`就會變成`NT$ 12,345`了。
而時間格式也可以使用filter帶入，如下方code所示。

```html
{% load humanize %}

<!-- …略… -->

      <td>NT$ {{ order.amount|intcomma }}</td>
      <td>{{ order.create_time|date:'Y-m-d H:i' }}</td>      
```

在**付款方式、付款狀態**的地方，我們就可以套用寫好的TemplateTags filter，分別是`convert_pay_type`和`convert_pay_status`，使用方法和上面一樣。

```html
{% load order_converter %}

<!-- …略… -->

      <td>{{ order.pay_type|convert_pay_type }}</td>
      <td>{{ order.pay_status|convert_pay_status }}</td>
```

如此一來，就可以將付款狀態例如`S`轉換成`付款成功`的文字表示。

#### 處理付款狀態的表格Row顏色

我們可依據訂單的付款狀態，來改變Bootstrap的顏色。
所以這裡很簡單依狀態，將付款失敗改成table-danger或尚未付款改為table-info。

#### 額外資訊或功能

當訂單在付款成功的狀態，我們顏色就是維持白色系，額外資訊也會保持空白。

1. 如果是**ATM轉帳**「尚未付款或付款失敗」：我們會將所需要轉入的付款虛擬帳號再帶出來，讓顧客可以再次執行轉帳動作。(如果可以，應該把失效期限也跟顧客說明)
2. 如果是**信用卡**「尚未付款或付款失敗」：我們會將線上刷卡的網址再帶給顧客進行刷卡，但當然有可能帶出來的頁面已失效無法使用。

#### 處理分頁程式

在分頁的處理，我們原先從View轉至Template時，記得`page_orders`物件是怎麼來的嗎？
看一下這三行，我們是使用了paginator的page()取回仍具備有分頁功能的物件。

```python
    orders_total = get_my_orders()
    paginator = Paginator(orders_total, 10)
    page_orders = paginator.page(page_number)
```

所以在Template中，我們依舊可使用其相關的功能來作判斷或進行分頁頁數的取得。

number：目前的頁數
has_previous：判斷是否有上一頁 (如果沒有，表示就在第一頁)
previous_page_number：如果有，則自動取回上一頁的頁碼。

has_next：判斷是否有下一頁 (如果沒有，表示就在最後一頁)
next_page_number：如果有，則自動取回下一頁的頁碼。
paginator.num_pages：取回總頁數

則我們可以依這些好用的屬性，帶入我們的URL中進去換頁的page參數。

好囉，可以看一下我們的畫面了！

![https://ithelp.ithome.com.tw/upload/images/20211009/201303541H3JI1tuJu.png](https://ithelp.ithome.com.tw/upload/images/20211009/201303541H3JI1tuJu.png)

這樣就把**我的訂單**頁面完成了！

明天開始就回顧一下這些日子來，對豐收款的一些使用與設計上的心得，之後剩下幾天再來看要談哪些沒談到的議題，或者是來研究一點Shioaji了。