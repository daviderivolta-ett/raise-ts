import { defineConfig } from 'vite';
import cesium from 'vite-plugin-cesium';
export default defineConfig({
    base: '/raise-ts/',
    plugins: [cesium()],
    build: {
        outDir: 'docs'
    },
    optimizeDeps: {
        exclude: ['cesium.js', 'vue-demi', '@vite/client', '@vite/env', 'd3']
    }
});