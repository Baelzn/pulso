/* PULSO — service worker
 *
 * Estrategia:
 *  - HTML, CSS, JS y manifest: red primero (para no quedarse con código viejo) y
 *    caché como respaldo. Si no hay conexión, sirve la última copia de la página
 *    o, en su defecto, la portada.
 *  - Imágenes y fuentes: caché primero, que cambian poco entre visitas.
 *
 * Para publicar cambios hay que subir VERSION: eso invalida las cachés antiguas.
 */

const VERSION = "pulso-v3";
const SHELL_CACHE = `${VERSION}-shell`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

const SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./motion.css",
  "./app.js",
  "./motion.js",
  "./manifest.webmanifest",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/img/og-pulso.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== SHELL_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((resolve) => setTimeout(resolve, ms, null))
  ]);
}

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const response = await withTimeout(fetch(request), 3500);
    if (response && response.ok) {
      cache.put(request, response.clone());
      return response;
    }
    throw new Error("Sin respuesta");
  } catch {
    const cached = (await caches.match(request)) || (await caches.match("./index.html"));
    if (cached) return cached;
    return new Response("Sin conexión", {
      status: 503,
      statusText: "Sin conexión",
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Imágenes y fuentes: caché primero. HTML, CSS, JS y manifest: red primero,
  // para que un cambio en el sitio no se quede servido desde una copia vieja.
  const isAsset = /\.(?:png|jpe?g|webp|avif|svg|ico|woff2?)$/i.test(url.pathname);

  event.respondWith(isAsset ? cacheFirst(request) : networkFirst(request));
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
