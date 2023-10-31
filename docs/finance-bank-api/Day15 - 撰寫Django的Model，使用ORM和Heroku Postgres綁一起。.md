---
sidebar_position: 16
---

今天面臨了斷更的危機！

本人從昨晚開始腸胃不適，整晚翻來覆去無法入眠，早上更嚴重，請假了一整天，接著開始發燒和嘔吐，下午去掛了大醫院的急診後，是急性腸胃發炎，剛剛打完點滴才回來，折騰了一整天，原本上天可能要我放棄。

不過再怎麼說都努力了一半了，雖然現在身體相當不適，一整天完全沒有進食，決定還是再努力一下，中斷了實在可惜。

#### 回到正題

但在此之前，我們因為受限於Heroku的資料庫限制，無法使用預設的SQLite，要先修改一下資料庫設定成Postgres。我們先找到Django App mysite目錄底下的`settings.py`，修改其中`DATABASES`的Dictionary物件，把原先預設的`sqlite3`換成`postgresql`。當然還要加上其他的參數，包含`USER`、`PASSWORD`、`HOST`、`PORT`。

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'd15______rvdt',
        'USER': 'xbz______bsnz',
        'PASSWORD': 'bfbca81796d______________________d5162d1c69dc3dd9e76e5',
        'HOST': 'ec2-________-31.compute-1.amazonaws.com',
        'PORT': '5432'
    }
}
```

然後，我們就可以先新增一個`order` Django App，然後再其目錄底下的`models.py`設定一個新的模型。

```python
from django.db import models


class Payment(models.Model):
    order_no = models.CharField(max_length=13)
    ts_no = models.CharField(max_length=14, null=True)
    amount = models.IntegerField()
    pay_type = models.CharField(max_length=10)
    pay_status = models.CharField(max_length=20, null=True)
    pay_token = models.CharField(max_length=100, null=True)
    atm_pay_no = models.CharField(max_length=14, null=True)
    web_atm_url = models.CharField(max_length=250, null=True)
    otp_url = models.CharField(max_length=250, null=True)
    card_pay_url = models.CharField(max_length=250, null=True)
    create_time = models.DateTimeField()
    lm_time = models.DateTimeField(null=True)

    def __str__(self):
        return self.order_no
```

##### 程式說明

我們在`order`的models.py，新增了一個`Payment` class，接著就要定義其中有哪些屬性。這些屬性均可透過`models`的對應方法，來定義該屬性的資料型別，以及一些額外的宣告與限制。

例如：

* 要新增一個文字類型的屬性，可使用models.CharField()
* 要新增一個整數類型的屬性，可使用models.IntegerField()
* 要新增一個時間類型的屬性，可使用models.DateTimeField()
  完整的用法請參閱Django的[官方文件](https://docs.djangoproject.com/en/3.2/ref/models/fields/)。

而我們對應到資料庫中，若是希望該欄位是`非NULL`的話，則可在其中參數加上`null=True`。而若有最大長度限制，則可使用`max_length`來指定。

在設定完成後，因為剛剛我們已設定settings.py中的DATABASE連線資訊，因此我們可以透過manage.py的`makemigrations`以及`migrate`指令將異動更新至連結的DATABASE。

```
mysite > python manage.py makemigrations
mysite > python manage.py migrate
```

接著我們可以使用pgAdmin看看Tables裡面發生了什麼神奇的事。

![https://ithelp.ithome.com.tw/upload/images/20210930/20130354fPMA0p0zZX.png](https://ithelp.ithome.com.tw/upload/images/20210930/20130354fPMA0p0zZX.png)

可以在Shcemas > Tables底下，發現新增了一個`order_payment`的Table。而裡面的欄位，就是依照剛剛Django Model所定義的欄位所建立的。由於我們沒有新增primary_key，因此預設會新增一個`id`欄位作為PK。

#### 新增一筆ATM虛擬帳戶訂單

我們需要先將先前產生一筆訂單的零散測試用的python code，先整理到App底下，我命名為SinopacAPI.py。並在底下開一個static method，讓它可以直接呼叫永豐API產生一筆訂單，並且最後將解密回傳後的JSON回傳回來。接著就可以將其值都拿出來，產生一個新的`Payment`物件，把值設定好後，再善用具備ORM映射的Payment物件的`.save()`方法，將值寫到資料庫中。

在order/models.py中，擴增create_new_order()：

```python
from datetime import datetime
from django.db import models
from .sinopacapi import SinopacAPI

def create_new_order(will_paid, amount):
    resp_json = SinopacAPI.create_new_order(will_paid, amount)
    new_payment = Payment()
    new_payment.order_no = resp_json["OrderNo"]
    new_payment.ts_no = resp_json["TSNo"]
    new_payment.amount = resp_json["Amount"]
    new_payment.pay_status = resp_json["Status"]
    new_payment.atm_pay_no = resp_json["ATMParam"]["AtmPayNo"]
    new_payment.web_atm_url = resp_json["ATMParam"]["WebAtmURL"]
    new_payment.otp_url = resp_json["ATMParam"]["OtpURL"]
    new_payment.create_time = datetime.now()
    new_payment.save()

    return resp_json
```

而在View中，我先以最簡單的方式呼叫後，在頁面上會顯示出這次的OrderNo。
在order/views.py的程式碼

```python
from django.http import HttpResponse
from .models import create_new_order


def create_order(request):
    will_paid = True
    amount = 799
    resp_json = create_new_order(will_paid, amount)
    print("### resp_json: {}".format(resp_json))
    return HttpResponse("New Order Created: {}".format(resp_json["OrderNo"]))
```

當然也需要將urls.py設定一下，以下為order/urls.py

```python
from django.urls import path
from . import views

urlpatterns = [
    path('createorder', views.create_order, name='createorder'),
]
```

因此我們就可以先在本機端測試一下：
http://127.0.0.1:8000/order/createorder

![https://ithelp.ithome.com.tw/upload/images/20210930/20130354iecz0zZSAe.png](https://ithelp.ithome.com.tw/upload/images/20210930/20130354iecz0zZSAe.png)

接著我們再到pgAdmin中查看order_payment的資料：

![https://ithelp.ithome.com.tw/upload/images/20210930/20130354BzwKhJ5Hm5.png](https://ithelp.ithome.com.tw/upload/images/20210930/20130354BzwKhJ5Hm5.png)

太感動了，我們成功運用ORM的方法，產生一筆訂單了。

身體不舒服，今天只能勉強先做到這樣，明天再來產生真的BackendURL給永豐作呼叫，並行來看看我們是否能成功取得PayToken。