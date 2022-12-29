---
sidebar_position: 3
---
在大致了解完永豐金APIs的兩大面向後，接下來要選擇與決定要使用什麼語言或工具來完成接下來的開發與串接。

#### 語言
Shioaji使用Python進行開發，那至少Python已經是雀屏中選了，只是要看消費支付這邊是否合用。在消費支付API的應用，雖然永豐附上的是C#和PHP的Sample code，應該會需要模擬購物網站的一些例如付款後頁面跳轉情境。如果選擇統一在兩個主題都用Python的話，就需搭配Django來開發Web。

近年Python因大數據與AI的應用變的相當火紅，去年也由於參與加人工智慧學校的課程也用了一陣子的Python，所以就先選定使用**Python**來開發。

![https://ithelp.ithome.com.tw/upload/images/20210917/20130354AkWj5kk1Nm.png](https://ithelp.ithome.com.tw/upload/images/20210917/20130354AkWj5kk1Nm.png)

##### 語言．盤點Point!
* Python

#### 環境與工具
Python的開發環境有幾種不同的選擇，開發工具也是，我會選擇使用之前慣用的**Anaconda**作為整體開發環境 (順帶也送你幾個工具了)，寫Python Code的基本功能測試與反覆驗證，可以使用**Jupyter Notebook**來達成。主要的好處是可以在程式段裡針對某些區塊反覆修改值與區塊測試，不需要整段程式碼都重跑一次，又能像撰寫文章一樣在前後作註記 (甚至圖文併茂)，也能輸出圖表，因為之前接觸了一陣子的AI機器學習，因此感受到這樣工具的好處。(其實一開始接觸時我是有一點排斥的，當時還沒感受到他的優點)

但後期要搭配使用Django的Web開發的話，有一個整頁式以及專案管理目錄的IDE是較為合用的，我個人是會選擇使用PyCharm。

另外在一些目的單純的API串接的測試驗證，則可以使用強大好用的Postman來達成 (相當推薦他可登入雲端帳號，到不同台電腦可繼續先前的測試)。

![https://ithelp.ithome.com.tw/upload/images/20210917/20130354ktyZMYJV9U.png](https://ithelp.ithome.com.tw/upload/images/20210917/20130354ktyZMYJV9U.png)

##### 工具．盤點Point!
* Anaconda
* Jupyter Notebook
* PyCharm 
* Postman

#### 安裝套件
在證券API的部份，一定需要安裝Shioaji，這個等到要撰寫的時候再來詳談。而其他的套件大概就是有需要的時候再來決定追加安裝，例如在股票交易可能會需要使用到圖表功能，例如使用`matplotlib`等相關視覺化套件，或者數據處理過程需要好用的NumPy、pandas等套件。在消費支付主題，要開發Web的話則可安裝Django套件。這些都能透過`pip`的指令方式進行安裝，有特別需要再花篇幅來講解，因為一般網路資源幾乎都找的到這類的教學文件。

> 使用Python有時候會因為不同的目的不同專案，裝了一堆套件後所需版本衝突的亂七八糟的，所以強烈建議使用VirtualEnv的方式建立所需要的虛擬環境讓不同專案用到的套件版本獨立不互相干擾。
> 使用Anaconda的話，可以使用conda env相關指令來建立與啟用虛擬環境，也可以直接用Anaconda Navigator UI來進行設定。

![https://ithelp.ithome.com.tw/upload/images/20210917/2013035421YMuSONI0.png](https://ithelp.ithome.com.tw/upload/images/20210917/2013035421YMuSONI0.png)

##### 套件．盤點Point!
* Shioaji
* matplotlib
* NumPy
* pandas
* Django


#### 版本
目前在Shioaji會使用到的最低Python版本，需使用3.6以上，因此若有使用2.x版Python的朋友是無法呼叫Shioaji元件的，要特別注意。

#### 執行電腦軟硬體環境
我目前使用的都是Windows 10系統，搭配ROG Strix SCAR III (G531)電競筆電進行開發，之前因為有開發AI的需求可以用來跑GPU版的Tensorflow等，但運行此API串接，其實倒無特別需要強力的電腦來運作。因此有興趣開發的朋友只要準備順手的電腦即可。


明天開始四天的中秋連假，會不會忘了發文就斷更了，讓我們看下去。

### 延伸閱讀
Anaconda簡單來說是一個集大成的Python(以及R語言)的軟體發行版本，安裝完提供許多接地氣的工具以及套件管理功能，但畢竟身為懶人包，相當成度也造成了較為吃資源的問題。另外Anaconda中的conda指令可用來管理虛擬環境，也可以用來管理套件，嚴格上來說，conda並不是「python專屬套件管理工具」 (理論上他能處理的語言與平台更多)，但他可以更有效的管理一些相依性的問題，如果剛好你有找到conda中你要的python套件的話 (在pip上找的到的在conda不一定有)。你也可以僅用conda來管理虛擬環境，但採用pip來作為python的套件管理工具。網路上有篇探討其中異同寫的不錯，但由於已很難確認原始文章來源是誰，所以我就不直接引用，有興趣可以Google關鍵字：`"Anaconda、Miniconda、Conda、pip的相互關係"`