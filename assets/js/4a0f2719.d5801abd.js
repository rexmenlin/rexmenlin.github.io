"use strict";(self.webpackChunkcodetenshu=self.webpackChunkcodetenshu||[]).push([[9903],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>g});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},k=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),c=u(n),k=a,g=c["".concat(l,".").concat(k)]||c[k]||m[k]||o;return n?r.createElement(g,p(p({ref:t},s),{},{components:n})):r.createElement(g,p({ref:t},s))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,p=new Array(o);p[0]=k;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[c]="string"==typeof e?e:a,p[1]=i;for(var u=2;u<o;u++)p[u]=n[u];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}k.displayName="MDXCreateElement"},4511:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>p,default:()=>c,frontMatter:()=>o,metadata:()=>i,toc:()=>u});var r=n(7462),a=(n(7294),n(3905));const o={sidebar_position:14},p=void 0,i={unversionedId:"finance-bank-api/Day13 - \u5c07Django\u7a0b\u5f0f\uff0c\u653e\u4e0aHeroku\uff01",id:"finance-bank-api/Day13 - \u5c07Django\u7a0b\u5f0f\uff0c\u653e\u4e0aHeroku\uff01",title:"Day13 - \u5c07Django\u7a0b\u5f0f\uff0c\u653e\u4e0aHeroku\uff01",description:"\u6628\u5929\u64b0\u5beb\u4e86\u4e00\u7248\u6700\u57fa\u790e\u7684Django\u7db2\u7ad9\u6e2c\u8a66\u5f8c\uff0c\u63a5\u8457\u6211\u5011\u8981\u4f86\u5617\u8a66\u5c07\u7db2\u7ad9\u4f48\u7f72\u5230\u96f2\u7aef\u5e73\u53f0\uff0c\u8b93API\u6709\u6a5f\u6703\u80fd\u5920\u5c07PayToken\u50b3\u5165(\u9019\u662f\u6211\u5011\u7684\u76ee\u7684)\u3002",source:"@site/docs/finance-bank-api/Day13 - \u5c07Django\u7a0b\u5f0f\uff0c\u653e\u4e0aHeroku\uff01.md",sourceDirName:"finance-bank-api",slug:"/finance-bank-api/Day13 - \u5c07Django\u7a0b\u5f0f\uff0c\u653e\u4e0aHeroku\uff01",permalink:"/docs/finance-bank-api/Day13 - \u5c07Django\u7a0b\u5f0f\uff0c\u653e\u4e0aHeroku\uff01",draft:!1,tags:[],version:"current",sidebarPosition:14,frontMatter:{sidebar_position:14},sidebar:"tutorialSidebar",previous:{title:"Day12 - \u70baBackendURL\u4e2d\u6536\u5230PayToken\u92ea\u8def\uff0cDjango\u4f86\u4e86\u3002",permalink:"/docs/finance-bank-api/Day12 - \u70baBackendURL\u4e2d\u6536\u5230PayToken\u92ea\u8def\uff0cDjango\u4f86\u4e86\u3002"},next:{title:"Day14 - \u4f7f\u7528Heroku Postgres\u8cc7\u6599\u5eab\uff0c\u5b58\u5132\u8a02\u55ae\u4ea4\u6613\u8cc7\u8a0a",permalink:"/docs/finance-bank-api/Day14 - \u4f7f\u7528Heroku Postgres\u8cc7\u6599\u5eab\uff0c\u5b58\u5132\u8a02\u55ae\u4ea4\u6613\u8cc7\u8a0a"}},l={},u=[{value:"\u5c31\u662f\u4f60\u4e86\uff0cHeroku\uff01",id:"\u5c31\u662f\u4f60\u4e86heroku",level:3}],s={toc:u};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"\u6628\u5929\u64b0\u5beb\u4e86\u4e00\u7248\u6700\u57fa\u790e\u7684Django\u7db2\u7ad9\u6e2c\u8a66\u5f8c\uff0c\u63a5\u8457\u6211\u5011\u8981\u4f86\u5617\u8a66\u5c07\u7db2\u7ad9\u4f48\u7f72\u5230\u96f2\u7aef\u5e73\u53f0\uff0c\u8b93API\u6709\u6a5f\u6703\u80fd\u5920\u5c07PayToken\u50b3\u5165(\u9019\u662f\u6211\u5011\u7684\u76ee\u7684)\u3002"),(0,a.kt)("p",null,"\u5728\u76ee\u524d\u7684\u96f2\u7aef\u670d\u52d9\u4e2d\uff0c\u6709\u4e00\u7a2e\u662f\u6240\u8b02\u7684",(0,a.kt)("strong",{parentName:"p"},"IaaS (Infrastructure as a Service)"),"\uff0c \u4e5f\u5c31\u662f\u6211\u5011\u9700\u8981\u5728\u96f2\u7aef\u670d\u52d9\u4e2d\u81ea\u884c\u5efa\u7acb\u4e00\u53f0\u865b\u64ec\u4e3b\u6a5f\uff0c\u4e26\u4e14\u5728\u4e0a\u9762\u5b8c\u6574\u7684\u5c07\u74b0\u5883\u5efa\u7acb\u8d77\u4f86\uff0c\u4f8b\u5982Amazon AWS\u3001Google GCP\u3001Microsoft Azure\u7b49\u3002\u9019\u500b\u512a\u9ede\u81ea\u7136\u662f\u6709\u9ad8\u5ea6\u7684\u5f48\u6027\u8207\u81ea\u7531\uff0c\u7576\u7136\u6240\u9700\u8981\u7684\u4f3a\u670d\u5668\u7ba1\u7406\u3001\u74b0\u5883\u5efa\u7f6e\u8207\u4f48\u7f72\u7684\u6280\u80fd\u90fd\u76f8\u5c0d\u4f86\u7684\u9ad8\u3002"),(0,a.kt)("p",null,"\u800c\u53e6\u4e00\u7a2e\u96f2\u7aef\u670d\u52d9\u7a31\u4e4b\u70ba",(0,a.kt)("strong",{parentName:"p"},"PaaS (Platform as a Service)"),"\uff0c\u5247\u662f\u63d0\u4f9b\u5df2\u7d93\u5177\u5099\u5b8c\u6574\u53ef\u904b\u884c\u74b0\u5883\u7684\u5e73\u53f0\uff0c\u96f2\u7aef\u7528\u6236\u4e0d\u6703\u89f8\u6478\u5230\u5b8c\u6574\u7684\u865b\u64ec\u4e3b\u6a5f\u74b0\u5883\uff0c\u50c5\u9700\u5c08\u6ce8\u5728\u61c9\u7528\u7a0b\u5f0f\u7684\u4f48\u7f72\u9019\u4ef6\u4e8b\u4e0a\u9762\u3002\u5c0d\u65bc\u958b\u767c\u8005\u800c\u8a00\uff0c\u53ea\u9700\u8981\u5c07\u6240\u9700\u8981\u57f7\u884c\u7684\u61c9\u7528\u7a0b\u5f0f\u4ee5\u53ca\u57f7\u884c\u74b0\u5883\u76f8\u95dc\u7684\u5957\u4ef6\u9700\u6c42\u5b9a\u7fa9\u597d\uff0c\u6309\u7167PaaS\u5e73\u53f0\u7684\u4f48\u7f72\u6d41\u7a0b\u9032\u884c\u5c31\u53ef\u4ee5\u8f15\u9b06\u7684\u5c07\u7a0b\u5f0f\u653e\u5230\u96f2\u7aef\u57f7\u884c\u3002\u7576\u7136\uff0c\u76f8\u5c0d\u7684\u9019\u662f\u512a\u9ede\u4e5f\u662f\u7f3a\u9ede\uff0c\u56e0\u70ba\u4f60\u52e2\u5fc5\u6703\u9019\u6a23\u7684\u4fbf\u5229\u6027\u4e0b\u5c0d\u7f3a\u5c11\u81ea\u7531\u8207\u5f48\u6027\u9032\u884c\u59a5\u5354\u3002\u53e6\u5916\u56e0\u70ba\u4e0d\u540c\u7684PaaS\u4e00\u5b9a\u591a\u591a\u5c11\u5c11\u90fd\u6703\u6709\u7279\u6b8a\u7368\u6709\u7684\u4f48\u7f72\u6216\u8a2d\u5b9a\u65b9\u5f0f\uff0c\u56e0\u6b64\u672a\u4f86\u8981\u79fb\u8f49\u81f3\u5176\u4ed6\u5e73\u53f0\u6642\uff0c\u67d0\u90e8\u4efd\u7684\u8a2d\u5b9a\u65b9\u5f0f\u53ef\u80fd\u7121\u6cd5\u76f4\u63a5\u7121\u75db\u79fb\u8f49\u3002"),(0,a.kt)("p",null,"\u4f60\u8981\u6709\u79df\u4e00\u9593\u7a7a\u623f\u6240\u6709\u5bb6\u4ff1\u9673\u8a2d\u90fd\u8981\u81ea\u5df1\u6c7a\u5b9a\uff0c\u9084\u662f\u60f3\u8981\u4e00\u5361\u76ae\u7bb1\u5c31\u53ef\u5165\u4f4f\u7684\u516c\u5bd3\u5f0f\u9152\u5e97\uff1f\u7d55\u5c0d\u6c92\u6709\u53e6\u4e00\u500b\u597d\u54ea\u4e00\u500b\u58de\uff0c\u7aef\u770b\u500b\u4eba\u7576\u4e0b\u7684\u9700\u6c42\u800c\u5b9a\u3002\u4e5f\u6709\u4eba\u521d\u671f\u5e0c\u671b\u80fd\u7c21\u55ae\u8212\u670d\u4e0d\u7528\u7169\u60f1\u592a\u591a\uff0c\u4f46\u7b49\u5f85\u4e00\u5207\u4e0a\u8ecc\u9053\u518d\u642c\u5230\u53ef\u81ea\u7531\u904b\u7528\u7a7a\u9593\u81ea\u884c\u6c7a\u5b9a\u5bb6\u4ff1\u7684\u7a7a\u5c4b\uff0c\u9019\u6a23\u4e5f\u5f88\u597d\u3002"),(0,a.kt)("h3",{id:"\u5c31\u662f\u4f60\u4e86heroku"},"\u5c31\u662f\u4f60\u4e86\uff0cHeroku\uff01"),(0,a.kt)("p",null,"\u9019\u6b21\u9078\u64c7\u4f7f\u7528\u53ef\u4ee5\u904b\u884cDjango\u5c08\u6848\u7684PaaS\u5e73\u53f0\uff0c\u5c31\u662f\u77e5\u540d\u7684",(0,a.kt)("strong",{parentName:"p"},"Heroku"),"\u3002\u7576\u7136Heroku\u662f\u4ee5\u63d0\u4f9bRuby\u96f2\u7aef\u57f7\u884c\u74b0\u5883\u6240\u8d77\u5bb6\u7684\uff0c\u5f8c\u4f86\u6108\u4f86\u6108\u5168\u9762\u5f8c\u4e5f\u53ef\u4ee5\u904b\u884c\u5176\u4ed6\u8a9e\u8a00\u3001\u6846\u67b6\u7684\u74b0\u5883\uff0c\u4f8b\u5982Java\u3001Node.js\u3001Python\u3001PHP\u3001Go\u2026\u7b49\u3002Heroku\u7531\u65bc\u6709\u4e00\u500b\u6700\u57fa\u790e\u7684Free\u7248\u672c\u53ef\u63d0\u4f9b\u7d66\u4f7f\u7528\u8005\u904b\u7528\uff0c\u5c0d\u65bc\u62ff\u4f86\u5beb\u9019\u7a2e\u9a57\u8b49\u5f0fPOC\u5c08\u6848\u662f\u518d\u9069\u5408\u4e0d\u904e\u7684\u4e86\uff0c\u7576\u7136\u65e2\u7136\u662f\u514d\u8cbb\u7684\u5c31\u6703\u6709\u6240\u9650\u5236\uff0c\u6709\u8208\u8da3\u7684\u670b\u53cb\u9700\u8981\u5148\u884c",(0,a.kt)("a",{parentName:"p",href:"https://www.heroku.com/pricing"},"\u4e86\u89e3"),"\uff0c\u82e5\u6709\u8208\u8da3\u4e5f\u53ef\u4ee5\u5347\u7d1a\u6210\u4ed8\u8cbb\u65b9\u6848\u3002"),(0,a.kt)("p",null,"\u82e5\u60f3\u8981\u5feb\u901f\u5c07Django\u7db2\u7ad9\u4f48\u7f72\u5230Heroku\u4e0a\uff0c\u9996\u5148\u7576\u7136\u8981\u5148\u8a3b\u518a\u7533\u8acb\u6210\u70ba\u6703\u54e1\uff0c\u5728\u6b64\u63a8\u85a6Django Girls Taipei\u7684",(0,a.kt)("a",{parentName:"p",href:"https://djangogirlstaipei.herokuapp.com/tutorials/deploy-to-heroku/?os=windows"},"Django Heroku\u4f48\u7f72\u6559\u5b78"),"\uff0c\u5beb\u7684\u5f88\u6e05\u695a\u6613\u61c2\u3002"),(0,a.kt)("p",null,"\u5148\u9032\u884cHeroku\u7684\u5e33\u865f\u8a3b\u518a\uff0c\u63a5\u8457\u5b89\u88ddHeroku ",(0,a.kt)("a",{parentName:"p",href:"https://devcenter.heroku.com/articles/heroku-cli"},"CLI (Command Line Interface)"),"\u5de5\u5177\uff0c\u900f\u904eCLI\u53ef\u76f4\u63a5\u900f\u904eTerminal\u6a21\u5f0f\u9032\u884c\u500b\u4ebaHeroku Apps\u7684\u7ba1\u7406\u5de5\u4f5c\u3002\u5176\u4e2d\u6700\u95dc\u9375\u7684\u5c31\u662f\u900f\u904eTerminal\u9032\u884c\u5e33\u865f\u767b\u5165\uff0c\u4e00\u4f86\u662f\u6703\u5c07\u6b64\u5e33\u865f\u8207Git\u4f5c\u8eab\u4efd\u7d81\u5b9a (Heroku\u9700\u900f\u904eGit\u7ba1\u7406\u4e0a\u50b3\u4f60\u7684\u7db2\u7ad9\u7a0b\u5f0f\u78bc)\uff0c\u4e8c\u4f86\u662f\u53ef\u900f\u904e\u5de5\u5177\u5efa\u7acb\u76f8\u95dc\u7684Herou App\u4f86\u5b8c\u6210\u57fa\u790e\u8a2d\u5b9a\u3002"),(0,a.kt)("p",null,"\u9032\u884cHeroku login\n",(0,a.kt)("img",{parentName:"p",src:"https://ithelp.ithome.com.tw/upload/images/20210928/20130354Oa7fsIvHKB.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210928/20130354Oa7fsIvHKB.png"})),(0,a.kt)("p",null,"\u958b\u555f\u7db2\u9801\u9032\u884c\u767b\u5165\n",(0,a.kt)("img",{parentName:"p",src:"https://ithelp.ithome.com.tw/upload/images/20210927/20130354Uyi5pfPQ74.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210927/20130354Uyi5pfPQ74.png"})),(0,a.kt)("p",null,"\u5efa\u7acbHeroku App\n",(0,a.kt)("img",{parentName:"p",src:"https://ithelp.ithome.com.tw/upload/images/20210927/20130354f1ffd41lTs.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210927/20130354f1ffd41lTs.png"})),(0,a.kt)("p",null,"\u5c07Git\u8207Remote Heroku\u4f5c\u7d81\u5b9a\n",(0,a.kt)("img",{parentName:"p",src:"https://ithelp.ithome.com.tw/upload/images/20210927/20130354PcwPT0kpGF.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210927/20130354PcwPT0kpGF.png"})),(0,a.kt)("p",null,"\u65bc\u672c\u6a5f\u8a2d\u5b9aproduction\u74b0\u5883\u6240\u9700\u8981\u7684\u8a2d\u5b9a\u6a94\uff0c\u8207dev\u74b0\u5883\u5206\u958b\n",(0,a.kt)("img",{parentName:"p",src:"https://ithelp.ithome.com.tw/upload/images/20210927/20130354IIbuMt13Qe.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210927/20130354IIbuMt13Qe.png"})),(0,a.kt)("p",null,"\u63a5\u8457\u5c07\u672c\u5730\u6a94\u6848\u9032\u884cGit add\u3001commit\u3001push\uff0c\u82e5\u6210\u529f\u6703\u770b\u5230",(0,a.kt)("inlineCode",{parentName:"p"},"Verfifying deploy... done"),"\u5b57\u6a23\u3002\n",(0,a.kt)("img",{parentName:"p",src:"https://ithelp.ithome.com.tw/upload/images/20210927/20130354B0CDXe4MCZ.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210927/20130354B0CDXe4MCZ.png"})),(0,a.kt)("p",null,"\u518d\u4f86\u5c31\u662f\u57f7\u884cHeruku\u521d\u59cb\u5316\u76f8\u95dc\u4f5c\u696d\uff0c\u5305\u542b\u521d\u59cb\u5316\u8cc7\u6599\u5eab\u8207\u5efa\u7acbsuperuser\u7b49\u3002\n",(0,a.kt)("img",{parentName:"p",src:"https://ithelp.ithome.com.tw/upload/images/20210927/20130354ucudFjma1U.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210927/20130354ucudFjma1U.png"})),(0,a.kt)("p",null,"\u4e0a\u8ff0\u7684\u57f7\u884c\u7d30\u7bc0\u5c31\u4e0d\u7d30\u8ac7\uff0c\u5305\u542b\u4e86WSGI\u3001requirements.txt\u6a94\u3001Procfile\u7b49\u7684\u6e96\u5099\u8207\u8a2d\u5b9a\uff0c\u6709\u8208\u8da3\u53ef\u53c3\u8003\u524d\u8ff0\u6587\u7ae0\u3002\u6709\u4e9b\u5c0f\u5730\u65b9\u4ecd\u9700\u6ce8\u610f\uff0c\u4f8b\u5982Postgres\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"psycopg2"),"\u76ee\u524d\u6211\u662f\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"2.9.1"),"\u7248\u672c\u624d\u80fd\u6210\u529f\u3002"),(0,a.kt)("p",null,"\u6700\u5f8c\u6211\u5011\u9806\u5229\u5c07\u672c\u6a5f\u7684KummyShop\u7db2\u7ad9\u4f48\u7f72\u5230Heroku\u7684\u5e73\u53f0\u4e0a\uff0c\u4e26\u4e14\u4f7f\u7528\u6628\u5929\u7684greetings\u9801\u9762\u9032\u884c\u6e2c\u8a66\u3002\u5e36\u5165\u4e00\u4e9b\u53c3\u6578\u8a66\u8a66\u770b\uff0c\u4e5f\u80fd\u6210\u529f\u904b\u4f5c\uff0c\u592a\u597d\u4e86\u3002\n",(0,a.kt)("img",{parentName:"p",src:"https://ithelp.ithome.com.tw/upload/images/20210927/201303548CkvTv5Yum.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210927/201303548CkvTv5Yum.png"})),(0,a.kt)("p",null,"\u4e0d\u904eHeroku\u56e0\u70ba\u6709\u4e00\u4e9b\u4f7f\u7528\u4e0a\u7684\u9650\u5236\uff0c\u9664\u4e86Free\u7248\u672c\u63d0\u4f9b\u7684\u8cc7\u6e90\u53d7\u9650\u8207\u6703\u5f37\u5236\u4f11\u7720\u7b49\u6a5f\u5236\u5916\uff0c\u672c\u8eab\u4e0d\u652f\u63f4SQLite(\u4e3b\u8981\u4ee5PostgresSQL\u70ba\u4e3b)\u4e5f\u6703\u9023\u5e36\u9700\u8981\u5e36\u6574\u65e2\u6709\u4f5c\u6cd5\uff0c\u518d\u4f86\u9084\u6709\u975c\u614b\u6a94\u6848\u5f15\u7528\u9700\u4f5c\u8f49\u63db\u7b49\uff0c\u4e00\u4e9b\u7d30\u5c0f\u7684\u7d30\u7bc0\u4ecd\u7136\u9700\u8981\u82b1\u6642\u9593\u6e2c\u8a66\u904e\u3002"),(0,a.kt)("p",null,"\u4eca\u5929\u5c31\u5148\u9019\u6a23\u4e86\uff0c\u660e\u5929\u518d\u52aa\u529b\u3002"))}c.isMDXComponent=!0}}]);