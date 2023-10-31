---
sidebar_position: 30
---

今天來看一下如何使用Shioaji問回**歷史交易資料**，不過在此先提醒一下，上一篇有講到的永豐講師的Youtube課程，其中講師特別提醒大家，這個用法僅僅是方便永豐API用戶測試用途使用，因為資源有限，並不建議大家過度使用這個方式進行歷史資料的大量撈取，若在非正常情況下的使用，永豐是有權將使用者的帳號鎖定。所以大家要使用的前提下，若僅進行資料測試時，盡量設定資料存取範圍，以及愛惜資源。

### 詢問歷史Ticks資料:以股票為例

以下僅列出程式片段要點，前面該做login的步驟，請還是要按照方式使用，可參考前一篇的介紹。
就拿護國神山2330台積電為例。

```python
import pandas as pd

TSE2330 = api.Contracts.Stocks.TSE.TSE2330
ticks = api.ticks(
    contract=TSE2330,
    date="2021-10-13",
    query_type=sj.constant.TicksQueryType.RangeTime,
    time_start="13:24:00",
    time_end="13:24:30"
)

pd.set_option('display.max_columns', None)

df = pd.DataFrame({**ticks})
df.ts = pd.to_datetime(df.ts)

print(df.tail(10))
```

這裡使用了`api.ticks()`取回我們指定的Contract的歷史資料，可指定某天的當日tick資料，為了縮小資料量，可透過`query_type`設定為`TicksQueryType.RangeTime`的方式，我們可設定取回的起迄時間。
例如我這裡設定了取回收盤前逐筆搓合時間段的某30秒的資料。

並且使用pandas的DataFrame進行資料整理，記得把ts的時間作轉換。我們印出最末端10筆資料。

Output如下：

```
                           ts  ask_price  close  bid_volume  bid_price  \
9  2021-10-13 13:24:09.456604      572.0  571.0         121      571.0   
10 2021-10-13 13:24:11.003873      572.0  572.0         121      571.0   
11 2021-10-13 13:24:14.429999      572.0  571.0         122      571.0   
12 2021-10-13 13:24:18.495718      572.0  572.0         124      571.0   
13 2021-10-13 13:24:22.597406      572.0  572.0         125      571.0   
14 2021-10-13 13:24:23.154184      572.0  572.0         125      571.0   
15 2021-10-13 13:24:23.206579      573.0  572.0         126      571.0   
16 2021-10-13 13:24:27.416942      573.0  572.0         129      571.0   
17 2021-10-13 13:24:27.782836      573.0  572.0         130      571.0   
18 2021-10-13 13:24:28.055190      573.0  573.0         130      571.0   

    ask_volume  volume  
9           71      41  
10          69       1  
11          67       3  
12          65       2  
13          65       1  
14          64       1  
15         116      64  
16         120       1  
17         120       1  
18         119       2  
```

### 詢問K線(KBar)資料:以股票為例

我們接著可以使用`api.kbars()`來問回K線資料，一樣指定contract與起迄日期，並會以**每分鐘**的K線資料逐筆回傳。而K線資料會有每個區間的Open、High、Low、Close四個價格數值，K線圖也是以此作為最重要的依據。

```python
kbars = api.kbars(
    contract=TSE2330,
    start="2021-10-12",
    end="2021-10-12"
)
df = pd.DataFrame({**kbars})
df.ts = pd.to_datetime(df.ts)
```

我們印出部份的Kbars值如下：

```
                     Volume  Close   Open    Low   High        Amount
ts                                                                   
2021-10-12 09:01:00    4493  570.0  570.0  570.0  571.0  2.561513e+09
2021-10-12 09:02:00     415  570.0  570.0  569.0  571.0  2.364880e+08
2021-10-12 09:03:00     184  570.0  570.0  569.0  571.0  1.048730e+08
2021-10-12 09:04:00     636  569.0  570.0  568.0  570.0  3.616940e+08
2021-10-12 09:05:00     276  568.0  568.0  568.0  569.0  1.567810e+08
...                     ...    ...    ...    ...    ...           ...
2021-10-12 13:22:00      84  573.0  573.0  573.0  574.0  4.815400e+07
2021-10-12 13:23:00      48  573.0  573.0  573.0  574.0  2.753100e+07
2021-10-12 13:24:00     128  573.0  574.0  573.0  574.0  7.336300e+07
2021-10-12 13:25:00      88  573.0  573.0  572.0  574.0  5.037700e+07
2021-10-12 13:30:00    3792  575.0  575.0  575.0  575.0  2.180400e+09
```

接下來，介紹一個畫金融資料的好用圖表工具：**mplfinance**

可透過conda的安裝路徑進行安裝，可參考conda-forge package[網址](https://anaconda.org/conda-forge/mplfinance)。

```
conda install -c conda-forge mplfinance
```

接著就可以使用簡單的方法，來繪製K線圖。

#### 用圖表來顯示更直覺

```python
import mplfinance as mpf

df.set_index('ts', inplace=True)
df.index.name = "ts"
df.index = pd.DatetimeIndex(df.index)

color = mpf.make_marketcolors(up='r', down='g', inherit=True)
style = mpf.make_mpf_style(base_mpf_style='charles', marketcolors=color)

mpf.plot(df, **dict(type='candle', volume=True, style=style))
```

上面需設定DatetimeIndex，請參考上述方式，才能正確透過malfinance畫圖。

接著是定義其線圖的顏色與型態，需要將上漲與下跌的重新指定台灣股市特有的紅漲綠跌。(國外是相反過來的)
style有幾種可以指定，可透過`mplfinance.available_styles()`印出：
['blueskies', 'brasil', 'charles', 'checkers', 'classic', 'default', 'mike', 'nightclouds', 'sas','starsandstripes', 'yahoo']

再來就是指定plot的參數，我們需要畫的是candle圖，以及把上述的設定放入。
如此一來，我們的1分鐘期的K線圖就產生了。

![https://ithelp.ithome.com.tw/upload/images/20211013/20130354pYqCY4Gjvt.png](https://ithelp.ithome.com.tw/upload/images/20211013/20130354pYqCY4Gjvt.png)

### Snapshot快照

官方文件的Snapshot定義如下：

> Snapshot is a present stock, future, option info. It contain open, high, low, close, change price, average price, volume, total volume, buy price, buy volume, sell price, sell volume and yesterday volume.

也就是股票、期貨、選擇權的當下資訊的摘要整理資訊。

直接使用範例程式看結果比較有感覺，Snapshot可一次放入多筆Contracts。
我們將2330台積電與2409友達光電放入作快照：

```python
contracts = [api.Contracts.Stocks['2330'], api.Contracts.Stocks['2409']]
snapshots = api.snapshots(contracts)
df = pd.DataFrame(snapshots)
df.ts = pd.to_datetime(df.ts)

print(df)
```

Output結果如下：

```
     amount  average_price  buy_price  buy_volume  change_price  change_rate  \
0  25695000         571.26      570.0      2289.0         -4.00        -0.70   
1   6014400          16.95       16.8      3349.0         -0.25        -1.47   

       change_type  close  code exchange   high    low    open  sell_price  \
0  ChangeType.Down  571.0  2330      TSE  575.0  570.0  572.00      571.00   
1  ChangeType.Down   16.8  2409      TSE   17.2   16.8   17.15       16.85   

   sell_volume      tick_type  total_amount  total_volume                  ts  \
0           19   TickType.Buy   10804728928         18914 2021-10-13 14:30:00   
1          218  TickType.Sell     997845168         58854 2021-10-13 14:30:00   

   volume  volume_ratio  yesterday_volume  
0      45          0.71           26522.0  
1     358          0.83           71159.0  
```

### Order與掛單

證券的買賣交易是投資人最關心的行為，當然程式交易必定終究還是要出手的。
當然交易不是買，就是賣，但其中有不少的交易特性是需要了解的，其Order的屬性如下：

```
price (float or int): the price of order
quantity (int): the quantity of order
action (str): order action to buy or sell
    {Buy, Sell}
price_type (str): pricing type of order
    {LMT, MKT, MKP} (限價、市價、範圍市價)
order_type (str): the type of order
    {ROD, IOC, FOK}
order_cond (str): order condition stock only
    {Cash, MarginTrading, ShortSelling} (現股、融資、融券)
order_lot (str): the type of order
    {Common, Fixing, Odd, IntradayOdd} (整股、定盤、盤後零股、盤中零股)
first_sell {str}: the type of first sell
    {true, false}
account (:obj:Account): which account to place this order
ca (binary): the ca of this order
```

價格與數量這不用多說，但當然你是買一般整股還是零股交易，數量的單位數是不同的需要特別注意。
再來就是會影響成交行為的掛單類型：`ROD`, `IOC`, `FOK`

* ROD (Rest of Day)：當日有效，這是一般股市下單的預設值。也就是你下的張數或股數，在今日收盤入都有效。所以如果要買入5張股票，先成交了3張，另外2張會繼續自動掛單。
* IOC (Immediate or Cancel)：可同意部份成交，以剛的例子先成交了3張後，另2張就取消。
* FOK (Fill or Kill)：也就是只能全部數量成交才算，否則就直接全部取消。

而以上的Order物件，是純粹就「不含Contract的交易資訊」進行設定，設定好了後，才和你要的標的物Contract一起送到`api.place_order()`中。

我們就進行針對友達光電2409進行小買5張的掛單實例：

```python
TSE2409 = api.Contracts.Stocks.TSE.TSE2409
order = api.Order(
    price=17.0,
    quantity=5,
    action=sj.constant.Action.Buy,
    price_type=sj.constant.StockPriceType.LMT,
    order_type=sj.constant.TFTOrderType.ROD,
    account=api.stock_account
)
trade_2409 = api.place_order(TSE2409, order)
print(trade_2409)
```

上述先準備好目標Contract，然後是要掛單的Order設定。
我們以17.0元，下5張委買，使用限價模式以及ROD掛單。接著就可以把呼叫place_order()掛單。

以下是掛單的資訊：

```
contract=Stock(exchange=<Exchange.TSE: 'TSE'>, code='2409', symbol='TSE2409', name='友達', category='26', unit=1000, limit_up=18.75, limit_down=15.35, reference=17.05, update_date='2021/10/13', margin_trading_balance=99098, short_selling_balance=1344, day_trade=<DayTrade.Yes: 'Yes'>) order=Order(action=<Action.Buy: 'Buy'>, price=17.0, quantity=5, id='e40a1458', seqno='100538', ordno='00000', account=Account(account_type=<AccountType.Stock: 'S'>, person_id='PAPIUSER02', broker_id='9A95', account_id='0504486', signed=True), price_type=<StockPriceType.LMT: 'LMT'>, order_type=<FuturesOrderType.ROD: 'ROD'>) status=OrderStatus(id='e40a1458', status=<Status.PendingSubmit: 'PendingSubmit'>, status_code='0', order_datetime=datetime.datetime(2021, 10, 13, 22, 45, 23), deals=[])
```

上面的資訊，分為`contract`、`order`以及`status`三部份，而status中我們可看到目前狀態為`PendingSubmit` (傳送中)。

共有以下的狀態：

* PendingSubmit: 傳送中
* PreSubmitted: 預約單
* Submitted: 傳送成功
* Failed: 失敗
* Cancelled: 已刪除
* Filled: 完全成交
* Filling: 部分成交

### 更新掛單狀態

可使用`api.update_status()`對帳戶進行狀態更新，裡面傳入的參數是證券帳戶。
例如：

```python
api.update_status(api.stock_account)
```

而我們可以把剛剛上面使用變數接值下來的交易trade，進行其他的操作，例如**取消單**或**修改單量或價格**等。

我們以下面的取消單實例，看一下status的變化：

```python
trade_2409 = api.place_order(TSE2409, order)
print(trade_2409)

api.update_status(api.stock_account)
print(trade_2409)

api.cancel_order(trade_2409)
api.update_status(api.stock_account)
print(trade_2409)
```

我們只列出上面三次print(trade_2409)的status的部份：

```
status=OrderStatus(id='e0d6ad73', status=<Status.PendingSubmit: 'PendingSubmit'>, status_code='0', order_datetime=datetime.datetime(2021, 10, 13, 22, 57, 2), deals=[])

status=OrderStatus(id='e0d6ad73', status=<Status.PreSubmitted: 'PreSubmitted'>, status_code='R', order_datetime=datetime.datetime(2021, 10, 13, 22, 57, 2), deals=[])

status=OrderStatus(id='e0d6ad73', status=<Status.Cancelled: 'Cancelled'>, status_code='X', order_datetime=datetime.datetime(2021, 10, 13, 22, 57, 2), cancel_quantity=5, deals=[])
```

可看到上述的status歷經了：PendingSubmit(傳送中) → PreSubmitted(預約單) → Cancelled(已刪除)

### 看一下期貨與選擇權的Order

都看了股票了，也把期貨與選擇權的Order屬性也一併確認一下：

```
price (float or int): the price of order
quantity (int): the quantity of order
action (str): order action to buy or sell
    {Buy, Sell}
price_type (str): pricing type of order
    {LMT, MKT, MKP} (限價、市價、範圍市價)
order_type (str): the type of order
    {ROD, IOC, FOK}
octype (str): the type or order to open new position or close position future only
    {Auto, NewPosition, Cover, DayTrade} (自動、新倉、平倉、當沖)
account (:obj:Account): which account to place this order
ca (binary): the ca of this order
```

上述在`octype`和股票不太相同。

### 模擬期貨掛單

我們針對大台指TXF 2021年10月份期貨進行新倉掛買進2口。

```python
TXF202110 = api.Contracts.Futures.TXF.TXF202110
order = api.Order(action="Buy",
                  price=16355,
                  quantity=2,
                  price_type=sj.constant.StockPriceType.LMT,
                  order_type=sj.constant.FuturesOrderType.ROD,
                  octype=sj.constant.FuturesOCType.Auto,
                  account=api.futopt_account)
trade_txf202110 = api.place_order(TXF202110, order)
print(trade_txf202110)
```

取得的trade內容如下：

```
contract=Future(code='TXFJ1', symbol='TXF202110', name='臺股期貨10', category='TXF', delivery_month='202110', delivery_date='2021/10/20', underlying_kind='I', unit=1, limit_up=18060.0, limit_down=14778.0, reference=16419.0, update_date='2021/10/13') order=Order(action=<Action.Buy: 'Buy'>, price=16355, quantity=2, id='91242c54', seqno='980237', account=Account(account_type=<AccountType.Future: 'F'>, person_id='PAPIUSER02', broker_id='F002000', account_id='9100295', signed=True), price_type=<StockPriceType.LMT: 'LMT'>, order_type=<FuturesOrderType.ROD: 'ROD'>) status=OrderStatus(id='91242c54', status=<Status.PendingSubmit: 'PendingSubmit'>, status_code='    ', order_datetime=datetime.datetime(2021, 10, 13, 23, 5, 38), deals=[])
```

#### 盤中零股交易

除了以前要買賣零股只能於盤後進行交易，現在在盤中也可以方便投資人進行零股交易。在這邊我們就需要在Order中設定`order_lot=sj.constant.TFTStockOrderLot.IntradayOdd`，不特別指定的話是預設的`Common`(一般整股交易)。

```python
TSE2409 = api.Contracts.Stocks.TSE.TSE2409
order = api.Order(
    price=17.0,
    quantity=300,
    action=sj.constant.Action.Buy,
    price_type=sj.constant.StockPriceType.LMT,
    order_type=sj.constant.TFTOrderType.ROD,
    order_lot=sj.constant.TFTStockOrderLot.IntradayOdd,
    account=api.stock_account
)
```

而交易資訊Output如下：

```
contract=Stock(exchange=<Exchange.TSE: 'TSE'>, code='2409', symbol='TSE2409', name='友達', category='26', unit=1000, limit_up=18.75, limit_down=15.35, reference=17.05, update_date='2021/10/13', margin_trading_balance=99098, short_selling_balance=1344, day_trade=<DayTrade.Yes: 'Yes'>) order=Order(action=<Action.Buy: 'Buy'>, price=17.0, quantity=300, id='204dbcd3', seqno='100540', ordno='00000', account=Account(account_type=<AccountType.Stock: 'S'>, person_id='PAPIUSER02', broker_id='9A95', account_id='0504486', signed=True), price_type=<StockPriceType.LMT: 'LMT'>, order_type=<FuturesOrderType.ROD: 'ROD'>, order_lot=<TFTStockOrderLot.IntradayOdd: 'IntradayOdd'>) status=OrderStatus(id='204dbcd3', status=<Status.PendingSubmit: 'PendingSubmit'>, status_code='0', order_datetime=datetime.datetime(2021, 10, 13, 23, 14, 58), deals=[])
```

取消單我們先前說過了就不再寫一次，但我們可以針對盤中零售進行**改量**的委託設定修改。(**盤中零股僅可改量，不可改價**)

```python
api.update_order(trade=trade_2409, qty=250)
api.update_status(api.stock_account)
print(trade_2409)
```

### Order與Deal的Callback回呼函式設定

除了昨天文章提到的報價(Quote) Callback，在Order相關的狀態變更時，也會有對應的callback可設定。

```python
def place_cb(stat, msg):
    print('my_place_callback')
    print(stat, msg)

api.set_order_callback(place_cb)
```

而相關的內容可以直接參考[Shioaji官網API文件內容](https://sinotrade.github.io/tutor/order_deal_event/stocks/)。

### 後記

我們的Shioaji超入門系列，就到這邊告一段落了！希望能快速幫助到相入門的人可以用最短的時間理解。
果然還是有達到自己的承諾(雖然搞的很累)，把兩個主題都帶到了！

明天就是我的鐵人賽最後一天了，終於！！ 最後一篇，敬請期待囉。(當然，並沒有人在期待…)