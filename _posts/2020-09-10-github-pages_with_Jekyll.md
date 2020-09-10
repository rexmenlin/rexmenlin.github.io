---
layout: default
title:  "GitHub Pages with Jekyll．用Markdown寫Blog"
date:   2020-09-10 20:00:01
categories: main
---



# GitHub Pages with Jekyll．用Markdown寫Blog

### 什麼是GitHub Pages

GitHub Pages是GitHub網站透過免費的公開儲存庫(public repository)來建立網頁，並且可輕鬆改變網站主題風格，也可打造專屬的404錯誤頁面，還能使用HTTPS的安全防護。簡言之，就是透過GitHub Pages的擴充性，讓原本作為程式碼管控的儲存庫，搖身一變也能成為一個個人網站。GitHub並且貼心的提供了對應的公開網址給使用者，當然若是你有自己申請的網址，還可進行指定，省去了租雲端主機的龐大費用。

### GitHub Pages的類型

GitHub Pages類型主要分為Project或個人/組織，前者針對特定的project來綁定，後者則針對個人或組織的帳號綁定。

以一般用戶為例，其網站網址會以`<username>.github.io`的規範來作使用，因此GitHub用戶需要在其帳號下建立一個名為`<username>.github.io`的repository。而最後的瀏覽網址即是`http(s)://<username>.github.io`

### 要怎麼進行網站內容更新與撰寫？

當然，使用GitHub的服務，必然需使用Git來作個人網頁的內容發佈，因此需要學會使用Git的技巧是免不了的。GitHub Pages提供了主要兩種方式來撰寫網站文件，一是大家所熟知的html，另一個則是寫code者必懂的markdown。(歡呼~)

### 發佈目錄

若是以個人/組織而言，網站會擺在repository的預設branch的根目錄下。而以project而言，則是需要開設一個`gh-pages` branch，將網站置於其根目錄下。使用者也可以調整設定，將目錄改放在任何branch的`/docs`之下。

若是在任一個repository之下要建立GitHub Pages，除了上述提到需建立`gh-pages` branch外，最後的瀏覽網址會是：`https://<used>.github.io/<repository>`

### 使用靜態網站生成器

GitHub Pages僅支援使用靜態的內容，因此不能把GitHub Pages當成server-side動態網站來使用。而官方推薦使用Jekyll來作為靜態網頁產生器的應用(內建支援，也可以改掉不使用)，可以透過Jekyll在GitHub Pages上打造個人的部落格。

### 使用限制

原則上GitHub Pages的repository使用限制建議為1GB以下 ，而流量每月限制為100GB。(以上為軟性限制，若超過會有一些警告通知信或網站可能無法正常運作)

另外，GitHub Pages並非設計用來讓使用者作商業用途使用，這點需要遵守。

### 什麼是Jekyll呢？

![image-20200910221944602](assets/images/2020-09-10-github-pages_with_Jekyll/image-20200910221944602-1599748564935.png)

Jekyll是一個靜態網站產生器(static website generator)，而且GitHub Pages有內建支援。先簡單談談