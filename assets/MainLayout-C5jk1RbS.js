import{r as i,u as x,a as j,j as e,L as l}from"./index-CP_n1Gl5.js";/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=(...t)=>t.filter((s,n,o)=>!!s&&s.trim()!==""&&o.indexOf(s)===n).join(" ").trim();/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(s,n,o)=>o?o.toUpperCase():n.toLowerCase());/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=t=>{const s=N(t);return s.charAt(0).toUpperCase()+s.slice(1)};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var k={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=t=>{for(const s in t)if(s.startsWith("aria-")||s==="role"||s==="title")return!0;return!1};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=i.forwardRef(({color:t="currentColor",size:s=24,strokeWidth:n=2,absoluteStrokeWidth:o,className:r="",children:c,iconNode:p,...m},_)=>i.createElement("svg",{ref:_,...k,width:s,height:s,stroke:t,strokeWidth:o?Number(n)*24/Number(s):n,className:b("lucide",r),...!c&&!y(m)&&{"aria-hidden":"true"},...m},[...p.map(([h,u])=>i.createElement(h,u)),...Array.isArray(c)?c:[c]]));/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=(t,s)=>{const n=i.forwardRef(({className:o,...r},c)=>i.createElement(g,{ref:c,iconNode:s,className:b(`lucide-${w(v(t))}`,`lucide-${t}`,o),...r}));return n.displayName=v(t),n};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],L=d("book-open",C);/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],A=d("house",f);/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],I=d("menu",S);/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],M=d("settings",$);/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],T=d("x",H),B="_sidebarHeader_1twcs_15",z="_active_1twcs_111",W="_appContainer_1twcs_12",P="_mobileHeader_1twcs_12",E="_menuBtn_1twcs_346",F="_mainLayout_1twcs_12",O="_sidebar_1twcs_12",R="_open_1twcs_386",U="_brandLink_1twcs_409",Z="_brandTitle_1twcs_420",D="_brandSubtitle_1twcs_428",K="_navConfig_1twcs_435",V="_navSectionLabel_1twcs_444",X="_navItem_1twcs_455",q="_navIcon_1twcs_477",G="_sidebarFooter_1twcs_481",J="_contentArea_1twcs_490",Q="_bgPattern_1twcs_500",Y="_contentWrapper_1twcs_512",ee="_overlay_1twcs_528",a={sidebarHeader:B,active:z,appContainer:W,mobileHeader:P,menuBtn:E,mainLayout:F,sidebar:O,open:R,brandLink:U,brandTitle:Z,brandSubtitle:D,navConfig:K,navSectionLabel:V,navItem:X,navIcon:q,sidebarFooter:G,contentArea:J,bgPattern:Q,contentWrapper:Y,overlay:ee},se=({children:t,sidebar:s})=>{const[n,o]=i.useState(!1),r=x(),c=j(),p=r.pathname==="/",m=r.pathname.startsWith("/tutorials"),_=h=>{h.preventDefault(),c("/"),window.history.replaceState(null,"","/blog/")};return e.jsxs("div",{className:a.appContainer,children:[e.jsxs("header",{className:a.mobileHeader,children:[e.jsxs(l,{to:"/",className:a.brandLink,onClick:_,children:[e.jsx("h1",{className:a.brandTitle,children:"波峰小棧"}),e.jsx("p",{className:a.brandSubtitle,children:"Metro Learning Station"})]}),e.jsx("button",{className:a.menuBtn,onClick:()=>o(!n),children:n?e.jsx(T,{size:24}):e.jsx(I,{size:24})})]}),e.jsxs("div",{className:a.mainLayout,children:[e.jsx("aside",{className:`${a.sidebar} ${n?a.open:""}`,children:s||e.jsxs(e.Fragment,{children:[e.jsx("div",{className:a.sidebarHeader,children:e.jsxs(l,{to:"/",className:a.brandLink,onClick:_,children:[e.jsx("h1",{className:a.brandTitle,children:"波峰小棧"}),e.jsx("p",{className:a.brandSubtitle,children:"Metro Learning Station"})]})}),e.jsxs("nav",{className:a.navConfig,children:[e.jsxs(l,{to:"/",className:`${a.navItem} ${p?a.active:""}`,children:[e.jsx(A,{size:20,className:a.navIcon}),e.jsx("span",{className:a.navText,children:"首頁大廳"})]}),e.jsx("div",{className:a.navSectionLabel,children:"學習路線"}),e.jsxs(l,{to:"/tutorials/AndroidApp開發",className:`${a.navItem} ${m?a.active:""}`,children:[e.jsx(L,{size:20,className:a.navIcon}),e.jsx("span",{className:a.navText,children:"Android App 開發"})]}),e.jsx("div",{className:a.navSectionLabel,children:"系統"}),e.jsxs(l,{to:"/settings",className:`${a.navItem}`,children:[e.jsx(M,{size:20,className:a.navIcon}),e.jsx("span",{className:a.navText,children:"設定"})]})]}),e.jsx("div",{className:a.sidebarFooter,children:e.jsx("p",{children:"© 2024 Bofeng"})})]})}),e.jsxs("main",{className:a.contentArea,children:[e.jsx("div",{className:a.bgPattern}),e.jsx("div",{className:a.contentWrapper,children:t})]})]}),n&&e.jsx("div",{className:a.overlay,onClick:()=>o(!1)})]})};export{se as M,d as c,a as s};
