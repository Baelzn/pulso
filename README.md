# PULSO — tienda gaming (demo)

Prototipo de escaparate para consolas, juegos y accesorios. Todo es estático: no hay
backend, los precios son de demostración y el checkout simula el pedido.

## Cómo verlo

Con un servidor local (recomendado):

```bash
npx serve .
# o
python -m http.server 8000
```

También abre con doble clic en `index.html`, pero el navegador bloquea los módulos ES
en `file://`, así que la escena 3D del hero no cargaría.

## URLs

El catálogo y la ficha viven en la URL, así que se pueden compartir y recargar:

| URL | Qué hace |
| --- | --- |
| `?categoria=juegos` | Filtra por categoría (`consolas`, `juegos`, `mandos`, `accesorios`) |
| `?categoria=favoritos` | Muestra solo los productos guardados con el corazón |
| `?q=elden` | Aplica la búsqueda |
| `?orden=rating` | Ordena (`featured`, `rating`, `price-asc`, `price-desc`, `name`) |
| `?producto=ps5` | Abre la ficha del producto |
| `?carrito=1` | Abre el carrito (lo usan las páginas de producto) |
| `?categoria=mandos&orden=name&producto=dualsense` | Todo combinado |

Cada producto tiene además su propia página: `p/ps5.html`, `p/elden-ring.html`…

Los filtros y la búsqueda se sincronizan con `history.replaceState` / `pushState`, y
atrás/adelante reconstruyen el estado. Abrir una ficha añade una entrada al historial:
el botón atrás la cierra.

## Estructura

```
index.html          Marcado de la página (hero, categorías, catálogo, carrito, checkout)
styles.css          Tokens de diseño y layout base
motion.css          Capas de movimiento: reveals, tilt, parallax, flip 3D, marquee
app.js              Datos de producto, filtros, búsqueda, carrito, checkout y rutas
motion.js           Motor de movimiento y carga bajo demanda de la escena 3D
hero-3d.js          Escena Three.js del hero
product-page.js     Carrito y galería de las páginas de producto
p/                  Una página estática por producto (generadas)
tools/              Scripts que generan el JSON-LD, las páginas y el sitemap
assets/img/         Imágenes WebP (originales en `_source/`)
assets/img/compartir/  Tarjetas 1200×630 para compartir cada producto
assets/vendor/      Three.js r169 (MIT)
sitemap.xml         Mapa del sitio
robots.txt          Reglas para rastreadores
```

## Páginas de producto

`p/<id>.html` es una página completa por producto (12 en total) pensada para
compartir y para buscadores: título, descripción, canonical, `og:image` y JSON-LD
(`Product` + `BreadcrumbList`) propios, con la misma ficha visual (galería, precio,
características, relacionados).

- Se generan desde `PRODUCTS`, no se editan a mano.
- El botón «Añadir al carrito» escribe en el mismo `localStorage` que la tienda y el
  icono del carrito lleva a `index.html?carrito=1`, que abre el carrito ya con el
  producto dentro.
- «Abrir en la tienda» va a `index.html?producto=<id>`, donde la ficha se abre en modal.
- La ficha en modal enlaza a su página con «Ver página del producto», y su canonical
  apunta a `p/<id>.html` para no duplicar contenido.
- La tarjeta al compartir es `assets/img/compartir/<id>.jpg` (1200×630). Si falta,
  se usa `assets/img/og-pulso.jpg`.

Para regenerarlas después de tocar el catálogo:

```bash
node tools/build-jsonld.mjs   # JSON-LD del catálogo en index.html
node tools/build-pages.mjs    # p/<id>.html y sitemap.xml
```

Ambos scripts leen `PRODUCTS` de `app.js`; el dominio está en `tools/products.mjs`.

Cada producto usa `assets/img/<id>.webp` como imagen principal y
`assets/img/<id>-detalle.webp` como segunda vista de la galería. Si añades un producto
nuevo, deja los dos archivos con ese nombre (o cambia `productViews()` en `app.js`).

## Movimiento

Se respeta `prefers-reduced-motion`: si el sistema pide movimiento reducido, las
animaciones CSS y la escena 3D quedan apagadas. El interruptor del pie permite
activarlas igualmente y la preferencia se guarda en `localStorage` (`pulso-motion`).

Three.js pesa ~670 KB, así que solo se descarga cuando el movimiento está activo.
Con movimiento reducido la página no lo pide y el hero se queda con su imagen.

## Para compartir y buscadores

- **Open Graph y Twitter Card** en el `<head>` de la portada: título, descripción e
  imagen 1200×630 (`assets/img/og-pulso.jpg`). También se actualizan al abrir una ficha,
  para las previsualizaciones que ejecutan JavaScript.
- **Una página por producto** (`p/<id>.html`) con sus propias etiquetas sociales, su
  tarjeta 1200×630 y `canonical` a sí misma: cada enlace se comparte con su producto.
- **JSON-LD** con `Store`, `WebSite` y un `ItemList` de los 12 productos en la portada,
  más un `Product` + `BreadcrumbList` en cada página. Se genera desde `PRODUCTS`.
- **`sitemap.xml`** (portada + 12 productos) y **`robots.txt`**.

> **Antes de publicar**: sustituye `https://pulso.example` por tu dominio real en
> `tools/products.mjs` (`SITE`), en el `<head>` de `index.html` (canonical, `og:url`,
> `og:image`, `twitter:image`) y en `robots.txt`; después ejecuta los dos scripts de
> `tools/` para reescribir las páginas y el sitemap.

## Datos

- Los 12 productos están en la constante `PRODUCTS` de `app.js`.
- El carrito se guarda en `localStorage` bajo `pulso-cart-v1`.
- Los favoritos se guardan en `localStorage` bajo `pulso-favs-v1`.
- Envío gratis a partir de 49 €; por debajo, 4,95 €.
- Las valoraciones (`rating` y `reviews`) son de demostración, igual que los precios.
- La segunda vista de la galería es un recorte de la imagen principal; cuando haya
  fotos reales, basta con reemplazar `<id>-detalle.webp`.

## Créditos

Las imágenes son de terceros y se usan con fines demostrativos. La atribución completa
está en el pie de la página.
