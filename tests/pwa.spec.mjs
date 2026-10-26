import { test, expect } from "@playwright/test";
import { SITE } from "../tools/products.mjs";

test.describe("PWA y rutas", () => {
  test("el manifest es válido y los iconos existen", async ({ page, request }) => {
    await page.goto("/");

    const href = await page.locator('link[rel="manifest"]').getAttribute("href");
    expect(href).toBeTruthy();

    const response = await request.get(href);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/manifest+json");

    const manifest = await response.json();
    expect(manifest.name).toContain("PULSO");
    expect(manifest.display).toBe("standalone");
    expect(manifest.start_url).toBe("./");

    const sizes = manifest.icons.map((icon) => `${icon.sizes} ${icon.purpose || "any"}`);
    expect(sizes).toContain("192x192 any");
    expect(sizes).toContain("512x512 any");
    expect(sizes).toContain("512x512 maskable");

    for (const icon of manifest.icons) {
      const iconResponse = await request.get(`/${icon.src}`);
      expect(iconResponse.ok(), icon.src).toBeTruthy();
      expect(iconResponse.headers()["content-type"]).toContain("image/png");
    }
  });

  test("el service worker se sirve y precachea el shell", async ({ request }) => {
    const response = await request.get("/sw.js");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("text/javascript");

    const source = await response.text();
    expect(source).toContain("pulso-v");
    expect(source).toContain("cache.addAll");
    expect(source).toContain("networkFirst");

    for (const file of [
      "index.html",
      "styles.css",
      "app.js",
      "manifest.webmanifest",
      "assets/icons/icon-192.png",
      "assets/img/og-pulso.jpg"
    ]) {
      const asset = await request.get(`/${file}`);
      expect(asset.ok(), file).toBeTruthy();
    }
  });

  test("cada tarjeta de compartir existe para su producto", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const xml = await response.text();
    const pages = [...xml.matchAll(/<loc>([^<]+)\/p\/([^<]+)\.html<\/loc>/g)].map(
      (match) => match[2]
    );

    expect(pages.length).toBe(18);

    for (const id of pages) {
      const card = await request.get(`/assets/img/compartir/${id}.jpg`);
      expect(card.ok(), id).toBeTruthy();
      expect(card.headers()["content-type"]).toContain("image/jpeg");
    }
  });

  test("todas las URLs del sitemap responden", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const xml = await response.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

    expect(urls.length).toBe(19);

    for (const url of urls) {
      // El sitemap lleva URLs absolutas (GitHub Pages servirá el sitio en un
      // subdirectorio), así que probamos la ruta relativa a la raíz del sitio.
      expect(url.startsWith(SITE), url).toBeTruthy();
      const path = `/${url.slice(SITE.length)}`;
      const page = await request.get(path);
      expect(page.status(), path).toBe(200);
    }
  });
});
