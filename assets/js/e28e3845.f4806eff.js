"use strict";(self.webpackChunkcodetenshu=self.webpackChunkcodetenshu||[]).push([[358],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>u});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},m="mdxType",k={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=p(a),g=r,u=m["".concat(s,".").concat(g)]||m[g]||k[g]||l;return a?n.createElement(u,o(o({ref:t},c),{},{components:a})):n.createElement(u,o({ref:t},c))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,o=new Array(l);o[0]=g;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[m]="string"==typeof e?e:r,o[1]=i;for(var p=2;p<l;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}g.displayName="MDXCreateElement"},6974:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>m,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const l={slug:"2023-01-12-docker-02",title:"Docker Desktop\u65b0\u624b\u6751: Image\u7bc7",authors:["rexmenlin"],tags:["Docker"]},o=void 0,i={permalink:"/blog/2023-01-12-docker-02",source:"@site/blog/2023-01-12-docker-02/index.md",title:"Docker Desktop\u65b0\u624b\u6751: Image\u7bc7",description:"\u5728\u4e0a\u4e00\u7bc7\u300aDocker Desktop \u5b89\u88dd\u7b46\u8a18 (Windows \u7248\u672c)\u300b\u6587\u7ae0\u8aaa\u660e\u4e86 Docker Desktop \u7684\u5b89\u88dd\uff0c\u73fe\u5728\u8981\u4f86\u804a\u804a Docker Desktop \u80fd\u505a\u4e9b\u4ec0\u9ebc\u4e8b\u3002",date:"2023-01-12T00:00:00.000Z",formattedDate:"2023\u5e741\u670812\u65e5",tags:[{label:"Docker",permalink:"/blog/tags/docker"}],readingTime:7.53,hasTruncateMarker:!1,authors:[{name:"\u96f7\u54e5",title:"\u7a0b\u5f0f\u6280\u8853\u5929\u5b88\u95a3\u7ad9\u9577",url:"http://rexmenlin.github.io",imageURL:"https://member.ithome.com.tw/avatars/3540?s=ithelp",key:"rexmenlin"}],frontMatter:{slug:"2023-01-12-docker-02",title:"Docker Desktop\u65b0\u624b\u6751: Image\u7bc7",authors:["rexmenlin"],tags:["Docker"]},nextItem:{title:"\u7528Docusaurus\u642d\u914dGitHub Pages\u5efa\u7f6e\u514d\u8cbb\u500b\u4eba\u90e8\u843d\u683c",permalink:"/blog/2022-12-27-docusaurus-github-pages"}},s={authorsImageUrls:[void 0]},p=[{value:"\u5148\u804a\u4e00\u4e0b Docker \u7684\u91cd\u8981\u8981\u7d20",id:"\u5148\u804a\u4e00\u4e0b-docker-\u7684\u91cd\u8981\u8981\u7d20",level:2},{value:"Image",id:"image",level:4},{value:"Container",id:"container",level:4},{value:"Volume",id:"volume",level:4},{value:"\u4f86\u770b\u4e00\u4e0b Docker Desktop \u7684\u529f\u80fd\u5427",id:"\u4f86\u770b\u4e00\u4e0b-docker-desktop-\u7684\u529f\u80fd\u5427",level:2},{value:"\u65b0\u529f\u80fd\uff01\u7dda\u4e0a Images \u641c\u5c0b\u529f\u80fd",id:"\u65b0\u529f\u80fd\u7dda\u4e0a-images-\u641c\u5c0b\u529f\u80fd",level:3},{value:"\u65b0\u529f\u80fd! Image \u8a73\u7d30\u9801 (\u542b\u8cc7\u5b89\u6f0f\u6d1e\u5206\u6790)",id:"\u65b0\u529f\u80fd-image-\u8a73\u7d30\u9801-\u542b\u8cc7\u5b89\u6f0f\u6d1e\u5206\u6790",level:3},{value:"Image \u968e\u5c64",id:"image-\u968e\u5c64",level:4},{value:"\u5f31\u9ede\u5206\u6790",id:"\u5f31\u9ede\u5206\u6790",level:4}],c={toc:p};function m(e){let{components:t,...l}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,l,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"\u5728\u4e0a\u4e00\u7bc7",(0,r.kt)("a",{parentName:"p",href:"/blog/2022-11-7-docker-01"},"\u300aDocker Desktop \u5b89\u88dd\u7b46\u8a18 (Windows \u7248\u672c)\u300b"),"\u6587\u7ae0\u8aaa\u660e\u4e86 Docker Desktop \u7684\u5b89\u88dd\uff0c\u73fe\u5728\u8981\u4f86\u804a\u804a Docker Desktop \u80fd\u505a\u4e9b\u4ec0\u9ebc\u4e8b\u3002"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u4e0a\u4e00\u7bc7\u8b1b\u8edf\u9ad4\u5b89\u88dd\u7684\u7248\u672c\u662f 4.13.1 \u7248\uff0c\u6c92\u591a\u4e45\u5c31\u51fa\u4e86\u66f4\u65b0\u7248\u5230 4.15.0 \u7248\uff0c\u9664\u4e86\u4ecb\u9762\u5c0f\u5e45\u8abf\u6574\u4e4b\u5916\uff0c\u4e5f\u591a\u4e86\u4e0d\u5c11\u529f\u80fd\u3002\u4e4b\u524d\u89ba\u5f97 Docker Desktop \u5176\u5be6\u529f\u80fd\u633a\u5c11\u7684\uff0c\u5927\u591a\u7684\u597d\u8655\u6703\u5728\u4f7f\u7528\u6f02\u4eae\u7684 GUI \u4f86\u67e5\u770b\u8cc7\u8a0a\u800c\u5df2\u3002\u5fc5\u9808\u8aaa\uff0cDocker Desktop \u771f\u7684\u6539\u7248\u901f\u5ea6\u98db\u5feb\uff0c\u4e09\u5929\u5169\u982d\u5c31\u8df3\u51fa\u8981\u66f4\u65b0\u7248\u672c\u7684\u8a0a\u606f\u3002",(0,r.kt)("img",{src:a(7248).Z,width:"1182",height:"720"}))),(0,r.kt)("h2",{id:"\u5148\u804a\u4e00\u4e0b-docker-\u7684\u91cd\u8981\u8981\u7d20"},"\u5148\u804a\u4e00\u4e0b Docker \u7684\u91cd\u8981\u8981\u7d20"),(0,r.kt)("p",null,"\u5728 Docker \u7684\u5bb9\u5668\u5316\u67b6\u69cb\u4e2d\uff0c\u5c0d\u65bc\u5b8c\u5168\u4e0d\u4e86\u89e3\u7684\u4eba\u4f86\uff0c\u5feb\u901f\u7684\u8b1b\u89e3\u4e00\u4e0b\u3002\u4f60\u9700\u8981\u77e5\u9053\u7684\u5e7e\u500b\u91cd\u8981\u7684\u8981\u7d20\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Images"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Containers"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Volumes")))),(0,r.kt)("h4",{id:"image"},"Image"),(0,r.kt)("p",null,"Image \u53ef\u4ee5\u60f3\u50cf\u6210\u662f\u4e00\u500b\u552f\u8b80\u7684\u6a21\u677f\uff0c\u597d\u6bd4\u662f\u5f9e\u7db2\u8def\u4e0a\u4e0b\u8f09\u4e0b\u4f86\u7684\u4e00\u500b\u8edf\u9ad4\u7684\u5b89\u88dd\u6a94\u3002\u5373\u4f7f\u76f8\u540c\u7684\u8edf\u9ad4\uff0c\u53ef\u80fd\u4e5f\u6709\u4e0d\u540c\u7684\u7248\u672c\u4e4b\u5206\uff0cImage \u5c31\u662f\u9019\u6a23\u7684\u6982\u5ff5\uff0c\u4e3b\u8981\u662f\u4f5c\u70ba\u5bb9\u5668\u5316\u7684\u6a23\u677f\u4f86\u6e90\u3002"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Image \u662f\u600e\u9ebc\u4f86\u7684\u5462\uff1f\u8981\u5148\u5efa\u7acb Dockerfile \u6a94\uff0c\u6b64\u6a94\u6848\u5b9a\u7fa9\u5982\u4f55\u5efa\u7f6e\u7684\u904e\u7a0b\u9700\u8981\u54ea\u4e9b\u5167\u5916\u90e8\u8cc7\u6e90\u4ee5\u53ca\u63cf\u8ff0\u5efa\u7f6e\u6d41\u7a0b\u7684\u7d30\u7bc0\u3002\u4e0d\u4e00\u5b9a\u8981\u5168\u90e8\u5f9e\u96f6\u958b\u59cb\uff0c\u5927\u591a\u6578\u662f\u57fa\u65bc\u67d0\u4e9b Image \u518d\u9032\u884c\u758a\u52a0\u6216\u8abf\u6574\u3002")),(0,r.kt)("h4",{id:"container"},"Container"),(0,r.kt)("p",null,"Container \u5c31\u662f\u4ee5 Image \u4f5c\u70ba\u6a23\u672c\u57fa\u790e\uff0c\u53bb\u5be6\u969b\u904b\u884c\u51fa\u4f86\u7684\u5be6\u9ad4\u6210\u54c1\uff0c\u4e5f\u53ef\u4ee5\u8996\u70ba\u662f\u4e00\u500b App \u61c9\u7528\u7a0b\u5f0f\u3002\u8207 Image \u7684\u95dc\u4fc2\uff0c\u5c31\u597d\u6bd4\u62ff\u67d0\u4e00\u500b\u5b89\u88dd\u6a94\u5b89\u88dd\u5b8c\u5f8c\u7684\u53ef\u57f7\u884c\u61c9\u7528\u7a0b\u5f0f\u3002\u5982\u679c\u4f60\u628a\u4e00\u500b Image \u6a94\u9032\u884c 5 \u6b21\u5bb9\u5668\u5316\uff0c\u4f60\u5c31\u6703\u5f97\u5230 5 \u500b\u4e0d\u540c\u5be6\u9ad4\u7684 Container \u74b0\u5883(\u5373\u4f7f\u5167\u5bb9\u76f8\u540c)\uff0c\u7531\u6b64\u53ef\u60f3\u50cf\u7684\u5230 Container \u624d\u6703\u662f\u6211\u5011\u6240\u6709\u904b\u884c\u5bb9\u5668\u5316\u7684\u4e3b\u89d2\u771f\u8eab\u3002"),(0,r.kt)("h4",{id:"volume"},"Volume"),(0,r.kt)("p",null,"\u800c Volume \u7684\u6982\u5ff5\u5c31\u662f\u5be6\u969b\u5132\u5b58\u7684\u7a7a\u9593\uff0c\u53ef\u4ee5\u639b\u5728 Container \u4e0a\u4f7f\u7528\uff0c\u5373\u4f7f Container \u88ab\u79fb\u9664\uff0cVolume \u9084\u662f\u53ef\u4ee5\u5b58\u5728\u3002\u53ef\u4ee5\u60f3\u50cf\u6210 Container \u662f\u88ab\u5b89\u88dd\u5b8c\u6210\u7684\u57f7\u884c\u7a0b\u5f0f\uff0c\u4f46 Volume \u662f\u7368\u7acb\u7684\u8cc7\u6599\u5132\u5b58\u4f4d\u7f6e\uff0c\u5373\u4f7f\u7a0b\u5f0f\u88ab\u79fb\u9664\u5f8c\uff0c\u9084\u662f\u80fd\u4fdd\u7559 user \u8cc7\u6599\u3002"),(0,r.kt)("p",null,"\u6709\u4e86\u4e0a\u9762\u7684\u53c3\u7684\u89c0\u5ff5\u5f8c\uff0c\u5c31\u53ef\u4ee5\u77e5\u9053 Docker Desktop \u7684\u8996\u89ba\u5316\u5448\u73fe\uff0c\u4e3b\u8981\u662f\u70ba\u4e86\u8981\u5e6b\u6211\u5011\u66f4\u76f4\u89ba\u7684\u7ba1\u7406\u6216\u6aa2\u8996\u4e0a\u9762\u9019\u4e09\u500b\u8981\u7d20\u3002"),(0,r.kt)("p",null,"\u7576\u7136\uff0c\u4e0d\u4f7f\u7528 Docker Desktop\uff0c\u7d14\u7cb9\u4f7f\u7528 Command Line \u6307\u4ee4\u4e5f\u90fd\u53ef\u4ee5\u4f5c\u5230\u4e0a\u8ff0\u7684\u7ba1\u7406\u3002"),(0,r.kt)("h2",{id:"\u4f86\u770b\u4e00\u4e0b-docker-desktop-\u7684\u529f\u80fd\u5427"},"\u4f86\u770b\u4e00\u4e0b Docker Desktop \u7684\u529f\u80fd\u5427"),(0,r.kt)("p",null,"\u5de6\u5074\u662f\u4e3b\u8981\u529f\u80fd\u5340\uff0c\u53ef\u770b\u5230 Containers\u3001Images\u3001Volumes\uff0c\u4e0b\u9762\u9084\u6709\u5169\u500b\u662f Beta \u529f\u80fd\uff0c\u5206\u5225\u662f Dev Environments \u958b\u767c\u74b0\u5883\u914d\u7f6e\u529f\u80fd\u4ee5\u53ca Extensions \u5916\u639b\u7ba1\u7406\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(9368).Z,width:"210",height:"311"})),(0,r.kt)("p",null,"\u6211\u5011\u5148\u628a\u91cd\u9ede\u653e\u5728 Docker \u5fa1\u4e09\u5bb6\u5427!"),(0,r.kt)("h1",{id:"images"},"Images"),(0,r.kt)("p",null,"\u96d6\u7136 Containers \u64fa\u5728\u6700\u4e0a\u65b9\uff0c\u4f46\u6211\u5011\u8981\u5f9e\u7b2c\u4e8c\u500b Images \u958b\u59cb\u770b\uff0c\u56e0\u70ba\u4ed6\u662f\u4e00\u5207\u5bb9\u5668\u5316\u6d41\u7a0b\u7684\u9996\u7ad9\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(3994).Z,width:"1182",height:"720"})),(0,r.kt)("p",null,"\u4e00\u9032\u5230 Images \u5340\u6642\uff0c\u61c9\u8a72\u6703\u6709\u4e00\u9ede\u4e0d\u77e5\u8981\u5f9e\u4f55\u4e0b\u624b\uff0c\u56e0\u70ba\u4e5f\u6c92\u770b\u5230\u5982\u4f55\u627e\u5230\u65e2\u6709\u7684 Image\uff0c\u4e5f\u6c92\u8fa6\u6cd5\u5728\u9019\u88e1\u5efa\u7acb Image\uff0c\u6c92\u6709\u4efb\u4f55\u770b\u8d77\u4f86\u6bd4\u8f03\u76f4\u89c0\u7684\u529f\u80fd\u6309\u9215\u53ef\u4ee5\u4f7f\u7528\uff0c\u5c31\u6703\u6123\u5728\u9019\u88e1\u4e00\u6703\u5152\u3002"),(0,r.kt)("p",null,"\u539f\u56e0\u662f\u56e0\u70ba\u5fc5\u9808\u8981\u642d\u914d Terminal \u7684 Command \u6307\u4ee4\u9032\u884c Image \u7684 pull \u6216 run\u3002\u9019\u5be6\u5728\u5f88\u4e0d\u76f4\u89ba\uff0c\u5982\u679c\u90fd\u6709\u6574\u500b Desktop \u74b0\u5883\u4e86\uff0c\u70ba\u4ec0\u9ebc\u4e0d\u80fd\u5f9e GUI \u4f86\u57f7\u884c\u4eba\u6027\u5316\u4e00\u9ede\u7684\u6d41\u7a0b\u5c31\u597d\u3002\u539f\u672c\u5148\u524d\u7248\u672c\u7684 Docker Desktop \u662f\u9019\u6a23\u6c92\u932f\uff0c\u4f46\u65b0\u7248\u6709\u4e86\u4e00\u4e9b\u7a81\u7834\u4e86\u3002"),(0,r.kt)("p",null,"\u6211\u5011\u4ee5\u540d\u70ba",(0,r.kt)("inlineCode",{parentName:"p"},"docker/getting-started"),"\u7684 Image \u70ba\u4f8b\uff0c\u5982\u679c\u6211\u5011\u8981 pull \u4e0b\u8f09\u9019\u500b Image (\u5148\u4e0d\u9032\u884c\u5bb9\u5668\u5316)\uff0c\u8981\u958b\u555f Terminal (\u5728 Windows \u7684\u8a71\uff0c\u5c31\u57f7\u884c cmd \u6216\u8005 powershell)"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"docker pull docker/getting-started\n")),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(4673).Z,width:"979",height:"512"}),"\n\u9060\u7aef pull \u4e0b\u8f09\u5b8c\u6210\u5f8c\uff0c\u9019\u6642\u5019\u5c31\u6703\u5728 Images \u5340\u770b\u5230\u4e86\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(6891).Z,width:"1182",height:"720"})),(0,r.kt)("h3",{id:"\u65b0\u529f\u80fd\u7dda\u4e0a-images-\u641c\u5c0b\u529f\u80fd"},"\u65b0\u529f\u80fd\uff01\u7dda\u4e0a Images \u641c\u5c0b\u529f\u80fd"),(0,r.kt)("p",null,"\u4e4b\u524d\u7684\u641c\u5c0b\u529f\u80fd\u53ea\u80fd\u91dd\u5c0d\u4f60\u81ea\u5df1 Local \u672c\u6a5f\u6216 Remote Repo (\u9700\u9023\u7d50\u5e33\u865f)\u7684 Image \u6216 Container \u9032\u884c\u300c\u904e\u6ffe\u300d\u7684\u641c\u5c0b\u3002\u65b0\u7248\u672c\u5728\u4e3b\u8996\u7a97\u4e0a\u65b9\u591a\u4e86 Search \u641c\u5c0b\u529f\u80fd (\u6309\u4e0b",(0,r.kt)("inlineCode",{parentName:"p"},"Ctrl + K"),")\uff0c\u5728\u88e1\u9762\u7d42\u65bc\u53ef\u4ee5\u641c\u5c0b online \u7248\u672c\u7684 Image \u4e86\uff01"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(2723).Z,width:"1182",height:"720"})),(0,r.kt)("p",null,"\u6211\u5011\u4e00\u6a23\uff0c\u76f4\u63a5\u9ede\u9078",(0,r.kt)("inlineCode",{parentName:"p"},"pull"),"\u9032\u884c\u4e0b\u8f09\uff0c\u5373\u53ef\u5728 Images \u5340\u770b\u5230\u4e00\u6a23\u7684\u7d50\u679c\u7522\u751f\u3002"),(0,r.kt)("h3",{id:"\u65b0\u529f\u80fd-image-\u8a73\u7d30\u9801-\u542b\u8cc7\u5b89\u6f0f\u6d1e\u5206\u6790"},"\u65b0\u529f\u80fd! Image \u8a73\u7d30\u9801 (\u542b\u8cc7\u5b89\u6f0f\u6d1e\u5206\u6790)"),(0,r.kt)("p",null,"\u9019\u500b\u529f\u80fd\u61c9\u8a72\u662f\u5f9e 4.14.0 \u65b0\u589e\u7684\uff0c\u5728 Image \u5217\u8868\u9ede\u9032\u53bb\u5167\u9801\u5f8c\uff0c\u53ef\u770b\u5230\u6bd4\u820a\u7248\u591a\u51fa\u4e0d\u5c11\u529f\u80fd\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(6334).Z,width:"1193",height:"757"})),(0,r.kt)("h4",{id:"image-\u968e\u5c64"},"Image \u968e\u5c64"),(0,r.kt)("p",null,"\u9996\u5148\u5de6\u908a\u53ef\u4ee5\u770b\u5230 Image \u7684\u968e\u6bb5\u95dc\u4fc2\u8207 Layer \u5c64\u7d50\u69cb\uff0c\u53ef\u4ee5\u66f4\u76f4\u89ba\u7684\u4e86\u89e3 Image \u7684\u4f86\u6e90\u6709\u54ea\u4e9b\uff0c\u4ee5\u53ca Dockerfile \u5728 Build \u6642\u7684\u6307\u4ee4\u57f7\u884c\u9806\u5e8f\u3002"),(0,r.kt)("h4",{id:"\u5f31\u9ede\u5206\u6790"},"\u5f31\u9ede\u5206\u6790"),(0,r.kt)("p",null,"\u53f3\u5074\u6703\u5c07\u5404\u7a2e\u8cc7\u5b89\u76f8\u95dc\u7684\u6f0f\u6d1e\u4f9d\u4e0d\u540c\u65b9\u5f0f\u6574\u7406\uff0c\u4e5f\u53ef\u4ee5\u5c55\u958b\u518d\u770b\u5230\u66f4\u591a\u7684\u7d30\u7bc0\u3002"),(0,r.kt)("p",null,"\u7b2c\u4e00\u500b\u662f\u4f9d Images \u7684\u7e7c\u627f\u7236\u5b50\u95dc\u4fc2\u5217\u51fa\u76f8\u95dc\u7684\u8cc7\u5b89\u6458\u8981\u8cc7\u8a0a\uff0c\u4f9d\u7167\u98a8\u96aa\u7b49\u7d1a(C \u5371\u6025, H \u9ad8\u98a8\u96aa, M \u4e2d\u98a8\u96aa, L \u4f4e\u98a8\u96aa)\u6703\u6709\u4e0d\u540c\u7684\u984f\u8272\u5340\u5206\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(5909).Z,width:"714",height:"586"})),(0,r.kt)("p",null,"\u63a5\u8457\u53ef\u4ee5\u6f0f\u6d1e\u4f5c\u5206\u985e\uff0c\u76f4\u63a5\u5e6b\u6211\u5011\u6574\u7406\u597d\uff0c\u9084\u53ef\u5c55\u958b\u770b\u5230\u6f0f\u6d1e\u7684\u7d30\u7bc0\u3002\u9084\u8cbc\u5fc3\u7684\u5e6b\u6211\u5011\u628a\u516c\u958b\u6f0f\u6d1e\u8cc7\u6599\u5eab\u7684\u9023\u7d50\u90fd\u6e96\u5099\u597d\u4e86\uff0c\u9ede\u958b\u5c31\u53ef\u4ee5\u770b\u5230\u5b8c\u6574\u8a73\u7d30\u7684\u9801\u9762\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(4371).Z,width:"714",height:"856"})),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(5492).Z,width:"1144",height:"804"})),(0,r.kt)("p",null,"\u7576\u7136\uff0c\u9019\u4e9b\u8cc7\u6599\u7684\u4f86\u6e90\u662f\u5f9e NIST \u904e\u4f86\u7684\uff0c\u4e0a\u65b9\u4ecd\u7136\u8cbc\u5fc3\u7684\u628a\u539f\u59cb\u7684 CVE \u5167\u5bb9\u518d\u9644\u4e0a\uff0c\u8b93\u4f7f\u7528\u8005\u53ef\u4ee5\u5feb\u901f\u78ba\u8a8d\u76f8\u95dc\u7684\u8a73\u7d30\u4f86\u6e90\u8cc7\u8a0a\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(3940).Z,width:"1392",height:"871"})),(0,r.kt)("p",null,"\u63a5\u8457\u662f Image \u4e2d\u7684\u6240\u6709 packages \u5957\u4ef6\u5217\u8868\uff0c\u4e00\u6a23\u53ef\u5c55\u958b\u770b\u5230\u66f4\u591a\u7684\u7d30\u7bc0\u5167\u5bb9\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(2764).Z,width:"711",height:"865"})),(0,r.kt)("p",null,"\u4e0a\u8ff0\u7684\u9019\u4e9b\u65b0\u529f\u80fd\uff0c\u771f\u7684\u662f\u883b\u6709\u611f\u800c\u4e14\u5be6\u7528\u7684\uff0c\u81f3\u5c11\u8b93 Docker Desktop \u7684\u5be6\u7528\u6027\u8207\u4e0d\u53ef\u53d6\u4ee3\u6027\u589e\u52a0\u4e86\u4e0d\u5c11\uff0c\u5148\u524d\u5f88\u591a\u4eba\u6703\u8a8d\u70ba\u53ea\u8981\u6703 Docker \u7684 Terminal \u6307\u4ee4\uff0cDocker Desktop \u771f\u7684\u53ea\u662f\u975e\u5fc5\u8981\u6027\u7684\u8f14\u52a9\u5de5\u5177\uff0c\u6240\u4ee5\u5728\u5148\u524d\u5f9e\u514d\u8cbb\u8edf\u9ad4\u8b8a\u6210\u9700\u4ed8\u8cbb\u7684\u6d88\u606f\u4e00\u51fa\uff0c\u5f88\u591a\u4eba\u8a55\u4f30\u5f8c\u76f4\u63a5\u68c4\u4e4b\u4e0d\u7528\u3002"))}m.isMDXComponent=!0},7248:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/2023-01-12-17-04-17-image-406b42d18ce0da291f9d37a8909b638a.png"},2723:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/2023-01-12-17-05-56-image-96adf4939f129f38909890a064b94bba.png"},9368:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/2023-01-12-17-20-25-image-662efd59337375b4de3fa71a01661dea.png"},3994:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/2023-01-12-17-25-49-image-631cd67a4f587b0466bb111233d85f20.png"},4673:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/2023-01-12-17-38-32-image-3b9459ac583a3fd3b3c5c4333a45a7bb.png"},6891:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/2023-01-12-17-38-38-image-a172dc73ecd9ef52d45b2e1b9d1a475d.png"},6334:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/2023-01-12-20-51-53-image-cc231dc27eb88e67fba3be07e0e553c6.png"},5909:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/2023-01-12-21-00-42-image-572ea6fcb3d406f3a506ed2eda4ceb46.png"},4371:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/2023-01-12-21-05-24-image-f1b98a65f2a6858fee179f3740e1c899.png"},5492:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/2023-01-12-21-07-43-image-39b1ccf0007a4a138802cf1b41b92597.png"},3940:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/2023-01-12-21-08-52-image-14dad2595a4eebc9348a016078678240.png"},2764:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/2023-01-12-21-10-48-image-178c04a749f72b403d1e716c2aa966aa.png"}}]);