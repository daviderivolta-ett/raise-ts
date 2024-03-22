var K=Object.defineProperty;var Z=(o,n,e)=>n in o?K(o,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[n]=e;var i=(o,n,e)=>(Z(o,typeof n!="symbol"?n+"":n,e),e);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();var M=(o=>(o.Default="default",o.Page="page",o.NotFound="not-found",o))(M||{});class V{constructor(n,e,t){i(this,"url");i(this,"type");i(this,"routing");this.url=n,this.type=e,this.routing=t}}class Y extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"routes",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){window.addEventListener("hashchange",()=>{this.checkRoute()})}addRoutes(e){this.routes=[...e],this.checkRoute()}checkRoute(){const e=window.location.hash.slice(2);this.changeRoute(e)}changeRoute(e){if(e){const t=this.routes.findIndex(s=>s.url===e);this.shadowRoot.innerHTML=this.routes[t]?this.routes[t].routing():this.sendNotFound()}else{const t=this.routes.filter(s=>s.type===M.Default);t?window.location.hash="#/"+t[0].url:this.sendNotFound()}}sendNotFound(){const e=this.routes.filter(t=>t.type===M.NotFound);return e.length===0||(window.location.hash="#/"+e[0].url,this.changeRoute(e[0].url)),"404: Not found"}}customElements.define("app-router",Y);class X extends HTMLElement{constructor(){super();i(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){this.shadowRoot.innerHTML="<p>TAGS PAGE</p>"}}customElements.define("page-tags",X);class H{constructor(n,e){i(this,"color");i(this,"opacity");this.color=n,this.opacity=e}static createEmpty(){return new H("",0)}}class z{constructor(n,e,t){i(this,"propertyName");i(this,"displayName");i(this,"type");this.propertyName=n,this.displayName=e,this.type=t}static createEmpty(){return new z("","","string")}}var I=(o=>(o.String="string",o.Image="image",o.Number="number",o))(I||{});class L{constructor(n,e,t,s,r,a){i(this,"name");i(this,"layer");i(this,"url");i(this,"style");i(this,"tags");i(this,"relevantProperties");this.name=n,this.layer=e,this.url=t,this.style=s,this.tags=r,this.relevantProperties=a}static createEmpty(){return new L("","","",H.createEmpty(),[],[z.createEmpty()])}}const m=class m{constructor(){i(this,"CATEGORIES_URL","./json/categories.json");i(this,"_data");if(m._instance)return m._instance;m._instance=this}static get instance(){return m._instance||(m._instance=new m),m._instance}get data(){return this._data}set data(n){this._data=n}async getData(){if(this.data)return this.data;{let n=await this.fetchAppData(this.CATEGORIES_URL);return n=this.parseData(n),this.data=n,n}}async fetchAppData(n){try{const e=await fetch(n).then(s=>s.json()),t=await Promise.all(e.categories.map(async s=>{const r=await Promise.all(s.groups.map(async a=>{if(typeof a=="string")try{const p=await fetch(a);if(p.ok)return p.json();throw new Error("Errore durante il recupero dei dati.")}catch(p){return console.error(p),null}else return a}));return s.groups=r,s}));return{...e,categories:t}}catch(e){throw console.error("Errore durante il recupero dei dati JSON.",e),e}}parseData(n){return{categories:n.categories.map(t=>({name:t.name,groups:t.groups.map(s=>this.parseGroup(s))}))}}parseGroup(n){return Array.isArray(n)?n:{name:n.name,layers:n.layers.map(e=>this.parseLayer(e))}}parseLayer(n){return new L(n.name,n.layer,n.url=n.layer_url_wfs,new H(n.style.color,n.style.opacity),n.tags,n.relevant_properties.map(e=>{let t=z.createEmpty();switch(t.displayName=e.display_name,t.propertyName=e.property_name,e.type){case"image":t.type=I.Image;break;case"number":t.type=I.Number;break;default:t.type=I.String;break}return t}))}getAllLayers(n){const e=[];return n.categories.map(t=>{t.groups.map(s=>{typeof s!="string"&&s.layers.map(r=>{e.push(r)})})}),e}filterLayersByNameAndTag(n,e){let t=[];return t=n.categories.flatMap(s=>s.groups.flatMap(r=>typeof r=="string"?[L.createEmpty()]:r.layers.filter(a=>a.name.toLowerCase().includes(e)||a.tags.some(p=>p.includes(e))))),t}};i(m,"_instance");let B=m;class ${constructor(n,e,t){i(this,"url");i(this,"layer");i(this,"credit");this.url=n,this.layer=e,this.credit=t}}var E=(o=>(o.Point="Point",o.LineString="LineString",o.Polygon="Polygon",o.MultiPoint="MultiPoint",o.MultiLineString="MultiLineString",o.MultiPolygon="MultiPolygon",o))(E||{});const b=class b{constructor(){i(this,"listeners",{});if(b._instance)return b._instance;b._instance=this}static get instance(){return b._instance||(b._instance=new b),b._instance}subscribe(n,e){this.listeners[n]||(this.listeners[n]=[]),this.listeners[n].push(e)}publish(n,e){this.listeners[n]&&this.listeners[n].forEach(t=>t(e))}};i(b,"_instance");let c=b;var P=(o=>(o.Loader="loader",o.Temporary="temporary",o.Error="error",o.Info="info",o))(P||{});const Q=`:host {
    position: relative;
    width: 300px;
    height: 100px;
    background-color: white;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
}

.loader {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    animation: rotate 1s linear infinite
}

.loader::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid black;
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
    height: 4px;
    background-color: red;
    transform-origin: left;
    animation: reducingBar var(--snackbar-duration) linear forwards;
}

@keyframes reducingBar {
    to {
        transform: scaleX(0);
    }
}`;class q extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"snackbarType",P.Info);i(this,"message","");i(this,"duration",0);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Q),this.shadowRoot.adoptedStyleSheets.push(e)}connectedCallback(){this.render()}render(){switch(this.shadowRoot.innerHTML=`<p class="message">${this.message}</p>`,this.snackbarType){case P.Error:this.renderErrorSnackbar();break;case P.Loader:this.renderLoaderSnackbar();break;case P.Temporary:this.renderTemporarySnackbar();break;default:this.renderInfoSnackbar();break}}renderInfoSnackbar(){this.createDismissButton()}renderLoaderSnackbar(){const e=document.createElement("div");e.classList.add("loader"),this.shadowRoot.append(e)}renderErrorSnackbar(){this.createDismissButton()}renderTemporarySnackbar(){this.createDismissButton();const e=document.createElement("span");e.classList.add("bar"),e.style.setProperty("--snackbar-duration",`${this.duration}s`),this.shadowRoot.append(e),setTimeout(()=>this.remove(),this.duration*1e3)}createDismissButton(){const e=document.createElement("button");e.innerHTML='<span class="material-symbols-outlined">close</span>',this.shadowRoot.append(e),e.addEventListener("click",()=>this.remove())}}customElements.define("app-snackbar",q);const g=class g{constructor(){i(this,"snackbars",[]);i(this,"container",null);if(g._instance)return g._instance;g._instance=this}static get instance(){return g._instance||(g._instance=new g),g._instance}createSnackbar(n,e,t,s){if(this.container=document.querySelector(".snackbar-container"),!this.container)return;const r=new q;r.id=e.replace(/[^a-zA-Z0-9-_]/g,""),r.snackbarType=n,r.message=t,s&&(r.duration=s),this.container.append(r)}removeSnackbar(n){if(this.container=document.querySelector(".snackbar-container"),!this.container)return;const e=n.replace(/[^a-zA-Z0-9-_]/g,""),t=this.container.querySelector(`#${e}`);t&&t.remove()}};i(g,"_instance");let d=g;const f=class f{constructor(){i(this,"_viewer");i(this,"MAP_THEMES_URL","./json/themes.json");i(this,"mapThemes",[]);i(this,"currentTheme",0);i(this,"_activeLayers",[]);i(this,"_benchLayers",[]);if(f._instance)return f._instance;f._instance=this}static get instance(){return f._instance||(f._instance=new f),f._instance}get viewer(){return this._viewer}set viewer(n){this._viewer=n}get activeLayers(){return this._activeLayers}set activeLayers(n){this._activeLayers=n,c.instance.publish("active-layers-updated",this.activeLayers)}get benchLayers(){return this._benchLayers}set benchLayers(n){this._benchLayers=n,c.instance.publish("bench-layers-updated",this.benchLayers)}async getMapThemes(){if(this.mapThemes.length!==0)return this.mapThemes;{let n=await this.fetchMapThemes(this.MAP_THEMES_URL);return this.mapThemes=n,n}}async fetchMapThemes(n){let e=[];try{e=await fetch(n).then(t=>t.json()),e=e.map(t=>this.parseMapTheme(t))}catch(t){console.error(t)}return e}parseMapTheme(n){return new $(n.url,n.layer,n.credit)}addBaseLayers(n){n.forEach(e=>{this.viewer.imageryLayers.addImageryProvider(this.createImageryProvider(e))})}createImageryProvider(n){return new Cesium.WebMapTileServiceImageryProvider({url:n.url,layer:n.layer,credit:new Cesium.Credit(n.credit),tileMatrixSetID:"default",style:"default",format:"image/jpeg",maximumLevel:19})}setCameraToPosition(n){let e=this.viewer.camera.positionCartographic;e.height>2e6?e.height=2e3:e.height;let t=Cesium.Cartesian3.fromDegrees(8.934080815653985,44.40753207658791,2e3);n&&n instanceof GeolocationPosition&&(t=Cesium.Cartesian3.fromDegrees(n.coords.longitude,n.coords.latitude,e.height)),n&&n instanceof Cesium.Cartographic&&(t=Cesium.Cartesian3.fromRadians(n.longitude,n.latitude,e.height)),this.viewer.camera.flyTo({destination:t,orientation:{heading:Cesium.Math.toRadians(0),pitch:Cesium.Math.toRadians(-90),roll:0},duration:.5})}changeTheme(n){let e=this.viewer.imageryLayers.get(n);this.viewer.imageryLayers.raiseToTop(e)}checkUserPin(n){const e=this.viewer.entities.getById("user-pin");e?this.updateUserPin(e,n):this.createUserPin(n)}createUserPin(n){this.viewer.entities.add({name:"user-pin",id:"user-pin",position:Cesium.Cartesian3.fromDegrees(n.coords.longitude,n.coords.latitude,0),point:{pixelSize:8,color:Cesium.Color.BLUE.withAlpha(.5),outlineColor:Cesium.Color.BLUE,outlineWidth:1}})}updateUserPin(n,e){const t=()=>Cesium.Cartesian3.fromDegrees(e.coords.longitude,e.coords.latitude,0);n.position=new Cesium.ConstantPositionProperty(t())}changeMapMode(){this.viewer.scene.mode===Cesium.SceneMode.SCENE3D?this.viewer.scene.morphTo2D(1):this.viewer.scene.morphTo3D(1)}async addLayerToMap(n){try{const e=this.createGeoJson(n),t=await Cesium.GeoJsonDataSource.load(e);t.name=n.layer,this.viewer.dataSources.add(t),this.styleFeature(t,n.style)}catch(e){throw e}}isLayerOnMap(n){return this.viewer.dataSources.getByName(n.layer).length>0}addLayerToActiveLayers(n){this._activeLayers.unshift(n),this.activeLayers=[...this._activeLayers],this._benchLayers.some(t=>t.layer===n.layer)&&(this._benchLayers=this._benchLayers.filter(t=>t.layer!==n.layer),this.benchLayers=this._benchLayers)}removeLayerFromMap(n){this.viewer.dataSources.getByName(n.layer).forEach(t=>this.viewer.dataSources.remove(t))}removeLayerFromActiveLayers(n){this._activeLayers=this._activeLayers.filter(e=>e.layer!==n.layer),this.activeLayers=[...this._activeLayers]}removeLayer(n){this.viewer.dataSources.getByName(n.layer).forEach(t=>this.viewer.dataSources.remove(t)),this._activeLayers=this._activeLayers.filter(t=>t.layer!==n.layer),this.activeLayers=[...this._activeLayers]}addLayerToBench(n){this._benchLayers.unshift(n),this.benchLayers=[...this._benchLayers]}removeLayerFromBench(n){this._benchLayers=this._benchLayers.filter(e=>e.layer!==n.layer),this.benchLayers=this._benchLayers}async addLayer(n){if(this.isLayerOnMap(n))d.instance.createSnackbar(P.Temporary,"","Layer già presente",3);else try{d.instance.createSnackbar(P.Loader,n.layer,"Caricamento..."),await this.addLayerToMap(n),this.addLayerToActiveLayers(n),d.instance.removeSnackbar(n.layer)}catch{d.instance.removeSnackbar(n.layer),d.instance.createSnackbar(P.Error,"","Errore nel caricamento del layer")}}benchLayer(n){this.removeLayerFromMap(n),this.removeLayerFromActiveLayers(n),this.addLayerToBench(n)}async unbenchLayer(n){try{d.instance.createSnackbar(P.Loader,n.layer,"Caricamento..."),await this.addLayerToMap(n),this.removeLayerFromBench(n),this.addLayerToActiveLayers(n),d.instance.removeSnackbar(n.layer)}catch{d.instance.removeSnackbar(n.layer),d.instance.createSnackbar(P.Error,"","Errore nel caricamento del layer")}}async createGeoJson(n){const e=`${n.url}?service=WFS&typeName=${n.layer}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;let s=await(await fetch(e)).json(),r=this.substituteRelevantProperties(s,n);return this.createFeatureAdditionalProperties(r,n)}createFeatureAdditionalProperties(n,e){return n.features=n.features.map((t,s)=>{switch(t.properties.name=e.name+" "+s,t.properties.layer=e,t.geometry.type){case E.Point:t.properties.uuid=e.layer+t.geometry.coordinates[1]+t.geometry.coordinates[0];break;case(E.LineString||E.Polygon||E.MultiPoint):t.properties.uuid=e.layer+t.geometry.coordinates[0][1]+t.geometry.coordinates[0][0];break;default:t.properties.uuid=e.layer+t.geometry.coordinates[0][0][1]+t.geometry.coordinates[0][0][0];break}return t}),n}substituteRelevantProperties(n,e){return n.features.forEach(t=>{const s={};for(const r in t.properties){const a=e.relevantProperties.find(p=>p.propertyName===r);if(a){const p={displayName:a.displayName,type:a.type,value:t.properties[r]};s[r]=p}}t.properties=s}),n}styleFeature(n,e){n.entities.values.forEach(t=>{t.billboard&&this.stylePointFeature(t,e),t.polyline&&this.stylePolylineFeature(t,e),t.polygon&&this.stylePolygonFeature(t,e)})}stylePointFeature(n,e){return n.billboard=void 0,n.point=new Cesium.PointGraphics({pixelSize:8,color:Cesium.Color.fromCssColorString(e.color).withAlpha(.5),outlineColor:Cesium.Color.fromCssColorString(e.color),outlineWidth:1}),n}stylePolylineFeature(n,e){return n.polyline&&(n.polyline.material=new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(e.color)),n.polyline.width=new Cesium.ConstantProperty(2)),n}stylePolygonFeature(n,e){return n.polygon&&(n.polygon.material=new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(e.color).withAlpha(e.opacity)),n.polygon.outlineColor=new Cesium.ConstantProperty(Cesium.Color.fromCssColorString(e.color))),n}openGoogleMaps(n){const e=`https://www.google.it/maps/dir/?api=1&destination=${Cesium.Math.toDegrees(n.latitude)},${Cesium.Math.toDegrees(n.longitude)}`;window.open(e,"_blank")}};i(f,"_instance");let l=f;const y=class y{constructor(){i(this,"_position",null);if(y._instance)return y._instance;y._instance=this}get position(){return this._position}set position(n){this._position=n}static get instance(){return y._instance||(y._instance=new y),y._instance}async getUserPosition(){try{const n=await new Promise((e,t)=>{navigator.geolocation.getCurrentPosition(s=>{e(s)},s=>{t(s)})});this._position=n}catch{this._position=null}}static geolocationToCartographic(n){return new Cesium.Cartographic(n.coords.longitude,n.coords.latitude,n.coords.altitude||0)}};i(y,"_instance");let S=y;const ee=`/* packages/widgets/Source/shared.css */
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
`,w=class w{constructor(){i(this,"_isOpen",!1);if(w._instance)return w._instance;w._instance=this}static get instance(){return w._instance||(w._instance=new w),w._instance}get isOpen(){return this._isOpen}set isOpen(n){this._isOpen=n,c.instance.publish("toggle-tabs",this.isOpen),this.isOpen&&c.instance.publish("toggle-bench",!1)}};i(w,"_instance");let A=w;const x=class x{constructor(){i(this,"_isOpen",!1);if(x._instance)return x._instance;x._instance=this}static get instance(){return x._instance||(x._instance=new x),x._instance}get isOpen(){return this._isOpen}set isOpen(n){this._isOpen=n,c.instance.publish("toggle-bench",this.isOpen),this.isOpen&&c.instance.publish("toggle-tabs",!1)}};i(x,"_instance");let O=x;const ne=`.map {
    height: 100%;
}`;class N{constructor(n,e,t,s,r,a){i(this,"uuid");i(this,"name");i(this,"position");i(this,"type");i(this,"layer");i(this,"props");this.uuid=n,this.name=e,this.position=t,this.type=s,this.layer=r,this.props=a}static createEmpty(){return new N("","",Cesium.Cartographic.ZERO,"point",L.createEmpty(),[])}}class j{constructor(n,e,t){i(this,"displayName");i(this,"type");i(this,"value");this.displayName=n,this.type=e,this.value=t}static createEmpty(){return new j("",I.String,"")}}var R=(o=>(o.Point="point",o.Polyline="polyline",o.Polygon="polygon",o))(R||{}),h=(o=>(o.Info="info",o.SuggestedPath="suggested-path",o.CustomPath="custom-path",o))(h||{});const v=class v{constructor(){i(this,"_currentTab",h.Info);if(v._instance)return v._instance;v._instance=this}static get instance(){return v._instance||(v._instance=new v),v._instance}get currentTab(){return this._currentTab}set currentTab(n){this._currentTab=n,c.instance.publish("current-tab-updated",this.currentTab)}};i(v,"_instance");let _=v;const k=class k{constructor(){i(this,"_selectedPoi",null);if(k._instance)return k._instance;k._instance=this}static get instance(){return k._instance||(k._instance=new k),k._instance}get selectedPoi(){return this._selectedPoi}set selectedPoi(n){this._selectedPoi=n,c.instance.publish("selected-poi",this.selectedPoi),_.instance.currentTab=h.Info}parsePoi(n){let e=N.createEmpty();if(!n.properties)return e;let t=n.properties;return n.properties.propertyNames.forEach(r=>{if(t.hasProperty(r))switch(r){case"uuid":e.uuid=t[r].valueOf();break;case"layer":e.layer=t[r].valueOf();break;case"name":e.name=t[r].valueOf();break;default:let a=t[r].valueOf();e.props.push(this.parsePoiProperty(a));break}}),e.position=this.parsePoiPosition(n),e.type=this.parsePoiType(n),e}parsePoiPosition(n){let e=Cesium.Cartographic.ZERO;if(n.point&&n.position){let t=n.position.getValue(Cesium.JulianDate.now());t&&(e=Cesium.Cartographic.fromCartesian(t))}if(n.polyline&&n.polyline.positions){let t=n.polyline.positions.getValue(Cesium.JulianDate.now())[0];t&&(e=Cesium.Cartographic.fromCartesian(t))}if(n.polygon&&n.polygon.hierarchy){let t=n.polygon.hierarchy.getValue(Cesium.JulianDate.now());t&&(e=Cesium.Cartographic.fromCartesian(t))}return e}parsePoiProperty(n){let e=j.createEmpty();return n.displayName&&(e.displayName=n.displayName),n.type&&(e.type=n.type),n.value&&(e.value=n.value),e}parsePoiType(n){return n.polyline?R.Polyline:n.polygon?R.Polygon:R.Point}};i(k,"_instance");let T=k;class F extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"container",document.createElement("div"));i(this,"viewer");this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet,t=new CSSStyleSheet;e.replace(ne),t.replace(ee),this.shadowRoot.adoptedStyleSheets=[t,e]}connectedCallback(){this.render(),this.viewer&&(l.instance.viewer=this.viewer),this.setup()}render(){this.container.classList.add("map"),this.shadowRoot.append(this.container),Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjY2YmYxNy1mNTM2LTRlOWYtYTUyZC01ZmY0NjBhNzllMWEiLCJpZCI6MTY5MDU3LCJpYXQiOjE2OTU4ODQ4NzB9.bN66rOR5h37xuKVsuUSYRSLOGJy-34IhH9S1hr4NOOE",this.viewer=new Cesium.Viewer(this.container,{baseLayerPicker:!1,geocoder:!1,timeline:!1,animation:!1,homeButton:!1,navigationInstructionsInitiallyVisible:!1,navigationHelpButton:!1,sceneModePicker:!1,fullscreenButton:!1,infoBox:!1,sceneMode:Cesium.SceneMode.SCENE2D,mapMode2D:Cesium.MapMode2D.ROTATE,mapProjection:new Cesium.WebMercatorProjection})}setup(){this.viewer.screenSpaceEventHandler.setInputAction(e=>{this.mouseOver(e)},Cesium.ScreenSpaceEventType.MOUSE_MOVE),this.viewer.screenSpaceEventHandler.setInputAction(e=>{this.clickOnMap(e)},Cesium.ScreenSpaceEventType.LEFT_CLICK)}mouseOver(e){const t=e.endPosition;this.viewer.scene.pick(t)?document.body.style.cursor="pointer":document.body.style.cursor="default"}clickOnMap(e){const t=e.position,s=this.viewer.scene.pick(t);if(!s||!s.id){A.instance.isOpen=!1,O.instance.isOpen=!1;return}if(!(s.id instanceof Cesium.Entity))return;const r=s.id;O.instance.isOpen=!1,A.instance.isOpen=!0;const a=T.instance.parsePoi(r);T.instance.selectedPoi=a,l.instance.setCameraToPosition(a.position)}}customElements.define("app-map",F);const te=`.page {
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

button[is="app-searchbar"] {
    width: 100%;
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
}

.map-controls {
    animation: slideOut .3s ease-in-out forwards;
}

.map-controls.open {
    animation: slideIn .3s ease-in-out forwards;
}

button[is="app-map-mode-btn"] {
    position: fixed;
    bottom: 72px;
    right: 24px;
}

button[is="app-center-position-btn"] {
    cursor: pointer;
    position: fixed;
    bottom: 24px;
    right: 24px;
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
}`;class ie extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"map",new F);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(te),this.shadowRoot.adoptedStyleSheets.push(e)}async connectedCallback(){await B.instance.getData(),await l.instance.getMapThemes(),await S.instance.getUserPosition(),this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
                    </div>
                    <app-carousel></app-carousel>
                </div>
                <app-search-result></app-search-result>
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
                <app-tabs-sidenav></app-tabs-sidenav>
                <app-bench></app-bench>
            </div>
            `,this.map=this.shadowRoot.querySelector("app-map")}setup(){l.instance.addBaseLayers(l.instance.mapThemes),S.instance.position?(l.instance.setCameraToPosition(S.instance.position),l.instance.checkUserPin(S.instance.position)):l.instance.setCameraToPosition(null)}}customElements.define("page-map",ie);class se extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{l.instance.changeMapMode()}),c.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}}customElements.define("app-map-mode-btn",se,{extends:"button"});class oe extends HTMLButtonElement{constructor(){super()}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{l.instance.currentTheme++,l.instance.currentTheme>=l.instance.mapThemes.length&&(l.instance.currentTheme=0),l.instance.changeTheme(l.instance.currentTheme)})}}customElements.define("app-map-theme-btn",oe,{extends:"button"});class re extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.isOpen===!0?this.classList.add("open"):this.classList.remove("open")}connectedCallback(){this.setup()}setup(){this.addEventListener("click",async()=>{await S.instance.getUserPosition(),S.instance.position?(l.instance.setCameraToPosition(S.instance.position),l.instance.checkUserPin(S.instance.position)):l.instance.setCameraToPosition(null)}),c.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}}customElements.define("app-center-position-btn",re,{extends:"button"});class ae extends HTMLInputElement{constructor(){super()}connectedCallback(){this.setup()}setup(){this.addEventListener("input",()=>{let n={layers:[],searchValue:""};this.value===""||(n={layers:B._instance.filterLayersByNameAndTag(B._instance.data,this.value),searchValue:this.value}),c.instance.publish("search-layer",n)})}}customElements.define("app-searchbar",ae,{extends:"input"});class G extends HTMLButtonElement{constructor(){super();i(this,"_layer",L.createEmpty());i(this,"legend",document.createElement("span"))}get layer(){return this._layer}set layer(e){this._layer=e}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <div class="info">
                <span class="legend"></span>
                <label>${this.layer.name}</label>
            </div>
            <span class="icon add-icon">
                <span class="material-symbols-outlined">add</span>
            </span>
            `,this.legend=this.querySelector(".legend"),this.legend.style.backgroundColor=this._layer.style.color,this.legend.style.borderStyle="solid",this.legend.style.borderWidth="2px",this.legend.style.borderColor=this._layer.style.color}setup(){this.addEventListener("click",async()=>{await l.instance.addLayer(this.layer)})}}customElements.define("app-search-result-chip",G,{extends:"button"});const ce=`:host {
    display: none;
}

:host(.visible) {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.container {
    max-height: 192px;
    overflow-y: auto;
    padding: 24px 16px;
    background-color: white;
}

.material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
}
`,le=`button[is="app-search-result-chip"] {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

button[is="app-search-result-chip"] .info {
    display: flex;
    align-items: center;
}

button[is="app-search-result-chip"] .info .legend {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 100%;
}

button[is="app-search-result-chip"] .info label {
    cursor: pointer;
}`;class pe extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"container",document.createElement("div"));i(this,"_layers",[]);i(this,"_isVisible",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(ce);let t=new CSSStyleSheet;t.replaceSync(le),this.shadowRoot.adoptedStyleSheets=[e,t]}get layers(){return this._layers}set layers(e){this._layers=e,this.update()}get isVisible(){return this._isVisible}set isVisible(e){this._isVisible=e,this._isVisible===!0?this.classList.add("visible"):this.classList.remove("visible")}connectedCallback(){this.render(),this.setup()}render(){this.container.classList.add("container"),this.shadowRoot.append(this.container)}setup(){c.instance.subscribe("search-layer",e=>{if(this.container.innerHTML="",e.searchValue===""){this.isVisible=!1;return}this.isVisible=!0,this.layers=e.layers})}update(){if(this._layers.length===0){let e=document.createElement("p");e.innerHTML="Nessun livello trovato",this.container.append(e);return}this._layers.forEach(e=>{let t=new G;t.layer=e,t.setAttribute("is","app-search-result-chip"),this.container.append(t)})}}customElements.define("app-search-result",pe);class ue extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1);i(this,"icon");this.icon=this.querySelector(".material-symbols-outlined")}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e,this.update()}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{A.instance.isOpen=!this.isOpen}),c.instance.subscribe("toggle-tabs",e=>{this.isOpen=e})}update(){this.isOpen?this.icon.innerHTML="close":this.icon.innerHTML="menu"}}customElements.define("app-tabs-toggle",ue,{extends:"button"});const de=`:host {
    position: fixed;
    top: 0;
    right: -360px;
    width: 360px;
    height: 100vh;
    background-color: white;
    animation: slideOut .3s ease-in-out forwards;
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
}`;class he extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_isVisible",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(de),this.shadowRoot.adoptedStyleSheets.push(e)}get isVisible(){return this._isVisible}set isVisible(e){this._isVisible=e,this.update()}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML="<app-tabs></app-tabs>"}setup(){c.instance.subscribe("toggle-tabs",e=>{this.isVisible=e})}update(){this.isVisible===!0?this.classList.add("visible"):this.classList.remove("visible")}}customElements.define("app-tabs-sidenav",he);class U extends HTMLButtonElement{constructor(){super();i(this,"_layer",L.createEmpty());i(this,"legend",document.createElement("span"));i(this,"removeIcon",document.createElement("span"))}get layer(){return this._layer}set layer(e){this._layer=e}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <div class="info">
                <span class="legend"></span>
                <label>${this.layer.name}</label>
            </div>
            <span class="icon add-icon">
                <span class="material-symbols-outlined">delete</span>
            </span>
            `,this.legend=this.querySelector(".legend"),this.legend.style.backgroundColor=this._layer.style.color,this.legend.style.borderStyle="solid",this.legend.style.borderWidth="2px",this.legend.style.borderColor=this._layer.style.color,this.removeIcon=this.querySelector(".icon")}setup(){this.removeIcon.addEventListener("click",()=>{l.instance.benchLayer(this.layer),c.instance.publish("open-bench",!0)})}}customElements.define("app-carousel-chip",U,{extends:"button"});const me=`:host {
    background-color: white;
    display: flex;
    overflow-x: auto;
    max-width: calc(100% - 360px);
}

.material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
}`,be=`button[is="app-carousel-chip"] {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    text-wrap: nowrap;
}

button[is="app-carousel-chip"] .info {
    display: flex;
    align-items: center;
}

button[is="app-carousel-chip"] .info .legend {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 100%;
}

button[is="app-carousel-chip"] .info label {
    cursor: pointer;
}`;class ge extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_layers",[]);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(me);let t=new CSSStyleSheet;t.replaceSync(be),this.shadowRoot.adoptedStyleSheets=[e,t]}get layers(){return this._layers}set layers(e){this._layers=e,this.update()}connectedCallback(){this.setup()}setup(){c.instance.subscribe("active-layers-updated",e=>{this.layers=[...e]})}update(){this.shadowRoot.innerHTML="",this.layers.forEach(e=>{let t=new U;t.layer=e,t.setAttribute("is","app-carousel-chip"),this.shadowRoot.append(t)})}}customElements.define("app-carousel",ge);class W extends HTMLButtonElement{constructor(){super();i(this,"_layer",L.createEmpty());i(this,"info",document.createElement("div"));i(this,"legend",document.createElement("span"));i(this,"removeIcon",document.createElement("span"))}get layer(){return this._layer}set layer(e){this._layer=e}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <div class="info">
                <span class="legend"></span>
                <label>${this.layer.name}</label>
            </div>
            <span class="icon add-icon">
                <span class="material-symbols-outlined">delete</span>
            </span>
            `,this.info=this.querySelector(".info"),this.legend=this.querySelector(".legend"),this.legend.style.backgroundColor=this._layer.style.color,this.legend.style.borderStyle="solid",this.legend.style.borderWidth="2px",this.legend.style.borderColor=this._layer.style.color,this.removeIcon=this.querySelector(".icon")}setup(){this.addEventListener("click",()=>{l.instance.unbenchLayer(this.layer)}),this.removeIcon.addEventListener("click",e=>{e.stopPropagation(),l.instance.removeLayerFromBench(this.layer)})}}customElements.define("app-bench-chip",W,{extends:"button"});const fe=`:host {
    position: fixed;
    top: 0;
    right: -360px;
    width: 360px;
    height: 100vh;
    background-color: wheat;
    animation: slideOut .3s ease-in-out forwards;
}

:host(.visible) {
    animation: slideIn .3s ease-in-out forwards;
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
}`,ye=`button[is="app-bench-chip"] {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    text-wrap: nowrap;
}

button[is="app-bench-chip"] .info {
    display: flex;
    align-items: center;
}

button[is="app-bench-chip"] .info .legend {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 100%;
}

button[is="app-bench-chip"] .info label {
    cursor: pointer;
}`;class we extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_isVisible",!1);i(this,"_layers",[]);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(fe);let t=new CSSStyleSheet;t.replaceSync(ye),this.shadowRoot.adoptedStyleSheets=[e,t]}get isVisible(){return this._isVisible}set isVisible(e){this._isVisible=e,this.toggleBench()}get layers(){return this._layers}set layers(e){this._layers=e,this.update()}connectedCallback(){this.render(),this.setup()}render(){}setup(){c.instance.subscribe("bench-layers-updated",e=>{this.layers=[...e]}),c.instance.subscribe("toggle-bench",e=>{this.isVisible=e})}update(){this.shadowRoot.innerHTML="",this.layers.forEach(e=>{let t=new W;t.layer=e,t.setAttribute("is","app-bench-chip"),this.shadowRoot.append(t)})}toggleBench(){this.isVisible===!0?this.classList.add("visible"):this.classList.remove("visible")}}customElements.define("app-bench",we);class xe extends HTMLButtonElement{constructor(){super();i(this,"_isOpen",!1)}get isOpen(){return this._isOpen}set isOpen(e){this._isOpen=e}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{O.instance.isOpen=!this.isOpen}),c.instance.subscribe("toggle-bench",e=>{this.isOpen=e})}}customElements.define("app-bench-toggle",xe,{extends:"button"});const ve=`:host {
    display: block;
    height: 100%;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.tab {
    width: 100%;
}

.panel {
    height: 100%;
}`;class ke extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_currentTab",h.Info);i(this,"infoTab",null);i(this,"suggestedRouteTab",null);i(this,"customRouteTab",null);i(this,"panel",null);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(ve),this.shadowRoot.adoptedStyleSheets.push(e)}get currentTab(){return this._currentTab}set currentTab(e){this._currentTab=e,this.switchTab()}connectedCallback(){this.render(),this.setup(),this.currentTab=h.Info}render(){this.shadowRoot.innerHTML=`
            <nav class="header">
                <button class="tab info-tab">Info</button>
                <button class="tab suggested-route-tab">Percorsi suggeriti</button>
                <button class="tab custom-route-tab">Percorsi custom</button>
            </nav>
            <div class="panel"></div>
            `,this.infoTab=this.shadowRoot.querySelector(".info-tab"),this.suggestedRouteTab=this.shadowRoot.querySelector(".suggested-route-tab"),this.customRouteTab=this.shadowRoot.querySelector(".custom-route-tab"),this.panel=this.shadowRoot.querySelector(".panel")}setup(){this.infoTab&&this.infoTab.addEventListener("click",()=>this.currentTab=h.Info),this.suggestedRouteTab&&this.suggestedRouteTab.addEventListener("click",()=>this.currentTab=h.SuggestedPath),this.customRouteTab&&this.customRouteTab.addEventListener("click",()=>this.currentTab=h.CustomPath),c.instance.subscribe("current-tab-updated",e=>this.currentTab=e)}renderInfoPanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<app-info-panel></app-info-panel>")}renderSuggestedRoutePanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<p>SUGGESTED PATH</p>")}renderCustomPathPanel(){this.panel&&(this.panel.innerHTML="",this.panel.innerHTML="<app-custom-path-panel></app-custom-path-panel>")}switchTab(){switch(this.currentTab){case h.CustomPath:this.renderCustomPathPanel();break;case h.SuggestedPath:this.renderSuggestedRoutePanel();break;default:this.renderInfoPanel();break}}}customElements.define("app-tabs",ke);class D{constructor(n,e,t){i(this,"name");i(this,"pois");i(this,"lastSelected");this.name=n,this.pois=e,this.lastSelected=t}static createEmpty(){return new D("",[],!0)}static createDefault(){return new D("default",[],!0)}}const C=class C{constructor(){i(this,"_selectedCustomPath",D.createDefault());if(C._instance)return C._instance;C._instance=this}static get instance(){return C._instance||(C._instance=new C),C._instance}get selectedCustomPath(){return this._selectedCustomPath}set selectedCustomPath(n){this._selectedCustomPath=n,c.instance.publish("selected-custom-path-updated",this.selectedCustomPath),_.instance.currentTab=h.CustomPath}};i(C,"_instance");let u=C;const Ce=`:host {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.info {
    overflow-y: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.info-content {
    display: none;
    overflow-y: auto;
    flex: 1;
    box-sizing: border-box;
    padding: 24px;
}

.visible {
    display: block;
}`;class Pe extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_poi",T.instance.selectedPoi);i(this,"_isInfoOpen",!1);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Ce),this.shadowRoot.adoptedStyleSheets.push(e)}get poi(){return this._poi}set poi(e){this._poi=e,this.isInfoOpen=!1,this.update()}get isInfoOpen(){return this._isInfoOpen}set isInfoOpen(e){this._isInfoOpen=e,this.toggleInfo()}connectedCallback(){this.render(),this.setup(),this.poi&&this.update()}render(){this.shadowRoot.innerHTML="<p>Nessun punto selezionato</p>"}setup(){c.instance.subscribe("selected-poi",e=>{this.poi=e})}update(){if(!this.poi)return;this.shadowRoot.innerHTML=`
            <div class="header">
                <div class="title">
                    <span class="legend"></span>
                    <h4 class="name">${this.poi.name}</h4>
                </div>
                <p class="category"></p>
            </div>
            <div class="tools"></div>
            `;const e=this.shadowRoot.querySelector(".category"),t=this.shadowRoot.querySelector(".tools");this.poi.props.forEach(p=>{p.displayName==="Nome"?e.innerHTML=p.value:e.innerHTML=this.poi.name});const s=this.renderDirectionsBtn();s&&t.appendChild(s);const r=this.renderAddToRouteBtn();r&&t.append(r);const a=this.renderInfo();a&&this.shadowRoot.appendChild(a)}renderDirectionsBtn(){if(!this.poi)return null;const e=document.createElement("button");return e.innerHTML="Indicazioni",e.addEventListener("click",()=>l.instance.openGoogleMaps(this.poi.position)),e}renderAddToRouteBtn(){if(!this.poi||this.poi.type!==R.Point)return null;const e=document.createElement("button");return e.innerHTML="Aggiungi",e.addEventListener("click",()=>{const t=u.instance.selectedCustomPath;t.pois.unshift(this.poi),u.instance.selectedCustomPath=t}),e}renderInfo(){if(!this.poi)return null;const e=this.poi.props.filter(a=>a.displayName!=="Nome");if(e.length===0)return null;let t=document.createElement("div");t.classList.add("info");const s=this.renderMoreInfoBtn();t.appendChild(s);const r=document.createElement("div");return r.classList.add("info-content"),t.appendChild(r),e.forEach(a=>{const p=this.renderTopic(a);r.appendChild(p)}),t}renderMoreInfoBtn(){const e=document.createElement("button");return e.innerHTML="Leggi info",e.classList.add("toggle-info"),e.addEventListener("click",()=>this.isInfoOpen=!this.isInfoOpen),e}toggleInfo(){const e=this.shadowRoot.querySelector(".info-content"),t=this.shadowRoot.querySelector(".toggle-info");e&&t&&(this.isInfoOpen?e.classList.add("visible"):e.classList.remove("visible"),this.isInfoOpen?t.innerHTML="Mostra meno":t.innerHTML="Leggi info")}renderTopic(e){const t=document.createElement("div"),s=document.createElement("h4");s.innerHTML=e.displayName;const r=document.createElement("p");return e.value!==""?r.innerHTML=e.value:r.innerHTML="-",t.appendChild(s),t.appendChild(r),t}}customElements.define("app-info-panel",Pe);const Se=`:host {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    outline: 1px solid black;
}

.change-order {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.title {
    display: flex;
    align-items: center;
}

.legend {
    width: 16px;
    height: 16px;
    border-radius: 100%;
}`;class J extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_poi",null);this.shadowRoot=this.attachShadow({mode:"closed"});let e=new CSSStyleSheet;e.replaceSync(Se),this.shadowRoot.adoptedStyleSheets.push(e)}get poi(){return this._poi}set poi(e){this._poi=e}connectedCallback(){this.render(),this.update(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="change-order">
                <button class="arrow move-up">su</button>
                <span class="order"></span>
                <button class="arrow move-down">giù</button>
            </div>
            <div class="info">
                <div class="title">
                    <span class="legend"></span>
                    <h4 class="name"></h4>
                </div>
                <p class="category"></p>
            </div>
            <button class="remove-btn">X</button>
            `}update(){if(!this.poi)return;const e=this.shadowRoot.querySelector(".order");e&&(e.innerHTML=(u.instance.selectedCustomPath.pois.indexOf(this.poi)+1).toString());const t=this.shadowRoot.querySelector(".name");t&&(t.innerHTML=this.poi.name);const s=this.shadowRoot.querySelector(".legend");s&&(s.style.backgroundColor=this.poi.layer.style.color)}setup(){this.poi&&(this.addEventListener("click",()=>T.instance.selectedPoi=this.poi),this.setupOrderBtns(),this.setupRemoveBtn())}setupOrderBtns(){const e=this.shadowRoot.querySelector(".move-up");e&&e.addEventListener("click",s=>{s.stopPropagation(),this.changeOrder("up")});const t=this.shadowRoot.querySelector(".move-down");t&&t.addEventListener("click",s=>{s.stopPropagation(),this.changeOrder("down")})}changeOrder(e){if(!this.poi)return;let t=u.instance.selectedCustomPath,s=[...t.pois],r=u.instance.selectedCustomPath.pois.indexOf(this.poi);s.splice(r,1),e==="up"?s.splice(r-1,0,this.poi):s.splice(r+1,0,this.poi),t.pois=s,u.instance.selectedCustomPath=t}setupRemoveBtn(){if(!this.poi)return;const e=this.shadowRoot.querySelector(".remove-btn");e&&e.addEventListener("click",t=>{t.stopPropagation();let s=u.instance.selectedCustomPath.pois.indexOf(this.poi),r=u.instance.selectedCustomPath;r.pois.splice(s,1),u.instance.selectedCustomPath=r})}}customElements.define("app-custom-path-card",J);class Le extends HTMLElement{constructor(){super();i(this,"shadowRoot");i(this,"_path",u.instance.selectedCustomPath);this.shadowRoot=this.attachShadow({mode:"closed"})}get path(){return this._path}set path(e){this._path=e,this.update()}connectedCallback(){this.render(),this.setup(),this.update()}render(){this.shadowRoot.innerHTML=`
            <h4>Percorso selezionato: ${this.path.name}</h4>
            <div class="list"></div>
            `}setup(){c.instance.subscribe("selected-custom-path-updated",e=>{this.path=e})}update(){const e=this.shadowRoot.querySelector(".list");e&&(e.innerHTML="",this.path.pois.forEach(t=>{let s=new J;s.poi=t,e.appendChild(s)}))}}customElements.define("app-custom-path-panel",Le);const Me=document.querySelector("app-router"),Te=new V("map",M.Page,()=>"<page-map></page-map>"),Ee=new V("index",M.Default,()=>"<page-tags></page-tags>"),Ie=new V("404",M.NotFound,()=>"<div>404</div>"),Re=[Te,Ee,Ie];Me.addRoutes(Re);
