import { test, expect } from "@playwright/test";

test.describe("carrito", () => {
  test("añadir, cambiar cantidad y eliminar", async ({ page }) => {
    await page.goto("/");

    await page.locator('[data-product-card="dualsense"] .add-btn').click();
    await expect(page.locator("#cart-count")).toHaveText("1");

    await page.locator("#cart-open").click();
    const line = page.locator('#cart-items [data-cart-item="dualsense"]');

    await expect(line).toHaveCount(1);
    await expect(line.locator(".cart-item-qty span")).toHaveText("1");

    await line.locator('[data-cart-step="1"]').click();
    await expect(line.locator(".cart-item-qty span")).toHaveText("2");
    await expect(page.locator("#cart-title-count")).toHaveText("(2)");

    await line.locator('[data-cart-step="-1"]').click();
    await expect(line.locator(".cart-item-qty span")).toHaveText("1");

    await line.locator("[data-cart-remove]").click();
    await expect(page.locator("#cart-empty")).toBeVisible();
    await expect(page.locator("#cart-count")).toHaveText("0");
  });

  test("el carrito sobrevive a una recarga", async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-product-card="ps5"] .add-btn').click();
    await expect(page.locator("#cart-count")).toHaveText("1");

    await page.reload();

    await expect(page.locator("#cart-count")).toHaveText("1");
    await page.locator("#cart-open").click();
    await expect(page.locator('#cart-items [data-cart-item="ps5"]')).toHaveCount(1);
  });

  test("?carrito=1 abre el carrito con el contenido guardado", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("pulso-cart-v1", JSON.stringify([{ id: "dualsense", qty: 2 }]));
    });

    await page.goto("/?carrito=1");

    await expect(page.locator("#cart-root")).toHaveClass(/is-open/);
    await expect(page.locator("#cart-title-count")).toHaveText("(2)");
    await expect(page.locator('#cart-items [data-cart-item="dualsense"]')).toHaveCount(1);
    // La URL se limpia para que recargar no reabra el carrito.
    await expect(page).not.toHaveURL(/carrito=1/);
  });

  test("el checkout de demostración cierra el pedido", async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-product-card="dualsense"] .add-btn').click();
    await page.locator("#cart-open").click();
    await page.locator("#checkout-open").click();

    await page.locator("#name").fill("Ada Lovelace");
    await page.locator("#email").fill("ada@example.com");
    await page.locator("#address").fill("Calle Mayor 1, 2B");
    await page.locator("#postal").fill("28001");
    await page.locator("#city").fill("Madrid");
    await page.locator("#card").fill("4242424242424242");
    await page.locator("#expiry").fill("12/30");
    await page.locator("#cvc").fill("123");

    await page.locator("#place-order").click();

    await expect(page.locator("#checkout-success")).toBeVisible();
    await expect(page.locator("#order-reference")).not.toBeEmpty();
    await expect(page.locator("#cart-count")).toHaveText("0");
  });

  test("un producto agotado no se puede añadir desde el carrito", async ({ page }) => {
    await page.goto("/?producto=xbox-series-x");
    await expect(page.locator("#modal-add")).toBeDisabled();

    await page.keyboard.press("Escape");
    await expect(page.locator("#cart-count")).toHaveText("0");
  });
});
