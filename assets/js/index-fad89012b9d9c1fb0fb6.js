!function(t){function e(e){for(var r,o,s=e[0],c=e[1],u=e[2],l=0,f=[];l<s.length;l++)o=s[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);for(d&&d(e);f.length;)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},o={3:0},a={3:0},i=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(t){var e=[];o[t]?e.push(o[t]):0!==o[t]&&{1:1,2:1}[t]&&e.push(o[t]=new Promise((function(e,n){for(var r="assets/css/"+({1:"HomeContent",2:"ListContent"}[t]||t)+"-chunk-"+{1:"19d970749cb8b7e5d318",2:"36dcfb34c60e453c15a2"}[t]+".css",a=s.p+r,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var u=(d=i[c]).getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(u===r||u===a))return e()}var l=document.getElementsByTagName("style");for(c=0;c<l.length;c++){var d;if((u=(d=l[c]).getAttribute("data-href"))===r||u===a)return e()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=e,f.onerror=function(e){var r=e&&e.target&&e.target.src||a,i=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[t],f.parentNode.removeChild(f),n(i)},f.href=a,document.getElementsByTagName("head")[0].appendChild(f)})).then((function(){o[t]=0})));var n=a[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise((function(e,r){n=a[t]=[e,r]}));e.push(n[2]=r);var i,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=function(t){return s.p+"assets/js/"+({1:"HomeContent",2:"ListContent"}[t]||t)+"-chunk-"+{1:"dc28200f529f74c745c6",2:"86e0f9ffdb9cdffd738c"}[t]+".js"}(t);var u=new Error;i=function(e){c.onerror=c.onload=null,clearTimeout(l);var n=a[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;u.message="Loading chunk "+t+" failed.\n("+r+": "+o+")",u.name="ChunkLoadError",u.type=r,u.request=o,n[1](u)}a[t]=void 0}};var l=setTimeout((function(){i({type:"timeout",target:c})}),12e4);c.onerror=c.onload=i,document.head.appendChild(c)}return Promise.all(e)},s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/interview20201110/",s.oe=function(t){throw console.error(t),t};var c=window.webpackJsonp=window.webpackJsonp||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var d=u;i.push([0,0]),n()}({0:function(t,e,n){t.exports=n("QfWi")},QfWi:function(t,e,n){"use strict";n.r(e);var r=n("6DIm"),o=n("8VmE"),a=n.n(o),i=n("lOrp"),s=!1,c={name:"APP",components:{},data:function(){return{showMenu:!1,scrollLocked:!1,goingToHome:!1}},computed:a()({},Object(i.c)({loading:"loading",loadingMsg:"loadingMsg"}),{containerClasses:function(){return{"has-nav":!this.$route.meta.noNavbar,"is-white":this.$route.meta.isWhite}}}),watch:{$route:function(t,e){"Home"===t.name?this.goingToHome=!0:this.goingToHome=!1;var n=document.body.classList;"index"===t.name?n.add("intro-bg"):n.remove("intro-bg")}},updated:function(){},mounted:function(){var t=this;if(this.$root.$on("lockScroll",(function(e){t.scrollLocked=!!e})),!s)try{var e=document.querySelector("body");["gesturestart","gesturechange","gestureend"].forEach((function(t){e.addEventListener(t,(function(t){t.preventDefault()}))}));var n=0;document.addEventListener("touchend",(function(t){var e=(new Date).getTime();e-n<=300&&t.preventDefault(),n=e}),!1),s=!0}catch(t){}},methods:{}},u=n("psIG"),l=Object(u.a)(c,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{ref:"app",staticClass:"app",attrs:{id:"app"}},[e("transition",{attrs:{name:"fadePage"}},[e("router-view",{ref:"routerView",staticClass:"router-view zi-1"})],1),this.loading?[e("transition",{attrs:{name:"fade"}},[e("div",{staticClass:"position-top-left full-screen-loading"},[this.loadingMsg?e("span",{staticClass:"loading-message"},[this._v(this._s(this.loadingMsg))]):this._e()])])]:this._e()],2)}),[],!1,null,null,null).exports,d=(n("NWv/"),n("g34q")),f=n.n(d),p=(n("tHXl"),n("nYUH")),g=n.n(p),h=n("XOZl"),m=n("eeH6"),v=n("NthX"),y=n.n(v),b=n("fFdx"),w=n.n(b),E=n("SvlV"),P=document.createElement("script");P.src="https://www.googletagmanager.com/gtag/js?id=UA-116251394-1",P.async=!0;var S=document.createElement("script");S.innerHTML="window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());";var L=document.querySelector("head");L.insertBefore(S,L.firstChild),L.insertBefore(P,L.firstChild),L.appendChild(P),L.appendChild(S);var O,j={namespaced:!0,state:{},getters:{},actions:{callGaPage:function(t,e){var n;t.commit,t.dispatch,t.state;void 0===e&&(e={});var r=window.location.href.replace(/https?:\/\/[\w.:]+\//,"/");"function"==typeof(null===(n=window)||void 0===n?void 0:n.gtag)&&window.gtag("config","UA-116251394-1",{page_title:e.title||r,page_path:e.path||r})},callGaButton:function(t,e){var n;t.commit,t.dispatch,t.state;"function"==typeof(null===(n=window)||void 0===n?void 0:n.gtag)&&window.gtag("event","click",{event_category:e,event_label:e})}},mutations:{},modules:{}},_="function"==typeof Promise.allSettled,k=function t(e){if("object"!=typeof e)return{src:"string"==typeof e?e:"",loaded:!1,img:null};var n=Array.isArray(e)?[]:{};return Object.keys(e).forEach((function(r){n[r]=t(e[r])})),n}({common:{},index:{}}),M={load:function(t,e){t.commit;var n=t.dispatch,r=t.state,o=Array.isArray(e)?e:[e],a=[];return o.forEach((function(t){for(var e,n="string"==typeof t||"number"==typeof t?(""+t).split("/"):[],o=r,i=100;(e=n.shift())&&(o=o[e]||{},!(--i<0)););(function t(e){if("object"!=typeof e)return[];if(Object.prototype.hasOwnProperty.call(e,"src")&&Object.prototype.hasOwnProperty.call(e,"loaded"))return[e];var n=[];return Object.keys(e).forEach((function(r){n.push(t(e[r]))})),n.flat(1/0)})(o).forEach((function(t){var e;t.loaded&&t.img||a.push((e=t.src,new Promise((function(t,n){try{var r=new Image;r.onload=function(){t(r)},r.onerror=function(){n(r)},r.src=e}catch(t){n(t)}}))).then((function(e){return t.loaded=!0,t.img=e,e})))}))})),a.length&&n("setImageLoading",!0,{root:!0}),_?Promise.allSettled(a).then((function(t){return n("setImageLoading",!1,{root:!0}),t})):Promise.all(a.map((function(t){return t.then((function(t){return t}),(function(t){return t}))}))).then((function(t){return n("setImageLoading",!1,{root:!0}),t}))}},C={namespaced:!0,state:k,getters:a()({},(O={},function t(e){var n=[];return Object.keys(e).forEach((function(r){n.push({key:r,fun:function(){return e[r]}}),"object"!=typeof e[r]||e[r].src||t(e[r]).forEach((function(t){var e=t.key,o=t.fun;n.push({key:r+"/"+e,fun:o})}))})),n}(k).flat(1/0).forEach((function(t){var e=t.key,n=t.fun;O[e]=n})),O)),actions:M,mutations:{},modules:{}},x=function(t){return decodeURIComponent(atob(decodeURIComponent(t)))},N={namespaced:!0,state:{},getters:{},actions:{loadStorage:function(t,e){var n=t.commit;t.dispatch,t.state;n("loadStorage",{rootState:t.rootState})}},mutations:{loadStorage:function(t,e){var n=e.rootState;if(localStorage.share)try{var r=JSON.parse(x(localStorage.share));Object.keys(r).forEach((function(t){n.share.share[t]=r[t]}))}catch(t){}if(localStorage.shared)try{var o=JSON.parse(x(localStorage.shared));n.video.shared=o}catch(t){}}},modules:{}},A=n("czhI"),T=n.n(A);function D(){return(D=w()(y.a.mark((function t(e){var n,r,o,i,s,c,u;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.payload,r=void 0===n?{}:n,o=e.method,i=void 0===o?"post":o,s=e.url,c=e.headers,"object"==typeof r&&"string"==typeof s){t.next=3;break}return t.abrupt("return",!1);case 3:return t.next=5,T()(a()({method:"get"===i?"get":"post",url:s},"get"===i?{params:a()({},r)}:{data:r},c?{headers:c}:{})).then((function(t){return t})).catch((function(t){return t}));case 5:if(!((u=t.sent)instanceof Error)){t.next=10;break}throw u;case 10:return t.abrupt("return",u);case 11:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var I={namespaced:!0,state:{address:"",assets:[],noMore:!1},getters:{assets:function(t){return t.assets},noMore:function(t){return t.noMore}},actions:{read:function(t,e){var n=t.commit,r=(t.dispatch,t.state),o=(t.rootState,r.address),i=r.assets.length,s=a()({offset:0,limit:20},e);(function(t){return D.apply(this,arguments)})({method:"get",url:"https://api.opensea.io/api/v1/assets/",payload:{owner:""+o,offset:""+s.offset,limit:""+s.limit,order_direction:"desc"}}).then((function(t){var e=(null!=t?t:{}).data,o=(null!=e?e:{}).assets;Array.isArray(o)&&(n("setList",o),i===r.assets.length&&n("setNoMore",!0))})).catch((function(t){return t}))}},mutations:{setList:function(t,e){var n=t.assets,r=n.map((function(t){return t.id}));e.forEach((function(t){var e=t.id;r.includes(e)||n.push(t)}))},setAddress:function(t,e){t.address=e},setNoMore:function(t,e){t.noMore=!!e},reset:function(t,e){t.address="0x960DE9907A2e2f5363646d48D7FB675Cd2892e91",t.assets.splice(0),t.noMore=!1}},modules:{}};r.default.use(i.a);var H,V,R=new i.a.Store({state:{loading:!1,loadingMsg:"",imageLoading:!1,pageLoading:!1,accessed:!1},getters:{setLoading:function(t){return t.loading},loading:function(t){return t.loading||t.imageLoading||t.pageLoading},loadingMsg:function(t){return t.loadingMsg},images:function(t){return t.images}},actions:{setLoading:function(t,e){var n=t.commit;t.dispatch,t.state;n("setLoading",e)},setImageLoading:function(t,e){var n=t.commit;t.dispatch,t.state;n("setImageLoading",e)},setPageLoading:function(t,e){var n=t.commit;t.dispatch,t.state;n("setPageLoading",e)}},mutations:{setLoading:function(t,e){t.loading=!!e,t.loadingMsg="string"==typeof e?e:""},setImageLoading:function(t,e){t.imageLoading=!!e,t.loadingMsg||(t.loadingMsg="")},setPageLoading:function(t,e){t.pageLoading=!!e}},modules:{analytics:j,images:C,storage:N,list:I}}),U=(H=[],V=5,function(t,e){return void 0===e&&(e=5),H.splice(0),V=Number.isNaN(+e)?5:Math.abs(0|+e),function t(e,n){if(void 0===n&&(n=0),"object"!=typeof e)return e;if(H.includes(e))return"[duplicate object]";if(n>V)return"[exceed the limit of depth]";H.push(e);var r=Array.isArray(e)?[]:{};return Object.keys(e||{}).forEach((function(o){"function"!=typeof e[o]&&(r[o]=t(e[o],n+1))})),r}(t)});r.default.use(E.a);var B=[{path:"/",redirect:{name:"index"}},{path:"/index",name:"index",component:function(t){return Promise.all([n.e(0),n.e(1)]).then(function(){return t(n("wNbj"))}.bind(null,n)).catch(n.oe)},meta:{noNavbar:!0}},{path:"/list",name:"list",component:function(t){return Promise.all([n.e(0),n.e(2)]).then(function(){return t(n("Qdqs"))}.bind(null,n)).catch(n.oe)},meta:{noNavbar:!0}},{path:"/*",redirect:{name:"index"}}],q=(JSON.parse(JSON.stringify(Object({VUE_ENV:"client",publicPath:"/interview20201110/",mode:"hash",APP_ENV:"stage",DEV_MODE:!1,ORDER_REDIRECT:""}))),a()({publicPath:"/",mode:"history"},Object({VUE_ENV:"client",publicPath:"/interview20201110/",mode:"hash",APP_ENV:"stage",DEV_MODE:!1,ORDER_REDIRECT:""}))),J=q.publicPath,$=q.mode,W=[];E.a.prototype.references=W;var X=new E.a({mode:$,base:J,routes:B}),F=function(t,e){if("function"==typeof(null==R?void 0:R.dispatch))return R.dispatch(t,e)};X.beforeEach(function(){var t=w()(y.a.mark((function t(e,n,r){var o,a;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=null!=(o=null==R?void 0:R.state)?o:{},a.accessed||"index"===(null==e?void 0:e.name)?r():(F("storage/loadStorage"),r({name:"index"}));case 3:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}()),X.afterEach((function(t,e,n){var r;!function(t){var e=U(t,2);W.push(e)}(t),setTimeout((function(){F("setPageLoading",!1)}),0),(null!=(r=null==R?void 0:R.state)?r:{}).accessed=!0}));var G=X;r.default.use(f.a),h.a.registerPlugin(m.a),g.a.polyfill(),window.__forceSmoothScrollPolyfill__=!0,r.default.config.productionTip=!1,r.default.prototype.wait=function(t){return void 0===t&&(t=1),new Promise((function(e){return setTimeout(e,+t)}))},Promise.allSettled=Promise.allSettled||function(t){return new this((function(e,n){if("[object Array]"!==Object.prototype.toString.call(t))return n(new TypeError(typeof t+" "+t+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var r=Array.prototype.slice.call(t);if(0===r.length)return e([]);var o=r.length;function a(t,n){if("object"==typeof n){var a=n.then;"function"==typeof a&&a.call(n,(function(n){r[t]={status:"fulfilled",value:n},0==--o&&e(r)}),(function(n){r[t]={status:"rejected",reason:n},0==--o&&e(r)}))}}for(var i=0;i<r.length;i++)a(i,r[i])}))};new r.default({el:"#app",router:G,store:R,data:function(){return{}},mounted:function(){},methods:{},render:function(t){return t(l)}})},tHXl:function(t,e,n){}});