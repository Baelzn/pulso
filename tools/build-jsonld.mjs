import fs from "node:fs";
import { SITE, loadProducts } from "./products.mjs";

/**
 * Rellena el bloque JSON-LD de index.html a partir de PRODUCTS (app.js).
 * Los marcadores están en el <head>: <!-- JSONLD:START --> … <!-- JSONLD:END -->
 *
 *   node tools/build-jsonld.mjs         escribe en index.html
 *   node tools/build-jsonld.mjs --dry   solo imprime
 */

const HTML_PATH = new URL("../index.html", import.meta.url);
const products = loadProducts();

const LOW_STOCK = 3;

const availability = (product) =>
  product.stock <= 0
    ? "https://schema.org/OutOfStock"
    : product.stock <= LOW_STOCK
      ? "https://schema.org/LimitedAvailability"
      : "https://schema.org/InStock";

const store = {
  "@type": "Store",
  "@id": `${SITE}#tienda`,
  name: "PULSO",
  description: "Tienda de consolas, juegos y mandos. Prototipo de demostración.",
  url: SITE,
  image: `${SITE}assets/img/og-pulso.jpg`,
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Tarjeta de crédito",
  areaServed: { "@type": "Country", name: "España" }
};

const site = {
  "@type": "WebSite",
  "@id": `${SITE}#web`,
  url: SITE,
  name: "PULSO",
  inLanguage: "es-ES",
  publisher: { "@id": `${SITE}#tienda` }
};

const itemList = {
  "@type": "ItemList",
  name: "Catálogo PULSO",
  numberOfItems: products.length,
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: `${SITE}${product.image}`,
      url: product.pageUrl,
      sku: product.id,
      category: product.categoryLabel,
      brand: { "@type": "Brand", name: product.brand },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating.toFixed(1),
        reviewCount: product.reviews,
        bestRating: "5",
        worstRating: "1"
      },
      offers: {
        "@type": "Offer",
        url: product.pageUrl,
        price: product.price.toFixed(2),
        priceCurrency: "EUR",
        availability: availability(product),
        itemCondition: "https://schema.org/NewCondition"
      }
    }
  }))
};

const json = JSON.stringify(
  { "@context": "https://schema.org", "@graph": [store, site, itemList] },
  null,
  2
);

const block = `  <script type="application/ld+json">\n${json
  .split("\n")
  .map((line) => `  ${line}`)
  .join("\n")}\n  </script>`;

if (process.argv.includes("--dry")) {
  console.log(block);
  process.exit(0);
}

const html = fs.readFileSync(HTML_PATH, "utf8");
const MARK_A = "  <!-- JSONLD:START -->";
const MARK_B = "  <!-- JSONLD:END -->";
const a = html.indexOf(MARK_A);
const b = html.indexOf(MARK_B);

if (a < 0 || b < 0) throw new Error("Faltan los marcadores JSONLD en index.html");

fs.writeFileSync(
  HTML_PATH,
  html.slice(0, a) + MARK_A + "\n" + block + "\n" + MARK_B + html.slice(b + MARK_B.length),
  "utf8"
);

console.log(`JSON-LD: ${products.length} productos, ${(block.length / 1024).toFixed(1)} KB`);
