// Web components polyfills for Safari
import '@ungap/custom-elements';

// Models
import { Route, RouteType } from './models/route.model';

// Components
import './components/router.component';
import './pages/tags/page/tags.page';
import './pages/map/page/map.page';
import './pages/map/map/map.component';
import './pages/map/maplibre/maplibre.component';
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
import './pages/map/map-type-btn/map-type-btn.component';
import './pages/map/map-controls/map-controls.component';
import './pages/tags/tags-wall/tags-wall.component';
import './components/splash/splash.component';
import './pages/map/custom-path-download-btn/custom-path-download-btn.component';
import './pages/map/suggested-path-panel/suggested-path-panel.component';
import './pages/map/suggested-path-card/suggested-path-card.component';
import './pages/map/selected-suggested-path-panel/selected-suggested-path-panel.component';
import './pages/map/selected-suggested-path-card/selected-suggested-path-card.component';
import './pages/map/directions-btn/directions-btn.component';
import './pages/map/wheel-btn/wheel-btn.component';

// Classes
import { Router } from './components/router.component';
import { StorageService } from './services/storage.service';
import { ThemeService } from './services/theme.service';
import { MAP_COLORS_URLs } from './models/theme.model';

async function main(): Promise<void> {
    // Set theme
    await ThemeService.instance.fetchMapColors(MAP_COLORS_URLs);
    ThemeService.instance.getPreferColorScheme();

    // Local Storage
    StorageService.instance.getTags();
    StorageService.instance.getCsvPaths(2);
    StorageService.instance.getSavedLayers();
    StorageService.instance.getCustomPaths();

    // Routing
    const router: Router = document.querySelector('app-router') as Router;
    const indexRoute: Route = new Route('map', RouteType.Page, () => '<page-map></page-map>');
    const mapRoute: Route = new Route('index', RouteType.Default, () => '<page-tags></page-tags>');
    const notFoundRoute: Route = new Route('404', RouteType.NotFound, () => '<div>404</div>');

    const routes: Route[] = [indexRoute, mapRoute, notFoundRoute];
    router.addRoutes(routes);
}

main();