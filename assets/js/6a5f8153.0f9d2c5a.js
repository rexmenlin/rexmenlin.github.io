"use strict";(self.webpackChunkmy_site=self.webpackChunkmy_site||[]).push([[5196],{9910:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>a,frontMatter:()=>d,metadata:()=>i,toc:()=>h});const i=JSON.parse('{"id":"finance-bank-api/Day08 - \u5341\u516d\u9032\u4f4d\u683c\u5f0f\u7684\u5f8c\u7e8c\u63a2\u8a0e\uff0c\u5b57\u4e32\u50b3\u8f38\u5bb9\u91cf\u500d\u589e\u4e86","title":"Day08 - \u5341\u516d\u9032\u4f4d\u683c\u5f0f\u7684\u5f8c\u7e8c\u63a2\u8a0e\uff0c\u5b57\u4e32\u50b3\u8f38\u5bb9\u91cf\u500d\u589e\u4e86","description":"\u5ef6\u7e8c\u6628\u5929\u7684\u5341\u516d\u9032\u4f4d\u8f49\u63db\uff0c\u9084\u6709\u4ef6\u91cd\u8981\u7684\u4e8b\u3002","source":"@site/docs/finance-bank-api/Day08 - \u5341\u516d\u9032\u4f4d\u683c\u5f0f\u7684\u5f8c\u7e8c\u63a2\u8a0e\uff0c\u5b57\u4e32\u50b3\u8f38\u5bb9\u91cf\u500d\u589e\u4e86.md","sourceDirName":"finance-bank-api","slug":"/finance-bank-api/Day08 - \u5341\u516d\u9032\u4f4d\u683c\u5f0f\u7684\u5f8c\u7e8c\u63a2\u8a0e\uff0c\u5b57\u4e32\u50b3\u8f38\u5bb9\u91cf\u500d\u589e\u4e86","permalink":"/docs/finance-bank-api/Day08 - \u5341\u516d\u9032\u4f4d\u683c\u5f0f\u7684\u5f8c\u7e8c\u63a2\u8a0e\uff0c\u5b57\u4e32\u50b3\u8f38\u5bb9\u91cf\u500d\u589e\u4e86","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":9,"frontMatter":{"sidebar_position":9},"sidebar":"tutorialSidebar","previous":{"title":"Day07 - \u6dfa\u8ac7binary\u8207\u5341\u516d\u9032\u4f4dHex\u3001UTF-8\u6587\u5b57\u7de8\u78bc\u8f49\u63db","permalink":"/docs/finance-bank-api/Day07 - \u6dfa\u8ac7binary\u8207\u5341\u516d\u9032\u4f4dHex\u3001UTF-8\u6587\u5b57\u7de8\u78bc\u8f49\u63db"},"next":{"title":"Day09 - \u5b89\u5168\u7121\u865e\u5f8c\uff0c\u958b\u59cb\u5efa\u7acb\u8a02\u55ae ATM\u865b\u64ec\u5e33\u865f\u7bc71","permalink":"/docs/finance-bank-api/Day09 - \u5b89\u5168\u7121\u865e\u5f8c\uff0c\u958b\u59cb\u5efa\u7acb\u8a02\u55ae ATM\u865b\u64ec\u5e33\u865f\u7bc71"}}');var t=s(4848),c=s(8453);const d={sidebar_position:9},r=void 0,l={},h=[{value:"\u96b1\u85cf\u7684\u554f\u984c\uff0c\u5bb9\u91cf\u8b8a\u5927\u4e86",id:"\u96b1\u85cf\u7684\u554f\u984c\u5bb9\u91cf\u8b8a\u5927\u4e86",level:3},{value:"\u7a0b\u5f0f\u8aaa\u660e",id:"\u7a0b\u5f0f\u8aaa\u660e",level:5},{value:"Base64\u57fa\u790e\u539f\u7406\u5feb\u901f\u8b1b",id:"base64\u57fa\u790e\u539f\u7406\u5feb\u901f\u8b1b",level:3},{value:"\u628a\u5341\u516d\u9032\u4f4d\u8207Base64\u4f5c\u500b\u6bd4\u8f03",id:"\u628a\u5341\u516d\u9032\u4f4d\u8207base64\u4f5c\u500b\u6bd4\u8f03",level:4},{value:"\u5be6\u4f8b\u89e3\u8aaa",id:"\u5be6\u4f8b\u89e3\u8aaa",level:4},{value:"\u984d\u5916\u88dc\u5145",id:"\u984d\u5916\u88dc\u5145",level:4}];function o(e){const n={code:"code",del:"del",h3:"h3",h4:"h4",h5:"h5",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"\u5ef6\u7e8c\u6628\u5929\u7684\u5341\u516d\u9032\u4f4d\u8f49\u63db\uff0c\u9084\u6709\u4ef6\u91cd\u8981\u7684\u4e8b\u3002"}),"\n",(0,t.jsx)(n.h3,{id:"\u96b1\u85cf\u7684\u554f\u984c\u5bb9\u91cf\u8b8a\u5927\u4e86",children:"\u96b1\u85cf\u7684\u554f\u984c\uff0c\u5bb9\u91cf\u8b8a\u5927\u4e86"}),"\n",(0,t.jsx)(n.p,{children:"\u82e5\u662f\u67d0\u500b\u9700\u6c42\uff0c\u8cc7\u6599\u50b3\u9001\u904e\u7a0b\u4e2d\u4e0d\u5141\u8a31\u50b3\u9001\u4e2d\u6587\uff0c\u50c5\u80fd\u4ee5\u82f1\u6578\u5b57\u50b3\u9001\uff0c\u90a3\u9ebc\u6211\u5011\u6709\u6a5f\u6703\u5c07\u539f\u672c\u7684\u4e2d\u6587\u900f\u904e\u4e0a\u8ff0\u65b9\u5f0f\u8f49\u63db\u6210\u5341\u516d\u9032\u4f4d\u683c\u5f0f\u7684\u5b57\u4e32\u9032\u884c\u50b3\u9001\uff0c\u5982\u6b64\u4e00\u4f86\u53ef\u4ee5\u89e3\u6c7a\u50b3\u9001\u65b9\u5f0f\u7684\u9650\u5236\u6216\u8005\u662f\u672a\u77e5\u7de8\u78bc\u932f\u8aa4\u7684\u4e82\u78bc\u554f\u984c\u3002"}),"\n",(0,t.jsx)(n.p,{children:"\u4f46\u662f\u9019\u88e1\u6709\u4e00\u500b\u96b1\u85cf\u7684\u5bb9\u91cf\u6210\u672c\u9700\u8981\u8003\u91cf\u4e00\u4e0b\u3002"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"print(len(ch_01_ba_encoded))  # ch_01_ba_encoded\u70ba\uff1ab'\\xe6\\xb0\\xb8\\xe8\\xb1\\x90API'\n# \u9577\u5ea6\u70ba 9 bytes\n\nprint(len(ch_hex_01_str_encoded)) # ch_hex_01_str_encoded\u70ba\uff1a'e6b0b8e8b190415049'\n# \u9577\u5ea6\u70ba 18 bytes\n"})}),"\n",(0,t.jsx)(n.h5,{id:"\u7a0b\u5f0f\u8aaa\u660e",children:"\u7a0b\u5f0f\u8aaa\u660e"}),"\n",(0,t.jsx)(n.p,{children:"\u4ee5\u4e0a\u9762\u70ba\u4f8b\uff0c\u300c\u6c38\u8c50API\u300d\u9019\u5e7e\u500b\u4e2d\u82f1\u6587\u593e\u96dc\u7684utf-8\uff0c\u525b\u525b\u6709\u8aaa\u904e\u9019\u4e32\u7e3d\u5171\u4f54\u4e869 bytes\u3002\n\u4f46\u662f\u8f49\u63db\u6210\u5341\u516d\u9032\u4f4d\u578b\u614b\u7684\u5b57\u4e32\uff0c\u9577\u5ea6\u537b\u8b8a\u6210\u4e8618 bytes\uff0c\u8db3\u8db3\u8b8a\u5927\u4e861\u500d\uff0c\u9019\u662f\u600e\u9ebc\u56de\u4e8b\u5462\uff1f"}),"\n",(0,t.jsx)(n.p,{children:"\u539f\u56e0\u662f\uff0c\u539f\u672c\u7684\u6bcf\u4e00\u500bASCII\u90fd\u4f541 byte\uff0c\u6216\u8005\u4e2d\u6587\u8f49\u62103 bytes\u5f8c\uff0c1\u500bByte\u662f8 bits\uff0c\u800c8 bits\u5176\u5be6\u53ef\u4ee5\u62c6\u62104 + 4 bits\u4f86\u770b\u3002"}),"\n",(0,t.jsx)(n.p,{children:"4\u500bBits\u6307\u7684\u662f2\u76844\u6b21\u65b9\uff0c\u5176\u53ef\u8868\u793a\u7684\u6578\u503c\u7bc4\u570d\u70ba0~15\uff0c\u6070\u6070\u597d\u5c31\u662f\u5341\u516d\u9032\u4f4d\u7684\u8868\u793a\u7bc4\u570d\u3002\n\u56e0\u6b64\u6bcf\u4e00\u500bbyte\uff0c\u6703\u62c6\u6210\u4ee52\u500b\u5341\u516d\u9032\u4f4d\u65b9\u5f0f\u986f\u793a\u3002"}),"\n",(0,t.jsxs)(n.p,{children:["\u6211\u5011\u82e5\u76f4\u63a5\u5c07\u300c\u6c38\u8c50API\u300d\u9019\u5e7e\u500butf-8\u7684\u5b57\u4e32\u8f49\u6210\u771f\u6b63bytearray\u7684\u4e8c\u9032\u4f4d\uff0c\u5176\u5be6\u662f\u9577\u9019\u500b\u6a23\u5b50\uff1a\n",(0,t.jsx)(n.img,{src:"https://ithelp.ithome.com.tw/upload/images/20210922/20130354obx8xJLqRb.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210922/20130354obx8xJLqRb.png"})]}),"\n",(0,t.jsxs)(n.p,{children:["\u6211\u5011\u5c31\u62ff\u7b2c\u4e00\u500bbyte\u4f86\u770b\uff1a",(0,t.jsx)(n.code,{children:"11100110"}),"\uff0c\u9019\u88e1\u5176\u5be6\u5c31\u53ea\u6709",(0,t.jsx)(n.code,{children:"8 bits"}),"\u7684\u7a7a\u9593\u3002\n\u4f46\u525b\u525b\u8aaa\u5230\u6bcf4\u500bbits\u5c31\u53ef\u89e3\u6790\u4e00\u500b\u5b8c\u6574\u7684\u5341\u516d\u9032\u4f4d\uff0c\u56e0\u6b64\u4e0a\u8ff0\u53ef\u62c6\u6210",(0,t.jsx)(n.code,{children:"1110"}),"\u8207",(0,t.jsx)(n.code,{children:"0110"}),"\u3002\n\u800c",(0,t.jsx)(n.code,{children:"1110"}),'\u4ee510\u9032\u5236\u4f86\u770b\uff0c\u70ba14\uff0c\u800c\u5728\u5341\u516d\u9032\u5236\u5c31\u662f"e"\u3002\n',(0,t.jsx)(n.code,{children:"0110"}),'\u4ee510\u9032\u5236\u4f86\u770b\uff0c\u70ba6\uff0c\u800c\u5728\u5341\u516d\u9032\u5236\u5c31\u662f"6"\u3002']}),"\n",(0,t.jsxs)(n.p,{children:["\u9084\u8a18\u5f97\u6211\u5011\u524d\u9762\u5c07\u300c\u6c38\u8c50API\u300d\u9019\u5e7e\u500b\u5b57\u4e32\u8f49\u51fa\u4f86\u7684\u5341\u516d\u9032\u4f4d\u55ce\uff1f ",(0,t.jsx)(n.code,{children:"e6b0b8e8b190415049"}),"\uff0c\u524d\u9762\u5169\u4f4d\u5c31\u662f",(0,t.jsx)(n.code,{children:"e6"}),"\u3002\n\u90a3",(0,t.jsx)(n.code,{children:"e6"}),"\u9019\u500b\u539f\u672c\u5f9e8 bits\u62c6\u89e3\u51fa\u4f86\u7684\u503c\uff0c\u82e5\u786c\u751f\u751f\u8981\u5c072\u500b\u5b57\u5143\u8f38\u51fa\u6642\uff0c\u5be6\u969b\u4e0a\u4f54\u7528\u7a7a\u9593\u662f",(0,t.jsx)(n.strong,{children:"2 bytes (16 bits)"}),"\u3002(\u8f38\u51fa\u70ba\uff1a",(0,t.jsx)(n.code,{children:"01100101"})," ",(0,t.jsx)(n.code,{children:"00110110"}),")\u56e0\u6b64\u4f7f\u7528\u9019\u500b\u65b9\u5f0f\uff0c\u6703\u9020\u6210\u50b3\u9001\u91cf\u76f4\u63a5\u653e\u5927\u4e00\u500d\uff0c\u662f\u6210\u6548\u8f03\u4f4e\u7684\u4f5c\u6cd5\u3002"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{src:"https://ithelp.ithome.com.tw/upload/images/20210923/20130354tCjcxDJAFz.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210923/20130354tCjcxDJAFz.png"})}),"\n",(0,t.jsxs)(n.p,{children:["\u756b\u500b\u5716\u4f86\u8aaa\u660e\uff0c\u61c9\u8a72\u6703\u6bd4\u8f03\u597d\u61c2\u3002\n",(0,t.jsx)(n.img,{src:"https://ithelp.ithome.com.tw/upload/images/20210923/20130354F52cchreBD.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210923/20130354F52cchreBD.png"})]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u539f\u672c1 byte (8 bits)\uff0c\u5c07\u5de64\u53f34 bits\u62c6\u51fa2\u500b\u5341\u516d\u9032\u4f4d\u8868\u793a"}),"\n",(0,t.jsx)(n.li,{children:"\u4f46\u82e5\u5c07\u90192\u500b\u5341\u516d\u9032\u4f4d\u518d\u4ee5\u300c\u5b57\u4e32\u300d\u4f86\u8f49\u51fa\uff0c\u7121\u8ad6\u662fASCII\u6216utf-8\uff0c\u7d14\u82f1\u6578\u5b57\u90fd\u662f\u4f541 byte (8 bits)"}),"\n",(0,t.jsx)(n.li,{children:"\u56e0\u6b64\u67092\u500b\u5341\u516d\u9032\u4f4d\uff0c\u4e00\u5171\u8b8a\u6210\u4e862 bytes"}),"\n",(0,t.jsx)(n.li,{children:"\u5f9e\u539f\u672c1 byte \u2192 \u8b8a\u6210\u4e862 bytes\uff0c\u4f54\u7528\u5bb9\u91cf\u8b8a\u62102\u500d\u5927\u5c0f\u3002"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"\u82e5\u4f7f\u7528Base64\u7684\u7de8\u78bc\u65b9\u5f0f\uff0c\u4e00\u6a23\u53ef\u53d6\u5176\u5747\u70ba\u53ef\u8996\u5b57\u5143\uff0c\u4e0d\u6703\u9020\u6210\u4e82\u78bc\u4e4b\u5916\uff0c\u7a7a\u9593\u8017\u7528\u4e5f\u8f03\u5341\u516d\u9032\u4f4d\u7bc0\u7701\u7684\u591a\u3002\u76ee\u524d\u5ee3\u6cdb\u88ab\u904b\u7528\u5728\u8a31\u591a\u7db2\u9801\u50b3\u53c3\u6578\u6216API\u50b3\u9001\u904b\u7528\u4e0a\uff0c\u751a\u81f3\u53ef\u4f5c\u70ba\u7db2\u9801\u5716\u7247\u7684\u904b\u7528\u3002"}),"\n",(0,t.jsx)(n.h3,{id:"base64\u57fa\u790e\u539f\u7406\u5feb\u901f\u8b1b",children:"Base64\u57fa\u790e\u539f\u7406\u5feb\u901f\u8b1b"}),"\n",(0,t.jsxs)(n.p,{children:["\u65e2\u7136\u90fd\u63d0\u5230Base64\u4e86\uff0c\u5c31\u5f88\u5feb\u901f\u7684\u8aaa\u660e\u4e00\u4e0b\u3002\u5148\u524d\u63d0\u5230\u5341\u516d\u9032\u4f4d\uff0c\u5982\u679c\u62ff\u4f86\u505a\u70ba\u50b3\u8f38\u7528\u9014\uff0c\u6709\u4e00\u500b\u597d\u8655\u662f\u4ed6\u4f7f\u7528\u4e86\u6578\u5b570",(0,t.jsx)(n.del,{children:"9\u4ee5\u53ca\u82f1\u6587A"}),"F (\u5148\u4e0d\u7ba1\u5927\u5c0f\u5beb)\u3002\u7e3d\u4e4b\uff0c\u4ed6\u82e5\u62ff\u4f86\u7576\u4f5c\u5b57\u4e32\u50b3\u905e\u4f7f\u7528\uff0c\u88e1\u9762\u7684\u6bcf\u4e00\u500b\u5b57\u5143\u7684\u5b57\u5c31\u53ea\u6703\u5728\u901916\u500b\u7bc4\u570d\u5167\uff0c\u7576\u7136\u4ed6\u5011\u90fd\u662f\u53ef\u5217\u5370\u5b57\u5143\u3002\u4e0d\u904e\u7f3a\u9ede\u525b\u525b\u4e0a\u9762\u5df2\u8aaa\u660e\uff0c\u9019\u6a23\u5b50\u5bb9\u91cf\u6703\u7acb\u523b\u8b8a\u62102\u500d\u5927\u3002"]}),"\n",(0,t.jsxs)(n.p,{children:["\u6240\u8b0216\u9032\u4f4d\uff0c\u5c31\u662f\u4f7f\u7528\u4e864-bit\u7684\u4e8c\u9032\u4f4d\u5236 (2\u76844\u6b21\u65b9)\uff0c\u53ef\u5f9e\u88e1\u9762\u8868\u793a\u51fa0",(0,t.jsxs)(n.del,{children:["15\u7684\u503c\u57df\u3002\u800cBase64\u5247\u662f\u4f7f\u7528\u4e86",(0,t.jsx)(n.strong,{children:"6-bit"}),"\u7684\u65b9\u5f0f(2\u76846\u6b21\u65b9)\uff0c\u56e0\u6b64\u53ef\u8868\u793a\u51fa0"]}),"63\u7bc4\u570d\u5167\u768464\u7a2e\u503c\u57df\u3002"]}),"\n",(0,t.jsx)(n.p,{children:"\u901964\u500b\u503c\u57df\u90fd\u6703\u662f\u53ef\u5217\u5370\u5b57\u5143\uff0c\u597d\u8655\u5148\u524d\u5df2\u8aaa\u904e\uff0c\u662f\u9019\u6a23\u4f86\u7684\uff1a"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["\u6578\u5b57",(0,t.jsx)(n.code,{children:"0~9"}),"\uff0c10\u500b"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["\u5c0f\u5beb\u82f1\u6587",(0,t.jsx)(n.code,{children:"a~z"}),"\uff0c26\u500b"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["\u5927\u5beb\u82f1\u6587",(0,t.jsx)(n.code,{children:"A~Z"}),"\uff0c26\u500b\n\u4e0a\u9762\u52a0\u8d77\u4f86\uff0c\u4e00\u5171\u662f62\u500b\u4e86"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["\u518d\u52a0\u4e0a\u5169\u500b\u53ef\u5217\u5370\u5b57\u5143",(0,t.jsx)(n.code,{children:"+"}),"\u8207",(0,t.jsx)(n.code,{children:"/"}),"\n\u7e3d\u5171\u5c31\u670964\u500b\u503c\u57df\u53ef\u4f7f\u7528\u3002"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["\u63a5\u4e0b\u4f86\u5be6\u4f5c\u8aaa\u660e\u4e00\u4e0b\uff0c\u7531\u65bcBase64\u63a1\u7528\u4e866-bit\u53bb\u5207\u5272\u5143\u672c\u7684bytes\uff0c\u56e0\u6b64\u53e6\u5916\u9700\u8981\u8003\u616e\u7684\u662f\u82e5\u7121\u6cd5\u88ab\u525b\u597d\u6574\u9664\u7684\u8a71\uff0c\u6700\u53f3\u5074\u5c3e\u78bc\u8981\u88dc0\u4e26\u8f49\u51fa\u6642\u5e36\u5165",(0,t.jsx)(n.code,{children:"="}),"\u6a19\u793a\u70bapadding\u7528\u9014\u3002"]}),"\n",(0,t.jsxs)(n.p,{children:["\u9644\u4e0a\u4e00\u5f35Wikipedia\u7684\u5716\u8868\u4f5c\u89e3\u8aaa\uff1a\n",(0,t.jsx)(n.img,{src:"https://ithelp.ithome.com.tw/upload/images/20210923/201303540hxeBSK7iB.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210923/201303540hxeBSK7iB.png"})]}),"\n",(0,t.jsxs)(n.p,{children:["Wikipedia\u7684Base64 \u7d22\u5f15\u8868\uff1a\n",(0,t.jsx)(n.img,{src:"https://ithelp.ithome.com.tw/upload/images/20210923/20130354jJO4Gpd6JZ.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210923/20130354jJO4Gpd6JZ.png"})]}),"\n",(0,t.jsx)(n.h4,{id:"\u628a\u5341\u516d\u9032\u4f4d\u8207base64\u4f5c\u500b\u6bd4\u8f03",children:"\u628a\u5341\u516d\u9032\u4f4d\u8207Base64\u4f5c\u500b\u6bd4\u8f03"}),"\n",(0,t.jsx)(n.p,{children:"\u70ba\u4e86\u65b9\u4fbf\u7406\u89e3\uff0c\u6211\u76f4\u63a5\u8209\u4e00\u500b\u53ef\u4ee5\u88ab3 bytes\u6574\u9664\u7684\u4f8b\u5b50(\u56e0\u70ba6\u82078\u7684\u6700\u5c0f\u516c\u500d\u6578\u662f24 bits\uff0c\u53733 bytes)\u3002\n\u82e5\u539f\u672c\u67093 bytes (24 bits)\u7684\u8cc7\u6599\uff0c\u82e5\u4ee5\u5341\u516d\u9032\u4f4d\u7684\u65b9\u5f0f\u6bcf4-bit\u5207\u5272\u6cd5\u6703\u7522\u751f6\u500b\u5341\u516d\u9032\u4f4d\u503c\u57df\u7684\u5b57\u5143\uff0c\u518d\u8f49\u63db\u6210\u7d14\u5b57\u4e32\u6642\u6703\u4f54\u75286 bytes (48 bits)\u3002"}),"\n",(0,t.jsx)(n.p,{children:"\u82e5\u4f7f\u7528\u4e86Base64\u4f86\u5207\u5272\uff0c\u6bcf6-bit\u9032\u884c\u5207\u5272\uff0c\u50c5\u6703\u5207\u51fa4\u500bBased64\u503c\u57df\u7684\u5b57\u5143\uff0c\u56e0\u6b64\u4e00\u6a23\u7684\u6211\u5011\u5c07\u9019\u4e9b\u53ef\u5217\u5370\u5b57\u5143\u8f49\u6210\u4e00\u822c\u5b57\u4e32\u8f38\u51fa\u6642\uff0c\u6703\u4f54\u75284 bytes (32 bits)\u3002"}),"\n",(0,t.jsx)(n.p,{children:"\u56e0\u6b64\uff1a"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u539f\u672c24 bits"}),"\n",(0,t.jsxs)(n.li,{children:["\u8f49\u6210\u5341\u516d\u9032\u4f4d\u8868\u793a\u7684\u5b57\u4e32\u5927\u5c0f\u8b8a\u70ba48 bits\uff1a\u589e\u9577\u7387",(0,t.jsx)(n.strong,{children:"100%"})]}),"\n",(0,t.jsxs)(n.li,{children:["\u8f49\u6210Base64\u8868\u793a\u7684\u5b57\u4e32\u5927\u5c0f\u8b8a\u70ba32 bits\uff1a\u589e\u9577\u7387",(0,t.jsx)(n.strong,{children:"33.33%"})]}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"\u5be6\u4f8b\u89e3\u8aaa",children:"\u5be6\u4f8b\u89e3\u8aaa"}),"\n",(0,t.jsx)(n.p,{children:"\u518d\u4f7f\u7528\u300c\u6c38\u8c50API\u300d\u9019\u500butf-8\u5b57\u4e32\uff0c\u5148\u8f49\u6210binary\u770b\u4e00\u4e0b\u4ed6\u7684\u539f\u59cbbytes\u6a21\u6a23\uff0c\u4e4b\u524d\u4e5f\u8aaa\u904e\u7e3d\u5171\u4f54\u4e869 bytes\u3002"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"11100110 10110000 10111000 11101000 10110001 10010000 01000001 01010000 01001001\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{src:"https://ithelp.ithome.com.tw/upload/images/20210923/20130354imyrQ2VOyO.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210923/20130354imyrQ2VOyO.png"})}),"\n",(0,t.jsxs)(n.p,{children:["\u518d\u4f86\u5c31\u662f\u5c07\u9019\u4e9bbinary\u8f49\u63db\u621016\u9032\u4f4d\u8868\u793a\uff0c\u7d50\u679c\u70ba",(0,t.jsx)(n.code,{children:"E6B0B8E8B190415049"}),"\uff1a"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{src:"https://ithelp.ithome.com.tw/upload/images/20210923/20130354Ghlp88bDKt.png",alt:"https://ithelp.ithome.com.tw/upload/images/20210923/20130354Ghlp88bDKt.png"})}),"\n",(0,t.jsxs)(n.p,{children:["\u82e5\u662f\u6211\u5011\u5c07binary\u8f49\u6210Base64\u7684\u65b9\u5f0f\u8868\u793a\uff0c\u7d50\u679c\u70ba",(0,t.jsx)(n.code,{children:"5rC46LGQQVBJ"}),"\uff0c\u5149\u770b\u5b57\u4e32\u5c31\u53ef\u4ee5\u77e5\u9053\u6bd4\u4e0a\u9762\u5341\u516d\u9032\u4f4d\u77ed\u4e86\u3002\n\u63a5\u4e0b\u4f86\u7528Python\u5be6\u4f5c\u4e00\u4e0b\uff0c\u53ef\u4ee5\u89c0\u5bdf\u5176\u4e2d\u6240\u4f54\u7528\u7684\u7a7a\u9593\u5927\u5c0f\u4ee5\u53ca\u8f49\u6210\u5b57\u4e32\u5f8c\u7684\u589e\u91cf\u6bd4\u4f8b\u3002"]}),"\n",(0,t.jsxs)(n.p,{children:["\u56e0\u70ba\u6709\u4f7f\u7528Base64\u6a21\u7d44\uff0c\u8a18\u5f97",(0,t.jsx)(n.code,{children:"import base64"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:'ch_01_str = "\u6c38\u8c50API"\nch_01_ba_encoded = ch_01_str.encode("utf-8")\nprint("ch_01_ba_encoded: {}".format(ch_01_ba_encoded))\n# Output: ch_01_ba_encoded: b\'\\xe6\\xb0\\xb8\\xe8\\xb1\\x90API\'\n\nlen_ori_str = len(ch_01_ba_encoded)\nprint("Len of ch_01_ba_encoded: {}".format(len_ori_str))\n# Output: Len of ch_01_ba_encoded: 9\n\nch_hex_01_str_encoded = ch_01_ba_encoded.hex()\nprint("ch_hex_01_str_encoded: {}".format(ch_hex_01_str_encoded)) \n# Output: ch_hex_01_str_encoded: e6b0b8e8b190415049\n\nlen_hex_str = len(ch_hex_01_str_encoded)\nprint("Len of Hex String: {}, \u589e\u91cf\uff1a{:.2%} ".format(len_hex_str, (len_hex_str-len_ori_str)/len_ori_str))\n# Output: Len of Hex String: 18, \u589e\u91cf\uff1a100.00% \n\nimport base64\nch_hex_01_base64 = base64.b64encode(ch_01_ba_encoded).decode("utf-8")\nprint("ch_hex_01_base64: {}".format(ch_hex_01_base64))\n# Output: ch_hex_01_base64: 5rC46LGQQVBJ\n\nlen_base64_str = len(ch_hex_01_base64)\nprint("Len of Base64 String: {}, \u589e\u91cf\uff1a{:.2%} ".format(len_base64_str, (len_base64_str-len_ori_str)/len_ori_str))\n# Output: Len of Base64 String: 12, \u589e\u91cf\uff1a33.33% \n\n'})}),"\n",(0,t.jsx)(n.h4,{id:"\u984d\u5916\u88dc\u5145",children:"\u984d\u5916\u88dc\u5145"}),"\n",(0,t.jsxs)(n.p,{children:["\u6709\u95dcBase64\u6700\u5f8c\u572862\u500b\u4e4b\u5916\u518d\u52a0\u4e0a\u7684\u6700\u5f8c2\u500b\u5b57\u5143\uff1a",(0,t.jsx)(n.code,{children:"+"}),"\u8207",(0,t.jsx)(n.code,{children:"/"}),"\uff0c\u9019\u90e8\u4efd\u5728\u67d0\u4e9b\u60c5\u5883\u4e0a\u4f7f\u7528\u662f\u6703\u9020\u6210\u6df7\u6dc6\u7684\u3002\u5074\u5982",(0,t.jsx)(n.code,{children:"/"}),"\u7528\u5728URL\u7db2\u5740\u5217\u6642\uff0c\u5c31\u6703\u548c\u539f\u672c\u7db2\u5740\u7684",(0,t.jsx)(n.code,{children:"/"}),"\u9020\u6210\u4f7f\u7528\u4e0a\u7684\u885d\u7a81\u3002\u56e0\u6b64\u91dd\u5c0d\u4e0d\u540c\u7684\u6700\u5f8c2\u500b\u5b57\u5143\u9078\u7528\uff0c\u4f9d\u60c5\u5883\u4e0a\u53c8\u6709\u767c\u5c55\u51fa\u4e0d\u4e00\u6a23\u7684\u8a2d\u8a08\uff0c\u4f8b\u5982\u90a3\u5169\u500b\u5b57\u5143\u6539\u6210",(0,t.jsx)(n.code,{children:"-"}),"\u8207",(0,t.jsx)(n.code,{children:"_"}),"\u3002\u4f46\u6709\u4e00\u597d\u6c92\u5169\u597d\uff0c\u5982\u679c\u628aBase64\u53c8\u6539\u7528\u5728",(0,t.jsx)(n.strong,{children:"\u6b63\u898f\u8868\u793a\u5f0f(Regular Expression)"}),"\uff0c\u53c8\u6703\u6709\u539f\u7b26\u865f\u5728\u88e1\u9762\u6709\u7279\u6b8a\u7528\u9014\uff0c\u56e0\u6b64\u53c8\u767c\u5c55\u4e0d\u540c\u7684\u9069\u7528\u7248\u672c\u3002"]}),"\n",(0,t.jsx)(n.p,{children:"\u82e5\u5c0d\u6b64\u6709\u8208\u8da3\u7684\u8a71\uff0c\u53ef\u4ee5\u81ea\u884c\u5be6\u4f5c\uff0c\u96d6\u7136\u539f\u672c\u662f\u60f3\u8ac7\u8ac7\u5341\u516d\u9032\u4f4d\u8868\u793a\u6cd5\u7684\u5b57\u4e32\u589e\u9577\uff0c\u9806\u4fbf\u4e5f\u628a\u597d\u7528\u7684Base64\u6293\u9032\u4f86\u4e00\u8d77\u8b1b\u3002"})]})}function a(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>d,x:()=>r});var i=s(6540);const t={},c=i.createContext(t);function d(e){const n=i.useContext(c);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),i.createElement(c.Provider,{value:n},e.children)}}}]);