/// <reference types="vitest" />

import { defineConfig, mergeConfig } from "vite";
import viteConfig from "../vite.config";

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: "jsdom",
            setupFiles: ["./hermes-crypto/test/vitest.setup.ts"],
            globals: true,
            coverage: {
                provider: "v8",
                reporter: ["text", "json", "json-summary", "html"],
                reportOnFailure: true
            }
        }
    })
);
