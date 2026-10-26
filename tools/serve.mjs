import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Servidor estático mínimo para desarrollo y para los tests de Playwright.
 *
 *   node tools/serve.mjs            -> http://127.0.0.1:8080
 *   node tools/serve.mjs 3000       -> http://127.0.0.1:3000
 *
 * Sin dependencias. No sirve para producción, pero respeta el service worker
 * (Content-Type correctos y cabeceras de caché desactivadas).
 */

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const PORT = Number(process.argv[2] || process.env.PORT || 8080);
const HOST = process.env.HOST || "127.0.0.1";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff"
};

function resolvePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const target = path.normalize(path.join(ROOT, clean));

  // Nunca salir de la carpeta del proyecto.
  if (!target.startsWith(ROOT)) return null;

  return target;
}

function send(response, status, body, type = "text/plain; charset=utf-8") {
  response.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store"
  });
  response.end(body);
}

const server = http.createServer((request, response) => {
  let target = resolvePath(request.url || "/");
  if (!target) {
    send(response, 403, "Prohibido");
    return;
  }

  fs.stat(target, (error, stats) => {
    if (!error && stats.isDirectory()) {
      const index = path.join(target, "index.html");
      if (fs.existsSync(index)) target = index;
    }

    fs.readFile(target, (readError, data) => {
      if (readError) {
        // Rutas limpias tipo /p/elden-ring -> /p/elden-ring.html
        const html = `${target}.html`;
        if (fs.existsSync(html)) {
          send(response, 200, fs.readFileSync(html), MIME[".html"]);
          return;
        }
        send(response, 404, "No encontrado");
        return;
      }

      const type = MIME[path.extname(target).toLowerCase()] || "application/octet-stream";
      send(response, 200, data, type);
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`PULSO en http://${HOST}:${PORT}`);
});
