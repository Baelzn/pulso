import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { BRANDS, loadProducts, money, ratingText } from "./products.mjs";

/**
 * Genera las tarjetas de compartir (1200x630) de todos los productos.
 *
 *   node tools/build-cards.mjs
 *   node tools/build-cards.mjs elden-ring    (solo uno)
 *
 * Salida: assets/img/compartir/<id>.jpg
 * Si un producto no tiene tarjeta, las páginas usan og-pulso.jpg como respaldo.
 */

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const IMG = path.join(ROOT, "assets", "img");
const OUT = path.join(IMG, "compartir");
const LOW_STOCK = 3;

const products = loadProducts();
const only = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));

const xml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replace(/[^\x00-\x7F]/g, (ch) => `&#${ch.codePointAt(0)};`);

function wrap(text, max) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });

  if (line) lines.push(line);
  return lines;
}

function stockSuffix(product) {
  if (product.stock <= 0) return "Agotado";
  if (product.stock <= LOW_STOCK) {
    return product.stock === 1 ? "Última unidad" : `Últimas ${product.stock} unidades`;
  }
  return "";
}

function card(product) {
  const lines = wrap(product.name, 16);
  const nameY = 262;
  const lineHeight = 62;
  const priceY = nameY + (lines.length - 1) * lineHeight + 78;
  const ratingY = priceY + 40;
  const meta = [ratingText(product.rating), BRANDS[product.id] || "PULSO", stockSuffix(product)]
    .filter(Boolean)
    .join(" · ");

  const title = lines
    .map(
      (line, i) =>
        `<text x="80" y="${nameY + i * lineHeight}" font-family="Segoe UI, Arial, sans-serif" font-size="54" font-weight="800" letter-spacing="-1.4" fill="#ffffff">${xml(line)}</text>`
    )
    .join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="0.72" cy="0.45" r="0.55">
      <stop offset="0" stop-color="#2a3630"/>
      <stop offset="1" stop-color="#0b0d0c" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#0b0d0c"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <rect x="80" y="96" width="34" height="34" rx="9" fill="#d6ff4f"/>
  <text x="97" y="120" font-family="Segoe UI, Arial, sans-serif" font-size="19" font-weight="800" fill="#0b0d0c" text-anchor="middle">P</text>
  <text x="128" y="118" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="800" letter-spacing="1" fill="#ffffff">PULSO</text>
  <text x="129" y="134" font-family="Segoe UI, Arial, sans-serif" font-size="10" font-weight="600" letter-spacing="3" fill="#8f9a8f">GAMING STORE</text>

  <text x="80" y="196" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="3.4" fill="#d6ff4f">${xml(product.categoryLabel.toUpperCase())}</text>

  ${title}

  <text x="80" y="${priceY}" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="700" fill="#d6ff4f">${xml(money.format(product.price))}</text>

  <text x="80" y="${ratingY}" font-family="Segoe UI, Arial, sans-serif" font-size="17" font-weight="500" fill="#a7afa7">${xml(`★ ${meta}`)}</text>

  <rect x="0" y="626" width="1200" height="4" fill="#d6ff4f"/>
</svg>`;
}

fs.mkdirSync(OUT, { recursive: true });

const selected = only.length
  ? products.filter((product) => only.includes(product.id))
  : products;

if (!selected.length) {
  console.error(`No hay productos con esos ids: ${only.join(", ")}`);
  process.exit(1);
}

for (const product of selected) {
  const source = path.join(IMG, path.basename(product.image));

  if (!fs.existsSync(source)) {
    console.warn(`${product.id}: falta ${source}, se omite`);
    continue;
  }

  const bg = await sharp(Buffer.from(card(product))).png().toBuffer();
  const meta = await sharp(source).metadata();
  const scale = Math.min(440 / meta.width, 430 / meta.height, 1);
  const width = Math.round(meta.width * scale);
  const height = Math.round(meta.height * scale);

  const art = await sharp(source).resize({ width, height }).png().toBuffer();
  const left = Math.round(880 - width / 2);
  const top = Math.round(80 + (470 - height) / 2);

  const out = await sharp(bg)
    .composite([{ input: art, left, top }])
    .jpeg({ quality: 86, chromaSubsampling: "4:4:4" })
    .toFile(path.join(OUT, `${product.id}.jpg`));

  console.log(
    `${product.id}.jpg  ${width}x${height}  ${(out.size / 1024).toFixed(1)} KB`
  );
}
