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
| `?q=elden` | Aplica la búsqueda |
| `?orden=precio-asc` | Ordena (`featured`, `price-asc`, `price-desc`, `name`) |
| `?producto=ps5` | Abre la ficha del producto |
| `?categoria=mandos&orden=name&producto=dualsense` | Todo combinado |

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
assets/img/         Imágenes WebP (originales en `_source/`)
assets/vendor/      Three.js r169 (MIT)
```

## Movimiento

Se respeta `prefers-reduced-motion`: si el sistema pide movimiento reducido, las
animaciones CSS y la escena 3D quedan apagadas. El interruptor del pie permite
activarlas igualmente y la preferencia se guarda en `localStorage` (`pulso-motion`).

Three.js pesa ~670 KB, así que solo se descarga cuando el movimiento está activo.
Con movimiento reducido la página no lo pide y el hero se queda con su imagen.

## Datos

- Los 12 productos están en la constante `PRODUCTS` de `app.js`.
- El carrito se guarda en `localStorage` bajo `pulso-cart-v1`.
- Envío gratis a partir de 49 €; por debajo, 4,95 €.

## Créditos

Las imágenes son de terceros y se usan con fines demostrativos. La atribución completa
está en el pie de la página.
