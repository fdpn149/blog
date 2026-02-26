import{r as i,a as g,u as x,j as e,L as l}from"./index-Bjup3e7g.js";/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=(...n)=>n.filter((t,s,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===s).join(" ").trim();/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=n=>n.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,s,o)=>o?o.toUpperCase():s.toLowerCase());/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=n=>{const t=N(n);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var k={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=n=>{for(const t in n)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=i.forwardRef(({color:n="currentColor",size:t=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:c="",children:r,iconNode:p,...m},_)=>i.createElement("svg",{ref:_,...k,width:t,height:t,stroke:n,strokeWidth:o?Number(s)*24/Number(t):s,className:b("lucide",c),...!r&&!y(m)&&{"aria-hidden":"true"},...m},[...p.map(([h,u])=>i.createElement(h,u)),...Array.isArray(r)?r:[r]]));/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=(n,t)=>{const s=i.forwardRef(({className:o,...c},r)=>i.createElement(C,{ref:r,iconNode:t,className:b(`lucide-${j(v(n))}`,`lucide-${n}`,o),...c}));return s.displayName=v(n),s};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],f=d("book-open",L);/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],A=d("house",w);/**
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
 */const H=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],T=d("x",H),B="_sidebarHeader_7tge0_15",z="_active_7tge0_111",W="_appContainer_7tge0_12",P="_mobileHeader_7tge0_12",E="_menuBtn_7tge0_346",F="_mainLayout_7tge0_12",O="_sidebar_7tge0_12",R="_open_7tge0_386",U="_brandLink_7tge0_409",Z="_brandTitle_7tge0_420",D="_brandSubtitle_7tge0_428",K="_navConfig_7tge0_435",V="_navSectionLabel_7tge0_444",X="_navItem_7tge0_455",q="_navIcon_7tge0_477",G="_sidebarFooter_7tge0_481",J="_contentArea_7tge0_490",Q="_bgPattern_7tge0_500",Y="_contentWrapper_7tge0_512",ee="_overlay_7tge0_528",a={sidebarHeader:B,active:z,appContainer:W,mobileHeader:P,menuBtn:E,mainLayout:F,sidebar:O,open:R,brandLink:U,brandTitle:Z,brandSubtitle:D,navConfig:K,navSectionLabel:V,navItem:X,navIcon:q,sidebarFooter:G,contentArea:J,bgPattern:Q,contentWrapper:Y,overlay:ee},te=({children:n,sidebar:t})=>{const[s,o]=i.useState(!1),c=g(),r=x(),p=c.pathname==="/",m=c.pathname.startsWith("/tutorials"),_=h=>{h.preventDefault(),r("/"),window.history.replaceState(null,"","/blog/")};return e.jsxs("div",{className:a.appContainer,children:[e.jsxs("header",{className:a.mobileHeader,children:[e.jsxs(l,{to:"/",className:a.brandLink,onClick:_,children:[e.jsx("h1",{className:a.brandTitle,children:"波峰小棧"}),e.jsx("p",{className:a.brandSubtitle,children:"Metro Learning Station"})]}),e.jsx("button",{className:a.menuBtn,onClick:()=>o(!s),children:s?e.jsx(T,{size:24}):e.jsx(I,{size:24})})]}),e.jsxs("div",{className:a.mainLayout,children:[e.jsx("aside",{className:`${a.sidebar} ${s?a.open:""}`,children:t||e.jsxs(e.Fragment,{children:[e.jsx("div",{className:a.sidebarHeader,children:e.jsxs(l,{to:"/",className:a.brandLink,onClick:_,children:[e.jsx("h1",{className:a.brandTitle,children:"波峰小棧"}),e.jsx("p",{className:a.brandSubtitle,children:"Metro Learning Station"})]})}),e.jsxs("nav",{className:a.navConfig,children:[e.jsxs(l,{to:"/",className:`${a.navItem} ${p?a.active:""}`,children:[e.jsx(A,{size:20,className:a.navIcon}),e.jsx("span",{className:a.navText,children:"首頁大廳"})]}),e.jsx("div",{className:a.navSectionLabel,children:"學習路線"}),e.jsxs(l,{to:"/tutorials/AndroidApp開發",className:`${a.navItem} ${m?a.active:""}`,children:[e.jsx(f,{size:20,className:a.navIcon}),e.jsx("span",{className:a.navText,children:"Android App 開發"})]}),e.jsx("div",{className:a.navSectionLabel,children:"系統"}),e.jsxs(l,{to:"/settings",className:`${a.navItem}`,children:[e.jsx(M,{size:20,className:a.navIcon}),e.jsx("span",{className:a.navText,children:"設定"})]})]}),e.jsx("div",{className:a.sidebarFooter,children:e.jsx("p",{children:"© 2024 Bofeng"})})]})}),e.jsxs("main",{className:a.contentArea,children:[e.jsx("div",{className:a.bgPattern}),e.jsx("div",{className:a.contentWrapper,children:n})]})]}),s&&e.jsx("div",{className:a.overlay,onClick:()=>o(!1)})]})};export{te as M,d as c,a as s};
