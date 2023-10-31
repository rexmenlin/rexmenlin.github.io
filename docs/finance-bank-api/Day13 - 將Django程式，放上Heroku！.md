---

sidebar_position: 14
---

昨天撰寫了一版最基礎的Django網站測試後，接著我們要來嘗試將網站佈署到雲端平台，讓API有機會能夠將PayToken傳入(這是我們的目的)。

在目前的雲端服務中，有一種是所謂的**IaaS (Infrastructure as a Service)**， 也就是我們需要在雲端服務中自行建立一台虛擬主機，並且在上面完整的將環境建立起來，例如Amazon AWS、Google GCP、Microsoft Azure等。這個優點自然是有高度的彈性與自由，當然所需要的伺服器管理、環境建置與佈署的技能都相對來的高。

而另一種雲端服務稱之為**PaaS (Platform as a Service)**，則是提供已經具備完整可運行環境的平台，雲端用戶不會觸摸到完整的虛擬主機環境，僅需專注在應用程式的佈署這件事上面。對於開發者而言，只需要將所需要執行的應用程式以及執行環境相關的套件需求定義好，按照PaaS平台的佈署流程進行就可以輕鬆的將程式放到雲端執行。當然，相對的這是優點也是缺點，因為你勢必會這樣的便利性下對缺少自由與彈性進行妥協。另外因為不同的PaaS一定多多少少都會有特殊獨有的佈署或設定方式，因此未來要移轉至其他平台時，某部份的設定方式可能無法直接無痛移轉。

你要有租一間空房所有家俱陳設都要自己決定，還是想要一卡皮箱就可入住的公寓式酒店？絕對沒有另一個好哪一個壞，端看個人當下的需求而定。也有人初期希望能簡單舒服不用煩惱太多，但等待一切上軌道再搬到可自由運用空間自行決定家俱的空屋，這樣也很好。

### 就是你了，Heroku！

這次選擇使用可以運行Django專案的PaaS平台，就是知名的**Heroku**。當然Heroku是以提供Ruby雲端執行環境所起家的，後來愈來愈全面後也可以運行其他語言、框架的環境，例如Java、Node.js、Python、PHP、Go…等。Heroku由於有一個最基礎的Free版本可提供給使用者運用，對於拿來寫這種驗證式POC專案是再適合不過的了，當然既然是免費的就會有所限制，有興趣的朋友需要先行[了解](https://www.heroku.com/pricing)，若有興趣也可以升級成付費方案。

若想要快速將Django網站佈署到Heroku上，首先當然要先註冊申請成為會員，在此推薦Django Girls Taipei的[Django Heroku佈署教學](https://djangogirlstaipei.herokuapp.com/tutorials/deploy-to-heroku/?os=windows)，寫的很清楚易懂。

先進行Heroku的帳號註冊，接著安裝Heroku [CLI (Command Line Interface)](https://devcenter.heroku.com/articles/heroku-cli)工具，透過CLI可直接透過Terminal模式進行個人Heroku Apps的管理工作。其中最關鍵的就是透過Terminal進行帳號登入，一來是會將此帳號與Git作身份綁定 (Heroku需透過Git管理上傳你的網站程式碼)，二來是可透過工具建立相關的Herou App來完成基礎設定。

進行Heroku login
![https://ithelp.ithome.com.tw/upload/images/20210928/20130354Oa7fsIvHKB.png](https://ithelp.ithome.com.tw/upload/images/20210928/20130354Oa7fsIvHKB.png)

開啟網頁進行登入
![https://ithelp.ithome.com.tw/upload/images/20210927/20130354Uyi5pfPQ74.png](https://ithelp.ithome.com.tw/upload/images/20210927/20130354Uyi5pfPQ74.png)

建立Heroku App
![https://ithelp.ithome.com.tw/upload/images/20210927/20130354f1ffd41lTs.png](https://ithelp.ithome.com.tw/upload/images/20210927/20130354f1ffd41lTs.png)

將Git與Remote Heroku作綁定
![https://ithelp.ithome.com.tw/upload/images/20210927/20130354PcwPT0kpGF.png](https://ithelp.ithome.com.tw/upload/images/20210927/20130354PcwPT0kpGF.png)

於本機設定production環境所需要的設定檔，與dev環境分開
![https://ithelp.ithome.com.tw/upload/images/20210927/20130354IIbuMt13Qe.png](https://ithelp.ithome.com.tw/upload/images/20210927/20130354IIbuMt13Qe.png)

接著將本地檔案進行Git add、commit、push，若成功會看到`Verfifying deploy... done`字樣。
![https://ithelp.ithome.com.tw/upload/images/20210927/20130354B0CDXe4MCZ.png](https://ithelp.ithome.com.tw/upload/images/20210927/20130354B0CDXe4MCZ.png)

再來就是執行Heruku初始化相關作業，包含初始化資料庫與建立superuser等。
![https://ithelp.ithome.com.tw/upload/images/20210927/20130354ucudFjma1U.png](https://ithelp.ithome.com.tw/upload/images/20210927/20130354ucudFjma1U.png)

上述的執行細節就不細談，包含了WSGI、requirements.txt檔、Procfile等的準備與設定，有興趣可參考前述文章。有些小地方仍需注意，例如Postgres的`psycopg2`目前我是使用`2.9.1`版本才能成功。

最後我們順利將本機的KummyShop網站佈署到Heroku的平台上，並且使用昨天的greetings頁面進行測試。帶入一些參數試試看，也能成功運作，太好了。
![https://ithelp.ithome.com.tw/upload/images/20210927/201303548CkvTv5Yum.png](https://ithelp.ithome.com.tw/upload/images/20210927/201303548CkvTv5Yum.png)

不過Heroku因為有一些使用上的限制，除了Free版本提供的資源受限與會強制休眠等機制外，本身不支援SQLite(主要以PostgresSQL為主)也會連帶需要帶整既有作法，再來還有靜態檔案引用需作轉換等，一些細小的細節仍然需要花時間測試過。

今天就先這樣了，明天再努力。