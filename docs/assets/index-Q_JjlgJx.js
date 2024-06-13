var Wn=Object.defineProperty;var Xn=(c,t,e)=>t in c?Wn(c,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):c[t]=e;var i=(c,t,e)=>(Xn(c,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/*! (c) Andrea Giammarchi @webreflection ISC */(function(){var c=function(d,o){var u=function(w){for(var g=0,v=w.length;g<v;g++)m(w[g])},m=function(w){var g=w.target,v=w.attributeName,P=w.oldValue;g.attributeChangedCallback(v,P,g.getAttribute(v))};return function(b,w){var g=b.constructor.observedAttributes;return g&&d(w).then(function(){new o(u).observe(b,{attributes:!0,attributeOldValue:!0,attributeFilter:g});for(var v=0,P=g.length;v<P;v++)b.hasAttribute(g[v])&&m({target:b,attributeName:g[v],oldValue:null})}),b}};function t(d,o){if(d){if(typeof d=="string")return e(d,o);var u=Object.prototype.toString.call(d).slice(8,-1);if(u==="Object"&&d.constructor&&(u=d.constructor.name),u==="Map"||u==="Set")return Array.from(d);if(u==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u))return e(d,o)}}function e(d,o){(o==null||o>d.length)&&(o=d.length);for(var u=0,m=new Array(o);u<o;u++)m[u]=d[u];return m}function n(d,o){var u=typeof Symbol<"u"&&d[Symbol.iterator]||d["@@iterator"];if(!u){if(Array.isArray(d)||(u=t(d))||o&&d&&typeof d.length=="number"){u&&(d=u);var m=0,b=function(){};return{s:b,n:function(){return m>=d.length?{done:!0}:{done:!1,value:d[m++]}},e:function(P){throw P},f:b}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var w=!0,g=!1,v;return{s:function(){u=u.call(d)},n:function(){var P=u.next();return w=P.done,P},e:function(P){g=!0,v=P},f:function(){try{!w&&u.return!=null&&u.return()}finally{if(g)throw v}}}}/*! (c) Andrea Giammarchi - ISC */var r=!0,s=!1,a="querySelectorAll",p=function(o){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:document,m=arguments.length>2&&arguments[2]!==void 0?arguments[2]:MutationObserver,b=arguments.length>3&&arguments[3]!==void 0?arguments[3]:["*"],w=function P(de,ue,A,f,k,C){var O=n(de),be;try{for(O.s();!(be=O.n()).done;){var T=be.value;(C||a in T)&&(k?A.has(T)||(A.add(T),f.delete(T),o(T,k)):f.has(T)||(f.add(T),A.delete(T),o(T,k)),C||P(T[a](ue),ue,A,f,k,r))}}catch($e){O.e($e)}finally{O.f()}},g=new m(function(P){if(b.length){var de=b.join(","),ue=new Set,A=new Set,f=n(P),k;try{for(f.s();!(k=f.n()).done;){var C=k.value,O=C.addedNodes,be=C.removedNodes;w(be,de,ue,A,s,s),w(O,de,ue,A,r,s)}}catch(T){f.e(T)}finally{f.f()}}}),v=g.observe;return(g.observe=function(P){return v.call(g,P,{subtree:r,childList:r})})(u),g},y="querySelectorAll",x=self,R=x.document,B=x.Element,I=x.MutationObserver,D=x.Set,j=x.WeakMap,Je=function(o){return y in o},We=[].filter,_e=function(d){var o=new j,u=function(f){for(var k=0,C=f.length;k<C;k++)o.delete(f[k])},m=function(){for(var f=de.takeRecords(),k=0,C=f.length;k<C;k++)g(We.call(f[k].removedNodes,Je),!1),g(We.call(f[k].addedNodes,Je),!0)},b=function(f){return f.matches||f.webkitMatchesSelector||f.msMatchesSelector},w=function(f,k){var C;if(k)for(var O,be=b(f),T=0,$e=v.length;T<$e;T++)be.call(f,O=v[T])&&(o.has(f)||o.set(f,new D),C=o.get(f),C.has(O)||(C.add(O),d.handle(f,k,O)));else o.has(f)&&(C=o.get(f),o.delete(f),C.forEach(function(Jn){d.handle(f,k,Jn)}))},g=function(f){for(var k=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,C=0,O=f.length;C<O;C++)w(f[C],k)},v=d.query,P=d.root||R,de=p(w,P,I,v),ue=B.prototype.attachShadow;return ue&&(B.prototype.attachShadow=function(A){var f=ue.call(this,A);return de.observe(f),f}),v.length&&g(P[y](v)),{drop:u,flush:m,observer:de,parse:g}},_=self,H=_.document,le=_.Map,Xe=_.MutationObserver,Ee=_.Object,Ke=_.Set,Tn=_.WeakMap,Ye=_.Element,Mn=_.HTMLElement,Ze=_.Node,Qe=_.Error,en=_.TypeError,Rn=_.Reflect,Te=Ee.defineProperty,In=Ee.keys,An=Ee.getOwnPropertyNames,xe=Ee.setPrototypeOf,ke=!self.customElements,nn=function(o){for(var u=In(o),m=[],b=new Ke,w=u.length,g=0;g<w;g++){m[g]=o[u[g]];try{delete o[u[g]]}catch{b.add(g)}}return function(){for(var v=0;v<w;v++)b.has(v)||(o[u[v]]=m[v])}};if(ke){var He=function(){var o=this.constructor;if(!Ne.has(o))throw new en("Illegal constructor");var u=Ne.get(o);if(Re)return on(Re,u);var m=tn.call(H,u);return on(xe(m,o.prototype),u)},tn=H.createElement,Ne=new le,Me=new le,rn=new le,Se=new le,sn=[],On=function(o,u,m){var b=rn.get(m);if(u&&!b.isPrototypeOf(o)){var w=nn(o);Re=xe(o,b);try{new b.constructor}finally{Re=null,w()}}var g="".concat(u?"":"dis","connectedCallback");g in b&&o[g]()},Bn=_e({query:sn,handle:On}),Dn=Bn.parse,Re=null,ze=function(o){if(!Me.has(o)){var u,m=new Promise(function(b){u=b});Me.set(o,{$:m,_:u})}return Me.get(o).$},on=c(ze,Xe);self.customElements={define:function(o,u){if(Se.has(o))throw new Qe('the name "'.concat(o,'" has already been used with this registry'));Ne.set(u,o),rn.set(o,u.prototype),Se.set(o,u),sn.push(o),ze(o).then(function(){Dn(H.querySelectorAll(o))}),Me.get(o)._(u)},get:function(o){return Se.get(o)},whenDefined:ze},Te(He.prototype=Mn.prototype,"constructor",{value:He}),self.HTMLElement=He,H.createElement=function(d,o){var u=o&&o.is,m=u?Se.get(u):Se.get(d);return m?new m:tn.call(H,d)},"isConnected"in Ze.prototype||Te(Ze.prototype,"isConnected",{configurable:!0,get:function(){return!(this.ownerDocument.compareDocumentPosition(this)&this.DOCUMENT_POSITION_DISCONNECTED)}})}else if(ke=!self.customElements.get("extends-br"),ke)try{var an=function d(){return self.Reflect.construct(HTMLBRElement,[],d)};an.prototype=HTMLLIElement.prototype;var cn="extends-br";self.customElements.define("extends-br",an,{extends:"br"}),ke=H.createElement("br",{is:cn}).outerHTML.indexOf(cn)<0;var ln=self.customElements,_n=ln.get,Hn=ln.whenDefined;self.customElements.whenDefined=function(d){var o=this;return Hn.call(this,d).then(function(u){return u||_n.call(o,d)})}}catch{}if(ke){var dn=function(o){var u=Fe.get(o);bn(u.querySelectorAll(this),o.isConnected)},$=self.customElements,un=H.createElement,Nn=$.define,zn=$.get,Fn=$.upgrade,jn=Rn||{construct:function(o){return o.call(this)}},Vn=jn.construct,Fe=new Tn,je=new Ke,Ie=new le,Ae=new le,pn=new le,Oe=new le,hn=[],Be=[],mn=function(o){return Oe.get(o)||zn.call($,o)},qn=function(o,u,m){var b=pn.get(m);if(u&&!b.isPrototypeOf(o)){var w=nn(o);De=xe(o,b);try{new b.constructor}finally{De=null,w()}}var g="".concat(u?"":"dis","connectedCallback");g in b&&o[g]()},$n=_e({query:Be,handle:qn}),bn=$n.parse,Gn=_e({query:hn,handle:function(o,u){Fe.has(o)&&(u?je.add(o):je.delete(o),Be.length&&dn.call(Be,o))}}),Un=Gn.parse,gn=Ye.prototype.attachShadow;gn&&(Ye.prototype.attachShadow=function(d){var o=gn.call(this,d);return Fe.set(this,o),o});var Ve=function(o){if(!Ae.has(o)){var u,m=new Promise(function(b){u=b});Ae.set(o,{$:m,_:u})}return Ae.get(o).$},qe=c(Ve,Xe),De=null;An(self).filter(function(d){return/^HTML.*Element$/.test(d)}).forEach(function(d){var o=self[d];function u(){var m=this.constructor;if(!Ie.has(m))throw new en("Illegal constructor");var b=Ie.get(m),w=b.is,g=b.tag;if(w){if(De)return qe(De,w);var v=un.call(H,g);return v.setAttribute("is",w),qe(xe(v,m.prototype),w)}else return Vn.call(this,o,[],m)}Te(u.prototype=o.prototype,"constructor",{value:u}),Te(self,d,{value:u})}),H.createElement=function(d,o){var u=o&&o.is;if(u){var m=Oe.get(u);if(m&&Ie.get(m).tag===d)return new m}var b=un.call(H,d);return u&&b.setAttribute("is",u),b},$.get=mn,$.whenDefined=Ve,$.upgrade=function(d){var o=d.getAttribute("is");if(o){var u=Oe.get(o);if(u){qe(xe(d,u.prototype),o);return}}Fn.call($,d)},$.define=function(d,o,u){if(mn(d))throw new Qe("'".concat(d,"' has already been defined as a custom element"));var m,b=u&&u.extends;Ie.set(o,b?{is:d,tag:b}:{is:"",tag:d}),b?(m="".concat(b,'[is="').concat(d,'"]'),pn.set(m,o.prototype),Oe.set(d,o),Be.push(m)):(Nn.apply($,arguments),hn.push(m=d)),Ve(d).then(function(){b?(bn(H.querySelectorAll(m)),je.forEach(dn,[m])):Un(H.querySelectorAll(m))}),Ae.get(d)._(o)}}})();var fe=(c=>(c.Default="default",c.Page="page",c.NotFound="not-found",c))(fe||{});class Ue{constructor(t,e,n){i(this,"url");i(this,"type");i(this,"routing");this.url=t,this.type=e,this.routing=n}}class Kn extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"routes",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){window.addEventListener("hashchange",()=>{this.checkRoute()})}addRoutes(e){this.routes=[...e],this.checkRoute()}checkRoute(){const e=window.location.hash.slice(2);this.changeRoute(e)}changeRoute(e){if(e){const n=this.routes.findIndex(r=>r.url===e);this.shadowRoot.innerHTML=this.routes[n]?this.routes[n].routing():this.sendNotFound()}else{const n=this.routes.filter(r=>r.type===fe.Default);n?window.location.hash="#/"+n[0].url:this.sendNotFound()}}sendNotFound(){const e=this.routes.filter(n=>n.type===fe.NotFound);return e.length===0||(window.location.hash="#/"+e[0].url,this.changeRoute(e[0].url)),"404: Not found"}}customElements.define("app-router",Kn);class we{constructor(t,e){i(this,"color");i(this,"opacity");this.color=t,this.opacity=e}static createEmpty(){return new we("#008000",1)}}class Le{constructor(t,e,n){i(this,"propertyName");i(this,"displayName");i(this,"type");this.propertyName=t,this.displayName=e,this.type=n}static createEmpty(){return new Le("","","string")}}var ae=(c=>(c.String="string",c.Image="image",c.Number="number",c))(ae||{});class q{constructor(t,e,n,r,s,a){i(this,"name");i(this,"layer");i(this,"url");i(this,"style");i(this,"tags");i(this,"relevantProperties");this.name=t,this.layer=e,this.url=n,this.style=r,this.tags=s,this.relevantProperties=a}static createEmpty(){return new q("","","",we.createEmpty(),[],[Le.createEmpty()])}}const G=class G{constructor(){i(this,"CATEGORIES_URL","./json/categories.json");i(this,"_data");if(G._instance)return G._instance;G._instance=this}static get instance(){return G._instance||(G._instance=new G),G._instance}get data(){return this._data}set data(t){this._data=t}async getData(){if(this.data)return this.data;{let t=await this.fetchAppData(this.CATEGORIES_URL);return t=this.parseData(t),this.data=t,t}}async fetchAppData(t){try{const e=await fetch(t).then(r=>r.json()),n=await Promise.all(e.categories.map(async r=>{const s=await Promise.all(r.groups.map(async a=>{if(typeof a=="string")try{const p=await fetch(a);if(p.ok)return p.json();throw new Error("Errore durante il recupero dei dati.")}catch(p){return console.error(p),null}else return a}));return r.groups=s,r}));return{...e,categories:n}}catch(e){throw console.error("Errore durante il recupero dei dati JSON.",e),e}}parseData(t){return{categories:t.categories.map(n=>({name:n.name,groups:n.groups.map(r=>this.parseGroup(r))}))}}parseGroup(t){return Array.isArray(t)?t:{name:t.name,layers:t.layers.map(e=>this.parseLayer(e))}}parseLayer(t){return new q(t.name,t.layer,t.layer_url_wfs,new we(t.style.color,parseFloat(t.style.opacity)),t.tags,t.relevant_properties.map(e=>{let n=Le.createEmpty();switch(n.displayName=e.display_name,n.propertyName=e.property_name,e.type){case"image":n.type=ae.Image;break;case"number":n.type=ae.Number;break;default:n.type=ae.String;break}return n}))}getAllLayers(t){const e=[];return t.categories.map(n=>{n.groups.map(r=>{typeof r!="string"&&r.layers.map(s=>{e.push(s)})})}),e}filterLayersByNameAndTag(t,e){let n=[];return n=t.categories.flatMap(r=>r.groups.flatMap(s=>typeof s=="string"?[q.createEmpty()]:s.layers.filter(a=>a.name.toLowerCase().includes(e)||a.tags.some(p=>p.includes(e))))),n}filterLayersByLayerName(t){let e;return this.data.categories.find(n=>n.groups.find(r=>typeof r=="string"?!1:(e=r.layers.find(s=>s.layer.includes(t)),e!==void 0))),e}getAllTags(t){let e=[];return t.categories.map(r=>{r.groups.map(s=>{typeof s!="string"&&s.layers.map(a=>{a.tags.map(p=>{e.push(p)})})})}),[...new Set(e)]}filterLayersByTag(t,e){let n=[];return n=t.categories.flatMap(r=>r.groups.flatMap(s=>typeof s=="string"?[q.createEmpty()]:s.layers.filter(a=>a.tags.some(p=>p.includes(e))))),n}filterLayersByTags(t,e){let n=[];return e.forEach(s=>{this.filterLayersByTag(t,s).forEach(p=>n.push(p))}),[...new Set(n)]}};i(G,"_instance");let z=G;const Yn=`.page {\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
    height: 100vh;\r
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
        min-height: 100vh;\r
    }\r
\r
    .box {\r
        padding: 4%;\r
        max-width: 100vw;\r
        width: 100vw;\r
        min-height: 100vh;\r
    }\r
}`;class Zn extends HTMLElement{constructor(){super();i(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(Yn),this.shadowRoot.adoptedStyleSheets.push(e)}async connectedCallback(){await z.instance.getData(),this.render()}render(){this.shadowRoot.innerHTML=`
            <div class="page">
                <div class="box">
                    <app-tags-wall></app-tags-wall>
                </div>
            </div>
            `}}customElements.define("page-tags",Zn);const U=class U{constructor(){i(this,"_position",null);if(U._instance)return U._instance;U._instance=this}get position(){return this._position}set position(t){this._position=t}static get instance(){return U._instance||(U._instance=new U),U._instance}async getUserPosition(){try{const t=await new Promise((e,n)=>{navigator.geolocation.getCurrentPosition(r=>{e(r)},r=>{n(r)})});this._position=t}catch{this._position=null}}static geolocationToCartographic(t){return new Cesium.Cartographic(t.coords.longitude,t.coords.latitude,t.coords.altitude||0)}};i(U,"_instance");let F=U;class ye{constructor(t,e,n,r,s,a,p){i(this,"uuid");i(this,"name");i(this,"position");i(this,"type");i(this,"layer");i(this,"layerName");i(this,"props");this.uuid=t,this.name=e,this.position=n,this.type=r,this.layer=s,this.layerName=a,this.props=p}static createEmpty(){return new ye("","",Cesium.Cartographic.ZERO,"point",q.createEmpty(),"",[])}}class Pe{constructor(t,e,n){i(this,"displayName");i(this,"type");i(this,"value");this.displayName=t,this.type=e,this.value=n}static createEmpty(){return new Pe("",ae.String,"")}}var ie=(c=>(c.Point="point",c.Polyline="polyline",c.Polygon="polygon",c))(ie||{});class N{constructor(t,e,n){i(this,"name");i(this,"pois");i(this,"lastSelected");this.name=t,this.pois=e,this.lastSelected=n}static createEmpty(){return new N("",[],!0)}static createDefault(){return new N("default",[],!0)}}var L=(c=>(c.Info="info",c.SuggestedPath="suggested-path",c.CustomPath="custom-path",c.SelectedSuggestedPath="selected-suggested-path",c))(L||{});const J=class J{constructor(){i(this,"listeners",{});if(J._instance)return J._instance;J._instance=this}static get instance(){return J._instance||(J._instance=new J),J._instance}subscribe(t,e){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e)}unsubscribe(t,e){this.listeners[t]&&(this.listeners[t]=this.listeners[t].filter(n=>n!==e))}unsubscribeAll(t){delete this.listeners[t]}publish(t,e){this.listeners[t]&&this.listeners[t].forEach(n=>n(e))}};i(J,"_instance");let l=J;const W=class W{constructor(){i(this,"_currentTab",L.Info);i(this,"_isSuggestedPathSelected",!1);if(W._instance)return W._instance;W._instance=this}static get instance(){return W._instance||(W._instance=new W),W._instance}get currentTab(){return this._currentTab}set currentTab(t){this._currentTab=t,l.instance.publish("current-tab-updated",this.currentTab)}get isSuggestedPathSelected(){return this._isSuggestedPathSelected}set isSuggestedPathSelected(t){this._isSuggestedPathSelected=t}};i(W,"_instance");let ce=W;var M=(c=>(c.Loader="loader",c.Temporary="temporary",c.Error="error",c.Info="info",c))(M||{});const Qn=`:host {\r
    position: relative;\r
    width: calc(100vw - 48px);\r
    max-width: 400px;\r
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
    padding: 24px;\r
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
}\r
\r
@media screen and (max-width: 768px) {\r
    :host {\r
        width: calc(100vw - 48px);\r
        max-width: inherit;\r
    }\r
}`;class fn extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"snackbarType",M.Info);i(this,"message","");i(this,"duration",0);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Qn),this.shadowRoot.adoptedStyleSheets.push(e)}connectedCallback(){this.render()}render(){switch(this.shadowRoot.innerHTML=`<p class="message">${this.message}</p>`,this.snackbarType){case M.Error:this.renderErrorSnackbar();break;case M.Loader:this.renderLoaderSnackbar();break;case M.Temporary:this.renderTemporarySnackbar();break;default:this.renderInfoSnackbar();break}}renderInfoSnackbar(){this.createDismissButton()}renderLoaderSnackbar(){const e=document.createElement("div");e.classList.add("loader"),this.shadowRoot.append(e)}renderErrorSnackbar(){this.createDismissButton()}renderTemporarySnackbar(){this.createDismissButton();const e=document.createElement("span");e.classList.add("bar"),e.style.setProperty("--snackbar-duration",`${this.duration}s`),this.shadowRoot.append(e),setTimeout(()=>this.remove(),this.duration*1e3)}createDismissButton(){const e=document.createElement("button");e.innerHTML='<span class="material-symbols-outlined">close</span>',e.classList.add("dismiss-btn"),this.shadowRoot.append(e),e.addEventListener("click",()=>this.remove())}}customElements.define("app-snackbar",fn);const X=class X{constructor(){i(this,"snackbars",[]);i(this,"container",null);if(X._instance)return X._instance;X._instance=this}static get instance(){return X._instance||(X._instance=new X),X._instance}createSnackbar(t,e,n,r=2){if(this.container=document.querySelector(".snackbar-container"),!this.container)return;const s=new fn;s.id=e.replace(/[^a-zA-Z0-9-_]/g,""),s.snackbarType=t,s.message=n,r&&(s.duration=r),this.container.append(s)}removeSnackbar(t){if(this.container=document.querySelector(".snackbar-container"),!this.container)return;const e=t.replace(/[^a-zA-Z0-9-_]/g,""),n=this.container.querySelector(`#${e}`);n&&n.remove()}};i(X,"_instance");let E=X;const K=class K{constructor(){i(this,"_tags",[]);i(this,"_paths",[]);i(this,"_selectedCustomPath",N.createDefault());i(this,"_suggestedPaths",[N.createEmpty()]);i(this,"_selectedSuggestedPath",N.createEmpty());i(this,"_layers",{active:[],bench:[]});i(this,"_activeLayers",[]);i(this,"_benchLayers",[]);if(K._instance)return K._instance;K._instance=this}static get instance(){return K._instance||(K._instance=new K),K._instance}get tags(){return this._tags}set tags(t){this._tags=t}get paths(){return this._paths}set paths(t){this._paths=t}get selectedCustomPath(){return this._selectedCustomPath}set selectedCustomPath(t){this._selectedCustomPath=t,l.instance.publish("selected-custom-path-updated",this.selectedCustomPath),ce.instance.currentTab=L.CustomPath}get suggestedPaths(){return this._suggestedPaths}set suggestedPaths(t){this._suggestedPaths=t}get selectedSuggestedPath(){return this._selectedSuggestedPath}set selectedSuggestedPath(t){this._selectedSuggestedPath=t,l.instance.publish("selected-suggested-path-updated",this.selectedSuggestedPath),ce.instance.currentTab=L.SelectedSuggestedPath}get layers(){return this._layers}set layers(t){this._layers=t,localStorage.setItem("layers",JSON.stringify(this.layers))}get activeLayers(){return this._activeLayers}set activeLayers(t){this._activeLayers=t,l.instance.publish("active-layers-updated",this.activeLayers),this.layers={...this.layers,active:this.activeLayers}}get benchLayers(){return this._benchLayers}set benchLayers(t){this._benchLayers=t,l.instance.publish("bench-layers-updated",this.benchLayers),this.layers={...this.layers,bench:this.benchLayers}}getCsvPaths(t){let e=0;const n=[],r=[];for(;e<=t;){const s=fetch(`./suggested-paths/${e}.tsv`).then(a=>a.text()).then(a=>{const p=this.parseCsvFile(a);n.push(this.parseCsvPath(p))}).catch(a=>console.error("Errore durante il recupero dei percorsi suggeriti",a));r.push(s),e++}Promise.all(r).then(()=>this.suggestedPaths=[...n])}parseCsvFile(t){return t.split(`
`).map(r=>{const s=r.split("	");return{path:s[0],layerName:s[1],id:s[2],name:s[3],latitude:s[4],longitude:s[5],height:s[6],info:s[7]}})}parseCsvPath(t){let e=N.createEmpty();return e.name=t[1].path,e.lastSelected=!1,t.forEach((n,r)=>{r!==0&&e.pois.push(this.parseCsvPoi(n))}),e}parseCsvPoi(t){let e=ye.createEmpty();return e.layerName=t.layerName,e.layer=q.createEmpty(),e.name=t.name,e.position=Cesium.Cartographic.fromDegrees(parseFloat(t.longitude),parseFloat(t.latitude),parseFloat(t.height)),e.type=ie.Point,e.uuid=t.id,e.props=this.parseCsvPoiProperties(t.info),e}parseCsvPoiProperties(t){let e=[];return t.split("|").forEach(r=>{let s=Pe.createEmpty();s.displayName=r.split(":")[0],s.value=r.split(":")[1].trim(),s.type=ae.String,e.push(s)}),e}getSuggestedPaths(){let t=[];return this.suggestedPaths.forEach(e=>{e.pois.forEach(n=>{this.activeLayers.forEach(r=>{n.layerName===r.layer&&t.push(e)})})}),[...new Set(t)]}isPoiInLayers(t){return this.activeLayers.some(e=>e.layer===t.layerName)}setTags(t){localStorage.setItem("tags",JSON.stringify(t)),this.tags=t}getTags(){const t=localStorage.getItem("tags");if(!t)return;const e=JSON.parse(t);this.tags=e}getSavedLayers(){const t=localStorage.getItem("layers");if(!t)return;const e=JSON.parse(t);let n={active:[],bench:[]};n.active=e.active.map(r=>this.parseLayer(r)),n.bench=e.bench.map(r=>this.parseLayer(r)),this._layers=n,this._activeLayers=this._layers.active,this._benchLayers=this._layers.bench}getCustomPaths(){const t=localStorage.getItem("paths");if(!t)return;const n=JSON.parse(t).map(r=>this.parseCustomPath(r));this.paths=n}setCustomPaths(){localStorage.setItem("paths",JSON.stringify(this.paths))}parseCustomPath(t){let e=N.createEmpty();return typeof t.lastSelected=="boolean"&&(e.lastSelected=t.lastSelected),t.name&&(e.name=t.name),t.pois&&(e.pois=t.pois.map(n=>this.parsePoi(n))),e}parsePoi(t){let e=ye.createEmpty();return e.layer=this.parseLayer(t.layer),e.layerName=t.layerName,e.name=t.name,e.position=new Cesium.Cartographic(t.position.longitude,t.position.latitude,t.position.height),e.props=t.props.map(n=>this.parsePoiProperty(n)),e.type=this.parsePoiType(t.type),e.uuid=t.uuid,e}parseLayer(t){return new q(t.name,t.layer,t.url=t.url,new we(t.style.color,t.style.opacity),t.tags,t.relevantProperties.map(e=>{let n=Le.createEmpty();switch(n.displayName=e.displayName,n.propertyName=e.propertyName,e.type){case"image":n.type=ae.Image;break;case"number":n.type=ae.Number;break;default:n.type=ae.String;break}return n}))}parsePoiProperty(t){let e=Pe.createEmpty();return t.displayName&&(e.displayName=t.displayName),t.type&&(e.type=t.type),t.value&&(e.value=t.value),e}parsePoiType(t){let e;switch(t){case"polyline":e=ie.Polyline;break;case"polygon":e=ie.Polygon;break;default:e=ie.Point;break}return e}addPoiToSelectedPath(t){if(this.isPoiInSelectedPath(t)){E.instance.createSnackbar(M.Temporary,"already-present","Il punto di interesse si trova già nel percorso selezionato.");return}const e=[...this.selectedCustomPath.pois];e.unshift(t),this.selectedCustomPath={...N.createEmpty(),name:this.selectedCustomPath.name},this.selectedCustomPath={...this.selectedCustomPath,pois:e}}isPoiInSelectedPath(t){return this.selectedCustomPath.pois.some(e=>e.name===t.name)}editPath(t){const e=this.paths.find(r=>r.lastSelected===!0);if(!e)return;const n=this.paths.filter(r=>r.lastSelected!==!0);e.name=t,n.push(e),this.selectedCustomPath=e,this.paths=n,this.setCustomPaths(),E.instance.createSnackbar(M.Temporary,"modified-path",`Percorso ${t} modificato con successo.`)}deletePath(){const t=this.paths.filter(n=>n.lastSelected!==!0),e=this.paths.find(n=>n.name==="default");e&&(e.lastSelected=!0,this.selectedCustomPath=e),this.paths=[...t],this.setCustomPaths(),E.instance.createSnackbar(M.Temporary,"deleted-path","Percorso eliminato con successo.")}saveNewPath(t){const e=this.paths.map(r=>(r.lastSelected=!1,r)),n=N.createEmpty();n.lastSelected=!0,n.name=t,e.push(n),this.selectedCustomPath=n,this.paths=e,this.setCustomPaths(),E.instance.createSnackbar(M.Temporary,"new-path",`Percorso ${t} creato con successo.`)}savePath(){const t=this.paths.filter(e=>e.lastSelected!==!0);t.push(this.selectedCustomPath),this.paths=t,this.setCustomPaths(),E.instance.createSnackbar(M.Temporary,"saved-path","Percorso salvato con successo.")}loadPath(t){const e=this.paths.find(r=>r.name===t);if(!e)return;const n=this.paths;n.forEach(r=>r.lastSelected=!1),e.lastSelected=!0,this.selectedCustomPath=e,this.paths=n,this.setCustomPaths(),E.instance.createSnackbar(M.Temporary,"loaded-path",`Percorso ${t} caricato con successo.`)}};i(K,"_instance");let h=K;class et{constructor(t,e,n){i(this,"url");i(this,"layer");i(this,"credit");this.url=t,this.layer=e,this.credit=n}}var pe=(c=>(c.Light="light",c.Dark="dark",c))(pe||{});const Y=class Y{constructor(){i(this,"MAP_THEMES_URL","./json/themes.json");i(this,"_currentTheme",pe.Dark);i(this,"_isPhysicalMap",!1);i(this,"mapThemes",[]);if(Y._instance)return Y._instance;Y._instance=this}static get instance(){return Y._instance||(Y._instance=new Y),Y._instance}get currentTheme(){return this._currentTheme}set currentTheme(t){this._currentTheme=t,this.changeColors(this.currentTheme),l.instance.publish("change-theme",{isPhysicalMap:this.isPhysicalMap,theme:this.chooseMapTheme(this.currentTheme)})}get isPhysicalMap(){return this._isPhysicalMap}set isPhysicalMap(t){this._isPhysicalMap=t,l.instance.publish("toggle-physical-map",{isPhysicalMap:this.isPhysicalMap,currentTheme:this.chooseMapTheme(this.currentTheme)})}async getMapThemes(){if(this.mapThemes.length!==0)return this.mapThemes;{let t=await this.fetchMapThemes(this.MAP_THEMES_URL);return this.mapThemes=t,t}}async fetchMapThemes(t){let e=[];try{e=await fetch(t).then(n=>n.json()),e=e.map(n=>this.parseMapTheme(n))}catch(n){console.error(n)}return e}parseMapTheme(t){return new et(t.url,t.layer,t.credit)}createImageryProvider(t){return new Cesium.WebMapTileServiceImageryProvider({url:t.url,layer:t.layer,credit:new Cesium.Credit(t.credit),tileMatrixSetID:"default",style:"default",format:"image/jpeg",maximumLevel:19})}toggleTheme(){this.currentTheme===pe.Light?this.currentTheme=pe.Dark:this.currentTheme=pe.Light}togglePhysicalMap(){this.isPhysicalMap===!0?this.isPhysicalMap=!1:this.isPhysicalMap=!0}chooseMapTheme(t){const e=t===pe.Dark?this.mapThemes.find(n=>n.layer==="carto-dark"):this.mapThemes.find(n=>n.layer==="carto-light");if(e!==void 0)return e;throw new Error("Impossibile trovare il tema della mappa desiderato.")}changeColors(t){switch(t){case pe.Dark:this.setDarkTheme();break;default:this.setLightTheme();break}}setDarkTheme(){document.documentElement.style.setProperty("--primary","rgb(55, 222, 187)"),document.documentElement.style.setProperty("--on-primary","rgb(0, 56, 45)"),document.documentElement.style.setProperty("--primary-container","rgb(0, 81, 66)"),document.documentElement.style.setProperty("--on-primary-container","rgb(184, 255, 233)"),document.documentElement.style.setProperty("--secondary","rgb(174, 205, 194)"),document.documentElement.style.setProperty("--on-secondary","rgb(25, 53, 46)"),document.documentElement.style.setProperty("--secondary-container","rgb(48, 76, 68)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(202, 233, 222)"),document.documentElement.style.setProperty("--tertiary","rgb(163, 204, 231)"),document.documentElement.style.setProperty("--on-tertiary","rgb(1, 52, 74)"),document.documentElement.style.setProperty("--tertiary-container","rgb(33, 75, 98)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(197, 231, 255)"),document.documentElement.style.setProperty("--error","rgb(255, 180, 171)"),document.documentElement.style.setProperty("--on-error","rgb(105, 0, 5)"),document.documentElement.style.setProperty("--error-container","rgb(147, 0, 10)"),document.documentElement.style.setProperty("--on-error-container","rgb(255, 218, 214)"),document.documentElement.style.setProperty("--surface-dim","rgb(0, 19, 46)"),document.documentElement.style.setProperty("--surface","rgb(0, 19, 46)"),document.documentElement.style.setProperty("--surface-bright","rgb(0, 56, 115)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(0, 14, 37)"),document.documentElement.style.setProperty("--surface-container-low","rgb(0, 27, 61)"),document.documentElement.style.setProperty("--surface-container","rgb(0, 31, 69)"),document.documentElement.style.setProperty("--surface-container-high","rgb(0, 41, 87)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(0, 52, 107)"),document.documentElement.style.setProperty("--on-surface","rgb(213, 227, 255)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(171, 200, 247)"),document.documentElement.style.setProperty("--outline","rgb(118, 146, 191)"),document.documentElement.style.setProperty("--outline-variant","rgb(42, 72, 112)"),document.documentElement.style.setProperty("--inverse-surface","rgb(214, 227, 255)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(0, 48, 99)"),document.documentElement.style.setProperty("--inverse-primary","rgb(0, 107, 88)")}setLightTheme(){document.documentElement.style.setProperty("--primary","rgb(0, 107, 88)"),document.documentElement.style.setProperty("--on-primary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--primary-container","rgb(243, 255, 249)"),document.documentElement.style.setProperty("--on-primary-container","rgb(0, 32, 25)"),document.documentElement.style.setProperty("--secondary","rgb(71, 100, 91)"),document.documentElement.style.setProperty("--on-secondary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary-container","rgb(243, 255, 249)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(3, 32, 25)"),document.documentElement.style.setProperty("--tertiary","rgb(59, 99, 122)"),document.documentElement.style.setProperty("--on-tertiary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary-container","rgb(251, 252, 255)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(0, 30, 45)"),document.documentElement.style.setProperty("--error","rgb(184, 31, 33)"),document.documentElement.style.setProperty("--on-error","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error-container","rgb(255, 218, 214)"),document.documentElement.style.setProperty("--on-error-container","rgb(65, 0, 3)"),document.documentElement.style.setProperty("--surface-dim","rgb(201, 218, 255)"),document.documentElement.style.setProperty("--surface","rgb(249, 249, 255)"),document.documentElement.style.setProperty("--surface-bright","rgb(249, 249, 255)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-low","rgb(240, 243, 255)"),document.documentElement.style.setProperty("--surface-container","rgb(232, 238, 255)"),document.documentElement.style.setProperty("--surface-container-high","rgb(223, 232, 255)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(214, 227, 255)"),document.documentElement.style.setProperty("--on-surface","rgb(0, 27, 61)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(42, 72, 112)"),document.documentElement.style.setProperty("--outline","rgb(92, 120, 163)"),document.documentElement.style.setProperty("--outline-variant","rgb(171, 200, 247)"),document.documentElement.style.setProperty("--inverse-surface","rgb(0, 48, 99)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(236, 240, 255)"),document.documentElement.style.setProperty("--inverse-primary","rgb(55, 222, 187)")}};i(Y,"_instance");let me=Y;const Z=class Z{constructor(){i(this,"_isOpen",!1);if(Z._instance)return Z._instance;Z._instance=this}static get instance(){return Z._instance||(Z._instance=new Z),Z._instance}get isOpen(){return this._isOpen}set isOpen(t){this._isOpen=t,l.instance.publish("toggle-tabs",this.isOpen),this.isOpen&&l.instance.publish("toggle-bench",!1)}};i(Z,"_instance");let ve=Z;const Q=class Q{constructor(){i(this,"_isOpen",!1);if(Q._instance)return Q._instance;Q._instance=this}static get instance(){return Q._instance||(Q._instance=new Q),Q._instance}get isOpen(){return this._isOpen}set isOpen(t){this._isOpen=t,l.instance.publish("toggle-bench",this.isOpen),this.isOpen&&l.instance.publish("toggle-tabs",!1)}};i(Q,"_instance");let Ce=Q;var ge=(c=>(c.Point="Point",c.LineString="LineString",c.Polygon="Polygon",c.MultiPoint="MultiPoint",c.MultiLineString="MultiLineString",c.MultiPolygon="MultiPolygon",c))(ge||{});const ee=class ee{constructor(){if(ee._instance)return ee._instance;ee._instance=this}static get instance(){return ee._instance||(ee._instance=new ee),ee._instance}async createGeoJson(t){const e=`${t.url}?service=WFS&typeName=${t.layer}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;let r=await(await fetch(e)).json(),s=this.substituteRelevantProperties(r,t);return this.createFeatureAdditionalProperties(s,t)}async createGeoJsonFromEntity(t){let e={type:"Feature",geometry:{type:"Point",coordinates:[]},properties:{}};if(t.point&&t.position){e.geometry.type="Point";let n=this.createGeojsonPointCoordinates(t);n&&(e.geometry.coordinates=[Cesium.Math.toDegrees(n.longitude),Cesium.Math.toDegrees(n.latitude)])}return t.polyline&&t.polyline.positions&&(e.geometry.type="LineString",e.geometry.coordinates=this.createGeojsonPolylineCoordinates(t)),t.polygon&&t.polygon.hierarchy&&(e.geometry.type="Polygon",e.geometry.coordinates=this.createGeojsonPolygonCoordinates(t)),e}createGeojsonFeatureFromPoi(t){return{type:"Feature",geometry:{type:"Point",coordinates:[Cesium.Math.toDegrees(t.position.longitude),Cesium.Math.toDegrees(t.position.latitude)]},properties:{}}}createGeojsonFeatureCollectionFromPois(t){let e={type:"FeatureCollection",features:[]},n=t.map(r=>this.createGeojsonFeatureFromPoi(r));return e.features=n,e}createGeojsonPointCoordinates(t){if(!t.position)return null;let e=t.position.getValue(Cesium.JulianDate.now());return e?Cesium.Cartographic.fromCartesian(e):null}createGeojsonPolylineCoordinates(t){if(!t.polyline||!t.polyline.positions)return[];let e=t.polyline.positions.getValue(Cesium.JulianDate.now()),n=[];return e&&e.forEach(r=>{let s,a=Cesium.Cartographic.fromCartesian(r);s=[Cesium.Math.toDegrees(a.longitude),Cesium.Math.toDegrees(a.latitude)],n.push(s)}),n}createGeojsonPolygonCoordinates(t){if(!t.polygon||!t.polygon.hierarchy)return[];let e=t.polygon.hierarchy.getValue(Cesium.JulianDate.now()),n=[];if(e){let r=[];e.positions.forEach(s=>{let a,p=Cesium.Cartographic.fromCartesian(s);a=[Cesium.Math.toDegrees(p.longitude),Cesium.Math.toDegrees(p.latitude)],r.push(a)}),n.push(r),e.holes.forEach(s=>{let a=[];s.positions.forEach(p=>{let y,x=Cesium.Cartographic.fromCartesian(p);y=[Cesium.Math.toDegrees(x.longitude),Cesium.Math.toDegrees(x.latitude)],a.push(y)}),n.push(a)})}return n}createFeatureAdditionalProperties(t,e){return t.features=t.features.map((n,r)=>{switch(n.properties.name=e.name+" "+r,n.properties.layerName=e.layer,n.geometry.type){case ge.Point:n.properties.uuid=e.layer+n.geometry.coordinates[1]+n.geometry.coordinates[0];break;case ge.MultiPoint:n.properties.uuid=e.layer+n.geometry.coordinates[0][1]+n.geometry.coordinates[0][0];break;case(ge.LineString||ge.Polygon||ge.MultiPoint):n.properties.uuid=e.layer+n.geometry.coordinates[0][1]+n.geometry.coordinates[0][0];break;default:n.properties.uuid=e.layer+n.geometry.coordinates[0][0][1]+n.geometry.coordinates[0][0][0];break}return n.properties.uuid=n.id,n}),t}substituteRelevantProperties(t,e){return t.features.forEach(n=>{const r={};for(const s in n.properties){const a=e.relevantProperties.find(p=>p.propertyName===s);if(a){const p={displayName:a.displayName,type:a.type,value:n.properties[s]};r[s]=p}}n.properties=r}),t}styleFeature(t,e){t.entities.values.forEach(n=>{if(n.billboard)switch(t.name){case"custom-path":this.styleCustomPath(n);break;case"selected-feature":this.styleSelectedFeature(n);break;default:this.stylePointFeature(n,e);break}n.polyline&&this.stylePolylineFeature(n,e),n.polygon&&this.stylePolygonFeature(n,e)})}stylePointFeature(t,e){return t.billboard=void 0,t.point=new Cesium.PointGraphics({pixelSize:8,color:Cesium.Color.fromCssColorString(e.color).withAlpha(e.opacity),outlineColor:Cesium.Color.fromCssColorString(e.color),outlineWidth:1}),t}styleCustomPath(t){return t.billboard=void 0,t.point=new Cesium.PointGraphics({pixelSize:12,color:Cesium.Color.TRANSPARENT,outlineColor:Cesium.Color.BLUE,outlineWidth:2}),t}styleSelectedFeature(t){return t.billboard=void 0,t.point=new Cesium.PointGraphics({pixelSize:16,color:Cesium.Color.TRANSPARENT,outlineColor:Cesium.Color.GREEN,outlineWidth:2}),t}stylePolylineFeature(t,e){return t.polyline&&(t.polyline.material=new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(e.color)),t.polyline.width=new Cesium.ConstantProperty(2)),t}stylePolygonFeature(t,e){return t.polygon&&(t.polygon.material=new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(e.color).withAlpha(e.opacity)),t.polygon.outlineColor=new Cesium.ConstantProperty(Cesium.Color.fromCssColorString(e.color))),t}openGoogleMaps(t){const e=`https://www.google.it/maps/dir/?api=1&destination=${Cesium.Math.toDegrees(t.latitude)},${Cesium.Math.toDegrees(t.longitude)}`;window.open(e,"_blank")}};i(ee,"_instance");let re=ee;const ne=class ne{constructor(){i(this,"_selectedPoi",null);if(ne._instance)return ne._instance;ne._instance=this}static get instance(){return ne._instance||(ne._instance=new ne),ne._instance}get selectedPoi(){return this._selectedPoi}set selectedPoi(t){this._selectedPoi=t,l.instance.publish("selected-poi",this.selectedPoi),this._selectedPoi!==null&&(ce.instance.currentTab=L.Info)}parsePoi(t){let e=ye.createEmpty();if(!t.properties)return e;let n=t.properties;return t.properties.propertyNames.forEach(s=>{if(n.hasProperty(s))switch(s){case"uuid":e.uuid=n[s].valueOf();break;case"layer":const a=n[s].valueOf();e.layer=a,e.layerName=a.layer;break;case"layerName":const p=n[s].valueOf();e.layerName=p;const y=z.instance.filterLayersByLayerName(p);y&&(e.layer=y);break;case"name":e.name=n[s].valueOf();break;default:let x=n[s].valueOf();e.props.push(this.parsePoiProperty(x));break}}),e.position=this.parsePoiPosition(t),e.type=this.parsePoiType(t),e}parsePoiPosition(t){let e=Cesium.Cartographic.ZERO;if(t.point&&t.position){let n=t.position.getValue(Cesium.JulianDate.now());n&&(e=Cesium.Cartographic.fromCartesian(n))}if(t.polyline&&t.polyline.positions){let n=t.polyline.positions.getValue(Cesium.JulianDate.now())[0];n&&(e=Cesium.Cartographic.fromCartesian(n))}if(t.polygon&&t.polygon.hierarchy){let n=t.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions[0];n&&(e=Cesium.Cartographic.fromCartesian(n))}return e}parsePoiProperty(t){let e=Pe.createEmpty();return t.displayName&&(e.displayName=t.displayName),t.type&&(e.type=t.type),t.value&&(e.value=t.value),e}parsePoiType(t){return t.polyline?ie.Polyline:t.polygon?ie.Polygon:ie.Point}};i(ne,"_instance");let V=ne;const nt=`.map {\r
    height: 100%;\r
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
        width: calc(100% - 360px);\r
    }\r
}\r
\r
@keyframes grow {\r
    from  {\r
        width: calc(100% - 360px);\r
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
            height: 100%;\r
        }\r
    \r
        to {\r
            height: calc(100% - 360px);\r
        }\r
    }\r
    \r
    @keyframes grow {\r
        from  {\r
            height: calc(100% - 360px);\r
        }\r
    \r
        to {\r
            height: 100%;\r
        }\r
    }\r
}`,tt=`/* packages/widgets/Source/shared.css */
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
`;class yn extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"container",document.createElement("div"));i(this,"viewer");i(this,"imageryLayers",{});i(this,"_isOpen",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet,n=new CSSStyleSheet;e.replace(nt),n.replace(tt),this.shadowRoot.adoptedStyleSheets=[n,e]}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("reduce"):this.classList.remove("reduce")}connectedCallback(){this.render(),this.addBaseLayers(me.instance.mapThemes),this.setup(),this.addSavedPath()}render(){this.container.classList.add("map"),this.shadowRoot.append(this.container),Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjY2YmYxNy1mNTM2LTRlOWYtYTUyZC01ZmY0NjBhNzllMWEiLCJpZCI6MTY5MDU3LCJpYXQiOjE2OTU4ODQ4NzB9.bN66rOR5h37xuKVsuUSYRSLOGJy-34IhH9S1hr4NOOE",this.viewer=new Cesium.Viewer(this.container,{baseLayerPicker:!1,geocoder:!1,timeline:!1,animation:!1,homeButton:!1,navigationInstructionsInitiallyVisible:!1,navigationHelpButton:!1,sceneModePicker:!1,fullscreenButton:!1,infoBox:!1,sceneMode:Cesium.SceneMode.SCENE2D,mapMode2D:Cesium.MapMode2D.ROTATE,mapProjection:new Cesium.WebMercatorProjection})}setup(){this.viewer.screenSpaceEventHandler.setInputAction(e=>{this.mouseOver(e)},Cesium.ScreenSpaceEventType.MOUSE_MOVE),this.viewer.screenSpaceEventHandler.setInputAction(e=>{this.clickOnMap(e)},Cesium.ScreenSpaceEventType.LEFT_CLICK),F.instance.position?(this.setCameraToPosition(F.instance.position),this.checkUserPin(F.instance.position)):this.setCameraToPosition(null),l.instance.subscribe("toggle-tabs",e=>this.isOpen=e),l.instance.subscribe("change-theme",e=>this.changeTheme(e.isPhysicalMap,e.theme)),l.instance.subscribe("change-map-mode",()=>this.changeMapMode()),l.instance.subscribe("toggle-physical-map",e=>this.togglePhysicalMap(e.isPhysicalMap,e.currentTheme)),l.instance.subscribe("set-camera",e=>this.setCameraToPosition(e)),l.instance.subscribe("check-user-position",e=>this.checkUserPin(e)),l.instance.subscribe("add-layer",e=>this.addLayer(e)),l.instance.subscribe("unbench-layer",e=>this.unbenchLayer(e)),l.instance.subscribe("remove-layer-from-bench",e=>this.removeLayerFromBench(e)),l.instance.subscribe("bench-layer",e=>this.benchLayer(e)),l.instance.subscribe("bench-all-layers",()=>this.benchAllLayers()),l.instance.subscribe("load-custom-path",e=>{let n=re.instance.createGeojsonFeatureCollectionFromPois(e.pois);this.loadCustomDataSource(n,"custom-path")}),l.instance.subscribe("selected-poi",e=>{if(!e||e.type!==ie.Point)return;let n=re.instance.createGeojsonFeatureCollectionFromPois([e]);this.setCameraToPosition(e.position),this.loadCustomDataSource(n,"selected-feature")})}disconnectedCallback(){l.instance.unsubscribeAll("toggle-tabs"),l.instance.unsubscribeAll("change-theme"),l.instance.unsubscribeAll("change-map-mode"),l.instance.unsubscribeAll("toggle-physical-map"),l.instance.unsubscribeAll("set-camera"),l.instance.unsubscribeAll("check-user-position"),l.instance.unsubscribeAll("add-layer"),l.instance.unsubscribeAll("unbench-layer"),l.instance.unsubscribeAll("remove-layer-from-bench"),l.instance.unsubscribeAll("bench-layer"),l.instance.unsubscribeAll("bench-all-layers"),l.instance.unsubscribeAll("load-custom-path"),l.instance.unsubscribeAll("selected-poi")}mouseOver(e){const n=e.endPosition;this.viewer.scene.pick(n)?document.body.style.cursor="pointer":document.body.style.cursor="default"}clickOnMap(e){l.instance.publish("empty-searchbar",null);const n=e.position,r=this.viewer.scene.pick(n);if(!r||!r.id){ve.instance.isOpen=!1,Ce.instance.isOpen=!1,V.instance.selectedPoi=null,this.removeCustomDataSource("selected-feature");return}if(!(r.id instanceof Cesium.Entity)){V.instance.selectedPoi=null,this.removeCustomDataSource("selected-feature");return}const s=r.id;if(s.id==="user-pin"){V.instance.selectedPoi=null,this.removeCustomDataSource("selected-feature");return}if(s.name&&(s.name.includes("selected-feature")||s.name.includes("custom-path"))){V.instance.selectedPoi=null,this.removeCustomDataSource("selected-feature");return}Ce.instance.isOpen=!1,ve.instance.isOpen=!0;const a=re.instance.createGeoJsonFromEntity(s);this.loadCustomDataSource(a,"selected-feature");const p=V.instance.parsePoi(s);V.instance.selectedPoi=p,this.setCameraToPosition(p.position)}addBaseLayers(e){e.forEach(n=>{const r=new Cesium.ImageryLayer(me.instance.createImageryProvider(n));this.viewer.imageryLayers.add(r),this.imageryLayers[n.layer]=r})}addSavedPath(){h.instance.activeLayers.forEach(n=>this.addLayerToMap(n));const e=re.instance.createGeojsonFeatureCollectionFromPois(h.instance.selectedCustomPath.pois);this.loadCustomDataSource(e,"custom-path")}changeTheme(e,n){if(e)return;const r=this.viewer.imageryLayers.indexOf(this.imageryLayers[n.layer]);let s=this.viewer.imageryLayers.get(r);this.viewer.imageryLayers.raiseToTop(s)}togglePhysicalMap(e,n){if(e)for(const r in this.imageryLayers){const s=this.viewer.imageryLayers.indexOf(this.imageryLayers[r]),a=this.viewer.imageryLayers.get(s);this.viewer.imageryLayers.lowerToBottom(a)}else this.changeTheme(e,n)}changeMapMode(){this.viewer.scene.mode===Cesium.SceneMode.SCENE3D?this.viewer.scene.morphTo2D(1):this.viewer.scene.morphTo3D(1)}setCameraToPosition(e){let n=this.viewer.camera.positionCartographic;n.height>2e6?n.height=2e3:n.height;let r=Cesium.Cartesian3.fromDegrees(8.934080815653985,44.40753207658791,2e3);e&&e instanceof GeolocationPosition&&(r=Cesium.Cartesian3.fromDegrees(e.coords.longitude,e.coords.latitude,n.height)),e&&e instanceof Cesium.Cartographic&&(r=Cesium.Cartesian3.fromRadians(e.longitude,e.latitude,n.height)),this.viewer.camera.flyTo({destination:r,orientation:{heading:Cesium.Math.toRadians(0),pitch:Cesium.Math.toRadians(-90),roll:0},duration:.5})}checkUserPin(e){const n=this.viewer.entities.getById("user-pin");n?this.updateUserPin(n,e):this.createUserPin(e)}createUserPin(e){this.viewer.entities.add({name:"user-pin",id:"user-pin",position:Cesium.Cartesian3.fromDegrees(e.coords.longitude,e.coords.latitude,0),point:{pixelSize:8,color:Cesium.Color.BLUE.withAlpha(.5),outlineColor:Cesium.Color.BLUE,outlineWidth:1}})}updateUserPin(e,n){const r=()=>Cesium.Cartesian3.fromDegrees(n.coords.longitude,n.coords.latitude,0);e.position=new Cesium.ConstantPositionProperty(r())}async loadCustomDataSource(e,n){let r=await Cesium.GeoJsonDataSource.load(e);this.viewer.dataSources.getByName(n).forEach(a=>this.viewer.dataSources.remove(a)),r.name=n,re.instance.styleFeature(r,we.createEmpty()),await this.viewer.dataSources.add(r),r.entities.values.forEach((a,p)=>a.name=`${n}-${p}`),this.viewer.dataSources.lowerToBottom(r)}removeCustomDataSource(e){this.viewer.dataSources.getByName(e).forEach(r=>this.viewer.dataSources.remove(r))}async addLayerToMap(e){try{const n=re.instance.createGeoJson(e),r=await Cesium.GeoJsonDataSource.load(n);r.name=e.layer,this.viewer.dataSources.add(r),re.instance.styleFeature(r,e.style)}catch(n){throw n}}isLayerOnMap(e){return this.viewer.dataSources.getByName(e.layer).length>0}addLayerToActiveLayers(e){const n=h.instance.activeLayers;n.unshift(e),h.instance.activeLayers=[...n];let r=h.instance.benchLayers;r.some(a=>a.layer===e.layer)&&(r=r.filter(a=>a.layer!==e.layer),h.instance.benchLayers=r)}removeLayerFromMap(e){this.viewer.dataSources.getByName(e.layer).forEach(r=>this.viewer.dataSources.remove(r))}removeLayerFromActiveLayers(e){let n=h.instance.activeLayers;n=n.filter(r=>r.layer!==e.layer),h.instance.activeLayers=[...n]}removeLayer(e){let n=h.instance.activeLayers;this.viewer.dataSources.getByName(e.layer).forEach(s=>this.viewer.dataSources.remove(s)),n=n.filter(s=>s.layer!==e.layer),h.instance.activeLayers=[...n]}addLayerToBench(e){let n=h.instance.benchLayers;n.unshift(e),h.instance.benchLayers=[...n]}removeLayerFromBench(e){let n=h.instance.benchLayers;n=n.filter(r=>r.layer!==e.layer),h.instance.benchLayers=n}async addLayer(e){if(this.isLayerOnMap(e))E.instance.createSnackbar(M.Temporary,"","Layer già presente",3);else try{E.instance.createSnackbar(M.Loader,e.layer,"Caricamento..."),await this.addLayerToMap(e),this.addLayerToActiveLayers(e),E.instance.removeSnackbar(e.layer)}catch{E.instance.removeSnackbar(e.layer),E.instance.createSnackbar(M.Error,"","Errore nel caricamento del layer")}}benchLayer(e){this.removeLayerFromMap(e),this.removeLayerFromActiveLayers(e),this.addLayerToBench(e)}benchAllLayers(){h.instance.activeLayers.forEach(e=>{this.removeLayerFromMap(e),this.removeLayerFromActiveLayers(e),this.addLayerToBench(e)})}async unbenchLayer(e){try{E.instance.createSnackbar(M.Loader,e.layer,"Caricamento..."),await this.addLayerToMap(e),this.removeLayerFromBench(e),this.addLayerToActiveLayers(e),E.instance.removeSnackbar(e.layer)}catch{E.instance.removeSnackbar(e.layer),E.instance.createSnackbar(M.Error,"","Errore nel caricamento del layer")}}}customElements.define("app-map",yn);const rt=`.page {\r
    height: 100vh;\r
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
    color: var(--on-surface);\r
    background-color: var(--surface-container);\r
    padding: 0 16px;\r
    border: none;\r
    width: 100%;\r
    outline: none;\r
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
app-tabs-sidenav {\r
    position: fixed;\r
    top: 0;\r
    right: -360px;\r
}\r
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
        top: 120px;\r
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
    app-tabs-sidenav {\r
        top: inherit;\r
        right: inherit;\r
        bottom: 0;\r
        left: 0;\r
    }\r
}`;class st extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"map",new yn);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(rt),this.shadowRoot.adoptedStyleSheets.push(e)}async connectedCallback(){const e=document.createElement("app-splash");document.body.append(e),await z.instance.getData(),await me.instance.getMapThemes(),await F.instance.getUserPosition(),h.instance.paths.some(r=>r.name==="default")||h.instance.saveNewPath("default");const n=h.instance.paths.find(r=>r.lastSelected===!0);n&&(h.instance.selectedCustomPath={...n}),this.render(),this.setup(),setTimeout(()=>e.remove(),500)}render(){this.shadowRoot.innerHTML=`
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
                                <span class="material-symbols-outlined">apps</span>
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
            `,this.map=this.shadowRoot.querySelector("app-map")}setup(){const e=this.shadowRoot.querySelector(".tags-page-link");e&&e.addEventListener("click",()=>window.location.hash="/")}}customElements.define("page-map",st);class it extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>l.instance.publish("change-map-mode",null)),l.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}disconnectedCallback(){l.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-map-mode-btn",it,{extends:"button"});class ot extends HTMLButtonElement{constructor(){super()}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>me.instance.toggleTheme())}}customElements.define("app-map-theme-btn",ot,{extends:"button"});class at extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.setup()}setup(){this.addEventListener("click",async()=>{await F.instance.getUserPosition(),F.instance.position?(l.instance.publish("set-camera",F.instance.position),l.instance.publish("check-user-position",F.instance.position)):l.instance.publish("set-camera",null)}),l.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}disconnectedCallback(){l.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-center-position-btn",at,{extends:"button"});class ct extends HTMLInputElement{constructor(){super();i(this,"_inputValue","")}get inputValue(){return this._inputValue}set inputValue(e){this._inputValue=e,this.update()}connectedCallback(){this.setup()}setup(){this.addEventListener("input",()=>this.inputValue=this.value),l.instance.subscribe("empty-searchbar",()=>this.value=this.inputValue="")}update(){let e={layers:[],searchValue:""};this.inputValue===""||(e={layers:z.instance.filterLayersByNameAndTag(z.instance.data,this.value),searchValue:this.inputValue}),l.instance.publish("search-layer",e)}disconnectedCallback(){l.instance.unsubscribeAll("empty-searchbar")}}customElements.define("app-searchbar",ct,{extends:"input"});class S{constructor(t,e){i(this,"rgb");i(this,"hex");i(this,"hsl");t==="rgb"?(this.rgb=S.isValidRgb(e)?e:"rgb(31, 111, 235)",this.hex=S.rgbToHex(this.rgb),this.hsl=S.rgbToHsl(this.rgb)):t==="hex"?(this.hex=S.isValidHex(e)?e:"#1f6feb",this.rgb=S.hexToRgb(this.hex),this.hsl=S.rgbToHsl(this.rgb)):(this.rgb="rgb(31, 111, 235)",this.hex="#1f6feb",this.hsl=[216,84,52])}static createEmpty(){return new S("rgb","rgb(31, 111, 235)")}static isValidRgb(t){return/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(t)}static isValidHex(t){return/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(t)}static rgbToHex(t){const e=t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);if(!e)throw new Error("Invalid RGB format");const[,n,r,s]=e.map(Number);return`#${((1<<24)+(n<<16)+(r<<8)+s).toString(16).slice(1)}`}static hexToRgb(t){t=t.replace(/^#/,"");const e=parseInt(t,16),n=e>>16&255,r=e>>8&255,s=e&255;return`rgb(${n}, ${r}, ${s})`}static rgbToRgba(t,e){return t.replace("rgb","rgba").slice(0,-1)+`, ${e})`}static rgbToHsl(t){const e=t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);if(!e)throw new Error("Invalid RGB format");const[n,r,s]=e.slice(1).map(Number),a=n/255,p=r/255,y=s/255,x=Math.max(a,p,y),R=Math.min(a,p,y);let B=0,I=0;const D=(x+R)/2;if(x!==R){switch(I=D>.5?(x-R)/(2-x-R):(x-R)/(x+R),x){case a:B=(p-y)/(x-R)+(p<y?6:0);break;case p:B=(y-a)/(x-R)+2;break;case y:B=(a-p)/(x-R)+4;break}B/=6}return[Math.round(B*360),Math.round(I*100),Math.round(D*100)]}static hslToRgb(t){const[e,n,r]=t,s=e/360,a=n/100,p=r/100,y=(I,D,j)=>(j<0&&(j+=1),j>1&&(j-=1),j<1/6?I+(D-I)*6*j:j<1/2?D:j<2/3?I+(D-I)*(2/3-j)*6:I);let x,R,B;if(n===0)x=R=B=p;else{const I=p<.5?p*(1+a):p+a-p*a,D=2*p-I;x=y(D,I,s+1/3),R=y(D,I,s),B=y(D,I,s-1/3)}return`rgb(${Math.round(x*255)}, ${Math.round(R*255)}, ${Math.round(B*255)})`}}class vn extends HTMLButtonElement{constructor(){super();i(this,"_layer",q.createEmpty());i(this,"legend",document.createElement("span"))}get layer(){return this._layer}set layer(e){this._layer=e}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <div class="info">
                <span class="legend"></span>
                <label>${this.layer.name}</label>
            </div>
            <span class="icon add-icon">
                <span class="material-symbols-outlined">add</span>
            </span>
            `,this.legend=this.querySelector(".legend"),this.legend.style.backgroundColor=S.rgbToRgba(S.hexToRgb(this._layer.style.color),.5),this.legend.style.borderColor=this._layer.style.color}setup(){this.addEventListener("click",()=>{l.instance.publish("add-layer",this.layer)})}}customElements.define("app-search-result-chip",vn,{extends:"button"});const lt=`:host {\r
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
`,dt=`button[is="app-search-result-chip"] {\r
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
}`;class ut extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"container",document.createElement("div"));i(this,"_layers",[]);i(this,"_isVisible",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(lt);let n=new CSSStyleSheet;n.replaceSync(dt),this.shadowRoot.adoptedStyleSheets=[e,n]}get layers(){return this._layers}set layers(e){this._layers=e,this.update()}get isVisible(){return this._isVisible}set isVisible(e){this._isVisible=e,this._isVisible===!0?this.classList.add("visible"):this.classList.remove("visible")}connectedCallback(){this.render(),this.setup()}render(){this.container.classList.add("container"),this.shadowRoot.append(this.container)}setup(){l.instance.subscribe("search-layer",e=>{if(this.container.innerHTML="",e.searchValue===""){this.isVisible=!1;return}this.isVisible=!0,this.layers=e.layers})}update(){if(this._layers.length===0){let e=document.createElement("p");e.innerHTML="Nessun livello trovato",this.container.append(e);return}this._layers.forEach(e=>{let n=new vn;n.layer=e,n.setAttribute("is","app-search-result-chip"),this.container.append(n)})}disconnectedCallback(){l.instance.unsubscribeAll("search-layer")}}customElements.define("app-search-result",ut);class pt extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1);i(this,"icon");this.icon=this.querySelector(".material-symbols-outlined")}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.update()}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{ve.instance.isOpen=!this.isOpen}),l.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}update(){this.isOpen?this.icon.innerHTML="close":this.icon.innerHTML="menu"}disconnectedCallback(){l.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-tabs-toggle",pt,{extends:"button"});const ht=`:host {\r
    width: 360px;\r
    height: 100vh;\r
    background-color: var(--surface-container);\r
    animation: slideOut .3s ease-in-out forwards;\r
}\r
\r
:host(.visible) {\r
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
.close {\r
    height: 3px;\r
    width: 40px;\r
    background-color: var(--on-surface);\r
    border-radius: var(--border-radius-circle);\r
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
        width: 100%;\r
        height: 360px;\r
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
}`;class mt extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_isVisible",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(ht),this.shadowRoot.adoptedStyleSheets.push(e)}get isVisible(){return this._isVisible}set isVisible(e){this._isVisible=e,this.update()}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="toggle">
                <div class="close"></div>
            </div>
            <app-tabs></app-tabs>
            `}setup(){l.instance.subscribe("toggle-tabs",n=>{this.isVisible=n});const e=this.shadowRoot.querySelector(".toggle");e&&e.addEventListener("click",()=>ve.instance.isOpen=!1)}update(){this.isVisible===!0?this.classList.add("visible"):this.classList.remove("visible")}disconnectedCallback(){l.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-tabs-sidenav",mt);class wn extends HTMLButtonElement{constructor(){super();i(this,"_layer",q.createEmpty());i(this,"legend",document.createElement("span"));i(this,"removeIcon",document.createElement("span"))}get layer(){return this._layer}set layer(e){this._layer=e}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <div class="info">
                <span class="legend"></span>
                <label>${this.layer.name}</label>
            </div>
            <span class="divider"></span>
            <span class="icon add-icon">
                <span class="material-symbols-outlined">close</span>
            </span>
            `,this.legend=this.querySelector(".legend"),this.legend.style.backgroundColor=S.rgbToRgba(S.hexToRgb(this._layer.style.color),.5),this.legend.style.borderColor=this._layer.style.color,this.removeIcon=this.querySelector(".icon")}setup(){this.removeIcon.addEventListener("click",()=>{l.instance.publish("bench-layer",this.layer),l.instance.publish("open-bench",!0)})}}customElements.define("app-carousel-chip",wn,{extends:"button"});const bt=`:host {\r
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
}`,gt=`button[is="app-carousel-chip"] {\r
    cursor: pointer;\r
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
}`;class ft extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_layers",[]);i(this,"startX",0);i(this,"dragScoll",0);i(this,"isDragging",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(bt);let n=new CSSStyleSheet;n.replaceSync(gt),this.shadowRoot.adoptedStyleSheets=[e,n]}get layers(){return this._layers}set layers(e){this._layers=e,this.update()}connectedCallback(){this.render(),this.setup()}render(){this.layers=h.instance.activeLayers}setup(){l.instance.subscribe("active-layers-updated",e=>{this.layers=[...e]}),this.addEventListener("mousedown",e=>this.startDrag(e)),this.addEventListener("mousemove",e=>this.drag(e)),this.addEventListener("mouseleave",()=>this.endDrag()),this.addEventListener("mouseup",()=>this.endDrag())}update(){this.shadowRoot.innerHTML="",this.layers.forEach(e=>{let n=new wn;n.layer=e,n.setAttribute("is","app-carousel-chip"),this.shadowRoot.append(n)})}disconnectedCallback(){l.instance.unsubscribeAll("active-layers-updated")}startDrag(e){this.isDragging=!0,this.startX=e.pageX,this.dragScoll=this.scrollLeft}endDrag(){this.isDragging=!1}drag(e){if(!this.isDragging)return;e.preventDefault();const n=e.pageX-this.startX;this.scrollLeft=this.dragScoll-n}}customElements.define("app-carousel",ft);class xn extends HTMLButtonElement{constructor(){super();i(this,"_layer",q.createEmpty());i(this,"info",document.createElement("div"));i(this,"legend",document.createElement("span"));i(this,"removeIcon",document.createElement("span"))}get layer(){return this._layer}set layer(e){this._layer=e}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <div class="info">
                <span class="legend"></span>
                <label>${this.layer.name}</label>
            </div>
            <span class="divider"></span>
            <span class="icon add-icon">
                <span class="material-symbols-outlined">delete</span>
            </span>
            `,this.info=this.querySelector(".info"),this.legend=this.querySelector(".legend"),this.legend.style.backgroundColor=S.rgbToRgba(S.hexToRgb(this._layer.style.color),.5),this.legend.style.borderColor=this._layer.style.color,this.removeIcon=this.querySelector(".icon")}setup(){this.addEventListener("click",()=>{l.instance.publish("unbench-layer",this.layer)}),this.removeIcon.addEventListener("click",e=>{e.stopPropagation(),l.instance.publish("remove-layer-from-bench",this.layer)})}}customElements.define("app-bench-chip",xn,{extends:"button"});const yt=`:host {\r
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
}`,vt=`button[is="app-bench-chip"] {\r
    cursor: pointer;\r
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
}`;class wt extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_isVisible",!1);i(this,"_layers",[]);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(yt);let n=new CSSStyleSheet;n.replaceSync(vt),this.shadowRoot.adoptedStyleSheets=[e,n]}get isVisible(){return this._isVisible}set isVisible(e){this._isVisible=e,this.toggleBench()}get layers(){return this._layers}set layers(e){this._layers=e,this.update()}connectedCallback(){this.render(),this.setup()}render(){this.layers=h.instance.benchLayers}setup(){l.instance.subscribe("bench-layers-updated",e=>{this.layers=[...e]}),l.instance.subscribe("toggle-bench",e=>{this.isVisible=e})}update(){this.shadowRoot.innerHTML="",this.layers.forEach(e=>{let n=new xn;n.layer=e,n.setAttribute("is","app-bench-chip"),this.shadowRoot.append(n)})}disconnectedCallback(){l.instance.unsubscribeAll("bench-layers-updated"),l.instance.unsubscribeAll("toggle-bench")}toggleBench(){this.isVisible===!0?this.classList.add("visible"):this.classList.remove("visible")}}customElements.define("app-bench",wt);class xt extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{Ce.instance.isOpen=!this.isOpen}),l.instance.subscribe("toggle-bench",e=>{this.isOpen=e})}disconnectedCallback(){l.instance.unsubscribeAll("toggle-bench")}}customElements.define("app-bench-toggle",xt,{extends:"button"});const kt=`:host {\r
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
    font-family: 'Inter', sans-serif;\r
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
}`;class St extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_currentTab",L.Info);i(this,"infoTab",null);i(this,"suggestedRouteTab",null);i(this,"customRouteTab",null);i(this,"panel",null);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(kt),this.shadowRoot.adoptedStyleSheets.push(e)}get currentTab(){return this._currentTab}set currentTab(e){this._currentTab=e,this.switchPanel(),this.switchTab()}connectedCallback(){this.render(),this.setup(),this.currentTab=L.Info}render(){this.shadowRoot.innerHTML=`
            <nav class="header">
                <button class="tab info-tab">Informazioni<span class="border"></span></button>
                <button class="tab suggested-route-tab">Percorsi suggeriti<span class="border"></span></button>
                <button class="tab custom-route-tab">Percorsi custom<span class="border"></span></button>
            </nav>
            <div class="panel"></div>
            `,this.infoTab=this.shadowRoot.querySelector(".info-tab"),this.suggestedRouteTab=this.shadowRoot.querySelector(".suggested-route-tab"),this.customRouteTab=this.shadowRoot.querySelector(".custom-route-tab"),this.panel=this.shadowRoot.querySelector(".panel")}setup(){this.infoTab&&this.infoTab.addEventListener("click",()=>this.currentTab=L.Info),this.suggestedRouteTab&&this.suggestedRouteTab.addEventListener("click",()=>{ce.instance.isSuggestedPathSelected?this.currentTab=L.SelectedSuggestedPath:this.currentTab=L.SuggestedPath}),this.customRouteTab&&this.customRouteTab.addEventListener("click",()=>this.currentTab=L.CustomPath),l.instance.subscribe("current-tab-updated",e=>this.currentTab=e)}disconnectedCallback(){l.instance.unsubscribeAll("current-tab-updated")}renderInfoPanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<app-info-panel />")}renderSuggestedRoutePanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<app-suggested-path-panel />")}renderSelectedSuggestedRoutePanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<app-selected-suggested-path-panel />")}renderCustomPathPanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<app-custom-path-panel />")}switchPanel(){switch(this.currentTab){case L.CustomPath:this.renderCustomPathPanel();break;case L.SuggestedPath:this.renderSuggestedRoutePanel();break;case L.SelectedSuggestedPath:this.renderSelectedSuggestedRoutePanel();break;default:this.renderInfoPanel();break}}switchTab(){if(this.removeSelectedStatus(),!(!this.customRouteTab||!this.suggestedRouteTab||!this.infoTab))switch(this.currentTab){case L.CustomPath:this.customRouteTab.classList.add("selected");break;case L.SuggestedPath:this.suggestedRouteTab.classList.add("selected");break;case L.SelectedSuggestedPath:this.suggestedRouteTab.classList.add("selected");break;default:this.infoTab.classList.add("selected");break}}removeSelectedStatus(){Array.from(this.shadowRoot.querySelectorAll(".tab")).forEach(n=>n.classList.remove("selected"))}}customElements.define("app-tabs",St);const Pt=`:host {\r
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
    font-family: 'Inter', sans-serif;\r
    font-size: 1rem;\r
    font-weight: 500;\r
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
}`;class Ct extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_poi",V.instance.selectedPoi);i(this,"_isInfoOpen",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Pt),this.shadowRoot.adoptedStyleSheets.push(e)}get poi(){return this._poi}set poi(e){this._poi=e,this.isInfoOpen=!1,this.update()}get isInfoOpen(){return this._isInfoOpen}set isInfoOpen(e){this._isInfoOpen=e,this.toggleInfo()}connectedCallback(){this.render(),this.setup(),this.poi&&this.update()}disconnectedCallback(){l.instance.unsubscribe("selected-poi",this.handleSelectedPoi.bind(this))}handleSelectedPoi(e){this.poi=e}render(){this.shadowRoot.innerHTML='<p class="empty-msg">Nessun punto selezionato</p>'}setup(){this.handleSelectedPoi=this.handleSelectedPoi.bind(this),l.instance.subscribe("selected-poi",this.handleSelectedPoi)}update(){if(!this.poi){this.render();return}this.shadowRoot.innerHTML=`
            <div class="header">
                <div class="title">
                    <span class="legend"></span>
                    <h4 class="name">${this.poi.name}</h4>
                </div>
                <p class="category"></p>
            </div>
            <div class="tools"></div>
            `;const e=this.shadowRoot.querySelector(".legend"),n=this.shadowRoot.querySelector(".category"),r=this.shadowRoot.querySelector(".tools");e.style.backgroundColor=S.rgbToRgba(S.hexToRgb(this._poi.layer.style.color),.5),e.style.borderColor=this._poi.layer.style.color,this.poi.props.forEach(y=>{y.displayName==="Nome"?n.innerHTML=y.value:n.innerHTML=this.poi.name});const s=this.renderDirectionsBtn();s&&r.appendChild(s);const a=this.renderAddToRouteBtn();a&&r.append(a);const p=this.renderInfo();p&&this.shadowRoot.appendChild(p)}renderDirectionsBtn(){if(!this.poi)return null;const e=document.createElement("button");return e.classList.add("directions-btn"),e.innerHTML="Indicazioni",e.addEventListener("click",()=>re.instance.openGoogleMaps(this.poi.position)),e}renderAddToRouteBtn(){if(!this.poi||this.poi.type!==ie.Point)return null;const e=document.createElement("button");return e.classList.add("add-to-path-btn"),e.innerHTML="Aggiungi",e.addEventListener("click",()=>{this.poi&&h.instance.addPoiToSelectedPath(this.poi)}),e}renderInfo(){if(!this.poi)return null;const e=this.poi.props.filter(s=>s.displayName!=="Nome");if(e.length===0)return null;let n=document.createElement("div");n.classList.add("info");const r=document.createElement("div");return r.classList.add("info-content"),n.appendChild(r),e.forEach(s=>{const a=this.renderTopic(s);r.appendChild(a)}),n}toggleInfo(){const e=this.shadowRoot.querySelector(".info-content"),n=this.shadowRoot.querySelector(".toggle-info");e&&n&&(this.isInfoOpen?e.classList.add("visible"):e.classList.remove("visible"),this.isInfoOpen?n.innerHTML="Mostra meno":n.innerHTML="Leggi info")}renderTopic(e){const n=document.createElement("div");n.classList.add("property");const r=document.createElement("label");r.classList.add("property-label"),r.innerHTML=e.displayName;const s=document.createElement("p");return s.classList.add("property-value"),e.value!==""?s.innerHTML=e.value:s.innerHTML="-",n.appendChild(r),n.appendChild(s),n}}customElements.define("app-info-panel",Ct);var se=(c=>(c.SortPois="sort-pois",c.EditPath="edit-path",c.AddPath="add-path",c.BookmarkPath="bookmark-path",c.LoadPath="load-path",c))(se||{});const oe=class oe{constructor(){oe._instance||(oe._instance=this)}static get instance(){return oe._instance||(oe._instance=new oe),oe._instance}calculateDistance(t,e){const n=t.longitude-e.longitude,r=t.latitude-e.latitude;return Math.sqrt(n*n+r*r)}nearestInsertion(t,e){const n=[...t];let r=0,s=this.calculateDistance(e,n[0].position);for(let p=1;p<n.length;p++){const y=this.calculateDistance(e,n[p].position);y<s&&(s=y,r=p)}const a=[n.splice(r,1)[0]];for(;n.length>0;){s=Number.MAX_VALUE;let p=0;for(let y=0;y<n.length;y++){const x=this.calculateDistance(a[a.length-1].position,n[y].position);x<s&&(s=x,p=y)}a.push(n.splice(p,1)[0])}return a.reverse()}};i(oe,"_instance");let Ge=oe;const Lt=`.form {\r
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
}`;class kn extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_type",null);i(this,"_paths",[...h.instance.paths]);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Lt),this.shadowRoot.adoptedStyleSheets.push(e)}get type(){return this._type}set type(e){this._type=e}get paths(){return this._paths}set paths(e){this._paths=e}connectedCallback(){this.render(),this.update(),this.setup()}render(){}setup(){const e=this.shadowRoot.querySelector(".cancel-btn"),n=this.shadowRoot.querySelector(".form");e&&e.addEventListener("click",()=>this.dispatchEvent(new CustomEvent("close-dialog"))),n&&n.addEventListener("submit",r=>{r.preventDefault(),this.dispatchEvent(new CustomEvent("close-dialog"))})}update(){switch(this.type){case se.SortPois:this.renderSortPoisForm(),this.setupSortPoisForm();break;case se.AddPath:this.renderAddPathForm(),this.setupAddPathForm();break;case se.BookmarkPath:this.renderBookmarkPathForm(),this.setupBookmarkPathForm();break;case se.LoadPath:this.renderLoadPathForm(),this.setupLoadPathForm();break;default:this.renderEditPathForm(),this.setupEditPathForm();break}}renderSortPoisForm(){this.shadowRoot.innerHTML=`
            <form class="form">
                <h4 class="title">Riordina</h4>
                <p>Riordinare i punti di interesse del percorso <span class="featured">${h.instance.selectedCustomPath.name}</span>?</p>
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Riordina</button>
                 </div>
            </form>
            `}setupSortPoisForm(){const e=this.shadowRoot.querySelector(".form");e&&e.addEventListener("submit",()=>{const n=F.instance.position;if(!n)return;const r=F.geolocationToCartographic(n),s=Ge.instance.nearestInsertion(h.instance.selectedCustomPath.pois,r),a=h.instance.selectedCustomPath;a.pois=s,h.instance.selectedCustomPath=a})}renderEditPathForm(){this.shadowRoot.innerHTML=`
            <form class="form">
                <h4 class="title">Modifica percorso</h4>
                <input type="text" name="path-name" class="path-name-input" placeholder="Nome percorso">
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Salva</button>
                </div>
                <button type="button" class="delete-btn">Elimina percorso</button>
            </form>
            `}setupEditPathForm(){const e=this.shadowRoot.querySelector("input");if(!e)return;const n=this.shadowRoot.querySelector(".delete-btn");if(!n)return;const r=this.shadowRoot.querySelector(".submit-btn");if(!r)return;const s=this.shadowRoot.querySelector(".form");if(!s)return;e.value=h.instance.selectedCustomPath.name;const a=()=>r.disabled=e.value.trim().length===0||h.instance.paths.some(p=>p.name===e.value.toLowerCase());e.addEventListener("input",a),e.addEventListener("change",a),s.addEventListener("submit",()=>{const y=new FormData(s).get("path-name");y&&h.instance.editPath(y.toString())}),n.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("close-dialog")),h.instance.deletePath()})}renderAddPathForm(){this.shadowRoot.innerHTML=`
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
            `}setupAddPathForm(){const e=this.shadowRoot.querySelector("input");if(!e)return;const n=this.shadowRoot.querySelector(".submit-btn");if(!n)return;const r=this.shadowRoot.querySelector(".form");if(!r)return;e.value.length===0&&(n.disabled=!0);const s=()=>{n.disabled=e.value.trim().length===0||h.instance.paths.some(a=>a.name===e.value.toLowerCase())};e.addEventListener("input",s),e.addEventListener("change",s),r.addEventListener("submit",()=>h.instance.saveNewPath(e.value))}renderBookmarkPathForm(){var e;this.shadowRoot.innerHTML=`
            <form class="form">
                <h4 class="title">Salva</h4>
                <p>Questa sovrascriverà i dati relativi al percorso <span class="featured">${(e=this.paths.find(n=>n.lastSelected===!0))==null?void 0:e.name}</span>. Procedere?</p>
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
            `;const e=this.shadowRoot.querySelector(".list");e&&this.paths.forEach(n=>{const r=this.createRadioBtn(n);e.appendChild(r)})}setupLoadPathForm(){const e=this.shadowRoot.querySelector(".form");e&&e.addEventListener("submit",()=>{const r=new FormData(e).get("saved-paths");console.log("Selected path in local storage",r),r&&h.instance.loadPath(r.toString()),console.log(h.instance.selectedCustomPath)})}createRadioBtn(e){const n=document.createElement("div"),r=document.createElement("input"),s=document.createElement("label");return n.classList.add("selection"),r.type="radio",r.name="saved-paths",r.id=r.id=e.name.replace(" ","-").toLowerCase(),r.value=e.name,e.name===h.instance.selectedCustomPath.name&&(r.checked=!0),s.innerHTML=e.name,s.setAttribute("for",r.id=e.name.replace(" ","-").toLowerCase()),n.appendChild(r),n.appendChild(s),n}}customElements.define("app-custom-path-form",kn);class Sn extends HTMLDialogElement{constructor(){super();i(this,"closeBtn",document.createElement("button"))}connectedCallback(){this.render(),this.setup(),this.showModal()}render(){this.closeBtn.innerHTML='<span class="material-symbols-outlined close-icon">close</span>',this.closeBtn.classList.add("close"),this.prepend(this.closeBtn)}setup(){const e=this.querySelector("button");e&&e.addEventListener("click",()=>this.close()),document.addEventListener("keydown",this.handleKeydown.bind(this));const n=this.querySelector("app-custom-path-form");n&&n.addEventListener("close-dialog",()=>this.close())}handleKeydown(e){e.key==="Escape"&&this.close()}close(){this.remove()}}customElements.define("app-dialog",Sn,{extends:"dialog"});const te=class te{constructor(){if(te._instance)return te._instance;te._instance=this}static get instance(){return te._instance||(te._instance=new te),te._instance}createDialog(){const t=new Sn;return t.setAttribute("is","app-dialog"),t}createFormDialog(t){const e=this.createDialog(),n=new kn;n.type=t,e.appendChild(n),document.body.append(e)}};i(te,"_instance");let he=te;const Et=`:host {\r
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
}`;class Pn extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_poi",null);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Et),this.shadowRoot.adoptedStyleSheets.push(e)}get poi(){return this._poi}set poi(e){this._poi=e}connectedCallback(){this.render(),this.update(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}update(){if(!this.poi)return;const e=this.shadowRoot.querySelector(".order");e&&(e.innerHTML=(h.instance.selectedCustomPath.pois.indexOf(this.poi)+1).toString());const n=this.shadowRoot.querySelector(".name");n&&(n.innerHTML=this.poi.name);const r=this.shadowRoot.querySelector(".legend");r&&(r.style.backgroundColor=S.rgbToRgba(S.hexToRgb(this.poi.layer.style.color),.5),r.style.borderColor=this.poi.layer.style.color);const s=this.shadowRoot.querySelector(".category");s&&this.poi.props.forEach(a=>{a.displayName==="Nome"?s.innerHTML=a.value:s.innerHTML=this.poi.name})}setup(){this.poi&&(this.addEventListener("click",()=>V.instance.selectedPoi=this.poi),this.setupOrderBtns(),this.setupRemoveBtn())}setupOrderBtns(){const e=this.shadowRoot.querySelector(".move-up");e&&e.addEventListener("click",r=>{r.stopPropagation(),this.changeOrder("up")});const n=this.shadowRoot.querySelector(".move-down");n&&n.addEventListener("click",r=>{r.stopPropagation(),this.changeOrder("down")})}changeOrder(e){if(!this.poi)return;let n=h.instance.selectedCustomPath,r=[...n.pois],s=h.instance.selectedCustomPath.pois.indexOf(this.poi);r.splice(s,1),e==="up"?r.splice(s-1,0,this.poi):r.splice(s+1,0,this.poi),n.pois=r,h.instance.selectedCustomPath=n}setupRemoveBtn(){if(!this.poi)return;const e=this.shadowRoot.querySelector(".remove-btn");e&&e.addEventListener("click",n=>{n.stopPropagation();let r=h.instance.selectedCustomPath.pois.indexOf(this.poi),s=[...h.instance.selectedCustomPath.pois];s.splice(r,1),h.instance.selectedCustomPath={...h.instance.selectedCustomPath,pois:s}})}}customElements.define("app-custom-path-card",Pn);const Cn=`:host {\r
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
}`;class Tt extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_path",{...h.instance.selectedCustomPath});this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Cn),this.shadowRoot.adoptedStyleSheets.push(e)}get path(){return this._path}set path(e){this._path=e,l.instance.publish("load-custom-path",this.path)}connectedCallback(){this.render(),this.setup(),this.update()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){const e=this.shadowRoot.querySelector(".sort-btn"),n=this.shadowRoot.querySelector(".edit-btn"),r=this.shadowRoot.querySelector(".add-btn"),s=this.shadowRoot.querySelector(".bookmark-btn"),a=this.shadowRoot.querySelector(".load-btn"),p=this.shadowRoot.querySelector('button[is="app-custom-path-download-btn"]');e&&e.addEventListener("click",()=>he.instance.createFormDialog(se.SortPois)),n&&n.addEventListener("click",()=>he.instance.createFormDialog(se.EditPath)),r&&r.addEventListener("click",()=>he.instance.createFormDialog(se.AddPath)),s&&s.addEventListener("click",()=>he.instance.createFormDialog(se.BookmarkPath)),a&&a.addEventListener("click",()=>he.instance.createFormDialog(se.LoadPath)),p&&(p.path={...this.path}),l.instance.subscribe("selected-custom-path-updated",y=>{this.path=y})}update(){const e=this.shadowRoot.querySelector(".list");if(!e)return;e.innerHTML="",this.path.pois.forEach(r=>{let s=new Pn;s.poi=r,e.appendChild(s)});const n=this.shadowRoot.querySelector(".edit-btn");n&&this.path.name==="default"&&(n.disabled=!0)}disconnectedCallback(){l.instance.unsubscribeAll("selected-custom-path-updated")}}customElements.define("app-custom-path-panel",Tt);class Mt extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>me.instance.togglePhysicalMap()),l.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}disconnectedCallback(){l.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-map-type-btn",Mt,{extends:"button"});const Rt=`:host {\r
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
}`;class It extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_isOpen",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Rt),this.shadowRoot.adoptedStyleSheets.push(e)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){l.instance.subscribe("toggle-tabs",e=>this.isOpen=e)}disconnectedCallback(){l.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-map-controls",It);const At=`.header {\r
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
}`;class Ot extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_tags",[]);this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(At),this.shadowRoot.adoptedStyleSheets.push(e)}get tags(){return this._tags}set tags(e){this._tags=e}connectedCallback(){this.tags=z.instance.getAllTags(z.instance.data),this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`          
            <div class="header">
                <img src="./images/RAISE_pictogram_no_bg.svg" alt="Raise logo" class="logo">
                <h1>Ecco alcuni dati che potrebbero interessarti</h1>
            </div>
            <form>
                <div class="tags-wall"></div>
                <button type="submit" class="submit-btn">Continua</button>
            </form>

            `;const e=this.shadowRoot.querySelector(".tags-wall");e&&this.tags.forEach(n=>{let r=this.createChip(n);e.append(r)})}setup(){const e=this.shadowRoot.querySelector("form");e&&e.addEventListener("submit",n=>{n.preventDefault();const r=new FormData(e),s=Array.from(r.getAll("tag"),p=>String(p));h.instance.setTags(s);const a=z.instance.filterLayersByTags(z.instance.data,s);h.instance.activeLayers=a,h.instance.benchLayers=[],window.location.hash="/map"})}createChip(e){let n=document.createElement("div");n.classList.add("chip");let r=document.createElement("input");r.type="checkbox",r.id=e.replace(" ","").toLowerCase(),r.name="tag",r.value=e,h.instance.tags.forEach(a=>{a===e&&(r.checked=!0)});let s=document.createElement("label");return s.setAttribute("for",e.replace(" ","").toLowerCase()),s.innerHTML=e.charAt(0).toUpperCase()+e.slice(1),n.append(r),n.append(s),n}}customElements.define("app-tags-wall",Ot);const Bt=`:host {\r
    position: fixed;\r
    top: 0;\r
    left: 0;\r
    height: 100vh;\r
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
}`;class Dt extends HTMLElement{constructor(){super();i(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(Bt),this.shadowRoot.adoptedStyleSheets.push(e)}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
            <img src="./images/RAISE_pictogram_no_bg.svg" class="logo">
            <div class="loader"></div>
            `}}customElements.define("app-splash",Dt);class _t extends HTMLButtonElement{constructor(){super();i(this,"_path",N.createEmpty())}get path(){return this._path}set path(e){this._path=e}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>this.downloadCsv())}createCsvContent(){let e=`path	layer name	id	name	latitude	longitude	height	info
`;return Object.keys(this.path).forEach(n=>{n==="pois"&&this.path.pois.forEach(r=>{const s=r.props.map(p=>`${p.displayName}: ${p.value}`).join("|"),a=`${this.path.name}	${r.layerName}	${r.uuid}	${r.name}	${Cesium.Math.toDegrees(r.position.latitude)}	${Cesium.Math.toDegrees(r.position.longitude)}	${Cesium.Math.toDegrees(r.position.height)}	${s}
`;e+=a})}),e.endsWith(`
`)&&(e=e.slice(0,-1)),e.trimEnd(),e}downloadCsv(){let e="data:text/csv;charset=utf-8,";e+=this.createCsvContent(),console.log(e);const n=encodeURI(e),r=document.createElement("a");r.setAttribute("href",n),r.setAttribute("download",`${this.path.name.replace(/[|&;$%@"<>()+,\s]/g,"").trim()}.csv`),document.body.appendChild(r),r.click(),r.remove()}}customElements.define("app-custom-path-download-btn",_t,{extends:"button"});const Ht=`:host {
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
}`;class Ln extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_path",N.createEmpty());i(this,"_template",document.createElement("template"));this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(Ht),this.shadowRoot.adoptedStyleSheets.push(e),this._template.id="app-suggested-path-card",this._template.innerHTML=`
            <h4 class="path-title"><slot name="path-name">Nome del percorso</slot></h4>
            <p class="path-steps"><slot name="pois-count">Numero di tappe</slot>&nbsp;tappe</p>
            `,this.shadowRoot.appendChild(this._template.content.cloneNode(!0))}get path(){return this._path}set path(e){this._path=e,this.update()}connectedCallback(){this.render(),this.setup()}render(){}setup(){this.addEventListener("click",()=>{ce.instance.isSuggestedPathSelected=!0,h.instance.selectedSuggestedPath=this.path})}update(){this.path&&(this.innerHTML=`
            <h4 slot="path-name">${this.path.name}</h4>
            <p slot="pois-count">${this.path.pois.length}</p>
            `)}}customElements.define("app-suggested-path-card",Ln);const Nt=`:host {
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
}`;class zt extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_paths",[]);this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(Nt),this.shadowRoot.adoptedStyleSheets.push(e)}get paths(){return this._paths}set paths(e){this._paths=e,this.update()}connectedCallback(){this.render(),this.setup(),this.paths=h.instance.getSuggestedPaths()}render(){this.shadowRoot.innerHTML=`
            <div class="header">
                <h4>Percorsi suggeriti</h4>
            </div>
            <div class="list"></div>
            `}setup(){l.instance.subscribe("active-layers-updated",()=>{this.paths=h.instance.getSuggestedPaths()})}update(){const e=this.shadowRoot.querySelector(".list");e&&(e.innerHTML="",this.paths.forEach(n=>{let r=new Ln;r.path=n,e.append(r)}),this.paths.length===0&&(e.innerHTML='<p class="empty-msg">Nessun percorso suggerito per i layer correnti</p>'))}}customElements.define("app-suggested-path-panel",zt);const Ft=`:host {
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
}`;class En extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_poi",ye.createEmpty());this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(Ft),this.shadowRoot.adoptedStyleSheets.push(e)}get poi(){return this._poi}set poi(e){this._poi=e;const n=z.instance.filterLayersByLayerName(this.poi.layerName);n&&(this.poi.layer=n)}connectedCallback(){this.render(),this.update(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="title">
                <span class="legend"></span>
                <h4 class="name"></h4>
            </div>
            <p class="category"></p>
            `}update(){if(!this.poi)return;const e=this.shadowRoot.querySelector(".name");e&&(e.innerHTML=this.poi.name);const n=this.shadowRoot.querySelector(".legend");n&&(n.style.backgroundColor=S.rgbToRgba(S.hexToRgb(this.poi.layer.style.color),.5),n.style.borderColor=this.poi.layer.style.color);const r=this.shadowRoot.querySelector(".category");r&&this.poi.props.forEach(s=>{s.displayName==="Nome"?r.innerHTML=s.value:r.innerHTML=this.poi.name})}setup(){this.poi&&this.addEventListener("click",()=>V.instance.selectedPoi=this.poi)}}customElements.define("app-selected-suggested-path-card",En);class jt extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_path",{...h.instance.selectedSuggestedPath});this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(Cn),this.shadowRoot.adoptedStyleSheets.push(e)}get path(){return this._path}set path(e){this._path=e}connectedCallback(){this.render(),this.setup(),this.update(),l.instance.publish("load-custom-path",this.path)}render(){this.shadowRoot.innerHTML=`
            <div class="header">
                <button class="btn back-btn">
                    <span class="material-symbols-outlined action-icon">chevron_left</span>
                </button>
                <h4>${this.path.name}</h4>
                <button class="load-layers-btn">Mostra solo layer presenti</button>
            </div>
            <div class="list"></div>
            `}setup(){const e=this.shadowRoot.querySelector(".back-btn");e&&e.addEventListener("click",()=>{ce.instance.isSuggestedPathSelected=!1,ce.instance.currentTab=L.SuggestedPath});const n=this.shadowRoot.querySelector(".load-layers-btn");n&&n.addEventListener("click",()=>{const r=this.getLayersInPath();l.instance.publish("bench-all-layers",null),r.forEach(s=>l.instance.publish("add-layer",s))})}update(){const e=this.shadowRoot.querySelector(".list");e&&(e.innerHTML="",this.path.pois.forEach(n=>{let r=new En;r.poi=n,e.appendChild(r)}))}getLayersInPath(){let e=[];return this.path.pois.forEach(n=>e.push(n.layer)),[...new Set(e)]}}customElements.define("app-selected-suggested-path-panel",jt);const Vt=document.querySelector("app-router"),qt=new Ue("map",fe.Page,()=>"<page-map></page-map>"),$t=new Ue("index",fe.Default,()=>"<page-tags></page-tags>"),Gt=new Ue("404",fe.NotFound,()=>"<div>404</div>"),Ut=[qt,$t,Gt];Vt.addRoutes(Ut);h.instance.getTags();h.instance.getCsvPaths(1);h.instance.getSavedLayers();h.instance.getCustomPaths();
