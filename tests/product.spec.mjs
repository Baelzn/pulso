import { test, expect } from "@playwright/test";

test.describe("ficha de producto", () => {
  test("la página estática carga con sus metadatos", async ({ page }) => {
    await page.goto("/p/elden-ring.html");

    await expect(page.locator("h1")).toHaveText("Elden Ring");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/p\/elden-ring\.html$/
    );
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
      "href",
      "../manifest.webmanifest"
    );
    await expect(page.locator(".product-modal-stock")).toHaveText("Últimas 2 unidades");
    await expect(page.locator("[data-add-to-cart]")).toBeEnabled();
  });

  test("añadir desde la ficha comparte el carrito con la tienda", async ({ page }) => {
    await page.goto("/p/dualsense.html");

    await page.locator("[data-add-to-cart]").click();

    await expect(page.locator(".cart-count")).toHaveText("1");

    await page.goto("/");
    await expect(page.locator("#cart-count")).toHaveText("1");
  });

  test("la ficha de un agotado no muestra botón de compra", async ({ page }) => {
    await page.goto("/p/xbox-series-x.html");

    await expect(page.locator(".product-modal-stock")).toHaveText("Agotado");
    await expect(page.locator("[data-add-to-cart]")).toHaveCount(0);
    await expect(page.locator(".product-page-buy .btn-primary")).toBeDisabled();
  });

  test("?producto= abre la ficha y actualiza los metadatos", async ({ page }) => {
    await page.goto("/?producto=dualsense");

    await expect(page.locator("#product-modal")).toHaveClass(/is-open/);
    // La ficha modal comparte metadatos con su página estática equivalente.
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      /\/p\/dualsense\.html$/
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/p\/dualsense\.html$/
    );
    await expect(page).toHaveTitle(/DualSense/);

    await page.keyboard.press("Escape");

    await expect(page.locator("#product-modal")).not.toHaveClass(/is-open/);
    await expect(page).not.toHaveURL(/producto=/);
  });

  test("las páginas del catálogo existen y enlazan a la tienda", async ({ page }) => {
    await page.goto("/p/silksong.html");

    await expect(page.locator("h1")).toHaveText("Hollow Knight: Silksong");
    await expect(page.locator('a[href="../index.html?producto=silksong"]')).toBeVisible();
    await expect(page.locator(".product-page-related .related-card")).toHaveCount(3);
  });

  test("los favoritos se guardan entre recargas", async ({ page }) => {
    await page.goto("/");

    const card = page.locator('[data-product-card="hades-2"]');
    await card.locator("[data-fav]").click();
    await expect(card.locator("[data-fav]")).toHaveAttribute("aria-pressed", "true");

    await page.reload();

    await expect(page.locator('[data-product-card="hades-2"] [data-fav]')).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});
