---
slug: 2023-01-12-docker-02
title:  "Docker Desktop初體驗"
authors:  [rexmenlin]
tags: [Docker]

---

# Docker Desktop新手初體驗

在上一篇文章說明了Docker Desktop的安裝，現在要來聊聊Docker Desktop能做些什麼事。



> 上一篇講軟體安裝的版本是4.13.1版，沒多久就出了更新版到4.15.0版，除了介面小幅調整之外，也多了不少功能。之前覺得Docker Desktop其實功能挺少的，大多的好處會在使用漂亮的GUI來查看資訊而已。![](C:\data\rexmen\GithubBlog\codetenshu\blog\2023-01-12-docker-02\assets\2023-01-12-17-04-17-image.png)



## 先聊一下Docker的重要要素

在Docker的容器化架構中，對於完全不了解的人來，快速的講解一下。你需要知道的幾個重要的要素：

* **Image**

* **Container**

* **Volume**

Image可以想像成是一個唯讀的模板，好比是從網路上下載下來的一個軟體的安裝檔。即使相同的軟體，可能也有不同的版本之分，Image就是這樣的概念，主要是容器化的樣板來源。或者想像成物件導向程式的Class也行。



Container就是以Image作為樣本基礎，去實際打樣出來的實體成品。就好比拿某一個安裝檔安裝完後的可執行環境，或者想像中物件導向的Object。如果你把一個Image檔進行5次的打樣，你就會得到5個不同的Container環境，由此可想像的到Container才會是我們所有運行容器化的主角真身。



而Volume的概念就是實際儲存的空間，可以掛在Container上使用，即使Container被移除，Volume還是可以存在。可以想像成Container是被安裝完成的執行程式，但Volume是獨立的資料儲存位置，即使程式被移除後，還是能保留user資料。



有了上面的參的觀念後，就可以知道Docker Desktop的視覺化呈現，主要是為了要幫我們更直覺的管理或檢視上面這三個要素。



當然，不使用Docker Desktop，純粹使用Command Line指令也都可以作到上述的管理。



## 來看一下Docker Desktop的功能吧

左側是主要功能區，可看到Containers、Images、Volumes，下面還有兩個是Beta功能，分別是Dev Environments開發環境配置功能以及Extensions外掛管理。

![](C:\data\rexmen\GithubBlog\codetenshu\blog\2023-01-12-docker-02\assets\2023-01-12-17-20-25-image.png)

我們先把重點放在Docker御三家吧!



# Images

雖然Containers擺在最上方，但我們要從第二個Images開始看，因為他是一切容器化流程的首站。

![](C:\data\rexmen\GithubBlog\codetenshu\blog\2023-01-12-docker-02\assets\2023-01-12-17-25-49-image.png)

一進到Images區時，應該會有一點不知要從何下手，因為也沒看到如何找到既有的Image，也沒辦法在這裡建立Image，沒有任何看起來比較直觀的功能按鈕可以使用，就會愣在這裡一會兒。



原因是因為必須要搭配Terminal的Command指令進行Image的pull或run。這實在很不直覺，如果都有整個Desktop環境了，為什麼不能從GUI來執行人性化一點的流程就好。原本先前版本的Docker Desktop是這樣沒錯，但新版有了一些突破了。



我們以名為`docker/getting-started`的Image為例，如果我們要pull下載這個Image (先不進行容器化)，要開啟Terminal (在Windows的話，就執行cmd或者powershell)

```bash
docker pull docker/getting-started![](C:\data\rexmen\GithubBlog\codetenshu\blog\2023-01-12-docker-02\assets\2023-01-12-17-33-39-image.png)遠端pull下載完成後，這時候就會在Images區看到了。
```

![](C:\data\rexmen\GithubBlog\codetenshu\blog\2023-01-12-docker-02\assets\2023-01-12-17-38-32-image.png)

![](C:\data\rexmen\GithubBlog\codetenshu\blog\2023-01-12-docker-02\assets\2023-01-12-17-38-38-image.png)



### 新功能！搜尋功能

之前的搜尋功能只能針對你自己Local本機或Remote Repo (需連結帳號)的Image或Container進行「過濾」的搜尋。新版本在主視窗上方多了Search搜尋功能 (按下`Ctrl + K`)，在裡面終於可以搜尋online版本的Image了！

![](C:\data\rexmen\GithubBlog\codetenshu\blog\2023-01-12-docker-02\assets\2023-01-12-17-05-56-image.png)

我們一樣，直接點選`pull`進行下載，即可在Images區看到一樣的結果產生。