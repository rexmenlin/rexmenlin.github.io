---
sidebar_position: 13
---

昨天遇到的找不到情境被觸發ReturnURL，由於測試環境Message中解開的兩個網址：`WebAtmURL`以及`OtpUrl`連過去一個會出現錯誤訊息，一個連結不到。

經由寫信詢問永豐技術處的窗口後，及時得到一個完整的回覆也釐清心中的疑惑 (不然就要斷更了!!)，給永豐數金處數位支付部門一個**讚**！
![/images/emoticon/emoticon12.gif](https://ithelp.ithome.com.tw/images/emoticon/emoticon12.gif)

我直接整理我的問題以及回覆後的摘要結果如下：

* `WebAtmURL`以及`OtpUrl`於測試環境中無法使用，僅會作10分鐘內模擬顧客取得虛擬帳號後付款完成(或不付)
  * 因此，昨天出現網頁無法使用，是**預期內正常**的。
* `ReturnURL`會被觸發的時機僅：
  1. **信用卡**即時交易成功/失敗通知 
  2. 虛擬帳號方式，透過`WebAtmURL`或`OtpUrl`轉帳 (但如同前面所述，測試環境未開
* 因此，在虛擬帳號的方試下，只能使用`BackendURL`來取得`PayToken`值！ (雖然BackendURL是虛擬帳號的非必填值)

所以意思就是，若沒有架一個網站讓永豐API呼叫`BackendURL`的方式，我們使用虛擬帳號模擬付款是拿不到`PayToken`的。因此我們得提前進行Django的Python Web開發了。

### Django初登場

上一次使用Python + Django開發Web已經是去年的時候，因有幸參加了【台灣人工智慧學校 / 技術領袖班】AI課程時，期末專題開發時所使用，不然過去近10年主要工作上是用ASP.NET (含MVC)開發，更早期一點是使用JSP以及PHP(十多年前了)。使用Python開發網站的經驗倒是覺得很新鮮。

#### 準備環境

我預計使用PyCharm Community Edition版本來進行Django的開發實作，因此先安裝一下PyCharm，由於Community版有許多與Django的專案功能沒有像Professional版可以直接在UI中整合進去，因此仍然會需要搭配一些console指令來完成。

我們後續會圍繞著一個虛構的電商平台「庫米狗屋．KummyShop」來建置，因此先行開設一個空的Python專案 (建立一個新的虛擬環境venv)。透過PyCharm下方的Terminal先使用pip安裝django。

> 庫米Kummy，是我家的毛孩，一隻帥氣又可愛的長毛臘腸！電商平台讓他有買不完的飼料和狗骨頭吧！

```
pip install django
```

![https://ithelp.ithome.com.tw/upload/images/20210927/20130354Zq6uAvebqJ.png](https://ithelp.ithome.com.tw/upload/images/20210927/20130354Zq6uAvebqJ.png)

#### 建立django專案

接下來，我們則可以使用剛剛安裝好的django套件中的`django-admin`指令來新增django專案。在KummyShop Python專案的根目錄下，輸入以下指令：

```
> django-admin startproject mysite
```

使用特別的參數`startproject`後面加上你喜歡的專案名稱。再看一下Pycharm的Project Tree，會看到多出了相關的目錄結構。

![https://ithelp.ithome.com.tw/upload/images/20210927/20130354fNuzR1B2uH.png](https://ithelp.ithome.com.tw/upload/images/20210927/20130354fNuzR1B2uH.png)

其實這樣就已經把最基礎的Django網站建立起來了，接下來我們就可以使用Django內建的開發模式Web伺服器將網站結果跑起來。

#### 設定Runserver啟動組態

點選在PyCharm的右上方`Add Configuration...`的按鈕後，新增一個新的Python Run/Debug的組態設定。

![https://ithelp.ithome.com.tw/upload/images/20210927/20130354HjftFMz3Tl.png](https://ithelp.ithome.com.tw/upload/images/20210927/20130354HjftFMz3Tl.png)

剛剛在使用startproject後，會於`mysite`底下有一個重要的`manage.py`檔案，需要將之完整路徑設定於`Script Path`中。而在Parameters參數輸入特定用法`runserver`，這樣就把這個Django的啟動組態設定完成。

![https://ithelp.ithome.com.tw/upload/images/20210927/20130354X1oHa0SgKg.png](https://ithelp.ithome.com.tw/upload/images/20210927/20130354X1oHa0SgKg.png)

完成後即會產生"Run"或"Debug"的按鈕來啟動Django Dev Server。點選後就會在Terminal看到Django的開發網站被啟動了，連結到Terminal訊息顯示的預設網址`http://127.0.0.1:8000/`，即可確認一下我們的Django網站是否成功

![https://ithelp.ithome.com.tw/upload/images/20210927/2013035426xWRTHaW2.png](https://ithelp.ithome.com.tw/upload/images/20210927/2013035426xWRTHaW2.png)

#### 發射！網站啟動

如果可以看到下面這個畫面，就表示我們成功把網站建立好，也可以正常運行！
![https://ithelp.ithome.com.tw/upload/images/20210927/201303549e5jPClNXN.png](https://ithelp.ithome.com.tw/upload/images/20210927/201303549e5jPClNXN.png)

#### 建立一個簡單的頁面

看到預設頁面應該還感到太不踏實，至少要看到一頁是我們自己準備的頁面，才會有一點點安心感，接著我們就要繼續使用`django-admin`指令來建立新的功能頁面，不過要先說明一下，一個新的功能頁面在Django會稱之為`App`。

我們要先進入mysite目錄後，再使用建App的指令。

```
> cd mysite
> django-admin startapp greetings
```

看一下專案目錄，會多出`greetings`的新目錄。

![https://ithelp.ithome.com.tw/upload/images/20210927/201303543TaTAwmJ77.png](https://ithelp.ithome.com.tw/upload/images/20210927/201303543TaTAwmJ77.png)

我們在其中的`greetings\view.py`中，加入一段index的內容，順便測試中文輸出。

```python
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. 歡迎來到 【庫米狗屋 ● Kummy Shop】")
```

接著我們在`greetings`目錄下建立一個新的檔案，名為`urls.py`，裡面輸入這些內容，將剛剛的index綁定到greetings URL底下不用輸入任何名稱的預設頁面。

```python
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

上面是將greetings這個App相對應的view內容準備好，以及urls的對應設定好。
接著是要在整個Django的Root底下(也就是`mysite`)設定這個新增的App的URL對應。

我們修改`mysite\urls.py`，原本有預設引入urls下的`path`，但少了`include`，需自行補上。
再把剛剛的`greetings`以及他的`greetings.urls`給指定進去。

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('greetings/', include('greetings.urls')),
    path('admin/', admin.site.urls),
]
```

將網址連到剛剛的`http://127.0.0.1:8000/greetings/`，果然看到剛剛準備好的greetings的內容顯示在上面了！

![https://ithelp.ithome.com.tw/upload/images/20210927/20130354ssT7ZSwOoV.png](https://ithelp.ithome.com.tw/upload/images/20210927/20130354ssT7ZSwOoV.png)

這下是否感到心裡踏實了呢！
![/images/emoticon/emoticon34.gif](https://ithelp.ithome.com.tw/images/emoticon/emoticon34.gif)

#### 加一個URL參數取值

不過因為後面要使用BackendURL來取得PayToken，所以我們先再加測一個URL的GET取參數值。就直接使用剛剛的greetings吧，我們多加上一個從網址列取得`your_name`參數，並顯示在頁面上吧！

```python
from django.http import HttpResponse


def index(request):
    your_name = request.GET.get("your_name", "Noname")
    return HttpResponse("Hello, {}. 歡迎來到 【庫米狗屋 ● Kummy Shop】".format(your_name))
```

![https://ithelp.ithome.com.tw/upload/images/20210927/20130354ekTFIQmt9r.png](https://ithelp.ithome.com.tw/upload/images/20210927/20130354ekTFIQmt9r.png)

這下心裡果然實在了一點呀。

今天我們先把最基礎的Django網站跑起來，可取得URL參數顯示出來，明天再來傷腦筋我們要將網站架設在什麼地方，讓永豐API可以將值傳回來。