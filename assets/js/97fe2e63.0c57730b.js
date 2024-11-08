"use strict";(self.webpackChunkmy_site=self.webpackChunkmy_site||[]).push([[9382],{9025:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>d,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>i});const s=JSON.parse('{"id":"finance-bank-api/Day15 - \u64b0\u5bebDjango\u7684Model\uff0c\u4f7f\u7528ORM\u548cHeroku Postgres\u7d81\u4e00\u8d77\u3002","title":"Day15 - \u64b0\u5bebDjango\u7684Model\uff0c\u4f7f\u7528ORM\u548cHeroku Postgres\u7d81\u4e00\u8d77\u3002","description":"\u4eca\u5929\u9762\u81e8\u4e86\u65b7\u66f4\u7684\u5371\u6a5f\uff01","source":"@site/docs/finance-bank-api/Day15 - \u64b0\u5bebDjango\u7684Model\uff0c\u4f7f\u7528ORM\u548cHeroku Postgres\u7d81\u4e00\u8d77\u3002.md","sourceDirName":"finance-bank-api","slug":"/finance-bank-api/Day15 - \u64b0\u5bebDjango\u7684Model\uff0c\u4f7f\u7528ORM\u548cHeroku Postgres\u7d81\u4e00\u8d77\u3002","permalink":"/docs/finance-bank-api/Day15 - \u64b0\u5bebDjango\u7684Model\uff0c\u4f7f\u7528ORM\u548cHeroku Postgres\u7d81\u4e00\u8d77\u3002","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":16,"frontMatter":{"sidebar_position":16},"sidebar":"tutorialSidebar","previous":{"title":"Day14 - \u4f7f\u7528Heroku Postgres\u8cc7\u6599\u5eab\uff0c\u5b58\u5132\u8a02\u55ae\u4ea4\u6613\u8cc7\u8a0a","permalink":"/docs/finance-bank-api/Day14 - \u4f7f\u7528Heroku Postgres\u8cc7\u6599\u5eab\uff0c\u5b58\u5132\u8a02\u55ae\u4ea4\u6613\u8cc7\u8a0a"},"next":{"title":"Day16 - \u53d6\u5f97PayToken\u7684\u6700\u5f8c\u4e00\u54e9\u8def\u5f88\u6162\u9577","permalink":"/docs/finance-bank-api/Day16 - \u53d6\u5f97PayToken\u7684\u6700\u5f8c\u4e00\u54e9\u8def\u5f88\u6162\u9577"}}');var o=r(4848),t=r(8453);const a={sidebar_position:16},d=void 0,l={},i=[{value:"\u56de\u5230\u6b63\u984c",id:"\u56de\u5230\u6b63\u984c",level:4},{value:"\u7a0b\u5f0f\u8aaa\u660e",id:"\u7a0b\u5f0f\u8aaa\u660e",level:5},{value:"\u65b0\u589e\u4e00\u7b46ATM\u865b\u64ec\u5e33\u6236\u8a02\u55ae",id:"\u65b0\u589e\u4e00\u7b46atm\u865b\u64ec\u5e33\u6236\u8a02\u55ae",level:4}];function c(e){const n={a:"a",code:"code",h4:"h4",h5:"h5",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"\u4eca\u5929\u9762\u81e8\u4e86\u65b7\u66f4\u7684\u5371\u6a5f\uff01"}),"\n",(0,o.jsx)(n.p,{children:"\u672c\u4eba\u5f9e\u6628\u665a\u958b\u59cb\u8178\u80c3\u4e0d\u9069\uff0c\u6574\u665a\u7ffb\u4f86\u8986\u53bb\u7121\u6cd5\u5165\u7720\uff0c\u65e9\u4e0a\u66f4\u56b4\u91cd\uff0c\u8acb\u5047\u4e86\u4e00\u6574\u5929\uff0c\u63a5\u8457\u958b\u59cb\u767c\u71d2\u548c\u5614\u5410\uff0c\u4e0b\u5348\u53bb\u639b\u4e86\u5927\u91ab\u9662\u7684\u6025\u8a3a\u5f8c\uff0c\u662f\u6025\u6027\u8178\u80c3\u767c\u708e\uff0c\u525b\u525b\u6253\u5b8c\u9ede\u6ef4\u624d\u56de\u4f86\uff0c\u6298\u9a30\u4e86\u4e00\u6574\u5929\uff0c\u539f\u672c\u4e0a\u5929\u53ef\u80fd\u8981\u6211\u653e\u68c4\u3002"}),"\n",(0,o.jsx)(n.p,{children:"\u4e0d\u904e\u518d\u600e\u9ebc\u8aaa\u90fd\u52aa\u529b\u4e86\u4e00\u534a\u4e86\uff0c\u96d6\u7136\u73fe\u5728\u8eab\u9ad4\u76f8\u7576\u4e0d\u9069\uff0c\u4e00\u6574\u5929\u5b8c\u5168\u6c92\u6709\u9032\u98df\uff0c\u6c7a\u5b9a\u9084\u662f\u518d\u52aa\u529b\u4e00\u4e0b\uff0c\u4e2d\u65b7\u4e86\u5be6\u5728\u53ef\u60dc\u3002"}),"\n",(0,o.jsx)(n.h4,{id:"\u56de\u5230\u6b63\u984c",children:"\u56de\u5230\u6b63\u984c"}),"\n",(0,o.jsxs)(n.p,{children:["\u4f46\u5728\u6b64\u4e4b\u524d\uff0c\u6211\u5011\u56e0\u70ba\u53d7\u9650\u65bcHeroku\u7684\u8cc7\u6599\u5eab\u9650\u5236\uff0c\u7121\u6cd5\u4f7f\u7528\u9810\u8a2d\u7684SQLite\uff0c\u8981\u5148\u4fee\u6539\u4e00\u4e0b\u8cc7\u6599\u5eab\u8a2d\u5b9a\u6210Postgres\u3002\u6211\u5011\u5148\u627e\u5230Django App mysite\u76ee\u9304\u5e95\u4e0b\u7684",(0,o.jsx)(n.code,{children:"settings.py"}),"\uff0c\u4fee\u6539\u5176\u4e2d",(0,o.jsx)(n.code,{children:"DATABASES"}),"\u7684Dictionary\u7269\u4ef6\uff0c\u628a\u539f\u5148\u9810\u8a2d\u7684",(0,o.jsx)(n.code,{children:"sqlite3"}),"\u63db\u6210",(0,o.jsx)(n.code,{children:"postgresql"}),"\u3002\u7576\u7136\u9084\u8981\u52a0\u4e0a\u5176\u4ed6\u7684\u53c3\u6578\uff0c\u5305\u542b",(0,o.jsx)(n.code,{children:"USER"}),"\u3001",(0,o.jsx)(n.code,{children:"PASSWORD"}),"\u3001",(0,o.jsx)(n.code,{children:"HOST"}),"\u3001",(0,o.jsx)(n.code,{children:"PORT"}),"\u3002"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:"DATABASES = {\n    'default': {\n        'ENGINE': 'django.db.backends.postgresql',\n        'NAME': 'd15______rvdt',\n        'USER': 'xbz______bsnz',\n        'PASSWORD': 'bfbca81796d______________________d5162d1c69dc3dd9e76e5',\n        'HOST': 'ec2-________-31.compute-1.amazonaws.com',\n        'PORT': '5432'\n    }\n}\n"})}),"\n",(0,o.jsxs)(n.p,{children:["\u7136\u5f8c\uff0c\u6211\u5011\u5c31\u53ef\u4ee5\u5148\u65b0\u589e\u4e00\u500b",(0,o.jsx)(n.code,{children:"order"})," Django App\uff0c\u7136\u5f8c\u518d\u5176\u76ee\u9304\u5e95\u4e0b\u7684",(0,o.jsx)(n.code,{children:"models.py"}),"\u8a2d\u5b9a\u4e00\u500b\u65b0\u7684\u6a21\u578b\u3002"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:"from django.db import models\n\n\nclass Payment(models.Model):\n    order_no = models.CharField(max_length=13)\n    ts_no = models.CharField(max_length=14, null=True)\n    amount = models.IntegerField()\n    pay_type = models.CharField(max_length=10)\n    pay_status = models.CharField(max_length=20, null=True)\n    pay_token = models.CharField(max_length=100, null=True)\n    atm_pay_no = models.CharField(max_length=14, null=True)\n    web_atm_url = models.CharField(max_length=250, null=True)\n    otp_url = models.CharField(max_length=250, null=True)\n    card_pay_url = models.CharField(max_length=250, null=True)\n    create_time = models.DateTimeField()\n    lm_time = models.DateTimeField(null=True)\n\n    def __str__(self):\n        return self.order_no\n"})}),"\n",(0,o.jsx)(n.h5,{id:"\u7a0b\u5f0f\u8aaa\u660e",children:"\u7a0b\u5f0f\u8aaa\u660e"}),"\n",(0,o.jsxs)(n.p,{children:["\u6211\u5011\u5728",(0,o.jsx)(n.code,{children:"order"}),"\u7684models.py\uff0c\u65b0\u589e\u4e86\u4e00\u500b",(0,o.jsx)(n.code,{children:"Payment"})," class\uff0c\u63a5\u8457\u5c31\u8981\u5b9a\u7fa9\u5176\u4e2d\u6709\u54ea\u4e9b\u5c6c\u6027\u3002\u9019\u4e9b\u5c6c\u6027\u5747\u53ef\u900f\u904e",(0,o.jsx)(n.code,{children:"models"}),"\u7684\u5c0d\u61c9\u65b9\u6cd5\uff0c\u4f86\u5b9a\u7fa9\u8a72\u5c6c\u6027\u7684\u8cc7\u6599\u578b\u5225\uff0c\u4ee5\u53ca\u4e00\u4e9b\u984d\u5916\u7684\u5ba3\u544a\u8207\u9650\u5236\u3002"]}),"\n",(0,o.jsx)(n.p,{children:"\u4f8b\u5982\uff1a"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"\u8981\u65b0\u589e\u4e00\u500b\u6587\u5b57\u985e\u578b\u7684\u5c6c\u6027\uff0c\u53ef\u4f7f\u7528models.CharField()"}),"\n",(0,o.jsx)(n.li,{children:"\u8981\u65b0\u589e\u4e00\u500b\u6574\u6578\u985e\u578b\u7684\u5c6c\u6027\uff0c\u53ef\u4f7f\u7528models.IntegerField()"}),"\n",(0,o.jsxs)(n.li,{children:["\u8981\u65b0\u589e\u4e00\u500b\u6642\u9593\u985e\u578b\u7684\u5c6c\u6027\uff0c\u53ef\u4f7f\u7528models.DateTimeField()\n\u5b8c\u6574\u7684\u7528\u6cd5\u8acb\u53c3\u95b1Django\u7684",(0,o.jsx)(n.a,{href:"https://docs.djangoproject.com/en/3.2/ref/models/fields/",children:"\u5b98\u65b9\u6587\u4ef6"}),"\u3002"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["\u800c\u6211\u5011\u5c0d\u61c9\u5230\u8cc7\u6599\u5eab\u4e2d\uff0c\u82e5\u662f\u5e0c\u671b\u8a72\u6b04\u4f4d\u662f",(0,o.jsx)(n.code,{children:"\u975eNULL"}),"\u7684\u8a71\uff0c\u5247\u53ef\u5728\u5176\u4e2d\u53c3\u6578\u52a0\u4e0a",(0,o.jsx)(n.code,{children:"null=True"}),"\u3002\u800c\u82e5\u6709\u6700\u5927\u9577\u5ea6\u9650\u5236\uff0c\u5247\u53ef\u4f7f\u7528",(0,o.jsx)(n.code,{children:"max_length"}),"\u4f86\u6307\u5b9a\u3002"]}),"\n",(0,o.jsxs)(n.p,{children:["\u5728\u8a2d\u5b9a\u5b8c\u6210\u5f8c\uff0c\u56e0\u70ba\u525b\u525b\u6211\u5011\u5df2\u8a2d\u5b9asettings.py\u4e2d\u7684DATABASE\u9023\u7dda\u8cc7\u8a0a\uff0c\u56e0\u6b64\u6211\u5011\u53ef\u4ee5\u900f\u904emanage.py\u7684",(0,o.jsx)(n.code,{children:"makemigrations"}),"\u4ee5\u53ca",(0,o.jsx)(n.code,{children:"migrate"}),"\u6307\u4ee4\u5c07\u7570\u52d5\u66f4\u65b0\u81f3\u9023\u7d50\u7684DATABASE\u3002"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"mysite > python manage.py makemigrations\nmysite > python manage.py migrate\n"})}),"\n",(0,o.jsx)(n.p,{children:"\u63a5\u8457\u6211\u5011\u53ef\u4ee5\u4f7f\u7528pgAdmin\u770b\u770bTables\u88e1\u9762\u767c\u751f\u4e86\u4ec0\u9ebc\u795e\u5947\u7684\u4e8b\u3002"}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{src:"https://ithelp.ithome.com.tw/upload/images/20210930/20130354fPMA0p0zZX.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210930/20130354fPMA0p0zZX.png"})}),"\n",(0,o.jsxs)(n.p,{children:["\u53ef\u4ee5\u5728Shcemas > Tables\u5e95\u4e0b\uff0c\u767c\u73fe\u65b0\u589e\u4e86\u4e00\u500b",(0,o.jsx)(n.code,{children:"order_payment"}),"\u7684Table\u3002\u800c\u88e1\u9762\u7684\u6b04\u4f4d\uff0c\u5c31\u662f\u4f9d\u7167\u525b\u525bDjango Model\u6240\u5b9a\u7fa9\u7684\u6b04\u4f4d\u6240\u5efa\u7acb\u7684\u3002\u7531\u65bc\u6211\u5011\u6c92\u6709\u65b0\u589eprimary_key\uff0c\u56e0\u6b64\u9810\u8a2d\u6703\u65b0\u589e\u4e00\u500b",(0,o.jsx)(n.code,{children:"id"}),"\u6b04\u4f4d\u4f5c\u70baPK\u3002"]}),"\n",(0,o.jsx)(n.h4,{id:"\u65b0\u589e\u4e00\u7b46atm\u865b\u64ec\u5e33\u6236\u8a02\u55ae",children:"\u65b0\u589e\u4e00\u7b46ATM\u865b\u64ec\u5e33\u6236\u8a02\u55ae"}),"\n",(0,o.jsxs)(n.p,{children:["\u6211\u5011\u9700\u8981\u5148\u5c07\u5148\u524d\u7522\u751f\u4e00\u7b46\u8a02\u55ae\u7684\u96f6\u6563\u6e2c\u8a66\u7528\u7684python code\uff0c\u5148\u6574\u7406\u5230App\u5e95\u4e0b\uff0c\u6211\u547d\u540d\u70baSinopacAPI.py\u3002\u4e26\u5728\u5e95\u4e0b\u958b\u4e00\u500bstatic method\uff0c\u8b93\u5b83\u53ef\u4ee5\u76f4\u63a5\u547c\u53eb\u6c38\u8c50API\u7522\u751f\u4e00\u7b46\u8a02\u55ae\uff0c\u4e26\u4e14\u6700\u5f8c\u5c07\u89e3\u5bc6\u56de\u50b3\u5f8c\u7684JSON\u56de\u50b3\u56de\u4f86\u3002\u63a5\u8457\u5c31\u53ef\u4ee5\u5c07\u5176\u503c\u90fd\u62ff\u51fa\u4f86\uff0c\u7522\u751f\u4e00\u500b\u65b0\u7684",(0,o.jsx)(n.code,{children:"Payment"}),"\u7269\u4ef6\uff0c\u628a\u503c\u8a2d\u5b9a\u597d\u5f8c\uff0c\u518d\u5584\u7528\u5177\u5099ORM\u6620\u5c04\u7684Payment\u7269\u4ef6\u7684",(0,o.jsx)(n.code,{children:".save()"}),"\u65b9\u6cd5\uff0c\u5c07\u503c\u5beb\u5230\u8cc7\u6599\u5eab\u4e2d\u3002"]}),"\n",(0,o.jsx)(n.p,{children:"\u5728order/models.py\u4e2d\uff0c\u64f4\u589ecreate_new_order()\uff1a"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'from datetime import datetime\nfrom django.db import models\nfrom .sinopacapi import SinopacAPI\n\ndef create_new_order(will_paid, amount):\n    resp_json = SinopacAPI.create_new_order(will_paid, amount)\n    new_payment = Payment()\n    new_payment.order_no = resp_json["OrderNo"]\n    new_payment.ts_no = resp_json["TSNo"]\n    new_payment.amount = resp_json["Amount"]\n    new_payment.pay_status = resp_json["Status"]\n    new_payment.atm_pay_no = resp_json["ATMParam"]["AtmPayNo"]\n    new_payment.web_atm_url = resp_json["ATMParam"]["WebAtmURL"]\n    new_payment.otp_url = resp_json["ATMParam"]["OtpURL"]\n    new_payment.create_time = datetime.now()\n    new_payment.save()\n\n    return resp_json\n'})}),"\n",(0,o.jsx)(n.p,{children:"\u800c\u5728View\u4e2d\uff0c\u6211\u5148\u4ee5\u6700\u7c21\u55ae\u7684\u65b9\u5f0f\u547c\u53eb\u5f8c\uff0c\u5728\u9801\u9762\u4e0a\u6703\u986f\u793a\u51fa\u9019\u6b21\u7684OrderNo\u3002\n\u5728order/views.py\u7684\u7a0b\u5f0f\u78bc"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'from django.http import HttpResponse\nfrom .models import create_new_order\n\n\ndef create_order(request):\n    will_paid = True\n    amount = 799\n    resp_json = create_new_order(will_paid, amount)\n    print("### resp_json: {}".format(resp_json))\n    return HttpResponse("New Order Created: {}".format(resp_json["OrderNo"]))\n'})}),"\n",(0,o.jsx)(n.p,{children:"\u7576\u7136\u4e5f\u9700\u8981\u5c07urls.py\u8a2d\u5b9a\u4e00\u4e0b\uff0c\u4ee5\u4e0b\u70baorder/urls.py"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:"from django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path('createorder', views.create_order, name='createorder'),\n]\n"})}),"\n",(0,o.jsxs)(n.p,{children:["\u56e0\u6b64\u6211\u5011\u5c31\u53ef\u4ee5\u5148\u5728\u672c\u6a5f\u7aef\u6e2c\u8a66\u4e00\u4e0b\uff1a\n",(0,o.jsx)(n.a,{href:"http://127.0.0.1:8000/order/createorder",children:"http://127.0.0.1:8000/order/createorder"})]}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{src:"https://ithelp.ithome.com.tw/upload/images/20210930/20130354iecz0zZSAe.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210930/20130354iecz0zZSAe.png"})}),"\n",(0,o.jsx)(n.p,{children:"\u63a5\u8457\u6211\u5011\u518d\u5230pgAdmin\u4e2d\u67e5\u770border_payment\u7684\u8cc7\u6599\uff1a"}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{src:"https://ithelp.ithome.com.tw/upload/images/20210930/20130354BzwKhJ5Hm5.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210930/20130354BzwKhJ5Hm5.png"})}),"\n",(0,o.jsx)(n.p,{children:"\u592a\u611f\u52d5\u4e86\uff0c\u6211\u5011\u6210\u529f\u904b\u7528ORM\u7684\u65b9\u6cd5\uff0c\u7522\u751f\u4e00\u7b46\u8a02\u55ae\u4e86\u3002"}),"\n",(0,o.jsx)(n.p,{children:"\u8eab\u9ad4\u4e0d\u8212\u670d\uff0c\u4eca\u5929\u53ea\u80fd\u52c9\u5f37\u5148\u505a\u5230\u9019\u6a23\uff0c\u660e\u5929\u518d\u4f86\u7522\u751f\u771f\u7684BackendURL\u7d66\u6c38\u8c50\u4f5c\u547c\u53eb\uff0c\u4e26\u884c\u4f86\u770b\u770b\u6211\u5011\u662f\u5426\u80fd\u6210\u529f\u53d6\u5f97PayToken\u3002"})]})}function p(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>a,x:()=>d});var s=r(6540);const o={},t=s.createContext(o);function a(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);