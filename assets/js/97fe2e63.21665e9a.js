"use strict";(self.webpackChunkcodetenshu=self.webpackChunkcodetenshu||[]).push([[2450],{3905:(e,n,t)=>{t.d(n,{Zo:()=>s,kt:()=>_});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=r.createContext({}),m=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):p(p({},n),e)),t},s=function(e){var n=m(e.components);return r.createElement(i.Provider,{value:n},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},c=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=m(t),c=a,_=d["".concat(i,".").concat(c)]||d[c]||u[c]||o;return t?r.createElement(_,p(p({ref:n},s),{},{components:t})):r.createElement(_,p({ref:n},s))}));function _(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,p=new Array(o);p[0]=c;var l={};for(var i in n)hasOwnProperty.call(n,i)&&(l[i]=n[i]);l.originalType=e,l[d]="string"==typeof e?e:a,p[1]=l;for(var m=2;m<o;m++)p[m]=t[m];return r.createElement.apply(null,p)}return r.createElement.apply(null,t)}c.displayName="MDXCreateElement"},2147:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>p,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>m});var r=t(7462),a=(t(7294),t(3905));const o={sidebar_position:16},p=void 0,l={unversionedId:"finance-bank-api/Day15 - \u64b0\u5bebDjango\u7684Model\uff0c\u4f7f\u7528ORM\u548cHeroku Postgres\u7d81\u4e00\u8d77\u3002",id:"finance-bank-api/Day15 - \u64b0\u5bebDjango\u7684Model\uff0c\u4f7f\u7528ORM\u548cHeroku Postgres\u7d81\u4e00\u8d77\u3002",title:"Day15 - \u64b0\u5bebDjango\u7684Model\uff0c\u4f7f\u7528ORM\u548cHeroku Postgres\u7d81\u4e00\u8d77\u3002",description:"\u4eca\u5929\u9762\u81e8\u4e86\u65b7\u66f4\u7684\u5371\u6a5f\uff01",source:"@site/docs/finance-bank-api/Day15 - \u64b0\u5bebDjango\u7684Model\uff0c\u4f7f\u7528ORM\u548cHeroku Postgres\u7d81\u4e00\u8d77\u3002.md",sourceDirName:"finance-bank-api",slug:"/finance-bank-api/Day15 - \u64b0\u5bebDjango\u7684Model\uff0c\u4f7f\u7528ORM\u548cHeroku Postgres\u7d81\u4e00\u8d77\u3002",permalink:"/docs/finance-bank-api/Day15 - \u64b0\u5bebDjango\u7684Model\uff0c\u4f7f\u7528ORM\u548cHeroku Postgres\u7d81\u4e00\u8d77\u3002",draft:!1,tags:[],version:"current",sidebarPosition:16,frontMatter:{sidebar_position:16},sidebar:"tutorialSidebar",previous:{title:"Day14 - \u4f7f\u7528Heroku Postgres\u8cc7\u6599\u5eab\uff0c\u5b58\u5132\u8a02\u55ae\u4ea4\u6613\u8cc7\u8a0a",permalink:"/docs/finance-bank-api/Day14 - \u4f7f\u7528Heroku Postgres\u8cc7\u6599\u5eab\uff0c\u5b58\u5132\u8a02\u55ae\u4ea4\u6613\u8cc7\u8a0a"},next:{title:"Day16 - \u53d6\u5f97PayToken\u7684\u6700\u5f8c\u4e00\u54e9\u8def\u5f88\u6162\u9577 - \u8907\u88fd (9)",permalink:"/docs/finance-bank-api/Day16 - \u53d6\u5f97PayToken\u7684\u6700\u5f8c\u4e00\u54e9\u8def\u5f88\u6162\u9577 - \u8907\u88fd (9)"}},i={},m=[{value:"\u56de\u5230\u6b63\u984c",id:"\u56de\u5230\u6b63\u984c",level:4},{value:"\u7a0b\u5f0f\u8aaa\u660e",id:"\u7a0b\u5f0f\u8aaa\u660e",level:5},{value:"\u65b0\u589e\u4e00\u7b46ATM\u865b\u64ec\u5e33\u6236\u8a02\u55ae",id:"\u65b0\u589e\u4e00\u7b46atm\u865b\u64ec\u5e33\u6236\u8a02\u55ae",level:4}],s={toc:m};function d(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,r.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"\u4eca\u5929\u9762\u81e8\u4e86\u65b7\u66f4\u7684\u5371\u6a5f\uff01"),(0,a.kt)("p",null,"\u672c\u4eba\u5f9e\u6628\u665a\u958b\u59cb\u8178\u80c3\u4e0d\u9069\uff0c\u6574\u665a\u7ffb\u4f86\u8986\u53bb\u7121\u6cd5\u5165\u7720\uff0c\u65e9\u4e0a\u66f4\u56b4\u91cd\uff0c\u8acb\u5047\u4e86\u4e00\u6574\u5929\uff0c\u63a5\u8457\u958b\u59cb\u767c\u71d2\u548c\u5614\u5410\uff0c\u4e0b\u5348\u53bb\u639b\u4e86\u5927\u91ab\u9662\u7684\u6025\u8a3a\u5f8c\uff0c\u662f\u6025\u6027\u8178\u80c3\u767c\u708e\uff0c\u525b\u525b\u6253\u5b8c\u9ede\u6ef4\u624d\u56de\u4f86\uff0c\u6298\u9a30\u4e86\u4e00\u6574\u5929\uff0c\u539f\u672c\u4e0a\u5929\u53ef\u80fd\u8981\u6211\u653e\u68c4\u3002"),(0,a.kt)("p",null,"\u4e0d\u904e\u518d\u600e\u9ebc\u8aaa\u90fd\u52aa\u529b\u4e86\u4e00\u534a\u4e86\uff0c\u96d6\u7136\u73fe\u5728\u8eab\u9ad4\u76f8\u7576\u4e0d\u9069\uff0c\u4e00\u6574\u5929\u5b8c\u5168\u6c92\u6709\u9032\u98df\uff0c\u6c7a\u5b9a\u9084\u662f\u518d\u52aa\u529b\u4e00\u4e0b\uff0c\u4e2d\u65b7\u4e86\u5be6\u5728\u53ef\u60dc\u3002"),(0,a.kt)("h4",{id:"\u56de\u5230\u6b63\u984c"},"\u56de\u5230\u6b63\u984c"),(0,a.kt)("p",null,"\u4f46\u5728\u6b64\u4e4b\u524d\uff0c\u6211\u5011\u56e0\u70ba\u53d7\u9650\u65bcHeroku\u7684\u8cc7\u6599\u5eab\u9650\u5236\uff0c\u7121\u6cd5\u4f7f\u7528\u9810\u8a2d\u7684SQLite\uff0c\u8981\u5148\u4fee\u6539\u4e00\u4e0b\u8cc7\u6599\u5eab\u8a2d\u5b9a\u6210Postgres\u3002\u6211\u5011\u5148\u627e\u5230Django App mysite\u76ee\u9304\u5e95\u4e0b\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"settings.py"),"\uff0c\u4fee\u6539\u5176\u4e2d",(0,a.kt)("inlineCode",{parentName:"p"},"DATABASES"),"\u7684Dictionary\u7269\u4ef6\uff0c\u628a\u539f\u5148\u9810\u8a2d\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"sqlite3"),"\u63db\u6210",(0,a.kt)("inlineCode",{parentName:"p"},"postgresql"),"\u3002\u7576\u7136\u9084\u8981\u52a0\u4e0a\u5176\u4ed6\u7684\u53c3\u6578\uff0c\u5305\u542b",(0,a.kt)("inlineCode",{parentName:"p"},"USER"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"PASSWORD"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"HOST"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"PORT"),"\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"DATABASES = {\n    'default': {\n        'ENGINE': 'django.db.backends.postgresql',\n        'NAME': 'd15______rvdt',\n        'USER': 'xbz______bsnz',\n        'PASSWORD': 'bfbca81796d______________________d5162d1c69dc3dd9e76e5',\n        'HOST': 'ec2-________-31.compute-1.amazonaws.com',\n        'PORT': '5432'\n    }\n}\n")),(0,a.kt)("p",null,"\u7136\u5f8c\uff0c\u6211\u5011\u5c31\u53ef\u4ee5\u5148\u65b0\u589e\u4e00\u500b",(0,a.kt)("inlineCode",{parentName:"p"},"order")," Django App\uff0c\u7136\u5f8c\u518d\u5176\u76ee\u9304\u5e95\u4e0b\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"models.py"),"\u8a2d\u5b9a\u4e00\u500b\u65b0\u7684\u6a21\u578b\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"from django.db import models\n\n\nclass Payment(models.Model):\n    order_no = models.CharField(max_length=13)\n    ts_no = models.CharField(max_length=14, null=True)\n    amount = models.IntegerField()\n    pay_type = models.CharField(max_length=10)\n    pay_status = models.CharField(max_length=20, null=True)\n    pay_token = models.CharField(max_length=100, null=True)\n    atm_pay_no = models.CharField(max_length=14, null=True)\n    web_atm_url = models.CharField(max_length=250, null=True)\n    otp_url = models.CharField(max_length=250, null=True)\n    card_pay_url = models.CharField(max_length=250, null=True)\n    create_time = models.DateTimeField()\n    lm_time = models.DateTimeField(null=True)\n\n    def __str__(self):\n        return self.order_no\n")),(0,a.kt)("h5",{id:"\u7a0b\u5f0f\u8aaa\u660e"},"\u7a0b\u5f0f\u8aaa\u660e"),(0,a.kt)("p",null,"\u6211\u5011\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"order"),"\u7684models.py\uff0c\u65b0\u589e\u4e86\u4e00\u500b",(0,a.kt)("inlineCode",{parentName:"p"},"Payment")," class\uff0c\u63a5\u8457\u5c31\u8981\u5b9a\u7fa9\u5176\u4e2d\u6709\u54ea\u4e9b\u5c6c\u6027\u3002\u9019\u4e9b\u5c6c\u6027\u5747\u53ef\u900f\u904e",(0,a.kt)("inlineCode",{parentName:"p"},"models"),"\u7684\u5c0d\u61c9\u65b9\u6cd5\uff0c\u4f86\u5b9a\u7fa9\u8a72\u5c6c\u6027\u7684\u8cc7\u6599\u578b\u5225\uff0c\u4ee5\u53ca\u4e00\u4e9b\u984d\u5916\u7684\u5ba3\u544a\u8207\u9650\u5236\u3002"),(0,a.kt)("p",null,"\u4f8b\u5982\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u8981\u65b0\u589e\u4e00\u500b\u6587\u5b57\u985e\u578b\u7684\u5c6c\u6027\uff0c\u53ef\u4f7f\u7528models.CharField()"),(0,a.kt)("li",{parentName:"ul"},"\u8981\u65b0\u589e\u4e00\u500b\u6574\u6578\u985e\u578b\u7684\u5c6c\u6027\uff0c\u53ef\u4f7f\u7528models.IntegerField()"),(0,a.kt)("li",{parentName:"ul"},"\u8981\u65b0\u589e\u4e00\u500b\u6642\u9593\u985e\u578b\u7684\u5c6c\u6027\uff0c\u53ef\u4f7f\u7528models.DateTimeField()\n\u5b8c\u6574\u7684\u7528\u6cd5\u8acb\u53c3\u95b1Django\u7684",(0,a.kt)("a",{parentName:"li",href:"https://docs.djangoproject.com/en/3.2/ref/models/fields/"},"\u5b98\u65b9\u6587\u4ef6"),"\u3002")),(0,a.kt)("p",null,"\u800c\u6211\u5011\u5c0d\u61c9\u5230\u8cc7\u6599\u5eab\u4e2d\uff0c\u82e5\u662f\u5e0c\u671b\u8a72\u6b04\u4f4d\u662f",(0,a.kt)("inlineCode",{parentName:"p"},"\u975eNULL"),"\u7684\u8a71\uff0c\u5247\u53ef\u5728\u5176\u4e2d\u53c3\u6578\u52a0\u4e0a",(0,a.kt)("inlineCode",{parentName:"p"},"null=True"),"\u3002\u800c\u82e5\u6709\u6700\u5927\u9577\u5ea6\u9650\u5236\uff0c\u5247\u53ef\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"max_length"),"\u4f86\u6307\u5b9a\u3002"),(0,a.kt)("p",null,"\u5728\u8a2d\u5b9a\u5b8c\u6210\u5f8c\uff0c\u56e0\u70ba\u525b\u525b\u6211\u5011\u5df2\u8a2d\u5b9asettings.py\u4e2d\u7684DATABASE\u9023\u7dda\u8cc7\u8a0a\uff0c\u56e0\u6b64\u6211\u5011\u53ef\u4ee5\u900f\u904emanage.py\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"makemigrations"),"\u4ee5\u53ca",(0,a.kt)("inlineCode",{parentName:"p"},"migrate"),"\u6307\u4ee4\u5c07\u7570\u52d5\u66f4\u65b0\u81f3\u9023\u7d50\u7684DATABASE\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"mysite > python manage.py makemigrations\nmysite > python manage.py migrate\n")),(0,a.kt)("p",null,"\u63a5\u8457\u6211\u5011\u53ef\u4ee5\u4f7f\u7528pgAdmin\u770b\u770bTables\u88e1\u9762\u767c\u751f\u4e86\u4ec0\u9ebc\u795e\u5947\u7684\u4e8b\u3002"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://ithelp.ithome.com.tw/upload/images/20210930/20130354fPMA0p0zZX.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210930/20130354fPMA0p0zZX.png"})),(0,a.kt)("p",null,"\u53ef\u4ee5\u5728Shcemas > Tables\u5e95\u4e0b\uff0c\u767c\u73fe\u65b0\u589e\u4e86\u4e00\u500b",(0,a.kt)("inlineCode",{parentName:"p"},"order_payment"),"\u7684Table\u3002\u800c\u88e1\u9762\u7684\u6b04\u4f4d\uff0c\u5c31\u662f\u4f9d\u7167\u525b\u525bDjango Model\u6240\u5b9a\u7fa9\u7684\u6b04\u4f4d\u6240\u5efa\u7acb\u7684\u3002\u7531\u65bc\u6211\u5011\u6c92\u6709\u65b0\u589eprimary_key\uff0c\u56e0\u6b64\u9810\u8a2d\u6703\u65b0\u589e\u4e00\u500b",(0,a.kt)("inlineCode",{parentName:"p"},"id"),"\u6b04\u4f4d\u4f5c\u70baPK\u3002"),(0,a.kt)("h4",{id:"\u65b0\u589e\u4e00\u7b46atm\u865b\u64ec\u5e33\u6236\u8a02\u55ae"},"\u65b0\u589e\u4e00\u7b46ATM\u865b\u64ec\u5e33\u6236\u8a02\u55ae"),(0,a.kt)("p",null,"\u6211\u5011\u9700\u8981\u5148\u5c07\u5148\u524d\u7522\u751f\u4e00\u7b46\u8a02\u55ae\u7684\u96f6\u6563\u6e2c\u8a66\u7528\u7684python code\uff0c\u5148\u6574\u7406\u5230App\u5e95\u4e0b\uff0c\u6211\u547d\u540d\u70baSinopacAPI.py\u3002\u4e26\u5728\u5e95\u4e0b\u958b\u4e00\u500bstatic method\uff0c\u8b93\u5b83\u53ef\u4ee5\u76f4\u63a5\u547c\u53eb\u6c38\u8c50API\u7522\u751f\u4e00\u7b46\u8a02\u55ae\uff0c\u4e26\u4e14\u6700\u5f8c\u5c07\u89e3\u5bc6\u56de\u50b3\u5f8c\u7684JSON\u56de\u50b3\u56de\u4f86\u3002\u63a5\u8457\u5c31\u53ef\u4ee5\u5c07\u5176\u503c\u90fd\u62ff\u51fa\u4f86\uff0c\u7522\u751f\u4e00\u500b\u65b0\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"Payment"),"\u7269\u4ef6\uff0c\u628a\u503c\u8a2d\u5b9a\u597d\u5f8c\uff0c\u518d\u5584\u7528\u5177\u5099ORM\u6620\u5c04\u7684Payment\u7269\u4ef6\u7684",(0,a.kt)("inlineCode",{parentName:"p"},".save()"),"\u65b9\u6cd5\uff0c\u5c07\u503c\u5beb\u5230\u8cc7\u6599\u5eab\u4e2d\u3002"),(0,a.kt)("p",null,"\u5728order/models.py\u4e2d\uff0c\u64f4\u589ecreate_new_order()\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'from datetime import datetime\nfrom django.db import models\nfrom .sinopacapi import SinopacAPI\n\ndef create_new_order(will_paid, amount):\n    resp_json = SinopacAPI.create_new_order(will_paid, amount)\n    new_payment = Payment()\n    new_payment.order_no = resp_json["OrderNo"]\n    new_payment.ts_no = resp_json["TSNo"]\n    new_payment.amount = resp_json["Amount"]\n    new_payment.pay_status = resp_json["Status"]\n    new_payment.atm_pay_no = resp_json["ATMParam"]["AtmPayNo"]\n    new_payment.web_atm_url = resp_json["ATMParam"]["WebAtmURL"]\n    new_payment.otp_url = resp_json["ATMParam"]["OtpURL"]\n    new_payment.create_time = datetime.now()\n    new_payment.save()\n\n    return resp_json\n')),(0,a.kt)("p",null,"\u800c\u5728View\u4e2d\uff0c\u6211\u5148\u4ee5\u6700\u7c21\u55ae\u7684\u65b9\u5f0f\u547c\u53eb\u5f8c\uff0c\u5728\u9801\u9762\u4e0a\u6703\u986f\u793a\u51fa\u9019\u6b21\u7684OrderNo\u3002\n\u5728order/views.py\u7684\u7a0b\u5f0f\u78bc"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'from django.http import HttpResponse\nfrom .models import create_new_order\n\n\ndef create_order(request):\n    will_paid = True\n    amount = 799\n    resp_json = create_new_order(will_paid, amount)\n    print("### resp_json: {}".format(resp_json))\n    return HttpResponse("New Order Created: {}".format(resp_json["OrderNo"]))\n')),(0,a.kt)("p",null,"\u7576\u7136\u4e5f\u9700\u8981\u5c07urls.py\u8a2d\u5b9a\u4e00\u4e0b\uff0c\u4ee5\u4e0b\u70baorder/urls.py"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"from django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path('createorder', views.create_order, name='createorder'),\n]\n")),(0,a.kt)("p",null,"\u56e0\u6b64\u6211\u5011\u5c31\u53ef\u4ee5\u5148\u5728\u672c\u6a5f\u7aef\u6e2c\u8a66\u4e00\u4e0b\uff1a\n",(0,a.kt)("a",{parentName:"p",href:"http://127.0.0.1:8000/order/createorder"},"http://127.0.0.1:8000/order/createorder")),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://ithelp.ithome.com.tw/upload/images/20210930/20130354iecz0zZSAe.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210930/20130354iecz0zZSAe.png"})),(0,a.kt)("p",null,"\u63a5\u8457\u6211\u5011\u518d\u5230pgAdmin\u4e2d\u67e5\u770border_payment\u7684\u8cc7\u6599\uff1a"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://ithelp.ithome.com.tw/upload/images/20210930/20130354BzwKhJ5Hm5.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210930/20130354BzwKhJ5Hm5.png"})),(0,a.kt)("p",null,"\u592a\u611f\u52d5\u4e86\uff0c\u6211\u5011\u6210\u529f\u904b\u7528ORM\u7684\u65b9\u6cd5\uff0c\u7522\u751f\u4e00\u7b46\u8a02\u55ae\u4e86\u3002"),(0,a.kt)("p",null,"\u8eab\u9ad4\u4e0d\u8212\u670d\uff0c\u4eca\u5929\u53ea\u80fd\u52c9\u5f37\u5148\u505a\u5230\u9019\u6a23\uff0c\u660e\u5929\u518d\u4f86\u7522\u751f\u771f\u7684BackendURL\u7d66\u6c38\u8c50\u4f5c\u547c\u53eb\uff0c\u4e26\u884c\u4f86\u770b\u770b\u6211\u5011\u662f\u5426\u80fd\u6210\u529f\u53d6\u5f97PayToken\u3002"))}d.isMDXComponent=!0}}]);