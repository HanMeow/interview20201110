(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"1L2g":function(t,n,e){},I6yX:function(t,n,e){"use strict";e("1L2g")},Qdqs:function(t,n,e){"use strict";e.r(n);var a=e("NthX"),o=e.n(a),r=e("fFdx"),s=e.n(r),i=e("8VmE"),c=e.n(i),l=e("lOrp"),u=e("kgK7"),p=e.n(u),m=e("pGVJ"),f=e.n(m),h=e("gHe0"),v=e.n(h),d=e("VbvQ"),g=e.n(d),w=e("+4ik"),b=e.n(w),k=e("o88K"),x=e.n(k),_=e("eBf9"),I=e.n(_),O=e("iunt"),P=e.n(O),E=(JSON.parse(JSON.stringify(Object({VUE_ENV:"client",publicPath:"/interview20201110/",mode:"hash",APP_ENV:"stage",DEV_MODE:!1,ORDER_REDIRECT:""}))),{name:"List",components:{vanButton:p.a,vanCell:f.a,vanGrid:g.a,vanGridItem:b.a,vanImage:x.a,vanNavBar:I.a,vanPopup:v.a,vanSticky:P.a},mixins:[],data:function(){return{test:1,showPopup:!1,choosenItem:{name:"",image_url:"",description:"",permalink:"",collectionName:""}}},computed:c()({},Object(l.c)(["loading"]),Object(l.c)({assets:"list/assets",noMore:"list/noMore"}),{list:function(){var t=[];return this.assets.forEach((function(n,e){e%2==0?t.push([n]):t[t.length-1].push(n)})),t}}),watch:{},created:function(){},mounted:function(){var t=this;return s()(o.a.mark((function n(){return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.init();case 1:case"end":return n.stop()}}),n)})))()},updated:function(){},beforeDestroy:function(){},methods:c()({},Object(l.b)(["setLoading"]),Object(l.b)({read:"list/read"}),{init:function(){var t=this;return s()(o.a.mark((function n(){return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.wait(10);case 2:t.getList();case 3:case"end":return n.stop()}}),n)})))()},onScroll:function(t){var n=this.$refs.page,e=n.scrollTop,a=n.clientHeight;n.scrollHeight-e-a<100&&this.getList()},getList:function(){var t=this;return s()(o.a.mark((function n(){var e,a;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(e=t.noMore,a=t.assets,e){n.next=8;break}return t.setLoading("讀取中"),n.next=5,t.read({offset:a.length});case 5:return n.next=7,t.wait(100);case 7:t.setLoading(!1);case 8:case"end":return n.stop()}}),n)})))()},setPopup:function(t){var n=t.name,e=t.image_url,a=t.description,o=t.permalink,r=t.collection.name,s=this.choosenItem;s.name=n,s.image_url=e,s.description=a,s.permalink=o,s.collectionName=r,this.showPopup=!0}})}),y=(e("I6yX"),e("psIG")),L=Object(y.a)(E,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{ref:"page",staticClass:"w-100 h-100 style-page list-page py-9",on:{scroll:t.onScroll}},[e("van-nav-bar",{staticClass:"van-nav-bar-fixed w-100 position-top",attrs:{"left-text":"Back","left-arrow":""},nativeOn:{click:function(n){return t.$router.back()}}}),t._l(t.list,(function(n,a){return e("van-grid",{key:a,attrs:{clickable:"","column-num":2}},t._l(n,(function(n,o){return e("van-grid-item",{key:a+"-"+o,attrs:{text:n.name},on:{click:function(e){return t.setPopup(n)}}},[e("van-image",{attrs:{slot:"icon",src:n.image_url},slot:"icon"})],1)})),1)})),t.list.length?t._e():e("van-grid",{attrs:{"column-num":1}},[e("van-grid-item",{attrs:{icon:"clear",text:"無收藏品"}})],1),e("van-popup",{staticClass:"item-popup",attrs:{round:"",closeable:"","close-icon-position":"top-left",position:"bottom"},model:{value:t.showPopup,callback:function(n){t.showPopup=n},expression:"showPopup"}},[e("van-nav-bar",{staticClass:"w-100",attrs:{title:t.choosenItem.name}}),e("van-image",{attrs:{src:t.choosenItem.image_url}}),e("van-nav-bar",{staticClass:"w-100",attrs:{title:t.choosenItem.collectionName}}),e("p",{domProps:{textContent:t._s(t.choosenItem.description)}}),e("a",{attrs:{href:t.choosenItem.permalink,target:"_blank",rel:"noopener noreferrer"}},[e("van-button",{attrs:{type:"info",size:"small",round:"",text:"permalink",url:t.choosenItem.permalink}})],1)],1)],2)}),[],!1,null,null,null);n.default=L.exports}}]);