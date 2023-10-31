---
sidebar_position: 21
---

我們的豐收款主題完結了嗎？

今天即使達成鐵人賽的2/3賽程，在先前的篇幅已完整將每一個功能都實作出來了，原本在思考剩下的1/3是否要結束豐收款的主題，抓緊時間啟動另一個Shioaji的證券主題。不過想說既然頭都洗了，不如就趁這個機會，再強化一些使用Django來實作電商UI端的情境範例，所以接下來就是再把幾個使用情境寫一寫，讓整個串接的運作更有感。Shioaji就再往後擺，看後面有剩下的時間的話再來淺談幾篇了，雖然其實我蠻想試試程式交易這個議題。(好想有平行時空另一個我再寫Shioaji的主題呀)

### 不如，繼續豐收吧！

所以接下來是會以Django Web的幾個頁面實作情境，帶到串接我們之前實作完成的永豐API Python程式碼，也讓有興趣想多了解Django的實作的朋友有機會將「**豐收款API + Python + Web技術**」三個願望，一次滿足。

### Django專用Bootstrap套件準備

首先，為了讓UI可以簡單快速套用自適應效果以及有美美好用的UI元件，我會使用Bootstrap作為UI Framework。當然若你們有更順手的UI元件也可以隨意選用。在Django中，有專門的Bootstrap套件可直接安裝，而不需要直接複製Bootstrap的Javascript與CSS等檔案進來。有`django-bootstrap`套件的好處是在Django Template中使用JS或CSS的引用時，是會更貼近Python套件的用法，而非操作硬生生的檔案引用的作法。

首先，先使用pip進行django-bootstrap套件安裝。

```
> pip install django-bootstrap-v5
```

![https://ithelp.ithome.com.tw/upload/images/20211005/2013035480vGPVRMiD.png](https://ithelp.ithome.com.tw/upload/images/20211005/2013035480vGPVRMiD.png)

我們因為最後要將程式上到實際的Heroku PaaS環境中，記得要再重新產生一次`requirement.txt`。這個是為了在做佈署時，讓Heroku Server知道需要連帶安裝的套件。

> 記得先退到Python Project的root folder去。

還記得語法嗎？ 使用pip freeze將結果導出成檔案，指定到根目錄下的`requirements.txt` (記得結尾有s)

```
> pip freeze > requirements.txt
```

以我的例子，在`requirements.txt`中，多出了剛剛安裝的`django-bootstrap-v5==1.0.5`

```
asgiref==3.4.1
beautifulsoup4==4.10.0
certifi==2021.5.30
charset-normalizer==2.0.6
crypto==1.4.1
decorator==5.1.0
dj-database-url==0.5.0
dj-static==0.0.6
Django==3.2.7
django-bootstrap-v5==1.0.5
gunicorn==20.1.0
idna==3.2
importlib-metadata==3.10.1
Naked==0.1.31
psycopg2==2.9.1
pycryptodome==3.10.4
pytz==2021.1
PyYAML==5.4.1
requests==2.26.0
shellescape==3.8.1
soupsieve==2.2.1
sqlparse==0.4.2
static3==0.7.0
urllib3==1.26.7
zipp==3.6.0
```

記得，在mysite底下的settings.py中，要在`INSTALLED_APPS`中加上`bootstrap5`，才會生效喔！
例如：

```
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'bootstrap5',
    'order',
    'greetings',
]
```

### 在greetings再加個測試試試

還記得我們剛使用Django時，寫了一個greetings的醜醜測試頁面(index)，現在我們在下面再加上一個test頁面，來測試一下剛剛的Bootstrap套件。

不知道要怎麼使用Bootstrap的話，可以使用這個頁面模板產生器網站：
https://generator.ws/demo/

選一個你喜歡的模版後即可簡單下載，我們就把這個內容拿來做成我們要測試的Django Template頁。

![https://ithelp.ithome.com.tw/upload/images/20211005/20130354nmrQ7Tk5dO.png](https://ithelp.ithome.com.tw/upload/images/20211005/20130354nmrQ7Tk5dO.png)

#### 先產生一個Template頁吧

我們要使用Django的Template，才能強化View的呈現，總不能每次都只能硬刻HTML語法然後用HttpResponse傳回去吧。

在我們的Django App下，例如這次是在`greetings`下建立一個`templates`目錄，接著，在底下再建一個`greetings`目錄，然後才把你要的Template HTML放在底下。

有些人會把頁面直接擺在templates的目錄底下，而沒有多建一個與App名稱相同的目錄，這樣基本上若你App之間沒有使用相同名稱的話雖不會錯，但不建議這樣使用。若不同的Django App使用了相同的View頁面名稱，會有抓取順序錯誤的可能。

因此我們建立一個`test.html`，放置位置在：mysite/greetings/templates/greetings/test.html

內容如下：

```html
{% load bootstrap5 %}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Welcome to KummyShop</title>
    <meta charset="utf-8">
    <meta name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    {% bootstrap_css %}
    <link rel="icon" href="favicon.ico">
  </head>
  <body>
    <section class="bg-light pt-5 pb-5">
      <div class="container pb-5">
        <div class="row justify-content-center d-flex">
          <div class="col-xs-12 col-md-10 align-self-center">
            <h1 class="display-4 text-center  mb-3 mt-5">{{ title }}</h1>
            <p class="lead  text-center">{{ desc }}</p>
            <div class="justify-content-center d-flex mt-3 mb-1">
              <a class="btn btn-primary  btn-lg   mt-md-3 me-2" href="#"
                role="button">{{ buttons.0 }}</a>
              <a class="btn btn-outline-secondary  btn-lg   mt-md-3 ml-md-3"
                href="#" role="button">{{ buttons.1 }}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  {% bootstrap_javascript %}
  </body>
</html>
```

##### 程式說明

上面落落長，重點幾個：

1. 我們在檔案頭的地方加入`{% load bootstrap5 %}`，在meta加入`{% bootstrap_css %}`，在body結束前加入`{% bootstrap_javascript %}`
2. 中間h1大標加上`{{ title }}`，底下p段落加上`{{ desc }}`，兩個button加上`{{ buttons.0 }}`與`{{ buttons.1 }}`

前面是為了產生bootstrap5所需要的javascript與css檔，後面則是我們從View屆時會準備傳入相關的變數，要拿來顯示用。

#### 在View中準備給Template的資料

於是我們可以在View中撰寫test頁所需要的資料，不過通常順序一般規畫是反過來的，照理說會先實作View中要準備什麼資料，然後才在Template裡去挖洞填入。但因為剛剛先行介紹了Template後，不想跳來跳去的，但我相信聰明的讀者一定可以理解。(好不負責任呀…)

我們在greetings的`view.py`中，新增這段：

```python
from django.shortcuts import render

def test(request):
    context = {
        "title": "庫米狗屋 ● Kummy Shop",
        "desc": "這裡應有盡有，只是都缺貨中，歡迎使用永豐銀行信用卡唷！",
        "buttons": ["加入會員", "我先逛逛"]
               }
    return render(request, 'greetings/test.html', context)
```

##### 程式說明

這裡我們使用和先前直接回傳`HttpResponse`型別回去稍有不同，我們使用了`render`的方式回傳，把綁定Template機制的所需資料以簡化的方式丟回去即可，你只需要準備好context所需要的資料，把request、template位置、context放進參數中。

如果是使用HttpResponse的方式，你還需要先將Template先用loader載入，再用loader去render()出來，上面這個作法是較為精簡快速的作法，雖然如果有用到進階一點的使用方式會有些許功能作不到。完整作法可至Django官網都看的到，這邊主題不是以Django細部講解為主，因此點到為止囉。

迫不及待了吧，之前的頁面因為目的不同，為了實作串接永豐API的驗證正確性為目的，都醜醜的，即將煥然一新了！

![https://ithelp.ithome.com.tw/upload/images/20211005/20130354lr6QZl1XVt.png](https://ithelp.ithome.com.tw/upload/images/20211005/20130354lr6QZl1XVt.png)

我們可以按右鍵看一下HTML原始碼：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Welcome to KummyShop</title>
    <meta charset="utf-8">
    <meta name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link crossorigin="anonymous" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" rel="stylesheet">
    <link rel="icon" href="favicon.ico">
  </head>
  <body>
    <section class="bg-light pt-5 pb-5">
      <div class="container pb-5">
        <div class="row justify-content-center d-flex">
          <div class="col-xs-12 col-md-10 align-self-center">
            <h1 class="display-4 text-center  mb-3 mt-5">庫米狗屋 ● Kummy Shop</h1>
            <p class="lead  text-center">這裡應有盡有，只是都缺貨中，歡迎使用永豐銀行信用卡唷！</p>
            <div class="justify-content-center d-flex mt-3 mb-1">
              <a class="btn btn-primary  btn-lg   mt-md-3 me-2" href="#"
                role="button">加入會員</a>
              <a class="btn btn-outline-secondary  btn-lg   mt-md-3 ml-md-3"
                href="#" role="button">我先逛逛</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  <script crossorigin="anonymous" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
  </body>

</html>
```

其中，可以比對一下原先插入bootstrap相關的位置

1. meta區，產生出相關的bootstrap CSS引用
   
   ```html
   <link crossorigin="anonymous" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" rel="stylesheet">
   ```

2. body之前，產生出相關的bootstrap Javascript引用
   
   ```html
   <script crossorigin="anonymous" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
   ```

接下來實作情境頁面，當然不會去實作商品頁與購物車的部份(寫完又30天了)，所以我們會直接從「結帳頁面」開始寫起，把有串到永豐API的情境頁實作出來。

明天繼續！