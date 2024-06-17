var Wt=Object.defineProperty;var Yt=(c,n,e)=>n in c?Wt(c,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):c[n]=e;var i=(c,n,e)=>(Yt(c,typeof n!="symbol"?n+"":n,e),e);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/*! (c) Andrea Giammarchi @webreflection ISC */(function(){var c=function(d,a){var u=function(w){for(var b=0,v=w.length;b<v;b++)m(w[b])},m=function(w){var b=w.target,v=w.attributeName,P=w.oldValue;b.attributeChangedCallback(v,P,b.getAttribute(v))};return function(g,w){var b=g.constructor.observedAttributes;return b&&d(w).then(function(){new a(u).observe(g,{attributes:!0,attributeOldValue:!0,attributeFilter:b});for(var v=0,P=b.length;v<P;v++)g.hasAttribute(b[v])&&m({target:g,attributeName:b[v],oldValue:null})}),g}};function n(d,a){if(d){if(typeof d=="string")return e(d,a);var u=Object.prototype.toString.call(d).slice(8,-1);if(u==="Object"&&d.constructor&&(u=d.constructor.name),u==="Map"||u==="Set")return Array.from(d);if(u==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u))return e(d,a)}}function e(d,a){(a==null||a>d.length)&&(a=d.length);for(var u=0,m=new Array(a);u<a;u++)m[u]=d[u];return m}function t(d,a){var u=typeof Symbol<"u"&&d[Symbol.iterator]||d["@@iterator"];if(!u){if(Array.isArray(d)||(u=n(d))||a&&d&&typeof d.length=="number"){u&&(d=u);var m=0,g=function(){};return{s:g,n:function(){return m>=d.length?{done:!0}:{done:!1,value:d[m++]}},e:function(P){throw P},f:g}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var w=!0,b=!1,v;return{s:function(){u=u.call(d)},n:function(){var P=u.next();return w=P.done,P},e:function(P){b=!0,v=P},f:function(){try{!w&&u.return!=null&&u.return()}finally{if(b)throw v}}}}/*! (c) Andrea Giammarchi - ISC */var r=!0,s=!1,o="querySelectorAll",p=function(a){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:document,m=arguments.length>2&&arguments[2]!==void 0?arguments[2]:MutationObserver,g=arguments.length>3&&arguments[3]!==void 0?arguments[3]:["*"],w=function P(ue,pe,D,y,k,C){var O=t(ue),be;try{for(O.s();!(be=O.n()).done;){var R=be.value;(C||o in R)&&(k?D.has(R)||(D.add(R),y.delete(R),a(R,k)):y.has(R)||(y.add(R),D.delete(R),a(R,k)),C||P(R[o](pe),pe,D,y,k,r))}}catch(Ge){O.e(Ge)}finally{O.f()}},b=new m(function(P){if(g.length){var ue=g.join(","),pe=new Set,D=new Set,y=t(P),k;try{for(y.s();!(k=y.n()).done;){var C=k.value,O=C.addedNodes,be=C.removedNodes;w(be,ue,pe,D,s,s),w(O,ue,pe,D,r,s)}}catch(R){y.e(R)}finally{y.f()}}}),v=b.observe;return(b.observe=function(P){return v.call(b,P,{subtree:r,childList:r})})(u),b},f="querySelectorAll",x=self,I=x.document,H=x.Element,A=x.MutationObserver,_=x.Set,V=x.WeakMap,We=function(a){return f in a},Ye=[].filter,_e=function(d){var a=new V,u=function(y){for(var k=0,C=y.length;k<C;k++)a.delete(y[k])},m=function(){for(var y=ue.takeRecords(),k=0,C=y.length;k<C;k++)b(Ye.call(y[k].removedNodes,We),!1),b(Ye.call(y[k].addedNodes,We),!0)},g=function(y){return y.matches||y.webkitMatchesSelector||y.msMatchesSelector},w=function(y,k){var C;if(k)for(var O,be=g(y),R=0,Ge=v.length;R<Ge;R++)be.call(y,O=v[R])&&(a.has(y)||a.set(y,new _),C=a.get(y),C.has(O)||(C.add(O),d.handle(y,k,O)));else a.has(y)&&(C=a.get(y),a.delete(y),C.forEach(function(Ut){d.handle(y,k,Ut)}))},b=function(y){for(var k=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,C=0,O=y.length;C<O;C++)w(y[C],k)},v=d.query,P=d.root||I,ue=p(w,P,A,v),pe=H.prototype.attachShadow;return pe&&(H.prototype.attachShadow=function(D){var y=pe.call(this,D);return ue.observe(y),y}),v.length&&b(P[f](v)),{drop:u,flush:m,observer:ue,parse:b}},N=self,z=N.document,de=N.Map,Xe=N.MutationObserver,Te=N.Object,Ke=N.Set,Tt=N.WeakMap,Ze=N.Element,Mt=N.HTMLElement,Qe=N.Node,et=N.Error,tt=N.TypeError,Rt=N.Reflect,Me=Te.defineProperty,It=Te.keys,At=Te.getOwnPropertyNames,Se=Te.setPrototypeOf,Pe=!self.customElements,nt=function(a){for(var u=It(a),m=[],g=new Ke,w=u.length,b=0;b<w;b++){m[b]=a[u[b]];try{delete a[u[b]]}catch{g.add(b)}}return function(){for(var v=0;v<w;v++)g.has(v)||(a[u[v]]=m[v])}};if(Pe){var Ne=function(){var a=this.constructor;if(!ze.has(a))throw new tt("Illegal constructor");var u=ze.get(a);if(Ie)return ot(Ie,u);var m=rt.call(z,u);return ot(Se(m,a.prototype),u)},rt=z.createElement,ze=new de,Re=new de,st=new de,Ce=new de,it=[],Dt=function(a,u,m){var g=st.get(m);if(u&&!g.isPrototypeOf(a)){var w=nt(a);Ie=Se(a,g);try{new g.constructor}finally{Ie=null,w()}}var b="".concat(u?"":"dis","connectedCallback");b in g&&a[b]()},Ot=_e({query:it,handle:Dt}),Bt=Ot.parse,Ie=null,Fe=function(a){if(!Re.has(a)){var u,m=new Promise(function(g){u=g});Re.set(a,{$:m,_:u})}return Re.get(a).$},ot=c(Fe,Xe);self.customElements={define:function(a,u){if(Ce.has(a))throw new et('the name "'.concat(a,'" has already been used with this registry'));ze.set(u,a),st.set(a,u.prototype),Ce.set(a,u),it.push(a),Fe(a).then(function(){Bt(z.querySelectorAll(a))}),Re.get(a)._(u)},get:function(a){return Ce.get(a)},whenDefined:Fe},Me(Ne.prototype=Mt.prototype,"constructor",{value:Ne}),self.HTMLElement=Ne,z.createElement=function(d,a){var u=a&&a.is,m=u?Ce.get(u):Ce.get(d);return m?new m:rt.call(z,d)},"isConnected"in Qe.prototype||Me(Qe.prototype,"isConnected",{configurable:!0,get:function(){return!(this.ownerDocument.compareDocumentPosition(this)&this.DOCUMENT_POSITION_DISCONNECTED)}})}else if(Pe=!self.customElements.get("extends-br"),Pe)try{var at=function d(){return self.Reflect.construct(HTMLBRElement,[],d)};at.prototype=HTMLLIElement.prototype;var ct="extends-br";self.customElements.define("extends-br",at,{extends:"br"}),Pe=z.createElement("br",{is:ct}).outerHTML.indexOf(ct)<0;var lt=self.customElements,Ht=lt.get,_t=lt.whenDefined;self.customElements.whenDefined=function(d){var a=this;return _t.call(this,d).then(function(u){return u||Ht.call(a,d)})}}catch{}if(Pe){var dt=function(a){var u=je.get(a);gt(u.querySelectorAll(this),a.isConnected)},G=self.customElements,ut=z.createElement,Nt=G.define,zt=G.get,Ft=G.upgrade,jt=Rt||{construct:function(a){return a.call(this)}},Vt=jt.construct,je=new Tt,Ve=new Ke,Ae=new de,De=new de,pt=new de,Oe=new de,ht=[],Be=[],mt=function(a){return Oe.get(a)||zt.call(G,a)},qt=function(a,u,m){var g=pt.get(m);if(u&&!g.isPrototypeOf(a)){var w=nt(a);He=Se(a,g);try{new g.constructor}finally{He=null,w()}}var b="".concat(u?"":"dis","connectedCallback");b in g&&a[b]()},$t=_e({query:Be,handle:qt}),gt=$t.parse,Gt=_e({query:ht,handle:function(a,u){je.has(a)&&(u?Ve.add(a):Ve.delete(a),Be.length&&dt.call(Be,a))}}),Jt=Gt.parse,bt=Ze.prototype.attachShadow;bt&&(Ze.prototype.attachShadow=function(d){var a=bt.call(this,d);return je.set(this,a),a});var qe=function(a){if(!De.has(a)){var u,m=new Promise(function(g){u=g});De.set(a,{$:m,_:u})}return De.get(a).$},$e=c(qe,Xe),He=null;At(self).filter(function(d){return/^HTML.*Element$/.test(d)}).forEach(function(d){var a=self[d];function u(){var m=this.constructor;if(!Ae.has(m))throw new tt("Illegal constructor");var g=Ae.get(m),w=g.is,b=g.tag;if(w){if(He)return $e(He,w);var v=ut.call(z,b);return v.setAttribute("is",w),$e(Se(v,m.prototype),w)}else return Vt.call(this,a,[],m)}Me(u.prototype=a.prototype,"constructor",{value:u}),Me(self,d,{value:u})}),z.createElement=function(d,a){var u=a&&a.is;if(u){var m=Oe.get(u);if(m&&Ae.get(m).tag===d)return new m}var g=ut.call(z,d);return u&&g.setAttribute("is",u),g},G.get=mt,G.whenDefined=qe,G.upgrade=function(d){var a=d.getAttribute("is");if(a){var u=Oe.get(a);if(u){$e(Se(d,u.prototype),a);return}}Ft.call(G,d)},G.define=function(d,a,u){if(mt(d))throw new et("'".concat(d,"' has already been defined as a custom element"));var m,g=u&&u.extends;Ae.set(a,g?{is:d,tag:g}:{is:"",tag:d}),g?(m="".concat(g,'[is="').concat(d,'"]'),pt.set(m,a.prototype),Oe.set(d,a),Be.push(m)):(Nt.apply(G,arguments),ht.push(m=d)),qe(d).then(function(){g?(gt(z.querySelectorAll(m)),Ve.forEach(dt,[m])):Jt(z.querySelectorAll(m))}),De.get(d)._(a)}}})();var ye=(c=>(c.Default="default",c.Page="page",c.NotFound="not-found",c))(ye||{});class Ue{constructor(n,e,t){i(this,"url");i(this,"type");i(this,"routing");this.url=n,this.type=e,this.routing=t}}class Xt extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"routes",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){window.addEventListener("hashchange",()=>{this.checkRoute()})}addRoutes(e){this.routes=[...e],this.checkRoute()}checkRoute(){const e=window.location.hash.slice(2);this.changeRoute(e)}changeRoute(e){if(e){const t=this.routes.findIndex(r=>r.url===e);this.shadowRoot.innerHTML=this.routes[t]?this.routes[t].routing():this.sendNotFound()}else{const t=this.routes.filter(r=>r.type===ye.Default);t?window.location.hash="#/"+t[0].url:this.sendNotFound()}}sendNotFound(){const e=this.routes.filter(t=>t.type===ye.NotFound);return e.length===0||(window.location.hash="#/"+e[0].url,this.changeRoute(e[0].url)),"404: Not found"}}customElements.define("app-router",Xt);class ke{constructor(n,e){i(this,"color");i(this,"opacity");this.color=n,this.opacity=e}static createEmpty(){return new ke("#008000",1)}}class Ee{constructor(n,e,t){i(this,"propertyName");i(this,"displayName");i(this,"type");this.propertyName=n,this.displayName=e,this.type=t}static createEmpty(){return new Ee("","","string")}}var ce=(c=>(c.String="string",c.Image="image",c.Number="number",c))(ce||{});class ${constructor(n,e,t,r,s,o){i(this,"name");i(this,"layer");i(this,"url");i(this,"style");i(this,"tags");i(this,"relevantProperties");this.name=n,this.layer=e,this.url=t,this.style=r,this.tags=s,this.relevantProperties=o}static createEmpty(){return new $("","","",ke.createEmpty(),[],[Ee.createEmpty()])}}const J=class J{constructor(){i(this,"CATEGORIES_URL","./json/categories.json");i(this,"_data");if(J._instance)return J._instance;J._instance=this}static get instance(){return J._instance||(J._instance=new J),J._instance}get data(){return this._data}set data(n){this._data=n}async getData(){if(this.data)return this.data;{let n=await this.fetchAppData(this.CATEGORIES_URL);return n=this.parseData(n),this.data=n,n}}async fetchAppData(n){try{const e=await fetch(n).then(r=>r.json()),t=await Promise.all(e.categories.map(async r=>{const s=await Promise.all(r.groups.map(async o=>{if(typeof o=="string")try{const p=await fetch(o);if(p.ok)return p.json();throw new Error("Errore durante il recupero dei dati.")}catch(p){return console.error(p),null}else return o}));return r.groups=s,r}));return{...e,categories:t}}catch(e){throw console.error("Errore durante il recupero dei dati JSON.",e),e}}parseData(n){return{categories:n.categories.map(t=>({name:t.name,groups:t.groups.map(r=>this.parseGroup(r))}))}}parseGroup(n){return Array.isArray(n)?n:{name:n.name,layers:n.layers.map(e=>this.parseLayer(e))}}parseLayer(n){return new $(n.name,n.layer,n.layer_url_wfs,new ke(n.style.color,parseFloat(n.style.opacity)),n.tags,n.relevant_properties.map(e=>{let t=Ee.createEmpty();switch(t.displayName=e.display_name,t.propertyName=e.property_name,e.type){case"image":t.type=ce.Image;break;case"number":t.type=ce.Number;break;default:t.type=ce.String;break}return t}))}getAllLayers(n){const e=[];return n.categories.map(t=>{t.groups.map(r=>{typeof r!="string"&&r.layers.map(s=>{e.push(s)})})}),e}filterLayersByNameAndTag(n,e){let t=[];return t=n.categories.flatMap(r=>r.groups.flatMap(s=>typeof s=="string"?[$.createEmpty()]:s.layers.filter(o=>o.name.toLowerCase().includes(e)||o.tags.some(p=>p.includes(e))))),t}filterLayersByLayerName(n){let e;return this.data.categories.find(t=>t.groups.find(r=>typeof r=="string"?!1:(e=r.layers.find(s=>s.layer.includes(n)),e!==void 0))),e}getAllTags(n){let e=[];return n.categories.map(r=>{r.groups.map(s=>{typeof s!="string"&&s.layers.map(o=>{o.tags.map(p=>{e.push(p)})})})}),[...new Set(e)]}filterLayersByTag(n,e){let t=[];return t=n.categories.flatMap(r=>r.groups.flatMap(s=>typeof s=="string"?[$.createEmpty()]:s.layers.filter(o=>o.tags.some(p=>p.includes(e))))),t}filterLayersByTags(n,e){let t=[];return e.forEach(s=>{this.filterLayersByTag(n,s).forEach(p=>t.push(p))}),[...new Set(t)]}};i(J,"_instance");let j=J;const Kt=`.page {\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
    height: 100dvh;\r
    overflow: hidden;\r
    background-color: var(--surface);\r
}\r
\r
.box {\r
    max-width: 500px;\r
    max-height: 100%;\r
    padding: 32px;\r
    background-color: var(--surface-container);\r
    border-radius: var(--border-radius-l);\r
    box-sizing: border-box;\r
}\r
\r
@media screen and (max-width: 768px) {\r
    body {\r
        scrollbar-width: thin;\r
        scrollbar-color: var(--surface-container-high) transparent;\r
    }\r
\r
    .page {\r
        display: block;\r
        height: auto;\r
        min-height: 100dvh;\r
    }\r
\r
    .box {\r
        padding: 4%;\r
        max-width: 100vw;\r
        width: 100vw;\r
        min-height: 100dvh;\r
    }\r
}`;class Zt extends HTMLElement{constructor(){super();i(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(Kt),this.shadowRoot.adoptedStyleSheets.push(e)}async connectedCallback(){await j.instance.getData(),this.render()}render(){this.shadowRoot.innerHTML=`
            <div class="page">
                <div class="box">
                    <app-tags-wall></app-tags-wall>
                </div>
            </div>
            `}}customElements.define("page-tags",Zt);const U=class U{constructor(){i(this,"listeners",{});if(U._instance)return U._instance;U._instance=this}static get instance(){return U._instance||(U._instance=new U),U._instance}subscribe(n,e){this.listeners[n]||(this.listeners[n]=[]),this.listeners[n].push(e)}unsubscribe(n,e){this.listeners[n]&&(this.listeners[n]=this.listeners[n].filter(t=>t!==e))}unsubscribeAll(n){delete this.listeners[n]}publish(n,e){this.listeners[n]&&this.listeners[n].forEach(t=>t(e))}};i(U,"_instance");let l=U;const W=class W{constructor(){i(this,"_position",null);i(this,"_watchId",null);if(W._instance)return W._instance;W._instance=this}get position(){return this._position}set position(n){this._position=n,l.instance.publish("set-position",this.position)}get watchId(){return this._watchId}set watchId(n){this._watchId=n}static get instance(){return W._instance||(W._instance=new W),W._instance}async getPosition(){try{return await new Promise((e,t)=>{navigator.geolocation.getCurrentPosition(r=>e(r),r=>t(r))})}catch{return null}}async startWatchingUserPosition(){try{this.watchId=navigator.geolocation.watchPosition(n=>this.position=n,n=>{throw n},{enableHighAccuracy:!0,timeout:5e3,maximumAge:0})}catch{this.position=null}}stopWatchingPosition(){this.watchId&&(navigator.geolocation.clearWatch(this.watchId),this.watchId=null)}static geolocationToCartographic(n){return new Cesium.Cartographic(n.coords.longitude,n.coords.latitude,n.coords.altitude||0)}};i(W,"_instance");let ve=W;class we{constructor(n,e,t,r,s,o,p){i(this,"uuid");i(this,"name");i(this,"position");i(this,"type");i(this,"layer");i(this,"layerName");i(this,"props");this.uuid=n,this.name=e,this.position=t,this.type=r,this.layer=s,this.layerName=o,this.props=p}static createEmpty(){return new we("","",Cesium.Cartographic.ZERO,"point",$.createEmpty(),"",[])}}class Le{constructor(n,e,t){i(this,"displayName");i(this,"type");i(this,"value");this.displayName=n,this.type=e,this.value=t}static createEmpty(){return new Le("",ce.String,"")}}var oe=(c=>(c.Point="point",c.Polyline="polyline",c.Polygon="polygon",c))(oe||{});class F{constructor(n,e,t){i(this,"name");i(this,"pois");i(this,"lastSelected");this.name=n,this.pois=e,this.lastSelected=t}static createEmpty(){return new F("",[],!0)}static createDefault(){return new F("default",[],!0)}}var E=(c=>(c.Info="info",c.SuggestedPath="suggested-path",c.CustomPath="custom-path",c.SelectedSuggestedPath="selected-suggested-path",c))(E||{});const Y=class Y{constructor(){i(this,"_currentTab",E.Info);i(this,"_isSuggestedPathSelected",!1);if(Y._instance)return Y._instance;Y._instance=this}static get instance(){return Y._instance||(Y._instance=new Y),Y._instance}get currentTab(){return this._currentTab}set currentTab(n){this._currentTab=n,l.instance.publish("current-tab-updated",this.currentTab)}get isSuggestedPathSelected(){return this._isSuggestedPathSelected}set isSuggestedPathSelected(n){this._isSuggestedPathSelected=n}};i(Y,"_instance");let le=Y;var T=(c=>(c.Loader="loader",c.Temporary="temporary",c.Error="error",c.Info="info",c))(T||{});const Qt=`:host {\r
    position: relative;\r
    width: 100%;\r
    background-color: white;\r
    z-index: 999;\r
    display: flex;\r
    justify-content: space-between;\r
    align-items: center;\r
    background-color: var(--primary-container);\r
    border: 1px solid rgb(var(--border-accent));\r
    border-radius: var(--border-radius-s);\r
}\r
\r
.message {\r
    width: 100%;\r
    margin: 0;\r
    padding: 16px 0 16px 16px;\r
    color: var(--on-primary-container);\r
}\r
\r
.dismiss-btn {\r
    cursor: pointer;\r
    margin: 16px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    height: 32px;\r
    width: 32px;\r
    background-color: transparent;\r
    border: none;\r
    border-radius: var(--border-radius-s);\r
    color: var(--on-primary-container);\r
\r
    &:hover {\r
        opacity: .8;\r
    }\r
}\r
\r
.material-symbols-outlined {\r
    font-size: 1.5rem;\r
    font-family: 'Material Symbols Outlined';\r
    font-variation-settings:\r
        'FILL' 0,\r
        'wght' 400,\r
        'GRAD' 0,\r
        'opsz' 24;\r
}\r
\r
.loader {\r
    min-width: 32px;\r
    min-height: 32px;\r
    margin: 16px;\r
    border-radius: 50%;\r
    animation: rotate 1s linear infinite\r
}\r
\r
.loader::before {\r
    content: "";\r
    box-sizing: border-box;\r
    position: absolute;\r
    inset: 0px;\r
    border-radius: 50%;\r
    border: 3px solid var(--on-primary-container);\r
    animation: prixClipFix 2s linear infinite;\r
}\r
\r
@keyframes rotate {\r
    100% {\r
        transform: rotate(360deg)\r
    }\r
}\r
\r
@keyframes prixClipFix {\r
    0% {\r
        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)\r
    }\r
\r
    25% {\r
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)\r
    }\r
\r
    50% {\r
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)\r
    }\r
\r
    75% {\r
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)\r
    }\r
\r
    100% {\r
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)\r
    }\r
}\r
\r
.bar {\r
    position: absolute;\r
    bottom: 0;\r
    width: 100%;\r
    height: 2px;\r
    background-color: var(--primary);\r
    transform-origin: left;\r
    animation: reducingBar var(--snackbar-duration) linear forwards;\r
}\r
\r
@keyframes reducingBar {\r
    to {\r
        transform: scaleX(0);\r
    }\r
}`;class ft extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"snackbarType",T.Info);i(this,"message","");i(this,"duration",0);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Qt),this.shadowRoot.adoptedStyleSheets.push(e)}connectedCallback(){this.render()}render(){switch(this.shadowRoot.innerHTML=`<p class="message">${this.message}</p>`,this.snackbarType){case T.Error:this.renderErrorSnackbar();break;case T.Loader:this.renderLoaderSnackbar();break;case T.Temporary:this.renderTemporarySnackbar();break;default:this.renderInfoSnackbar();break}}renderInfoSnackbar(){this.createDismissButton()}renderLoaderSnackbar(){const e=document.createElement("div");e.classList.add("loader"),this.shadowRoot.append(e)}renderErrorSnackbar(){this.createDismissButton()}renderTemporarySnackbar(){this.createDismissButton();const e=document.createElement("span");e.classList.add("bar"),e.style.setProperty("--snackbar-duration",`${this.duration}s`),this.shadowRoot.append(e),setTimeout(()=>this.remove(),this.duration*1e3)}createDismissButton(){const e=document.createElement("button");e.innerHTML='<span class="material-symbols-outlined">close</span>',e.classList.add("dismiss-btn"),this.shadowRoot.append(e),e.addEventListener("click",()=>this.remove())}}customElements.define("app-snackbar",ft);const X=class X{constructor(){i(this,"snackbars",[]);i(this,"container",null);if(X._instance)return X._instance;X._instance=this}static get instance(){return X._instance||(X._instance=new X),X._instance}createSnackbar(n,e,t,r=2){if(this.container=document.querySelector(".snackbar-container"),!this.container)return;const s=new ft;s.id=e.replace(/[^a-zA-Z0-9-_]/g,""),s.snackbarType=n,s.message=t,r&&(s.duration=r),this.container.append(s)}removeSnackbar(n){if(this.container=document.querySelector(".snackbar-container"),!this.container)return;const e=n.replace(/[^a-zA-Z0-9-_]/g,""),t=this.container.querySelector(`#${e}`);t&&t.remove()}};i(X,"_instance");let L=X;const K=class K{constructor(){i(this,"_tags",[]);i(this,"_paths",[]);i(this,"_selectedCustomPath",F.createDefault());i(this,"_suggestedPaths",[F.createEmpty()]);i(this,"_selectedSuggestedPath",F.createEmpty());i(this,"_layers",{active:[],bench:[]});i(this,"_activeLayers",[]);i(this,"_benchLayers",[]);if(K._instance)return K._instance;K._instance=this}static get instance(){return K._instance||(K._instance=new K),K._instance}get tags(){return this._tags}set tags(n){this._tags=n}get paths(){return this._paths}set paths(n){this._paths=n}get selectedCustomPath(){return this._selectedCustomPath}set selectedCustomPath(n){this._selectedCustomPath=n,l.instance.publish("selected-custom-path-updated",this.selectedCustomPath),le.instance.currentTab=E.CustomPath}get suggestedPaths(){return this._suggestedPaths}set suggestedPaths(n){this._suggestedPaths=n}get selectedSuggestedPath(){return this._selectedSuggestedPath}set selectedSuggestedPath(n){this._selectedSuggestedPath=n,l.instance.publish("selected-suggested-path-updated",this.selectedSuggestedPath),le.instance.currentTab=E.SelectedSuggestedPath}get layers(){return this._layers}set layers(n){this._layers=n,localStorage.setItem("layers",JSON.stringify(this.layers))}get activeLayers(){return this._activeLayers}set activeLayers(n){this._activeLayers=n,l.instance.publish("active-layers-updated",this.activeLayers),this.layers={...this.layers,active:this.activeLayers}}get benchLayers(){return this._benchLayers}set benchLayers(n){this._benchLayers=n,l.instance.publish("bench-layers-updated",this.benchLayers),this.layers={...this.layers,bench:this.benchLayers}}getCsvPaths(n){let e=0;const t=[],r=[];for(;e<=n;){const s=fetch(`./suggested-paths/${e}.tsv`).then(o=>o.text()).then(o=>{const p=this.parseCsvFile(o);t.push(this.parseCsvPath(p))}).catch(o=>console.error("Errore durante il recupero dei percorsi suggeriti",o));r.push(s),e++}Promise.all(r).then(()=>this.suggestedPaths=[...t])}parseCsvFile(n){return n.split(`
`).map(r=>{const s=r.split("	");return{path:s[0],layerName:s[1],id:s[2],name:s[3],latitude:s[4],longitude:s[5],height:s[6],info:s[7]}})}parseCsvPath(n){let e=F.createEmpty();return e.name=n[1].path,e.lastSelected=!1,n.forEach((t,r)=>{r!==0&&e.pois.push(this.parseCsvPoi(t))}),e}parseCsvPoi(n){let e=we.createEmpty();return e.layerName=n.layerName,e.layer=$.createEmpty(),e.name=n.name,e.position=Cesium.Cartographic.fromDegrees(parseFloat(n.longitude),parseFloat(n.latitude),parseFloat(n.height)),e.type=oe.Point,e.uuid=n.id,e.props=this.parseCsvPoiProperties(n.info),e}parseCsvPoiProperties(n){let e=[];return n.split("|").forEach(r=>{let s=Le.createEmpty();s.displayName=r.split(":")[0],s.value=r.split(":")[1].trim(),s.type=ce.String,e.push(s)}),e}getSuggestedPaths(){let n=[];return this.suggestedPaths.forEach(e=>{e.pois.forEach(t=>{this.activeLayers.forEach(r=>{t.layerName===r.layer&&n.push(e)})})}),[...new Set(n)]}isPoiInLayers(n){return this.activeLayers.some(e=>e.layer===n.layerName)}setTags(n){localStorage.setItem("tags",JSON.stringify(n)),this.tags=n}getTags(){const n=localStorage.getItem("tags");if(!n)return;const e=JSON.parse(n);this.tags=e}getSavedLayers(){const n=localStorage.getItem("layers");if(!n)return;const e=JSON.parse(n);let t={active:[],bench:[]};t.active=e.active.map(r=>this.parseLayer(r)),t.bench=e.bench.map(r=>this.parseLayer(r)),this._layers=t,this._activeLayers=this._layers.active,this._benchLayers=this._layers.bench}getCustomPaths(){const n=localStorage.getItem("paths");if(!n)return;const t=JSON.parse(n).map(r=>this.parseCustomPath(r));this.paths=t}setCustomPaths(){localStorage.setItem("paths",JSON.stringify(this.paths))}parseCustomPath(n){let e=F.createEmpty();return typeof n.lastSelected=="boolean"&&(e.lastSelected=n.lastSelected),n.name&&(e.name=n.name),n.pois&&(e.pois=n.pois.map(t=>this.parsePoi(t))),e}parsePoi(n){let e=we.createEmpty();return e.layer=this.parseLayer(n.layer),e.layerName=n.layerName,e.name=n.name,e.position=new Cesium.Cartographic(n.position.longitude,n.position.latitude,n.position.height),e.props=n.props.map(t=>this.parsePoiProperty(t)),e.type=this.parsePoiType(n.type),e.uuid=n.uuid,e}parseLayer(n){return new $(n.name,n.layer,n.url=n.url,new ke(n.style.color,n.style.opacity),n.tags,n.relevantProperties.map(e=>{let t=Ee.createEmpty();switch(t.displayName=e.displayName,t.propertyName=e.propertyName,e.type){case"image":t.type=ce.Image;break;case"number":t.type=ce.Number;break;default:t.type=ce.String;break}return t}))}parsePoiProperty(n){let e=Le.createEmpty();return n.displayName&&(e.displayName=n.displayName),n.type&&(e.type=n.type),n.value&&(e.value=n.value),e}parsePoiType(n){let e;switch(n){case"polyline":e=oe.Polyline;break;case"polygon":e=oe.Polygon;break;default:e=oe.Point;break}return e}addPoiToSelectedPath(n){if(this.isPoiInSelectedPath(n)){L.instance.createSnackbar(T.Temporary,"already-present","Il punto di interesse si trova già nel percorso selezionato.");return}const e=[...this.selectedCustomPath.pois];e.unshift(n),this.selectedCustomPath={...F.createEmpty(),name:this.selectedCustomPath.name},this.selectedCustomPath={...this.selectedCustomPath,pois:e}}isPoiInSelectedPath(n){return this.selectedCustomPath.pois.some(e=>e.name===n.name)}editPath(n){const e=this.paths.find(r=>r.lastSelected===!0);if(!e)return;const t=this.paths.filter(r=>r.lastSelected!==!0);e.name=n,t.push(e),this.selectedCustomPath=e,this.paths=t,this.setCustomPaths(),L.instance.createSnackbar(T.Temporary,"modified-path",`Percorso ${n} modificato con successo.`)}deletePath(){const n=this.paths.filter(t=>t.lastSelected!==!0),e=this.paths.find(t=>t.name==="default");e&&(e.lastSelected=!0,this.selectedCustomPath=e),this.paths=[...n],this.setCustomPaths(),L.instance.createSnackbar(T.Temporary,"deleted-path","Percorso eliminato con successo.")}saveNewPath(n){const e=this.paths.map(r=>(r.lastSelected=!1,r)),t=F.createEmpty();t.lastSelected=!0,t.name=n,e.push(t),this.selectedCustomPath=t,this.paths=e,this.setCustomPaths(),L.instance.createSnackbar(T.Temporary,"new-path",`Percorso ${n} creato con successo.`)}savePath(){const n=this.paths.filter(e=>e.lastSelected!==!0);n.push(this.selectedCustomPath),this.paths=n,this.setCustomPaths(),L.instance.createSnackbar(T.Temporary,"saved-path","Percorso salvato con successo.")}loadPath(n){const e=this.paths.find(r=>r.name===n);if(!e)return;const t=this.paths;t.forEach(r=>r.lastSelected=!1),e.lastSelected=!0,this.selectedCustomPath=e,this.paths=t,this.setCustomPaths(),L.instance.createSnackbar(T.Temporary,"loaded-path",`Percorso ${n} caricato con successo.`)}};i(K,"_instance");let h=K;class en{constructor(n,e,t){i(this,"url");i(this,"layer");i(this,"credit");this.url=n,this.layer=e,this.credit=t}}var he=(c=>(c.Light="light",c.Dark="dark",c))(he||{});const Z=class Z{constructor(){i(this,"MAP_THEMES_URL","./json/themes.json");i(this,"_currentTheme",he.Dark);i(this,"_isPhysicalMap",!1);i(this,"mapThemes",[]);if(Z._instance)return Z._instance;Z._instance=this}static get instance(){return Z._instance||(Z._instance=new Z),Z._instance}get currentTheme(){return this._currentTheme}set currentTheme(n){this._currentTheme=n,this.changeColors(this.currentTheme),l.instance.publish("change-theme",{isPhysicalMap:this.isPhysicalMap,theme:this.chooseMapTheme(this.currentTheme)})}get isPhysicalMap(){return this._isPhysicalMap}set isPhysicalMap(n){this._isPhysicalMap=n,l.instance.publish("toggle-physical-map",{isPhysicalMap:this.isPhysicalMap,currentTheme:this.chooseMapTheme(this.currentTheme)})}async getMapThemes(){if(this.mapThemes.length!==0)return this.mapThemes;{let n=await this.fetchMapThemes(this.MAP_THEMES_URL);return this.mapThemes=n,n}}async fetchMapThemes(n){let e=[];try{e=await fetch(n).then(t=>t.json()),e=e.map(t=>this.parseMapTheme(t))}catch(t){console.error(t)}return e}parseMapTheme(n){return new en(n.url,n.layer,n.credit)}createImageryProvider(n){return new Cesium.WebMapTileServiceImageryProvider({url:n.url,layer:n.layer,credit:new Cesium.Credit(n.credit),tileMatrixSetID:"default",style:"default",format:"image/jpeg",maximumLevel:19})}toggleTheme(){this.currentTheme===he.Light?this.currentTheme=he.Dark:this.currentTheme=he.Light}togglePhysicalMap(){this.isPhysicalMap===!0?this.isPhysicalMap=!1:this.isPhysicalMap=!0}chooseMapTheme(n){const e=n===he.Dark?this.mapThemes.find(t=>t.layer==="carto-dark"):this.mapThemes.find(t=>t.layer==="carto-light");if(e!==void 0)return e;throw new Error("Impossibile trovare il tema della mappa desiderato.")}changeColors(n){switch(n){case he.Dark:this.setDarkTheme();break;default:this.setLightTheme();break}}setDarkTheme(){document.documentElement.style.setProperty("--primary","rgb(55, 222, 187)"),document.documentElement.style.setProperty("--on-primary","rgb(0, 56, 45)"),document.documentElement.style.setProperty("--primary-container","rgb(0, 81, 66)"),document.documentElement.style.setProperty("--on-primary-container","rgb(184, 255, 233)"),document.documentElement.style.setProperty("--secondary","rgb(174, 205, 194)"),document.documentElement.style.setProperty("--on-secondary","rgb(25, 53, 46)"),document.documentElement.style.setProperty("--secondary-container","rgb(48, 76, 68)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(202, 233, 222)"),document.documentElement.style.setProperty("--tertiary","rgb(163, 204, 231)"),document.documentElement.style.setProperty("--on-tertiary","rgb(1, 52, 74)"),document.documentElement.style.setProperty("--tertiary-container","rgb(33, 75, 98)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(197, 231, 255)"),document.documentElement.style.setProperty("--error","rgb(255, 180, 171)"),document.documentElement.style.setProperty("--on-error","rgb(105, 0, 5)"),document.documentElement.style.setProperty("--error-container","rgb(147, 0, 10)"),document.documentElement.style.setProperty("--on-error-container","rgb(255, 218, 214)"),document.documentElement.style.setProperty("--surface-dim","rgb(0, 19, 46)"),document.documentElement.style.setProperty("--surface","rgb(0, 19, 46)"),document.documentElement.style.setProperty("--surface-bright","rgb(0, 56, 115)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(0, 14, 37)"),document.documentElement.style.setProperty("--surface-container-low","rgb(0, 27, 61)"),document.documentElement.style.setProperty("--surface-container","rgb(0, 31, 69)"),document.documentElement.style.setProperty("--surface-container-high","rgb(0, 41, 87)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(0, 52, 107)"),document.documentElement.style.setProperty("--on-surface","rgb(213, 227, 255)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(171, 200, 247)"),document.documentElement.style.setProperty("--outline","rgb(118, 146, 191)"),document.documentElement.style.setProperty("--outline-variant","rgb(42, 72, 112)"),document.documentElement.style.setProperty("--inverse-surface","rgb(214, 227, 255)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(0, 48, 99)"),document.documentElement.style.setProperty("--inverse-primary","rgb(0, 107, 88)")}setLightTheme(){document.documentElement.style.setProperty("--primary","rgb(0, 107, 88)"),document.documentElement.style.setProperty("--on-primary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--primary-container","rgb(243, 255, 249)"),document.documentElement.style.setProperty("--on-primary-container","rgb(0, 32, 25)"),document.documentElement.style.setProperty("--secondary","rgb(71, 100, 91)"),document.documentElement.style.setProperty("--on-secondary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary-container","rgb(243, 255, 249)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(3, 32, 25)"),document.documentElement.style.setProperty("--tertiary","rgb(59, 99, 122)"),document.documentElement.style.setProperty("--on-tertiary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary-container","rgb(251, 252, 255)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(0, 30, 45)"),document.documentElement.style.setProperty("--error","rgb(184, 31, 33)"),document.documentElement.style.setProperty("--on-error","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error-container","rgb(255, 218, 214)"),document.documentElement.style.setProperty("--on-error-container","rgb(65, 0, 3)"),document.documentElement.style.setProperty("--surface-dim","rgb(201, 218, 255)"),document.documentElement.style.setProperty("--surface","rgb(249, 249, 255)"),document.documentElement.style.setProperty("--surface-bright","rgb(249, 249, 255)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-low","rgb(240, 243, 255)"),document.documentElement.style.setProperty("--surface-container","rgb(232, 238, 255)"),document.documentElement.style.setProperty("--surface-container-high","rgb(223, 232, 255)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(214, 227, 255)"),document.documentElement.style.setProperty("--on-surface","rgb(0, 27, 61)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(42, 72, 112)"),document.documentElement.style.setProperty("--outline","rgb(92, 120, 163)"),document.documentElement.style.setProperty("--outline-variant","rgb(171, 200, 247)"),document.documentElement.style.setProperty("--inverse-surface","rgb(0, 48, 99)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(236, 240, 255)"),document.documentElement.style.setProperty("--inverse-primary","rgb(55, 222, 187)")}};i(Z,"_instance");let ge=Z;var M=(c=>(c[c.Close=0]="Close",c[c.Open=1]="Open",c[c.Full=2]="Full",c))(M||{});const Q=class Q{constructor(){i(this,"_isOpen",!1);if(Q._instance)return Q._instance;Q._instance=this}static get instance(){return Q._instance||(Q._instance=new Q),Q._instance}get isOpen(){return this._isOpen}set isOpen(n){this._isOpen=n,l.instance.publish("toggle-bench",this.isOpen),this.isOpen&&(B.instance.status=M.Close)}};i(Q,"_instance");let xe=Q;const ee=class ee{constructor(){i(this,"_isOpen",!1);i(this,"_status",M.Close);if(ee._instance)return ee._instance;ee._instance=this}static get instance(){return ee._instance||(ee._instance=new ee),ee._instance}get isOpen(){return this._isOpen}set isOpen(n){this._isOpen=n,l.instance.publish("toggle-tabs",this.isOpen),this.isOpen&&l.instance.publish("toggle-bench",!1)}get status(){return this._status}set status(n){this._status=n,l.instance.publish("sidenav-status-change",this.status),this.status!==0&&(xe.instance.isOpen=!1)}};i(ee,"_instance");let B=ee;var fe=(c=>(c.Point="Point",c.LineString="LineString",c.Polygon="Polygon",c.MultiPoint="MultiPoint",c.MultiLineString="MultiLineString",c.MultiPolygon="MultiPolygon",c))(fe||{});const te=class te{constructor(){if(te._instance)return te._instance;te._instance=this}static get instance(){return te._instance||(te._instance=new te),te._instance}async createGeoJson(n){const e=`${n.url}?service=WFS&typeName=${n.layer}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;let r=await(await fetch(e)).json(),s=this.substituteRelevantProperties(r,n);return this.createFeatureAdditionalProperties(s,n)}async createGeoJsonFromEntity(n){let e={type:"Feature",geometry:{type:"Point",coordinates:[]},properties:{}};if(n.point&&n.position){e.geometry.type="Point";let t=this.createGeojsonPointCoordinates(n);t&&(e.geometry.coordinates=[Cesium.Math.toDegrees(t.longitude),Cesium.Math.toDegrees(t.latitude)])}return n.polyline&&n.polyline.positions&&(e.geometry.type="LineString",e.geometry.coordinates=this.createGeojsonPolylineCoordinates(n)),n.polygon&&n.polygon.hierarchy&&(e.geometry.type="Polygon",e.geometry.coordinates=this.createGeojsonPolygonCoordinates(n)),e}createGeojsonFeatureFromPoi(n){return{type:"Feature",geometry:{type:"Point",coordinates:[Cesium.Math.toDegrees(n.position.longitude),Cesium.Math.toDegrees(n.position.latitude)]},properties:{}}}createGeojsonFeatureCollectionFromPois(n){let e={type:"FeatureCollection",features:[]},t=n.map(r=>this.createGeojsonFeatureFromPoi(r));return e.features=t,e}createGeojsonPointCoordinates(n){if(!n.position)return null;let e=n.position.getValue(Cesium.JulianDate.now());return e?Cesium.Cartographic.fromCartesian(e):null}createGeojsonPolylineCoordinates(n){if(!n.polyline||!n.polyline.positions)return[];let e=n.polyline.positions.getValue(Cesium.JulianDate.now()),t=[];return e&&e.forEach(r=>{let s,o=Cesium.Cartographic.fromCartesian(r);s=[Cesium.Math.toDegrees(o.longitude),Cesium.Math.toDegrees(o.latitude)],t.push(s)}),t}createGeojsonPolygonCoordinates(n){if(!n.polygon||!n.polygon.hierarchy)return[];let e=n.polygon.hierarchy.getValue(Cesium.JulianDate.now()),t=[];if(e){let r=[];e.positions.forEach(s=>{let o,p=Cesium.Cartographic.fromCartesian(s);o=[Cesium.Math.toDegrees(p.longitude),Cesium.Math.toDegrees(p.latitude)],r.push(o)}),t.push(r),e.holes.forEach(s=>{let o=[];s.positions.forEach(p=>{let f,x=Cesium.Cartographic.fromCartesian(p);f=[Cesium.Math.toDegrees(x.longitude),Cesium.Math.toDegrees(x.latitude)],o.push(f)}),t.push(o)})}return t}createFeatureAdditionalProperties(n,e){return n.features=n.features.map((t,r)=>{switch(t.properties.name=e.name+" "+r,t.properties.layerName=e.layer,t.geometry.type){case fe.Point:t.properties.uuid=e.layer+t.geometry.coordinates[1]+t.geometry.coordinates[0];break;case fe.MultiPoint:t.properties.uuid=e.layer+t.geometry.coordinates[0][1]+t.geometry.coordinates[0][0];break;case(fe.LineString||fe.Polygon||fe.MultiPoint):t.properties.uuid=e.layer+t.geometry.coordinates[0][1]+t.geometry.coordinates[0][0];break;default:t.properties.uuid=e.layer+t.geometry.coordinates[0][0][1]+t.geometry.coordinates[0][0][0];break}return t.properties.uuid=t.id,t}),n}substituteRelevantProperties(n,e){return n.features.forEach(t=>{const r={};for(const s in t.properties){const o=e.relevantProperties.find(p=>p.propertyName===s);if(o){const p={displayName:o.displayName,type:o.type,value:t.properties[s]};r[s]=p}}t.properties=r}),n}styleFeature(n,e){n.entities.values.forEach(t=>{if(t.billboard)switch(n.name){case"custom-path":this.styleCustomPath(t);break;case"selected-feature":this.styleSelectedFeature(t);break;default:this.stylePointFeature(t,e);break}t.polyline&&this.stylePolylineFeature(t,e),t.polygon&&this.stylePolygonFeature(t,e)})}stylePointFeature(n,e){return n.billboard=void 0,n.point=new Cesium.PointGraphics({pixelSize:8,color:Cesium.Color.fromCssColorString(e.color).withAlpha(e.opacity),outlineColor:Cesium.Color.fromCssColorString(e.color),outlineWidth:1}),n}styleCustomPath(n){return n.billboard=void 0,n.point=new Cesium.PointGraphics({pixelSize:12,color:Cesium.Color.TRANSPARENT,outlineColor:Cesium.Color.BLUE,outlineWidth:2}),n}styleSelectedFeature(n){return n.billboard=void 0,n.point=new Cesium.PointGraphics({pixelSize:16,color:Cesium.Color.TRANSPARENT,outlineColor:Cesium.Color.GREEN,outlineWidth:2}),n}stylePolylineFeature(n,e){return n.polyline&&(n.polyline.material=new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(e.color)),n.polyline.width=new Cesium.ConstantProperty(2)),n}stylePolygonFeature(n,e){return n.polygon&&(n.polygon.material=new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(e.color).withAlpha(e.opacity)),n.polygon.outlineColor=new Cesium.ConstantProperty(Cesium.Color.fromCssColorString(e.color))),n}openGoogleMaps(n){const e=`https://www.google.it/maps/dir/?api=1&destination=${Cesium.Math.toDegrees(n.latitude)},${Cesium.Math.toDegrees(n.longitude)}`;window.open(e,"_blank")}};i(te,"_instance");let se=te;const ne=class ne{constructor(){i(this,"_selectedPoi",null);if(ne._instance)return ne._instance;ne._instance=this}static get instance(){return ne._instance||(ne._instance=new ne),ne._instance}get selectedPoi(){return this._selectedPoi}set selectedPoi(n){this._selectedPoi=n,l.instance.publish("selected-poi",this.selectedPoi),this._selectedPoi!==null&&(le.instance.currentTab=E.Info)}parsePoi(n){let e=we.createEmpty();if(!n.properties)return e;let t=n.properties;return n.properties.propertyNames.forEach(s=>{if(t.hasProperty(s))switch(s){case"uuid":e.uuid=t[s].valueOf();break;case"layer":const o=t[s].valueOf();e.layer=o,e.layerName=o.layer;break;case"layerName":const p=t[s].valueOf();e.layerName=p;const f=j.instance.filterLayersByLayerName(p);f&&(e.layer=f);break;case"name":e.name=t[s].valueOf();break;default:let x=t[s].valueOf();e.props.push(this.parsePoiProperty(x));break}}),e.position=this.parsePoiPosition(n),e.type=this.parsePoiType(n),e}parsePoiPosition(n){let e=Cesium.Cartographic.ZERO;if(n.point&&n.position){let t=n.position.getValue(Cesium.JulianDate.now());t&&(e=Cesium.Cartographic.fromCartesian(t))}if(n.polyline&&n.polyline.positions){let t=n.polyline.positions.getValue(Cesium.JulianDate.now())[0];t&&(e=Cesium.Cartographic.fromCartesian(t))}if(n.polygon&&n.polygon.hierarchy){let t=n.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions[0];t&&(e=Cesium.Cartographic.fromCartesian(t))}return e}parsePoiProperty(n){let e=Le.createEmpty();return n.displayName&&(e.displayName=n.displayName),n.type&&(e.type=n.type),n.value&&(e.value=n.value),e}parsePoiType(n){return n.polyline?oe.Polyline:n.polygon?oe.Polygon:oe.Point}};i(ne,"_instance");let q=ne;const tn=`.map {\r
    height: 100dvh;\r
    width: 100%;\r
    animation: grow .3s ease-in-out forwards;\r
}\r
\r
:host(.reduce) .map {\r
    animation: shrink .3s ease-in-out forwards;\r
}\r
\r
@keyframes shrink {\r
    from {\r
        width: 100%;\r
    }\r
\r
    to {\r
        width: calc(100dvh - 360px);\r
    }\r
}\r
\r
@keyframes grow {\r
    from  {\r
        width: calc(100dvh - 360px);\r
    }\r
\r
    to {\r
        width: 100%;\r
    }\r
}\r
\r
@media screen and (max-width: 768px) {\r
    @keyframes shrink {\r
        from {\r
            height: 100dvh;\r
        }\r
    \r
        to {\r
            height: calc(100dvh - 360px);\r
        }\r
    }\r
    \r
    @keyframes grow {\r
        from  {\r
            height: calc(100dvh - 360px);\r
        }\r
    \r
        to {\r
            height: 100dvh;\r
        }\r
    }\r
}`,nn=`/* packages/widgets/Source/shared.css */
.cesium-svgPath-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.cesium-button {
  display: inline-block;
  position: relative;
  background: #303336;
  border: 1px solid #444;
  color: #edffff;
  fill: #edffff;
  border-radius: 4px;
  padding: 5px 12px;
  margin: 2px 3px;
  cursor: pointer;
  overflow: hidden;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.cesium-button:focus {
  color: #fff;
  fill: #fff;
  border-color: #ea4;
  outline: none;
}
.cesium-button:hover {
  color: #fff;
  fill: #fff;
  background: #48b;
  border-color: #aef;
  box-shadow: 0 0 8px #fff;
}
.cesium-button:active {
  color: #000;
  fill: #000;
  background: #adf;
  border-color: #fff;
  box-shadow: 0 0 8px #fff;
}
.cesium-button:disabled,
.cesium-button-disabled,
.cesium-button-disabled:focus,
.cesium-button-disabled:hover,
.cesium-button-disabled:active {
  background: #303336;
  border-color: #444;
  color: #646464;
  fill: #646464;
  box-shadow: none;
  cursor: default;
}
.cesium-button option {
  background-color: #000;
  color: #eee;
}
.cesium-button option:disabled {
  color: #777;
}
.cesium-button input,
.cesium-button label {
  cursor: pointer;
}
.cesium-button input {
  vertical-align: sub;
}
.cesium-toolbar-button {
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  border-radius: 14%;
  padding: 0;
  vertical-align: middle;
  z-index: 0;
}
.cesium-performanceDisplay-defaultContainer {
  position: absolute;
  top: 50px;
  right: 10px;
  text-align: right;
}
.cesium-performanceDisplay {
  background-color: rgba(40, 40, 40, 0.7);
  padding: 7px;
  border-radius: 5px;
  border: 1px solid #444;
  font: bold 12px sans-serif;
}
.cesium-performanceDisplay-fps {
  color: #e52;
}
.cesium-performanceDisplay-throttled {
  color: #a42;
}
.cesium-performanceDisplay-ms {
  color: #de3;
}

/* packages/widgets/Source/Animation/Animation.css */
.cesium-animation-theme {
  visibility: hidden;
  display: block;
  position: absolute;
  z-index: -100;
}
.cesium-animation-themeNormal {
  color: #222;
}
.cesium-animation-themeHover {
  color: #4488b0;
}
.cesium-animation-themeSelect {
  color: #242;
}
.cesium-animation-themeDisabled {
  color: #333;
}
.cesium-animation-themeKnob {
  color: #222;
}
.cesium-animation-themePointer {
  color: #2e2;
}
.cesium-animation-themeSwoosh {
  color: #8ac;
}
.cesium-animation-themeSwooshHover {
  color: #aef;
}
.cesium-animation-svgText {
  fill: #edffff;
  font-family: Sans-Serif;
  font-size: 15px;
  text-anchor: middle;
}
.cesium-animation-blank {
  fill: #000;
  fill-opacity: 0.01;
  stroke: none;
}
.cesium-animation-rectButton {
  cursor: pointer;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.cesium-animation-rectButton .cesium-animation-buttonGlow {
  fill: #fff;
  stroke: none;
  display: none;
}
.cesium-animation-rectButton:hover .cesium-animation-buttonGlow {
  display: block;
}
.cesium-animation-rectButton .cesium-animation-buttonPath {
  fill: #edffff;
}
.cesium-animation-rectButton .cesium-animation-buttonMain {
  stroke: #444;
  stroke-width: 1.2;
}
.cesium-animation-rectButton:hover .cesium-animation-buttonMain {
  stroke: #aef;
}
.cesium-animation-rectButton:active .cesium-animation-buttonMain {
  fill: #abd6ff;
}
.cesium-animation-buttonDisabled {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.cesium-animation-buttonDisabled .cesium-animation-buttonMain {
  stroke: #555;
}
.cesium-animation-buttonDisabled .cesium-animation-buttonPath {
  fill: #818181;
}
.cesium-animation-buttonDisabled .cesium-animation-buttonGlow {
  display: none;
}
.cesium-animation-buttonToggled .cesium-animation-buttonGlow {
  display: block;
  fill: #2e2;
}
.cesium-animation-buttonToggled .cesium-animation-buttonMain {
  stroke: #2e2;
}
.cesium-animation-buttonToggled:hover .cesium-animation-buttonGlow {
  fill: #fff;
}
.cesium-animation-buttonToggled:hover .cesium-animation-buttonMain {
  stroke: #2e2;
}
.cesium-animation-shuttleRingG {
  cursor: pointer;
}
.cesium-animation-shuttleRingPointer {
  cursor: pointer;
}
.cesium-animation-shuttleRingPausePointer {
  cursor: pointer;
}
.cesium-animation-shuttleRingBack {
  fill: #181818;
  fill-opacity: 0.8;
  stroke: #333;
  stroke-width: 1.2;
}
.cesium-animation-shuttleRingSwoosh line {
  stroke: #8ac;
  stroke-width: 3;
  stroke-opacity: 0.2;
  stroke-linecap: round;
}
.cesium-animation-knobOuter {
  cursor: pointer;
  stroke: #444;
  stroke-width: 1.2;
}
.cesium-animation-knobInner {
  cursor: pointer;
}

/* packages/widgets/Source/BaseLayerPicker/BaseLayerPicker.css */
.cesium-baseLayerPicker-selected {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
.cesium-baseLayerPicker-dropDown {
  display: block;
  position: absolute;
  box-sizing: content-box;
  top: auto;
  right: 0;
  width: 320px;
  max-height: 500px;
  margin-top: 5px;
  background-color: rgba(38, 38, 38, 0.75);
  border: 1px solid #444;
  padding: 6px;
  overflow: auto;
  border-radius: 10px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transform: translate(0, -20%);
  visibility: hidden;
  opacity: 0;
  transition:
    visibility 0s 0.2s,
    opacity 0.2s ease-in,
    transform 0.2s ease-in;
}
.cesium-baseLayerPicker-dropDown-visible {
  transform: translate(0, 0);
  visibility: visible;
  opacity: 1;
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}
.cesium-baseLayerPicker-sectionTitle {
  display: block;
  font-family: sans-serif;
  font-size: 16pt;
  text-align: left;
  color: #edffff;
  margin-bottom: 4px;
}
.cesium-baseLayerPicker-choices {
  margin-bottom: 5px;
}
.cesium-baseLayerPicker-categoryTitle {
  color: #edffff;
  font-size: 11pt;
}
.cesium-baseLayerPicker-choices {
  display: block;
  border: 1px solid #888;
  border-radius: 5px;
  padding: 5px 0;
}
.cesium-baseLayerPicker-item {
  display: inline-block;
  vertical-align: top;
  margin: 2px 5px;
  width: 64px;
  text-align: center;
  cursor: pointer;
}
.cesium-baseLayerPicker-itemLabel {
  display: block;
  font-family: sans-serif;
  font-size: 8pt;
  text-align: center;
  vertical-align: middle;
  color: #edffff;
  cursor: pointer;
  word-wrap: break-word;
}
.cesium-baseLayerPicker-item:hover .cesium-baseLayerPicker-itemLabel,
.cesium-baseLayerPicker-item:focus .cesium-baseLayerPicker-itemLabel {
  text-decoration: underline;
}
.cesium-baseLayerPicker-itemIcon {
  display: inline-block;
  position: relative;
  width: inherit;
  height: auto;
  background-size: 100% 100%;
  border: solid 1px #444;
  border-radius: 9px;
  color: #edffff;
  margin: 0;
  padding: 0;
  cursor: pointer;
  box-sizing: border-box;
}
.cesium-baseLayerPicker-item:hover .cesium-baseLayerPicker-itemIcon {
  border-color: #fff;
  box-shadow: 0 0 8px #fff, 0 0 8px #fff;
}
.cesium-baseLayerPicker-selectedItem .cesium-baseLayerPicker-itemLabel {
  color: rgb(189, 236, 248);
}
.cesium-baseLayerPicker-selectedItem .cesium-baseLayerPicker-itemIcon {
  border: double 4px rgb(189, 236, 248);
}

/* packages/engine/Source/Widget/CesiumWidget.css */
.cesium-widget {
  font-family: sans-serif;
  font-size: 16px;
  overflow: hidden;
  display: block;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.cesium-widget,
.cesium-widget canvas {
  width: 100%;
  height: 100%;
  touch-action: none;
}
.cesium-widget-credits {
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;
  font-size: 10px;
  text-shadow: 0px 0px 2px #000000;
  padding-right: 5px;
}
.cesium-widget-credits a,
.cesium-widget-credits a:visited {
  color: #fff;
}
.cesium-widget-errorPanel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99999;
}
.cesium-widget-errorPanel:before {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  content: "";
}
.cesium-widget-errorPanel-content {
  width: 75%;
  max-width: 500px;
  display: inline-block;
  text-align: left;
  vertical-align: middle;
  border: 1px solid #510c00;
  border-radius: 7px;
  background-color: #f0d9d5;
  font-size: 14px;
  color: #510c00;
}
.cesium-widget-errorPanel-content.expanded {
  max-width: 75%;
}
.cesium-widget-errorPanel-header {
  font-size: 18px;
  font-family:
    "Open Sans",
    Verdana,
    Geneva,
    sans-serif;
  background: #d69d93;
  border-bottom: 2px solid #510c00;
  padding-bottom: 10px;
  border-radius: 3px 3px 0 0;
  padding: 15px;
}
.cesium-widget-errorPanel-scroll {
  overflow: auto;
  font-family:
    "Open Sans",
    Verdana,
    Geneva,
    sans-serif;
  white-space: pre-wrap;
  padding: 0 15px;
  margin: 10px 0 20px 0;
}
.cesium-widget-errorPanel-buttonPanel {
  padding: 0 15px;
  margin: 10px 0 20px 0;
  text-align: right;
}
.cesium-widget-errorPanel-buttonPanel button {
  border-color: #510c00;
  background: #d69d93;
  color: #202020;
  margin: 0;
}
.cesium-widget-errorPanel-buttonPanel button:focus {
  border-color: #510c00;
  background: #f0d9d5;
  color: #510c00;
}
.cesium-widget-errorPanel-buttonPanel button:hover {
  border-color: #510c00;
  background: #f0d9d5;
  color: #510c00;
}
.cesium-widget-errorPanel-buttonPanel button:active {
  border-color: #510c00;
  background: #b17b72;
  color: #510c00;
}
.cesium-widget-errorPanel-more-details {
  text-decoration: underline;
  cursor: pointer;
}
.cesium-widget-errorPanel-more-details:hover {
  color: #2b0700;
}

/* packages/widgets/Source/CesiumInspector/CesiumInspector.css */
.cesium-cesiumInspector {
  border-radius: 5px;
  transition: width ease-in-out 0.25s;
  background: rgba(48, 51, 54, 0.8);
  border: 1px solid #444;
  color: #edffff;
  display: inline-block;
  position: relative;
  padding: 4px 12px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
}
.cesium-cesiumInspector-button {
  text-align: center;
  font-size: 11pt;
}
.cesium-cesiumInspector-visible .cesium-cesiumInspector-button {
  border-bottom: 1px solid #aaa;
  padding-bottom: 3px;
}
.cesium-cesiumInspector input:enabled,
.cesium-cesiumInspector-button {
  cursor: pointer;
}
.cesium-cesiumInspector-visible {
  width: 185px;
  height: auto;
}
.cesium-cesiumInspector-hidden {
  width: 122px;
  height: 17px;
}
.cesium-cesiumInspector-sectionContent {
  max-height: 600px;
}
.cesium-cesiumInspector-section-collapsed .cesium-cesiumInspector-sectionContent {
  max-height: 0;
  padding: 0 !important;
  overflow: hidden;
}
.cesium-cesiumInspector-dropDown {
  margin: 5px 0;
  font-family: sans-serif;
  font-size: 10pt;
  width: 185px;
}
.cesium-cesiumInspector-frustumStatistics {
  padding-left: 10px;
  padding: 5px;
  background-color: rgba(80, 80, 80, 0.75);
}
.cesium-cesiumInspector-pickButton {
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid #444;
  color: #edffff;
  border-radius: 5px;
  padding: 3px 7px;
  cursor: pointer;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin: 0 auto;
}
.cesium-cesiumInspector-pickButton:focus {
  outline: none;
}
.cesium-cesiumInspector-pickButton:active,
.cesium-cesiumInspector-pickButtonHighlight {
  color: #000;
  background: #adf;
  border-color: #fff;
  box-shadow: 0 0 8px #fff;
}
.cesium-cesiumInspector-center {
  text-align: center;
}
.cesium-cesiumInspector-sectionHeader {
  font-weight: bold;
  font-size: 10pt;
  margin: 0;
  cursor: pointer;
}
.cesium-cesiumInspector-pickSection {
  border: 1px solid #aaa;
  border-radius: 5px;
  padding: 3px;
  margin-bottom: 5px;
}
.cesium-cesiumInspector-sectionContent {
  margin-bottom: 10px;
  transition: max-height 0.25s;
}
.cesium-cesiumInspector-tileText {
  padding-bottom: 10px;
  border-bottom: 1px solid #aaa;
}
.cesium-cesiumInspector-relativeText {
  padding-top: 10px;
}
.cesium-cesiumInspector-sectionHeader::before {
  margin-right: 5px;
  content: "-";
  width: 1ch;
  display: inline-block;
}
.cesium-cesiumInspector-section-collapsed .cesium-cesiumInspector-sectionHeader::before {
  content: "+";
}

/* packages/widgets/Source/Cesium3DTilesInspector/Cesium3DTilesInspector.css */
ul.cesium-cesiumInspector-statistics {
  margin: 0;
  padding-top: 3px;
  padding-bottom: 3px;
}
ul.cesium-cesiumInspector-statistics + ul.cesium-cesiumInspector-statistics {
  border-top: 1px solid #aaa;
}
.cesium-cesiumInspector-slider {
  margin-top: 5px;
}
.cesium-cesiumInspector-slider input[type=number] {
  text-align: left;
  background-color: #222;
  outline: none;
  border: 1px solid #444;
  color: #edffff;
  width: 100px;
  border-radius: 3px;
  padding: 1px;
  margin-left: 10px;
  cursor: auto;
}
.cesium-cesiumInspector-slider input[type=number]::-webkit-outer-spin-button,
.cesium-cesiumInspector-slider input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.cesium-cesiumInspector-slider input[type=range] {
  margin-left: 5px;
  vertical-align: middle;
}
.cesium-cesiumInspector-hide .cesium-cesiumInspector-styleEditor {
  display: none;
}
.cesium-cesiumInspector-styleEditor {
  padding: 10px;
  border-radius: 5px;
  background: rgba(48, 51, 54, 0.8);
  border: 1px solid #444;
}
.cesium-cesiumInspector-styleEditor textarea {
  width: 100%;
  height: 300px;
  background: transparent;
  color: #edffff;
  border: none;
  padding: 0;
  white-space: pre;
  overflow-wrap: normal;
  overflow-x: auto;
}
.cesium-3DTilesInspector {
  width: 300px;
  pointer-events: all;
}
.cesium-3DTilesInspector-statistics {
  font-size: 11px;
}
.cesium-3DTilesInspector-disabledElementsInfo {
  margin: 5px 0 0 0;
  padding: 0 0 0 20px;
  color: #eed202;
}
.cesium-3DTilesInspector div,
.cesium-3DTilesInspector input[type=range] {
  width: 100%;
  box-sizing: border-box;
}
.cesium-cesiumInspector-error {
  color: #ff9e9e;
  overflow: auto;
}
.cesium-3DTilesInspector .cesium-cesiumInspector-section {
  margin-top: 3px;
}
.cesium-3DTilesInspector .cesium-cesiumInspector-sectionHeader + .cesium-cesiumInspector-show {
  border-top: 1px solid white;
}
input.cesium-cesiumInspector-url {
  overflow: hidden;
  white-space: nowrap;
  overflow-x: scroll;
  background-color: transparent;
  color: white;
  outline: none;
  border: none;
  height: 1em;
  width: 100%;
}
.cesium-cesiumInspector .field-group {
  display: table;
}
.cesium-cesiumInspector .field-group > label {
  display: table-cell;
  font-weight: bold;
}
.cesium-cesiumInspector .field-group > .field {
  display: table-cell;
  width: 100%;
}

/* packages/widgets/Source/VoxelInspector/VoxelInspector.css */
.cesium-VoxelInspector {
  width: 300px;
  pointer-events: all;
}
.cesium-VoxelInspector div,
.cesium-VoxelInspector input[type=range] {
  width: 100%;
  box-sizing: border-box;
}
.cesium-VoxelInspector .cesium-cesiumInspector-section {
  margin-top: 3px;
}
.cesium-VoxelInspector .cesium-cesiumInspector-sectionHeader + .cesium-cesiumInspector-show {
  border-top: 1px solid white;
}

/* packages/widgets/Source/FullscreenButton/FullscreenButton.css */
.cesium-button.cesium-fullscreenButton {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 0;
}

/* packages/widgets/Source/VRButton/VRButton.css */
.cesium-button.cesium-vrButton {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 0;
}

/* packages/widgets/Source/Geocoder/Geocoder.css */
.cesium-viewer-geocoderContainer .cesium-geocoder-input {
  border: solid 1px #444;
  background-color: rgba(40, 40, 40, 0.7);
  color: white;
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 32px;
  margin: 0;
  padding: 0 32px 0 0;
  border-radius: 0;
  box-sizing: border-box;
  transition: width ease-in-out 0.25s, background-color 0.2s ease-in-out;
  -webkit-appearance: none;
}
.cesium-viewer-geocoderContainer:hover .cesium-geocoder-input {
  border-color: #aef;
  box-shadow: 0 0 8px #fff;
}
.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus {
  border-color: #ea4;
  background-color: rgba(15, 15, 15, 0.9);
  box-shadow: none;
  outline: none;
}
.cesium-viewer-geocoderContainer:hover .cesium-geocoder-input,
.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus,
.cesium-viewer-geocoderContainer .cesium-geocoder-input-wide {
  padding-left: 4px;
  width: 250px;
}
.cesium-viewer-geocoderContainer .search-results {
  position: absolute;
  background-color: #000;
  color: #eee;
  overflow-y: auto;
  opacity: 0.8;
  width: 100%;
}
.cesium-viewer-geocoderContainer .search-results ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.cesium-viewer-geocoderContainer .search-results ul li {
  font-size: 14px;
  padding: 3px 10px;
}
.cesium-viewer-geocoderContainer .search-results ul li:hover {
  cursor: pointer;
}
.cesium-viewer-geocoderContainer .search-results ul li.active {
  background: #48b;
}
.cesium-geocoder-searchButton {
  background-color: #303336;
  display: inline-block;
  position: absolute;
  cursor: pointer;
  width: 32px;
  top: 1px;
  right: 1px;
  height: 30px;
  vertical-align: middle;
  fill: #edffff;
}
.cesium-geocoder-searchButton:hover {
  background-color: #48b;
}

/* packages/widgets/Source/InfoBox/InfoBox.css */
.cesium-infoBox {
  display: block;
  position: absolute;
  top: 50px;
  right: 0;
  width: 40%;
  max-width: 480px;
  background: rgba(38, 38, 38, 0.95);
  color: #edffff;
  border: 1px solid #444;
  border-right: none;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  box-shadow: 0 0 10px 1px #000;
  transform: translate(100%, 0);
  visibility: hidden;
  opacity: 0;
  transition:
    visibility 0s 0.2s,
    opacity 0.2s ease-in,
    transform 0.2s ease-in;
}
.cesium-infoBox-visible {
  transform: translate(0, 0);
  visibility: visible;
  opacity: 1;
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}
.cesium-infoBox-title {
  display: block;
  height: 20px;
  padding: 5px 30px 5px 25px;
  background: rgba(84, 84, 84, 1);
  border-top-left-radius: 7px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: content-box;
}
.cesium-infoBox-bodyless .cesium-infoBox-title {
  border-bottom-left-radius: 7px;
}
button.cesium-infoBox-camera {
  display: block;
  position: absolute;
  top: 4px;
  left: 4px;
  width: 22px;
  height: 22px;
  background: transparent;
  border-color: transparent;
  border-radius: 3px;
  padding: 0 5px;
  margin: 0;
}
button.cesium-infoBox-close {
  display: block;
  position: absolute;
  top: 5px;
  right: 5px;
  height: 20px;
  background: transparent;
  border: none;
  border-radius: 2px;
  font-weight: bold;
  font-size: 16px;
  padding: 0 5px;
  margin: 0;
  color: #edffff;
}
button.cesium-infoBox-close:focus {
  background: rgba(238, 136, 0, 0.44);
  outline: none;
}
button.cesium-infoBox-close:hover {
  background: #888;
  color: #000;
}
button.cesium-infoBox-close:active {
  background: #a00;
  color: #000;
}
.cesium-infoBox-bodyless .cesium-infoBox-iframe {
  display: none;
}
.cesium-infoBox-iframe {
  border: none;
  width: 100%;
  width: calc(100% - 2px);
}

/* packages/widgets/Source/SceneModePicker/SceneModePicker.css */
span.cesium-sceneModePicker-wrapper {
  display: inline-block;
  position: relative;
  margin: 0 3px;
}
.cesium-sceneModePicker-visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.25s linear;
}
.cesium-sceneModePicker-hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.25s, opacity 0.25s linear;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-none {
  display: none;
}
.cesium-sceneModePicker-slide-svg {
  transition: left 2s;
  top: 0;
  left: 0;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-dropDown-icon {
  box-sizing: border-box;
  padding: 0;
  margin: 3px 0;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button3D,
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-buttonColumbusView,
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button2D {
  margin: 0 0 3px 0;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button3D .cesium-sceneModePicker-icon2D {
  left: 100%;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button3D .cesium-sceneModePicker-iconColumbusView {
  left: 200%;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-buttonColumbusView .cesium-sceneModePicker-icon3D {
  left: -200%;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-buttonColumbusView .cesium-sceneModePicker-icon2D {
  left: -100%;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button2D .cesium-sceneModePicker-icon3D {
  left: -100%;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button2D .cesium-sceneModePicker-iconColumbusView {
  left: 100%;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-selected {
  border-color: #2e2;
  box-shadow: 0 0 8px #fff, 0 0 8px #fff;
}

/* packages/widgets/Source/ProjectionPicker/ProjectionPicker.css */
span.cesium-projectionPicker-wrapper {
  display: inline-block;
  position: relative;
  margin: 0 3px;
}
.cesium-projectionPicker-visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.25s linear;
}
.cesium-projectionPicker-hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.25s, opacity 0.25s linear;
}
.cesium-projectionPicker-wrapper .cesium-projectionPicker-none {
  display: none;
}
.cesium-projectionPicker-wrapper .cesium-projectionPicker-dropDown-icon {
  box-sizing: border-box;
  padding: 0;
  margin: 3px 0;
}
.cesium-projectionPicker-wrapper .cesium-projectionPicker-buttonPerspective,
.cesium-projectionPicker-wrapper .cesium-projectionPicker-buttonOrthographic {
  margin: 0 0 3px 0;
}
.cesium-projectionPicker-wrapper .cesium-projectionPicker-buttonPerspective .cesium-projectionPicker-iconOrthographic {
  left: 100%;
}
.cesium-projectionPicker-wrapper .cesium-projectionPicker-buttonOrthographic .cesium-projectionPicker-iconPerspective {
  left: -100%;
}
.cesium-projectionPicker-wrapper .cesium-projectionPicker-selected {
  border-color: #2e2;
  box-shadow: 0 0 8px #fff, 0 0 8px #fff;
}

/* packages/widgets/Source/PerformanceWatchdog/PerformanceWatchdog.css */
.cesium-performance-watchdog-message-area {
  position: relative;
  background-color: yellow;
  color: black;
  padding: 10px;
}
.cesium-performance-watchdog-message {
  margin-right: 30px;
}
.cesium-performance-watchdog-message-dismiss {
  position: absolute;
  right: 0;
  margin: 0 10px 0 0;
}

/* packages/widgets/Source/NavigationHelpButton/NavigationHelpButton.css */
.cesium-navigationHelpButton-wrapper {
  position: relative;
  display: inline-block;
}
.cesium-navigation-help {
  visibility: hidden;
  position: absolute;
  top: 38px;
  right: 2px;
  width: 250px;
  border-radius: 10px;
  transform: scale(0.01);
  transform-origin: 234px -10px;
  transition: visibility 0s 0.25s, transform 0.25s ease-in;
}
.cesium-navigation-help-visible {
  visibility: visible;
  transform: scale(1);
  transition: transform 0.25s ease-out;
}
.cesium-navigation-help-instructions {
  border: 1px solid #444;
  background-color: rgba(38, 38, 38, 0.75);
  padding-bottom: 5px;
  border-radius: 0 0 10px 10px;
}
.cesium-click-navigation-help {
  display: none;
}
.cesium-touch-navigation-help {
  display: none;
  padding-top: 5px;
}
.cesium-click-navigation-help-visible {
  display: block;
}
.cesium-touch-navigation-help-visible {
  display: block;
}
.cesium-navigation-help-pan {
  color: #66ccff;
  font-weight: bold;
}
.cesium-navigation-help-zoom {
  color: #65fd00;
  font-weight: bold;
}
.cesium-navigation-help-rotate {
  color: #ffd800;
  font-weight: bold;
}
.cesium-navigation-help-tilt {
  color: #d800d8;
  font-weight: bold;
}
.cesium-navigation-help-details {
  color: #ffffff;
}
.cesium-navigation-button {
  color: #fff;
  background-color: transparent;
  border-bottom: none;
  border-top: 1px solid #444;
  border-right: 1px solid #444;
  margin: 0;
  width: 50%;
  cursor: pointer;
}
.cesium-navigation-button-icon {
  vertical-align: middle;
  padding: 5px 1px;
}
.cesium-navigation-button:focus {
  outline: none;
}
.cesium-navigation-button-left {
  border-radius: 10px 0 0 0;
  border-left: 1px solid #444;
}
.cesium-navigation-button-right {
  border-radius: 0 10px 0 0;
  border-left: none;
}
.cesium-navigation-button-selected {
  background-color: rgba(38, 38, 38, 0.75);
}
.cesium-navigation-button-unselected {
  background-color: rgba(0, 0, 0, 0.75);
}
.cesium-navigation-button-unselected:hover {
  background-color: rgba(76, 76, 76, 0.75);
}

/* packages/widgets/Source/SelectionIndicator/SelectionIndicator.css */
.cesium-selection-wrapper {
  position: absolute;
  width: 160px;
  height: 160px;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.2s, opacity 0.2s ease-in;
}
.cesium-selection-wrapper-visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.2s ease-out;
}
.cesium-selection-wrapper svg {
  fill: #2e2;
  stroke: #000;
  stroke-width: 1.1px;
}

/* packages/widgets/Source/Timeline/Timeline.css */
.cesium-timeline-main {
  position: relative;
  left: 0;
  bottom: 0;
  overflow: hidden;
  border: solid 1px #888;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.cesium-timeline-trackContainer {
  width: 100%;
  overflow: auto;
  border-top: solid 1px #888;
  position: relative;
  top: 0;
  left: 0;
}
.cesium-timeline-tracks {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.cesium-timeline-needle {
  position: absolute;
  left: 0;
  top: 1.7em;
  bottom: 0;
  width: 1px;
  background: #f00;
}
.cesium-timeline-bar {
  position: relative;
  left: 0;
  top: 0;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  height: 1.7em;
  background:
    linear-gradient(
      to bottom,
      rgba(116, 117, 119, 0.8) 0%,
      rgba(58, 68, 82, 0.8) 11%,
      rgba(46, 50, 56, 0.8) 46%,
      rgba(53, 53, 53, 0.8) 81%,
      rgba(53, 53, 53, 0.8) 100%);
}
.cesium-timeline-ruler {
  visibility: hidden;
  white-space: nowrap;
  font-size: 80%;
  z-index: -200;
}
.cesium-timeline-highlight {
  position: absolute;
  bottom: 0;
  left: 0;
  background: #08f;
}
.cesium-timeline-ticLabel {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  font-size: 80%;
  color: #eee;
}
.cesium-timeline-ticMain {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1px;
  height: 50%;
  background: #eee;
}
.cesium-timeline-ticSub {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1px;
  height: 33%;
  background: #aaa;
}
.cesium-timeline-ticTiny {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1px;
  height: 25%;
  background: #888;
}
.cesium-timeline-icon16 {
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  background-image: url(data:text/plain;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sIDBITKIVzLEMAAAKNSURBVEjHxdXNSxRhHAfw7zzrqhuoWJnSkrippUVSEKsHI9BTUYdAJA/RoYMREV26rAdn6tAfUARi16hQqkOBQRgUEYFWEC3OwczMjdZd92VmdWfmeelgTjO7q7gb0VzmmZnn85vvPPPMM8B/3qTcE2PPpuTZKB1eWuUQACgXYACYwVFbCTTVeZXB/i55o4LFelcAZfStYD4vpAoPGAGo4GBcQEgSOAUMQyAezwK6iQfDPXnhS/FkHZ+/8VLMWxxqWkfH3gbMRNOYi2roavbja0zHQmoFPYf8ED4Ko4aivm9MOG/u9I8mwrafeK7a/tVrNc/bARYN5noadeq7q0342vXw9CIMU6BmW8rVP9cPBPe52uu+v3O/y9sB4gkTWs6Qsk0mj5ExXMelejvA8WafYmkmGPHanTijdtvif8rx5RiCjdWKs2Cp3jWRDl96KhrbqlBeJqBOLyLQXg0IgbkZDS0dO8EZxZfPSTA9jvDDK3mT0OmP1FXh3XwEEAKdTX5MRWLgjCK4pwH3xt/YnjgLHAv4lHTCAKMMu/wV+KZGob6PoKyMQ0+sgBpZVJZn0NterxQaVqef/DRn+/EXYds/mZx2eVeAW9d65dhCEsaKCb7K8HH0gqTevyh9GDkn0VULRiaLzJKGBu9swfdaiie5RVo9ESURN8E8BE0n7ggACJy8KzghSCzp6DmwWxkaCm24EBXr8wI8Hrkq06QBiRC0t24HALS11IBTCyJl4vb1AXmzpbVYTwoVOXN0h7L8Mwtm8bXPybIQ/5FCX3dA2cr6XowvGCA02CvztAnz9+JiZk1AMxG6fEreSoBiPNmoyNnuWiWVzAIAtISO08E6pZi/3N96AIDn4E3h3P8L/wshP+txtEs4JAAAAABJRU5ErkJggg==);
  background-repeat: no-repeat;
}

/* packages/widgets/Source/Viewer/Viewer.css */
.cesium-viewer {
  font-family: sans-serif;
  font-size: 16px;
  overflow: hidden;
  display: block;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.cesium-viewer-cesiumWidgetContainer {
  width: 100%;
  height: 100%;
}
.cesium-viewer-bottom {
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  padding-right: 5px;
}
.cesium-viewer .cesium-widget-credits {
  display: inline;
  position: static;
  bottom: auto;
  left: auto;
  padding-right: 0;
  color: #ffffff;
  font-size: 10px;
  text-shadow: 0 0 2px #000000;
}
.cesium-viewer-timelineContainer {
  position: absolute;
  bottom: 0;
  left: 169px;
  right: 29px;
  height: 27px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  font-size: 14px;
}
.cesium-viewer-animationContainer {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0;
  width: 169px;
  height: 112px;
}
.cesium-viewer-fullscreenContainer {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0;
  width: 29px;
  height: 29px;
  overflow: hidden;
}
.cesium-viewer-vrContainer {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0;
  width: 29px;
  height: 29px;
  overflow: hidden;
}
.cesium-viewer-toolbar {
  display: block;
  position: absolute;
  top: 5px;
  right: 5px;
}
.cesium-viewer-cesiumInspectorContainer {
  display: block;
  position: absolute;
  top: 50px;
  right: 10px;
}
.cesium-viewer-geocoderContainer {
  position: relative;
  display: inline-block;
  margin: 0 3px;
}
.cesium-viewer-cesium3DTilesInspectorContainer {
  display: block;
  position: absolute;
  top: 50px;
  right: 10px;
  max-height: calc(100% - 120px);
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}
.cesium-viewer-voxelInspectorContainer {
  display: block;
  position: absolute;
  top: 50px;
  right: 10px;
  max-height: calc(100% - 120px);
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}

/* packages/widgets/Source/I3SBuildingSceneLayerExplorer/I3SBuildingSceneLayerExplorer.css */
ul {
  list-style-type: none;
}
.layersList {
  padding: 0;
}
input {
  margin: 0 3px 0 0;
}
.expandItem {
  cursor: pointer;
  user-select: none;
  width: 20px;
}
.nested,
#bsl-wrapper {
  display: none;
}
.active {
  display: block;
}
.li-wrapper {
  display: flex;
  flex-direction: row;
  align-content: center;
}

/* packages/widgets/Source/widgets.css */
`;class yt extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"container",document.createElement("div"));i(this,"viewer");i(this,"imageryLayers",{});i(this,"_isOpen",!1);i(this,"isFirstLoad",!0);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet,t=new CSSStyleSheet;e.replace(tn),t.replace(nn),this.shadowRoot.adoptedStyleSheets=[t,e]}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("reduce"):this.classList.remove("reduce")}connectedCallback(){this.render(),this.addBaseLayers(ge.instance.mapThemes),this.setup(),this.addSavedPath()}render(){this.container.classList.add("map"),this.shadowRoot.append(this.container),Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjY2YmYxNy1mNTM2LTRlOWYtYTUyZC01ZmY0NjBhNzllMWEiLCJpZCI6MTY5MDU3LCJpYXQiOjE2OTU4ODQ4NzB9.bN66rOR5h37xuKVsuUSYRSLOGJy-34IhH9S1hr4NOOE",this.viewer=new Cesium.Viewer(this.container,{baseLayerPicker:!1,geocoder:!1,timeline:!1,animation:!1,homeButton:!1,navigationInstructionsInitiallyVisible:!1,navigationHelpButton:!1,sceneModePicker:!1,fullscreenButton:!1,infoBox:!1,sceneMode:Cesium.SceneMode.SCENE2D,mapMode2D:Cesium.MapMode2D.ROTATE,mapProjection:new Cesium.WebMercatorProjection})}setup(){this.viewer.screenSpaceEventHandler.setInputAction(e=>{this.mouseOver(e)},Cesium.ScreenSpaceEventType.MOUSE_MOVE),this.viewer.screenSpaceEventHandler.setInputAction(e=>{this.clickOnMap(e)},Cesium.ScreenSpaceEventType.LEFT_CLICK),l.instance.subscribe("toggle-tabs",e=>this.isOpen=e),l.instance.subscribe("sidenav-status-change",e=>e===M.Close?this.isOpen=!1:this.isOpen=!0),l.instance.subscribe("change-theme",e=>this.changeTheme(e.isPhysicalMap,e.theme)),l.instance.subscribe("change-map-mode",()=>this.changeMapMode()),l.instance.subscribe("toggle-physical-map",e=>this.togglePhysicalMap(e.isPhysicalMap,e.currentTheme)),l.instance.subscribe("check-user-position",e=>this.checkUserPin(e)),l.instance.subscribe("add-layer",e=>this.addLayer(e)),l.instance.subscribe("unbench-layer",e=>this.unbenchLayer(e)),l.instance.subscribe("remove-layer-from-bench",e=>this.removeLayerFromBench(e)),l.instance.subscribe("bench-layer",e=>this.benchLayer(e)),l.instance.subscribe("bench-all-layers",()=>this.benchAllLayers()),l.instance.subscribe("load-custom-path",e=>{let t=se.instance.createGeojsonFeatureCollectionFromPois(e.pois);this.loadCustomDataSource(t,"custom-path")}),l.instance.subscribe("selected-poi",e=>{if(!e||e.type!==oe.Point)return;let t=se.instance.createGeojsonFeatureCollectionFromPois([e]);this.setCameraToPosition(e.position),this.loadCustomDataSource(t,"selected-feature")}),l.instance.subscribe("set-position",e=>{e?(this.checkUserPin(e),this.isFirstLoad&&(this.setCameraToPosition(e),this.isFirstLoad=!1)):L.instance.createSnackbar(T.Error,"error","Impossibile rilevare la posizione del dispositivo.")}),l.instance.subscribe("set-camera",e=>{e?this.setCameraToPosition(e):L.instance.createSnackbar(T.Error,"error","Impossibile rilevare la posizione del dispositivo.")})}disconnectedCallback(){l.instance.unsubscribeAll("toggle-tabs"),l.instance.unsubscribeAll("sidenav-status-change"),l.instance.unsubscribeAll("change-theme"),l.instance.unsubscribeAll("change-map-mode"),l.instance.unsubscribeAll("toggle-physical-map"),l.instance.unsubscribeAll("check-user-position"),l.instance.unsubscribeAll("add-layer"),l.instance.unsubscribeAll("unbench-layer"),l.instance.unsubscribeAll("remove-layer-from-bench"),l.instance.unsubscribeAll("bench-layer"),l.instance.unsubscribeAll("bench-all-layers"),l.instance.unsubscribeAll("load-custom-path"),l.instance.unsubscribeAll("selected-poi"),l.instance.unsubscribeAll("set-position"),l.instance.unsubscribeAll("set-camera")}mouseOver(e){const t=e.endPosition;this.viewer.scene.pick(t)?document.body.style.cursor="pointer":document.body.style.cursor="default"}clickOnMap(e){l.instance.publish("empty-searchbar",null);const t=e.position,r=this.viewer.scene.pick(t);if(!r||!r.id){B.instance.status=M.Close,xe.instance.isOpen=!1,q.instance.selectedPoi=null,this.removeCustomDataSource("selected-feature");return}if(!(r.id instanceof Cesium.Entity)){q.instance.selectedPoi=null,this.removeCustomDataSource("selected-feature");return}const s=r.id;if(s.id==="user-pin"){q.instance.selectedPoi=null,this.removeCustomDataSource("selected-feature");return}if(s.name&&(s.name.includes("selected-feature")||s.name.includes("custom-path"))){q.instance.selectedPoi=null,this.removeCustomDataSource("selected-feature");return}xe.instance.isOpen=!1,B.instance.status=M.Open;const o=se.instance.createGeoJsonFromEntity(s);this.loadCustomDataSource(o,"selected-feature");const p=q.instance.parsePoi(s);q.instance.selectedPoi=p,this.setCameraToPosition(p.position)}addBaseLayers(e){e.forEach(t=>{const r=new Cesium.ImageryLayer(ge.instance.createImageryProvider(t));this.viewer.imageryLayers.add(r),this.imageryLayers[t.layer]=r})}addSavedPath(){h.instance.activeLayers.forEach(t=>this.addLayerToMap(t));const e=se.instance.createGeojsonFeatureCollectionFromPois(h.instance.selectedCustomPath.pois);this.loadCustomDataSource(e,"custom-path")}changeTheme(e,t){if(e)return;const r=this.viewer.imageryLayers.indexOf(this.imageryLayers[t.layer]);let s=this.viewer.imageryLayers.get(r);this.viewer.imageryLayers.raiseToTop(s)}togglePhysicalMap(e,t){if(e)for(const r in this.imageryLayers){const s=this.viewer.imageryLayers.indexOf(this.imageryLayers[r]),o=this.viewer.imageryLayers.get(s);this.viewer.imageryLayers.lowerToBottom(o)}else this.changeTheme(e,t)}changeMapMode(){this.viewer.scene.mode===Cesium.SceneMode.SCENE3D?this.viewer.scene.morphTo2D(1):this.viewer.scene.morphTo3D(1)}setCameraToPosition(e){let t=this.viewer.camera.positionCartographic;t.height>2e6?t.height=2e3:t.height;let r=Cesium.Cartesian3.fromDegrees(8.934080815653985,44.40753207658791,2e3);e&&e instanceof GeolocationPosition&&(r=Cesium.Cartesian3.fromDegrees(e.coords.longitude,e.coords.latitude,t.height)),e&&e instanceof Cesium.Cartographic&&(r=Cesium.Cartesian3.fromRadians(e.longitude,e.latitude,t.height)),this.viewer.camera.flyTo({destination:r,orientation:{heading:Cesium.Math.toRadians(0),pitch:Cesium.Math.toRadians(-90),roll:0},duration:.5})}checkUserPin(e){const t=this.viewer.entities.getById("user-pin");t?this.updateUserPin(t,e):this.createUserPin(e)}createUserPin(e){this.viewer.entities.add({name:"user-pin",id:"user-pin",position:Cesium.Cartesian3.fromDegrees(e.coords.longitude,e.coords.latitude,0),point:{pixelSize:8,color:Cesium.Color.BLUE.withAlpha(.5),outlineColor:Cesium.Color.BLUE,outlineWidth:1}})}updateUserPin(e,t){if(!e.position)return;const r=e.position.getValue(Cesium.JulianDate.now(),new Cesium.Cartesian3);if(!r)return;const s=new Cesium.Cartesian3(t.coords.longitude,t.coords.latitude,t.coords.altitude?t.coords.altitude:0),o=Cesium.JulianDate.now(),p=Cesium.JulianDate.addSeconds(o,10,new Cesium.JulianDate),f=new Cesium.SampledPositionProperty;f.addSample(o,r),f.addSample(p,s),e.position=f,this.viewer.clock.startTime=o.clone(),this.viewer.clock.stopTime=p.clone(),this.viewer.clock.currentTime=o.clone(),this.viewer.clock.clockRange=Cesium.ClockRange.LOOP_STOP,this.viewer.clock.multiplier=1}async loadCustomDataSource(e,t){let r=await Cesium.GeoJsonDataSource.load(e);this.viewer.dataSources.getByName(t).forEach(o=>this.viewer.dataSources.remove(o)),r.name=t,se.instance.styleFeature(r,ke.createEmpty()),await this.viewer.dataSources.add(r),r.entities.values.forEach((o,p)=>o.name=`${t}-${p}`),this.viewer.dataSources.lowerToBottom(r)}removeCustomDataSource(e){this.viewer.dataSources.getByName(e).forEach(r=>this.viewer.dataSources.remove(r))}async addLayerToMap(e){try{const t=se.instance.createGeoJson(e),r=await Cesium.GeoJsonDataSource.load(t);r.name=e.layer,this.viewer.dataSources.add(r),se.instance.styleFeature(r,e.style)}catch(t){throw t}}isLayerOnMap(e){return this.viewer.dataSources.getByName(e.layer).length>0}addLayerToActiveLayers(e){const t=h.instance.activeLayers;t.unshift(e),h.instance.activeLayers=[...t];let r=h.instance.benchLayers;r.some(o=>o.layer===e.layer)&&(r=r.filter(o=>o.layer!==e.layer),h.instance.benchLayers=r)}removeLayerFromMap(e){this.viewer.dataSources.getByName(e.layer).forEach(r=>this.viewer.dataSources.remove(r))}removeLayerFromActiveLayers(e){let t=h.instance.activeLayers;t=t.filter(r=>r.layer!==e.layer),h.instance.activeLayers=[...t]}removeLayer(e){let t=h.instance.activeLayers;this.viewer.dataSources.getByName(e.layer).forEach(s=>this.viewer.dataSources.remove(s)),t=t.filter(s=>s.layer!==e.layer),h.instance.activeLayers=[...t]}addLayerToBench(e){let t=h.instance.benchLayers;t.unshift(e),h.instance.benchLayers=[...t]}removeLayerFromBench(e){let t=h.instance.benchLayers;t=t.filter(r=>r.layer!==e.layer),h.instance.benchLayers=t}async addLayer(e){if(this.isLayerOnMap(e))L.instance.createSnackbar(T.Temporary,"","Layer già presente",3);else try{L.instance.createSnackbar(T.Loader,e.layer,"Caricamento..."),await this.addLayerToMap(e),this.addLayerToActiveLayers(e),L.instance.removeSnackbar(e.layer)}catch{L.instance.removeSnackbar(e.layer),L.instance.createSnackbar(T.Error,"","Errore nel caricamento del layer")}}benchLayer(e){this.removeLayerFromMap(e),this.removeLayerFromActiveLayers(e),this.addLayerToBench(e)}benchAllLayers(){h.instance.activeLayers.forEach(e=>{this.removeLayerFromMap(e),this.removeLayerFromActiveLayers(e),this.addLayerToBench(e)})}async unbenchLayer(e){try{L.instance.createSnackbar(T.Loader,e.layer,"Caricamento..."),await this.addLayerToMap(e),this.removeLayerFromBench(e),this.addLayerToActiveLayers(e),L.instance.removeSnackbar(e.layer)}catch{L.instance.removeSnackbar(e.layer),L.instance.createSnackbar(T.Error,"","Errore nel caricamento del layer")}}}customElements.define("app-map",yt);const rn=`.page {\r
    height: 100dvh;\r
}\r
\r
.header {\r
    position: fixed;\r
    top: 0;\r
    left: 0;\r
    width: 100%;\r
    padding: 24px;\r
    box-sizing: border-box;\r
    display: flex;\r
    align-items: center;\r
}\r
\r
.search {\r
    display: flex;\r
    width: 360px;\r
}\r
\r
app-search-result {\r
    position: fixed;\r
    top: 80px;\r
    left: 24px;\r
    z-index: 999;\r
    width: 356px;\r
}\r
\r
.fa-button {\r
    cursor: pointer;\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
    width: 40px;\r
    height: 40px;\r
    padding: 16px;\r
    font-size: 1.4rem;\r
    color: var(--on-surface);\r
    background-color: var(--surface-container);\r
    border: none;\r
\r
    &:hover {\r
        color: var(--on-surface-variant);\r
        background-color: var(--surface-container-low);\r
    }\r
}\r
\r
button[is="app-tabs-toggle"] {\r
    border-radius: var(--border-radius-circle) 0 0 var(--border-radius-circle);\r
}\r
\r
button.tags-page-link {\r
    border-radius: 0 var(--border-radius-circle) var(--border-radius-circle) 0;\r
}\r
\r
.map-controls {\r
    border-radius: var(--border-radius-m);\r
    animation: slideOut .3s ease-in-out forwards;\r
}\r
\r
.map-controls.open {\r
    animation: slideIn .3s ease-in-out forwards;\r
}\r
\r
input[is="app-searchbar"] {\r
    font-family: 'Inter', Arial, Helvetica, sans-serif;\r
    color: var(--on-surface);\r
    background-color: var(--surface-container);\r
    padding: 0 16px;\r
    border: none;\r
    width: 100%;\r
    outline: none;\r
    border-radius: 0;\r
\r
    &::placeholder {        \r
        opacity: .5\r
    }\r
\r
    &:focus {\r
        background-color: var(--surface-container-low);\r
    }\r
}\r
\r
// app-tabs-sidenav {\r
//     position: fixed;\r
//     top: 0;\r
//     right: -360px;\r
// }\r
\r
app-bench {\r
    position: fixed;\r
    top: 50%;\r
    right: -360px;\r
}\r
\r
.material-symbols-outlined {\r
    font-family: 'Material Symbols Outlined';\r
    font-variation-settings:\r
        'FILL' 0,\r
        'wght' 400,\r
        'GRAD' 0,\r
        'opsz' 24;\r
}\r
\r
@media screen and (max-width: 768px) {\r
    .header {\r
       flex-direction: column;\r
       gap: 8px;\r
       padding: 4%;\r
    }\r
\r
    .search {\r
        width: 100%;\r
    }\r
\r
    app-search-result {\r
        top: 112px;\r
        left: 4%;\r
        width: calc(100% - 8%);\r
    }\r
\r
    app-bench {\r
        top: inherit;\r
        right: inherit;\r
        bottom: 4%;\r
        left: -360px;\r
    }\r
\r
    // app-tabs-sidenav {\r
    //     top: inherit;\r
    //     right: inherit;\r
    //     bottom: 0;\r
    //     left: 0;\r
    // }\r
}`;class sn extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"map",new yt);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(rn),this.shadowRoot.adoptedStyleSheets.push(e)}async connectedCallback(){const e=document.createElement("app-splash");document.body.append(e),await j.instance.getData(),await ge.instance.getMapThemes(),await ve.instance.startWatchingUserPosition(),h.instance.paths.some(r=>r.name==="default")||h.instance.saveNewPath("default");const t=h.instance.paths.find(r=>r.lastSelected===!0);t&&(h.instance.selectedCustomPath={...t}),this.render(),this.setup(),setTimeout(()=>e.remove(),500)}render(){this.shadowRoot.innerHTML=`
            <div class="page">
                <app-map></app-map>
                <div class="header">
                    <div class="search">
                        <button is="app-tabs-toggle" class="fa-button">
                            <span class="icon">
                                <span class="material-symbols-outlined">menu</span>
                            </span>
                        </button>
                        <input is="app-searchbar" type="text" placeholder="Cerca per livelli...">
                        <button is="app-bench-toggle" class="fa-button">
                            <span class="icon">
                                <span class="material-symbols-outlined">stacks</span>
                            </span>
                        </button>
                        <button is="app-map-theme-btn" class="fa-button">
                            <span class="icon">
                                <span class="material-symbols-outlined">contrast</span>
                            </span>
                        </button>
                        <button class="fa-button tags-page-link">
                            <span class="icon">
                                <span class="material-symbols-outlined">label</span>
                            </span>
                        </button>
                    </div>
                    <app-carousel></app-carousel>
                </div>
                <app-search-result></app-search-result>
                <app-map-controls></app-map-controls>
                <app-tabs-sidenav></app-tabs-sidenav>
                <app-bench></app-bench>
            </div>
            `,this.map=this.shadowRoot.querySelector("app-map")}setup(){const e=this.shadowRoot.querySelector(".tags-page-link");e&&e.addEventListener("click",()=>window.location.hash="/")}}customElements.define("page-map",sn);class on extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>l.instance.publish("change-map-mode",null)),l.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}disconnectedCallback(){l.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-map-mode-btn",on,{extends:"button"});class an extends HTMLButtonElement{constructor(){super()}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>ge.instance.toggleTheme())}}customElements.define("app-map-theme-btn",an,{extends:"button"});class cn extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.setup()}setup(){this.addEventListener("click",async()=>{l.instance.publish("set-camera",ve.instance.position)}),l.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}disconnectedCallback(){l.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-center-position-btn",cn,{extends:"button"});class ln extends HTMLInputElement{constructor(){super();i(this,"_inputValue","")}get inputValue(){return this._inputValue}set inputValue(e){this._inputValue=e,this.update()}connectedCallback(){this.setup()}setup(){this.addEventListener("input",()=>this.inputValue=this.value),l.instance.subscribe("empty-searchbar",()=>this.value=this.inputValue="")}update(){let e={layers:[],searchValue:""};this.inputValue===""||(e={layers:j.instance.filterLayersByNameAndTag(j.instance.data,this.value.toLowerCase()),searchValue:this.inputValue}),l.instance.publish("search-layer",e)}disconnectedCallback(){l.instance.unsubscribeAll("empty-searchbar")}}customElements.define("app-searchbar",ln,{extends:"input"});class S{constructor(n,e){i(this,"rgb");i(this,"hex");i(this,"hsl");n==="rgb"?(this.rgb=S.isValidRgb(e)?e:"rgb(31, 111, 235)",this.hex=S.rgbToHex(this.rgb),this.hsl=S.rgbToHsl(this.rgb)):n==="hex"?(this.hex=S.isValidHex(e)?e:"#1f6feb",this.rgb=S.hexToRgb(this.hex),this.hsl=S.rgbToHsl(this.rgb)):(this.rgb="rgb(31, 111, 235)",this.hex="#1f6feb",this.hsl=[216,84,52])}static createEmpty(){return new S("rgb","rgb(31, 111, 235)")}static isValidRgb(n){return/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(n)}static isValidHex(n){return/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(n)}static rgbToHex(n){const e=n.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);if(!e)throw new Error("Invalid RGB format");const[,t,r,s]=e.map(Number);return`#${((1<<24)+(t<<16)+(r<<8)+s).toString(16).slice(1)}`}static hexToRgb(n){n=n.replace(/^#/,"");const e=parseInt(n,16),t=e>>16&255,r=e>>8&255,s=e&255;return`rgb(${t}, ${r}, ${s})`}static rgbToRgba(n,e){return n.replace("rgb","rgba").slice(0,-1)+`, ${e})`}static rgbToHsl(n){const e=n.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);if(!e)throw new Error("Invalid RGB format");const[t,r,s]=e.slice(1).map(Number),o=t/255,p=r/255,f=s/255,x=Math.max(o,p,f),I=Math.min(o,p,f);let H=0,A=0;const _=(x+I)/2;if(x!==I){switch(A=_>.5?(x-I)/(2-x-I):(x-I)/(x+I),x){case o:H=(p-f)/(x-I)+(p<f?6:0);break;case p:H=(f-o)/(x-I)+2;break;case f:H=(o-p)/(x-I)+4;break}H/=6}return[Math.round(H*360),Math.round(A*100),Math.round(_*100)]}static hslToRgb(n){const[e,t,r]=n,s=e/360,o=t/100,p=r/100,f=(A,_,V)=>(V<0&&(V+=1),V>1&&(V-=1),V<1/6?A+(_-A)*6*V:V<1/2?_:V<2/3?A+(_-A)*(2/3-V)*6:A);let x,I,H;if(t===0)x=I=H=p;else{const A=p<.5?p*(1+o):p+o-p*o,_=2*p-A;x=f(_,A,s+1/3),I=f(_,A,s),H=f(_,A,s-1/3)}return`rgb(${Math.round(x*255)}, ${Math.round(I*255)}, ${Math.round(H*255)})`}}class vt extends HTMLButtonElement{constructor(){super();i(this,"_layer",$.createEmpty());i(this,"legend",document.createElement("span"))}get layer(){return this._layer}set layer(e){this._layer=e}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <div class="info">
                <span class="legend"></span>
                <label>${this.layer.name}</label>
            </div>
            <span class="icon add-icon">
                <span class="material-symbols-outlined">add</span>
            </span>
            `,this.legend=this.querySelector(".legend"),this.legend.style.backgroundColor=S.rgbToRgba(S.hexToRgb(this._layer.style.color),.5),this.legend.style.borderColor=this._layer.style.color}setup(){this.addEventListener("click",()=>{l.instance.publish("add-layer",this.layer)})}}customElements.define("app-search-result-chip",vt,{extends:"button"});const dn=`:host {\r
    display: none;\r
}\r
\r
:host(.visible) {\r
    display: flex;\r
    flex-direction: column;\r
    gap: 8px;\r
}\r
\r
.container {\r
    display: flex;\r
    flex-direction: column;\r
    gap: 8px;\r
    max-height: 192px;\r
    overflow-y: auto;\r
    padding: 16px;\r
    color: var(--on-surface);\r
    background-color: var(--surface-container);\r
    border-radius: var(--border-radius-m);\r
    scrollbar-width: thin;\r
    scrollbar-color: var(--surface-container-high) transparent;\r
}\r
\r
.material-symbols-outlined {\r
    font-family: 'Material Symbols Outlined';\r
    font-variation-settings:\r
        'FILL' 0,\r
        'wght' 400,\r
        'GRAD' 0,\r
        'opsz' 24;\r
}\r
`,un=`button[is="app-search-result-chip"] {\r
    cursor: pointer;\r
    display: flex;\r
    align-items: center;\r
    justify-content: space-between;\r
    width: 100%;\r
    text-wrap: nowrap;\r
    color: var(--on-surface);\r
    background-color: var(--surface-container-high);\r
    border: none;\r
    border-radius: var(--border-radius-circle);\r
    padding: 8px 16px;\r
}\r
\r
button[is="app-search-result-chip"] .info {\r
    display: flex;\r
    gap: 8px;\r
}\r
\r
button[is="app-search-result-chip"] .info .legend {\r
    display: inline-block;\r
    width: 12px;\r
    height: 12px;\r
    min-width: 12px;\r
    border-radius: 100%;\r
    border-width: 2px;\r
    border-style: solid;\r
}\r
\r
button[is="app-search-result-chip"] .info label {\r
    cursor: pointer;\r
}\r
\r
button[is="app-search-result-chip"] .icon {\r
    font-size: 1.4rem;\r
}`;class pn extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"container",document.createElement("div"));i(this,"_layers",[]);i(this,"_isVisible",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(dn);let t=new CSSStyleSheet;t.replaceSync(un),this.shadowRoot.adoptedStyleSheets=[e,t]}get layers(){return this._layers}set layers(e){this._layers=e,this.update()}get isVisible(){return this._isVisible}set isVisible(e){this._isVisible=e,this._isVisible===!0?this.classList.add("visible"):this.classList.remove("visible")}connectedCallback(){this.render(),this.setup()}render(){this.container.classList.add("container"),this.shadowRoot.append(this.container)}setup(){l.instance.subscribe("search-layer",e=>{if(this.container.innerHTML="",e.searchValue===""){this.isVisible=!1;return}this.isVisible=!0,this.layers=e.layers})}update(){if(this._layers.length===0){let e=document.createElement("p");e.innerHTML="Nessun livello trovato",this.container.append(e);return}this._layers.forEach(e=>{let t=new vt;t.layer=e,t.setAttribute("is","app-search-result-chip"),this.container.append(t)})}disconnectedCallback(){l.instance.unsubscribeAll("search-layer")}}customElements.define("app-search-result",pn);class hn extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1);i(this,"icon");this.icon=this.querySelector(".material-symbols-outlined")}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.update()}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{B.instance.status!==0?B.instance.status=0:B.instance.status=1}),l.instance.subscribe("sidenav-status-change",e=>{e===0?this.isOpen=!1:this.isOpen=!0})}update(){this.isOpen?this.icon.innerHTML="close":this.icon.innerHTML="menu"}disconnectedCallback(){l.instance.unsubscribeAll("sidenav-status-change")}}customElements.define("app-tabs-toggle",hn,{extends:"button"});const mn=`:host {\r
    position: fixed;\r
    top: 0;\r
    right: -360px;\r
    width: 360px;\r
    height: 100dvh;\r
    background-color: var(--surface-container);\r
    animation: slideOut .3s ease-in-out forwards;\r
}\r
\r
:host(.open) {\r
    animation: slideIn .3s ease-in-out forwards;\r
}\r
\r
.toggle {\r
    cursor: pointer;\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
    height: 32px;\r
}\r
\r
.dragger {\r
    height: 3px;\r
    width: 40px;\r
    background-color: var(--on-surface);\r
    border-radius: var(--border-radius-circle);\r
    transition: .1s ease-in-out;\r
    \r
    &.dragging {\r
        width: 20px;\r
        transition: .1s ease-in-out;\r
    }\r
}\r
\r
@keyframes slideIn {\r
    from {\r
        right: -360px;\r
    }\r
\r
    to {\r
        right: 0;\r
    }\r
}\r
\r
@keyframes slideOut {\r
    from {\r
        right: 0;\r
    }\r
\r
    to {\r
        right: -360px;\r
    }\r
}\r
\r
@media screen and (max-width: 768px) {\r
    :host {\r
        top: inherit;\r
        right: inherit;\r
        bottom: 0;\r
        left: 0;\r
        width: 100%;\r
        height: 360px;\r
    }\r
\r
    :host(.full) {\r
        animation: expand .3s ease-in-out forwards;\r
    }\r
\r
    @keyframes slideIn {\r
        from {\r
            bottom: -360px;\r
        }\r
    \r
        to {\r
            bottom: 0;\r
        }\r
    }\r
    \r
    @keyframes slideOut {\r
        from {\r
            bottom: 0;\r
        }\r
    \r
        to {\r
            bottom: -360px;\r
        }\r
    }\r
\r
    @keyframes expand {\r
        to {\r
            height: 100dvh;\r
        }\r
    }\r
\r
    @keyframes shrink {\r
        to {\r
            height: 360px;\r
        }\r
    }\r
}`;class gn extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_isVisible",!1);i(this,"startY",0);i(this,"startHeight",360);i(this,"currentHeight",0);i(this,"deltaHeight",0);i(this,"_isDragging",!1);i(this,"_status",M.Close);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(mn),this.shadowRoot.adoptedStyleSheets.push(e)}get isVisible(){return this._isVisible}set isVisible(e){this._isVisible=e,this.update()}get isDragging(){return this._isDragging}set isDragging(e){this._isDragging=e;const t=this.shadowRoot.querySelector(".dragger");t&&(this.isDragging?t.classList.add("dragging"):t.classList.remove("dragging"))}get status(){return this._status}set status(e){this._status=e,this.updateStatus(e)}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="toggle">
                <div class="dragger"></div>
            </div>
            <app-tabs></app-tabs>
            `}setup(){l.instance.subscribe("sidenav-status-change",t=>this.status=t);const e=this.shadowRoot.querySelector(".toggle");e&&(e.addEventListener("mousedown",this.onDragStart.bind(this)),document.addEventListener("mousemove",this.onDragMove.bind(this)),document.addEventListener("mouseup",this.onDragEnd.bind(this)),e.addEventListener("touchstart",this.onDragStart.bind(this)),document.addEventListener("touchmove",this.onDragMove.bind(this)),document.addEventListener("touchend",this.onDragEnd.bind(this)))}update(){this.isVisible===!0?this.classList.add("open"):this.classList.remove("open")}disconnectedCallback(){l.instance.unsubscribeAll("sidenav-status-change");const e=this.shadowRoot.querySelector(".toggle");e&&(e.removeEventListener("mousedown",this.onDragStart.bind(this)),e.removeEventListener("touchstart",this.onDragStart.bind(this))),document.removeEventListener("mousemove",this.onDragMove.bind(this)),document.removeEventListener("mouseup",this.onDragEnd.bind(this)),document.removeEventListener("touchmove",this.onDragMove.bind(this)),document.removeEventListener("touchend",this.onDragEnd.bind(this))}onDragStart(e){this.isMobile()&&(e.preventDefault(),this.isDragging=!0,this.startY=this.isTouchEvent(e)?e.touches[0].clientY:e.clientY)}onDragMove(e){if(!this.isMobile()||!this.isDragging)return;const t=this.isTouchEvent(e)?e.touches[0].clientY:e.clientY;this.deltaHeight=t-this.startY,this.currentHeight=this.startHeight-this.deltaHeight,this.style.height=`${this.currentHeight}px`}onDragEnd(){if(this.isMobile()&&this.isDragging){switch(this.isDragging=!1,this.status){case M.Open:Math.abs(this.deltaHeight)>100?this.deltaHeight<0?B.instance.status=M.Full:B.instance.status=M.Close:B.instance.status=M.Open;break;case M.Full:Math.abs(this.deltaHeight)>100?this.deltaHeight>0&&(B.instance.status=M.Open):B.instance.status=M.Full;break}this.deltaHeight=0}}updateStatus(e){switch(e){case M.Close:this.classList.remove("open"),this.startHeight=0;break;case M.Open:this.classList.add("open"),this.isMobile()&&(this.style.height="360px",this.startHeight=360);break;case M.Full:this.style.height="100dvh",this.startHeight=window.innerHeight;break}}isMobile(){return window.innerWidth<=768}isTouchEvent(e){return"touches"in e}}customElements.define("app-tabs-sidenav",gn);class wt extends HTMLButtonElement{constructor(){super();i(this,"_layer",$.createEmpty());i(this,"legend",document.createElement("span"));i(this,"removeIcon",document.createElement("span"))}get layer(){return this._layer}set layer(e){this._layer=e}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <div class="info">
                <span class="legend"></span>
                <label>${this.layer.name}</label>
            </div>
            <span class="divider"></span>
            <span class="icon add-icon">
                <span class="material-symbols-outlined">close</span>
            </span>
            `,this.legend=this.querySelector(".legend"),this.legend.style.backgroundColor=S.rgbToRgba(S.hexToRgb(this._layer.style.color),.5),this.legend.style.borderColor=this._layer.style.color,this.removeIcon=this.querySelector(".icon")}setup(){this.removeIcon.addEventListener("click",()=>{l.instance.publish("bench-layer",this.layer),l.instance.publish("open-bench",!0)})}}customElements.define("app-carousel-chip",wt,{extends:"button"});const bn=`:host {\r
    background-color: transparent;\r
    display: flex;\r
    gap: 8px;\r
    overflow-x: auto;\r
    max-width: calc(100% - 360px);\r
    width: 100%;\r
    scrollbar-width: none;\r
    padding: 0 0 0 16px;\r
    box-sizing: border-box;\r
}\r
\r
.material-symbols-outlined {\r
    font-family: 'Material Symbols Outlined';\r
    font-variation-settings:\r
        'FILL' 0,\r
        'wght' 400,\r
        'GRAD' 0,\r
        'opsz' 24;\r
}\r
\r
@media screen and (max-width: 768px) {\r
    :host {\r
        padding: 0;\r
        max-width: 100%;\r
    }\r
}`,fn=`button[is="app-carousel-chip"] {\r
    cursor: pointer;\r
    font-family: 'Inter', Arial, Helvetica, sans-serif;\r
    font-weight: 400;\r
    font-size: 1rem;\r
    display: flex;\r
    align-items: center;\r
    justify-content: space-between;\r
    height: 40px;\r
    text-wrap: nowrap;\r
    color: var(--on-surface);\r
    background-color: var(--surface-container);\r
    border: none;\r
    padding: 0;\r
    border-radius: var(--border-radius-circle);\r
}\r
\r
button[is="app-carousel-chip"] .info {\r
    display: flex;\r
    align-items: center;\r
    height: 100%;\r
    width: 100%;\r
    gap: 8px;\r
    padding: 0 16px;\r
    border-radius: var(--border-radius-circle) 0  0 var(--border-radius-circle);\r
}\r
\r
button[is="app-carousel-chip"] .info .legend {\r
    display: inline-block;\r
    width: 12px;\r
    height: 12px;\r
    min-width: 12px;\r
    border-radius: 100%;\r
    border-width: 2px;\r
    border-style: solid;\r
}\r
\r
button[is="app-carousel-chip"] .info label {\r
    cursor: pointer;\r
}\r
\r
button[is="app-carousel-chip"] .divider {\r
    width: 1px;\r
    height: calc(100% - 16px);\r
    background-color: var(--outline);\r
}\r
\r
button[is="app-carousel-chip"] .icon {\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
    font-size: 1.4rem;\r
    height: 40px;\r
    padding: 0 16px 0 12px;\r
    color: crimson;\r
    border-radius: 0 var(--border-radius-circle) var(--border-radius-circle) 0;\r
\r
    &:hover {\r
        background-color: var(--surface-container-low);\r
    }\r
}`;class yn extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_layers",[]);i(this,"startX",0);i(this,"dragScoll",0);i(this,"isDragging",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(bn);let t=new CSSStyleSheet;t.replaceSync(fn),this.shadowRoot.adoptedStyleSheets=[e,t]}get layers(){return this._layers}set layers(e){this._layers=e,this.update()}connectedCallback(){this.render(),this.setup()}render(){this.layers=h.instance.activeLayers}setup(){l.instance.subscribe("active-layers-updated",e=>{this.layers=[...e]}),this.addEventListener("mousedown",e=>this.startDrag(e)),this.addEventListener("mousemove",e=>this.drag(e)),this.addEventListener("mouseleave",()=>this.endDrag()),this.addEventListener("mouseup",()=>this.endDrag())}update(){this.shadowRoot.innerHTML="",this.layers.forEach(e=>{let t=new wt;t.layer=e,t.setAttribute("is","app-carousel-chip"),this.shadowRoot.append(t)})}disconnectedCallback(){l.instance.unsubscribeAll("active-layers-updated")}startDrag(e){this.isDragging=!0,this.startX=e.pageX,this.dragScoll=this.scrollLeft}endDrag(){this.isDragging=!1}drag(e){if(!this.isDragging)return;e.preventDefault();const t=e.pageX-this.startX;this.scrollLeft=this.dragScoll-t}}customElements.define("app-carousel",yn);class xt extends HTMLButtonElement{constructor(){super();i(this,"_layer",$.createEmpty());i(this,"info",document.createElement("div"));i(this,"legend",document.createElement("span"));i(this,"removeIcon",document.createElement("span"))}get layer(){return this._layer}set layer(e){this._layer=e}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <div class="info">
                <span class="legend"></span>
                <label>${this.layer.name}</label>
            </div>
            <span class="divider"></span>
            <span class="icon add-icon">
                <span class="material-symbols-outlined">delete</span>
            </span>
            `,this.info=this.querySelector(".info"),this.legend=this.querySelector(".legend"),this.legend.style.backgroundColor=S.rgbToRgba(S.hexToRgb(this._layer.style.color),.5),this.legend.style.borderColor=this._layer.style.color,this.removeIcon=this.querySelector(".icon")}setup(){this.addEventListener("click",()=>{l.instance.publish("unbench-layer",this.layer)}),this.removeIcon.addEventListener("click",e=>{e.stopPropagation(),l.instance.publish("remove-layer-from-bench",this.layer)})}}customElements.define("app-bench-chip",xt,{extends:"button"});const vn=`:host {\r
    width: 360px;\r
    height: fit-content;\r
    transform: translateY(-50%);\r
    background-color: transparent;\r
    animation: slideOut .3s ease-in-out forwards;\r
    display: flex;\r
    flex-direction: column;\r
    gap: 8px;\r
    box-sizing: border-box;\r
    max-height: 400px;\r
    overflow-y: auto;\r
    scrollbar-width: none;\r
}\r
\r
:host(.visible) {\r
    animation: slideIn .3s ease-in-out forwards;\r
}\r
\r
@keyframes slideIn {\r
    from {\r
        right: -360px;\r
    }\r
\r
    to {\r
        right: 24px;\r
    }\r
}\r
\r
@keyframes slideOut {\r
    from {\r
        right: 0;\r
    }\r
\r
    to {\r
        right: -360px;\r
    }\r
}\r
\r
@media screen and (max-width: 768px) {\r
    :host {\r
        transform: translateY(0);\r
        max-height: calc(100% - 144px);\r
        max-width: calc(100% - 96px);\r
    }\r
\r
    @keyframes slideIn {\r
        from {\r
            left: -360px;\r
        }\r
\r
        to {\r
            left: 4%;\r
        }\r
    }\r
\r
    @keyframes slideOut {\r
        from {\r
            left: 0;\r
        }\r
\r
        to {\r
            left: -360px;\r
        }\r
    }\r
}`,wn=`button[is="app-bench-chip"] {\r
    cursor: pointer;\r
    font-family: 'Inter', Arial, Helvetica, sans-serif;\r
    font-weight: 400;\r
    font-size: 1rem;\r
    display: flex;\r
    align-items: center;\r
    justify-content: space-between;\r
    height: 40px;\r
    width: 100%;\r
    text-wrap: nowrap;\r
    color: var(--on-surface);\r
    background-color:var(--surface-container);\r
    border: none;\r
    padding: 0;\r
    border-radius: var(--border-radius-circle);\r
}\r
\r
button[is="app-bench-chip"] .info {\r
    display: flex;\r
    align-items: center;\r
    height: 100%;\r
    width: 100%;\r
    gap: 8px;\r
    padding: 0 16px;\r
    border-radius: var(--border-radius-circle) 0  0 var(--border-radius-circle);\r
\r
    &:hover {\r
        background-color: var(--surface-container-low);\r
    }\r
}\r
\r
button[is="app-bench-chip"] .info .legend {\r
    display: inline-block;\r
    width: 12px;\r
    height: 12px;\r
    min-width: 12px;\r
    border-radius: 100%;\r
    border-width: 2px;\r
    border-style: solid;\r
}\r
\r
button[is="app-bench-chip"] .info label {\r
    cursor: pointer;\r
}\r
\r
button[is="app-bench-chip"] .icon {\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
    font-size: 1.4rem;\r
    height: 40px;\r
    padding: 0 16px 0 12px;\r
    color: crimson;\r
    border-radius: 0 var(--border-radius-circle) var(--border-radius-circle) 0;\r
\r
    &:hover {\r
        background-color: var(--surface-container-low);\r
    }\r
}\r
\r
button[is="app-bench-chip"] .divider {\r
    width: 1px;\r
    height: calc(100% - 16px);\r
    background-color: var(--outline)\r
}\r
\r
.material-symbols-outlined {\r
    font-family: 'Material Symbols Outlined';\r
    font-variation-settings:\r
        'FILL' 0,\r
        'wght' 400,\r
        'GRAD' 0,\r
        'opsz' 24;\r
}`;class xn extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_isVisible",!1);i(this,"_layers",[]);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(vn);let t=new CSSStyleSheet;t.replaceSync(wn),this.shadowRoot.adoptedStyleSheets=[e,t]}get isVisible(){return this._isVisible}set isVisible(e){this._isVisible=e,this.toggleBench()}get layers(){return this._layers}set layers(e){this._layers=e,this.update()}connectedCallback(){this.render(),this.setup()}render(){this.layers=h.instance.benchLayers}setup(){l.instance.subscribe("bench-layers-updated",e=>{this.layers=[...e]}),l.instance.subscribe("toggle-bench",e=>{this.isVisible=e})}update(){this.shadowRoot.innerHTML="",this.layers.forEach(e=>{let t=new xt;t.layer=e,t.setAttribute("is","app-bench-chip"),this.shadowRoot.append(t)})}disconnectedCallback(){l.instance.unsubscribeAll("bench-layers-updated"),l.instance.unsubscribeAll("toggle-bench")}toggleBench(){this.isVisible===!0?this.classList.add("visible"):this.classList.remove("visible")}}customElements.define("app-bench",xn);class kn extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{xe.instance.isOpen=!this.isOpen}),l.instance.subscribe("toggle-bench",e=>{this.isOpen=e})}disconnectedCallback(){l.instance.unsubscribeAll("toggle-bench")}}customElements.define("app-bench-toggle",kn,{extends:"button"});const Sn=`:host {\r
    display: block;\r
    height: 100%;\r
}\r
\r
.header {\r
    display: flex;\r
    justify-content: space-between;\r
    align-items: center;\r
    height: 40px;\r
}\r
\r
.tab {\r
    cursor: pointer;\r
    position: relative;\r
    font-family: 'Inter', Arial, Helvetica, sans-serif;\r
    font-size: .9rem;\r
    font-weight: 600;\r
    width: 100%;\r
    height: 100%;\r
    background-color: var(--surface-container);\r
    border: none;\r
    color: var(--on-surface);\r
}\r
\r
.border {\r
    position: absolute;   \r
    bottom: 0;\r
    left: 0;\r
    height: 2px;\r
    width: 0;\r
    background-color: var(--primary);\r
    transform-origin: left;\r
}\r
\r
.selected {\r
    color: var(--on-surface-variant);\r
    background-color: var(--surface-container-high);\r
    \r
    .border {\r
        animation: selectedTab .2s ease-in-out forwards;        \r
    }\r
}\r
\r
.panel {\r
    height: calc(100% - 72px);\r
}\r
\r
@keyframes selectedTab {\r
    to {\r
        width: 100%;\r
    }\r
}`;class Pn extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_currentTab",E.Info);i(this,"infoTab",null);i(this,"suggestedRouteTab",null);i(this,"customRouteTab",null);i(this,"panel",null);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Sn),this.shadowRoot.adoptedStyleSheets.push(e)}get currentTab(){return this._currentTab}set currentTab(e){this._currentTab=e,this.switchPanel(),this.switchTab()}connectedCallback(){this.render(),this.setup(),this.currentTab=E.Info}render(){this.shadowRoot.innerHTML=`
            <nav class="header">
                <button class="tab info-tab">Informazioni<span class="border"></span></button>
                <button class="tab suggested-route-tab">Percorsi suggeriti<span class="border"></span></button>
                <button class="tab custom-route-tab">Percorsi custom<span class="border"></span></button>
            </nav>
            <div class="panel"></div>
            `,this.infoTab=this.shadowRoot.querySelector(".info-tab"),this.suggestedRouteTab=this.shadowRoot.querySelector(".suggested-route-tab"),this.customRouteTab=this.shadowRoot.querySelector(".custom-route-tab"),this.panel=this.shadowRoot.querySelector(".panel")}setup(){this.infoTab&&this.infoTab.addEventListener("click",()=>this.currentTab=E.Info),this.suggestedRouteTab&&this.suggestedRouteTab.addEventListener("click",()=>{le.instance.isSuggestedPathSelected?this.currentTab=E.SelectedSuggestedPath:this.currentTab=E.SuggestedPath}),this.customRouteTab&&this.customRouteTab.addEventListener("click",()=>this.currentTab=E.CustomPath),l.instance.subscribe("current-tab-updated",e=>this.currentTab=e)}disconnectedCallback(){l.instance.unsubscribeAll("current-tab-updated")}renderInfoPanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<app-info-panel />")}renderSuggestedRoutePanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<app-suggested-path-panel />")}renderSelectedSuggestedRoutePanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<app-selected-suggested-path-panel />")}renderCustomPathPanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<app-custom-path-panel />")}switchPanel(){switch(this.currentTab){case E.CustomPath:this.renderCustomPathPanel();break;case E.SuggestedPath:this.renderSuggestedRoutePanel();break;case E.SelectedSuggestedPath:this.renderSelectedSuggestedRoutePanel();break;default:this.renderInfoPanel();break}}switchTab(){if(this.removeSelectedStatus(),!(!this.customRouteTab||!this.suggestedRouteTab||!this.infoTab))switch(this.currentTab){case E.CustomPath:this.customRouteTab.classList.add("selected");break;case E.SuggestedPath:this.suggestedRouteTab.classList.add("selected");break;case E.SelectedSuggestedPath:this.suggestedRouteTab.classList.add("selected");break;default:this.infoTab.classList.add("selected");break}}removeSelectedStatus(){Array.from(this.shadowRoot.querySelectorAll(".tab")).forEach(t=>t.classList.remove("selected"))}}customElements.define("app-tabs",Pn);const Cn=`:host {\r
    display: flex;\r
    flex-direction: column;\r
    height: 100%;\r
}\r
\r
h4,\r
p {\r
    margin: 0;\r
}\r
\r
.empty-msg {\r
    text-align: center;\r
    padding: 24px;\r
    box-sizing: border-box;\r
}\r
\r
.header {\r
    padding: 24px;\r
    box-sizing: border-box;\r
}\r
\r
.title {\r
    color: var(--on-surface);\r
    display: flex;\r
    align-items: center;\r
    gap: 8px;\r
}\r
\r
.legend {\r
    width: 14px;\r
    height: 14px;\r
    min-width: 14px;\r
    border-radius: 100%;\r
    border-width: 2px;\r
    border-style: solid;\r
    box-sizing: border-box;\r
}\r
\r
.category {\r
    color: var(--on-surface-variant);\r
    padding: 0 0 0 22px;\r
}\r
\r
.tools {\r
    display: flex;\r
    justify-content: space-between;\r
    gap: 8px;\r
    padding: 0 24px;\r
    box-sizing: border-box;\r
    margin: 0 0 8px 0;\r
}\r
\r
button {\r
    cursor: pointer;\r
    font-family: 'Inter', Arial, Helvetica, sans-serif;\r
    font-weight: 600;\r
    font-size: 1rem;\r
    width: 100%;\r
    height: 32px;\r
    border-radius: var(--border-radius-circle);\r
    color: var(--on-surface);\r
    background-color: var(--surface-container-high);\r
    border: 1px solid var(--outline);\r
    &:hover {\r
        opacity: 0.8;\r
    }\r
}\r
\r
.directions-btn {\r
    background-color: var(--primary);\r
    color: var(--on-primary);\r
    border: 1px solid transparent;\r
}\r
\r
.info {\r
    overflow-y: hidden;\r
    flex: 1;\r
    display: flex;\r
    flex-direction: column;\r
}\r
\r
.toggle-info {\r
    width: calc(100% - 48px);\r
    margin: 0 auto;\r
}\r
\r
.info-content {\r
    // display: none;\r
    overflow-y: auto;\r
    flex: 1;\r
    box-sizing: border-box;\r
    padding: 24px;\r
    scrollbar-width: thin;\r
    scrollbar-color: var(--surface-container-high) transparent;\r
}\r
\r
// .visible {\r
//     display: block;\r
// }\r
\r
.property {\r
    margin: 0 0 16px 0;\r
}\r
\r
.property:last-child {\r
    margin: 0;\r
}\r
\r
.property-label {\r
    display: block;\r
    color: var(--on-surface-variant);\r
    margin: 0 0 2px 0;\r
}\r
\r
.property-value {\r
    color: var(--on-surface);\r
}`;class Ln extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_poi",q.instance.selectedPoi);i(this,"_isInfoOpen",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Cn),this.shadowRoot.adoptedStyleSheets.push(e)}get poi(){return this._poi}set poi(e){this._poi=e,this.isInfoOpen=!1,this.update()}get isInfoOpen(){return this._isInfoOpen}set isInfoOpen(e){this._isInfoOpen=e,this.toggleInfo()}connectedCallback(){this.render(),this.setup(),this.poi&&this.update()}disconnectedCallback(){l.instance.unsubscribe("selected-poi",this.handleSelectedPoi.bind(this))}handleSelectedPoi(e){this.poi=e}render(){this.shadowRoot.innerHTML='<p class="empty-msg">Nessun punto selezionato</p>'}setup(){this.handleSelectedPoi=this.handleSelectedPoi.bind(this),l.instance.subscribe("selected-poi",this.handleSelectedPoi)}update(){if(!this.poi){this.render();return}this.shadowRoot.innerHTML=`
            <div class="header">
                <div class="title">
                    <span class="legend"></span>
                    <h4 class="name">${this.poi.name}</h4>
                </div>
                <p class="category"></p>
            </div>
            <div class="tools"></div>
            `;const e=this.shadowRoot.querySelector(".legend"),t=this.shadowRoot.querySelector(".category"),r=this.shadowRoot.querySelector(".tools");e.style.backgroundColor=S.rgbToRgba(S.hexToRgb(this._poi.layer.style.color),.5),e.style.borderColor=this._poi.layer.style.color,this.poi.props.forEach(f=>{f.displayName==="Nome"?t.innerHTML=f.value:t.innerHTML=this.poi.name});const s=this.renderDirectionsBtn();s&&r.appendChild(s);const o=this.renderAddToRouteBtn();o&&r.append(o);const p=this.renderInfo();p&&this.shadowRoot.appendChild(p)}renderDirectionsBtn(){if(!this.poi)return null;const e=document.createElement("button");return e.classList.add("directions-btn"),e.innerHTML="Indicazioni",e.addEventListener("click",()=>se.instance.openGoogleMaps(this.poi.position)),e}renderAddToRouteBtn(){if(!this.poi||this.poi.type!==oe.Point)return null;const e=document.createElement("button");return e.classList.add("add-to-path-btn"),e.innerHTML="Aggiungi",e.addEventListener("click",()=>{this.poi&&h.instance.addPoiToSelectedPath(this.poi)}),e}renderInfo(){if(!this.poi)return null;const e=this.poi.props.filter(s=>s.displayName!=="Nome");if(e.length===0)return null;let t=document.createElement("div");t.classList.add("info");const r=document.createElement("div");return r.classList.add("info-content"),t.appendChild(r),e.forEach(s=>{const o=this.renderTopic(s);r.appendChild(o)}),t}toggleInfo(){const e=this.shadowRoot.querySelector(".info-content"),t=this.shadowRoot.querySelector(".toggle-info");e&&t&&(this.isInfoOpen?e.classList.add("visible"):e.classList.remove("visible"),this.isInfoOpen?t.innerHTML="Mostra meno":t.innerHTML="Leggi info")}renderTopic(e){const t=document.createElement("div");t.classList.add("property");const r=document.createElement("label");r.classList.add("property-label"),r.innerHTML=e.displayName;const s=document.createElement("p");return s.classList.add("property-value"),e.value!==""?s.innerHTML=e.value:s.innerHTML="-",t.appendChild(r),t.appendChild(s),t}}customElements.define("app-info-panel",Ln);var ie=(c=>(c.SortPois="sort-pois",c.EditPath="edit-path",c.AddPath="add-path",c.BookmarkPath="bookmark-path",c.LoadPath="load-path",c))(ie||{});const ae=class ae{constructor(){ae._instance||(ae._instance=this)}static get instance(){return ae._instance||(ae._instance=new ae),ae._instance}calculateDistance(n,e){const t=n.longitude-e.longitude,r=n.latitude-e.latitude;return Math.sqrt(t*t+r*r)}nearestInsertion(n,e){const t=[...n];let r=0,s=this.calculateDistance(e,t[0].position);for(let p=1;p<t.length;p++){const f=this.calculateDistance(e,t[p].position);f<s&&(s=f,r=p)}const o=[t.splice(r,1)[0]];for(;t.length>0;){s=Number.MAX_VALUE;let p=0;for(let f=0;f<t.length;f++){const x=this.calculateDistance(o[o.length-1].position,t[f].position);x<s&&(s=x,p=f)}o.push(t.splice(p,1)[0])}return o.reverse()}};i(ae,"_instance");let Je=ae;const En=`.form {\r
    color: var(--on-surface);\r
}\r
\r
h4,\r
p {\r
    margin: 0;\r
}\r
\r
h4 {\r
    color: var(--on-surface);\r
    margin: 0 0 16px 0;\r
}\r
\r
p {\r
    margin: 0 0 8px 0;\r
}\r
\r
input.path-name-input {\r
    width: 100%;\r
    height: 40px;\r
    outline: none;\r
    padding: 0;\r
    box-sizing: border-box;\r
    border-width: 0 0 1px 0;\r
    background-color: transparent;\r
    border-style: solid;\r
    color: var(--on-surface);\r
    border-color: var(--outline);\r
    margin: 0 0 16px 0;\r
\r
    &::placeholder {\r
        color: var(--on-surface-variant);\r
        opacity: .25;\r
    }\r
}\r
\r
.list {\r
    display: flex;\r
    flex-direction: column;\r
    gap: 8px;\r
    margin: 16px 0 0 0;\r
}\r
\r
.selection input {\r
    position: absolute;\r
    top: 0;\r
    left: 0;\r
    opacity: 0;\r
    height: 0;\r
    width: 0;\r
}\r
\r
.selection label {\r
    cursor: pointer;\r
    display: flex;\r
    align-items: center;\r
    width: 100%;\r
    height: 32px;\r
    padding: 0 16px;\r
    box-sizing: border-box;\r
    color: var(--on-surface);\r
    background-color: var(--surface-container);\r
    border: 1px solid var(--outline);\r
    border-radius: var(--border-radius-circle);\r
}\r
\r
.selection input:checked + label {\r
    background-color:  var(--surface-container-highest); \r
    border-color: var(--primary); \r
}\r
\r
.call-to-actions {\r
    display: flex;\r
    justify-content: space-between;\r
    align-items: center;\r
    gap: 16px;\r
    margin: 16px 0;\r
}\r
\r
.featured {\r
    color: var(--primary);\r
    font-weight: 600;\r
}\r
\r
button {\r
    cursor: pointer;\r
    font-family: 'Inter', Arial, Helvetica, sans-serif;\r
    font-weight: 600;\r
    font-size: 1rem;\r
    width: 100%;\r
    border: none;\r
    border-radius: var(--border-radius-circle);\r
    color: var(--on-surface);\r
    background-color: var(--surface-container-high);\r
    padding: 8px 0;\r
    border: 1px solid var(--outline);\r
    box-sizing: border-box;\r
\r
    &:hover {\r
        opacity: .8;\r
    }\r
}\r
\r
button.submit-btn {\r
    color: var(--on-primary);\r
    background-color: var(--primary);\r
    border-color: transparent;\r
}\r
\r
button.delete-btn {\r
    display: block;\r
    max-width: 250px;\r
    margin: 0 auto;\r
    color: var(--on-error-container);\r
    background-color: var(--error-container);\r
    border-color: var(--error-container);\r
}`;class kt extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_type",null);i(this,"_paths",[...h.instance.paths]);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(En),this.shadowRoot.adoptedStyleSheets.push(e)}get type(){return this._type}set type(e){this._type=e}get paths(){return this._paths}set paths(e){this._paths=e}connectedCallback(){this.render(),this.update(),this.setup()}render(){}setup(){const e=this.shadowRoot.querySelector(".cancel-btn"),t=this.shadowRoot.querySelector(".form");e&&e.addEventListener("click",()=>this.dispatchEvent(new CustomEvent("close-dialog"))),t&&t.addEventListener("submit",r=>{r.preventDefault(),this.dispatchEvent(new CustomEvent("close-dialog"))})}update(){switch(this.type){case ie.SortPois:this.renderSortPoisForm(),this.setupSortPoisForm();break;case ie.AddPath:this.renderAddPathForm(),this.setupAddPathForm();break;case ie.BookmarkPath:this.renderBookmarkPathForm(),this.setupBookmarkPathForm();break;case ie.LoadPath:this.renderLoadPathForm(),this.setupLoadPathForm();break;default:this.renderEditPathForm(),this.setupEditPathForm();break}}renderSortPoisForm(){this.shadowRoot.innerHTML=`
            <form class="form">
                <h4 class="title">Riordina</h4>
                <p>Riordinare i punti di interesse del percorso <span class="featured">${h.instance.selectedCustomPath.name}</span>?</p>
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Riordina</button>
                 </div>
            </form>
            `}setupSortPoisForm(){const e=this.shadowRoot.querySelector(".form");e&&e.addEventListener("submit",()=>{const t=ve.instance.position;if(!t)return;const r=ve.geolocationToCartographic(t),s=Je.instance.nearestInsertion(h.instance.selectedCustomPath.pois,r),o=h.instance.selectedCustomPath;o.pois=s,h.instance.selectedCustomPath=o})}renderEditPathForm(){this.shadowRoot.innerHTML=`
            <form class="form">
                <h4 class="title">Modifica percorso</h4>
                <input type="text" name="path-name" class="path-name-input" placeholder="Nome percorso">
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Salva</button>
                </div>
                <button type="button" class="delete-btn">Elimina percorso</button>
            </form>
            `}setupEditPathForm(){const e=this.shadowRoot.querySelector("input");if(!e)return;const t=this.shadowRoot.querySelector(".delete-btn");if(!t)return;const r=this.shadowRoot.querySelector(".submit-btn");if(!r)return;const s=this.shadowRoot.querySelector(".form");if(!s)return;e.value=h.instance.selectedCustomPath.name;const o=()=>r.disabled=e.value.trim().length===0||h.instance.paths.some(p=>p.name===e.value.toLowerCase());e.addEventListener("input",o),e.addEventListener("change",o),s.addEventListener("submit",()=>{const f=new FormData(s).get("path-name");f&&h.instance.editPath(f.toString())}),t.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("close-dialog")),h.instance.deletePath()})}renderAddPathForm(){this.shadowRoot.innerHTML=`
            <form class="form">
                <h4 class="title">Nuovo percorso</h4>
                <p>Scegli il nome del nuovo percorso</p>
                <input type="text" class="path-name-input" placeholder="Nome percorso">
                <p>Attenzione: questa azione eliminerà i dati non salvati sul percorso attualmente selezionato.</p>
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Salva</button>
                </div>
            </form>
            `}setupAddPathForm(){const e=this.shadowRoot.querySelector("input");if(!e)return;const t=this.shadowRoot.querySelector(".submit-btn");if(!t)return;const r=this.shadowRoot.querySelector(".form");if(!r)return;e.value.length===0&&(t.disabled=!0);const s=()=>{t.disabled=e.value.trim().length===0||h.instance.paths.some(o=>o.name===e.value.toLowerCase())};e.addEventListener("input",s),e.addEventListener("change",s),r.addEventListener("submit",()=>h.instance.saveNewPath(e.value))}renderBookmarkPathForm(){var e;this.shadowRoot.innerHTML=`
            <form class="form">
                <h4 class="title">Salva</h4>
                <p>Questa sovrascriverà i dati relativi al percorso <span class="featured">${(e=this.paths.find(t=>t.lastSelected===!0))==null?void 0:e.name}</span>. Procedere?</p>
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Salva</button>
                </div>
            </form>
            `}setupBookmarkPathForm(){const e=this.shadowRoot.querySelector(".form");e&&e.addEventListener("submit",()=>h.instance.savePath())}renderLoadPathForm(){this.shadowRoot.innerHTML=`
            <form class="form">
                <h4 class="title">Carica percorso</h4>
                <p>Percorsi salvati in memoria.</p>
                <div class="list"></div>
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Carica</button>
                </div>
            </form>
            `;const e=this.shadowRoot.querySelector(".list");e&&this.paths.forEach(t=>{const r=this.createRadioBtn(t);e.appendChild(r)})}setupLoadPathForm(){const e=this.shadowRoot.querySelector(".form");e&&e.addEventListener("submit",()=>{const r=new FormData(e).get("saved-paths");console.log("Selected path in local storage",r),r&&h.instance.loadPath(r.toString()),console.log(h.instance.selectedCustomPath)})}createRadioBtn(e){const t=document.createElement("div"),r=document.createElement("input"),s=document.createElement("label");return t.classList.add("selection"),r.type="radio",r.name="saved-paths",r.id=r.id=e.name.replace(" ","-").toLowerCase(),r.value=e.name,e.name===h.instance.selectedCustomPath.name&&(r.checked=!0),s.innerHTML=e.name,s.setAttribute("for",r.id=e.name.replace(" ","-").toLowerCase()),t.appendChild(r),t.appendChild(s),t}}customElements.define("app-custom-path-form",kt);class St extends HTMLDialogElement{constructor(){super();i(this,"closeBtn",document.createElement("button"))}connectedCallback(){this.render(),this.setup(),this.showModal()}render(){this.closeBtn.innerHTML='<span class="material-symbols-outlined close-icon">close</span>',this.closeBtn.classList.add("close"),this.prepend(this.closeBtn)}setup(){const e=this.querySelector("button");e&&e.addEventListener("click",()=>this.close()),document.addEventListener("keydown",this.handleKeydown.bind(this));const t=this.querySelector("app-custom-path-form");t&&t.addEventListener("close-dialog",()=>this.close())}handleKeydown(e){e.key==="Escape"&&this.close()}close(){this.remove()}}customElements.define("app-dialog",St,{extends:"dialog"});const re=class re{constructor(){if(re._instance)return re._instance;re._instance=this}static get instance(){return re._instance||(re._instance=new re),re._instance}createDialog(){const n=new St;return n.setAttribute("is","app-dialog"),n}createFormDialog(n){const e=this.createDialog(),t=new kt;t.type=n,e.appendChild(t),document.body.append(e)}};i(re,"_instance");let me=re;const Tn=`:host {\r
    cursor: pointer;\r
    display: flex;\r
    justify-content: space-between;\r
    align-items: center;\r
    padding: 16px;\r
    background-color: var(--surface-container-high);\r
    border-radius: var(--border-radius-m);\r
    gap: 8px;\r
    border: 1px solid transparent;\r
    box-sizing: border-box;\r
}\r
\r
h4,\r
p {\r
    margin: 0;\r
}\r
\r
button {\r
    cursor: pointer;\r
    height: 24px;\r
    width: 24px;\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
    background-color: transparent;\r
    border: none;\r
    color: var(--on-surface);\r
    padding: 0;\r
    border-radius: var(--border-radius-s);\r
\r
    &:hover {\r
        color: var(--on-surface-variant);\r
        background-color: var(--surface-container-highest);\r
    }\r
}\r
\r
.change-order {\r
    display: flex;\r
    flex-direction: column;\r
    align-items: center;\r
    justify-content: space-between;\r
}\r
\r
.order {\r
    color: var(--on-surface);\r
    display: block;\r
    height: 24px;\r
    width: 24px;\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
}\r
\r
.info {\r
    flex: 1;\r
}\r
\r
.title {\r
    color: var(--on-surface);\r
    display: flex;\r
    align-items: center;\r
    gap: 8px;\r
}\r
\r
.legend {\r
    width: 14px;\r
    height: 14px;\r
    min-width: 14px;\r
    border-radius: 100%;\r
    border-width: 2px;\r
    border-style: solid;\r
    box-sizing: border-box;\r
}\r
\r
.category {\r
    color: var(--on-surface-variant);\r
    padding: 0 0 0 22px;\r
}\r
\r
.remove-btn .material-symbols-outlined {\r
    font-size: 1.25rem;\r
}\r
\r
.material-symbols-outlined {\r
    font-family: 'Material Symbols Outlined';\r
    font-variation-settings:\r
        'FILL' 0,\r
        'wght' 400,\r
        'GRAD' 0,\r
        'opsz' 24;\r
    font-size: 1.5rem;\r
}`;class Pt extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_poi",null);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Tn),this.shadowRoot.adoptedStyleSheets.push(e)}get poi(){return this._poi}set poi(e){this._poi=e}connectedCallback(){this.render(),this.update(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="change-order">
                <button class="arrow move-up">
                    <span class="material-symbols-outlined">keyboard_arrow_up</span>                
                </button>
                <span class="order"></span>
                <button class="arrow move-down">
                    <span class="material-symbols-outlined">keyboard_arrow_down</span>
                </button>
            </div>
            <div class="info">
                <div class="title">
                    <span class="legend"></span>
                    <h4 class="name"></h4>
                </div>
                <p class="category"></p>
            </div>
            <button class="remove-btn">
                <span class="material-symbols-outlined">close</span>
            </button>
            `}update(){if(!this.poi)return;const e=this.shadowRoot.querySelector(".order");e&&(e.innerHTML=(h.instance.selectedCustomPath.pois.indexOf(this.poi)+1).toString());const t=this.shadowRoot.querySelector(".name");t&&(t.innerHTML=this.poi.name);const r=this.shadowRoot.querySelector(".legend");r&&(r.style.backgroundColor=S.rgbToRgba(S.hexToRgb(this.poi.layer.style.color),.5),r.style.borderColor=this.poi.layer.style.color);const s=this.shadowRoot.querySelector(".category");s&&this.poi.props.forEach(o=>{o.displayName==="Nome"?s.innerHTML=o.value:s.innerHTML=this.poi.name})}setup(){this.poi&&(this.addEventListener("click",()=>q.instance.selectedPoi=this.poi),this.setupOrderBtns(),this.setupRemoveBtn())}setupOrderBtns(){const e=this.shadowRoot.querySelector(".move-up");e&&e.addEventListener("click",r=>{r.stopPropagation(),this.changeOrder("up")});const t=this.shadowRoot.querySelector(".move-down");t&&t.addEventListener("click",r=>{r.stopPropagation(),this.changeOrder("down")})}changeOrder(e){if(!this.poi)return;let t=h.instance.selectedCustomPath,r=[...t.pois],s=h.instance.selectedCustomPath.pois.indexOf(this.poi);r.splice(s,1),e==="up"?r.splice(s-1,0,this.poi):r.splice(s+1,0,this.poi),t.pois=r,h.instance.selectedCustomPath=t}setupRemoveBtn(){if(!this.poi)return;const e=this.shadowRoot.querySelector(".remove-btn");e&&e.addEventListener("click",t=>{t.stopPropagation();let r=h.instance.selectedCustomPath.pois.indexOf(this.poi),s=[...h.instance.selectedCustomPath.pois];s.splice(r,1),h.instance.selectedCustomPath={...h.instance.selectedCustomPath,pois:s}})}}customElements.define("app-custom-path-card",Pt);const Ct=`:host {\r
    display: flex;\r
    flex-direction: column;\r
    justify-content: space-between;\r
    height: 100%;\r
}\r
\r
h4,\r
p {\r
    margin: 0;\r
}\r
\r
.header {\r
    position: relative;\r
    padding: 24px 24px 0 24px;\r
    box-sizing: border-box;\r
    color: var(--on-surface);\r
}\r
\r
.list {\r
    flex: 1;\r
    display: flex;\r
    flex-direction: column;\r
    justify-content: flex-start;\r
    gap: 16px;\r
    overflow-y: auto;\r
    padding: 24px;\r
    box-sizing: border-box;\r
    scrollbar-width: thin;\r
    scrollbar-color: var(--surface-container-high) transparent;\r
}\r
\r
.custom-path-tools {\r
    display: flex;\r
    align-items: center;\r
    justify-content: space-between;\r
    height: 40px;\r
    width: 100%;\r
}\r
\r
.tool-btn {\r
    cursor: pointer;\r
    width: 100%;\r
    height: 100%;\r
    border: none;\r
    color: var(--on-surface);\r
    background-color: var(--surface-container-high);\r
\r
    &:hover {\r
        color: var(--on-surface-variant);\r
        // opacity: .8;\r
    }\r
\r
    &:disabled {\r
        cursor: not-allowed;\r
        opacity: .25;\r
    }\r
}\r
\r
.btn {\r
    cursor: pointer;\r
    position: absolute;\r
    right: -10px;\r
    top: 32px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    padding: 0;\r
    border: none;\r
    background-color: transparent;\r
    color: var(--on-surface);\r
    width: 40px;\r
    height: 40px;\r
    transform: translate(-50%, -50%);\r
\r
    &:hover {\r
        color: var(--on-surface-variant);\r
    }\r
}\r
\r
.load-layers-btn {\r
    cursor: pointer;\r
    padding: 0;\r
    border: none;\r
    text-align: left;\r
    width: fit-content;\r
    background-color: transparent;\r
    color: var(--on-surface-variant);\r
\r
    &:hover {\r
        color: var(--on-surface);\r
    }\r
}\r
\r
.material-symbols-outlined {\r
    font-family: 'Material Symbols Outlined';\r
    font-variation-settings:\r
        'FILL' 0,\r
        'wght' 400,\r
        'GRAD' -25,\r
        'opsz' 24;\r
}\r
\r
.action-icon {\r
    font-size: 1.5rem;\r
}\r
\r
.tool-icon {\r
    font-size: 1rem;\r
}`;class Mn extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_path",{...h.instance.selectedCustomPath});this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Ct),this.shadowRoot.adoptedStyleSheets.push(e)}get path(){return this._path}set path(e){this._path=e,l.instance.publish("load-custom-path",this.path)}connectedCallback(){this.render(),this.setup(),this.update()}render(){this.shadowRoot.innerHTML=`
            <div class="header">
                <h4>Percorso selezionato: ${this.path.name}</h4>
                <button is="app-custom-path-download-btn" class="btn">
                    <span class="material-symbols-outlined action-icon">download</span>
                </button>
            </div>
            <div class="list"></div>
            <div class="custom-path-tools">
                <button type="button" title="Riordina punti di interesse" class="tool-btn sort-btn"><span class="material-symbols-outlined tool-icon">sort</span></button>
                <button type="button" title="Modifica percorso" class="tool-btn edit-btn"><span class="material-symbols-outlined tool-icon">more_horiz</span></button>
                <button type="button" title="Crea nuovo percorso" class="tool-btn add-btn"><span class="material-symbols-outlined tool-icon">add</span></button>
                <button type="button" title="Salva percorso" class="tool-btn bookmark-btn"><span class="material-symbols-outlined tool-icon">bookmark</span></button>
                <button type="button" title="Carica percorsi salvati" class="tool-btn load-btn"><span class="material-symbols-outlined tool-icon">bookmarks</span></button>
            </div>
            `}setup(){const e=this.shadowRoot.querySelector(".sort-btn"),t=this.shadowRoot.querySelector(".edit-btn"),r=this.shadowRoot.querySelector(".add-btn"),s=this.shadowRoot.querySelector(".bookmark-btn"),o=this.shadowRoot.querySelector(".load-btn"),p=this.shadowRoot.querySelector('button[is="app-custom-path-download-btn"]');e&&e.addEventListener("click",()=>me.instance.createFormDialog(ie.SortPois)),t&&t.addEventListener("click",()=>me.instance.createFormDialog(ie.EditPath)),r&&r.addEventListener("click",()=>me.instance.createFormDialog(ie.AddPath)),s&&s.addEventListener("click",()=>me.instance.createFormDialog(ie.BookmarkPath)),o&&o.addEventListener("click",()=>me.instance.createFormDialog(ie.LoadPath)),p&&(p.path={...this.path}),l.instance.subscribe("selected-custom-path-updated",f=>{this.path=f})}update(){const e=this.shadowRoot.querySelector(".list");if(!e)return;e.innerHTML="",this.path.pois.forEach(r=>{let s=new Pt;s.poi=r,e.appendChild(s)});const t=this.shadowRoot.querySelector(".edit-btn");t&&this.path.name==="default"&&(t.disabled=!0)}disconnectedCallback(){l.instance.unsubscribeAll("selected-custom-path-updated")}}customElements.define("app-custom-path-panel",Mn);class Rn extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>ge.instance.togglePhysicalMap()),l.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}disconnectedCallback(){l.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-map-type-btn",Rn,{extends:"button"});const In=`:host {\r
    position: fixed;\r
    bottom: 24px;\r
    right: 24px;\r
    display: flex;\r
    flex-direction: column;\r
    gap: 8px;\r
    animation: slideOut .3s ease-in-out forwards;\r
}\r
\r
:host(.open) {\r
    animation: slideIn .3s ease-in-out forwards;\r
}\r
\r
.fa-button {\r
    cursor: pointer;\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
    width: 40px;\r
    height: 40px;\r
    padding: 16px;\r
    font-size: 1.4rem;\r
    color: rgb(var(--f-default));\r
    background-color: var(--surface-container);\r
    border: none;\r
    border-radius: var(--border-radius-m);\r
\r
    &:hover {\r
        color: var(--on-surface-variant);\r
        background-color: var(--surface-container-low);\r
    }\r
}\r
\r
.material-symbols-outlined {\r
    font-family: 'Material Symbols Outlined';\r
    font-variation-settings:\r
        'FILL' 0,\r
        'wght' 400,\r
        'GRAD' 0,\r
        'opsz' 24;\r
}\r
\r
@keyframes slideIn {\r
    from {\r
        right: 24px;\r
    }\r
\r
    to {\r
        right: calc(24px + 360px);\r
    }\r
}\r
\r
@keyframes slideOut {\r
    from {\r
        right: calc(24px + 360px);\r
    }\r
\r
    to {\r
        right: 24px;\r
    }\r
}\r
\r
@media screen and (max-width: 768px) {\r
    :host {\r
        right: 4%;\r
    }\r
\r
    @keyframes slideIn {\r
        from {\r
            bottom: 4%;\r
        }\r
\r
        to {\r
            bottom: calc(4% + 360px);\r
        }\r
    }\r
\r
    @keyframes slideOut {\r
        from {\r
            bottom: calc(4% + 360px);\r
        }\r
\r
        to {\r
            bottom: 4%;\r
        }\r
    }\r
}`;class An extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_isOpen",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(In),this.shadowRoot.adoptedStyleSheets.push(e)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <button is="app-map-type-btn" class="fa-button map-controls">
                <span class="icon">
                    <span class="material-symbols-outlined">map</span>
                </span>
            </button>
            <button is="app-map-mode-btn" class="fa-button map-controls">
                <span class="icon">
                    <span class="material-symbols-outlined">view_in_ar</span>
                </span>
            </button>
            <button is="app-center-position-btn" class="fa-button map-controls">
                <span class="icon">
                    <span class="material-symbols-outlined">my_location</span>
                </span>
            </button>
            `}setup(){l.instance.subscribe("sidenav-status-change",e=>{e===0?this.isOpen=!1:this.isOpen=!0})}disconnectedCallback(){l.instance.unsubscribeAll("sidenav-status-change")}}customElements.define("app-map-controls",An);const Dn=`.header {\r
    text-align: center;\r
}\r
\r
.logo {\r
    width: 40px;\r
}\r
\r
h1 {\r
    color: var(--on-surface);\r
    font-size: 1.5rem;\r
    margin: 16px 0 0 0;\r
}\r
\r
form {\r
    overflow: hidden;\r
}\r
\r
.tags-wall {\r
    display: flex;\r
    justify-content: flex-start;\r
    flex-wrap: wrap;\r
    gap: 8px;\r
    margin: 24px 0;\r
}\r
\r
.chip {\r
    position: relative;\r
    white-space: nowrap;\r
}\r
\r
input[type="checkbox"] {\r
    position: absolute;\r
    height: 0;\r
    width: 0;\r
    opacity: 0;\r
}\r
\r
label {\r
    cursor: pointer;\r
    display: block;\r
    color: var(--on-surface);\r
    background-color: var(--surface-container);\r
    border: 1px solid var(--outline);\r
    padding: 4px 8px;\r
    border-radius: var( --border-radius-circle);\r
}\r
\r
input[type="checkbox"]:checked + label {\r
    background-color:  var(--surface-container-highest); \r
    border-color: var(--primary);  \r
}\r
\r
button {\r
    cursor: pointer;\r
    width: 100%;\r
    border: none;\r
    border-radius: var(--border-radius-circle);\r
    color: var(--on-primary);\r
    background-color: var(--primary);\r
    padding: 8px 0;\r
    border: 1px solid transparent;\r
    box-sizing: border-box;\r
\r
    &:hover {\r
        opacity: .8;\r
    }\r
}\r
\r
button.submit-btn {\r
    color: var(--on-primary);\r
    background-color: var(--primary);\r
}`;class On extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_tags",[]);this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(Dn),this.shadowRoot.adoptedStyleSheets.push(e)}get tags(){return this._tags}set tags(e){this._tags=e}connectedCallback(){this.tags=j.instance.getAllTags(j.instance.data),this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`          
            <div class="header">
                <img src="./images/RAISE_pictogram_no_bg.svg" alt="Raise logo" class="logo">
                <h1>Ecco alcuni dati che potrebbero interessarti</h1>
            </div>
            <form>
                <div class="tags-wall"></div>
                <button type="submit" class="submit-btn">Continua</button>
            </form>

            `;const e=this.shadowRoot.querySelector(".tags-wall");e&&this.tags.forEach(t=>{let r=this.createChip(t);e.append(r)})}setup(){const e=this.shadowRoot.querySelector("form");e&&e.addEventListener("submit",t=>{t.preventDefault();const r=new FormData(e),s=Array.from(r.getAll("tag"),p=>String(p));h.instance.setTags(s);const o=j.instance.filterLayersByTags(j.instance.data,s);h.instance.activeLayers=o,h.instance.benchLayers=[],window.location.hash="/map"})}createChip(e){let t=document.createElement("div");t.classList.add("chip");let r=document.createElement("input");r.type="checkbox",r.id=e.replace(" ","").toLowerCase(),r.name="tag",r.value=e,h.instance.tags.forEach(o=>{o===e&&(r.checked=!0)});let s=document.createElement("label");return s.setAttribute("for",e.replace(" ","").toLowerCase()),s.innerHTML=e.charAt(0).toUpperCase()+e.slice(1),t.append(r),t.append(s),t}}customElements.define("app-tags-wall",On);const Bn=`:host {\r
    position: fixed;\r
    top: 0;\r
    left: 0;\r
    height: 100dvh;\r
    width: 100vw;\r
    background-color: var(--surface-container);\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
}\r
\r
.logo {\r
    width: 80px;\r
}\r
\r
.loader {\r
    position: absolute;\r
    bottom: 24px;\r
    width: 32px;\r
    height: 32px;\r
    margin: 16px;\r
    border-radius: 50%;\r
    animation: rotate 1s linear infinite\r
}\r
\r
.loader::before {\r
    content: "";\r
    box-sizing: border-box;\r
    position: absolute;\r
    inset: 0px;\r
    border-radius: 50%;\r
    border: 3px solid var(--on-primary-container);\r
    animation: prixClipFix 2s linear infinite;\r
}\r
\r
@keyframes rotate {\r
    100% {\r
        transform: rotate(360deg)\r
    }\r
}\r
\r
@keyframes prixClipFix {\r
    0% {\r
        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)\r
    }\r
\r
    25% {\r
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)\r
    }\r
\r
    50% {\r
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)\r
    }\r
\r
    75% {\r
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)\r
    }\r
\r
    100% {\r
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)\r
    }\r
}`;class Hn extends HTMLElement{constructor(){super();i(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(Bn),this.shadowRoot.adoptedStyleSheets.push(e)}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
            <img src="./images/RAISE_pictogram_no_bg.svg" class="logo">
            <div class="loader"></div>
            `}}customElements.define("app-splash",Hn);class _n extends HTMLButtonElement{constructor(){super();i(this,"_path",F.createEmpty())}get path(){return this._path}set path(e){this._path=e}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>this.downloadCsv())}createCsvContent(){let e=`path	layer name	id	name	latitude	longitude	height	info
`;return Object.keys(this.path).forEach(t=>{t==="pois"&&this.path.pois.forEach(r=>{const s=r.props.map(p=>`${p.displayName}: ${p.value}`).join("|"),o=`${this.path.name}	${r.layerName}	${r.uuid}	${r.name}	${Cesium.Math.toDegrees(r.position.latitude)}	${Cesium.Math.toDegrees(r.position.longitude)}	${Cesium.Math.toDegrees(r.position.height)}	${s}
`;e+=o})}),e.endsWith(`
`)&&(e=e.slice(0,-1)),e.trimEnd(),e}downloadCsv(){let e="data:text/csv;charset=utf-8,";e+=this.createCsvContent(),console.log(e);const t=encodeURI(e),r=document.createElement("a");r.setAttribute("href",t),r.setAttribute("download",`${this.path.name.replace(/[|&;$%@"<>()+,\s]/g,"").trim()}.csv`),document.body.appendChild(r),r.click(),r.remove()}}customElements.define("app-custom-path-download-btn",_n,{extends:"button"});const Nn=`:host {
    cursor: pointer;
    display: block;
    padding: 16px;
    background-color: var(--surface-container-high);
    border-radius: var(--border-radius-m);
}

h4,
p {
    margin: 0;
}

.path-title {
    margin: 0 0 4px 0;
}

.path-steps {
    display: flex;
    color: var(--on-surface-variant);
}`;class Lt extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_path",F.createEmpty());i(this,"_template",document.createElement("template"));this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(Nn),this.shadowRoot.adoptedStyleSheets.push(e),this._template.id="app-suggested-path-card",this._template.innerHTML=`
            <h4 class="path-title"><slot name="path-name">Nome del percorso</slot></h4>
            <p class="path-steps"><slot name="pois-count">Numero di tappe</slot>&nbsp;tappe</p>
            `,this.shadowRoot.appendChild(this._template.content.cloneNode(!0))}get path(){return this._path}set path(e){this._path=e,this.update()}connectedCallback(){this.render(),this.setup()}render(){}setup(){this.addEventListener("click",()=>{le.instance.isSuggestedPathSelected=!0,h.instance.selectedSuggestedPath=this.path})}update(){this.path&&(this.innerHTML=`
            <h4 slot="path-name">${this.path.name}</h4>
            <p slot="pois-count">${this.path.pois.length}</p>
            `)}}customElements.define("app-suggested-path-card",Lt);const zn=`:host {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

h4,
p {
    margin: 0;
}

.header {
    padding: 24px 24px 0 24px;
    box-sizing: border-box;
    color: var(--on-surface);
}

.list {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 16px;
    overflow-y: auto;
    padding: 24px;
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: var(--surface-container-high) transparent;
}

.empty-msg {
    text-align: center;
}`;class Fn extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_paths",[]);this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(zn),this.shadowRoot.adoptedStyleSheets.push(e)}get paths(){return this._paths}set paths(e){this._paths=e,this.update()}connectedCallback(){this.render(),this.setup(),this.paths=h.instance.getSuggestedPaths()}render(){this.shadowRoot.innerHTML=`
            <div class="header">
                <h4>Percorsi suggeriti</h4>
            </div>
            <div class="list"></div>
            `}setup(){l.instance.subscribe("active-layers-updated",()=>{this.paths=h.instance.getSuggestedPaths()})}update(){const e=this.shadowRoot.querySelector(".list");e&&(e.innerHTML="",this.paths.forEach(t=>{let r=new Lt;r.path=t,e.append(r)}),this.paths.length===0&&(e.innerHTML='<p class="empty-msg">Nessun percorso suggerito per i layer correnti</p>'))}}customElements.define("app-suggested-path-panel",Fn);const jn=`:host {
    cursor: pointer;
    padding: 16px;
    background-color: var(--surface-container-high);
    border-radius: var(--border-radius-m);
}

h4,
p {
    margin: 0;
}

.title {
    color: var(--on-surface);
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 4px 0;
}

.legend {
    width: 14px;
    height: 14px;
    min-width: 14px;
    border-radius: 100%;
    border-width: 2px;
    border-style: solid;
    box-sizing: border-box;
}

.category {
    color: var(--on-surface-variant);
    padding: 0 0 0 22px;
}`;class Et extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_poi",we.createEmpty());this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(jn),this.shadowRoot.adoptedStyleSheets.push(e)}get poi(){return this._poi}set poi(e){this._poi=e;const t=j.instance.filterLayersByLayerName(this.poi.layerName);t&&(this.poi.layer=t)}connectedCallback(){this.render(),this.update(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="title">
                <span class="legend"></span>
                <h4 class="name"></h4>
            </div>
            <p class="category"></p>
            `}update(){if(!this.poi)return;const e=this.shadowRoot.querySelector(".name");e&&(e.innerHTML=this.poi.name);const t=this.shadowRoot.querySelector(".legend");t&&(t.style.backgroundColor=S.rgbToRgba(S.hexToRgb(this.poi.layer.style.color),.5),t.style.borderColor=this.poi.layer.style.color);const r=this.shadowRoot.querySelector(".category");r&&this.poi.props.forEach(s=>{s.displayName==="Nome"?r.innerHTML=s.value:r.innerHTML=this.poi.name})}setup(){this.poi&&this.addEventListener("click",()=>q.instance.selectedPoi=this.poi)}}customElements.define("app-selected-suggested-path-card",Et);class Vn extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_path",{...h.instance.selectedSuggestedPath});this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(Ct),this.shadowRoot.adoptedStyleSheets.push(e)}get path(){return this._path}set path(e){this._path=e}connectedCallback(){this.render(),this.setup(),this.update(),l.instance.publish("load-custom-path",this.path)}render(){this.shadowRoot.innerHTML=`
            <div class="header">
                <button class="btn back-btn">
                    <span class="material-symbols-outlined action-icon">chevron_left</span>
                </button>
                <h4>${this.path.name}</h4>
                <button class="load-layers-btn">Mostra solo layer presenti</button>
            </div>
            <div class="list"></div>
            `}setup(){const e=this.shadowRoot.querySelector(".back-btn");e&&e.addEventListener("click",()=>{le.instance.isSuggestedPathSelected=!1,le.instance.currentTab=E.SuggestedPath});const t=this.shadowRoot.querySelector(".load-layers-btn");t&&t.addEventListener("click",()=>{const r=this.getLayersInPath();l.instance.publish("bench-all-layers",null),r.forEach(s=>l.instance.publish("add-layer",s))})}update(){const e=this.shadowRoot.querySelector(".list");e&&(e.innerHTML="",this.path.pois.forEach(t=>{let r=new Et;r.poi=t,e.appendChild(r)}))}getLayersInPath(){let e=[];return this.path.pois.forEach(t=>e.push(t.layer)),[...new Set(e)]}}customElements.define("app-selected-suggested-path-panel",Vn);const qn=document.querySelector("app-router"),$n=new Ue("map",ye.Page,()=>"<page-map></page-map>"),Gn=new Ue("index",ye.Default,()=>"<page-tags></page-tags>"),Jn=new Ue("404",ye.NotFound,()=>"<div>404</div>"),Un=[$n,Gn,Jn];qn.addRoutes(Un);h.instance.getTags();h.instance.getCsvPaths(1);h.instance.getSavedLayers();h.instance.getCustomPaths();
