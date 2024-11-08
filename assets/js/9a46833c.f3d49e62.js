"use strict";(self.webpackChunkmy_site=self.webpackChunkmy_site||[]).push([[590],{9347:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"finance-bank-api/Day20 - \u4ee5Django Web\u6846\u67b6\u5be6\u4f5c\u6c38\u8c50API\u7dda\u4e0a\u652f\u4ed8\u6a21\u64ec\u60c5\u58831","title":"Day20 - \u4ee5Django Web\u6846\u67b6\u5be6\u4f5c\u6c38\u8c50API\u7dda\u4e0a\u652f\u4ed8\u6a21\u64ec\u60c5\u58831","description":"\u6211\u5011\u7684\u8c50\u6536\u6b3e\u4e3b\u984c\u5b8c\u7d50\u4e86\u55ce\uff1f","source":"@site/docs/finance-bank-api/Day20 - \u4ee5Django Web\u6846\u67b6\u5be6\u4f5c\u6c38\u8c50API\u7dda\u4e0a\u652f\u4ed8\u6a21\u64ec\u60c5\u58831.md","sourceDirName":"finance-bank-api","slug":"/finance-bank-api/Day20 - \u4ee5Django Web\u6846\u67b6\u5be6\u4f5c\u6c38\u8c50API\u7dda\u4e0a\u652f\u4ed8\u6a21\u64ec\u60c5\u58831","permalink":"/docs/finance-bank-api/Day20 - \u4ee5Django Web\u6846\u67b6\u5be6\u4f5c\u6c38\u8c50API\u7dda\u4e0a\u652f\u4ed8\u6a21\u64ec\u60c5\u58831","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":21,"frontMatter":{"sidebar_position":21},"sidebar":"tutorialSidebar","previous":{"title":"Day19 - \u9632\u6b62\u6389\u55ae\u5c0f\u5e6b\u624b\uff0c\u4ee5\u6642\u9593\u689d\u4ef6\u67e5\u8a62\u4ea4\u6613\u8a02\u55ae","permalink":"/docs/finance-bank-api/Day19 - \u9632\u6b62\u6389\u55ae\u5c0f\u5e6b\u624b\uff0c\u4ee5\u6642\u9593\u689d\u4ef6\u67e5\u8a62\u4ea4\u6613\u8a02\u55ae"},"next":{"title":"Day21 - \u4ee5Django Web\u6846\u67b6\u5be6\u4f5c\u6c38\u8c50API\u7dda\u4e0a\u652f\u4ed8\u6a21\u64ec\u60c5\u58832 - \u8cfc\u7269\u8eca\u8207\u4ed8\u6b3e\u65b9\u5f0f\u78ba\u8a8d\u9801","permalink":"/docs/finance-bank-api/Day21 - \u4ee5Django Web\u6846\u67b6\u5be6\u4f5c\u6c38\u8c50API\u7dda\u4e0a\u652f\u4ed8\u6a21\u64ec\u60c5\u58832 - \u8cfc\u7269\u8eca\u8207\u4ed8\u6b3e\u65b9\u5f0f\u78ba\u8a8d\u9801"}}');var i=t(4848),o=t(8453);const r={sidebar_position:21},a=void 0,c={},l=[{value:"\u4e0d\u5982\uff0c\u7e7c\u7e8c\u8c50\u6536\u5427\uff01",id:"\u4e0d\u5982\u7e7c\u7e8c\u8c50\u6536\u5427",level:3},{value:"Django\u5c08\u7528Bootstrap\u5957\u4ef6\u6e96\u5099",id:"django\u5c08\u7528bootstrap\u5957\u4ef6\u6e96\u5099",level:3},{value:"\u5728greetings\u518d\u52a0\u500b\u6e2c\u8a66\u8a66\u8a66",id:"\u5728greetings\u518d\u52a0\u500b\u6e2c\u8a66\u8a66\u8a66",level:3},{value:"\u5148\u7522\u751f\u4e00\u500bTemplate\u9801\u5427",id:"\u5148\u7522\u751f\u4e00\u500btemplate\u9801\u5427",level:4},{value:"\u7a0b\u5f0f\u8aaa\u660e",id:"\u7a0b\u5f0f\u8aaa\u660e",level:5},{value:"\u5728View\u4e2d\u6e96\u5099\u7d66Template\u7684\u8cc7\u6599",id:"\u5728view\u4e2d\u6e96\u5099\u7d66template\u7684\u8cc7\u6599",level:4},{value:"\u7a0b\u5f0f\u8aaa\u660e",id:"\u7a0b\u5f0f\u8aaa\u660e-1",level:5}];function d(n){const e={a:"a",blockquote:"blockquote",code:"code",h3:"h3",h4:"h4",h5:"h5",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.p,{children:"\u6211\u5011\u7684\u8c50\u6536\u6b3e\u4e3b\u984c\u5b8c\u7d50\u4e86\u55ce\uff1f"}),"\n",(0,i.jsx)(e.p,{children:"\u4eca\u5929\u5373\u4f7f\u9054\u6210\u9435\u4eba\u8cfd\u76842/3\u8cfd\u7a0b\uff0c\u5728\u5148\u524d\u7684\u7bc7\u5e45\u5df2\u5b8c\u6574\u5c07\u6bcf\u4e00\u500b\u529f\u80fd\u90fd\u5be6\u4f5c\u51fa\u4f86\u4e86\uff0c\u539f\u672c\u5728\u601d\u8003\u5269\u4e0b\u76841/3\u662f\u5426\u8981\u7d50\u675f\u8c50\u6536\u6b3e\u7684\u4e3b\u984c\uff0c\u6293\u7dca\u6642\u9593\u555f\u52d5\u53e6\u4e00\u500bShioaji\u7684\u8b49\u5238\u4e3b\u984c\u3002\u4e0d\u904e\u60f3\u8aaa\u65e2\u7136\u982d\u90fd\u6d17\u4e86\uff0c\u4e0d\u5982\u5c31\u8d81\u9019\u500b\u6a5f\u6703\uff0c\u518d\u5f37\u5316\u4e00\u4e9b\u4f7f\u7528Django\u4f86\u5be6\u4f5c\u96fb\u5546UI\u7aef\u7684\u60c5\u5883\u7bc4\u4f8b\uff0c\u6240\u4ee5\u63a5\u4e0b\u4f86\u5c31\u662f\u518d\u628a\u5e7e\u500b\u4f7f\u7528\u60c5\u5883\u5beb\u4e00\u5beb\uff0c\u8b93\u6574\u500b\u4e32\u63a5\u7684\u904b\u4f5c\u66f4\u6709\u611f\u3002Shioaji\u5c31\u518d\u5f80\u5f8c\u64fa\uff0c\u770b\u5f8c\u9762\u6709\u5269\u4e0b\u7684\u6642\u9593\u7684\u8a71\u518d\u4f86\u6dfa\u8ac7\u5e7e\u7bc7\u4e86\uff0c\u96d6\u7136\u5176\u5be6\u6211\u883b\u60f3\u8a66\u8a66\u7a0b\u5f0f\u4ea4\u6613\u9019\u500b\u8b70\u984c\u3002(\u597d\u60f3\u6709\u5e73\u884c\u6642\u7a7a\u53e6\u4e00\u500b\u6211\u518d\u5bebShioaji\u7684\u4e3b\u984c\u5440)"}),"\n",(0,i.jsx)(e.h3,{id:"\u4e0d\u5982\u7e7c\u7e8c\u8c50\u6536\u5427",children:"\u4e0d\u5982\uff0c\u7e7c\u7e8c\u8c50\u6536\u5427\uff01"}),"\n",(0,i.jsxs)(e.p,{children:["\u6240\u4ee5\u63a5\u4e0b\u4f86\u662f\u6703\u4ee5Django Web\u7684\u5e7e\u500b\u9801\u9762\u5be6\u4f5c\u60c5\u5883\uff0c\u5e36\u5230\u4e32\u63a5\u6211\u5011\u4e4b\u524d\u5be6\u4f5c\u5b8c\u6210\u7684\u6c38\u8c50API Python\u7a0b\u5f0f\u78bc\uff0c\u4e5f\u8b93\u6709\u8208\u8da3\u60f3\u591a\u4e86\u89e3Django\u7684\u5be6\u4f5c\u7684\u670b\u53cb\u6709\u6a5f\u6703\u5c07\u300c",(0,i.jsx)(e.strong,{children:"\u8c50\u6536\u6b3eAPI + Python + Web\u6280\u8853"}),"\u300d\u4e09\u500b\u9858\u671b\uff0c\u4e00\u6b21\u6eff\u8db3\u3002"]}),"\n",(0,i.jsx)(e.h3,{id:"django\u5c08\u7528bootstrap\u5957\u4ef6\u6e96\u5099",children:"Django\u5c08\u7528Bootstrap\u5957\u4ef6\u6e96\u5099"}),"\n",(0,i.jsxs)(e.p,{children:["\u9996\u5148\uff0c\u70ba\u4e86\u8b93UI\u53ef\u4ee5\u7c21\u55ae\u5feb\u901f\u5957\u7528\u81ea\u9069\u61c9\u6548\u679c\u4ee5\u53ca\u6709\u7f8e\u7f8e\u597d\u7528\u7684UI\u5143\u4ef6\uff0c\u6211\u6703\u4f7f\u7528Bootstrap\u4f5c\u70baUI Framework\u3002\u7576\u7136\u82e5\u4f60\u5011\u6709\u66f4\u9806\u624b\u7684UI\u5143\u4ef6\u4e5f\u53ef\u4ee5\u96a8\u610f\u9078\u7528\u3002\u5728Django\u4e2d\uff0c\u6709\u5c08\u9580\u7684Bootstrap\u5957\u4ef6\u53ef\u76f4\u63a5\u5b89\u88dd\uff0c\u800c\u4e0d\u9700\u8981\u76f4\u63a5\u8907\u88fdBootstrap\u7684Javascript\u8207CSS\u7b49\u6a94\u6848\u9032\u4f86\u3002\u6709",(0,i.jsx)(e.code,{children:"django-bootstrap"}),"\u5957\u4ef6\u7684\u597d\u8655\u662f\u5728Django Template\u4e2d\u4f7f\u7528JS\u6216CSS\u7684\u5f15\u7528\u6642\uff0c\u662f\u6703\u66f4\u8cbc\u8fd1Python\u5957\u4ef6\u7684\u7528\u6cd5\uff0c\u800c\u975e\u64cd\u4f5c\u786c\u751f\u751f\u7684\u6a94\u6848\u5f15\u7528\u7684\u4f5c\u6cd5\u3002"]}),"\n",(0,i.jsx)(e.p,{children:"\u9996\u5148\uff0c\u5148\u4f7f\u7528pip\u9032\u884cdjango-bootstrap\u5957\u4ef6\u5b89\u88dd\u3002"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"> pip install django-bootstrap-v5\n"})}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.img,{src:"https://ithelp.ithome.com.tw/upload/images/20211005/2013035480vGPVRMiD.png",alt:"https://ithelp.ithome.com.tw/upload/images/20211005/2013035480vGPVRMiD.png"})}),"\n",(0,i.jsxs)(e.p,{children:["\u6211\u5011\u56e0\u70ba\u6700\u5f8c\u8981\u5c07\u7a0b\u5f0f\u4e0a\u5230\u5be6\u969b\u7684Heroku PaaS\u74b0\u5883\u4e2d\uff0c\u8a18\u5f97\u8981\u518d\u91cd\u65b0\u7522\u751f\u4e00\u6b21",(0,i.jsx)(e.code,{children:"requirement.txt"}),"\u3002\u9019\u500b\u662f\u70ba\u4e86\u5728\u505a\u4f48\u7f72\u6642\uff0c\u8b93Heroku Server\u77e5\u9053\u9700\u8981\u9023\u5e36\u5b89\u88dd\u7684\u5957\u4ef6\u3002"]}),"\n",(0,i.jsxs)(e.blockquote,{children:["\n",(0,i.jsx)(e.p,{children:"\u8a18\u5f97\u5148\u9000\u5230Python Project\u7684root folder\u53bb\u3002"}),"\n"]}),"\n",(0,i.jsxs)(e.p,{children:["\u9084\u8a18\u5f97\u8a9e\u6cd5\u55ce\uff1f \u4f7f\u7528pip freeze\u5c07\u7d50\u679c\u5c0e\u51fa\u6210\u6a94\u6848\uff0c\u6307\u5b9a\u5230\u6839\u76ee\u9304\u4e0b\u7684",(0,i.jsx)(e.code,{children:"requirements.txt"})," (\u8a18\u5f97\u7d50\u5c3e\u6709s)"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"> pip freeze > requirements.txt\n"})}),"\n",(0,i.jsxs)(e.p,{children:["\u4ee5\u6211\u7684\u4f8b\u5b50\uff0c\u5728",(0,i.jsx)(e.code,{children:"requirements.txt"}),"\u4e2d\uff0c\u591a\u51fa\u4e86\u525b\u525b\u5b89\u88dd\u7684",(0,i.jsx)(e.code,{children:"django-bootstrap-v5==1.0.5"})]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"asgiref==3.4.1\nbeautifulsoup4==4.10.0\ncertifi==2021.5.30\ncharset-normalizer==2.0.6\ncrypto==1.4.1\ndecorator==5.1.0\ndj-database-url==0.5.0\ndj-static==0.0.6\nDjango==3.2.7\ndjango-bootstrap-v5==1.0.5\ngunicorn==20.1.0\nidna==3.2\nimportlib-metadata==3.10.1\nNaked==0.1.31\npsycopg2==2.9.1\npycryptodome==3.10.4\npytz==2021.1\nPyYAML==5.4.1\nrequests==2.26.0\nshellescape==3.8.1\nsoupsieve==2.2.1\nsqlparse==0.4.2\nstatic3==0.7.0\nurllib3==1.26.7\nzipp==3.6.0\n"})}),"\n",(0,i.jsxs)(e.p,{children:["\u8a18\u5f97\uff0c\u5728mysite\u5e95\u4e0b\u7684settings.py\u4e2d\uff0c\u8981\u5728",(0,i.jsx)(e.code,{children:"INSTALLED_APPS"}),"\u4e2d\u52a0\u4e0a",(0,i.jsx)(e.code,{children:"bootstrap5"}),"\uff0c\u624d\u6703\u751f\u6548\u5594\uff01\n\u4f8b\u5982\uff1a"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"INSTALLED_APPS = [\n    'django.contrib.admin',\n    'django.contrib.auth',\n    'django.contrib.contenttypes',\n    'django.contrib.sessions',\n    'django.contrib.messages',\n    'django.contrib.staticfiles',\n    'bootstrap5',\n    'order',\n    'greetings',\n]\n"})}),"\n",(0,i.jsx)(e.h3,{id:"\u5728greetings\u518d\u52a0\u500b\u6e2c\u8a66\u8a66\u8a66",children:"\u5728greetings\u518d\u52a0\u500b\u6e2c\u8a66\u8a66\u8a66"}),"\n",(0,i.jsx)(e.p,{children:"\u9084\u8a18\u5f97\u6211\u5011\u525b\u4f7f\u7528Django\u6642\uff0c\u5beb\u4e86\u4e00\u500bgreetings\u7684\u919c\u919c\u6e2c\u8a66\u9801\u9762(index)\uff0c\u73fe\u5728\u6211\u5011\u5728\u4e0b\u9762\u518d\u52a0\u4e0a\u4e00\u500btest\u9801\u9762\uff0c\u4f86\u6e2c\u8a66\u4e00\u4e0b\u525b\u525b\u7684Bootstrap\u5957\u4ef6\u3002"}),"\n",(0,i.jsxs)(e.p,{children:["\u4e0d\u77e5\u9053\u8981\u600e\u9ebc\u4f7f\u7528Bootstrap\u7684\u8a71\uff0c\u53ef\u4ee5\u4f7f\u7528\u9019\u500b\u9801\u9762\u6a21\u677f\u7522\u751f\u5668\u7db2\u7ad9\uff1a\n",(0,i.jsx)(e.a,{href:"https://generator.ws/demo/",children:"https://generator.ws/demo/"})]}),"\n",(0,i.jsx)(e.p,{children:"\u9078\u4e00\u500b\u4f60\u559c\u6b61\u7684\u6a21\u7248\u5f8c\u5373\u53ef\u7c21\u55ae\u4e0b\u8f09\uff0c\u6211\u5011\u5c31\u628a\u9019\u500b\u5167\u5bb9\u62ff\u4f86\u505a\u6210\u6211\u5011\u8981\u6e2c\u8a66\u7684Django Template\u9801\u3002"}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.img,{src:"https://ithelp.ithome.com.tw/upload/images/20211005/20130354nmrQ7Tk5dO.png",alt:"https://ithelp.ithome.com.tw/upload/images/20211005/20130354nmrQ7Tk5dO.png"})}),"\n",(0,i.jsx)(e.h4,{id:"\u5148\u7522\u751f\u4e00\u500btemplate\u9801\u5427",children:"\u5148\u7522\u751f\u4e00\u500bTemplate\u9801\u5427"}),"\n",(0,i.jsx)(e.p,{children:"\u6211\u5011\u8981\u4f7f\u7528Django\u7684Template\uff0c\u624d\u80fd\u5f37\u5316View\u7684\u5448\u73fe\uff0c\u7e3d\u4e0d\u80fd\u6bcf\u6b21\u90fd\u53ea\u80fd\u786c\u523bHTML\u8a9e\u6cd5\u7136\u5f8c\u7528HttpResponse\u50b3\u56de\u53bb\u5427\u3002"}),"\n",(0,i.jsxs)(e.p,{children:["\u5728\u6211\u5011\u7684Django App\u4e0b\uff0c\u4f8b\u5982\u9019\u6b21\u662f\u5728",(0,i.jsx)(e.code,{children:"greetings"}),"\u4e0b\u5efa\u7acb\u4e00\u500b",(0,i.jsx)(e.code,{children:"templates"}),"\u76ee\u9304\uff0c\u63a5\u8457\uff0c\u5728\u5e95\u4e0b\u518d\u5efa\u4e00\u500b",(0,i.jsx)(e.code,{children:"greetings"}),"\u76ee\u9304\uff0c\u7136\u5f8c\u624d\u628a\u4f60\u8981\u7684Template HTML\u653e\u5728\u5e95\u4e0b\u3002"]}),"\n",(0,i.jsx)(e.p,{children:"\u6709\u4e9b\u4eba\u6703\u628a\u9801\u9762\u76f4\u63a5\u64fa\u5728templates\u7684\u76ee\u9304\u5e95\u4e0b\uff0c\u800c\u6c92\u6709\u591a\u5efa\u4e00\u500b\u8207App\u540d\u7a31\u76f8\u540c\u7684\u76ee\u9304\uff0c\u9019\u6a23\u57fa\u672c\u4e0a\u82e5\u4f60App\u4e4b\u9593\u6c92\u6709\u4f7f\u7528\u76f8\u540c\u540d\u7a31\u7684\u8a71\u96d6\u4e0d\u6703\u932f\uff0c\u4f46\u4e0d\u5efa\u8b70\u9019\u6a23\u4f7f\u7528\u3002\u82e5\u4e0d\u540c\u7684Django App\u4f7f\u7528\u4e86\u76f8\u540c\u7684View\u9801\u9762\u540d\u7a31\uff0c\u6703\u6709\u6293\u53d6\u9806\u5e8f\u932f\u8aa4\u7684\u53ef\u80fd\u3002"}),"\n",(0,i.jsxs)(e.p,{children:["\u56e0\u6b64\u6211\u5011\u5efa\u7acb\u4e00\u500b",(0,i.jsx)(e.code,{children:"test.html"}),"\uff0c\u653e\u7f6e\u4f4d\u7f6e\u5728\uff1amysite/greetings/templates/greetings/test.html"]}),"\n",(0,i.jsx)(e.p,{children:"\u5167\u5bb9\u5982\u4e0b\uff1a"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-html",children:'{% load bootstrap5 %}\n<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="UTF-8">\n    <title>Welcome to KummyShop</title>\n    <meta charset="utf-8">\n    <meta name="viewport"\n      content="width=device-width, initial-scale=1, shrink-to-fit=no">\n    <meta name="description" content="">\n    <meta name="author" content="">\n    {% bootstrap_css %}\n    <link rel="icon" href="favicon.ico">\n  </head>\n  <body>\n    <section class="bg-light pt-5 pb-5">\n      <div class="container pb-5">\n        <div class="row justify-content-center d-flex">\n          <div class="col-xs-12 col-md-10 align-self-center">\n            <h1 class="display-4 text-center  mb-3 mt-5">{{ title }}</h1>\n            <p class="lead  text-center">{{ desc }}</p>\n            <div class="justify-content-center d-flex mt-3 mb-1">\n              <a class="btn btn-primary  btn-lg   mt-md-3 me-2" href="#"\n                role="button">{{ buttons.0 }}</a>\n              <a class="btn btn-outline-secondary  btn-lg   mt-md-3 ml-md-3"\n                href="#" role="button">{{ buttons.1 }}</a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </section>\n  {% bootstrap_javascript %}\n  </body>\n</html>\n'})}),"\n",(0,i.jsx)(e.h5,{id:"\u7a0b\u5f0f\u8aaa\u660e",children:"\u7a0b\u5f0f\u8aaa\u660e"}),"\n",(0,i.jsx)(e.p,{children:"\u4e0a\u9762\u843d\u843d\u9577\uff0c\u91cd\u9ede\u5e7e\u500b\uff1a"}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsxs)(e.li,{children:["\u6211\u5011\u5728\u6a94\u6848\u982d\u7684\u5730\u65b9\u52a0\u5165",(0,i.jsx)(e.code,{children:"{% load bootstrap5 %}"}),"\uff0c\u5728meta\u52a0\u5165",(0,i.jsx)(e.code,{children:"{% bootstrap_css %}"}),"\uff0c\u5728body\u7d50\u675f\u524d\u52a0\u5165",(0,i.jsx)(e.code,{children:"{% bootstrap_javascript %}"})]}),"\n",(0,i.jsxs)(e.li,{children:["\u4e2d\u9593h1\u5927\u6a19\u52a0\u4e0a",(0,i.jsx)(e.code,{children:"{{ title }}"}),"\uff0c\u5e95\u4e0bp\u6bb5\u843d\u52a0\u4e0a",(0,i.jsx)(e.code,{children:"{{ desc }}"}),"\uff0c\u5169\u500bbutton\u52a0\u4e0a",(0,i.jsx)(e.code,{children:"{{ buttons.0 }}"}),"\u8207",(0,i.jsx)(e.code,{children:"{{ buttons.1 }}"})]}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:"\u524d\u9762\u662f\u70ba\u4e86\u7522\u751fbootstrap5\u6240\u9700\u8981\u7684javascript\u8207css\u6a94\uff0c\u5f8c\u9762\u5247\u662f\u6211\u5011\u5f9eView\u5c46\u6642\u6703\u6e96\u5099\u50b3\u5165\u76f8\u95dc\u7684\u8b8a\u6578\uff0c\u8981\u62ff\u4f86\u986f\u793a\u7528\u3002"}),"\n",(0,i.jsx)(e.h4,{id:"\u5728view\u4e2d\u6e96\u5099\u7d66template\u7684\u8cc7\u6599",children:"\u5728View\u4e2d\u6e96\u5099\u7d66Template\u7684\u8cc7\u6599"}),"\n",(0,i.jsx)(e.p,{children:"\u65bc\u662f\u6211\u5011\u53ef\u4ee5\u5728View\u4e2d\u64b0\u5bebtest\u9801\u6240\u9700\u8981\u7684\u8cc7\u6599\uff0c\u4e0d\u904e\u901a\u5e38\u9806\u5e8f\u4e00\u822c\u898f\u756b\u662f\u53cd\u904e\u4f86\u7684\uff0c\u7167\u7406\u8aaa\u6703\u5148\u5be6\u4f5cView\u4e2d\u8981\u6e96\u5099\u4ec0\u9ebc\u8cc7\u6599\uff0c\u7136\u5f8c\u624d\u5728Template\u88e1\u53bb\u6316\u6d1e\u586b\u5165\u3002\u4f46\u56e0\u70ba\u525b\u525b\u5148\u884c\u4ecb\u7d39\u4e86Template\u5f8c\uff0c\u4e0d\u60f3\u8df3\u4f86\u8df3\u53bb\u7684\uff0c\u4f46\u6211\u76f8\u4fe1\u8070\u660e\u7684\u8b80\u8005\u4e00\u5b9a\u53ef\u4ee5\u7406\u89e3\u3002(\u597d\u4e0d\u8ca0\u8cac\u4efb\u5440\u2026)"}),"\n",(0,i.jsxs)(e.p,{children:["\u6211\u5011\u5728greetings\u7684",(0,i.jsx)(e.code,{children:"view.py"}),"\u4e2d\uff0c\u65b0\u589e\u9019\u6bb5\uff1a"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-python",children:'from django.shortcuts import render\n\ndef test(request):\n    context = {\n        "title": "\u5eab\u7c73\u72d7\u5c4b \u25cf Kummy Shop",\n        "desc": "\u9019\u88e1\u61c9\u6709\u76e1\u6709\uff0c\u53ea\u662f\u90fd\u7f3a\u8ca8\u4e2d\uff0c\u6b61\u8fce\u4f7f\u7528\u6c38\u8c50\u9280\u884c\u4fe1\u7528\u5361\u5537\uff01",\n        "buttons": ["\u52a0\u5165\u6703\u54e1", "\u6211\u5148\u901b\u901b"]\n               }\n    return render(request, \'greetings/test.html\', context)\n'})}),"\n",(0,i.jsx)(e.h5,{id:"\u7a0b\u5f0f\u8aaa\u660e-1",children:"\u7a0b\u5f0f\u8aaa\u660e"}),"\n",(0,i.jsxs)(e.p,{children:["\u9019\u88e1\u6211\u5011\u4f7f\u7528\u548c\u5148\u524d\u76f4\u63a5\u56de\u50b3",(0,i.jsx)(e.code,{children:"HttpResponse"}),"\u578b\u5225\u56de\u53bb\u7a0d\u6709\u4e0d\u540c\uff0c\u6211\u5011\u4f7f\u7528\u4e86",(0,i.jsx)(e.code,{children:"render"}),"\u7684\u65b9\u5f0f\u56de\u50b3\uff0c\u628a\u7d81\u5b9aTemplate\u6a5f\u5236\u7684\u6240\u9700\u8cc7\u6599\u4ee5\u7c21\u5316\u7684\u65b9\u5f0f\u4e1f\u56de\u53bb\u5373\u53ef\uff0c\u4f60\u53ea\u9700\u8981\u6e96\u5099\u597dcontext\u6240\u9700\u8981\u7684\u8cc7\u6599\uff0c\u628arequest\u3001template\u4f4d\u7f6e\u3001context\u653e\u9032\u53c3\u6578\u4e2d\u3002"]}),"\n",(0,i.jsx)(e.p,{children:"\u5982\u679c\u662f\u4f7f\u7528HttpResponse\u7684\u65b9\u5f0f\uff0c\u4f60\u9084\u9700\u8981\u5148\u5c07Template\u5148\u7528loader\u8f09\u5165\uff0c\u518d\u7528loader\u53bbrender()\u51fa\u4f86\uff0c\u4e0a\u9762\u9019\u500b\u4f5c\u6cd5\u662f\u8f03\u70ba\u7cbe\u7c21\u5feb\u901f\u7684\u4f5c\u6cd5\uff0c\u96d6\u7136\u5982\u679c\u6709\u7528\u5230\u9032\u968e\u4e00\u9ede\u7684\u4f7f\u7528\u65b9\u5f0f\u6703\u6709\u4e9b\u8a31\u529f\u80fd\u4f5c\u4e0d\u5230\u3002\u5b8c\u6574\u4f5c\u6cd5\u53ef\u81f3Django\u5b98\u7db2\u90fd\u770b\u7684\u5230\uff0c\u9019\u908a\u4e3b\u984c\u4e0d\u662f\u4ee5Django\u7d30\u90e8\u8b1b\u89e3\u70ba\u4e3b\uff0c\u56e0\u6b64\u9ede\u5230\u70ba\u6b62\u56c9\u3002"}),"\n",(0,i.jsx)(e.p,{children:"\u8feb\u4e0d\u53ca\u5f85\u4e86\u5427\uff0c\u4e4b\u524d\u7684\u9801\u9762\u56e0\u70ba\u76ee\u7684\u4e0d\u540c\uff0c\u70ba\u4e86\u5be6\u4f5c\u4e32\u63a5\u6c38\u8c50API\u7684\u9a57\u8b49\u6b63\u78ba\u6027\u70ba\u76ee\u7684\uff0c\u90fd\u919c\u919c\u7684\uff0c\u5373\u5c07\u7165\u7136\u4e00\u65b0\u4e86\uff01"}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.img,{src:"https://ithelp.ithome.com.tw/upload/images/20211005/20130354lr6QZl1XVt.png",alt:"https://ithelp.ithome.com.tw/upload/images/20211005/20130354lr6QZl1XVt.png"})}),"\n",(0,i.jsx)(e.p,{children:"\u6211\u5011\u53ef\u4ee5\u6309\u53f3\u9375\u770b\u4e00\u4e0bHTML\u539f\u59cb\u78bc\uff1a"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-html",children:'<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="UTF-8">\n    <title>Welcome to KummyShop</title>\n    <meta charset="utf-8">\n    <meta name="viewport"\n      content="width=device-width, initial-scale=1, shrink-to-fit=no">\n    <meta name="description" content="">\n    <meta name="author" content="">\n    <link crossorigin="anonymous" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" rel="stylesheet">\n    <link rel="icon" href="favicon.ico">\n  </head>\n  <body>\n    <section class="bg-light pt-5 pb-5">\n      <div class="container pb-5">\n        <div class="row justify-content-center d-flex">\n          <div class="col-xs-12 col-md-10 align-self-center">\n            <h1 class="display-4 text-center  mb-3 mt-5">\u5eab\u7c73\u72d7\u5c4b \u25cf Kummy Shop</h1>\n            <p class="lead  text-center">\u9019\u88e1\u61c9\u6709\u76e1\u6709\uff0c\u53ea\u662f\u90fd\u7f3a\u8ca8\u4e2d\uff0c\u6b61\u8fce\u4f7f\u7528\u6c38\u8c50\u9280\u884c\u4fe1\u7528\u5361\u5537\uff01</p>\n            <div class="justify-content-center d-flex mt-3 mb-1">\n              <a class="btn btn-primary  btn-lg   mt-md-3 me-2" href="#"\n                role="button">\u52a0\u5165\u6703\u54e1</a>\n              <a class="btn btn-outline-secondary  btn-lg   mt-md-3 ml-md-3"\n                href="#" role="button">\u6211\u5148\u901b\u901b</a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </section>\n  <script crossorigin="anonymous" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"><\/script>\n  </body>\n\n</html>\n'})}),"\n",(0,i.jsx)(e.p,{children:"\u5176\u4e2d\uff0c\u53ef\u4ee5\u6bd4\u5c0d\u4e00\u4e0b\u539f\u5148\u63d2\u5165bootstrap\u76f8\u95dc\u7684\u4f4d\u7f6e"}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"meta\u5340\uff0c\u7522\u751f\u51fa\u76f8\u95dc\u7684bootstrap CSS\u5f15\u7528"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-html",children:'<link crossorigin="anonymous" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" rel="stylesheet">\n'})}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"body\u4e4b\u524d\uff0c\u7522\u751f\u51fa\u76f8\u95dc\u7684bootstrap Javascript\u5f15\u7528"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-html",children:'<script crossorigin="anonymous" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"><\/script>\n'})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:"\u63a5\u4e0b\u4f86\u5be6\u4f5c\u60c5\u5883\u9801\u9762\uff0c\u7576\u7136\u4e0d\u6703\u53bb\u5be6\u4f5c\u5546\u54c1\u9801\u8207\u8cfc\u7269\u8eca\u7684\u90e8\u4efd(\u5beb\u5b8c\u53c830\u5929\u4e86)\uff0c\u6240\u4ee5\u6211\u5011\u6703\u76f4\u63a5\u5f9e\u300c\u7d50\u5e33\u9801\u9762\u300d\u958b\u59cb\u5beb\u8d77\uff0c\u628a\u6709\u4e32\u5230\u6c38\u8c50API\u7684\u60c5\u5883\u9801\u5be6\u4f5c\u51fa\u4f86\u3002"}),"\n",(0,i.jsx)(e.p,{children:"\u660e\u5929\u7e7c\u7e8c\uff01"})]})}function p(n={}){const{wrapper:e}={...(0,o.R)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(d,{...n})}):d(n)}},8453:(n,e,t)=>{t.d(e,{R:()=>r,x:()=>a});var s=t(6540);const i={},o=s.createContext(i);function r(n){const e=s.useContext(o);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:r(n.components),s.createElement(o.Provider,{value:e},n.children)}}}]);