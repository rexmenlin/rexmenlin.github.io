---
sidebar_position: 8
---
在進入正式叫用API前，還記得先前有比如四組Hash碼(以十六進位表示)，或者要轉成bytearray (二進位binary)處理，然後又要轉成字串，或者需要對utf-8進行編碼嗎？

這裡就花些時間，一次把這些細小的轉換說明一下，當然我會以Python的方式來解說，若使用其他語言的朋友，觀念一致，但寫法或可用的程式庫或模組等使用方法不同，請再自行轉換。

#### 以十六進位方式表示的「字串」
如同永豐提供給我們的四組Hash代碼，均是以「十六進位表示的字串」，可表示的範圍從0~9以及A~F，這個好處是我們可以很明確以16個可見的英數字代表一個字串，先不論人類看不看的懂或理不理解這些十六進位的字串是什麼意思，但就電腦與網路等的各種傳輸過程或訊息交換等作業時，可避免原本因為有各種不同語系編碼誤用等，造成亂碼的錯誤。

再回想一下，我們需要把這四組16進位顯示的字串，進行兩兩XOR運算，進行XOR運算的最基礎的作法就是把他們轉成二進位的bytes。(但我們今天不講XOR)

就先舉一個我們拿到的A1 Hash代碼字串：`86D50DEF3EB7400E`，我們怎麼將它轉成Bytes的型態呢？

#### 在字串前加上'b'格式直接宣告

在Python中，可支援在宣告過程中直接字串方式貼上，但在前面加上一個`b`的提示字，這樣一來，則可讓這個字串以一種稱為Byte Object方式宣告，其特性是在ASCII的範圍內的文字可直接於print()輸出時印出(但仍然會有編碼問題，並非所有文字都可直接列印顯示)。

```python
# 字串
A1_str = "86D50DEF3EB7400E"
print(A1_str)

# Byte Object，前面加上一個'b'
A1_ba = b"86D50DEF3EB7400E"
print(A1_ba)
# Output: b'86D50DEF3EB7400E'

A1_str_to_ba = A1_str.encode("utf-8")
print(A1_str_to_ba)
# Output: b'86D50DEF3EB7400E'

print("A1_ba == A1_str_to_ba is {}".format(A1_ba == A1_str_to_ba))
# Output: A1_ba == A1_str_to_ba is True
```

##### 程式說明
`A1_str`是以**字串**方式接值，而`A1_ba`則是在前面加上一個`b`，因此他是一個以**十六進位的顯示的Bytes Object**，要小心注意這個差異。

但如果我們今天沒辦法在宣告時加上`b`的前置詞時，我們能就需要透過轉換的語法將字串轉成Bytes Object了。

因此我們在字串型別的A1_str後面加上.encode()方法，即可將此字串以指定的編碼格式方式轉換成Bytes型別(預設為utf-8)。可以看到一開始直接在前面放上一個`b`的Bytes Object和我們將字串轉成Bytes Object的結果是相同的內容。

由於我們這個Hash代碼的例子，裡面放的都是英數字，因此utf-8的編碼會仍以每個字元1個byte (8-bit)方式編碼。

#### 將Bytes Object轉換成字串
剛剛我們成功將字串轉成Bytes Object，那怎麼再轉回字串呢？
只要將Bytes Object再使用.decode()方法，後面帶入解碼的格式，很多時候我們看到文件上出現亂碼，就是encode和decode的編碼與解碼因為使用不同的編碼造成的錯誤。

```python
A1_ba_to_str = A1_ba.decode("utf-8")
print(A1_ba_to_str)
# Output: 86D50DEF3EB7400E
```

#### 試試UTF-8的中文字串

在這裡需要提到utf-8編碼，此編碼是採用非固定長度的方式作文字解碼。簡單的說，若是使用與ASCII相同的字元，例如英數字等，其長度會採用1 byte。若使用一些西歐語系的編碼，會採用2 bytes長度。像中文、日文等亞洲文字，會採用3 byte的長度。

```python
ch_01_str = "永豐API"
print("ch_01_str: {}".format(ch_01_str))
# Output: h_01_str: 永豐API

### 以上以b開頭的模式下直接輸入中文會出錯，若要這樣作，需使用ASCII code或以Hex十六進位方式輸入
### 例如：b'\xe6\xb0\xb8\xe8\xb1\x90API'
# ch_01_ba = b"永豐API"

ch_01_ba_encoded = ch_01_str.encode("utf-8")
print("ch_01_ba_encoded: {}".format(ch_01_ba_encoded))
# Output: ch_01_ba_encoded: b'\xe6\xb0\xb8\xe8\xb1\x90API'

ch_hex_01_str_encoded = ch_01_ba_encoded.hex()
print("ch_hex_01_str_encoded: {}".format(ch_hex_01_str_encoded))  #hex()轉出來是"字串"!
# Output: ch_hex_01_str_encoded: e6b0b8e8b190415049

ch_hex_01_ba_encoded = ch_hex_01_str_encoded.encode("utf-8")
print("ch_hex_01_ba_encoded: {}".format(ch_hex_01_ba_encoded))
# Output: ch_hex_01_ba_encoded: b'e6b0b8e8b190415049'
```

##### 程式說明
我們若直接將帶有中文的字串，進行.encode("utf-8")轉成Bytes Object格式，使用print()輸出時會發現有中文的地方，會以`\x`開頭帶2位的十六進位值，如果仔細數一下，會發現它是`\xe6\xb0\xb8\xe8\xb1\x90`後面再接上`API`字串。

原因是因為剛剛談到，中文字的utf-8格式會以3 bytes的方式編碼，因此：
* 「永」會產生`\xe6\xb0\xb8` (3 bytes)
* 「豐」會產生`\xe8\xb1\x90` (3 bytes)
* 「API」這三個字都屬於ASCII可顯示的字元，各佔1 byte (共3 bytes)，由於Python會將ASCII直接輸出，因此在print()下看的到這三個字元。

如果我們使用`.hex()`語法，可將這個Bytes Object轉成以十六進位顯示的"字串"格式。
會看到輸出為`e6b0b8e8b190415049`

補充說明，另外有一個模組`binascii.hexlify()`可將剛剛的ch_01_ba_encoded進行轉換，但轉出來與.hex()差異在於hexlify()轉出來的型別是Bytes Object，而不是"字串"格式。(使用前記得`import binascii`)

可以透過這個線上工具做一下驗證，將上述的這一串貼到左側，可以看到「永豐API」這幾個字成功被轉回來：
https://onlineutf8tools.com/convert-hexadecimal-to-utf8

![https://ithelp.ithome.com.tw/upload/images/20210922/20130354mF8aZ8JyRw.png](https://ithelp.ithome.com.tw/upload/images/20210922/20130354mF8aZ8JyRw.png)

若我們使用程式作轉換，作法如下：
```python
# 方法1: 從原utf-8編碼的Bytes Object來
# ch_01_ba_encoded 是 b'\xe6\xb0\xb8\xe8\xb1\x90API'
ori_ch_str = ch_01_ba_encoded.decode("utf-8")
print("ori_ch_str: {}".format(ori_ch_str))
# Output: ori_ch_str: 永豐API

# 方法2: 從十六進位字串來
# 註：ch_hex_01_str_encoded 是 'e6b0b8e8b190415049'字串
ori_ch_str2 = bytes.fromhex(ch_hex_01_str_encoded).decode("utf-8")
print("ori_ch_str2: {}".format(ori_ch_str2))
# Output: ori_ch_str2: 永豐API
```

##### 程式說明
若是直接轉換的來源是從utf-8編碼的Bytes Object來的，也就是剛看到的`b'\xe6\xb0\xb8\xe8\xb1\x90API'`，那直接使用bytes的.decode("utf-8")即可轉回原中文字。

若是中間有作過`.hex()`轉成純十六進位表示法時，則使用bytes.fromhex()轉換後再進行utf-8編碼，亦可轉回原中文字。