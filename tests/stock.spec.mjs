import { test, expect } from "@playwright/test";

test.describe("stock", () => {
  test("los agotados bloquean el botón y se anuncian", async ({ page }) => {
    await page.goto("/");

    const soldOut = page.locator('[data-product-card="xbox-series-x"]');
    await expect(soldOut.locator(".stock-note")).toHaveText("Agotado");
    await expect(soldOut.locator(".add-btn")).toBeDisabled();
    await expect(soldOut.locator(".add-btn")).toContainText("Agotado");

    await soldOut.locator(".add-btn").click({ force: true });
    await expect(page.locator("#cart-count")).toHaveText("0");
  });

  test("las últimas unidades limitan la cantidad del carrito", async ({ page }) => {
    await page.goto("/");

    const card = page.locator('[data-product-card="elden-ring"]');
    await expect(card.locator(".stock-note")).toHaveText("Últimas 2 unidades");

    await card.locator(".add-btn").click();
    await card.locator(".add-btn").click();
    await card.locator(".add-btn").click();

    await expect(page.locator("#cart-count")).toHaveText("2");

    await page.locator("#cart-open").click();
    const line = page.locator('#cart-items [data-cart-item="elden-ring"]');
    await expect(line).toHaveCount(1);
    await expect(line.locator(".cart-item-qty span")).toHaveText("2");
    await expect(line.locator('[data-cart-step="1"]')).toBeDisabled();
  });

  test("la ficha de un producto agotado no deja añadir", async ({ page }) => {
    await page.goto("/?producto=xbox-series-x");

    await expect(page.locator("#product-modal")).toHaveClass(/is-open/);
    await expect(page.locator("#product-modal-stock")).toHaveText("Agotado");
    await expect(page.locator("#modal-add")).toBeDisabled();
    await expect(page.locator("#modal-add-label")).toHaveText("Agotado");
    await expect(page.locator("#modal-qty-plus")).toBeDisabled();
  });

  test("la ficha modal avisa de las últimas unidades", async ({ page }) => {
    await page.goto("/?producto=spider-man-2");

    await expect(page.locator("#product-modal-stock")).toHaveText("Última unidad");
    await expect(page.locator("#modal-add")).toBeEnabled();

    await page.locator("#modal-add").click();

    await expect(page.locator("#cart-root")).toHaveClass(/is-open/);
    await expect(page.locator("#cart-count")).toHaveText("1");
  });
});
