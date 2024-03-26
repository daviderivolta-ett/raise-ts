// Models
import { Route, RouteType } from './models/Route.model';

// Components
import './components/router.component';
import './pages/tags/tags.page';
import './pages/map/page/map.page';
import './pages/map/map/map.component';
import './pages/map/map-mode-btn/map-mode-btn.component';
import './pages/map/map-theme-btn/map-theme-btn.component';
import './pages/map/center-position-btn/center-position-btn.component';
import './pages/map/searchbar/searchbar.component';
import './pages/map/search-result/search-result.component';
import './pages/map/search-result-chip/search-result-chip.component';
import './pages/map/tabs-toggle/tabs-toggle.component';
import './pages/map/tabs-sidenav/tabs-sidenav.component';
import './pages/map/carousel/carousel.component';
import './pages/map/carousel-chip/carousel-chip.component';
import './pages/map/bench/bench.component';
import './pages/map/bench-toggle/bench-toggle.component';
import './components/snackbar/snackbar.component';
import './pages/map/tabs/tabs.component';
import './pages/map/info-panel/info-panel.component';
import './pages/map/custom-path-panel/custom-path-panel.component';
import './pages/map/dialog/dialog.component';
import './pages/map/custom-path-form/custom-path-form.component';

// Classes
import { Router } from './components/router.component';
import { StorageService } from './services/storage.service';
import { Path } from './models/Path.model';

// Routing
const router: Router = document.querySelector('app-router') as Router;
const indexRoute: Route = new Route('map', RouteType.Page, () => '<page-map></page-map>');
const mapRoute: Route = new Route('index', RouteType.Default, () => '<page-tags></page-tags>');
const notFoundRoute: Route = new Route('404', RouteType.NotFound, () => '<div>404</div>');

const routes: Route[] = [indexRoute, mapRoute, notFoundRoute];
router.addRoutes(routes);

// Local Storage
StorageService.instance.getSavedLayers();
console.log(StorageService.instance.layers);
StorageService.instance.getCustomPaths();
if (!StorageService.instance.paths.some((path: Path) => path.name === 'default')) StorageService.instance.saveNewPath('default');
const selectedPath: Path | undefined = StorageService.instance.paths.find((path: Path) => path.lastSelected === true);
if (selectedPath) StorageService.instance.selectedCustomPath = selectedPath;