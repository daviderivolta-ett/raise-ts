var ue=Object.defineProperty;var he=(r,t,e)=>t in r?ue(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var o=(r,t,e)=>(he(r,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();var W=(r=>(r.Default="default",r.Page="page",r.NotFound="not-found",r))(W||{});class se{constructor(t,e,n){o(this,"url");o(this,"type");o(this,"routing");this.url=t,this.type=e,this.routing=n}}class me extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"routes",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){window.addEventListener("hashchange",()=>{this.checkRoute()})}addRoutes(e){this.routes=[...e],this.checkRoute()}checkRoute(){const e=window.location.hash.slice(2);this.changeRoute(e)}changeRoute(e){if(e){const n=this.routes.findIndex(s=>s.url===e);this.shadowRoot.innerHTML=this.routes[n]?this.routes[n].routing():this.sendNotFound()}else{const n=this.routes.filter(s=>s.type===W.Default);n?window.location.hash="#/"+n[0].url:this.sendNotFound()}}sendNotFound(){const e=this.routes.filter(n=>n.type===W.NotFound);return e.length===0||(window.location.hash="#/"+e[0].url,this.changeRoute(e[0].url)),"404: Not found"}}customElements.define("app-router",me);class K{constructor(t,e){o(this,"color");o(this,"opacity");this.color=t,this.opacity=e}static createEmpty(){return new K("#008000",1)}}class Z{constructor(t,e,n){o(this,"propertyName");o(this,"displayName");o(this,"type");this.propertyName=t,this.displayName=e,this.type=n}static createEmpty(){return new Z("","","string")}}var j=(r=>(r.String="string",r.Image="image",r.Number="number",r))(j||{});class z{constructor(t,e,n,s,i,a){o(this,"name");o(this,"layer");o(this,"url");o(this,"style");o(this,"tags");o(this,"relevantProperties");this.name=t,this.layer=e,this.url=n,this.style=s,this.tags=i,this.relevantProperties=a}static createEmpty(){return new z("","","",K.createEmpty(),[],[Z.createEmpty()])}}const v=class v{constructor(){o(this,"CATEGORIES_URL","./json/categories.json");o(this,"_data");if(v._instance)return v._instance;v._instance=this}static get instance(){return v._instance||(v._instance=new v),v._instance}get data(){return this._data}set data(t){this._data=t}async getData(){if(this.data)return this.data;{let t=await this.fetchAppData(this.CATEGORIES_URL);return t=this.parseData(t),this.data=t,t}}async fetchAppData(t){try{const e=await fetch(t).then(s=>s.json()),n=await Promise.all(e.categories.map(async s=>{const i=await Promise.all(s.groups.map(async a=>{if(typeof a=="string")try{const l=await fetch(a);if(l.ok)return l.json();throw new Error("Errore durante il recupero dei dati.")}catch(l){return console.error(l),null}else return a}));return s.groups=i,s}));return{...e,categories:n}}catch(e){throw console.error("Errore durante il recupero dei dati JSON.",e),e}}parseData(t){return{categories:t.categories.map(n=>({name:n.name,groups:n.groups.map(s=>this.parseGroup(s))}))}}parseGroup(t){return Array.isArray(t)?t:{name:t.name,layers:t.layers.map(e=>this.parseLayer(e))}}parseLayer(t){return new z(t.name,t.layer,t.layer_url_wfs,new K(t.style.color,parseFloat(t.style.opacity)),t.tags,t.relevant_properties.map(e=>{let n=Z.createEmpty();switch(n.displayName=e.display_name,n.propertyName=e.property_name,e.type){case"image":n.type=j.Image;break;case"number":n.type=j.Number;break;default:n.type=j.String;break}return n}))}getAllLayers(t){const e=[];return t.categories.map(n=>{n.groups.map(s=>{typeof s!="string"&&s.layers.map(i=>{e.push(i)})})}),e}filterLayersByNameAndTag(t,e){let n=[];return n=t.categories.flatMap(s=>s.groups.flatMap(i=>typeof i=="string"?[z.createEmpty()]:i.layers.filter(a=>a.name.toLowerCase().includes(e)||a.tags.some(l=>l.includes(e))))),n}getAllTags(t){let e=[];return t.categories.map(s=>{s.groups.map(i=>{typeof i!="string"&&i.layers.map(a=>{a.tags.map(l=>{e.push(l)})})})}),[...new Set(e)]}filterLayersByTag(t,e){let n=[];return n=t.categories.flatMap(s=>s.groups.flatMap(i=>typeof i=="string"?[z.createEmpty()]:i.layers.filter(a=>a.tags.some(l=>l.includes(e))))),n}filterLayersByTags(t,e){let n=[];return e.forEach(i=>{this.filterLayersByTag(t,i).forEach(l=>n.push(l))}),[...new Set(n)]}};o(v,"_instance");let _=v;class be extends HTMLElement{constructor(){super();o(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"})}async connectedCallback(){await _.instance.getData(),this.render()}render(){this.shadowRoot.innerHTML=`
            <app-tags-wall></app-tags-wall>
            `}}customElements.define("page-tags",be);const k=class k{constructor(){o(this,"_position",null);if(k._instance)return k._instance;k._instance=this}get position(){return this._position}set position(t){this._position=t}static get instance(){return k._instance||(k._instance=new k),k._instance}async getUserPosition(){try{const t=await new Promise((e,n)=>{navigator.geolocation.getCurrentPosition(s=>{e(s)},s=>{n(s)})});this._position=t}catch{this._position=null}}static geolocationToCartographic(t){return new Cesium.Cartographic(t.coords.longitude,t.coords.latitude,t.coords.altitude||0)}};o(k,"_instance");let w=k;class ee{constructor(t,e,n,s,i,a){o(this,"uuid");o(this,"name");o(this,"position");o(this,"type");o(this,"layer");o(this,"props");this.uuid=t,this.name=e,this.position=n,this.type=s,this.layer=i,this.props=a}static createEmpty(){return new ee("","",Cesium.Cartographic.ZERO,"point",z.createEmpty(),[])}}class ne{constructor(t,e,n){o(this,"displayName");o(this,"type");o(this,"value");this.displayName=t,this.type=e,this.value=n}static createEmpty(){return new ne("",j.String,"")}}var V=(r=>(r.Point="point",r.Polyline="polyline",r.Polygon="polygon",r))(V||{});class U{constructor(t,e,n){o(this,"name");o(this,"pois");o(this,"lastSelected");this.name=t,this.pois=e,this.lastSelected=n}static createEmpty(){return new U("",[],!0)}static createDefault(){return new U("default",[],!0)}}var y=(r=>(r.Info="info",r.SuggestedPath="suggested-path",r.CustomPath="custom-path",r))(y||{});const S=class S{constructor(){o(this,"listeners",{});if(S._instance)return S._instance;S._instance=this}static get instance(){return S._instance||(S._instance=new S),S._instance}subscribe(t,e){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e)}unsubscribe(t,e){this.listeners[t]&&(this.listeners[t]=this.listeners[t].filter(n=>n!==e))}unsubscribeAll(t){delete this.listeners[t]}publish(t,e){this.listeners[t]&&this.listeners[t].forEach(n=>n(e))}};o(S,"_instance");let c=S;const P=class P{constructor(){o(this,"_currentTab",y.Info);if(P._instance)return P._instance;P._instance=this}static get instance(){return P._instance||(P._instance=new P),P._instance}get currentTab(){return this._currentTab}set currentTab(t){this._currentTab=t,c.instance.publish("current-tab-updated",this.currentTab)}};o(P,"_instance");let Q=P;var b=(r=>(r.Loader="loader",r.Temporary="temporary",r.Error="error",r.Info="info",r))(b||{});const ge=`:host {
    position: relative;
    width: calc(100vw - 48px);
    max-width: 400px;
    background-color: white;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(var(--bg-accent));
    border: 1px solid rgb(var(--border-accent));
    border-radius: var(--border-radius-s);
}

.message {
    width: 100%;
    margin: 0;
    padding: 24px;
    color: rgb(var(--f-emphasis));
}

.dismiss-btn {
    cursor: pointer;
    margin: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 32px;
    background-color: transparent;
    border: none;
    border-radius: var(--border-radius-s);
    color: rgb(var(--f-emphasis));

    &:hover {
        background-color: rgb(var(--bg-accent-dull));
    }
}

.material-symbols-outlined {
    font-size: 1.5rem;
    font-family: 'Material Symbols Outlined';
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
}

.loader {
    min-width: 32px;
    min-height: 32px;
    margin: 16px;
    border-radius: 50%;
    animation: rotate 1s linear infinite
}

.loader::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 3px solid rgb(var(--f-emphasis));
    animation: prixClipFix 2s linear infinite;
}

@keyframes rotate {
    100% {
        transform: rotate(360deg)
    }
}

@keyframes prixClipFix {
    0% {
        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)
    }

    25% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)
    }

    50% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)
    }

    75% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)
    }

    100% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)
    }
}

.bar {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: rgb(var(--border-accent));
    transform-origin: left;
    animation: reducingBar var(--snackbar-duration) linear forwards;
}

@keyframes reducingBar {
    to {
        transform: scaleX(0);
    }
}

@media screen and (max-width: 768px) {
    :host {
        width: calc(100vw - 48px);
        max-width: inherit;
    }
}`;class ie extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"snackbarType",b.Info);o(this,"message","");o(this,"duration",0);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(ge),this.shadowRoot.adoptedStyleSheets.push(e)}connectedCallback(){this.render()}render(){switch(this.shadowRoot.innerHTML=`<p class="message">${this.message}</p>`,this.snackbarType){case b.Error:this.renderErrorSnackbar();break;case b.Loader:this.renderLoaderSnackbar();break;case b.Temporary:this.renderTemporarySnackbar();break;default:this.renderInfoSnackbar();break}}renderInfoSnackbar(){this.createDismissButton()}renderLoaderSnackbar(){const e=document.createElement("div");e.classList.add("loader"),this.shadowRoot.append(e)}renderErrorSnackbar(){this.createDismissButton()}renderTemporarySnackbar(){this.createDismissButton();const e=document.createElement("span");e.classList.add("bar"),e.style.setProperty("--snackbar-duration",`${this.duration}s`),this.shadowRoot.append(e),setTimeout(()=>this.remove(),this.duration*1e3)}createDismissButton(){const e=document.createElement("button");e.innerHTML='<span class="material-symbols-outlined">close</span>',e.classList.add("dismiss-btn"),this.shadowRoot.append(e),e.addEventListener("click",()=>this.remove())}}customElements.define("app-snackbar",ie);const C=class C{constructor(){o(this,"snackbars",[]);o(this,"container",null);if(C._instance)return C._instance;C._instance=this}static get instance(){return C._instance||(C._instance=new C),C._instance}createSnackbar(t,e,n,s=2){if(this.container=document.querySelector(".snackbar-container"),!this.container)return;const i=new ie;i.id=e.replace(/[^a-zA-Z0-9-_]/g,""),i.snackbarType=t,i.message=n,s&&(i.duration=s),this.container.append(i)}removeSnackbar(t){if(this.container=document.querySelector(".snackbar-container"),!this.container)return;const e=t.replace(/[^a-zA-Z0-9-_]/g,""),n=this.container.querySelector(`#${e}`);n&&n.remove()}};o(C,"_instance");let m=C;const L=class L{constructor(){o(this,"_tags",[]);o(this,"_paths",[]);o(this,"_selectedCustomPath",U.createDefault());o(this,"_layers",{active:[],bench:[]});o(this,"_activeLayers",[]);o(this,"_benchLayers",[]);if(L._instance)return L._instance;L._instance=this}static get instance(){return L._instance||(L._instance=new L),L._instance}get tags(){return this._tags}set tags(t){this._tags=t}get paths(){return this._paths}set paths(t){this._paths=t}get selectedCustomPath(){return this._selectedCustomPath}get layers(){return this._layers}set layers(t){this._layers=t,localStorage.setItem("layers",JSON.stringify(this.layers))}get activeLayers(){return this._activeLayers}set activeLayers(t){this._activeLayers=t,c.instance.publish("active-layers-updated",this.activeLayers),this.layers={...this.layers,active:this.activeLayers}}get benchLayers(){return this._benchLayers}set benchLayers(t){this._benchLayers=t,c.instance.publish("bench-layers-updated",this.benchLayers),this.layers={...this.layers,bench:this.benchLayers}}set selectedCustomPath(t){this._selectedCustomPath=t,c.instance.publish("selected-custom-path-updated",this.selectedCustomPath),Q.instance.currentTab=y.CustomPath}setTags(t){localStorage.setItem("tags",JSON.stringify(t)),this.tags=t}getTags(){const t=localStorage.getItem("tags");if(!t)return;const e=JSON.parse(t);this.tags=e}getSavedLayers(){const t=localStorage.getItem("layers");if(!t)return;const e=JSON.parse(t);let n={active:[],bench:[]};n.active=e.active.map(s=>this.parseLayer(s)),n.bench=e.bench.map(s=>this.parseLayer(s)),this._layers=n,this._activeLayers=this._layers.active,this._benchLayers=this._layers.bench}getCustomPaths(){const t=localStorage.getItem("paths");if(!t)return;const n=JSON.parse(t).map(s=>this.parseCustomPath(s));this._paths=n}setCustomPaths(){localStorage.setItem("paths",JSON.stringify(this.paths))}parseCustomPath(t){let e=U.createEmpty();return typeof t.lastSelected=="boolean"&&(e.lastSelected=t.lastSelected),t.name&&(e.name=t.name),t.pois&&(e.pois=t.pois.map(n=>this.parsePoi(n))),e}parsePoi(t){let e=ee.createEmpty();return e.layer=this.parseLayer(t.layer),e.name=t.name,e.position=new Cesium.Cartographic(t.position.longitude,t.position.latitude,t.position.height),e.props=t.props.map(n=>this.parsePoiProperty(n)),e.type=this.parsePoiType(t.type),e.uuid=t.uuid,e}parseLayer(t){return new z(t.name,t.layer,t.url=t.url,new K(t.style.color,t.style.opacity),t.tags,t.relevantProperties.map(e=>{let n=Z.createEmpty();switch(n.displayName=e.displayName,n.propertyName=e.propertyName,e.type){case"image":n.type=j.Image;break;case"number":n.type=j.Number;break;default:n.type=j.String;break}return n}))}parsePoiProperty(t){let e=ne.createEmpty();return t.displayName&&(e.displayName=t.displayName),t.type&&(e.type=t.type),t.value&&(e.value=t.value),e}parsePoiType(t){let e;switch(t){case"polyline":e=V.Polyline;break;case"polygon":e=V.Polygon;break;default:e=V.Point;break}return e}addPoiToSelectedPath(t){if(this.isPoiInSelectedPath(t)){m.instance.createSnackbar(b.Temporary,"already-present","Il punto di interesse si trova già nel percorso selezionato.");return}const e=this.selectedCustomPath;e.pois.unshift(t),this.selectedCustomPath=e}isPoiInSelectedPath(t){return this.selectedCustomPath.pois.some(e=>e.name===t.name)}editPath(t){const e=this.paths.find(s=>s.lastSelected===!0);if(!e)return;const n=this.paths.filter(s=>s.lastSelected!==!0);e.name=t,n.push(e),this.selectedCustomPath=e,this.setCustomPaths(),m.instance.createSnackbar(b.Temporary,"modified-path",`Percorso ${t} modificato con successo.`)}deletePath(){const t=this.paths.filter(n=>n.lastSelected!==!0),e=this.paths.find(n=>n.name==="default");e&&(e.lastSelected=!0,this.selectedCustomPath=e),this.paths=[...t],this.setCustomPaths(),m.instance.createSnackbar(b.Temporary,"deleted-path","Percorso eliminato con successo.")}saveNewPath(t){this.paths=this.paths.map(n=>(n.lastSelected=!1,n));const e=U.createEmpty();e.lastSelected=!0,e.name=t,this.paths.push(e),this.selectedCustomPath=e,this.setCustomPaths(),m.instance.createSnackbar(b.Temporary,"new-path",`Percorso ${t} creato con successo.`)}savePath(){const t=this.paths.filter(e=>e.lastSelected!==!0);t.push(this.selectedCustomPath),this.paths=[...t],this.setCustomPaths(),m.instance.createSnackbar(b.Temporary,"saved-path","Percorso salvato con successo.")}loadPath(t){const e=this.paths.find(n=>n.name===t);e&&(this.paths.forEach(n=>n.lastSelected=!1),e.lastSelected=!0,this.selectedCustomPath=e,this.setCustomPaths(),m.instance.createSnackbar(b.Temporary,"loaded-path",`Percorso ${t} caricato con successo.`))}};o(L,"_instance");let d=L;class fe{constructor(t,e,n){o(this,"url");o(this,"layer");o(this,"credit");this.url=t,this.layer=e,this.credit=n}}var $=(r=>(r.Light="light",r.Dark="dark",r))($||{});const E=class E{constructor(){o(this,"MAP_THEMES_URL","./json/themes.json");o(this,"_currentTheme",$.Dark);o(this,"_isPhysicalMap",!1);o(this,"mapThemes",[]);if(E._instance)return E._instance;E._instance=this}static get instance(){return E._instance||(E._instance=new E),E._instance}get currentTheme(){return this._currentTheme}set currentTheme(t){this._currentTheme=t,c.instance.publish("change-theme",{isPhysicalMap:this.isPhysicalMap,theme:this.chooseMapTheme(this.currentTheme)})}get isPhysicalMap(){return this._isPhysicalMap}set isPhysicalMap(t){this._isPhysicalMap=t,c.instance.publish("toggle-physical-map",{isPhysicalMap:this.isPhysicalMap,currentTheme:this.chooseMapTheme(this.currentTheme)})}async getMapThemes(){if(this.mapThemes.length!==0)return this.mapThemes;{let t=await this.fetchMapThemes(this.MAP_THEMES_URL);return this.mapThemes=t,t}}async fetchMapThemes(t){let e=[];try{e=await fetch(t).then(n=>n.json()),e=e.map(n=>this.parseMapTheme(n))}catch(n){console.error(n)}return e}parseMapTheme(t){return new fe(t.url,t.layer,t.credit)}createImageryProvider(t){return new Cesium.WebMapTileServiceImageryProvider({url:t.url,layer:t.layer,credit:new Cesium.Credit(t.credit),tileMatrixSetID:"default",style:"default",format:"image/jpeg",maximumLevel:19})}toggleTheme(){this.currentTheme===$.Light?this.currentTheme=$.Dark:this.currentTheme=$.Light}togglePhysicalMap(){this.isPhysicalMap===!0?this.isPhysicalMap=!1:this.isPhysicalMap=!0}chooseMapTheme(t){const e=t===$.Dark?this.mapThemes.find(n=>n.layer==="carto-dark"):this.mapThemes.find(n=>n.layer==="carto-light");if(e!==void 0)return e;throw new Error("Impossibile trovare il tema della mappa desiderato.")}};o(E,"_instance");let G=E;const T=class T{constructor(){o(this,"_isOpen",!1);if(T._instance)return T._instance;T._instance=this}static get instance(){return T._instance||(T._instance=new T),T._instance}get isOpen(){return this._isOpen}set isOpen(t){this._isOpen=t,c.instance.publish("toggle-tabs",this.isOpen),this.isOpen&&c.instance.publish("toggle-bench",!1)}};o(T,"_instance");let X=T;const M=class M{constructor(){o(this,"_isOpen",!1);if(M._instance)return M._instance;M._instance=this}static get instance(){return M._instance||(M._instance=new M),M._instance}get isOpen(){return this._isOpen}set isOpen(t){this._isOpen=t,c.instance.publish("toggle-bench",this.isOpen),this.isOpen&&c.instance.publish("toggle-tabs",!1)}};o(M,"_instance");let Y=M;var J=(r=>(r.Point="Point",r.LineString="LineString",r.Polygon="Polygon",r.MultiPoint="MultiPoint",r.MultiLineString="MultiLineString",r.MultiPolygon="MultiPolygon",r))(J||{});const R=class R{constructor(){if(R._instance)return R._instance;R._instance=this}static get instance(){return R._instance||(R._instance=new R),R._instance}async createGeoJson(t){const e=`${t.url}?service=WFS&typeName=${t.layer}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;let s=await(await fetch(e)).json(),i=this.substituteRelevantProperties(s,t);return this.createFeatureAdditionalProperties(i,t)}async createGeoJsonFromEntity(t){let e={type:"Feature",geometry:{type:"Point",coordinates:[]},properties:{}};if(t.point&&t.position){e.geometry.type="Point";let n=this.createGeojsonPointCoordinates(t);n&&(e.geometry.coordinates=[Cesium.Math.toDegrees(n.longitude),Cesium.Math.toDegrees(n.latitude)])}return t.polyline&&t.polyline.positions&&(e.geometry.type="LineString",e.geometry.coordinates=this.createGeojsonPolylineCoordinates(t)),t.polygon&&t.polygon.hierarchy&&(e.geometry.type="Polygon",e.geometry.coordinates=this.createGeojsonPolygonCoordinates(t)),e}createGeojsonFeatureFromPoi(t){return{type:"Feature",geometry:{type:"Point",coordinates:[Cesium.Math.toDegrees(t.position.longitude),Cesium.Math.toDegrees(t.position.latitude)]},properties:{}}}createGeojsonFeatureCollectionFromPois(t){let e={type:"FeatureCollection",features:[]},n=t.map(s=>this.createGeojsonFeatureFromPoi(s));return e.features=n,e}createGeojsonPointCoordinates(t){if(!t.position)return null;let e=t.position.getValue(Cesium.JulianDate.now());return e?Cesium.Cartographic.fromCartesian(e):null}createGeojsonPolylineCoordinates(t){if(!t.polyline||!t.polyline.positions)return[];let e=t.polyline.positions.getValue(Cesium.JulianDate.now()),n=[];return e&&e.forEach(s=>{let i,a=Cesium.Cartographic.fromCartesian(s);i=[Cesium.Math.toDegrees(a.longitude),Cesium.Math.toDegrees(a.latitude)],n.push(i)}),n}createGeojsonPolygonCoordinates(t){if(!t.polygon||!t.polygon.hierarchy)return[];let e=t.polygon.hierarchy.getValue(Cesium.JulianDate.now()),n=[];if(e){let s=[];e.positions.forEach(i=>{let a,l=Cesium.Cartographic.fromCartesian(i);a=[Cesium.Math.toDegrees(l.longitude),Cesium.Math.toDegrees(l.latitude)],s.push(a)}),n.push(s),e.holes.forEach(i=>{let a=[];i.positions.forEach(l=>{let p,u=Cesium.Cartographic.fromCartesian(l);p=[Cesium.Math.toDegrees(u.longitude),Cesium.Math.toDegrees(u.latitude)],a.push(p)}),n.push(a)})}return n}createFeatureAdditionalProperties(t,e){return t.features=t.features.map((n,s)=>{switch(n.properties.name=e.name+" "+s,n.properties.layer=e,n.geometry.type){case J.Point:n.properties.uuid=e.layer+n.geometry.coordinates[1]+n.geometry.coordinates[0];break;case J.MultiPoint:n.properties.uuid=e.layer+n.geometry.coordinates[0][1]+n.geometry.coordinates[0][0];break;case(J.LineString||J.Polygon||J.MultiPoint):n.properties.uuid=e.layer+n.geometry.coordinates[0][1]+n.geometry.coordinates[0][0];break;default:n.properties.uuid=e.layer+n.geometry.coordinates[0][0][1]+n.geometry.coordinates[0][0][0];break}return n}),t}substituteRelevantProperties(t,e){return t.features.forEach(n=>{const s={};for(const i in n.properties){const a=e.relevantProperties.find(l=>l.propertyName===i);if(a){const l={displayName:a.displayName,type:a.type,value:n.properties[i]};s[i]=l}}n.properties=s}),t}styleFeature(t,e){t.entities.values.forEach(n=>{if(n.billboard)switch(t.name){case"custom-path":this.styleCustomPath(n);break;case"selected-feature":this.styleSelectedFeature(n);break;default:this.stylePointFeature(n,e);break}n.polyline&&this.stylePolylineFeature(n,e),n.polygon&&this.stylePolygonFeature(n,e)})}stylePointFeature(t,e){return t.billboard=void 0,t.point=new Cesium.PointGraphics({pixelSize:8,color:Cesium.Color.fromCssColorString(e.color).withAlpha(e.opacity),outlineColor:Cesium.Color.fromCssColorString(e.color),outlineWidth:1}),t}styleCustomPath(t){return t.billboard=void 0,t.point=new Cesium.PointGraphics({pixelSize:12,color:Cesium.Color.TRANSPARENT,outlineColor:Cesium.Color.BLUE,outlineWidth:2}),t}styleSelectedFeature(t){return t.billboard=void 0,t.point=new Cesium.PointGraphics({pixelSize:16,color:Cesium.Color.TRANSPARENT,outlineColor:Cesium.Color.GREEN,outlineWidth:2}),t}stylePolylineFeature(t,e){return t.polyline&&(t.polyline.material=new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(e.color)),t.polyline.width=new Cesium.ConstantProperty(2)),t}stylePolygonFeature(t,e){return t.polygon&&(t.polygon.material=new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(e.color).withAlpha(e.opacity)),t.polygon.outlineColor=new Cesium.ConstantProperty(Cesium.Color.fromCssColorString(e.color))),t}openGoogleMaps(t){const e=`https://www.google.it/maps/dir/?api=1&destination=${Cesium.Math.toDegrees(t.latitude)},${Cesium.Math.toDegrees(t.longitude)}`;window.open(e,"_blank")}};o(R,"_instance");let B=R;const I=class I{constructor(){o(this,"_selectedPoi",null);if(I._instance)return I._instance;I._instance=this}static get instance(){return I._instance||(I._instance=new I),I._instance}get selectedPoi(){return this._selectedPoi}set selectedPoi(t){this._selectedPoi=t,c.instance.publish("selected-poi",this.selectedPoi),this._selectedPoi!==null&&(Q.instance.currentTab=y.Info)}parsePoi(t){let e=ee.createEmpty();if(!t.properties)return e;let n=t.properties;return t.properties.propertyNames.forEach(i=>{if(n.hasProperty(i))switch(i){case"uuid":e.uuid=n[i].valueOf();break;case"layer":e.layer=n[i].valueOf();break;case"name":e.name=n[i].valueOf();break;default:let a=n[i].valueOf();e.props.push(this.parsePoiProperty(a));break}}),e.position=this.parsePoiPosition(t),e.type=this.parsePoiType(t),e}parsePoiPosition(t){let e=Cesium.Cartographic.ZERO;if(t.point&&t.position){let n=t.position.getValue(Cesium.JulianDate.now());n&&(e=Cesium.Cartographic.fromCartesian(n))}if(t.polyline&&t.polyline.positions){let n=t.polyline.positions.getValue(Cesium.JulianDate.now())[0];n&&(e=Cesium.Cartographic.fromCartesian(n))}if(t.polygon&&t.polygon.hierarchy){let n=t.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions[0];n&&(e=Cesium.Cartographic.fromCartesian(n))}return e}parsePoiProperty(t){let e=ne.createEmpty();return t.displayName&&(e.displayName=t.displayName),t.type&&(e.type=t.type),t.value&&(e.value=t.value),e}parsePoiType(t){return t.polyline?V.Polyline:t.polygon?V.Polygon:V.Point}};o(I,"_instance");let O=I;const ye=`.map {
    height: 100%;
    width: 100%;
    animation: grow .3s ease-in-out forwards;
}

:host(.reduce) .map {
    animation: shrink .3s ease-in-out forwards;
}

@keyframes shrink {
    from {
        width: 100%;
    }

    to {
        width: calc(100% - 360px);
    }
}

@keyframes grow {
    from  {
        width: calc(100% - 360px);
    }

    to {
        width: 100%;
    }
}

@media screen and (max-width: 768px) {
    @keyframes shrink {
        from {
            height: 100%;
        }
    
        to {
            height: calc(100% - 360px);
        }
    }
    
    @keyframes grow {
        from  {
            height: calc(100% - 360px);
        }
    
        to {
            height: 100%;
        }
    }
}`,we=`/* packages/widgets/Source/shared.css */
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
`;class oe extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"container",document.createElement("div"));o(this,"viewer");o(this,"imageryLayers",{});o(this,"_isOpen",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet,n=new CSSStyleSheet;e.replace(ye),n.replace(we),this.shadowRoot.adoptedStyleSheets=[n,e]}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("reduce"):this.classList.remove("reduce")}connectedCallback(){this.render(),this.addBaseLayers(G.instance.mapThemes),this.setup(),this.addSavedPath()}render(){this.container.classList.add("map"),this.shadowRoot.append(this.container),Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjY2YmYxNy1mNTM2LTRlOWYtYTUyZC01ZmY0NjBhNzllMWEiLCJpZCI6MTY5MDU3LCJpYXQiOjE2OTU4ODQ4NzB9.bN66rOR5h37xuKVsuUSYRSLOGJy-34IhH9S1hr4NOOE",this.viewer=new Cesium.Viewer(this.container,{baseLayerPicker:!1,geocoder:!1,timeline:!1,animation:!1,homeButton:!1,navigationInstructionsInitiallyVisible:!1,navigationHelpButton:!1,sceneModePicker:!1,fullscreenButton:!1,infoBox:!1,sceneMode:Cesium.SceneMode.SCENE2D,mapMode2D:Cesium.MapMode2D.ROTATE,mapProjection:new Cesium.WebMercatorProjection})}setup(){this.viewer.screenSpaceEventHandler.setInputAction(e=>{this.mouseOver(e)},Cesium.ScreenSpaceEventType.MOUSE_MOVE),this.viewer.screenSpaceEventHandler.setInputAction(e=>{this.clickOnMap(e)},Cesium.ScreenSpaceEventType.LEFT_CLICK),w.instance.position?(this.setCameraToPosition(w.instance.position),this.checkUserPin(w.instance.position)):this.setCameraToPosition(null),c.instance.subscribe("toggle-tabs",e=>this.isOpen=e),c.instance.subscribe("change-theme",e=>this.changeTheme(e.isPhysicalMap,e.theme)),c.instance.subscribe("change-map-mode",()=>this.changeMapMode()),c.instance.subscribe("toggle-physical-map",e=>this.togglePhysicalMap(e.isPhysicalMap,e.currentTheme)),c.instance.subscribe("set-camera",e=>this.setCameraToPosition(e)),c.instance.subscribe("check-user-position",e=>this.checkUserPin(e)),c.instance.subscribe("add-layer",e=>this.addLayer(e)),c.instance.subscribe("unbench-layer",e=>this.unbenchLayer(e)),c.instance.subscribe("remove-layer-from-bench",e=>this.removeLayerFromBench(e)),c.instance.subscribe("bench-layer",e=>this.benchLayer(e)),c.instance.subscribe("load-custom-path",e=>{let n=B.instance.createGeojsonFeatureCollectionFromPois(e.pois);this.loadCustomDataSource(n,"custom-path")}),c.instance.subscribe("selected-poi",e=>{if(!e||e.type!==V.Point)return;let n=B.instance.createGeojsonFeatureCollectionFromPois([e]);this.setCameraToPosition(e.position),this.loadCustomDataSource(n,"selected-feature")})}disconnectedCallback(){c.instance.unsubscribeAll("toggle-tabs"),c.instance.unsubscribeAll("change-theme"),c.instance.unsubscribeAll("change-map-mode"),c.instance.unsubscribeAll("toggle-physical-map"),c.instance.unsubscribeAll("set-camera"),c.instance.unsubscribeAll("check-user-position"),c.instance.unsubscribeAll("add-layer"),c.instance.unsubscribeAll("unbench-layer"),c.instance.unsubscribeAll("remove-layer-from-bench"),c.instance.unsubscribeAll("bench-layer"),c.instance.unsubscribeAll("load-custom-path"),c.instance.unsubscribeAll("selected-poi")}mouseOver(e){const n=e.endPosition;this.viewer.scene.pick(n)?document.body.style.cursor="pointer":document.body.style.cursor="default"}clickOnMap(e){c.instance.publish("empty-searchbar",null);const n=e.position,s=this.viewer.scene.pick(n);if(!s||!s.id){X.instance.isOpen=!1,Y.instance.isOpen=!1,O.instance.selectedPoi=null,this.removeCustomDataSource("selected-feature");return}if(!(s.id instanceof Cesium.Entity)){O.instance.selectedPoi=null,this.removeCustomDataSource("selected-feature");return}const i=s.id;if(i.id==="user-pin"){O.instance.selectedPoi=null,this.removeCustomDataSource("selected-feature");return}if(i.name&&(i.name.includes("selected-feature")||i.name.includes("custom-path"))){O.instance.selectedPoi=null,this.removeCustomDataSource("selected-feature");return}Y.instance.isOpen=!1,X.instance.isOpen=!0;const a=B.instance.createGeoJsonFromEntity(i);this.loadCustomDataSource(a,"selected-feature");const l=O.instance.parsePoi(i);O.instance.selectedPoi=l,this.setCameraToPosition(l.position)}addBaseLayers(e){e.forEach(n=>{const s=new Cesium.ImageryLayer(G.instance.createImageryProvider(n));this.viewer.imageryLayers.add(s),this.imageryLayers[n.layer]=s})}addSavedPath(){d.instance.activeLayers.forEach(n=>this.addLayerToMap(n));const e=B.instance.createGeojsonFeatureCollectionFromPois(d.instance.selectedCustomPath.pois);this.loadCustomDataSource(e,"custom-path")}changeTheme(e,n){if(e)return;const s=this.viewer.imageryLayers.indexOf(this.imageryLayers[n.layer]);let i=this.viewer.imageryLayers.get(s);this.viewer.imageryLayers.raiseToTop(i)}togglePhysicalMap(e,n){if(e)for(const s in this.imageryLayers){const i=this.viewer.imageryLayers.indexOf(this.imageryLayers[s]),a=this.viewer.imageryLayers.get(i);this.viewer.imageryLayers.lowerToBottom(a)}else this.changeTheme(e,n)}changeMapMode(){this.viewer.scene.mode===Cesium.SceneMode.SCENE3D?this.viewer.scene.morphTo2D(1):this.viewer.scene.morphTo3D(1)}setCameraToPosition(e){let n=this.viewer.camera.positionCartographic;n.height>2e6?n.height=2e3:n.height;let s=Cesium.Cartesian3.fromDegrees(8.934080815653985,44.40753207658791,2e3);e&&e instanceof GeolocationPosition&&(s=Cesium.Cartesian3.fromDegrees(e.coords.longitude,e.coords.latitude,n.height)),e&&e instanceof Cesium.Cartographic&&(s=Cesium.Cartesian3.fromRadians(e.longitude,e.latitude,n.height)),this.viewer.camera.flyTo({destination:s,orientation:{heading:Cesium.Math.toRadians(0),pitch:Cesium.Math.toRadians(-90),roll:0},duration:.5})}checkUserPin(e){const n=this.viewer.entities.getById("user-pin");n?this.updateUserPin(n,e):this.createUserPin(e)}createUserPin(e){this.viewer.entities.add({name:"user-pin",id:"user-pin",position:Cesium.Cartesian3.fromDegrees(e.coords.longitude,e.coords.latitude,0),point:{pixelSize:8,color:Cesium.Color.BLUE.withAlpha(.5),outlineColor:Cesium.Color.BLUE,outlineWidth:1}})}updateUserPin(e,n){const s=()=>Cesium.Cartesian3.fromDegrees(n.coords.longitude,n.coords.latitude,0);e.position=new Cesium.ConstantPositionProperty(s())}async loadCustomDataSource(e,n){let s=await Cesium.GeoJsonDataSource.load(e);this.viewer.dataSources.getByName(n).forEach(a=>this.viewer.dataSources.remove(a)),s.name=n,B.instance.styleFeature(s,K.createEmpty()),await this.viewer.dataSources.add(s),s.entities.values.forEach((a,l)=>a.name=`${n}-${l}`),this.viewer.dataSources.lowerToBottom(s)}removeCustomDataSource(e){this.viewer.dataSources.getByName(e).forEach(s=>this.viewer.dataSources.remove(s))}async addLayerToMap(e){try{const n=B.instance.createGeoJson(e),s=await Cesium.GeoJsonDataSource.load(n);s.name=e.layer,this.viewer.dataSources.add(s),B.instance.styleFeature(s,e.style)}catch(n){throw n}}isLayerOnMap(e){return this.viewer.dataSources.getByName(e.layer).length>0}addLayerToActiveLayers(e){const n=d.instance.activeLayers;n.unshift(e),d.instance.activeLayers=[...n];let s=d.instance.benchLayers;s.some(a=>a.layer===e.layer)&&(s=s.filter(a=>a.layer!==e.layer),d.instance.benchLayers=s)}removeLayerFromMap(e){this.viewer.dataSources.getByName(e.layer).forEach(s=>this.viewer.dataSources.remove(s))}removeLayerFromActiveLayers(e){let n=d.instance.activeLayers;n=n.filter(s=>s.layer!==e.layer),d.instance.activeLayers=[...n]}removeLayer(e){let n=d.instance.activeLayers;this.viewer.dataSources.getByName(e.layer).forEach(i=>this.viewer.dataSources.remove(i)),n=n.filter(i=>i.layer!==e.layer),d.instance.activeLayers=[...n]}addLayerToBench(e){let n=d.instance.benchLayers;n.unshift(e),d.instance.benchLayers=[...n]}removeLayerFromBench(e){let n=d.instance.benchLayers;n=n.filter(s=>s.layer!==e.layer),d.instance.benchLayers=n}async addLayer(e){if(this.isLayerOnMap(e))m.instance.createSnackbar(b.Temporary,"","Layer già presente",3);else try{m.instance.createSnackbar(b.Loader,e.layer,"Caricamento..."),await this.addLayerToMap(e),this.addLayerToActiveLayers(e),m.instance.removeSnackbar(e.layer)}catch{m.instance.removeSnackbar(e.layer),m.instance.createSnackbar(b.Error,"","Errore nel caricamento del layer")}}benchLayer(e){this.removeLayerFromMap(e),this.removeLayerFromActiveLayers(e),this.addLayerToBench(e)}async unbenchLayer(e){try{m.instance.createSnackbar(b.Loader,e.layer,"Caricamento..."),await this.addLayerToMap(e),this.removeLayerFromBench(e),this.addLayerToActiveLayers(e),m.instance.removeSnackbar(e.layer)}catch{m.instance.removeSnackbar(e.layer),m.instance.createSnackbar(b.Error,"","Errore nel caricamento del layer")}}}customElements.define("app-map",oe);const xe=`.page {
    height: 100vh;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}

.search {
    display: flex;
    width: 360px;
}

app-search-result {
    position: fixed;
    top: 80px;
    left: 24px;
    width: 356px;
}

.fa-button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    padding: 16px;
    font-size: 1.4rem;
    color: rgb(var(--f-default));
    background-color: rgb(var(--bg-default));
    border: none;

    &:hover {
        color: rgb(var(--f-emphasis));
        background-color: rgb(var(--bg-inset));
    }
}

button[is="app-tabs-toggle"] {
    border-radius: var(--border-radius-circle) 0 0 var(--border-radius-circle);
}

button.tags-page-link {
    border-radius: 0 var(--border-radius-circle) var(--border-radius-circle) 0;
}

.map-controls {
    border-radius: var(--border-radius-m);
    animation: slideOut .3s ease-in-out forwards;
}

.map-controls.open {
    animation: slideIn .3s ease-in-out forwards;
}

input[is="app-searchbar"] {
    color: rgb(var(--f-default));
    background-color: rgb(var(--bg-default));
    padding: 0 16px;
    border: none;
    width: 100%;
    outline: none;

    &::placeholder {
        color: rgb(var(--f-muted));
    }

    &:focus {
        background-color: rgb(var(--bg-inset));
    }
}

app-tabs-sidenav {
    position: fixed;
    top: 0;
    right: -360px;
}

app-bench {
    position: fixed;
    top: 50%;
    right: -360px;
}

.material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
}

@media screen and (max-width: 768px) {
    .header {
       flex-direction: column;
       gap: 8px;
    }

    .search {
        width: 100%;
    }

    app-search-result {
        top: 120px;
    }

    app-bench {
        top: inherit;
        right: inherit;
        bottom: 24px;
        left: -360px;
    }

    app-tabs-sidenav {
        top: inherit;
        right: inherit;
        bottom: 0;
        left: 0;
    }
}`;class ve extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"map",new oe);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(xe),this.shadowRoot.adoptedStyleSheets.push(e)}async connectedCallback(){await _.instance.getData(),await G.instance.getMapThemes(),await w.instance.getUserPosition(),d.instance.paths.some(n=>n.name==="default")||d.instance.saveNewPath("default");const e=d.instance.paths.find(n=>n.lastSelected===!0);e&&(d.instance.selectedCustomPath=e),this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `,this.map=this.shadowRoot.querySelector("app-map")}setup(){const e=this.shadowRoot.querySelector(".tags-page-link");e&&e.addEventListener("click",()=>window.location.hash="/")}}customElements.define("page-map",ve);class ke extends HTMLButtonElement{constructor(){super();o(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>c.instance.publish("change-map-mode",null)),c.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}disconnectedCallback(){c.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-map-mode-btn",ke,{extends:"button"});class Se extends HTMLButtonElement{constructor(){super()}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>G.instance.toggleTheme())}}customElements.define("app-map-theme-btn",Se,{extends:"button"});class Pe extends HTMLButtonElement{constructor(){super();o(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.setup()}setup(){this.addEventListener("click",async()=>{await w.instance.getUserPosition(),w.instance.position?(c.instance.publish("set-camera",w.instance.position),c.instance.publish("check-user-position",w.instance.position)):c.instance.publish("set-camera",null)}),c.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}disconnectedCallback(){c.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-center-position-btn",Pe,{extends:"button"});class Ce extends HTMLInputElement{constructor(){super();o(this,"_inputValue","")}get inputValue(){return this._inputValue}set inputValue(e){this._inputValue=e,this.update()}connectedCallback(){this.setup()}setup(){this.addEventListener("input",()=>this.inputValue=this.value),c.instance.subscribe("empty-searchbar",()=>this.value=this.inputValue="")}update(){let e={layers:[],searchValue:""};this.inputValue===""||(e={layers:_.instance.filterLayersByNameAndTag(_.instance.data,this.value),searchValue:this.inputValue}),c.instance.publish("search-layer",e)}disconnectedCallback(){c.instance.unsubscribeAll("empty-searchbar")}}customElements.define("app-searchbar",Ce,{extends:"input"});class h{constructor(t,e){o(this,"rgb");o(this,"hex");o(this,"hsl");t==="rgb"?(this.rgb=h.isValidRgb(e)?e:"rgb(31, 111, 235)",this.hex=h.rgbToHex(this.rgb),this.hsl=h.rgbToHsl(this.rgb)):t==="hex"?(this.hex=h.isValidHex(e)?e:"#1f6feb",this.rgb=h.hexToRgb(this.hex),this.hsl=h.rgbToHsl(this.rgb)):(this.rgb="rgb(31, 111, 235)",this.hex="#1f6feb",this.hsl=[216,84,52])}static createEmpty(){return new h("rgb","rgb(31, 111, 235)")}static isValidRgb(t){return/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(t)}static isValidHex(t){return/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(t)}static rgbToHex(t){const e=t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);if(!e)throw new Error("Invalid RGB format");const[,n,s,i]=e.map(Number);return`#${((1<<24)+(n<<16)+(s<<8)+i).toString(16).slice(1)}`}static hexToRgb(t){t=t.replace(/^#/,"");const e=parseInt(t,16),n=e>>16&255,s=e>>8&255,i=e&255;return`rgb(${n}, ${s}, ${i})`}static rgbToRgba(t,e){return t.replace("rgb","rgba").slice(0,-1)+`, ${e})`}static rgbToHsl(t){const e=t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);if(!e)throw new Error("Invalid RGB format");const[n,s,i]=e.slice(1).map(Number),a=n/255,l=s/255,p=i/255,u=Math.max(a,l,p),g=Math.min(a,l,p);let H=0,f=0;const x=(u+g)/2;if(u!==g){switch(f=x>.5?(u-g)/(2-u-g):(u-g)/(u+g),u){case a:H=(l-p)/(u-g)+(l<p?6:0);break;case l:H=(p-a)/(u-g)+2;break;case p:H=(a-l)/(u-g)+4;break}H/=6}return[Math.round(H*360),Math.round(f*100),Math.round(x*100)]}static hslToRgb(t){const[e,n,s]=t,i=e/360,a=n/100,l=s/100,p=(f,x,N)=>(N<0&&(N+=1),N>1&&(N-=1),N<1/6?f+(x-f)*6*N:N<1/2?x:N<2/3?f+(x-f)*(2/3-N)*6:f);let u,g,H;if(n===0)u=g=H=l;else{const f=l<.5?l*(1+a):l+a-l*a,x=2*l-f;u=p(x,f,i+1/3),g=p(x,f,i),H=p(x,f,i-1/3)}return`rgb(${Math.round(u*255)}, ${Math.round(g*255)}, ${Math.round(H*255)})`}}class ae extends HTMLButtonElement{constructor(){super();o(this,"_layer",z.createEmpty());o(this,"legend",document.createElement("span"))}get layer(){return this._layer}set layer(e){this._layer=e}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <div class="info">
                <span class="legend"></span>
                <label>${this.layer.name}</label>
            </div>
            <span class="icon add-icon">
                <span class="material-symbols-outlined">add</span>
            </span>
            `,this.legend=this.querySelector(".legend"),this.legend.style.backgroundColor=h.rgbToRgba(h.hexToRgb(this._layer.style.color),.5),this.legend.style.borderColor=this._layer.style.color}setup(){this.addEventListener("click",()=>{c.instance.publish("add-layer",this.layer)})}}customElements.define("app-search-result-chip",ae,{extends:"button"});const Le=`:host {
    display: none;
}

:host(.visible) {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 192px;
    overflow-y: auto;
    padding: 24px 16px;
    color: rgb(var(--f-default));
    background-color: rgb(var(--bg-inset));
    border-radius: var(--border-radius-m);
    scrollbar-width: thin;
    scrollbar-color: rgb(var(--bg-muted), 1) transparent;
}

.material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
}
`,Ee=`button[is="app-search-result-chip"] {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    text-wrap: nowrap;
    color: rgb(var(--f-default));
    background-color: rgb(var(--bg-default));
    border: none;
    border-radius: var(--border-radius-circle);
    padding: 8px 16px;
}

button[is="app-search-result-chip"] .info {
    display: flex;
    gap: 8px;
}

button[is="app-search-result-chip"] .info .legend {
    display: inline-block;
    width: 12px;
    height: 12px;
    min-width: 12px;
    border-radius: 100%;
    border-width: 2px;
    border-style: solid;
}

button[is="app-search-result-chip"] .info label {
    cursor: pointer;
}

button[is="app-search-result-chip"] .icon {
    font-size: 1.4rem;
}`;class Te extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"container",document.createElement("div"));o(this,"_layers",[]);o(this,"_isVisible",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Le);let n=new CSSStyleSheet;n.replaceSync(Ee),this.shadowRoot.adoptedStyleSheets=[e,n]}get layers(){return this._layers}set layers(e){this._layers=e,this.update()}get isVisible(){return this._isVisible}set isVisible(e){this._isVisible=e,this._isVisible===!0?this.classList.add("visible"):this.classList.remove("visible")}connectedCallback(){this.render(),this.setup()}render(){this.container.classList.add("container"),this.shadowRoot.append(this.container)}setup(){c.instance.subscribe("search-layer",e=>{if(this.container.innerHTML="",e.searchValue===""){this.isVisible=!1;return}this.isVisible=!0,this.layers=e.layers})}update(){if(this._layers.length===0){let e=document.createElement("p");e.innerHTML="Nessun livello trovato",this.container.append(e);return}this._layers.forEach(e=>{let n=new ae;n.layer=e,n.setAttribute("is","app-search-result-chip"),this.container.append(n)})}disconnectedCallback(){c.instance.unsubscribeAll("search-layer")}}customElements.define("app-search-result",Te);class Me extends HTMLButtonElement{constructor(){super();o(this,"_isOpen",!1);o(this,"icon");this.icon=this.querySelector(".material-symbols-outlined")}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.update()}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{X.instance.isOpen=!this.isOpen}),c.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}update(){this.isOpen?this.icon.innerHTML="close":this.icon.innerHTML="menu"}disconnectedCallback(){c.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-tabs-toggle",Me,{extends:"button"});const Re=`:host {
    width: 360px;
    height: 100vh;
    background-color: rgb(var(--bg-inset), 1);
    animation: slideOut .3s ease-in-out forwards;
}

:host(.visible) {
    animation: slideIn .3s ease-in-out forwards;
}

.toggle {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
}

.close {
    height: 3px;
    width: 40px;
    background-color: rgb(var(--f-default));
    border-radius: var(--border-radius-circle);
}

@keyframes slideIn {
    from {
        right: -360px;
    }

    to {
        right: 0;
    }
}

@keyframes slideOut {
    from {
        right: 0;
    }

    to {
        right: -360px;
    }
}

@media screen and (max-width: 768px) {
    :host {
        width: 100%;
        height: 360px;
    }

    @keyframes slideIn {
        from {
            bottom: -360px;
        }
    
        to {
            bottom: 0;
        }
    }
    
    @keyframes slideOut {
        from {
            bottom: 0;
        }
    
        to {
            bottom: -360px;
        }
    }
}`;class Ie extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_isVisible",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Re),this.shadowRoot.adoptedStyleSheets.push(e)}get isVisible(){return this._isVisible}set isVisible(e){this._isVisible=e,this.update()}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="toggle">
                <div class="close"></div>
            </div>
            <app-tabs></app-tabs>
            `}setup(){c.instance.subscribe("toggle-tabs",n=>{this.isVisible=n});const e=this.shadowRoot.querySelector(".toggle");e&&e.addEventListener("click",()=>X.instance.isOpen=!1)}update(){this.isVisible===!0?this.classList.add("visible"):this.classList.remove("visible")}disconnectedCallback(){c.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-tabs-sidenav",Ie);class re extends HTMLButtonElement{constructor(){super();o(this,"_layer",z.createEmpty());o(this,"legend",document.createElement("span"));o(this,"removeIcon",document.createElement("span"))}get layer(){return this._layer}set layer(e){this._layer=e}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <div class="info">
                <span class="legend"></span>
                <label>${this.layer.name}</label>
            </div>
            <span class="divider"></span>
            <span class="icon add-icon">
                <span class="material-symbols-outlined">close</span>
            </span>
            `,this.legend=this.querySelector(".legend"),this.legend.style.backgroundColor=h.rgbToRgba(h.hexToRgb(this._layer.style.color),.5),this.legend.style.borderColor=this._layer.style.color,this.removeIcon=this.querySelector(".icon")}setup(){this.removeIcon.addEventListener("click",()=>{c.instance.publish("bench-layer",this.layer),c.instance.publish("open-bench",!0)})}}customElements.define("app-carousel-chip",re,{extends:"button"});const Ae=`:host {
    background-color: transparent;
    display: flex;
    gap: 8px;
    overflow-x: auto;
    max-width: calc(100% - 360px);
    width: 100%;
    scrollbar-width: none;
    padding: 0 0 0 16px;
    box-sizing: border-box;
}

.material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
}

@media screen and (max-width: 768px) {
    :host {
        padding: 0;
        max-width: 100%;
    }
}`,Be=`button[is="app-carousel-chip"] {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    text-wrap: nowrap;
    color: rgb(var(--f-default));
    background-color: rgb(var(--bg-default));
    border: none;
    padding: 0;
    border-radius: var(--border-radius-circle);
}

button[is="app-carousel-chip"] .info {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    gap: 8px;
    padding: 0 16px;
    border-radius: var(--border-radius-circle) 0  0 var(--border-radius-circle);
}

button[is="app-carousel-chip"] .info .legend {
    display: inline-block;
    width: 12px;
    height: 12px;
    min-width: 12px;
    border-radius: 100%;
    border-width: 2px;
    border-style: solid;
}

button[is="app-carousel-chip"] .info label {
    cursor: pointer;
}

button[is="app-carousel-chip"] .divider {
    width: 1px;
    height: calc(100% - 16px);
    background-color: rgb(var(--bg-muted));
}

button[is="app-carousel-chip"] .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    height: 40px;
    padding: 0 16px 0 12px;
    color: rgb(var(--f-danger));
    border-radius: 0 var(--border-radius-circle) var(--border-radius-circle) 0;

    &:hover {
        background-color: rgb(var(--bg-inset));
    }
}`;class Oe extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_layers",[]);o(this,"startX",0);o(this,"dragScoll",0);o(this,"isDragging",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Ae);let n=new CSSStyleSheet;n.replaceSync(Be),this.shadowRoot.adoptedStyleSheets=[e,n]}get layers(){return this._layers}set layers(e){this._layers=e,this.update()}connectedCallback(){this.render(),this.setup()}render(){this.layers=d.instance.activeLayers}setup(){c.instance.subscribe("active-layers-updated",e=>{this.layers=[...e]}),this.addEventListener("mousedown",e=>this.startDrag(e)),this.addEventListener("mousemove",e=>this.drag(e)),this.addEventListener("mouseleave",()=>this.endDrag()),this.addEventListener("mouseup",()=>this.endDrag())}update(){this.shadowRoot.innerHTML="",this.layers.forEach(e=>{let n=new re;n.layer=e,n.setAttribute("is","app-carousel-chip"),this.shadowRoot.append(n)})}disconnectedCallback(){c.instance.unsubscribeAll("active-layers-updated")}startDrag(e){this.isDragging=!0,this.startX=e.pageX,this.dragScoll=this.scrollLeft}endDrag(){this.isDragging=!1}drag(e){if(!this.isDragging)return;e.preventDefault();const n=e.pageX-this.startX;this.scrollLeft=this.dragScoll-n}}customElements.define("app-carousel",Oe);class ce extends HTMLButtonElement{constructor(){super();o(this,"_layer",z.createEmpty());o(this,"info",document.createElement("div"));o(this,"legend",document.createElement("span"));o(this,"removeIcon",document.createElement("span"))}get layer(){return this._layer}set layer(e){this._layer=e}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <div class="info">
                <span class="legend"></span>
                <label>${this.layer.name}</label>
            </div>
            <span class="divider"></span>
            <span class="icon add-icon">
                <span class="material-symbols-outlined">delete</span>
            </span>
            `,this.info=this.querySelector(".info"),this.legend=this.querySelector(".legend"),this.legend.style.backgroundColor=h.rgbToRgba(h.hexToRgb(this._layer.style.color),.5),this.legend.style.borderColor=this._layer.style.color,this.removeIcon=this.querySelector(".icon")}setup(){this.addEventListener("click",()=>{c.instance.publish("unbench-layer",this.layer)}),this.removeIcon.addEventListener("click",e=>{e.stopPropagation(),c.instance.publish("remove-layer-from-bench",this.layer)})}}customElements.define("app-bench-chip",ce,{extends:"button"});const De=`:host {
    width: 360px;
    height: fit-content;
    transform: translateY(-50%);
    background-color: transparent;
    animation: slideOut .3s ease-in-out forwards;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 24px;
    box-sizing: border-box;
    max-height: 400px;
    overflow-y: auto;
    scrollbar-width: none;
}

:host(.visible) {
    animation: slideIn .3s ease-in-out forwards;
}

@keyframes slideIn {
    from {
        right: -360px;
    }

    to {
        right: 0;
    }
}

@keyframes slideOut {
    from {
        right: 0;
    }

    to {
        right: -360px;
    }
}

@media screen and (max-width: 768px) {
    :host {
        transform: translateY(0);
        max-height: calc(100% - 144px);
    }

    @keyframes slideIn {
        from {
            left: -360px;
        }

        to {
            left: 0;
        }
    }

    @keyframes slideOut {
        from {
            left: 0;
        }

        to {
            left: -360px;
        }
    }
}`,_e=`button[is="app-bench-chip"] {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    width: 100%;
    text-wrap: nowrap;
    color: rgb(var(--f-default));
    background-color: rgb(var(--bg-default));
    border: none;
    padding: 0;
    border-radius: var(--border-radius-circle);
}

button[is="app-bench-chip"] .info {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    gap: 8px;
    padding: 0 16px;
    border-radius: var(--border-radius-circle) 0  0 var(--border-radius-circle);

    &:hover {
        background-color: rgb(var(--bg-inset));
    }
}

button[is="app-bench-chip"] .info .legend {
    display: inline-block;
    width: 12px;
    height: 12px;
    min-width: 12px;
    border-radius: 100%;
    border-width: 2px;
    border-style: solid;
}

button[is="app-bench-chip"] .info label {
    cursor: pointer;
}

button[is="app-bench-chip"] .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    height: 40px;
    padding: 0 16px 0 12px;
    color: rgb(var(--f-danger));
    border-radius: 0 var(--border-radius-circle) var(--border-radius-circle) 0;

    &:hover {
        background-color: rgb(var(--bg-inset));
    }
}

button[is="app-bench-chip"] .divider {
    width: 1px;
    height: calc(100% - 16px);
    background-color: rgb(var(--bg-muted));
}

.material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
}`;class ze extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_isVisible",!1);o(this,"_layers",[]);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(De);let n=new CSSStyleSheet;n.replaceSync(_e),this.shadowRoot.adoptedStyleSheets=[e,n]}get isVisible(){return this._isVisible}set isVisible(e){this._isVisible=e,this.toggleBench()}get layers(){return this._layers}set layers(e){this._layers=e,this.update()}connectedCallback(){this.render(),this.setup()}render(){this.layers=d.instance.benchLayers}setup(){c.instance.subscribe("bench-layers-updated",e=>{this.layers=[...e]}),c.instance.subscribe("toggle-bench",e=>{this.isVisible=e})}update(){this.shadowRoot.innerHTML="",this.layers.forEach(e=>{let n=new ce;n.layer=e,n.setAttribute("is","app-bench-chip"),this.shadowRoot.append(n)})}disconnectedCallback(){c.instance.unsubscribeAll("bench-layers-updated"),c.instance.unsubscribeAll("toggle-bench")}toggleBench(){this.isVisible===!0?this.classList.add("visible"):this.classList.remove("visible")}}customElements.define("app-bench",ze);class He extends HTMLButtonElement{constructor(){super();o(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{Y.instance.isOpen=!this.isOpen}),c.instance.subscribe("toggle-bench",e=>{this.isOpen=e})}disconnectedCallback(){c.instance.unsubscribeAll("toggle-bench")}}customElements.define("app-bench-toggle",He,{extends:"button"});const Ne=`:host {
    display: block;
    height: 100%;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
}

.tab {
    cursor: pointer;
    position: relative;
    font-family: 'Inter', sans-serif;
    font-size: .9rem;
    font-weight: 600;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    color: rgb(var(--f-default));
}

.border {
    position: absolute;   
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    background-color: rgb(var(--border-accent), 1);
    transform-origin: left;
}

.selected {
    color: rgb(var(--f-emphasis), 1);
    background-color: rgb(var(--bg-default), 1);
    
    .border {
        animation: selectedTab .2s ease-in-out forwards;        
    }
}

.panel {
    height: calc(100% - 72px);
}

@keyframes selectedTab {
    to {
        width: 100%;
    }
}`;class Fe extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_currentTab",y.Info);o(this,"infoTab",null);o(this,"suggestedRouteTab",null);o(this,"customRouteTab",null);o(this,"panel",null);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Ne),this.shadowRoot.adoptedStyleSheets.push(e)}get currentTab(){return this._currentTab}set currentTab(e){this._currentTab=e,this.switchPanel(),this.switchTab()}connectedCallback(){this.render(),this.setup(),this.currentTab=y.Info}render(){this.shadowRoot.innerHTML=`
            <nav class="header">
                <button class="tab info-tab">Informazioni<span class="border"></span></button>
                <button class="tab suggested-route-tab">Percorsi suggeriti<span class="border"></span></button>
                <button class="tab custom-route-tab">Percorsi custom<span class="border"></span></button>
            </nav>
            <div class="panel"></div>
            `,this.infoTab=this.shadowRoot.querySelector(".info-tab"),this.suggestedRouteTab=this.shadowRoot.querySelector(".suggested-route-tab"),this.customRouteTab=this.shadowRoot.querySelector(".custom-route-tab"),this.panel=this.shadowRoot.querySelector(".panel")}setup(){this.infoTab&&this.infoTab.addEventListener("click",()=>this.currentTab=y.Info),this.suggestedRouteTab&&this.suggestedRouteTab.addEventListener("click",()=>this.currentTab=y.SuggestedPath),this.customRouteTab&&this.customRouteTab.addEventListener("click",()=>this.currentTab=y.CustomPath),c.instance.subscribe("current-tab-updated",e=>this.currentTab=e)}disconnectedCallback(){c.instance.unsubscribeAll("current-tab-updated")}renderInfoPanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<app-info-panel></app-info-panel>")}renderSuggestedRoutePanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="")}renderCustomPathPanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<app-custom-path-panel></app-custom-path-panel>")}switchPanel(){switch(this.currentTab){case y.CustomPath:this.renderCustomPathPanel();break;case y.SuggestedPath:this.renderSuggestedRoutePanel();break;default:this.renderInfoPanel();break}}switchTab(){if(this.removeSelectedStatus(),!(!this.customRouteTab||!this.suggestedRouteTab||!this.infoTab))switch(this.currentTab){case y.CustomPath:this.customRouteTab.classList.add("selected");break;case y.SuggestedPath:this.suggestedRouteTab.classList.add("selected");break;default:this.infoTab.classList.add("selected");break}}removeSelectedStatus(){Array.from(this.shadowRoot.querySelectorAll(".tab")).forEach(n=>n.classList.remove("selected"))}}customElements.define("app-tabs",Fe);const Ve=`:host {
    display: flex;
    flex-direction: column;
    height: 100%;
}

h4,
p {
    margin: 0;
}

.empty-msg {
    text-align: center;
    padding: 24px;
    box-sizing: border-box;
}

.header {
    padding: 24px;
    box-sizing: border-box;
}

.title {
    color: rgb(var(--f-emphasis), 1);
    display: flex;
    align-items: center;
    gap: 8px;
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
    padding: 0 0 0 22px;
}

.tools {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding: 0 24px;
    box-sizing: border-box;
    margin: 0 0 8px 0;
}

button {
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    width: 100%;
    height: 32px;
    border-radius: var(--border-radius-circle);
    color: rgb(var(--f-default), 1);
    background-color: rgb(var(--bg-default), 1);
    border: 1px solid transparent;

    &:hover {
        color: rgb(var(--f-emphasis), 1);
        background-color: rgb(var(--bg-subtle), 1);
    }
}

.directions-btn {
    background-color: rgb(var(--bg-accent), 1);
    border: 1px solid rgb(var(--border-accent), 1);
}

.info {
    overflow-y: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.toggle-info {
    width: calc(100% - 48px);
    margin: 0 auto;
}

.info-content {
    display: none;
    overflow-y: auto;
    flex: 1;
    box-sizing: border-box;
    padding: 24px;
    scrollbar-width: thin;
    scrollbar-color: rgb(var(--bg-muted), 1) transparent;
}

.visible {
    display: block;
}

.property {
    margin: 0 0 16px 0;
}

.property:last-child {
    margin: 0;
}

.property-label {
    display: block;
    font-size: var(--font-size-s);
    margin: 0 0 2px 0;
}

.property-value {
    color: rgb(var(--f-emphasis), 1);
}`;class je extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_poi",O.instance.selectedPoi);o(this,"_isInfoOpen",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Ve),this.shadowRoot.adoptedStyleSheets.push(e)}get poi(){return this._poi}set poi(e){this._poi=e,this.isInfoOpen=!1,this.update()}get isInfoOpen(){return this._isInfoOpen}set isInfoOpen(e){this._isInfoOpen=e,this.toggleInfo()}connectedCallback(){this.render(),this.setup(),this.poi&&this.update()}disconnectedCallback(){c.instance.unsubscribe("selected-poi",this.handleSelectedPoi.bind(this))}handleSelectedPoi(e){this.poi=e}render(){this.shadowRoot.innerHTML='<p class="empty-msg">Nessun punto selezionato</p>'}setup(){this.handleSelectedPoi=this.handleSelectedPoi.bind(this),c.instance.subscribe("selected-poi",this.handleSelectedPoi)}update(){if(!this.poi){this.render();return}this.shadowRoot.innerHTML=`
            <div class="header">
                <div class="title">
                    <span class="legend"></span>
                    <h4 class="name">${this.poi.name}</h4>
                </div>
                <p class="category"></p>
            </div>
            <div class="tools"></div>
            `;const e=this.shadowRoot.querySelector(".legend"),n=this.shadowRoot.querySelector(".category"),s=this.shadowRoot.querySelector(".tools");e.style.backgroundColor=h.rgbToRgba(h.hexToRgb(this._poi.layer.style.color),.5),e.style.borderColor=this._poi.layer.style.color,this.poi.props.forEach(p=>{p.displayName==="Nome"?n.innerHTML=p.value:n.innerHTML=this.poi.name});const i=this.renderDirectionsBtn();i&&s.appendChild(i);const a=this.renderAddToRouteBtn();a&&s.append(a);const l=this.renderInfo();l&&this.shadowRoot.appendChild(l)}renderDirectionsBtn(){if(!this.poi)return null;const e=document.createElement("button");return e.classList.add("directions-btn"),e.innerHTML="Indicazioni",e.addEventListener("click",()=>B.instance.openGoogleMaps(this.poi.position)),e}renderAddToRouteBtn(){if(!this.poi||this.poi.type!==V.Point)return null;const e=document.createElement("button");return e.classList.add("add-to-path-btn"),e.innerHTML="Aggiungi",e.addEventListener("click",()=>{this.poi&&d.instance.addPoiToSelectedPath(this.poi)}),e}renderInfo(){if(!this.poi)return null;const e=this.poi.props.filter(a=>a.displayName!=="Nome");if(e.length===0)return null;let n=document.createElement("div");n.classList.add("info");const s=this.renderMoreInfoBtn();n.appendChild(s);const i=document.createElement("div");return i.classList.add("info-content"),n.appendChild(i),e.forEach(a=>{const l=this.renderTopic(a);i.appendChild(l)}),n}renderMoreInfoBtn(){const e=document.createElement("button");return e.innerHTML="Leggi info",e.classList.add("toggle-info"),e.addEventListener("click",()=>this.isInfoOpen=!this.isInfoOpen),e}toggleInfo(){const e=this.shadowRoot.querySelector(".info-content"),n=this.shadowRoot.querySelector(".toggle-info");e&&n&&(this.isInfoOpen?e.classList.add("visible"):e.classList.remove("visible"),this.isInfoOpen?n.innerHTML="Mostra meno":n.innerHTML="Leggi info")}renderTopic(e){const n=document.createElement("div");n.classList.add("property");const s=document.createElement("label");s.classList.add("property-label"),s.innerHTML=e.displayName;const i=document.createElement("p");return i.classList.add("property-value"),e.value!==""?i.innerHTML=e.value:i.innerHTML="-",n.appendChild(s),n.appendChild(i),n}}customElements.define("app-info-panel",je);var D=(r=>(r.SortPois="sort-pois",r.EditPath="edit-path",r.AddPath="add-path",r.BookmarkPath="bookmark-path",r.LoadPath="load-path",r))(D||{});const F=class F{constructor(){F._instance||(F._instance=this)}static get instance(){return F._instance||(F._instance=new F),F._instance}calculateDistance(t,e){const n=t.longitude-e.longitude,s=t.latitude-e.latitude;return Math.sqrt(n*n+s*s)}nearestInsertion(t,e){const n=[...t];let s=0,i=this.calculateDistance(e,n[0].position);for(let l=1;l<n.length;l++){const p=this.calculateDistance(e,n[l].position);p<i&&(i=p,s=l)}const a=[n.splice(s,1)[0]];for(;n.length>0;){i=Number.MAX_VALUE;let l=0;for(let p=0;p<n.length;p++){const u=this.calculateDistance(a[a.length-1].position,n[p].position);u<i&&(i=u,l=p)}a.push(n.splice(l,1)[0])}return a.reverse()}};o(F,"_instance");let te=F;const qe=`.form {
    color: rgb(var(--f-default));
}

h4,
p {
    margin: 0;
}

h4 {
    color: rgb(var(--f-emphasis));
    margin: 0 0 16px 0;
}

p {
    margin: 0 0 8px 0;
}

input.path-name-input {
    width: 100%;
    height: 40px;
    outline: none;
    padding: 0;
    box-sizing: border-box;
    border-width: 0 0 1px 0;
    background-color: transparent;
    border-style: solid;
    color: rgb(var(--f-emphasis));
    border-color: rgb(var(--f-default));
    margin: 0 0 16px 0;

    &::placeholder {
        color: rgb(var(--f-muted));
    }
}

.list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 16px 0 0 0;
}

.selection input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    height: 0;
    width: 0;
}

.selection label {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    height: 32px;
    padding: 0 16px;
    box-sizing: border-box;
    background-color: rgb(var(--bg-subtle));
    border: 1px solid transparent;
    border-radius: var(--border-radius-circle);
}

.selection input:checked + label {
    border-color: rgb(var(--border-accent));
}

.call-to-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin: 16px 0 0 0;
}

.featured {
    color: rgb(var(--f-emphasis));
    font-weight: 600;
}

button {
    cursor: pointer;
    width: 100%;
    border: none;
    border-radius: var(--border-radius-circle);
    color: rgb(var(--f-default));
    background-color: rgb(var(--bg-subtle));
    padding: 8px 0;
    border: 1px solid transparent;
    box-sizing: border-box;
}

button.submit-btn {
    color: rgb(var(--f-default));
    background-color: rgb(var(--bg-accent));
    border-color: rgb(var(--border-accent));
}

button.delete-btn {
    color: rgb(var(--f-danger));
    background-color: transparent;
    margin: 16px 0 0 0;
}`;class le extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_type",null);o(this,"_paths",d.instance.paths);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(qe),this.shadowRoot.adoptedStyleSheets.push(e)}get type(){return this._type}set type(e){this._type=e}get paths(){return this._paths}set paths(e){this._paths=e}connectedCallback(){this.render(),this.update(),this.setup()}render(){}setup(){const e=this.shadowRoot.querySelector(".cancel-btn"),n=this.shadowRoot.querySelector(".form");e&&e.addEventListener("click",()=>this.dispatchEvent(new CustomEvent("close-dialog"))),n&&n.addEventListener("submit",s=>{s.preventDefault(),this.dispatchEvent(new CustomEvent("close-dialog"))})}update(){switch(this.type){case D.SortPois:this.renderSortPoisForm(),this.setupSortPoisForm();break;case D.AddPath:this.renderAddPathForm(),this.setupAddPathForm();break;case D.BookmarkPath:this.renderBookmarkPathForm(),this.setupBookmarkPathForm();break;case D.LoadPath:this.renderLoadPathForm(),this.setupLoadPathForm();break;default:this.renderEditPathForm(),this.setupEditPathForm();break}}renderSortPoisForm(){this.shadowRoot.innerHTML=`
            <form class="form">
                <h4 class="title">Riordina</h4>
                <p>Riordinare i punti di interesse del percorso <span class="featured">${d.instance.selectedCustomPath.name}</span>?</p>
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Riordina</button>
                 </div>
            </form>
            `}setupSortPoisForm(){const e=this.shadowRoot.querySelector(".form");e&&e.addEventListener("submit",()=>{const n=w.instance.position;if(!n)return;const s=w.geolocationToCartographic(n),i=te.instance.nearestInsertion(d.instance.selectedCustomPath.pois,s),a=d.instance.selectedCustomPath;a.pois=i,d.instance.selectedCustomPath=a})}renderEditPathForm(){this.shadowRoot.innerHTML=`
            <form class="form">
                <h4 class="title">Modifica percorso</h4>
                <input type="text" name="path-name" class="path-name-input" placeholder="Nome percorso">
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Salva</button>
                </div>
                <button type="button" class="delete-btn">Elimina percorso</button>
            </form>
            `}setupEditPathForm(){const e=this.shadowRoot.querySelector("input");if(!e)return;const n=this.shadowRoot.querySelector(".delete-btn");if(!n)return;const s=this.shadowRoot.querySelector(".submit-btn");if(!s)return;const i=this.shadowRoot.querySelector(".form");if(!i)return;e.value=d.instance.selectedCustomPath.name;const a=()=>s.disabled=e.value.trim().length===0||d.instance.paths.some(l=>l.name===e.value.toLowerCase());e.addEventListener("input",a),e.addEventListener("change",a),i.addEventListener("submit",()=>{const p=new FormData(i).get("path-name");p&&d.instance.editPath(p.toString())}),n.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("close-dialog")),d.instance.deletePath()})}renderAddPathForm(){this.shadowRoot.innerHTML=`
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
            `}setupAddPathForm(){const e=this.shadowRoot.querySelector("input");if(!e)return;const n=this.shadowRoot.querySelector(".submit-btn");if(!n)return;const s=this.shadowRoot.querySelector(".form");if(!s)return;e.value.length===0&&(n.disabled=!0);const i=()=>{n.disabled=e.value.trim().length===0||d.instance.paths.some(a=>a.name===e.value.toLowerCase())};e.addEventListener("input",i),e.addEventListener("change",i),s.addEventListener("submit",()=>d.instance.saveNewPath(e.value))}renderBookmarkPathForm(){var e;this.shadowRoot.innerHTML=`
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
            `;const e=this.shadowRoot.querySelector(".list");e&&this.paths.forEach(n=>{const s=this.createRadioBtn(n);e.appendChild(s)})}setupLoadPathForm(){const e=this.shadowRoot.querySelector(".form");e&&e.addEventListener("submit",()=>{const s=new FormData(e).get("saved-paths");s&&d.instance.loadPath(s.toString())})}createRadioBtn(e){const n=document.createElement("div"),s=document.createElement("input"),i=document.createElement("label");return n.classList.add("selection"),s.type="radio",s.name="saved-paths",s.id=e.name.replace(" ",""),s.value=e.name.replace(" ",""),e.name===d.instance.selectedCustomPath.name&&(s.checked=!0),i.innerHTML=e.name,i.setAttribute("for",e.name.replace(" ","")),n.appendChild(s),n.appendChild(i),n}}customElements.define("app-custom-path-form",le);class de extends HTMLDialogElement{constructor(){super();o(this,"closeBtn",document.createElement("button"))}connectedCallback(){this.render(),this.setup(),this.showModal()}render(){this.closeBtn.innerHTML='<span class="material-symbols-outlined close-icon">close</span>',this.closeBtn.classList.add("close"),this.prepend(this.closeBtn)}setup(){const e=this.querySelector("button");e&&e.addEventListener("click",()=>this.close()),document.addEventListener("keydown",this.handleKeydown.bind(this));const n=this.querySelector("app-custom-path-form");n&&n.addEventListener("close-dialog",()=>this.close())}handleKeydown(e){e.key==="Escape"&&this.close()}close(){this.remove()}}customElements.define("app-dialog",de,{extends:"dialog"});const A=class A{constructor(){if(A._instance)return A._instance;A._instance=this}static get instance(){return A._instance||(A._instance=new A),A._instance}createDialog(){const t=new de;return t.setAttribute("is","app-dialog"),t}createFormDialog(t){const e=this.createDialog(),n=new le;n.type=t,e.appendChild(n),document.body.append(e)}};o(A,"_instance");let q=A;const Ge=`:host {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: rgb(var(--bg-default), 1);
    border-radius: var(--border-radius-m);
    gap: 8px;
    border: 1px solid transparent;
    box-sizing: border-box;
}

h4,
p {
    margin: 0;
}

button {
    cursor: pointer;
    height: 24px;
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    color: rgb(var(--f-default), 1);
    padding: 0;
    border-radius: var(--border-radius-s);

    &:hover {
        color: rgb(var(--f-emphasis), 1);
        background-color: rgb(var(--bg-subtle), 1);
    }
}

.change-order {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.order {
    color: rgb(var(--f-emphasis), 1);
    display: block;
    height: 24px;
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.info {
    flex: 1;
}

.title {
    color: rgb(var(--f-emphasis), 1);
    display: flex;
    align-items: center;
    gap: 8px;
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
    color: rgb(var(--f-default), 1);
    padding: 0 0 0 22px;
}

.remove-btn .material-symbols-outlined {
    font-size: 1.25rem;
}

.material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
    font-size: 1.5rem;
}`;class pe extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_poi",null);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Ge),this.shadowRoot.adoptedStyleSheets.push(e)}get poi(){return this._poi}set poi(e){this._poi=e}connectedCallback(){this.render(),this.update(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}update(){if(!this.poi)return;const e=this.shadowRoot.querySelector(".order");e&&(e.innerHTML=(d.instance.selectedCustomPath.pois.indexOf(this.poi)+1).toString());const n=this.shadowRoot.querySelector(".name");n&&(n.innerHTML=this.poi.name);const s=this.shadowRoot.querySelector(".legend");s&&(s.style.backgroundColor=h.rgbToRgba(h.hexToRgb(this.poi.layer.style.color),.5),s.style.borderColor=this.poi.layer.style.color);const i=this.shadowRoot.querySelector(".category");i&&this.poi.props.forEach(a=>{a.displayName==="Nome"?i.innerHTML=a.value:i.innerHTML=this.poi.name})}setup(){this.poi&&(this.addEventListener("click",()=>O.instance.selectedPoi=this.poi),this.setupOrderBtns(),this.setupRemoveBtn())}setupOrderBtns(){const e=this.shadowRoot.querySelector(".move-up");e&&e.addEventListener("click",s=>{s.stopPropagation(),this.changeOrder("up")});const n=this.shadowRoot.querySelector(".move-down");n&&n.addEventListener("click",s=>{s.stopPropagation(),this.changeOrder("down")})}changeOrder(e){if(!this.poi)return;let n=d.instance.selectedCustomPath,s=[...n.pois],i=d.instance.selectedCustomPath.pois.indexOf(this.poi);s.splice(i,1),e==="up"?s.splice(i-1,0,this.poi):s.splice(i+1,0,this.poi),n.pois=s,d.instance.selectedCustomPath=n}setupRemoveBtn(){if(!this.poi)return;const e=this.shadowRoot.querySelector(".remove-btn");e&&e.addEventListener("click",n=>{n.stopPropagation();let s=d.instance.selectedCustomPath.pois.indexOf(this.poi),i=d.instance.selectedCustomPath;i.pois.splice(s,1),d.instance.selectedCustomPath=i})}}customElements.define("app-custom-path-card",pe);const $e=`:host {
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
    color: rgb(var(--f-emphasis));
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
    scrollbar-color: rgb(var(--bg-muted), 1) transparent;
}

.custom-path-tools {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    width: 100%;
}

.tool-btn {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border: none;
    color: rgb(var(--f-emphasis), 1);
    background-color: rgb(var(--bg-default), 1);
    
    &:hover {
        background-color: rgb(var(--bg-emphasis), 1);
    }
    
    &:disabled {
        cursor: not-allowed;
        color: rgb(var(--f-muted), 1);

        &:hover {
            background-color: rgb(var(--bg-default), 1);
        }
    }
}

.material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
}`;class Je extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_path",d.instance.selectedCustomPath);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync($e),this.shadowRoot.adoptedStyleSheets.push(e)}get path(){return this._path}set path(e){this._path=e,this.update(),c.instance.publish("load-custom-path",this.path)}connectedCallback(){this.render(),this.setup(),this.update()}render(){this.shadowRoot.innerHTML=`
            <div class="header"><h4>Percorso selezionato: ${this.path.name}</h4></div>
            <div class="list"></div>
            <div class="custom-path-tools">
                <button type="button" class="tool-btn sort-btn"><span class="material-symbols-outlined">sort</span></button>
                <button type="button" class="tool-btn edit-btn"><span class="material-symbols-outlined">more_horiz</span></button>
                <button type="button" class="tool-btn add-btn"><span class="material-symbols-outlined">add</span></button>
                <button type="button" class="tool-btn bookmark-btn"><span class="material-symbols-outlined">bookmark</span></button>
                <button type="button" class="tool-btn load-btn"><span class="material-symbols-outlined">bookmarks</span></button>
            </div>
            `}setup(){const e=this.shadowRoot.querySelector(".sort-btn"),n=this.shadowRoot.querySelector(".edit-btn"),s=this.shadowRoot.querySelector(".add-btn"),i=this.shadowRoot.querySelector(".bookmark-btn"),a=this.shadowRoot.querySelector(".load-btn");e&&e.addEventListener("click",()=>q.instance.createFormDialog(D.SortPois)),n&&n.addEventListener("click",()=>q.instance.createFormDialog(D.EditPath)),s&&s.addEventListener("click",()=>q.instance.createFormDialog(D.AddPath)),i&&i.addEventListener("click",()=>q.instance.createFormDialog(D.BookmarkPath)),a&&a.addEventListener("click",()=>q.instance.createFormDialog(D.LoadPath)),c.instance.subscribe("selected-custom-path-updated",l=>{this.path=l})}update(){const e=this.shadowRoot.querySelector(".list");if(!e)return;e.innerHTML="",this.path.pois.forEach(s=>{let i=new pe;i.poi=s,e.appendChild(i)});const n=this.shadowRoot.querySelector(".edit-btn");n&&this.path.name==="default"&&(n.disabled=!0)}disconnectedCallback(){c.instance.unsubscribeAll("selected-custom-path-updated")}}customElements.define("app-custom-path-panel",Je);class Ue extends HTMLButtonElement{constructor(){super();o(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>G.instance.togglePhysicalMap()),c.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}disconnectedCallback(){c.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-map-type-btn",Ue,{extends:"button"});const We=`:host {
    position: fixed;
    bottom: 24px;
    right: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    animation: slideOut .3s ease-in-out forwards;
}

:host(.open) {
    animation: slideIn .3s ease-in-out forwards;
}

.fa-button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    padding: 16px;
    font-size: 1.4rem;
    color: rgb(var(--f-default));
    background-color: rgb(var(--bg-default));
    border: none;
    border-radius: var(--border-radius-m);

    &:hover {
        color: rgb(var(--f-emphasis));
        background-color: rgb(var(--bg-inset));
    }
}

.material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
}

@keyframes slideIn {
    from {
        right: 24px;
    }

    to {
        right: calc(24px + 360px);
    }
}

@keyframes slideOut {
    from {
        right: calc(24px + 360px);
    }

    to {
        right: 24px;
    }
}

@media screen and (max-width: 768px) {
    @keyframes slideIn {
        from {
            bottom: 24px;
        }

        to {
            bottom: calc(24px + 360px);
        }
    }

    @keyframes slideOut {
        from {
            bottom: calc(24px + 360px);
        }

        to {
            bottom: 24px;
        }
    }
}`;class Xe extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_isOpen",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(We),this.shadowRoot.adoptedStyleSheets.push(e)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){c.instance.subscribe("toggle-tabs",e=>this.isOpen=e)}disconnectedCallback(){c.instance.unsubscribeAll("toggle-tabs")}}customElements.define("app-map-controls",Xe);const Ke=`.page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    background-color: rgb(var(--bg-inset));
}

.box {
    max-width: 500px;
    max-height: 100%;
    padding: 32px;
    background-color: rgb(var(--bg-default));
    border-radius: var(--border-radius-l);
    box-sizing: border-box;
}

.header {
    text-align: center;
}

.logo {
    width: 40px;
}

h1 {
    color: rgb(var(--f-emphasis));
    font-size: 1.5rem;
    margin: 16px 0 0 0;
}

form {
    overflow: hidden;
}

.tags-wall {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    margin: 24px 0;
}

.chip {
    position: relative;
    white-space: nowrap;
}

input[type="checkbox"] {
    position: absolute;
    height: 0;
    width: 0;
    opacity: 0;
}

label {
    cursor: pointer;
    display: block;
    background-color: transparent;
    border: 1px solid rgb(var(--f-default));
    padding: 4px 8px;
    border-radius: var( --border-radius-circle);
}

input[type="checkbox"]:checked + label {
    color: rgb(var(--f-emphasis));
    border-color: rgb(var(--f-accent)); 
    background-color: rgb(var(--bg-subtle));   
}

button {
    cursor: pointer;
    width: 100%;
    border: none;
    border-radius: var(--border-radius-circle);
    color: rgb(var(--f-default));
    background-color: rgb(var(--bg-subtle));
    padding: 8px 0;
    border: 1px solid transparent;
    box-sizing: border-box;
}

button.submit-btn {
    color: rgb(var(--f-default));
    background-color: rgb(var(--bg-accent));
    border-color: rgb(var(--border-accent));
}`;class Ye extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_tags",[]);this.shadowRoot=this.attachShadow({mode:"closed"});const e=new CSSStyleSheet;e.replaceSync(Ke),this.shadowRoot.adoptedStyleSheets.push(e)}get tags(){return this._tags}set tags(e){this._tags=e}connectedCallback(){this.tags=_.instance.getAllTags(_.instance.data),this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="page">
                <div class="box">
                    <div class="header">
                        <img src="./images/RAISE_pictogram_no_bg.svg" alt="Raise logo" class="logo">
                        <h1>Ecco alcuni dati che potrebbero interessarti</h1>
                    </div>
                    <form>
                        <div class="tags-wall"></div>
                        <button type="submit" class="submit-btn">Continua</button>
                    </form>
                </div>
            </div>
            `;const e=this.shadowRoot.querySelector(".tags-wall");e&&this.tags.forEach(n=>{let s=this.createChip(n);e.append(s)})}setup(){const e=this.shadowRoot.querySelector("form");e&&e.addEventListener("submit",n=>{n.preventDefault();const s=new FormData(e),i=Array.from(s.getAll("tag"),l=>String(l));d.instance.setTags(i);const a=_.instance.filterLayersByTags(_.instance.data,i);d.instance.activeLayers=a,d.instance.benchLayers=[],window.location.hash="/map"})}createChip(e){let n=document.createElement("div");n.classList.add("chip");let s=document.createElement("input");s.type="checkbox",s.id=e.replace(" ","").toLowerCase(),s.name="tag",s.value=e,d.instance.tags.forEach(a=>{a===e&&(s.checked=!0)});let i=document.createElement("label");return i.setAttribute("for",e.replace(" ","").toLowerCase()),i.innerHTML=e.charAt(0).toUpperCase()+e.slice(1),n.append(s),n.append(i),n}}customElements.define("app-tags-wall",Ye);const Ze=document.querySelector("app-router"),Qe=new se("map",W.Page,()=>"<page-map></page-map>"),en=new se("index",W.Default,()=>"<page-tags></page-tags>"),nn=new se("404",W.NotFound,()=>"<div>404</div>"),tn=[Qe,en,nn];Ze.addRoutes(tn);d.instance.getTags();d.instance.getSavedLayers();d.instance.getCustomPaths();
