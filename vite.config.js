import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/feuille-de-match-ringuette/",

  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Ringuette Match",
        short_name: "Ringuette",
        description: "Feuille de match de ringuette",

        theme_color: "#0f172a",
        background_color: "#0f172a",

        display: "standalone",
        orientation: "portrait",

        start_url: "/feuille-de-match-ringuette/",
        scope: "/feuille-de-match-ringuette/",

        icons: [
          {
            src: "/feuille-de-match-ringuette/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/feuille-de-match-ringuette/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
});