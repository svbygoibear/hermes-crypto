import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    test: {
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "json-summary", "html"],
            reportOnFailure: true
        }
    },
    optimizeDeps: {
        include: [
          '@emotion/react', 
          '@emotion/styled', 
          '@mui/material/Tooltip'
        ],
      },
    plugins: [
        react({
            jsxImportSource: '@emotion/react',
            babel: {
              plugins: ['@emotion/babel-plugin'],
            },
          }),
        eslint({
            cache: false,
            include: ["./src/**/*.ts", "./src/**/*.tsx"],
            exclude: []
        }),
        svgr({
            svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
            include: ["./src/**/*.svg"]
        })
    ]
});
