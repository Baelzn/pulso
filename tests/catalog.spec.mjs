import { test, expect } from "@playwright/test";

test.describe("catálogo y filtros", () => {
  test("muestra los 18 productos sin errores de consola", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/");

    await expect(page.locator("#product-grid .product-card")).toHaveCount(18);
    await expect(page.locator("#result-count")).toHaveText("18 productos");
    await expect(page.locator('[data-filter-count="all"]')).toHaveText("18");
    expect(errors).toEqual([]);
  });

  test("filtra por categoría y lo refleja en la URL", async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-filter="juegos"]').click();

    await expect(page.locator("#product-grid .product-card")).toHaveCount(11);
    await expect(page).toHaveURL(/categoria=juegos/);
    await expect(page.locator('[data-filter="juegos"]')).toHaveClass(/is-active/);
  });

  test("filtra por plataforma y por precio", async ({ page }) => {
    await page.goto("/?plataforma=switch&precio=menos50");

    await expect(page.locator("#product-grid .product-card")).toHaveCount(2);
    await expect(page.locator("#product-grid .product-title")).toHaveText([
      "Hades II",
      "Hollow Knight: Silksong"
    ]);
    await expect(page.locator('[data-platform="switch"]')).toHaveClass(/is-active/);
    await expect(page.locator('[data-price="menos50"]')).toHaveClass(/is-active/);

    await page.locator('[data-platform="all"]').click();
    await page.locator('[data-price="mas100"]').click();

    await expect(page.locator("#product-grid .product-card")).toHaveCount(3);
    await expect(page).toHaveURL(/precio=mas100/);
    await expect(page).not.toHaveURL(/plataforma=/);
  });

  test("combina filtros y muestra el estado vacío", async ({ page }) => {
    await page.goto("/?categoria=juegos&precio=mas100");

    await expect(page.locator("#product-grid .product-card")).toHaveCount(0);
    await expect(page.locator("#empty-state")).toBeVisible();
    await expect(page.locator("#result-count")).toHaveText("0 productos");

    await page.locator("#reset-filters").click();

    await expect(page.locator("#product-grid .product-card")).toHaveCount(18);
    await expect(page.locator("#empty-state")).toBeHidden();
    await expect(page).toHaveURL(/\/(\?.*)?$/);
  });

  test("busca y ordena por precio", async ({ page }) => {
    await page.goto("/?q=zelda");

    await expect(page.locator("#product-grid .product-card")).toHaveCount(1);
    await expect(page.locator("#product-grid .product-title")).toHaveText([
      "Zelda: Tears of the Kingdom"
    ]);

    await page.goto("/?orden=price-asc");
    await expect(page.locator("#product-grid .product-title").first()).toHaveText("Hollow Knight: Silksong");
    await expect(page.locator("#product-grid .product-title").last()).toHaveText("Xbox Series X");
    await expect(page.locator("#sort-select")).toHaveValue("price-asc");
  });

  test("restaura los filtros desde la URL al recargar", async ({ page }) => {
    await page.goto("/?categoria=juegos&plataforma=ps5&precio=menos50");

    await expect(page.locator("#product-grid .product-card")).toHaveCount(2);
    await expect(page.locator("#product-grid .product-title")).toHaveText([
      "Elden Ring",
      "The Last of Us Part II Remastered"
    ]);

    await page.reload();

    await expect(page.locator('[data-filter="juegos"]')).toHaveClass(/is-active/);
    await expect(page.locator('[data-platform="ps5"]')).toHaveClass(/is-active/);
    await expect(page.locator('[data-price="menos50"]')).toHaveClass(/is-active/);
    await expect(page.locator("#product-grid .product-card")).toHaveCount(2);
  });

  test("no hay desbordes horizontales en móvil", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );

    expect(overflow).toBeLessThanOrEqual(1);
    await expect(page.locator("[data-platform]").first()).toBeVisible();
  });
});
