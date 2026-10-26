import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, money, ratingText, loadProducts, relatedTo } from "./products.mjs";

/**
 * Genera una página estática por producto en p/<id>.html, con sus propias
 * etiquetas para compartir y datos estructurados. El catálogo (index.html)
 * sigue siendo la aplicación con las fichas en modal.
 *
 *   node tools/build-pages.mjs
 */

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT_DIR = path.join(ROOT, "p");
const SHARE_DIR = path.join(ROOT, "assets", "img", "compartir");

const products = loadProducts();

const LOW_STOCK = 3;

const stockState = (product) =>
  product.stock <= 0 ? "out" : product.stock <= LOW_STOCK ? "low" : "in";

const stockLabel = (product) => {
  const state = stockState(product);
  if (state === "out") return "Agotado";
  if (state === "low") {
    return product.stock === 1 ? "Última unidad" : `Últimas ${product.stock} unidades`;
  }
  return "En stock";
};

const availability = (product) =>
  product.stock <= 0
    ? "https://schema.org/OutOfStock"
    : product.stock <= LOW_STOCK
      ? "https://schema.org/LimitedAvailability"
      : "https://schema.org/InStock";

const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const jsonld = (value) => JSON.stringify(value, null, 2);

const stars = (rating) => {
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100));
  return `<span class="stars" aria-hidden="true"><span class="stars-empty">★★★★★</span><span class="stars-fill" style="width:${percent}%">★★★★★</span></span>`;
};

const shareImage = (product) => {
  const file = path.join(SHARE_DIR, `${product.id}.jpg`);
  return fs.existsSync(file)
    ? `assets/img/compartir/${product.id}.jpg`
    : "assets/img/og-pulso.jpg";
};

function relatedMarkup(product) {
  return relatedTo(product, products)
    .map(
      (item) => `
        <a class="related-card" href="${esc(item.id)}.html">
          <span class="related-media"><img src="../${esc(item.image)}" alt="" width="54" height="54" loading="lazy" decoding="async"></span>
          <span class="related-body">
            <span class="related-name">${esc(item.name)}</span>
            <span class="related-price">${money.format(item.price)}</span>
          </span>
        </a>`
    )
    .join("");
}

function page(product) {
  const title = `${product.name} · ${product.categoryLabel} | PULSO`;
  const description = `${product.name} — ${product.description}`;
  const image = shareImage(product);
  const price = money.format(product.price);
  const stock = stockState(product);
  const buyButton =
    stock === "out"
      ? `          <button class="btn btn-primary" type="button" disabled>Agotado</button>`
      : `          <button class="btn btn-primary" type="button" data-add-to-cart="${esc(product.id)}" data-stock="${product.stock}">
            Añadir al carrito
            <svg class="od-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6"></path>
            </svg>
          </button>`;
  const detail = `${SITE}assets/img/${product.id}-detalle.webp`;
  const hasDetail = fs.existsSync(path.join(ROOT, "assets", "img", `${product.id}-detalle.webp`));
  const isGame = product.category === "juegos";
  const count = new Intl.NumberFormat("es-ES").format(product.reviews);

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tienda", item: SITE },
      {
        "@type": "ListItem",
        position: 2,
        name: product.categoryLabel,
        item: `${SITE}?categoria=${product.category}`
      },
      { "@type": "ListItem", position: 3, name: product.name, item: product.pageUrl }
    ]
  };

  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${product.pageUrl}#producto`,
        name: product.name,
        description: product.description,
        image: [`${SITE}${product.image}`, ...(hasDetail ? [detail] : [])],
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
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": `${SITE}#tienda` }
        }
      },
      breadcrumb
    ]
  };

  const thumbs = [
    `<button class="gallery-thumb" type="button" aria-pressed="true" aria-label="${isGame ? "Portada" : "Vista general"}" data-src="../${esc(product.image)}" data-alt="${esc(product.alt)}">
              <img src="../${esc(product.image)}" alt="" width="60" height="60" decoding="async">
            </button>`,
    ...(hasDetail
      ? [
          `<button class="gallery-thumb" type="button" aria-pressed="false" aria-label="${isGame ? "Captura" : "Detalle"}" data-src="../assets/img/${esc(product.id)}-detalle.webp" data-alt="${isGame ? "Captura" : "Detalle"} de ${esc(product.name)}">
              <img src="../assets/img/${esc(product.id)}-detalle.webp" alt="" width="60" height="60" decoding="async">
            </button>`
        ]
      : [])
  ].join("\n            ");

  return `<!DOCTYPE html>
<html lang="es-ES">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#0b0d0c">
  <link rel="manifest" href="../manifest.webmanifest">
  <link rel="apple-touch-icon" href="../assets/icons/apple-touch-icon.png">
  <meta name="description" content="${esc(description)}">
  <title>${esc(title)}</title>

  <!-- Demo en GitHub Pages; si usas otro dominio, cámbialo en tools/products.mjs. -->
  <link rel="canonical" href="${esc(product.pageUrl)}">

  <meta property="og:type" content="product">
  <meta property="og:site_name" content="PULSO">
  <meta property="og:locale" content="es_ES">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${esc(product.pageUrl)}">
  <meta property="og:image" content="${SITE}${esc(image)}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(product.name)} en PULSO">
  <meta property="product:price:amount" content="${product.price.toFixed(2)}">
  <meta property="product:price:currency" content="EUR">
  <meta property="product:availability" content="${stock === "out" ? "oos" : "instock"}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${SITE}${esc(image)}">
  <meta name="twitter:image:alt" content="${esc(product.name)} en PULSO">

  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23d6ff4f'/%3E%3Cpath d='M19 49V15h17c9 0 14 5 14 13s-5 13-14 13h-7v8H19Zm10-17h7c3 0 5-1 5-4s-2-4-5-4h-7v8Z' fill='%230b0d0c'/%3E%3C/svg%3E">
  <link rel="stylesheet" href="../styles.css">
  <script src="../product-page.js" defer></script>

  <script type="application/ld+json">
${jsonld(structured)}
  </script>
</head>
<body class="product-page-body">
  <a class="skip-link" href="#producto">Saltar al producto</a>

  <div class="demo-strip">
    <p>Prototipo de tienda · Precios y disponibilidad de demostración</p>
  </div>

  <header class="site-header">
    <div class="header-inner shell">
      <a class="brand" href="../index.html" aria-label="PULSO, volver a la tienda">
        <span class="brand-mark" aria-hidden="true">P</span>
        <span class="brand-type">
          <strong>PULSO</strong>
          <small>Gaming store</small>
        </span>
      </a>

      <nav class="primary-nav" aria-label="Navegación principal">
        <a href="../index.html#catalogo">Catálogo</a>
        <a href="../index.html?categoria=consolas">Consolas</a>
        <a href="../index.html?categoria=juegos">Juegos</a>
        <a href="../index.html?categoria=mandos">Mandos</a>
        <a href="../index.html?categoria=accesorios">Accesorios</a>
      </nav>

      <div class="header-actions">
        <a class="cart-trigger" href="../index.html?carrito=1" aria-label="Abrir carrito, 0 artículos">
          <svg class="od-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5.5 8.5h13l-1 12h-11l-1-12Z"></path>
            <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5"></path>
          </svg>
          <span class="cart-count" data-cart-count aria-live="polite">0</span>
        </a>
      </div>
    </div>
  </header>

  <main class="product-page shell" id="producto">
    <nav class="breadcrumb" aria-label="Miga de pan">
      <ol>
        <li><a href="../index.html">Tienda</a></li>
        <li><a href="../index.html?categoria=${esc(product.category)}">${esc(product.categoryLabel)}s</a></li>
        <li aria-current="page">${esc(product.name)}</li>
      </ol>
    </nav>

    <article class="product-modal-card product-page-card">
      <div class="product-modal-media">
        ${product.badge ? `<span class="product-modal-badge">${esc(product.badge)}</span>` : ""}
        <div class="product-gallery">
          <div class="product-gallery-stage">
            <img id="product-image" src="../${esc(product.image)}" alt="${esc(product.alt)}" width="${product.width}" height="${product.height}">
          </div>
          <div class="product-gallery-thumbs" role="group" aria-label="Vistas del producto">
            ${thumbs}
          </div>
        </div>
      </div>

      <div class="product-modal-info">
        <p class="product-modal-kicker">${esc(product.categoryLabel)}</p>
        <h1>${esc(product.name)}</h1>
        <p class="product-modal-platform"><span>${esc(product.platform)}</span></p>
        <p class="product-modal-rating">
          <span class="sr-only">Valoración ${ratingText(product.rating)} de 5, ${count} valoraciones</span>
          ${stars(product.rating)}
          <span class="product-modal-rating-text" aria-hidden="true"><strong>${ratingText(product.rating)}</strong> · ${count} valoraciones</span>
        </p>
        <p class="product-modal-price">${price}</p>
        <p class="product-modal-stock is-${stock}">${esc(stockLabel(product))}</p>
        <p class="product-modal-description">${esc(product.description)}</p>

        <ul class="product-modal-features">
${product.features.map((feature) => `          <li>${esc(feature)}</li>`).join("\n")}
        </ul>

        <div class="product-page-buy">
${buyButton}
          <a class="btn btn-secondary" href="../index.html?producto=${esc(product.id)}">Abrir en la tienda</a>
        </div>
        <p class="product-modal-note">Precio con IVA incluido · Envío calculado en el carrito</p>
      </div>
    </article>

    <section class="product-page-related" aria-labelledby="relacionados">
      <h2 id="relacionados">También te puede interesar</h2>
      <div class="product-related-list">${relatedMarkup(product)}
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="shell">
      <div class="footer-bottom">
        <p>© 2026 PULSO. Prototipo de tienda.</p>
        <p><a href="../index.html">Volver a la tienda</a> · Sin transacciones reales.</p>
      </div>
    </div>
  </footer>

  <div class="toast" id="toast" role="status" aria-live="polite" aria-atomic="true"></div>
</body>
</html>
`;
}

function buildSitemap() {
  const urls = [
    { loc: SITE, priority: "1.0" },
    ...products.map((product) => ({ loc: product.pageUrl, priority: "0.8" }))
  ];

  const body = urls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join("\n");

  fs.writeFileSync(
    path.join(ROOT, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
    "utf8"
  );

  return urls.length;
}

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const product of products) {
  fs.writeFileSync(path.join(OUT_DIR, `${product.id}.html`), page(product), "utf8");
  console.log(`p/${product.id}.html`);
}

console.log(`\n${products.length} páginas y sitemap con ${buildSitemap()} URLs.`);
