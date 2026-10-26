import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

/**
 * Descarga el arte oficial de los juegos y genera las dos vistas de cada ficha:
 *
 *   assets/img/<id>.webp           portada 600x900
 *   assets/img/<id>-detalle.webp   captura del juego 1280x720
 *
 * Las portadas y capturas vienen de Steam (library_600x900 y screenshots).
 * Zelda: Tears of the Kingdom no está en Steam, así que usa el arte oficial de
 * Nintendo recortado a vertical.
 *
 *   node tools/fetch-art.mjs           (todo)
 *   node tools/fetch-art.mjs hades-2   (solo uno)
 *
 * Después: `npm run build && npm run build:cards` para refrescar páginas y
 * tarjetas de compartir.
 */

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const IMG = path.join(ROOT, "assets", "img");

const STEAM = "https://cdn.cloudflare.steamstatic.com/steam/apps/";

/** id del producto -> app de Steam y captura elegida (índice del array). */
const GAMES = {
  "elden-ring": { app: 1245620, shot: 0 },
  "cyberpunk-2077": { app: 1091500, shot: 0 },
  "baldurs-gate-3": { app: 1086940, shot: 0 },
  "forza-horizon-5": { app: 1551360, shot: 1 },
  "spider-man-2": { app: 2651280, shot: 0 },
  "last-of-us-2": { app: 2531310, shot: 0 },
  "god-of-war-ragnarok": { app: 2322010, shot: 0 },
  "hades-2": { app: 1145350, shot: 0 },
  "red-dead-2": { app: 1174180, shot: 1 },
  "silksong": { app: 1030300, shot: 0 }
};

/** Zelda no está en Steam: arte y captura oficiales de Nintendo. */
const ZELDA = {
  id: "zelda-totk",
  art: "https://assets.nintendo.com/image/upload/w_1920/q_auto/f_auto/store/software/switch/70010000063714/fb30eab428df3fc993b41c76e20f72e4d76d49734d17d31996b5ab61c414b117",
  shot: "https://assets.nintendo.com/image/upload/w_1600/q_auto/f_auto/store/software/switch/70010000063714/ca80e4d9f7ddc2971daea8d9b9144c42dbdf2245c3546f41b94a740067bd42a0"
};

const only = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));

async function download(url) {
  const res = await fetch(url, { headers: { "User-Agent": "pulso-demo/1.0" } });
  const type = res.headers.get("content-type") || "";
  if (!res.ok || !type.startsWith("image/")) {
    throw new Error(`${res.status} ${type} · ${url}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function write(buffer, file) {
  const out = await sharp(buffer).webp({ quality: 84, effort: 5 }).toFile(file);
  const meta = await sharp(file).metadata();
  return `${meta.width}x${meta.height} ${(out.size / 1024).toFixed(0)} KB`;
}

async function steamGame(id, { app, shot }) {
  const cover = await download(`${STEAM}${app}/library_600x900_2x.jpg`);
  const coverFile = path.join(IMG, `${id}.webp`);
  const coverInfo = await write(
    await sharp(cover).resize(600, 900, { fit: "cover" }).toBuffer(),
    coverFile
  );

  const details = await fetch(
    `https://store.steampowered.com/api/appdetails?appids=${app}&filters=screenshots&l=english`
  ).then((res) => res.json());
  const screenshots = details?.[app]?.data?.screenshots || [];
  if (!screenshots[shot]) throw new Error(`${id}: no hay captura ${shot}`);

  const capture = await download(screenshots[shot].path_full);
  const captureInfo = await write(
    await sharp(capture).resize(1280, 720, { fit: "cover" }).toBuffer(),
    path.join(IMG, `${id}-detalle.webp`)
  );

  console.log(`${id.padEnd(20)} portada ${coverInfo.padEnd(16)} captura ${captureInfo}`);
}

async function zelda() {
  const art = await download(ZELDA.art);
  // Normaliza a 1920x1080 y recorta la zona del logo a vertical.
  const normalized = await sharp(art).resize(1920, 1080, { fit: "cover" }).toBuffer();
  const cover = await sharp(normalized)
    .extract({ left: 40, top: 0, width: 720, height: 1080 })
    .resize(600, 900)
    .toBuffer();
  const coverInfo = await write(cover, path.join(IMG, `${ZELDA.id}.webp`));

  const shot = await download(ZELDA.shot);
  const captureInfo = await write(
    await sharp(shot).resize(1280, 720, { fit: "cover" }).toBuffer(),
    path.join(IMG, `${ZELDA.id}-detalle.webp`)
  );

  console.log(`${ZELDA.id.padEnd(20)} portada ${coverInfo.padEnd(16)} captura ${captureInfo}`);
}

const wanted = Object.entries(GAMES).filter(([id]) => !only.length || only.includes(id));

if (only.length && !wanted.length && !only.includes(ZELDA.id)) {
  console.error(`No hay juegos con esos ids: ${only.join(", ")}`);
  process.exit(1);
}

for (const [id, game] of wanted) {
  await steamGame(id, game);
}

if (!only.length || only.includes(ZELDA.id)) {
  await zelda();
}

console.log("\nHecho. Recuerda: npm run build && npm run build:cards");
