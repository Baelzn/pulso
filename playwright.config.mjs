import { defineConfig, devices } from "@playwright/test";

/**
 * Tests de PULSO.
 *
 *   npm test          (headless)
 *   npm run test:ui   (modo interactivo)
 *
 * En local usa el Edge instalado en Windows (no descarga navegadores). En CI
 * (Linux) usa el Chromium que instala Playwright.
 */

const PORT = Number(process.env.PORT || 8123);
const baseURL = `http://127.0.0.1:${PORT}`;
const channel = process.env.CI ? undefined : "msedge";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL,
    locale: "es-ES",
    // El service worker cachea el sitio y falsearía los tests.
    serviceWorkers: "block",
    trace: "on-first-retry"
  },
  webServer: {
    command: `node tools/serve.mjs ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 20000
  },
  projects: [
    {
      name: channel ? "edge" : "chromium",
      use: { ...devices["Desktop Chrome"], ...(channel ? { channel } : {}) }
    }
  ]
});
