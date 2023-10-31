---
sidebar_position: 28
---

在前一篇文章，我們分析了各個資安防護的強弱要點，但由於固定式的初始四Hash組代碼是目前安全性最弱的部份，全仰賴人為保護，若是直接寫在Code裡面，那一來是作程式碼管控時會把具機敏性資料也一起撒出去給其他共同參與開發者外，另一方也降低建置佈署若未來有需要修改時的彈性(也就是若這些值要修改，就要重新改code，重新上線)。

所以應該有更好的方式來處理相關的機敏性資料，我們逐一盤點一下，一起修正：

1. 四組Hash代碼：為了產生作為AES Key的HashID，一開始由永豐提供給我們的
2. ShopNo商店代碼：這個看你認為需不需要防護，但提醒一下，取得Nonce值是會需要傳出ShopNo的。
3. DB的資料庫密碼

接下來我們可以思考如何更有效的管理。

### STEP1. 把機敏性屬性從Code中抽離出來

我們先前把Hash A1, A2, B1, B2都放在程式碼裡面，為了驗證目的，所以直接這樣使用當然最為方便。但我們既然談到資安是金流服務相當重要的環節，就把這一部份也一起做更優化的處理。

#### 使用settings來讀取

我們在settings.py中，可以新增四組Hash代碼的屬性：

```
HASH_A1 = "86D50DEF3EB7400E"
HASH_A2 = "01FD27C09E5549E5"
HASH_B1 = "9E004965F4244953"
HASH_B2 = "7FB3385F414E4F91"
```

然後在使用的code中，原本是這樣用的，以sinopacutil.py中的ApiMessage片段：

```python
class ApiMessage:
    shop_no = "NA0249_001"
    api_url = "https://sandbox.sinopac.com/QPay.WebAPI/api/Order"
    A1, A2, B1, B2 = "86D50DEF3EB7400E", "01FD27C09E5549E5", "9E004965F4244953", "7FB3385F414E4F91"

    def __init__(self, api_service):

        self.hash_id = SinopacUtil.get_hash_id(ApiMessage.A1, ApiMessage.A2, ApiMessage.B1, ApiMessage.B2)
    # ... 後面略 ...
```

原本是直接把這幾個值直接寫在程式碼裡，現在從settings中讀取，可以改寫成這樣：

```python
from django.conf import settings

class ApiMessage:
    shop_no = "NA0249_001"
    api_url = "https://sandbox.sinopac.com/QPay.WebAPI/api/Order"
    A1, A2, B1, B2 = settings.HASH_A1, settings.HASH_A2, settings.HASH_B1, settings.HASH_B2

    def __init__(self, api_service):

        self.hash_id = SinopacUtil.get_hash_id(ApiMessage.A1, ApiMessage.A2, ApiMessage.B1, ApiMessage.B2)
    # ... 後面略 ...
```

如此一來，就完成第一部：不要把設定值hard code在程式碼中，這一步和資安沒有太大關係，純粹就日後維護角度來看是比較正確的作法。

#### 如何讓他更具安全性

在settings.py中的這些屬性目前還是把值直接寫在裡面，而settings.py是需要被程式碼版控的，所以還有改善空間。

這個時候就要引入python好用的環境變數工具**dotenv**來作管理，首先要先進行套件的安裝。dotenv有django-dotenv以及python-dotenv兩個不同的套件，版本與用法也不盡相同，但以普偏性而言是python-dotenv較多人使用，參考文獻也較多，建議可安裝這個。

```
> pip install python-dotenv
```

目前我的安裝版本是0.19.1版，安裝完成後，記得更新到根目錄下的requirements.txt檔，便於之後作建置時同步安裝。

```
> pip freeze > requirements.txt
```

#### dotenv用起來

說了這麼多，到底dotenv要怎麼使用？首先我們要在django project目錄底下(mysite/mysite)新增一個`.env`的檔案，裡面就是將你需要設定的屬性(以全大寫命名，建議直接和settings一致)直接定義在這個檔裡面。

於`.env`檔中：

```
HASH_A1=86D50DEF3EB7400E
HASH_A2=01FD27C09E5549E5
HASH_B1=9E004965F4244953
HASH_B2=7FB3385F414E4F91
```

註：這不是Python檔，所以不需要在字串加上前後的引號

然後我們再回到`settings.py`中，改寫原本直接以明文字串，換成從.env讀取進來的系統環境變數。

```python
from dotenv import load_dotenv
load_dotenv()

HASH_A1 = os.getenv('HASH_A1')
HASH_A2 = os.getenv('HASH_A2')
HASH_B1 = os.getenv('HASH_B1')
HASH_B2 = os.getenv('HASH_B2')
```

在這邊，我們需要先引入`load_dotenv`，在前面先執行`load_dotenv()`將`.env`的環境變數載入。

所以後面的幾個環境變數，就可以使用`os.getenv()`方式將其值載入，如此一來就把實際字串和設定檔分開了。

#### 再來，還有要注意的地方

接著，就是要設定`.gitignore`將`*.env`加入，讓這類的檔案不要被程式碼版控控管。有幾個實務上的作法：

1. 開發者擁有的是「測試Hash代碼」，在其開發環境中可自己定義這四組Hash代碼字串於本機的`.env`中
2. 實際Production環境的「正式Hash代碼」是由專屬的DBA角色控管，屆時建置時由他們來管理這部份的資訊
3. 可撰寫一個`.env.template`檔案，裡面把所需要的環境變數Key值寫好，但Value留空，讓程式碼下載下來後的開發者，了解自己需要在環境加上哪些環境變數值於.env中。

這樣一來，我們就可以有效的將機敏性資料透過這個方式從程式碼中區分出來，並且以權責區分方式進行管理與建置工作。

### 看一下永豐的C# Sample Code

如果你對於C#的程式碼有興趣，可以下載Visual Studio打開Sample的專案程式碼 (QPay.SampleCode.sln)
於根目錄下，可以看到一個`appSettings.config`檔：

```xml
<appSettings>
  <!--Sandbox環境-->
  <!--取得商業收付API 網址-->
  <add key="QPayWebAPIUrl" value="https://apisbx.sinopac.com/funBIZ/QPay.WebAPI/api/"/>

  <!--依商店編號取得商店雜湊值(依A1, A2, B1, B2排序, 商業收付提供)-->
  <add key="NA0001_001" value="65960834240E44B7,2831076A098E49E7,CB1AFFBF915A492B,7F242C0AA612454F"/>
</appSettings>
```

這邊可以看到永豐的C# Sample Code也是將這些會用到的設定值抽離出來放到App設定檔中。看到Key為`NA0001_001`(商店代號)的值，以逗號隔開的就是四個Hash代碼。

#### 可以更安全嗎？

如果你直接使用ASP.NET的Web專案進行開發，應該會有相對應的`web.confg`檔，而這類的檔案裡面是會有放置機敏性資料，而最終佈署到網站上時並不希望以明碼字串寫在設定檔裡面，風險過高。

你可以使用`aspnet_regiis`的加解密方法，將原先明確字串的設定檔，加密為密文，但仍然可以正常使用。
可參考以下文章作法：
https://medium.com/work-insight/secure-your-net-config-files-part-1-251aed4ce4c8
https://ithelp.ithome.com.tw/articles/10231176