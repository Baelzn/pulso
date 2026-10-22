import fs from "node:fs";

/**
 * Datos compartidos por los scripts de `tools/`.
 * La fuente de verdad sigue siendo PRODUCTS en app.js: aquí solo se lee.
 */

export const SITE = "https://pulso.example/";

export const BRANDS = {
  "ps5": "Sony",
  "dualsense": "Sony",
  "elden-ring": "FromSoftware",
  "xbox-series-x": "Microsoft",
  "cyberpunk-2077": "CD Projekt",
  "xbox-controller": "Microsoft",
  "switch-oled": "Nintendo",
  "baldurs-gate-3": "Larian Studios",
  "switch-pro": "Nintendo",
  "forza-horizon-5": "Xbox Game Studios",
  "spider-man-2": "Insomniac Games",
  "charging-station": "Sony"
};

export const money = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR"
});

export const ratingText = (value) => Number(value).toFixed(1).replace(".", ",");

export function loadProducts() {
  const source = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8");
  const start = source.indexOf("const PRODUCTS = [");
  const end = source.indexOf("\n  ];", start);

  if (start < 0 || end < 0) throw new Error("No encuentro PRODUCTS en app.js");

  const listText = source.slice(source.indexOf("[", start), end + 4);
  const products = new Function(`return ${listText}`)();

  return products.map((product) => ({
    ...product,
    brand: BRANDS[product.id] || "PULSO",
    page: `p/${product.id}.html`,
    pageUrl: `${SITE}p/${product.id}.html`
  }));
}

/** Los más parecidos: misma categoría primero y mejor valorados. */
export function relatedTo(product, products, limit = 3) {
  return products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => {
      const sameA = a.category === product.category ? 1 : 0;
      const sameB = b.category === product.category ? 1 : 0;
      return sameB - sameA || b.rating - a.rating;
    })
    .slice(0, limit);
}
