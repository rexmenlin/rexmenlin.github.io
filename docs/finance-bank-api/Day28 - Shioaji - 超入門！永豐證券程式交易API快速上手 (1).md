---
sidebar_position: 29
---

一晃眼，鐵人賽就進入了尾聲，先前一直說有時間要來寫Shioaji的，總是不能食言。我想就用最後兩篇的篇幅快速的導讀一下Shioaji的基礎入門功能。我發現自己之前每篇單日文章都希望寫的豐富一點，因此每天下班後幾乎都把時間貢獻在鐵人寫測試、研究與撰文上面，真的是有一點吃不消。而現在希望自己兩個主題都有參與到，貪心的結果就是每天弄的壓力很大，搞的下班比上班時還累。不過終究還是咬牙撐過來了。

這兩天剛好連假+特休假，所以在收尾豐收款線上支付API - **豐收款** 的專題系列文時，也邊準備打算用最後幾篇來把Shioaji作個旋風式介紹。就當作是我的鐵人賽的番外篇吧，能寫多少算多少，除了希望有機會幫助到別人，自己也一直想研究這個主題。

### 什麼是Shioaji

Shioaji在我Day1的文章就有介紹過，就不再贅述，總之你對於**股票、期貨、選擇權**等的交易，除了使用人為方式透過App也好網站也好的方式下單外，永豐提供了一個給程式使用的API，名為Shioaji，讓**會寫程式的你**可以進行更多靈活的運用，自己有獨到的交易策略，以及想要嚴守自己的交易紀律與規則的人，可以透過這個方式幫你圓夢。
(然後邁向財務自由..... 嗯！！癌大主委在講都沒在聽，沒有什麼財務自由這種事！)

由於永豐官網以及活動頁面有提供了幾個教學，建議大家都乖乖的先去把課程上完一輪，會比我在這裡寫清楚的多。
不確定這個[活動頁面](https://ithelp.ithome.com.tw/2021ironman/rules)會不會一直都在，還是先幫大家把網址整理出來：
永豐官方Shioaji API內部專業講師教學：[Youtube播放清單](https://www.youtube.com/playlist?list=PL_KnG63-iRTTIZpEdApKO908z0lW3_OiW)

播放清單如下，不過裡面的順序沒有編的很正確，上面1~6可以先看。然後下面的7~10還有另4篇，請照影片檔名的順序讀。
![https://ithelp.ithome.com.tw/upload/images/20211012/20130354t7GQSQMYB6.png](https://ithelp.ithome.com.tw/upload/images/20211012/20130354t7GQSQMYB6.png)

其中有一篇，是針對股票交易談到比較細的 交易搓合制度等，和程式技術無關，但對於細節運作釐清相當重要。
可以多看個兩次：**2.逐筆搓合制度、API新增功能及β風控機器人介紹**

其他的部份就都和程式比較有關，但必須說一下：

1. 講師解釋很清楚，但顧及學員可能有些剛接觸程式技術，因此談的深度不深 → 不要期待看完影片你就會懂整套API怎麼使用
2. 因為是先前永豐有開實體課程直接錄制，聲音有一點小，而且拍攝後畫面看不太清楚
   但可以快速作為一個入門，以及理解API是什麼。

講師在影片中，有一個網址，幫大家列在下面，講師一再強調**Basic Overview**一定要看！
https://sinotrade.github.io/slides/

![https://ithelp.ithome.com.tw/upload/images/20211012/20130354HEaZeqD8vy.png](https://ithelp.ithome.com.tw/upload/images/20211012/20130354HEaZeqD8vy.png)

而正式的Shioaji官網文件在這裡：https://sinotrade.github.io/
若真的想要透過Shioaji作程式交易的讀者，必需詳讀與實際跟著操作。

然後，很不幸的，因為國際化是我們未來雙語國家的目標(咦?)，上面的文件都是英文的，學Shioaji也可以順便練英文，一舉雙得呀！相信難不倒大家。

### 來吧！先架設環境

在其實最早開賽前，我就已經先研究一下Shioaji，當時是使用Anaconda配合JupyterNotebook的環境，有先測試過一些程式運作。不過因為先前的豐收款，寫了庫米狗屋KummyShop的情境案例，使用了PyCharm Community環境 (搭配Django Web框架)，想說為了一致性，也在PyCharm上面來寫Shioaji的測試驗證案例吧。

但萬萬沒想到，一開始就卡住了，花了我好久的時間，一直出現DLL無法正確載入的問題，等一下我會說明，怎麼解決。

#### 開設一個新專案，安裝Shioaji套件

在PyCharm中，先開設一個Python新專案。一開始我們通常都會使用PyCharm的venv建一個新的環境，開完專案後，依照永豐金的說明，我們使用Terminal來進行pip安裝

```
> pip install shioaji
```

安裝是成功了沒錯，目前我安裝的版本是：`shioaji-0.3.3.dev4`

於是，很開心的把先前在Jupyter Notebook測試的code趕緊開一個test.py檔案來測試，怎麼樣都是過不了。

code不用多，光第一行就錯誤了。

```python
import shioaji as sj
```

![https://ithelp.ithome.com.tw/upload/images/20211012/20130354EXBjVyYu5r.png](https://ithelp.ithome.com.tw/upload/images/20211012/20130354EXBjVyYu5r.png)

```
ImportError: DLL load failed while importing solclient: 動態連結程式庫 (DLL) 初始化例行程序失敗。
```

#### 怎麼解決DLL初始化問題呢？

後來查了Shioaji相關的討論區，後來有人提到Shioaji目前支援的Python環境，若在Windows中建議使用Anaconda。如果非Anaconda的虛擬環境會有一些不相容的異常，對，我就遇到了。

所以解決方法是，使用PyCharm時，還是將Python Interpreter由原先的venv環境改成Anaconda的虛擬環境。

![https://ithelp.ithome.com.tw/upload/images/20211012/20130354zFkz4Te5vk.png](https://ithelp.ithome.com.tw/upload/images/20211012/20130354zFkz4Te5vk.png)

改為：
![https://ithelp.ithome.com.tw/upload/images/20211012/20130354P7j6LNKxBJ.png](https://ithelp.ithome.com.tw/upload/images/20211012/20130354P7j6LNKxBJ.png)
註：上面是Python 3.7或3.8並不是造成錯誤的原因，Shioaji目前撰文時是支援3.6~3.8。

改完後，要記得在Anaconda虛擬環境中確認是否有安裝Shioaji，若沒有，要再使用pip安裝一次。

再執行一次，原先的DLL初始化錯誤就消失了。

### 開始來嘗試第一支最簡單的範例

如果你本身有永豐證券帳戶，也申請了API使用憑證，那你可以嘗試使用自己的帳號與密碼(當然要小心使用，責任需自負)。若沒有，你可以使用永豐提供的測試帳號，但無論是哪一種，在資源有限的情況下，在使用上都有連線上限以及與些資料取用的限制，詳情請看[這裡](https://sinotrade.github.io/tutor/limit/)。因此，請於程式login後，記得養成logout的好習慣。

* 測試帳號：PAPIUSER01 ~ PAPIUSER08
* 測試密碼：2222

#### STEP1: 登入(Login)

使用Shioaji的第一個步驟，除了import Shioaji的套件外，就要先確認整個程式交易的使用者是誰，這和你使用App要進行下單是一樣的。

```python
import shioaji as sj
api = sj.Shioaji()
api.login(
    person_id="YOUR_ID", 
    passwd="YOUR_PASSWORD", 
    contracts_cb=lambda security_type: print(f"{repr(security_type)} fetch done.")
)
```

如果，你使用的是測試帳號進行模擬(Simulation)用途，請在Shioaji()裡加上參數`simulation=True`

```python
import shioaji as sj

api = sj.Shioaji(simulation=True)
person_id = 'PAPIUSER05'
passwd = '2222'

api.login(person_id=person_id, passwd=passwd)
```

#### STEP2: 確認Accounts

而這裡的login指的是對於永豐而言的證券用戶的登入資訊，而一個永豐的用戶底下會開設不同的證券、期貨等的交易帳戶。因此一個用戶底下的股票、期貨等，是分開且不同的交易帳戶。

因此在登入後，可使用list_accounts()方法取回此用戶底下的各種帳戶：

```python
accounts = api.list_accounts()
print(accounts)

# Output: [FutureAccount(person_id='PAPIUSER05', broker_id='F002000', account_id='9101663', signed=True, username='PAPIUSER05'), StockAccount(person_id='PAPIUSER05', broker_id='9A95', account_id='0506206', signed=True, username='PAPIUSER05')]
```

以上資訊可看到這個用戶底下有：

* 一個期貨(Future)帳戶：account_id='9101663'
* 一個股票(Stock)帳戶：account_id='0506206'

但一個用戶是可擁有超過一個以上的證券戶，可以列出預設Future或Stock的帳戶：

```python
print("Default Stock Account: {}".format(api.stock_account))
print("Default Future Account: {}".format(api.futopt_account))

# Output: Default Stock Account: person_id='PAPIUSER05' broker_id='9A95' account_id='0506206' signed=True username='PAPIUSER05'
# Output: Default Future Account: person_id='PAPIUSER05' broker_id='F002000' account_id='9101663' signed=True username='PAPIUSER05'
```

其中重要的是signed是指是否已簽署證券或期貨的[API簽署書](https://www.sinotrade.com.tw/ec/20191125/Main/index.aspx#pag4)。

若你有多個帳戶，可以透過下面的指令修改預設帳戶：

```python
api.set_default_account(accounts[-1])
print(api.stock_account)

api.set_default_account(accounts[1])
print(api.futopt_account)
```

#### STEP3: 重要的交易憑證CA

有關下單的憑證，請參考[永豐官網](https://www.sinotrade.com.tw/CSCenter/CSCenter_13_1?tab=2)以及相關憑證軟體工具下載

基本上，你若成功於Windows電腦下載憑證後，會放置在`C:\ekey\`底下的目錄，中間會有一些路徑以及身份證字號等目錄就由各位自行確認。檔名會是`Sinopac.pfx`

```python
api.activate_ca(
    ca_path=r'C:\ekey\xxx\xxxxxxxxxx\x\Sinopac.pfx',
    ca_passwd='YOUR_PASSWORD',
    person_id='YOUR_PERSON_ID'
)
```

#### STEP4: 查詢前先立Contracts

我們的程式想要取得標的的金融資訊，會先需要指定相關的Contract(契約)。透過Shioaji instance物件下Contracts底下又能區分出Stocks以及Futures。

我指若直接將Contracts列出來，如下：

```python
print(api.Contracts)

# Output: Indexs=(OTC, TSE) Stocks=(OES, OTC, TSE) Futures=(BRF, BTF, CAF, CBF, CCF, CDF, CE1, CEF, CFF, CGF, CHF, CJ1, CJF, CKF, CLF, CM1, CMF, CNF, CQF, CRF, CSF, CUF, CWF, CYF, CZF, DC1, DCF, DD1, DDF, DEF, DFF, DGF, DHF, DIF, DJF, DKF, DLF, DN1, DNF, DOF, DP1, DPF, DQF, DSF, DVF, DW1, DWF, DXF, DYF, DZ1, DZF, E4F, EEF, EGF, EHF, EMF, EP1, EPF, ERF, EXF, EYF, EZF, F1F, FBF, FE1, FEF, FF1, FFF, FGF, FKF, FNF, FQF, FRF, FTF, FVF, FWF, FXF, FYF, FZF, G2F, GAF, GCF, GDF, GHF, GIF, GJF, GLF, GMF, GNF, GOF, GRF, GTF, GUF, GWF, GXF, GZF, HAF, HBF, HCF, HHF, HI1, HIF, HLF, HOF, HSF, HYF, IA1, IAF, IHF, IIF, IJF, IMF, IOF, IPF, IQF, IRF, ITF, IXF, IYF, IZF, JBF, JF1, JFF, JMF, JNF, JPF, JSF, JWF, JZF, KAF, KBF, KCF, KDF, KEF, KFF, KGF, KIF, KKF, KLF, KOF, KP1, KPF, KSF, KUF, KWF, LBF, LCF, LEF, LIF, LMF, LO1, LOF, LQF, LRF, LTF, LUF, LV1, LVF, LWF, LXF, LYF, MAF, MBF, MJF, MK1, MKF, MPF, MQF, MVF, MX2, MXF, MYF, NAF, NBF, NCF, NDF, NEF, NGF, NI1, NIF, NJF, NLF, NMF, NOF, NQF, NSF, NUF, NVF, NWF, NXF, NYF, NZF, OAF, OBF, OCF, ODF, OEF, OHF, OJF, OKF, OLF, OMF, OOF, OPF, OQF, ORF, OSF, OTF, OUF, OVF, OWF, OXF, OYF, OZF, PAF, PBF, PCF, PDF, PEF, PFF, PGF, PHF, PIF, PJF, PKF, PL1, PLF, PMF, PNF, POF, PPF, PQF, PRF, PSF, PTF, PUF, PVF, PWF, PXF, PYF, PZF, QAF, QBF, QCF, QDF, QEF, QFF, QGF, QHF, QIF, QJF, QKF, QLF, QM1, QMF, QNF, QOF, QPF, QQF, QRF, QSF, RHF, RTF, SPF, T5F, TGF, TJF, TXF, UDF, UNF, XAF, XBF, XEF, XIF, XJF, ZEF) Options=(CAO, CBO, CCO, CDA, CDO, CEA, CEO, CFO, CGO, CHO, CJO, CKO, CLO, CMO, CNO, CQO, CRO, CSO, CZO, DCO, DEO, DFO, DGO, DHO, DJO, DKO, DLO, DNO, DOO, DPO, DQO, DSO, DVO, DWO, DXO, GIO, GXO, HCO, IJO, LOO, NYO, NZO, OAO, OBO, OCO, OJO, OKO, OOO, OZO, QBO, RHO, RTO, TEO, TFO, TGO, TX2, TXO)
```

從輸出結果可看出有三種Contracts：

* Indexes
* Stocks
* Futures

**Indexes**指的是大盤的指數，`TSE`是有關上市大型股的**台灣加權指數**，而`OTC`則為有關中小型股的**櫃買指數**。
而**Stocks**指的就是股票，`TSE`指的就是在證交所**上市**的股票，而`OTC`是在櫃買市場**上櫃**的股票，而`OES`，老實說我不確定是不是**興櫃市場**(通常一般興櫃會是`ROTC`)，這個如果有了解的朋友再麻煩指正。

#### 找檔股票或期貨的基本資訊來看看

**Stocks**
我們就找一檔和永豐有關的ETF股票(寫永豐專題找元X的0050像話嗎！ 其實也不是不行啦 哈)，**永豐臺灣加權**的股票代號為`006204`，所以要取得這檔股票的Contract就是用以下的取得方法：
`api.Contracts.Stocks.TSE.TSE006204`

```python
stk_006204 = api.Contracts.Stocks.TSE.TSE006204
print(stk_006204)

# Output: exchange=<Exchange.TSE: 'TSE'> code='006204' symbol='TSE006204' name='永豐臺灣加權' category='00' unit=1000 limit_up=97.65 limit_down=79.95 reference=88.8 update_date='2021/10/12' margin_trading_balance=22893 day_trade=<DayTrade.Yes: 'Yes'>
```

其中的參考價`reference`為前一日收盤價，以此例為88.8元。

文件中說明的各屬性，請自行參考

```
exchange (Exchange): Attributes of industry.
    {OES, OTC, TSE ...etc}
code (str): Id.
symbol (str): Symbol.
name (str): Name.
category (str): Category.
limit_up (float): Limit up.
limit_down (float): Limit down.
reference (float): Reference price.
update_date (str): Update date.
margin_trading_balance (int): Margin trading balance.
short_selling_balance (int): Short selling balance.
day_trade (DayTrade): Day trade.
    {Yes, No, OnlyBuy}
```

**Futures**
接著，我們來看看期貨資訊。

```python
print("TXF: {}".format(api.Contracts.Futures.TXF))

#Output: TXF: TXF(TXF202203, TXF202206, TXF202209, TXF202111, TXF202112, TXF202110, TXFR1, TXFR2)
```

若我們將期貨的Contracts底下的`TXF` (**大台指**) 列出來，看有哪些Contract可操作。
以目前撰文時間為2021年10月中來看，會看到**遠月期貨**：TXF202203、TXF202206、TXF202209
以及**近三個月期貨**：TXF202110、TXF202111、TXF202112
還有所價的**近一、近二**：TXFR1、TXFR2

我們可以列出觀察一下內容：

```python
print("台指期近一: {}".format(api.Contracts.Futures.TXF.TXFR1))
print("台指期近二: {}".format(api.Contracts.Futures.TXF.TXFR2))
print("台指期202112: {}".format(api.Contracts.Futures.TXF.TXF202112))
print("台指期202206: {}".format(api.Contracts.Futures.TXF.TXF202206))

# Output: 台指期近一: code='TXFR1' symbol='TXFR1' name='臺股期貨近月' category='TXF' delivery_month='202110' delivery_date='2021/10/20' underlying_kind='I' unit=1 limit_up=18287.0 limit_down=14963.0 reference=16625.0 update_date='2021/10/12'
# Output: 台指期近二: code='TXFR2' symbol='TXFR2' name='臺股期貨次月' category='TXF' delivery_month='202111' delivery_date='2021/11/17' underlying_kind='I' unit=1 limit_up=18256.0 limit_down=14938.0 reference=16597.0 update_date='2021/10/12'
# Output: 台指期202112: code='TXFL1' symbol='TXF202112' name='臺股期貨12' category='TXF' delivery_month='202112' delivery_date='2021/12/15' underlying_kind='I' unit=1 limit_up=18225.0 limit_down=14913.0 reference=16569.0 update_date='2021/10/12'
# Output: 台指期202206: code='TXFF2' symbol='TXF202206' name='臺股期貨06' category='TXF' delivery_month='202206' delivery_date='2022/06/15' underlying_kind='I' unit=1 limit_up=17974.0 limit_down=14706.0 reference=16340.0 update_date='2021/10/12'
```

上面所取得的資訊，其中`delivery_date`指的則是結算日期，為當月份的**第三個星期三**。

#### 訂閱(Subscribe)期貨來看看即時報價(Quote)資料

台股只有白天上時間有即時交易資料，下班後如果要測試驗證即時的訂閱資料，只能看期貨的**夜盤**資料。

期貨的一般交易時間，為**8:40~13:45**，而盤後交易時間為**15:00~5:00**(凌晨)。
剛剛介紹完Contracts後，下一個動作可以試著將一個Contract進行**報價(Quote)**的訂閱，並指定我們要訂閱的是Ticks每檔成交資料，或是BidAsk委買委賣的委託資料。

下面只列出較重要的程式段：

```python
import time
from shioaji import TickFOPv1, BidAskFOPv1, Exchange

@api.on_tick_fop_v1()
def quote_callback(exchange: Exchange, tick: TickFOPv1):
    print(f"Exchange: {exchange}, Tick: {tick}")


@api.on_bidask_fop_v1()
def quote_callback(exchange: Exchange, bidask: BidAskFOPv1):
    print(f"Exchange: {exchange}, BidAsk: {bidask}")


@api.quote.on_event
def event_callback(resp_code: int, event_code: int, info: str, event: str):
    print(f'Response code: {resp_code} | Event code: {event_code} | Event: {event}')

### 使用decorator方式，以下兩行都不需要再定義了
# api.quote.set_callback(quote_callback)
# api.quote.set_event_callback(event_callback)

ftu_txf2110 = api.Contracts.Futures.TXF.TXF202110

api.quote.subscribe(
    ftu_txf2110,
    quote_type=sj.constant.QuoteType.Tick,
    version=sj.constant.QuoteVersion.v1
)

api.quote.subscribe(
    ftu_txf2110,
    quote_type=sj.constant.QuoteType.BidAsk,
    version=sj.constant.QuoteVersion.v1
)

i = 0
while i < 10:
    time.sleep(1)
    i += 1



api.logout()
```

這邊有幾個需要特別說明的程式，首先我們先了解一下quote和subscribe。我們想要針對一個Contracts去取得其即時報價資料，則需使用`api.quote.subscribe()`告知我們要訂閱報價訊息，而參數則需明白指名要訂閱的：

1. 哪一個Contract (可事先放入變數)
2. 報價型態：可以是每檔成交Ticks，或者是委買Bid、委賣Ask的即時資訊。
3. 報價格式版本：目前官網有`v0`與`v1`兩種版本，預設是`v0`。

官方格式說明如下，如果是股票的話還可指定是否要特別看**盤中零股 (intraday_odd)**的報價

```
quote_type: tick price or bid/ask price to subscribe.
    {'tick', 'bidask'}
intraday_odd: 盤中零股
    {True, False}
version: version of quote format.
    {'v1', 'v0'}
```

所以以我們的例子，我們選定了contract為大台指2021年10月份，然後訂閱了他的Tick以及BidAsk的報價。(大人任性地都要！小孩才作選擇呀~)

接著要說明的是，Shioaji採用的方式是訂閱時，需要指定其callback回呼函式。分別以event和實際quote報價結果都需要接收callback函式。

而以官網寫有提供的方式，可採用python function decorator `@api.on_tick_fop_v1()`和`@api.on_bidask_fop_v1()`以及`@api.quote.on_event`來直接定義這個函式就是作為報價的回呼函式，相較傳統作法，就無需再額外定義callback的設定：

```
from shioaji import TickFOPv1, BidAskFOPv1, Exchange

@api.on_tick_fop_v1()
def quote_callback(exchange: Exchange, tick: TickFOPv1):
    print(f"Exchange: {exchange}, Tick: {tick}")


@api.on_bidask_fop_v1()
def quote_callback(exchange: Exchange, bidask: BidAskFOPv1):
    print(f"Exchange: {exchange}, BidAsk: {bidask}")


@api.quote.on_event
def event_callback(resp_code: int, event_code: int, info: str, event: str):
    print(f'Response code: {resp_code} | Event code: {event_code} | Event: {event}')
```

記得使用前，要引入`TickFOPv1`, `BidAskFOPv1`, `Exchange`。

如此一來，只要有即時資料進來，就會自動跑進那幾個callback functions。
我們程式碼裡，簡單每秒鐘睡一下，讓程式可以跑個10秒鐘再進行logout。

所以我們就可以看到以下的**台指期202110**的即時Tick與BidAsk資料瘋狂湧入！好開心呀！
篇幅問題，我們就簡單列個幾筆：

```
Response code: 200 | Event code: 16 | Event: Subscribe or Unsubscribe ok
Response code: 200 | Event code: 16 | Event: Subscribe or Unsubscribe ok

Exchange: TAIFEX, BidAsk: BidAsk(code='TXFJ1', datetime=datetime.datetime(2021, 10, 12, 23, 42, 18, 759000), bid_total_vol=63, ask_total_vol=71, bid_price=[Decimal('16496'), Decimal('16495'), Decimal('16494'), Decimal('16493'), Decimal('16492')], bid_volume=[1, 6, 9, 25, 22], diff_bid_vol=[0, -1, 0, 0, 0], ask_price=[Decimal('16497'), Decimal('16498'), Decimal('16499'), Decimal('16500'), Decimal('16501')], ask_volume=[4, 16, 15, 13, 23], diff_ask_vol=[0, 0, 1, 0, 0], first_derived_bid_price=Decimal('0'), first_derived_ask_price=Decimal('16501'), first_derived_bid_vol=0, first_derived_ask_vol=1, underlying_price=Decimal('16462.84'), simtrade=0)

Exchange: TAIFEX, Tick: Tick(code='TXFJ1', datetime=datetime.datetime(2021, 10, 12, 23, 42, 18, 770000), open=Decimal('16389'), underlying_price=Decimal('16462.84'), bid_side_total_vol=22359, ask_side_total_vol=23121, avg_price=Decimal('16500.63133'), close=Decimal('16496'), high=Decimal('16563'), low=Decimal('16378'), amount=Decimal('16496'), total_amount=Decimal('583231315'), volume=1, total_volume=35346, tick_type=2, chg_type=2, price_chg=Decimal('77'), pct_chg=Decimal('0.468969'), simtrade=0)

Exchange: TAIFEX, BidAsk: BidAsk(code='TXFJ1', datetime=datetime.datetime(2021, 10, 12, 23, 42, 18, 884000), bid_total_vol=72, ask_total_vol=73, bid_price=[Decimal('16495'), Decimal('16494'), Decimal('16493'), Decimal('16492'), Decimal('16491')], bid_volume=[3, 7, 15, 31, 16], diff_bid_vol=[-3, -2, -10, 9, 0], ask_price=[Decimal('16497'), Decimal('16498'), Decimal('16499'), Decimal('16500'), Decimal('16501')], ask_volume=[6, 16, 15, 13, 23], diff_ask_vol=[2, 0, 0, 0, 0], first_derived_bid_price=Decimal('0'), first_derived_ask_price=Decimal('16501'), first_derived_bid_vol=0, first_derived_ask_vol=1, underlying_price=Decimal('16462.84'), simtrade=0)

Exchange: TAIFEX, BidAsk: BidAsk(code='TXFJ1', datetime=datetime.datetime(2021, 10, 12, 23, 42, 19, 9000), bid_total_vol=61, ask_total_vol=72, bid_price=[Decimal('16496'), Decimal('16495'), Decimal('16494'), Decimal('16493'), Decimal('16492')], bid_volume=[2, 4, 8, 25, 22], diff_bid_vol=[1, 1, 1, 10, -9], ask_price=[Decimal('16497'), Decimal('16498'), Decimal('16499'), Decimal('16500'), Decimal('16501')], ask_volume=[5, 16, 15, 13, 23], diff_ask_vol=[-1, 0, 0, 0, 0], first_derived_bid_price=Decimal('0'), first_derived_ask_price=Decimal('16501'), first_derived_bid_vol=0, first_derived_ask_vol=1, underlying_price=Decimal('16462.84'), simtrade=0)
```

順帶一提的是，在永豐講師課程中有提到，目前操作上可允許的訂閱數為**100則**，像上面我們剛剛的例子，即使是同一個期貨標的，訂閱了Tick和BidAsk的報價，就用掉了**2則**訂閱數。

所以要作好訂閱的資源管理，若有不需使用的訂閱則可用`unsubscribe()`進行解除訂閱。

以上先以期貨作為例子，股票的結果相信是差不多的，但上班時間沒辦法操作，所以先以期貨來作代表！

#### 補充一下

說明一下，目前永豐的文件，如同前面有提到一個Basic Overview的講師叮嚀必看內容，由於其版本較舊，因此裡面有一些用法和最新的Shioaji的規格文件會稍有不同，請以最新的規格內容來撰寫較恰當。

另外，如果你要訂閱即時報價，例如，本月份是202110，請使用**TXF202110**；雖然**TXFR1台指期近一**也是202110 (2021年10月)，但訂閱近一這個是沒辦法取得即時報價的。