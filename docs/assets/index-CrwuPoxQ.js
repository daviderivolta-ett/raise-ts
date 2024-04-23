var be=Object.defineProperty;var ge=(a,t,e)=>t in a?be(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var i=(a,t,e)=>(ge(a,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();var X=(a=>(a.Default="default",a.Page="page",a.NotFound="not-found",a))(X||{});class re{constructor(t,e,n){i(this,"url");i(this,"type");i(this,"routing");this.url=t,this.type=e,this.routing=n}}class fe extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"routes",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){window.addEventListener("hashchange",()=>{this.checkRoute()})}addRoutes(e){this.routes=[...e],this.checkRoute()}checkRoute(){const e=window.location.hash.slice(2);this.changeRoute(e)}changeRoute(e){if(e){const n=this.routes.findIndex(r=>r.url===e);this.shadowRoot.innerHTML=this.routes[n]?this.routes[n].routing():this.sendNotFound()}else{const n=this.routes.filter(r=>r.type===X.Default);n?window.location.hash="#/"+n[0].url:this.sendNotFound()}}sendNotFound(){const e=this.routes.filter(n=>n.type===X.NotFound);return e.length===0||(window.location.hash="#/"+e[0].url,this.changeRoute(e[0].url)),"404: Not found"}}customElements.define("app-router",fe);class Z{constructor(t,e){i(this,"color");i(this,"opacity");this.color=t,this.opacity=e}static createEmpty(){return new Z("#008000",1)}}class ne{constructor(t,e,n){i(this,"propertyName");i(this,"displayName");i(this,"type");this.propertyName=t,this.displayName=e,this.type=n}static createEmpty(){return new ne("","","string")}}var q=(a=>(a.String="string",a.Image="image",a.Number="number",a))(q||{});class P{constructor(t,e,n,r,s,o){i(this,"name");i(this,"layer");i(this,"url");i(this,"style");i(this,"tags");i(this,"relevantProperties");this.name=t,this.layer=e,this.url=n,this.style=r,this.tags=s,this.relevantProperties=o}static createEmpty(){return new P("","","",Z.createEmpty(),[],[ne.createEmpty()])}}const C=class C{constructor(){i(this,"CATEGORIES_URL","./json/categories.json");i(this,"_data");if(C._instance)return C._instance;C._instance=this}static get instance(){return C._instance||(C._instance=new C),C._instance}get data(){return this._data}set data(t){this._data=t}async getData(){if(this.data)return this.data;{let t=await this.fetchAppData(this.CATEGORIES_URL);return t=this.parseData(t),this.data=t,t}}async fetchAppData(t){try{const e=await fetch(t).then(r=>r.json()),n=await Promise.all(e.categories.map(async r=>{const s=await Promise.all(r.groups.map(async o=>{if(typeof o=="string")try{const l=await fetch(o);if(l.ok)return l.json();throw new Error("Errore durante il recupero dei dati.")}catch(l){return console.error(l),null}else return o}));return r.groups=s,r}));return{...e,categories:n}}catch(e){throw console.error("Errore durante il recupero dei dati JSON.",e),e}}parseData(t){return{categories:t.categories.map(n=>({name:n.name,groups:n.groups.map(r=>this.parseGroup(r))}))}}parseGroup(t){return Array.isArray(t)?t:{name:t.name,layers:t.layers.map(e=>this.parseLayer(e))}}parseLayer(t){return new P(t.name,t.layer,t.layer_url_wfs,new Z(t.style.color,parseFloat(t.style.opacity)),t.tags,t.relevant_properties.map(e=>{let n=ne.createEmpty();switch(n.displayName=e.display_name,n.propertyName=e.property_name,e.type){case"image":n.type=q.Image;break;case"number":n.type=q.Number;break;default:n.type=q.String;break}return n}))}getAllLayers(t){const e=[];return t.categories.map(n=>{n.groups.map(r=>{typeof r!="string"&&r.layers.map(s=>{e.push(s)})})}),e}filterLayersByNameAndTag(t,e){let n=[];return n=t.categories.flatMap(r=>r.groups.flatMap(s=>typeof s=="string"?[P.createEmpty()]:s.layers.filter(o=>o.name.toLowerCase().includes(e)||o.tags.some(l=>l.includes(e))))),n}filterLayersByLayerName(t){let e;return this.data.categories.find(n=>n.groups.find(r=>typeof r=="string"?!1:(e=r.layers.find(s=>s.layer.includes(t)),e!==void 0))),e}getAllTags(t){let e=[];return t.categories.map(r=>{r.groups.map(s=>{typeof s!="string"&&s.layers.map(o=>{o.tags.map(l=>{e.push(l)})})})}),[...new Set(e)]}filterLayersByTag(t,e){let n=[];return n=t.categories.flatMap(r=>r.groups.flatMap(s=>typeof s=="string"?[P.createEmpty()]:s.layers.filter(o=>o.tags.some(l=>l.includes(e))))),n}filterLayersByTags(t,e){let n=[];return e.forEach(s=>{this.filterLayersByTag(t,s).forEach(l=>n.push(l))}),[...new Set(n)]}};i(C,"_instance");let v=C;const ye=`.page {\r
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
}`;class we extends HTMLElement{constructor(){super();i(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(ye),this.shadowRoot.adoptedStyleSheets.push(e)}async connectedCallback(){await v.instance.getData(),this.render()}render(){this.shadowRoot.innerHTML=`
            <div class="page">
                <div class="box">
                    <app-tags-wall></app-tags-wall>
                </div>
            </div>
            `}}customElements.define("page-tags",we);const L=class L{constructor(){i(this,"_position",null);if(L._instance)return L._instance;L._instance=this}get position(){return this._position}set position(t){this._position=t}static get instance(){return L._instance||(L._instance=new L),L._instance}async getUserPosition(){try{const t=await new Promise((e,n)=>{navigator.geolocation.getCurrentPosition(r=>{e(r)},r=>{n(r)})});this._position=t}catch{this._position=null}}static geolocationToCartographic(t){return new Cesium.Cartographic(t.coords.longitude,t.coords.latitude,t.coords.altitude||0)}};i(L,"_instance");let x=L;class K{constructor(t,e,n,r,s,o,l){i(this,"uuid");i(this,"name");i(this,"position");i(this,"type");i(this,"layer");i(this,"layerName");i(this,"props");this.uuid=t,this.name=e,this.position=n,this.type=r,this.layer=s,this.layerName=o,this.props=l}static createEmpty(){return new K("","",Cesium.Cartographic.ZERO,"point",P.createEmpty(),"",[])}}class Q{constructor(t,e,n){i(this,"displayName");i(this,"type");i(this,"value");this.displayName=t,this.type=e,this.value=n}static createEmpty(){return new Q("",q.String,"")}}var z=(a=>(a.Point="point",a.Polyline="polyline",a.Polygon="polygon",a))(z||{});class w{constructor(t,e,n){i(this,"name");i(this,"pois");i(this,"lastSelected");this.name=t,this.pois=e,this.lastSelected=n}static createEmpty(){return new w("",[],!0)}static createDefault(){return new w("default",[],!0)}}var m=(a=>(a.Info="info",a.SuggestedPath="suggested-path",a.CustomPath="custom-path",a.SelectedSuggestedPath="selected-suggested-path",a))(m||{});const E=class E{constructor(){i(this,"listeners",{});if(E._instance)return E._instance;E._instance=this}static get instance(){return E._instance||(E._instance=new E),E._instance}subscribe(t,e){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e)}unsubscribe(t,e){this.listeners[t]&&(this.listeners[t]=this.listeners[t].filter(n=>n!==e))}unsubscribeAll(t){delete this.listeners[t]}publish(t,e){this.listeners[t]&&this.listeners[t].forEach(n=>n(e))}};i(E,"_instance");let c=E;const T=class T{constructor(){i(this,"_currentTab",m.Info);i(this,"_isSuggestedPathSelected",!1);if(T._instance)return T._instance;T._instance=this}static get instance(){return T._instance||(T._instance=new T),T._instance}get currentTab(){return this._currentTab}set currentTab(t){this._currentTab=t,c.instance.publish("current-tab-updated",this.currentTab)}get isSuggestedPathSelected(){return this._isSuggestedPathSelected}set isSuggestedPathSelected(t){this._isSuggestedPathSelected=t}};i(T,"_instance");let $=T;var g=(a=>(a.Loader="loader",a.Temporary="temporary",a.Error="error",a.Info="info",a))(g||{});const ve=`:host {\r
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
}`;class se extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"snackbarType",g.Info);i(this,"message","");i(this,"duration",0);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(ve),this.shadowRoot.adoptedStyleSheets.push(e)}connectedCallback(){this.render()}render(){switch(this.shadowRoot.innerHTML=`<p class="message">${this.message}</p>`,this.snackbarType){case g.Error:this.renderErrorSnackbar();break;case g.Loader:this.renderLoaderSnackbar();break;case g.Temporary:this.renderTemporarySnackbar();break;default:this.renderInfoSnackbar();break}}renderInfoSnackbar(){this.createDismissButton()}renderLoaderSnackbar(){const e=document.createElement("div");e.classList.add("loader"),this.shadowRoot.append(e)}renderErrorSnackbar(){this.createDismissButton()}renderTemporarySnackbar(){this.createDismissButton();const e=document.createElement("span");e.classList.add("bar"),e.style.setProperty("--snackbar-duration",`${this.duration}s`),this.shadowRoot.append(e),setTimeout(()=>this.remove(),this.duration*1e3)}createDismissButton(){const e=document.createElement("button");e.innerHTML='<span class="material-symbols-outlined">close</span>',e.classList.add("dismiss-btn"),this.shadowRoot.append(e),e.addEventListener("click",()=>this.remove())}}customElements.define("app-snackbar",se);const M=class M{constructor(){i(this,"snackbars",[]);i(this,"container",null);if(M._instance)return M._instance;M._instance=this}static get instance(){return M._instance||(M._instance=new M),M._instance}createSnackbar(t,e,n,r=2){if(this.container=document.querySelector(".snackbar-container"),!this.container)return;const s=new se;s.id=e.replace(/[^a-zA-Z0-9-_]/g,""),s.snackbarType=t,s.message=n,r&&(s.duration=r),this.container.append(s)}removeSnackbar(t){if(this.container=document.querySelector(".snackbar-container"),!this.container)return;const e=t.replace(/[^a-zA-Z0-9-_]/g,""),n=this.container.querySelector(`#${e}`);n&&n.remove()}};i(M,"_instance");let b=M;const R=class R{constructor(){i(this,"_tags",[]);i(this,"_paths",[]);i(this,"_selectedCustomPath",w.createDefault());i(this,"_suggestedPaths",[w.createEmpty()]);i(this,"_selectedSuggestedPath",w.createEmpty());i(this,"_layers",{active:[],bench:[]});i(this,"_activeLayers",[]);i(this,"_benchLayers",[]);if(R._instance)return R._instance;R._instance=this}static get instance(){return R._instance||(R._instance=new R),R._instance}get tags(){return this._tags}set tags(t){this._tags=t}get paths(){return this._paths}set paths(t){this._paths=t}get selectedCustomPath(){return this._selectedCustomPath}set selectedCustomPath(t){this._selectedCustomPath=t,c.instance.publish("selected-custom-path-updated",this.selectedCustomPath),$.instance.currentTab=m.CustomPath}get suggestedPaths(){return this._suggestedPaths}set suggestedPaths(t){this._suggestedPaths=t}get selectedSuggestedPath(){return this._selectedSuggestedPath}set selectedSuggestedPath(t){this._selectedSuggestedPath=t,c.instance.publish("selected-suggested-path-updated",this.selectedSuggestedPath),$.instance.currentTab=m.SelectedSuggestedPath}get layers(){return this._layers}set layers(t){this._layers=t,localStorage.setItem("layers",JSON.stringify(this.layers))}get activeLayers(){return this._activeLayers}set activeLayers(t){this._activeLayers=t,c.instance.publish("active-layers-updated",this.activeLayers),this.layers={...this.layers,active:this.activeLayers}}get benchLayers(){return this._benchLayers}set benchLayers(t){this._benchLayers=t,c.instance.publish("bench-layers-updated",this.benchLayers),this.layers={...this.layers,bench:this.benchLayers}}getCsvPaths(t){let e=0;const n=[],r=[];for(;e<=t;){const s=fetch(`./suggested-paths/${e}.tsv`).then(o=>o.text()).then(o=>{const l=this.parseCsvFile(o);n.push(this.parseCsvPath(l))}).catch(o=>console.error("Errore durante il recupero dei percorsi suggeriti",o));r.push(s),e++}Promise.all(r).then(()=>this.suggestedPaths=[...n])}parseCsvFile(t){return t.split(`
`).map(r=>{const s=r.split("	");return{path:s[0],layerName:s[1],id:s[2],name:s[3],latitude:s[4],longitude:s[5],height:s[6],info:s[7]}})}parseCsvPath(t){let e=w.createEmpty();return e.name=t[1].path,e.lastSelected=!1,t.forEach((n,r)=>{r!==0&&e.pois.push(this.parseCsvPoi(n))}),e}parseCsvPoi(t){let e=K.createEmpty();return e.layerName=t.layerName,e.layer=P.createEmpty(),e.name=t.name,e.position=Cesium.Cartographic.fromDegrees(parseFloat(t.longitude),parseFloat(t.latitude),parseFloat(t.height)),e.type=z.Point,e.uuid=t.id,e.props=this.parseCsvPoiProperties(t.info),e}parseCsvPoiProperties(t){let e=[];return t.split("|").forEach(r=>{let s=Q.createEmpty();s.displayName=r.split(":")[0],s.value=r.split(":")[1].trim(),s.type=q.String,e.push(s)}),e}getSuggestedPaths(){let t=[];return this.suggestedPaths.forEach(e=>{e.pois.forEach(n=>{this.activeLayers.forEach(r=>{n.layerName===r.layer&&t.push(e)})})}),[...new Set(t)]}isPoiInLayers(t){return this.activeLayers.some(e=>e.layer===t.layerName)}setTags(t){localStorage.setItem("tags",JSON.stringify(t)),this.tags=t}getTags(){const t=localStorage.getItem("tags");if(!t)return;const e=JSON.parse(t);this.tags=e}getSavedLayers(){const t=localStorage.getItem("layers");if(!t)return;const e=JSON.parse(t);let n={active:[],bench:[]};n.active=e.active.map(r=>this.parseLayer(r)),n.bench=e.bench.map(r=>this.parseLayer(r)),this._layers=n,this._activeLayers=this._layers.active,this._benchLayers=this._layers.bench}getCustomPaths(){const t=localStorage.getItem("paths");if(!t)return;const n=JSON.parse(t).map(r=>this.parseCustomPath(r));this.paths=n}setCustomPaths(){localStorage.setItem("paths",JSON.stringify(this.paths))}parseCustomPath(t){let e=w.createEmpty();return typeof t.lastSelected=="boolean"&&(e.lastSelected=t.lastSelected),t.name&&(e.name=t.name),t.pois&&(e.pois=t.pois.map(n=>this.parsePoi(n))),e}parsePoi(t){let e=K.createEmpty();return e.layer=this.parseLayer(t.layer),e.layerName=t.layerName,e.name=t.name,e.position=new Cesium.Cartographic(t.position.longitude,t.position.latitude,t.position.height),e.props=t.props.map(n=>this.parsePoiProperty(n)),e.type=this.parsePoiType(t.type),e.uuid=t.uuid,e}parseLayer(t){return new P(t.name,t.layer,t.url=t.url,new Z(t.style.color,t.style.opacity),t.tags,t.relevantProperties.map(e=>{let n=ne.createEmpty();switch(n.displayName=e.displayName,n.propertyName=e.propertyName,e.type){case"image":n.type=q.Image;break;case"number":n.type=q.Number;break;default:n.type=q.String;break}return n}))}parsePoiProperty(t){let e=Q.createEmpty();return t.displayName&&(e.displayName=t.displayName),t.type&&(e.type=t.type),t.value&&(e.value=t.value),e}parsePoiType(t){let e;switch(t){case"polyline":e=z.Polyline;break;case"polygon":e=z.Polygon;break;default:e=z.Point;break}return e}addPoiToSelectedPath(t){if(this.isPoiInSelectedPath(t)){b.instance.createSnackbar(g.Temporary,"already-present","Il punto di interesse si trova già nel percorso selezionato.");return}const e=[...this.selectedCustomPath.pois];e.unshift(t),this.selectedCustomPath={...w.createEmpty(),name:this.selectedCustomPath.name},this.selectedCustomPath={...this.selectedCustomPath,pois:e}}isPoiInSelectedPath(t){return this.selectedCustomPath.pois.some(e=>e.name===t.name)}editPath(t){const e=this.paths.find(r=>r.lastSelected===!0);if(!e)return;const n=this.paths.filter(r=>r.lastSelected!==!0);e.name=t,n.push(e),this.selectedCustomPath=e,this.paths=n,this.setCustomPaths(),b.instance.createSnackbar(g.Temporary,"modified-path",`Percorso ${t} modificato con successo.`)}deletePath(){const t=this.paths.filter(n=>n.lastSelected!==!0),e=this.paths.find(n=>n.name==="default");e&&(e.lastSelected=!0,this.selectedCustomPath=e),this.paths=[...t],this.setCustomPaths(),b.instance.createSnackbar(g.Temporary,"deleted-path","Percorso eliminato con successo.")}saveNewPath(t){const e=this.paths.map(r=>(r.lastSelected=!1,r)),n=w.createEmpty();n.lastSelected=!0,n.name=t,e.push(n),this.selectedCustomPath=n,this.paths=e,this.setCustomPaths(),b.instance.createSnackbar(g.Temporary,"new-path",`Percorso ${t} creato con successo.`)}savePath(){const t=this.paths.filter(e=>e.lastSelected!==!0);t.push(this.selectedCustomPath),this.paths=t,this.setCustomPaths(),b.instance.createSnackbar(g.Temporary,"saved-path","Percorso salvato con successo.")}loadPath(t){const e=this.paths.find(r=>r.name===t);if(!e)return;const n=this.paths;n.forEach(r=>r.lastSelected=!1),e.lastSelected=!0,this.selectedCustomPath=e,this.paths=n,this.setCustomPaths(),b.instance.createSnackbar(g.Temporary,"loaded-path",`Percorso ${t} caricato con successo.`)}};i(R,"_instance");let d=R;class xe{constructor(t,e,n){i(this,"url");i(this,"layer");i(this,"credit");this.url=t,this.layer=e,this.credit=n}}var G=(a=>(a.Light="light",a.Dark="dark",a))(G||{});const I=class I{constructor(){i(this,"MAP_THEMES_URL","./json/themes.json");i(this,"_currentTheme",G.Dark);i(this,"_isPhysicalMap",!1);i(this,"mapThemes",[]);if(I._instance)return I._instance;I._instance=this}static get instance(){return I._instance||(I._instance=new I),I._instance}get currentTheme(){return this._currentTheme}set currentTheme(t){this._currentTheme=t,this.changeColors(this.currentTheme),c.instance.publish("change-theme",{isPhysicalMap:this.isPhysicalMap,theme:this.chooseMapTheme(this.currentTheme)})}get isPhysicalMap(){return this._isPhysicalMap}set isPhysicalMap(t){this._isPhysicalMap=t,c.instance.publish("toggle-physical-map",{isPhysicalMap:this.isPhysicalMap,currentTheme:this.chooseMapTheme(this.currentTheme)})}async getMapThemes(){if(this.mapThemes.length!==0)return this.mapThemes;{let t=await this.fetchMapThemes(this.MAP_THEMES_URL);return this.mapThemes=t,t}}async fetchMapThemes(t){let e=[];try{e=await fetch(t).then(n=>n.json()),e=e.map(n=>this.parseMapTheme(n))}catch(n){console.error(n)}return e}parseMapTheme(t){return new xe(t.url,t.layer,t.credit)}createImageryProvider(t){return new Cesium.WebMapTileServiceImageryProvider({url:t.url,layer:t.layer,credit:new Cesium.Credit(t.credit),tileMatrixSetID:"default",style:"default",format:"image/jpeg",maximumLevel:19})}toggleTheme(){this.currentTheme===G.Light?this.currentTheme=G.Dark:this.currentTheme=G.Light}togglePhysicalMap(){this.isPhysicalMap===!0?this.isPhysicalMap=!1:this.isPhysicalMap=!0}chooseMapTheme(t){const e=t===G.Dark?this.mapThemes.find(n=>n.layer==="carto-dark"):this.mapThemes.find(n=>n.layer==="carto-light");if(e!==void 0)return e;throw new Error("Impossibile trovare il tema della mappa desiderato.")}changeColors(t){switch(t){case G.Dark:this.setDarkTheme();break;default:this.setLightTheme();break}}setDarkTheme(){document.documentElement.style.setProperty("--primary","rgb(55, 222, 187)"),document.documentElement.style.setProperty("--on-primary","rgb(0, 56, 45)"),document.documentElement.style.setProperty("--primary-container","rgb(0, 81, 66)"),document.documentElement.style.setProperty("--on-primary-container","rgb(184, 255, 233)"),document.documentElement.style.setProperty("--secondary","rgb(174, 205, 194)"),document.documentElement.style.setProperty("--on-secondary","rgb(25, 53, 46)"),document.documentElement.style.setProperty("--secondary-container","rgb(48, 76, 68)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(202, 233, 222)"),document.documentElement.style.setProperty("--tertiary","rgb(163, 204, 231)"),document.documentElement.style.setProperty("--on-tertiary","rgb(1, 52, 74)"),document.documentElement.style.setProperty("--tertiary-container","rgb(33, 75, 98)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(197, 231, 255)"),document.documentElement.style.setProperty("--error","rgb(255, 180, 171)"),document.documentElement.style.setProperty("--on-error","rgb(105, 0, 5)"),document.documentElement.style.setProperty("--error-container","rgb(147, 0, 10)"),document.documentElement.style.setProperty("--on-error-container","rgb(255, 218, 214)"),document.documentElement.style.setProperty("--surface-dim","rgb(0, 19, 46)"),document.documentElement.style.setProperty("--surface","rgb(0, 19, 46)"),document.documentElement.style.setProperty("--surface-bright","rgb(0, 56, 115)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(0, 14, 37)"),document.documentElement.style.setProperty("--surface-container-low","rgb(0, 27, 61)"),document.documentElement.style.setProperty("--surface-container","rgb(0, 31, 69)"),document.documentElement.style.setProperty("--surface-container-high","rgb(0, 41, 87)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(0, 52, 107)"),document.documentElement.style.setProperty("--on-surface","rgb(213, 227, 255)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(171, 200, 247)"),document.documentElement.style.setProperty("--outline","rgb(118, 146, 191)"),document.documentElement.style.setProperty("--outline-variant","rgb(42, 72, 112)"),document.documentElement.style.setProperty("--inverse-surface","rgb(214, 227, 255)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(0, 48, 99)"),document.documentElement.style.setProperty("--inverse-primary","rgb(0, 107, 88)")}setLightTheme(){document.documentElement.style.setProperty("--primary","rgb(0, 107, 88)"),document.documentElement.style.setProperty("--on-primary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--primary-container","rgb(243, 255, 249)"),document.documentElement.style.setProperty("--on-primary-container","rgb(0, 32, 25)"),document.documentElement.style.setProperty("--secondary","rgb(71, 100, 91)"),document.documentElement.style.setProperty("--on-secondary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary-container","rgb(243, 255, 249)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(3, 32, 25)"),document.documentElement.style.setProperty("--tertiary","rgb(59, 99, 122)"),document.documentElement.style.setProperty("--on-tertiary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary-container","rgb(251, 252, 255)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(0, 30, 45)"),document.documentElement.style.setProperty("--error","rgb(184, 31, 33)"),document.documentElement.style.setProperty("--on-error","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error-container","rgb(255, 218, 214)"),document.documentElement.style.setProperty("--on-error-container","rgb(65, 0, 3)"),document.documentElement.style.setProperty("--surface-dim","rgb(201, 218, 255)"),document.documentElement.style.setProperty("--surface","rgb(249, 249, 255)"),document.documentElement.style.setProperty("--surface-bright","rgb(249, 249, 255)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-low","rgb(240, 243, 255)"),document.documentElement.style.setProperty("--surface-container","rgb(232, 238, 255)"),document.documentElement.style.setProperty("--surface-container-high","rgb(223, 232, 255)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(214, 227, 255)"),document.documentElement.style.setProperty("--on-surface","rgb(0, 27, 61)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(42, 72, 112)"),document.documentElement.style.setProperty("--outline","rgb(92, 120, 163)"),document.documentElement.style.setProperty("--outline-variant","rgb(171, 200, 247)"),document.documentElement.style.setProperty("--inverse-surface","rgb(0, 48, 99)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(236, 240, 255)"),document.documentElement.style.setProperty("--inverse-primary","rgb(55, 222, 187)")}};i(I,"_instance");let J=I;const A=class A{constructor(){i(this,"_isOpen",!1);if(A._instance)return A._instance;A._instance=this}static get instance(){return A._instance||(A._instance=new A),A._instance}get isOpen(){return this._isOpen}set isOpen(t){this._isOpen=t,c.instance.publish("toggle-tabs",this.isOpen),this.isOpen&&c.instance.publish("toggle-bench",!1)}};i(A,"_instance");let Y=A;const B=class B{constructor(){i(this,"_isOpen",!1);if(B._instance)return B._instance;B._instance=this}static get instance(){return B._instance||(B._instance=new B),B._instance}get isOpen(){return this._isOpen}set isOpen(t){this._isOpen=t,c.instance.publish("toggle-bench",this.isOpen),this.isOpen&&c.instance.publish("toggle-tabs",!1)}};i(B,"_instance");let ee=B;var W=(a=>(a.Point="Point",a.LineString="LineString",a.Polygon="Polygon",a.MultiPoint="MultiPoint",a.MultiLineString="MultiLineString",a.MultiPolygon="MultiPolygon",a))(W||{});const _=class _{constructor(){if(_._instance)return _._instance;_._instance=this}static get instance(){return _._instance||(_._instance=new _),_._instance}async createGeoJson(t){const e=`${t.url}?service=WFS&typeName=${t.layer}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;let r=await(await fetch(e)).json(),s=this.substituteRelevantProperties(r,t);return this.createFeatureAdditionalProperties(s,t)}async createGeoJsonFromEntity(t){let e={type:"Feature",geometry:{type:"Point",coordinates:[]},properties:{}};if(t.point&&t.position){e.geometry.type="Point";let n=this.createGeojsonPointCoordinates(t);n&&(e.geometry.coordinates=[Cesium.Math.toDegrees(n.longitude),Cesium.Math.toDegrees(n.latitude)])}return t.polyline&&t.polyline.positions&&(e.geometry.type="LineString",e.geometry.coordinates=this.createGeojsonPolylineCoordinates(t)),t.polygon&&t.polygon.hierarchy&&(e.geometry.type="Polygon",e.geometry.coordinates=this.createGeojsonPolygonCoordinates(t)),e}createGeojsonFeatureFromPoi(t){return{type:"Feature",geometry:{type:"Point",coordinates:[Cesium.Math.toDegrees(t.position.longitude),Cesium.Math.toDegrees(t.position.latitude)]},properties:{}}}createGeojsonFeatureCollectionFromPois(t){let e={type:"FeatureCollection",features:[]},n=t.map(r=>this.createGeojsonFeatureFromPoi(r));return e.features=n,e}createGeojsonPointCoordinates(t){if(!t.position)return null;let e=t.position.getValue(Cesium.JulianDate.now());return e?Cesium.Cartographic.fromCartesian(e):null}createGeojsonPolylineCoordinates(t){if(!t.polyline||!t.polyline.positions)return[];let e=t.polyline.positions.getValue(Cesium.JulianDate.now()),n=[];return e&&e.forEach(r=>{let s,o=Cesium.Cartographic.fromCartesian(r);s=[Cesium.Math.toDegrees(o.longitude),Cesium.Math.toDegrees(o.latitude)],n.push(s)}),n}createGeojsonPolygonCoordinates(t){if(!t.polygon||!t.polygon.hierarchy)return[];let e=t.polygon.hierarchy.getValue(Cesium.JulianDate.now()),n=[];if(e){let r=[];e.positions.forEach(s=>{let o,l=Cesium.Cartographic.fromCartesian(s);o=[Cesium.Math.toDegrees(l.longitude),Cesium.Math.toDegrees(l.latitude)],r.push(o)}),n.push(r),e.holes.forEach(s=>{let o=[];s.positions.forEach(l=>{let p,u=Cesium.Cartographic.fromCartesian(l);p=[Cesium.Math.toDegrees(u.longitude),Cesium.Math.toDegrees(u.latitude)],o.push(p)}),n.push(o)})}return n}createFeatureAdditionalProperties(t,e){return t.features=t.features.map((n,r)=>{switch(n.properties.name=e.name+" "+r,n.properties.layerName=e.layer,n.geometry.type){case W.Point:n.properties.uuid=e.layer+n.geometry.coordinates[1]+n.geometry.coordinates[0];break;case W.MultiPoint:n.properties.uuid=e.layer+n.geometry.coordinates[0][1]+n.geometry.coordinates[0][0];break;case(W.LineString||W.Polygon||W.MultiPoint):n.properties.uuid=e.layer+n.geometry.coordinates[0][1]+n.geometry.coordinates[0][0];break;default:n.properties.uuid=e.layer+n.geometry.coordinates[0][0][1]+n.geometry.coordinates[0][0][0];break}return n.properties.uuid=n.id,n}),t}substituteRelevantProperties(t,e){return t.features.forEach(n=>{const r={};for(const s in n.properties){const o=e.relevantProperties.find(l=>l.propertyName===s);if(o){const l={displayName:o.displayName,type:o.type,value:n.properties[s]};r[s]=l}}n.properties=r}),t}styleFeature(t,e){t.entities.values.forEach(n=>{if(n.billboard)switch(t.name){case"custom-path":this.styleCustomPath(n);break;case"selected-feature":this.styleSelectedFeature(n);break;default:this.stylePointFeature(n,e);break}n.polyline&&this.stylePolylineFeature(n,e),n.polygon&&this.stylePolygonFeature(n,e)})}stylePointFeature(t,e){return t.billboard=void 0,t.point=new Cesium.PointGraphics({pixelSize:8,color:Cesium.Color.fromCssColorString(e.color).withAlpha(e.opacity),outlineColor:Cesium.Color.fromCssColorString(e.color),outlineWidth:1}),t}styleCustomPath(t){return t.billboard=void 0,t.point=new Cesium.PointGraphics({pixelSize:12,color:Cesium.Color.TRANSPARENT,outlineColor:Cesium.Color.BLUE,outlineWidth:2}),t}styleSelectedFeature(t){return t.billboard=void 0,t.point=new Cesium.PointGraphics({pixelSize:16,color:Cesium.Color.TRANSPARENT,outlineColor:Cesium.Color.GREEN,outlineWidth:2}),t}stylePolylineFeature(t,e){return t.polyline&&(t.polyline.material=new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(e.color)),t.polyline.width=new Cesium.ConstantProperty(2)),t}stylePolygonFeature(t,e){return t.polygon&&(t.polygon.material=new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(e.color).withAlpha(e.opacity)),t.polygon.outlineColor=new Cesium.ConstantProperty(Cesium.Color.fromCssColorString(e.color))),t}openGoogleMaps(t){const e=`https://www.google.it/maps/dir/?api=1&destination=${Cesium.Math.toDegrees(t.latitude)},${Cesium.Math.toDegrees(t.longitude)}`;window.open(e,"_blank")}};i(_,"_instance");let H=_;const D=class D{constructor(){i(this,"_selectedPoi",null);if(D._instance)return D._instance;D._instance=this}static get instance(){return D._instance||(D._instance=new D),D._instance}get selectedPoi(){return this._selectedPoi}set selectedPoi(t){this._selectedPoi=t,c.instance.publish("selected-poi",this.selectedPoi),this._selectedPoi!==null&&($.instance.currentTab=m.Info)}parsePoi(t){let e=K.createEmpty();if(!t.properties)return e;let n=t.properties;return t.properties.propertyNames.forEach(s=>{if(n.hasProperty(s))switch(s){case"uuid":e.uuid=n[s].valueOf();break;case"layer":const o=n[s].valueOf();e.layer=o,e.layerName=o.layer;break;case"layerName":const l=n[s].valueOf();e.layerName=l;const p=v.instance.filterLayersByLayerName(l);p&&(e.layer=p);break;case"name":e.name=n[s].valueOf();break;default:let u=n[s].valueOf();e.props.push(this.parsePoiProperty(u));break}}),e.position=this.parsePoiPosition(t),e.type=this.parsePoiType(t),e}parsePoiPosition(t){let e=Cesium.Cartographic.ZERO;if(t.point&&t.position){let n=t.position.getValue(Cesium.JulianDate.now());n&&(e=Cesium.Cartographic.fromCartesian(n))}if(t.polyline&&t.polyline.positions){let n=t.polyline.positions.getValue(Cesium.JulianDate.now())[0];n&&(e=Cesium.Cartographic.fromCartesian(n))}if(t.polygon&&t.polygon.hierarchy){let n=t.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions[0];n&&(e=Cesium.Cartographic.fromCartesian(n))}return e}parsePoiProperty(t){let e=Q.createEmpty();return t.displayName&&(e.displayName=t.displayName),t.type&&(e.type=t.type),t.value&&(e.value=t.value),e}parsePoiType(t){return t.polyline?z.Polyline:t.polygon?z.Polygon:z.Point}};i(D,"_instance");let k=D;const ke=`.map {\r
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
}`,Pe=`/* packages/widgets/Source/shared.css */
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
`;class ie extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"container",document.createElement("div"));i(this,"viewer");i(this,"imageryLayers",{});i(this,"_isOpen",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet,n=new CSSStyleSheet;e.replace(ke),n.replace(Pe),this.shadowRoot.adoptedStyleSheets=[n,e]}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("reduce"):this.classList.remove("reduce")}connectedCallback(){this.render(),this.addBaseLayers(J.instance.mapThemes),this.setup(),this.addSavedPath()}render(){this.container.classList.add("map"),this.shadowRoot.append(this.container),Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjY2YmYxNy1mNTM2LTRlOWYtYTUyZC01ZmY0NjBhNzllMWEiLCJpZCI6MTY5MDU3LCJpYXQiOjE2OTU4ODQ4NzB9.bN66rOR5h37xuKVsuUSYRSLOGJy-34IhH9S1hr4NOOE",this.viewer=new Cesium.Viewer(this.container,{baseLayerPicker:!1,geocoder:!1,timeline:!1,animation:!1,homeButton:!1,navigationInstructionsInitiallyVisible:!1,navigationHelpButton:!1,sceneModePicker:!1,fullscreenButton:!1,infoBox:!1,sceneMode:Cesium.SceneMode.SCENE2D,mapMode2D:Cesium.MapMode2D.ROTATE,mapProjection:new Cesium.WebMercatorProjection})}setup(){this.viewer.screenSpaceEventHandler.setInputAction(e=>{this.mouseOver(e)},Cesium.ScreenSpaceEventType.MOUSE_MOVE),this.viewer.screenSpaceEventHandler.setInputAction(e=>{this.clickOnMap(e)},Cesium.ScreenSpaceEventType.LEFT_CLICK),x.instance.position?(this.setCameraToPosition(x.instance.position),this.checkUserPin(x.instance.position)):this.setCameraToPosition(null),c.instance.subscribe("toggle-tabs",e=>this.isOpen=e),c.instance.subscribe("change-theme",e=>this.changeTheme(e.isPhysicalMap,e.theme)),c.instance.subscribe("change-map-mode",()=>this.changeMapMode()),c.instance.subscribe("toggle-physical-map",e=>this.togglePhysicalMap(e.isPhysicalMap,e.currentTheme)),c.instance.subscribe("set-camera",e=>this.setCameraToPosition(e)),c.instance.subscribe("check-user-position",e=>this.checkUserPin(e)),c.instance.subscribe("add-layer",e=>this.addLayer(e)),c.instance.subscribe("unbench-layer",e=>this.unbenchLayer(e)),c.instance.subscribe("remove-layer-from-bench",e=>this.removeLayerFromBench(e)),c.instance.subscribe("bench-layer",e=>this.benchLayer(e)),c.instance.subscribe("bench-all-layers",()=>this.benchAllLayers()),c.instance.subscribe("load-custom-path",e=>{let n=H.instance.createGeojsonFeatureCollectionFromPois(e.pois);this.loadCustomDataSource(n,"custom-path")}),c.instance.subscribe("selected-poi",e=>{if(!e||e.type!==z.Point)return;let n=H.instance.createGeojsonFeatureCollectionFromPois([e]);this.setCameraToPosition(e.position),this.loadCustomDataSource(n,"selected-feature")})}disconnectedCallback(){c.instance.unsubscribeAll("toggle-tabs"),c.instance.unsubscribeAll("change-theme"),c.instance.unsubscribeAll("change-map-mode"),c.instance.unsubscribeAll("toggle-physical-map"),c.instance.unsubscribeAll("set-camera"),c.instance.unsubscribeAll("check-user-position"),c.instance.unsubscribeAll("add-layer"),c.instance.unsubscribeAll("unbench-layer"),c.instance.unsubscribeAll("remove-layer-from-bench"),c.instance.unsubscribeAll("bench-layer"),c.instance.unsubscribeAll("bench-all-layers"),c.instance.unsubscribeAll("load-custom-path"),c.instance.unsubscribeAll("selected-poi")}mouseOver(e){const n=e.endPosition;this.viewer.scene.pick(n)?document.body.style.cursor="pointer":document.body.style.cursor="default"}clickOnMap(e){c.instance.publish("empty-searchbar",null);const n=e.position,r=this.viewer.scene.pick(n);if(!r||!r.id){Y.instance.isOpen=!1,ee.instance.isOpen=!1,k.instance.selectedPoi=null,this.removeCustomDataSource("selected-feature");return}if(!(r.id instanceof Cesium.Entity)){k.instance.selectedPoi=null,this.removeCustomDataSource("selected-feature");return}const s=r.id;if(s.id==="user-pin"){k.instance.selectedPoi=null,this.removeCustomDataSource("selected-feature");return}if(s.name&&(s.name.includes("selected-feature")||s.name.includes("custom-path"))){k.instance.selectedPoi=null,this.removeCustomDataSource("selected-feature");return}ee.instance.isOpen=!1,Y.instance.isOpen=!0;const o=H.instance.createGeoJsonFromEntity(s);this.loadCustomDataSource(o,"selected-feature");const l=k.instance.parsePoi(s);k.instance.selectedPoi=l,this.setCameraToPosition(l.position)}addBaseLayers(e){e.forEach(n=>{const r=new Cesium.ImageryLayer(J.instance.createImageryProvider(n));this.viewer.imageryLayers.add(r),this.imageryLayers[n.layer]=r})}addSavedPath(){d.instance.activeLayers.forEach(n=>this.addLayerToMap(n));const e=H.instance.createGeojsonFeatureCollectionFromPois(d.instance.selectedCustomPath.pois);this.loadCustomDataSource(e,"custom-path")}changeTheme(e,n){if(e)return;const r=this.viewer.imageryLayers.indexOf(this.imageryLayers[n.layer]);let s=this.viewer.imageryLayers.get(r);this.viewer.imageryLayers.raiseToTop(s)}togglePhysicalMap(e,n){if(e)for(const r in this.imageryLayers){const s=this.viewer.imageryLayers.indexOf(this.imageryLayers[r]),o=this.viewer.imageryLayers.get(s);this.viewer.imageryLayers.lowerToBottom(o)}else this.changeTheme(e,n)}changeMapMode(){this.viewer.scene.mode===Cesium.SceneMode.SCENE3D?this.viewer.scene.morphTo2D(1):this.viewer.scene.morphTo3D(1)}setCameraToPosition(e){let n=this.viewer.camera.positionCartographic;n.height>2e6?n.height=2e3:n.height;let r=Cesium.Cartesian3.fromDegrees(8.934080815653985,44.40753207658791,2e3);e&&e instanceof GeolocationPosition&&(r=Cesium.Cartesian3.fromDegrees(e.coords.longitude,e.coords.latitude,n.height)),e&&e instanceof Cesium.Cartographic&&(r=Cesium.Cartesian3.fromRadians(e.longitude,e.latitude,n.height)),this.viewer.camera.flyTo({destination:r,orientation:{heading:Cesium.Math.toRadians(0),pitch:Cesium.Math.toRadians(-90),roll:0},duration:.5})}checkUserPin(e){const n=this.viewer.entities.getById("user-pin");n?this.updateUserPin(n,e):this.createUserPin(e)}createUserPin(e){this.viewer.entities.add({name:"user-pin",id:"user-pin",position:Cesium.Cartesian3.fromDegrees(e.coords.longitude,e.coords.latitude,0),point:{pixelSize:8,color:Cesium.Color.BLUE.withAlpha(.5),outlineColor:Cesium.Color.BLUE,outlineWidth:1}})}updateUserPin(e,n){const r=()=>Cesium.Cartesian3.fromDegrees(n.coords.longitude,n.coords.latitude,0);e.position=new Cesium.ConstantPositionProperty(r())}async loadCustomDataSource(e,n){let r=await Cesium.GeoJsonDataSource.load(e);this.viewer.dataSources.getByName(n).forEach(o=>this.viewer.dataSources.remove(o)),r.name=n,H.instance.styleFeature(r,Z.createEmpty()),await this.viewer.dataSources.add(r),r.entities.values.forEach((o,l)=>o.name=`${n}-${l}`),this.viewer.dataSources.lowerToBottom(r)}removeCustomDataSource(e){this.viewer.dataSources.getByName(e).forEach(r=>this.viewer.dataSources.remove(r))}async addLayerToMap(e){try{const n=H.instance.createGeoJson(e),r=await Cesium.GeoJsonDataSource.load(n);r.name=e.layer,this.viewer.dataSources.add(r),H.instance.styleFeature(r,e.style)}catch(n){throw n}}isLayerOnMap(e){return this.viewer.dataSources.getByName(e.layer).length>0}addLayerToActiveLayers(e){const n=d.instance.activeLayers;n.unshift(e),d.instance.activeLayers=[...n];let r=d.instance.benchLayers;r.some(o=>o.layer===e.layer)&&(r=r.filter(o=>o.layer!==e.layer),d.instance.benchLayers=r)}removeLayerFromMap(e){this.viewer.dataSources.getByName(e.layer).forEach(r=>this.viewer.dataSources.remove(r))}removeLayerFromActiveLayers(e){let n=d.instance.activeLayers;n=n.filter(r=>r.layer!==e.layer),d.instance.activeLayers=[...n]}removeLayer(e){let n=d.instance.activeLayers;this.viewer.dataSources.getByName(e.layer).forEach(s=>this.viewer.dataSources.remove(s)),n=n.filter(s=>s.layer!==e.layer),d.instance.activeLayers=[...n]}addLayerToBench(e){let n=d.instance.benchLayers;n.unshift(e),d.instance.benchLayers=[...n]}removeLayerFromBench(e){let n=d.instance.benchLayers;n=n.filter(r=>r.layer!==e.layer),d.instance.benchLayers=n}async addLayer(e){if(this.isLayerOnMap(e))b.instance.createSnackbar(g.Temporary,"","Layer già presente",3);else try{b.instance.createSnackbar(g.Loader,e.layer,"Caricamento..."),await this.addLayerToMap(e),this.addLayerToActiveLayers(e),b.instance.removeSnackbar(e.layer)}catch{b.instance.removeSnackbar(e.layer),b.instance.createSnackbar(g.Error,"","Errore nel caricamento del layer")}}benchLayer(e){this.removeLayerFromMap(e),this.removeLayerFromActiveLayers(e),this.addLayerToBench(e)}benchAllLayers(){d.instance.activeLayers.forEach(e=>{this.removeLayerFromMap(e),this.removeLayerFromActiveLayers(e),this.addLayerToBench(e)})}async unbenchLayer(e){try{b.instance.createSnackbar(g.Loader,e.layer,"Caricamento..."),await this.addLayerToMap(e),this.removeLayerFromBench(e),this.addLayerToActiveLayers(e),b.instance.removeSnackbar(e.layer)}catch{b.instance.removeSnackbar(e.layer),b.instance.createSnackbar(g.Error,"","Errore nel caricamento del layer")}}}customElements.define("app-map",ie);const Se=`.page {\r
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
    }\r
\r
    .search {\r
        width: 100%;\r
    }\r
\r
    app-search-result {\r
        top: 120px;\r
    }\r
\r
    app-bench {\r
        top: inherit;\r
        right: inherit;\r
        bottom: 24px;\r
        left: -360px;\r
    }\r
\r
    app-tabs-sidenav {\r
        top: inherit;\r
        right: inherit;\r
        bottom: 0;\r
        left: 0;\r
    }\r
}`;class Ce extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"map",new ie);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Se),this.shadowRoot.adoptedStyleSheets.push(e)}async connectedCallback(){const e=document.createElement("app-splash");document.body.append(e),await v.instance.getData(),await J.instance.getMapThemes(),await x.instance.getUserPosition(),d.instance.paths.some(r=>r.name==="default")||d.instance.saveNewPath("default");const n=d.instance.paths.find(r=>r.lastSelected===!0);n&&(d.instance.selectedCustomPath={...n}),this.render(),this.setup(),setTimeout(()=>e.remove(),500)}render(){this.shadowRoot.innerHTML=`
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
            `,this.map=this.shadowRoot.querySelector("app-map")}setup(){const e=this.shadowRoot.querySelector(".tags-page-link");e&&e.addEventListener("click",()=>window.location.hash="/")}}customElements.define("page-map",Ce);class Le extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>c.instance.publish("change-map-mode",null)),c.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}disconnectedCallback(){c.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-map-mode-btn",Le,{extends:"button"});class Ee extends HTMLButtonElement{constructor(){super()}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>J.instance.toggleTheme())}}customElements.define("app-map-theme-btn",Ee,{extends:"button"});class Te extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.setup()}setup(){this.addEventListener("click",async()=>{await x.instance.getUserPosition(),x.instance.position?(c.instance.publish("set-camera",x.instance.position),c.instance.publish("check-user-position",x.instance.position)):c.instance.publish("set-camera",null)}),c.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}disconnectedCallback(){c.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-center-position-btn",Te,{extends:"button"});class Me extends HTMLInputElement{constructor(){super();i(this,"_inputValue","")}get inputValue(){return this._inputValue}set inputValue(e){this._inputValue=e,this.update()}connectedCallback(){this.setup()}setup(){this.addEventListener("input",()=>this.inputValue=this.value),c.instance.subscribe("empty-searchbar",()=>this.value=this.inputValue="")}update(){let e={layers:[],searchValue:""};this.inputValue===""||(e={layers:v.instance.filterLayersByNameAndTag(v.instance.data,this.value),searchValue:this.inputValue}),c.instance.publish("search-layer",e)}disconnectedCallback(){c.instance.unsubscribeAll("empty-searchbar")}}customElements.define("app-searchbar",Me,{extends:"input"});class h{constructor(t,e){i(this,"rgb");i(this,"hex");i(this,"hsl");t==="rgb"?(this.rgb=h.isValidRgb(e)?e:"rgb(31, 111, 235)",this.hex=h.rgbToHex(this.rgb),this.hsl=h.rgbToHsl(this.rgb)):t==="hex"?(this.hex=h.isValidHex(e)?e:"#1f6feb",this.rgb=h.hexToRgb(this.hex),this.hsl=h.rgbToHsl(this.rgb)):(this.rgb="rgb(31, 111, 235)",this.hex="#1f6feb",this.hsl=[216,84,52])}static createEmpty(){return new h("rgb","rgb(31, 111, 235)")}static isValidRgb(t){return/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(t)}static isValidHex(t){return/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(t)}static rgbToHex(t){const e=t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);if(!e)throw new Error("Invalid RGB format");const[,n,r,s]=e.map(Number);return`#${((1<<24)+(n<<16)+(r<<8)+s).toString(16).slice(1)}`}static hexToRgb(t){t=t.replace(/^#/,"");const e=parseInt(t,16),n=e>>16&255,r=e>>8&255,s=e&255;return`rgb(${n}, ${r}, ${s})`}static rgbToRgba(t,e){return t.replace("rgb","rgba").slice(0,-1)+`, ${e})`}static rgbToHsl(t){const e=t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);if(!e)throw new Error("Invalid RGB format");const[n,r,s]=e.slice(1).map(Number),o=n/255,l=r/255,p=s/255,u=Math.max(o,l,p),f=Math.min(o,l,p);let F=0,y=0;const S=(u+f)/2;if(u!==f){switch(y=S>.5?(u-f)/(2-u-f):(u-f)/(u+f),u){case o:F=(l-p)/(u-f)+(l<p?6:0);break;case l:F=(p-o)/(u-f)+2;break;case p:F=(o-l)/(u-f)+4;break}F/=6}return[Math.round(F*360),Math.round(y*100),Math.round(S*100)]}static hslToRgb(t){const[e,n,r]=t,s=e/360,o=n/100,l=r/100,p=(y,S,j)=>(j<0&&(j+=1),j>1&&(j-=1),j<1/6?y+(S-y)*6*j:j<1/2?S:j<2/3?y+(S-y)*(2/3-j)*6:y);let u,f,F;if(n===0)u=f=F=l;else{const y=l<.5?l*(1+o):l+o-l*o,S=2*l-y;u=p(S,y,s+1/3),f=p(S,y,s),F=p(S,y,s-1/3)}return`rgb(${Math.round(u*255)}, ${Math.round(f*255)}, ${Math.round(F*255)})`}}class oe extends HTMLButtonElement{constructor(){super();i(this,"_layer",P.createEmpty());i(this,"legend",document.createElement("span"))}get layer(){return this._layer}set layer(e){this._layer=e}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <div class="info">
                <span class="legend"></span>
                <label>${this.layer.name}</label>
            </div>
            <span class="icon add-icon">
                <span class="material-symbols-outlined">add</span>
            </span>
            `,this.legend=this.querySelector(".legend"),this.legend.style.backgroundColor=h.rgbToRgba(h.hexToRgb(this._layer.style.color),.5),this.legend.style.borderColor=this._layer.style.color}setup(){this.addEventListener("click",()=>{c.instance.publish("add-layer",this.layer)})}}customElements.define("app-search-result-chip",oe,{extends:"button"});const Re=`:host {\r
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
    padding: 24px 16px;\r
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
`,Ie=`button[is="app-search-result-chip"] {\r
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
}`;class Ae extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"container",document.createElement("div"));i(this,"_layers",[]);i(this,"_isVisible",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Re);let n=new CSSStyleSheet;n.replaceSync(Ie),this.shadowRoot.adoptedStyleSheets=[e,n]}get layers(){return this._layers}set layers(e){this._layers=e,this.update()}get isVisible(){return this._isVisible}set isVisible(e){this._isVisible=e,this._isVisible===!0?this.classList.add("visible"):this.classList.remove("visible")}connectedCallback(){this.render(),this.setup()}render(){this.container.classList.add("container"),this.shadowRoot.append(this.container)}setup(){c.instance.subscribe("search-layer",e=>{if(this.container.innerHTML="",e.searchValue===""){this.isVisible=!1;return}this.isVisible=!0,this.layers=e.layers})}update(){if(this._layers.length===0){let e=document.createElement("p");e.innerHTML="Nessun livello trovato",this.container.append(e);return}this._layers.forEach(e=>{let n=new oe;n.layer=e,n.setAttribute("is","app-search-result-chip"),this.container.append(n)})}disconnectedCallback(){c.instance.unsubscribeAll("search-layer")}}customElements.define("app-search-result",Ae);class Be extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1);i(this,"icon");this.icon=this.querySelector(".material-symbols-outlined")}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.update()}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{Y.instance.isOpen=!this.isOpen}),c.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}update(){this.isOpen?this.icon.innerHTML="close":this.icon.innerHTML="menu"}disconnectedCallback(){c.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-tabs-toggle",Be,{extends:"button"});const _e=`:host {\r
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
}`;class De extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_isVisible",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(_e),this.shadowRoot.adoptedStyleSheets.push(e)}get isVisible(){return this._isVisible}set isVisible(e){this._isVisible=e,this.update()}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="toggle">
                <div class="close"></div>
            </div>
            <app-tabs></app-tabs>
            `}setup(){c.instance.subscribe("toggle-tabs",n=>{this.isVisible=n});const e=this.shadowRoot.querySelector(".toggle");e&&e.addEventListener("click",()=>Y.instance.isOpen=!1)}update(){this.isVisible===!0?this.classList.add("visible"):this.classList.remove("visible")}disconnectedCallback(){c.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-tabs-sidenav",De);class ae extends HTMLButtonElement{constructor(){super();i(this,"_layer",P.createEmpty());i(this,"legend",document.createElement("span"));i(this,"removeIcon",document.createElement("span"))}get layer(){return this._layer}set layer(e){this._layer=e}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <div class="info">
                <span class="legend"></span>
                <label>${this.layer.name}</label>
            </div>
            <span class="divider"></span>
            <span class="icon add-icon">
                <span class="material-symbols-outlined">close</span>
            </span>
            `,this.legend=this.querySelector(".legend"),this.legend.style.backgroundColor=h.rgbToRgba(h.hexToRgb(this._layer.style.color),.5),this.legend.style.borderColor=this._layer.style.color,this.removeIcon=this.querySelector(".icon")}setup(){this.removeIcon.addEventListener("click",()=>{c.instance.publish("bench-layer",this.layer),c.instance.publish("open-bench",!0)})}}customElements.define("app-carousel-chip",ae,{extends:"button"});const Oe=`:host {\r
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
}`,He=`button[is="app-carousel-chip"] {\r
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
}`;class Ne extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_layers",[]);i(this,"startX",0);i(this,"dragScoll",0);i(this,"isDragging",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Oe);let n=new CSSStyleSheet;n.replaceSync(He),this.shadowRoot.adoptedStyleSheets=[e,n]}get layers(){return this._layers}set layers(e){this._layers=e,this.update()}connectedCallback(){this.render(),this.setup()}render(){this.layers=d.instance.activeLayers}setup(){c.instance.subscribe("active-layers-updated",e=>{this.layers=[...e]}),this.addEventListener("mousedown",e=>this.startDrag(e)),this.addEventListener("mousemove",e=>this.drag(e)),this.addEventListener("mouseleave",()=>this.endDrag()),this.addEventListener("mouseup",()=>this.endDrag())}update(){this.shadowRoot.innerHTML="",this.layers.forEach(e=>{let n=new ae;n.layer=e,n.setAttribute("is","app-carousel-chip"),this.shadowRoot.append(n)})}disconnectedCallback(){c.instance.unsubscribeAll("active-layers-updated")}startDrag(e){this.isDragging=!0,this.startX=e.pageX,this.dragScoll=this.scrollLeft}endDrag(){this.isDragging=!1}drag(e){if(!this.isDragging)return;e.preventDefault();const n=e.pageX-this.startX;this.scrollLeft=this.dragScoll-n}}customElements.define("app-carousel",Ne);class ce extends HTMLButtonElement{constructor(){super();i(this,"_layer",P.createEmpty());i(this,"info",document.createElement("div"));i(this,"legend",document.createElement("span"));i(this,"removeIcon",document.createElement("span"))}get layer(){return this._layer}set layer(e){this._layer=e}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <div class="info">
                <span class="legend"></span>
                <label>${this.layer.name}</label>
            </div>
            <span class="divider"></span>
            <span class="icon add-icon">
                <span class="material-symbols-outlined">delete</span>
            </span>
            `,this.info=this.querySelector(".info"),this.legend=this.querySelector(".legend"),this.legend.style.backgroundColor=h.rgbToRgba(h.hexToRgb(this._layer.style.color),.5),this.legend.style.borderColor=this._layer.style.color,this.removeIcon=this.querySelector(".icon")}setup(){this.addEventListener("click",()=>{c.instance.publish("unbench-layer",this.layer)}),this.removeIcon.addEventListener("click",e=>{e.stopPropagation(),c.instance.publish("remove-layer-from-bench",this.layer)})}}customElements.define("app-bench-chip",ce,{extends:"button"});const ze=`:host {\r
    width: 360px;\r
    height: fit-content;\r
    transform: translateY(-50%);\r
    background-color: transparent;\r
    animation: slideOut .3s ease-in-out forwards;\r
    display: flex;\r
    flex-direction: column;\r
    gap: 8px;\r
    padding: 0 24px;\r
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
        transform: translateY(0);\r
        max-height: calc(100% - 144px);\r
    }\r
\r
    @keyframes slideIn {\r
        from {\r
            left: -360px;\r
        }\r
\r
        to {\r
            left: 0;\r
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
}`,Fe=`button[is="app-bench-chip"] {\r
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
}`;class je extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_isVisible",!1);i(this,"_layers",[]);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(ze);let n=new CSSStyleSheet;n.replaceSync(Fe),this.shadowRoot.adoptedStyleSheets=[e,n]}get isVisible(){return this._isVisible}set isVisible(e){this._isVisible=e,this.toggleBench()}get layers(){return this._layers}set layers(e){this._layers=e,this.update()}connectedCallback(){this.render(),this.setup()}render(){this.layers=d.instance.benchLayers}setup(){c.instance.subscribe("bench-layers-updated",e=>{this.layers=[...e]}),c.instance.subscribe("toggle-bench",e=>{this.isVisible=e})}update(){this.shadowRoot.innerHTML="",this.layers.forEach(e=>{let n=new ce;n.layer=e,n.setAttribute("is","app-bench-chip"),this.shadowRoot.append(n)})}disconnectedCallback(){c.instance.unsubscribeAll("bench-layers-updated"),c.instance.unsubscribeAll("toggle-bench")}toggleBench(){this.isVisible===!0?this.classList.add("visible"):this.classList.remove("visible")}}customElements.define("app-bench",je);class Ve extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{ee.instance.isOpen=!this.isOpen}),c.instance.subscribe("toggle-bench",e=>{this.isOpen=e})}disconnectedCallback(){c.instance.unsubscribeAll("toggle-bench")}}customElements.define("app-bench-toggle",Ve,{extends:"button"});const qe=`:host {\r
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
}`;class $e extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_currentTab",m.Info);i(this,"infoTab",null);i(this,"suggestedRouteTab",null);i(this,"customRouteTab",null);i(this,"panel",null);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(qe),this.shadowRoot.adoptedStyleSheets.push(e)}get currentTab(){return this._currentTab}set currentTab(e){this._currentTab=e,this.switchPanel(),this.switchTab()}connectedCallback(){this.render(),this.setup(),this.currentTab=m.Info}render(){this.shadowRoot.innerHTML=`
            <nav class="header">
                <button class="tab info-tab">Informazioni<span class="border"></span></button>
                <button class="tab suggested-route-tab">Percorsi suggeriti<span class="border"></span></button>
                <button class="tab custom-route-tab">Percorsi custom<span class="border"></span></button>
            </nav>
            <div class="panel"></div>
            `,this.infoTab=this.shadowRoot.querySelector(".info-tab"),this.suggestedRouteTab=this.shadowRoot.querySelector(".suggested-route-tab"),this.customRouteTab=this.shadowRoot.querySelector(".custom-route-tab"),this.panel=this.shadowRoot.querySelector(".panel")}setup(){this.infoTab&&this.infoTab.addEventListener("click",()=>this.currentTab=m.Info),this.suggestedRouteTab&&this.suggestedRouteTab.addEventListener("click",()=>{$.instance.isSuggestedPathSelected?this.currentTab=m.SelectedSuggestedPath:this.currentTab=m.SuggestedPath}),this.customRouteTab&&this.customRouteTab.addEventListener("click",()=>this.currentTab=m.CustomPath),c.instance.subscribe("current-tab-updated",e=>this.currentTab=e)}disconnectedCallback(){c.instance.unsubscribeAll("current-tab-updated")}renderInfoPanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<app-info-panel />")}renderSuggestedRoutePanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<app-suggested-path-panel />")}renderSelectedSuggestedRoutePanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<app-selected-suggested-path-panel />")}renderCustomPathPanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<app-custom-path-panel />")}switchPanel(){switch(this.currentTab){case m.CustomPath:this.renderCustomPathPanel();break;case m.SuggestedPath:this.renderSuggestedRoutePanel();break;case m.SelectedSuggestedPath:this.renderSelectedSuggestedRoutePanel();break;default:this.renderInfoPanel();break}}switchTab(){if(this.removeSelectedStatus(),!(!this.customRouteTab||!this.suggestedRouteTab||!this.infoTab))switch(this.currentTab){case m.CustomPath:this.customRouteTab.classList.add("selected");break;case m.SuggestedPath:this.suggestedRouteTab.classList.add("selected");break;case m.SelectedSuggestedPath:this.suggestedRouteTab.classList.add("selected");break;default:this.infoTab.classList.add("selected");break}}removeSelectedStatus(){Array.from(this.shadowRoot.querySelectorAll(".tab")).forEach(n=>n.classList.remove("selected"))}}customElements.define("app-tabs",$e);const Ge=`:host {\r
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
}`;class Ue extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_poi",k.instance.selectedPoi);i(this,"_isInfoOpen",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Ge),this.shadowRoot.adoptedStyleSheets.push(e)}get poi(){return this._poi}set poi(e){this._poi=e,this.isInfoOpen=!1,this.update()}get isInfoOpen(){return this._isInfoOpen}set isInfoOpen(e){this._isInfoOpen=e,this.toggleInfo()}connectedCallback(){this.render(),this.setup(),this.poi&&this.update()}disconnectedCallback(){c.instance.unsubscribe("selected-poi",this.handleSelectedPoi.bind(this))}handleSelectedPoi(e){this.poi=e}render(){this.shadowRoot.innerHTML='<p class="empty-msg">Nessun punto selezionato</p>'}setup(){this.handleSelectedPoi=this.handleSelectedPoi.bind(this),c.instance.subscribe("selected-poi",this.handleSelectedPoi)}update(){if(!this.poi){this.render();return}this.shadowRoot.innerHTML=`
            <div class="header">
                <div class="title">
                    <span class="legend"></span>
                    <h4 class="name">${this.poi.name}</h4>
                </div>
                <p class="category"></p>
            </div>
            <div class="tools"></div>
            `;const e=this.shadowRoot.querySelector(".legend"),n=this.shadowRoot.querySelector(".category"),r=this.shadowRoot.querySelector(".tools");e.style.backgroundColor=h.rgbToRgba(h.hexToRgb(this._poi.layer.style.color),.5),e.style.borderColor=this._poi.layer.style.color,this.poi.props.forEach(p=>{p.displayName==="Nome"?n.innerHTML=p.value:n.innerHTML=this.poi.name});const s=this.renderDirectionsBtn();s&&r.appendChild(s);const o=this.renderAddToRouteBtn();o&&r.append(o);const l=this.renderInfo();l&&this.shadowRoot.appendChild(l)}renderDirectionsBtn(){if(!this.poi)return null;const e=document.createElement("button");return e.classList.add("directions-btn"),e.innerHTML="Indicazioni",e.addEventListener("click",()=>H.instance.openGoogleMaps(this.poi.position)),e}renderAddToRouteBtn(){if(!this.poi||this.poi.type!==z.Point)return null;const e=document.createElement("button");return e.classList.add("add-to-path-btn"),e.innerHTML="Aggiungi",e.addEventListener("click",()=>{this.poi&&d.instance.addPoiToSelectedPath(this.poi)}),e}renderInfo(){if(!this.poi)return null;const e=this.poi.props.filter(s=>s.displayName!=="Nome");if(e.length===0)return null;let n=document.createElement("div");n.classList.add("info");const r=document.createElement("div");return r.classList.add("info-content"),n.appendChild(r),e.forEach(s=>{const o=this.renderTopic(s);r.appendChild(o)}),n}toggleInfo(){const e=this.shadowRoot.querySelector(".info-content"),n=this.shadowRoot.querySelector(".toggle-info");e&&n&&(this.isInfoOpen?e.classList.add("visible"):e.classList.remove("visible"),this.isInfoOpen?n.innerHTML="Mostra meno":n.innerHTML="Leggi info")}renderTopic(e){const n=document.createElement("div");n.classList.add("property");const r=document.createElement("label");r.classList.add("property-label"),r.innerHTML=e.displayName;const s=document.createElement("p");return s.classList.add("property-value"),e.value!==""?s.innerHTML=e.value:s.innerHTML="-",n.appendChild(r),n.appendChild(s),n}}customElements.define("app-info-panel",Ue);var N=(a=>(a.SortPois="sort-pois",a.EditPath="edit-path",a.AddPath="add-path",a.BookmarkPath="bookmark-path",a.LoadPath="load-path",a))(N||{});const V=class V{constructor(){V._instance||(V._instance=this)}static get instance(){return V._instance||(V._instance=new V),V._instance}calculateDistance(t,e){const n=t.longitude-e.longitude,r=t.latitude-e.latitude;return Math.sqrt(n*n+r*r)}nearestInsertion(t,e){const n=[...t];let r=0,s=this.calculateDistance(e,n[0].position);for(let l=1;l<n.length;l++){const p=this.calculateDistance(e,n[l].position);p<s&&(s=p,r=l)}const o=[n.splice(r,1)[0]];for(;n.length>0;){s=Number.MAX_VALUE;let l=0;for(let p=0;p<n.length;p++){const u=this.calculateDistance(o[o.length-1].position,n[p].position);u<s&&(s=u,l=p)}o.push(n.splice(l,1)[0])}return o.reverse()}};i(V,"_instance");let te=V;const Je=`.form {\r
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
}`;class le extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_type",null);i(this,"_paths",[...d.instance.paths]);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Je),this.shadowRoot.adoptedStyleSheets.push(e)}get type(){return this._type}set type(e){this._type=e}get paths(){return this._paths}set paths(e){this._paths=e}connectedCallback(){this.render(),this.update(),this.setup()}render(){}setup(){const e=this.shadowRoot.querySelector(".cancel-btn"),n=this.shadowRoot.querySelector(".form");e&&e.addEventListener("click",()=>this.dispatchEvent(new CustomEvent("close-dialog"))),n&&n.addEventListener("submit",r=>{r.preventDefault(),this.dispatchEvent(new CustomEvent("close-dialog"))})}update(){switch(this.type){case N.SortPois:this.renderSortPoisForm(),this.setupSortPoisForm();break;case N.AddPath:this.renderAddPathForm(),this.setupAddPathForm();break;case N.BookmarkPath:this.renderBookmarkPathForm(),this.setupBookmarkPathForm();break;case N.LoadPath:this.renderLoadPathForm(),this.setupLoadPathForm();break;default:this.renderEditPathForm(),this.setupEditPathForm();break}}renderSortPoisForm(){this.shadowRoot.innerHTML=`
            <form class="form">
                <h4 class="title">Riordina</h4>
                <p>Riordinare i punti di interesse del percorso <span class="featured">${d.instance.selectedCustomPath.name}</span>?</p>
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Riordina</button>
                 </div>
            </form>
            `}setupSortPoisForm(){const e=this.shadowRoot.querySelector(".form");e&&e.addEventListener("submit",()=>{const n=x.instance.position;if(!n)return;const r=x.geolocationToCartographic(n),s=te.instance.nearestInsertion(d.instance.selectedCustomPath.pois,r),o=d.instance.selectedCustomPath;o.pois=s,d.instance.selectedCustomPath=o})}renderEditPathForm(){this.shadowRoot.innerHTML=`
            <form class="form">
                <h4 class="title">Modifica percorso</h4>
                <input type="text" name="path-name" class="path-name-input" placeholder="Nome percorso">
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Salva</button>
                </div>
                <button type="button" class="delete-btn">Elimina percorso</button>
            </form>
            `}setupEditPathForm(){const e=this.shadowRoot.querySelector("input");if(!e)return;const n=this.shadowRoot.querySelector(".delete-btn");if(!n)return;const r=this.shadowRoot.querySelector(".submit-btn");if(!r)return;const s=this.shadowRoot.querySelector(".form");if(!s)return;e.value=d.instance.selectedCustomPath.name;const o=()=>r.disabled=e.value.trim().length===0||d.instance.paths.some(l=>l.name===e.value.toLowerCase());e.addEventListener("input",o),e.addEventListener("change",o),s.addEventListener("submit",()=>{const p=new FormData(s).get("path-name");p&&d.instance.editPath(p.toString())}),n.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("close-dialog")),d.instance.deletePath()})}renderAddPathForm(){this.shadowRoot.innerHTML=`
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
            `}setupAddPathForm(){const e=this.shadowRoot.querySelector("input");if(!e)return;const n=this.shadowRoot.querySelector(".submit-btn");if(!n)return;const r=this.shadowRoot.querySelector(".form");if(!r)return;e.value.length===0&&(n.disabled=!0);const s=()=>{n.disabled=e.value.trim().length===0||d.instance.paths.some(o=>o.name===e.value.toLowerCase())};e.addEventListener("input",s),e.addEventListener("change",s),r.addEventListener("submit",()=>d.instance.saveNewPath(e.value))}renderBookmarkPathForm(){var e;this.shadowRoot.innerHTML=`
            <form class="form">
                <h4 class="title">Salva</h4>
                <p>Questa sovrascriverà i dati relativi al percorso <span class="featured">${(e=this.paths.find(n=>n.lastSelected===!0))==null?void 0:e.name}</span>. Procedere?</p>
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Salva</button>
                </div>
            </form>
            `}setupBookmarkPathForm(){const e=this.shadowRoot.querySelector(".form");e&&e.addEventListener("submit",()=>d.instance.savePath())}renderLoadPathForm(){this.shadowRoot.innerHTML=`
            <form class="form">
                <h4 class="title">Carica percorso</h4>
                <p>Percorsi salvati in memoria.</p>
                <div class="list"></div>
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Carica</button>
                </div>
            </form>
            `;const e=this.shadowRoot.querySelector(".list");e&&this.paths.forEach(n=>{const r=this.createRadioBtn(n);e.appendChild(r)})}setupLoadPathForm(){const e=this.shadowRoot.querySelector(".form");e&&e.addEventListener("submit",()=>{const r=new FormData(e).get("saved-paths");console.log("Selected path in local storage",r),r&&d.instance.loadPath(r.toString()),console.log(d.instance.selectedCustomPath)})}createRadioBtn(e){const n=document.createElement("div"),r=document.createElement("input"),s=document.createElement("label");return n.classList.add("selection"),r.type="radio",r.name="saved-paths",r.id=r.id=e.name.replace(" ","-").toLowerCase(),r.value=e.name,e.name===d.instance.selectedCustomPath.name&&(r.checked=!0),s.innerHTML=e.name,s.setAttribute("for",r.id=e.name.replace(" ","-").toLowerCase()),n.appendChild(r),n.appendChild(s),n}}customElements.define("app-custom-path-form",le);class de extends HTMLDialogElement{constructor(){super();i(this,"closeBtn",document.createElement("button"))}connectedCallback(){this.render(),this.setup(),this.showModal()}render(){this.closeBtn.innerHTML='<span class="material-symbols-outlined close-icon">close</span>',this.closeBtn.classList.add("close"),this.prepend(this.closeBtn)}setup(){const e=this.querySelector("button");e&&e.addEventListener("click",()=>this.close()),document.addEventListener("keydown",this.handleKeydown.bind(this));const n=this.querySelector("app-custom-path-form");n&&n.addEventListener("close-dialog",()=>this.close())}handleKeydown(e){e.key==="Escape"&&this.close()}close(){this.remove()}}customElements.define("app-dialog",de,{extends:"dialog"});const O=class O{constructor(){if(O._instance)return O._instance;O._instance=this}static get instance(){return O._instance||(O._instance=new O),O._instance}createDialog(){const t=new de;return t.setAttribute("is","app-dialog"),t}createFormDialog(t){const e=this.createDialog(),n=new le;n.type=t,e.appendChild(n),document.body.append(e)}};i(O,"_instance");let U=O;const We=`:host {\r
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
}`;class pe extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_poi",null);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(We),this.shadowRoot.adoptedStyleSheets.push(e)}get poi(){return this._poi}set poi(e){this._poi=e}connectedCallback(){this.render(),this.update(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}update(){if(!this.poi)return;const e=this.shadowRoot.querySelector(".order");e&&(e.innerHTML=(d.instance.selectedCustomPath.pois.indexOf(this.poi)+1).toString());const n=this.shadowRoot.querySelector(".name");n&&(n.innerHTML=this.poi.name);const r=this.shadowRoot.querySelector(".legend");r&&(r.style.backgroundColor=h.rgbToRgba(h.hexToRgb(this.poi.layer.style.color),.5),r.style.borderColor=this.poi.layer.style.color);const s=this.shadowRoot.querySelector(".category");s&&this.poi.props.forEach(o=>{o.displayName==="Nome"?s.innerHTML=o.value:s.innerHTML=this.poi.name})}setup(){this.poi&&(this.addEventListener("click",()=>k.instance.selectedPoi=this.poi),this.setupOrderBtns(),this.setupRemoveBtn())}setupOrderBtns(){const e=this.shadowRoot.querySelector(".move-up");e&&e.addEventListener("click",r=>{r.stopPropagation(),this.changeOrder("up")});const n=this.shadowRoot.querySelector(".move-down");n&&n.addEventListener("click",r=>{r.stopPropagation(),this.changeOrder("down")})}changeOrder(e){if(!this.poi)return;let n=d.instance.selectedCustomPath,r=[...n.pois],s=d.instance.selectedCustomPath.pois.indexOf(this.poi);r.splice(s,1),e==="up"?r.splice(s-1,0,this.poi):r.splice(s+1,0,this.poi),n.pois=r,d.instance.selectedCustomPath=n}setupRemoveBtn(){if(!this.poi)return;const e=this.shadowRoot.querySelector(".remove-btn");e&&e.addEventListener("click",n=>{n.stopPropagation();let r=d.instance.selectedCustomPath.pois.indexOf(this.poi),s=[...d.instance.selectedCustomPath.pois];s.splice(r,1),d.instance.selectedCustomPath={...d.instance.selectedCustomPath,pois:s}})}}customElements.define("app-custom-path-card",pe);const ue=`:host {\r
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
}`;class Xe extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_path",{...d.instance.selectedCustomPath});this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(ue),this.shadowRoot.adoptedStyleSheets.push(e)}get path(){return this._path}set path(e){this._path=e,c.instance.publish("load-custom-path",this.path)}connectedCallback(){this.render(),this.setup(),this.update()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){const e=this.shadowRoot.querySelector(".sort-btn"),n=this.shadowRoot.querySelector(".edit-btn"),r=this.shadowRoot.querySelector(".add-btn"),s=this.shadowRoot.querySelector(".bookmark-btn"),o=this.shadowRoot.querySelector(".load-btn"),l=this.shadowRoot.querySelector('button[is="app-custom-path-download-btn"]');e&&e.addEventListener("click",()=>U.instance.createFormDialog(N.SortPois)),n&&n.addEventListener("click",()=>U.instance.createFormDialog(N.EditPath)),r&&r.addEventListener("click",()=>U.instance.createFormDialog(N.AddPath)),s&&s.addEventListener("click",()=>U.instance.createFormDialog(N.BookmarkPath)),o&&o.addEventListener("click",()=>U.instance.createFormDialog(N.LoadPath)),l&&(l.path={...this.path}),c.instance.subscribe("selected-custom-path-updated",p=>{this.path=p})}update(){const e=this.shadowRoot.querySelector(".list");if(!e)return;e.innerHTML="",this.path.pois.forEach(r=>{let s=new pe;s.poi=r,e.appendChild(s)});const n=this.shadowRoot.querySelector(".edit-btn");n&&this.path.name==="default"&&(n.disabled=!0)}disconnectedCallback(){c.instance.unsubscribeAll("selected-custom-path-updated")}}customElements.define("app-custom-path-panel",Xe);class Ke extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>J.instance.togglePhysicalMap()),c.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}disconnectedCallback(){c.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-map-type-btn",Ke,{extends:"button"});const Ye=`:host {\r
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
    @keyframes slideIn {\r
        from {\r
            bottom: 24px;\r
        }\r
\r
        to {\r
            bottom: calc(24px + 360px);\r
        }\r
    }\r
\r
    @keyframes slideOut {\r
        from {\r
            bottom: calc(24px + 360px);\r
        }\r
\r
        to {\r
            bottom: 24px;\r
        }\r
    }\r
}`;class Ze extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_isOpen",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Ye),this.shadowRoot.adoptedStyleSheets.push(e)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){c.instance.subscribe("toggle-tabs",e=>this.isOpen=e)}disconnectedCallback(){c.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-map-controls",Ze);const Qe=`.header {\r
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
}`;class en extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_tags",[]);this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(Qe),this.shadowRoot.adoptedStyleSheets.push(e)}get tags(){return this._tags}set tags(e){this._tags=e}connectedCallback(){this.tags=v.instance.getAllTags(v.instance.data),this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`          
            <div class="header">
                <img src="./images/RAISE_pictogram_no_bg.svg" alt="Raise logo" class="logo">
                <h1>Ecco alcuni dati che potrebbero interessarti</h1>
            </div>
            <form>
                <div class="tags-wall"></div>
                <button type="submit" class="submit-btn">Continua</button>
            </form>

            `;const e=this.shadowRoot.querySelector(".tags-wall");e&&this.tags.forEach(n=>{let r=this.createChip(n);e.append(r)})}setup(){const e=this.shadowRoot.querySelector("form");e&&e.addEventListener("submit",n=>{n.preventDefault();const r=new FormData(e),s=Array.from(r.getAll("tag"),l=>String(l));d.instance.setTags(s);const o=v.instance.filterLayersByTags(v.instance.data,s);d.instance.activeLayers=o,d.instance.benchLayers=[],window.location.hash="/map"})}createChip(e){let n=document.createElement("div");n.classList.add("chip");let r=document.createElement("input");r.type="checkbox",r.id=e.replace(" ","").toLowerCase(),r.name="tag",r.value=e,d.instance.tags.forEach(o=>{o===e&&(r.checked=!0)});let s=document.createElement("label");return s.setAttribute("for",e.replace(" ","").toLowerCase()),s.innerHTML=e.charAt(0).toUpperCase()+e.slice(1),n.append(r),n.append(s),n}}customElements.define("app-tags-wall",en);const nn=`:host {\r
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
}`;class tn extends HTMLElement{constructor(){super();i(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(nn),this.shadowRoot.adoptedStyleSheets.push(e)}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
            <img src="./images/RAISE_pictogram_no_bg.svg" class="logo">
            <div class="loader"></div>
            `}}customElements.define("app-splash",tn);class rn extends HTMLButtonElement{constructor(){super();i(this,"_path",w.createEmpty())}get path(){return this._path}set path(e){this._path=e}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>this.downloadCsv())}createCsvContent(){let e=`path	layer name	id	name	latitude	longitude	height	info
`;return Object.keys(this.path).forEach(n=>{n==="pois"&&this.path.pois.forEach(r=>{const s=r.props.map(l=>`${l.displayName}: ${l.value}`).join("|"),o=`${this.path.name}	${r.layerName}	${r.uuid}	${r.name}	${Cesium.Math.toDegrees(r.position.latitude)}	${Cesium.Math.toDegrees(r.position.longitude)}	${Cesium.Math.toDegrees(r.position.height)}	${s}
`;e+=o})}),e.endsWith(`
`)&&(e=e.slice(0,-1)),e.trimEnd(),e}downloadCsv(){let e="data:text/csv;charset=utf-8,";e+=this.createCsvContent(),console.log(e);const n=encodeURI(e),r=document.createElement("a");r.setAttribute("href",n),r.setAttribute("download",`${this.path.name.replace(/[|&;$%@"<>()+,\s]/g,"").trim()}.csv`),document.body.appendChild(r),r.click(),r.remove()}}customElements.define("app-custom-path-download-btn",rn,{extends:"button"});const sn=`:host {
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
}`;class he extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_path",w.createEmpty());i(this,"_template",document.createElement("template"));this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(sn),this.shadowRoot.adoptedStyleSheets.push(e),this._template.id="app-suggested-path-card",this._template.innerHTML=`
            <h4 class="path-title"><slot name="path-name">Nome del percorso</slot></h4>
            <p class="path-steps"><slot name="pois-count">Numero di tappe</slot>&nbsp;tappe</p>
            `,this.shadowRoot.appendChild(this._template.content.cloneNode(!0))}get path(){return this._path}set path(e){this._path=e,this.update()}connectedCallback(){this.render(),this.setup()}render(){}setup(){this.addEventListener("click",()=>{$.instance.isSuggestedPathSelected=!0,d.instance.selectedSuggestedPath=this.path})}update(){this.path&&(this.innerHTML=`
            <h4 slot="path-name">${this.path.name}</h4>
            <p slot="pois-count">${this.path.pois.length}</p>
            `)}}customElements.define("app-suggested-path-card",he);const on=`:host {
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
}`;class an extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_paths",[]);this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(on),this.shadowRoot.adoptedStyleSheets.push(e)}get paths(){return this._paths}set paths(e){this._paths=e,this.update()}connectedCallback(){this.render(),this.setup(),this.paths=d.instance.getSuggestedPaths()}render(){this.shadowRoot.innerHTML=`
            <div class="header">
                <h4>Percorsi suggeriti</h4>
            </div>
            <div class="list"></div>
            `}setup(){c.instance.subscribe("active-layers-updated",()=>{this.paths=d.instance.getSuggestedPaths()})}update(){const e=this.shadowRoot.querySelector(".list");e&&(e.innerHTML="",this.paths.forEach(n=>{let r=new he;r.path=n,e.append(r)}),this.paths.length===0&&(e.innerHTML='<p class="empty-msg">Nessun percorso suggerito per i layer correnti</p>'))}}customElements.define("app-suggested-path-panel",an);const cn=`:host {
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
}`;class me extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_poi",K.createEmpty());this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(cn),this.shadowRoot.adoptedStyleSheets.push(e)}get poi(){return this._poi}set poi(e){this._poi=e;const n=v.instance.filterLayersByLayerName(this.poi.layerName);n&&(this.poi.layer=n)}connectedCallback(){this.render(),this.update(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="title">
                <span class="legend"></span>
                <h4 class="name"></h4>
            </div>
            <p class="category"></p>
            `}update(){if(!this.poi)return;const e=this.shadowRoot.querySelector(".name");e&&(e.innerHTML=this.poi.name);const n=this.shadowRoot.querySelector(".legend");n&&(n.style.backgroundColor=h.rgbToRgba(h.hexToRgb(this.poi.layer.style.color),.5),n.style.borderColor=this.poi.layer.style.color);const r=this.shadowRoot.querySelector(".category");r&&this.poi.props.forEach(s=>{s.displayName==="Nome"?r.innerHTML=s.value:r.innerHTML=this.poi.name})}setup(){this.poi&&this.addEventListener("click",()=>k.instance.selectedPoi=this.poi)}}customElements.define("app-selected-suggested-path-card",me);class ln extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_path",{...d.instance.selectedSuggestedPath});this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(ue),this.shadowRoot.adoptedStyleSheets.push(e)}get path(){return this._path}set path(e){this._path=e}connectedCallback(){this.render(),this.setup(),this.update(),c.instance.publish("load-custom-path",this.path)}render(){this.shadowRoot.innerHTML=`
            <div class="header">
                <button class="btn back-btn">
                    <span class="material-symbols-outlined action-icon">chevron_left</span>
                </button>
                <h4>${this.path.name}</h4>
                <button class="load-layers-btn">Mostra solo layer presenti</button>
            </div>
            <div class="list"></div>
            `}setup(){const e=this.shadowRoot.querySelector(".back-btn");e&&e.addEventListener("click",()=>{$.instance.isSuggestedPathSelected=!1,$.instance.currentTab=m.SuggestedPath});const n=this.shadowRoot.querySelector(".load-layers-btn");n&&n.addEventListener("click",()=>{const r=this.getLayersInPath();c.instance.publish("bench-all-layers",null),r.forEach(s=>c.instance.publish("add-layer",s))})}update(){const e=this.shadowRoot.querySelector(".list");e&&(e.innerHTML="",this.path.pois.forEach(n=>{let r=new me;r.poi=n,e.appendChild(r)}))}getLayersInPath(){let e=[];return this.path.pois.forEach(n=>e.push(n.layer)),[...new Set(e)]}}customElements.define("app-selected-suggested-path-panel",ln);const dn=document.querySelector("app-router"),pn=new re("map",X.Page,()=>"<page-map></page-map>"),un=new re("index",X.Default,()=>"<page-tags></page-tags>"),hn=new re("404",X.NotFound,()=>"<div>404</div>"),mn=[pn,un,hn];dn.addRoutes(mn);d.instance.getTags();d.instance.getCsvPaths(1);d.instance.getSavedLayers();d.instance.getCustomPaths();
