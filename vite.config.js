import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA as pwa } from "vite-plugin-pwa";
import { viteSingleFile } from 'vite-plugin-singlefile'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    brotliSize: false,
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        manualChunks: () => 'everything.js'
      }
    }
  },
  plugins: [
    svelte(),
    pwa({
      strategies: "injectManifest",
      srcDir: "",
      filename: "service-worker.js",
      manifest: 
      {
        "name": "Vite PWA",
        "short_name": "Vite PWA",
        "description": "A Vite starter app ready-to-go as a Progressive Web App.",
        "background_color": "#5a0fc8",
        "theme_color": "#5a0fc8",
        "display": "standalone",
        "icons": [
          {
            "src": "/images/pwa/icon-maskable.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/images/pwa/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "/images/pwa/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "/images/pwa/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png"
          },
          {
            "src": "/images/pwa/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "/images/pwa/icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png"
          },
          {
            "src": "/images/pwa/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/images/pwa/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "/images/pwa/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      }
    }),
    viteSingleFile(),
    viteCompression(),
    viteClean()],
});

// clean up unused assets
function viteClean() {
  return {
      name: "vite:clean",
      transformIndexHtml: {
          enforce: "post",
          transform(html, ctx) {
              // Only use this plugin during build
              if (!ctx || !ctx.bundle)
                  return html;
              // Get the bundle
              for (const [, value] of Object.entries(ctx.bundle)) {
                  delete ctx.bundle[value.fileName]
              }
              return html
          },
      },
  };
}