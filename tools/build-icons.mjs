import fs from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

/**
 * Genera los iconos de la PWA a partir de la misma marca que el favicon.
 *
 *   node tools/build-icons.mjs
 *
 * Salida: assets/icons/icon-192.png, icon-512.png, icon-maskable-512.png
 * y apple-touch-icon.png
 */

const OUT = fileURLToPath(new URL("../assets/icons/", import.meta.url));
const MARK_PATH =
  "M19 49V15h17c9 0 14 5 14 13s-5 13-14 13h-7v8H19Zm10-17h7c3 0 5-1 5-4s-2-4-5-4h-7v8Z";

const svg = ({ size, radius, bleed = false }) => {
  // Con "bleed" el fondo llega al borde (maskable / apple-touch-icon).
  const r = bleed ? 0 : radius;
  const scale = bleed ? 0.86 : 1;
  const offset = ((1 - scale) * 64) / 2;
  // El trazo de la P no está centrado en su viewBox: se corrige el eje X.
  const dx = offset - 2.5 * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${r}" fill="#d6ff4f"/>
  <g transform="translate(${dx} ${offset}) scale(${scale})">
    <path d="${MARK_PATH}" fill="#0b0d0c"/>
  </g>
</svg>`;
};

const targets = [
  { file: "icon-192.png", size: 192, radius: 14 },
  { file: "icon-512.png", size: 512, radius: 14 },
  { file: "icon-maskable-512.png", size: 512, radius: 14, bleed: true },
  { file: "apple-touch-icon.png", size: 180, radius: 14, bleed: true }
];

fs.mkdirSync(OUT, { recursive: true });

for (const target of targets) {
  const buffer = Buffer.from(svg(target));
  const info = await sharp(buffer)
    .png({ compressionLevel: 9 })
    .toFile(`${OUT}${target.file}`);

  console.log(`${target.file}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
}
