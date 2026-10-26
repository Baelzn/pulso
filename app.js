(() => {
  "use strict";

  const PRODUCTS = [
    {
      id: "ps5",
      name: "PlayStation 5",
      category: "consolas",
      categoryLabel: "Consola",
      platform: "PS5",
      price: 499.99,
      rating: 4.8,
      reviews: 412,
      stock: 4,
      badge: "Destacado",
      image: "assets/img/ps5.webp",
      alt: "PlayStation 5 vertical con mando DualSense",
      width: 1100,
      height: 1467,
      description: "La consola de sobremesa de Sony con SSD ultrarrápido, salida 4K y un mando DualSense incluido.",
      features: ["SSD de 1 TB", "Lector de discos", "Mando DualSense incluido"]
    },
    {
      id: "dualsense",
      name: "DualSense",
      category: "mandos",
      categoryLabel: "Mando",
      platform: "PS5 · PC",
      price: 69.99,
      rating: 4.7,
      reviews: 638,
      stock: 12,
      badge: "Favorito",
      image: "assets/img/dualsense.webp",
      alt: "Mando DualSense blanco y negro",
      width: 1000,
      height: 884,
      description: "El mando de PS5 con respuesta háptica, gatillos adaptativos y micrófono integrado.",
      features: ["Respuesta háptica", "Gatillos adaptativos", "Micrófono integrado"]
    },
    {
      id: "elden-ring",
      name: "Elden Ring",
      category: "juegos",
      categoryLabel: "Juego",
      platform: "PS5 · Xbox · PC",
      price: 49.99,
      rating: 4.9,
      reviews: 1204,
      stock: 2,
      badge: "Imprescindible",
      image: "assets/img/elden-ring.webp",
      alt: "Portada de Elden Ring",
      width: 600,
      height: 900,
      description: "El mundo abierto de FromSoftware: explora las Tierras Intermedias a tu manera y enfrenta a sus jefes legendarios.",
      features: ["Mundo abierto", "RPG de acción", "Modo un jugador y online"]
    },
    {
      id: "xbox-series-x",
      name: "Xbox Series X",
      category: "consolas",
      categoryLabel: "Consola",
      platform: "Xbox Series X",
      price: 499.99,
      rating: 4.7,
      reviews: 287,
      stock: 0,
      badge: "Potencia",
      image: "assets/img/xbox-series-x.webp",
      alt: "Xbox Series X vertical con mando inalámbrico",
      width: 900,
      height: 1056,
      description: "La consola más potente de Xbox: 12 teraflops, Quick Resume y hasta 4K a 120 fps.",
      features: ["SSD de 1 TB", "Quick Resume", "Hasta 4K a 120 fps"]
    },
    {
      id: "cyberpunk-2077",
      name: "Cyberpunk 2077: Ultimate Edition",
      category: "juegos",
      categoryLabel: "Juego",
      platform: "PS5 · Xbox · PC",
      price: 59.99,
      rating: 4.4,
      reviews: 903,
      stock: 7,
      badge: "Edición completa",
      image: "assets/img/cyberpunk-2077.webp",
      alt: "Portada de Cyberpunk 2077 Ultimate Edition",
      width: 600,
      height: 900,
      description: "Night City, la expansión Phantom Liberty y todas las mejoras de la versión 2.0 en una sola edición.",
      features: ["Incluye Phantom Liberty", "Versión 2.0", "RPG de mundo abierto"]
    },
    {
      id: "xbox-controller",
      name: "Xbox Wireless Controller",
      category: "mandos",
      categoryLabel: "Mando",
      platform: "Xbox · PC",
      price: 59.99,
      rating: 4.6,
      reviews: 741,
      stock: 3,
      badge: "",
      image: "assets/img/xbox-controller.webp",
      alt: "Mando inalámbrico Xbox en color negro, visto por delante y por detrás",
      width: 1000,
      height: 562,
      description: "Grip texturizado, D-pad híbrido y conexión inalámbrica con consola, PC y dispositivos móviles.",
      features: ["D-pad híbrido", "Grip texturizado", "Bluetooth"]
    },
    {
      id: "switch-oled",
      name: "Nintendo Switch OLED",
      category: "consolas",
      categoryLabel: "Consola",
      platform: "Nintendo Switch",
      price: 319.99,
      rating: 4.8,
      reviews: 356,
      stock: 5,
      badge: "Portátil",
      image: "assets/img/switch-oled.webp",
      alt: "Nintendo Switch OLED con Joy-Con blancos",
      width: 1400,
      height: 586,
      description: "Pantalla OLED de 7 pulgadas, modo portátil y sobremesa, y 64 GB de almacenamiento interno.",
      features: ["Pantalla OLED de 7 pulgadas", "64 GB de almacenamiento", "Joy-Con incluidos"]
    },
    {
      id: "baldurs-gate-3",
      name: "Baldur's Gate 3",
      category: "juegos",
      categoryLabel: "Juego",
      platform: "PS5 · Xbox · PC",
      price: 59.99,
      rating: 4.9,
      reviews: 1587,
      stock: 9,
      badge: "Aclamado",
      image: "assets/img/baldurs-gate-3.webp",
      alt: "Portada de Baldur's Gate 3",
      width: 600,
      height: 900,
      description: "Un RPG por turnos enorme donde cada decisión cambia la historia, el mundo y a quienes te acompañan.",
      features: ["RPG por turnos", "Cooperativo", "Decisiones ramificadas"]
    },
    {
      id: "switch-pro",
      name: "Switch Pro Controller",
      category: "mandos",
      categoryLabel: "Mando",
      platform: "Nintendo Switch",
      price: 64.99,
      rating: 4.7,
      reviews: 512,
      stock: 0,
      badge: "",
      image: "assets/img/switch-pro.webp",
      alt: "Mando Pro Controller negro para Nintendo Switch",
      width: 1000,
      height: 778,
      description: "El mando tradicional de Switch: sticks grandes, HD Rumble y una batería pensada para sesiones largas.",
      features: ["HD Rumble", "Sticks de tamaño completo", "Batería de larga duración"]
    },
    {
      id: "forza-horizon-5",
      name: "Forza Horizon 5",
      category: "juegos",
      categoryLabel: "Juego",
      platform: "Xbox · PC",
      price: 49.99,
      rating: 4.6,
      reviews: 688,
      stock: 6,
      badge: "",
      image: "assets/img/forza-horizon-5.webp",
      alt: "Portada de Forza Horizon 5",
      width: 600,
      height: 900,
      description: "Recorre un México de mundo abierto con más de 500 coches, eventos y rutas para cualquier estilo de conducción.",
      features: ["Mundo abierto", "Más de 500 coches", "4K HDR"]
    },
    {
      id: "spider-man-2",
      name: "Marvel's Spider-Man 2",
      category: "juegos",
      categoryLabel: "Juego",
      platform: "PS5",
      price: 69.99,
      rating: 4.8,
      reviews: 934,
      stock: 1,
      badge: "",
      image: "assets/img/spider-man-2.webp",
      alt: "Portada de Marvel's Spider-Man 2",
      width: 600,
      height: 900,
      description: "Peter y Miles se enfrentan a Veneno en una Nueva York más grande, con nuevas habilidades y desplazamientos.",
      features: ["Peter y Miles", "Veneno", "Nueva York ampliada"]
    },
    {
      id: "charging-station",
      name: "Estación de carga DualSense",
      category: "accesorios",
      categoryLabel: "Accesorio",
      platform: "PS5",
      price: 29.99,
      rating: 4.3,
      reviews: 176,
      stock: 15,
      badge: "",
      image: "assets/img/dualsense-charging.webp",
      alt: "Estación de carga oficial para dos mandos DualSense",
      width: 1100,
      height: 619,
      description: "Carga dos mandos DualSense a la vez sin ocupar los puertos USB de la consola.",
      features: ["Carga dos mandos", "Base estable", "Sin ocupar puertos USB"]
    },
    {
      id: "last-of-us-2",
      name: "The Last of Us Part II Remastered",
      category: "juegos",
      categoryLabel: "Juego",
      platform: "PS5",
      price: 49.99,
      rating: 4.8,
      reviews: 612,
      stock: 8,
      badge: "Remasterizado",
      image: "assets/img/last-of-us-2.webp",
      alt: "Portada de The Last of Us Part II Remastered",
      width: 600,
      height: 900,
      description: "La historia de Ellie y Abby con mejoras visuales, el modo Sin retorno y comentarios del estudio.",
      features: ["Modo Sin retorno", "4K y 60 fps", "Comentarios del estudio"]
    },
    {
      id: "god-of-war-ragnarok",
      name: "God of War Ragnarök",
      category: "juegos",
      categoryLabel: "Juego",
      platform: "PS5 · PC",
      price: 59.99,
      rating: 4.9,
      reviews: 1420,
      stock: 5,
      badge: "Épico",
      image: "assets/img/god-of-war-ragnarok.webp",
      alt: "Portada de God of War Ragnarök",
      width: 600,
      height: 900,
      description: "Kratos y Atreus recorren los nueve reinos en el cierre de la saga nórdica, con un combate más libre.",
      features: ["Los nueve reinos", "Hacha Leviatán", "Modo historia"]
    },
    {
      id: "zelda-totk",
      name: "Zelda: Tears of the Kingdom",
      category: "juegos",
      categoryLabel: "Juego",
      platform: "Switch",
      price: 59.99,
      rating: 4.9,
      reviews: 1830,
      stock: 2,
      badge: "Aventura",
      image: "assets/img/zelda-totk.webp",
      alt: "Portada de Zelda: Tears of the Kingdom",
      width: 600,
      height: 900,
      description: "Hyrule por cielo, superficie y subsuelo, con construcción de vehículos y nuevas habilidades.",
      features: ["Islas flotantes", "Construcción de vehículos", "Mundo en tres capas"]
    },
    {
      id: "hades-2",
      name: "Hades II",
      category: "juegos",
      categoryLabel: "Juego",
      platform: "PC · Switch",
      price: 29.99,
      rating: 4.7,
      reviews: 380,
      stock: 20,
      badge: "Nuevo",
      image: "assets/img/hades-2.webp",
      alt: "Portada de Hades II",
      width: 600,
      height: 900,
      description: "Melínoe se enfrenta al Titán del Tiempo en un roguelite de acción con builds y dioses del Olimpo.",
      features: ["Roguelite de acción", "Builds con dioses", "Combate con magia"]
    },
    {
      id: "red-dead-2",
      name: "Red Dead Redemption 2",
      category: "juegos",
      categoryLabel: "Juego",
      platform: "Xbox · PC",
      price: 39.99,
      rating: 4.9,
      reviews: 2103,
      stock: 4,
      badge: "Clásico",
      image: "assets/img/red-dead-2.webp",
      alt: "Portada de Red Dead Redemption 2",
      width: 600,
      height: 900,
      description: "La banda de Van der Linde en el crepúsculo del Salvaje Oeste: mundo abierto, caza y decisiones.",
      features: ["Mundo abierto", "Modo historia", "Red Dead Online"]
    },
    {
      id: "silksong",
      name: "Hollow Knight: Silksong",
      category: "juegos",
      categoryLabel: "Juego",
      platform: "PC · Switch",
      price: 19.99,
      rating: 4.8,
      reviews: 267,
      stock: 11,
      badge: "Indie",
      image: "assets/img/silksong.webp",
      alt: "Portada de Hollow Knight: Silksong",
      width: 600,
      height: 900,
      description: "Hornet desciende a Pharloom en un metroidvania de precisión con combate rápido y secretos.",
      features: ["Metroidvania", "Combate de precisión", "Mapa artesanal"]
    }
  ];

  const CATEGORY_LABELS = {
    all: "Todo",
    consolas: "Consolas",
    juegos: "Juegos",
    mandos: "Mandos",
    accesorios: "Accesorios",
    favoritos: "Favoritos"
  };

  const PLATFORM_LABELS = {
    all: "Todas",
    ps5: "PS5",
    xbox: "Xbox",
    switch: "Switch",
    pc: "PC"
  };

  const PRICE_RANGES = {
    all: { label: "Cualquier precio", min: 0, max: Infinity },
    menos50: { label: "Menos de 50 €", min: 0, max: 50 },
    "50-100": { label: "50 € – 100 €", min: 50, max: 100 },
    mas100: { label: "Más de 100 €", min: 100, max: Infinity }
  };

  // A partir de aquí se avisa de las últimas unidades.
  const LOW_STOCK = 3;

  const STORAGE_KEY = "pulso-cart-v1";
  const FAVS_KEY = "pulso-favs-v1";
  const SHIPPING_THRESHOLD = 49;
  const SHIPPING_COST = 4.95;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const money = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR"
  });

  const state = {
    filter: "all",
    platform: "all",
    price: "all",
    search: "",
    sort: "featured",
    cart: loadCart(),
    favorites: loadFavorites(),
    activeProductId: null,
    modalQty: 1,
    productReturnFocus: null,
    cartReturnFocus: null,
    checkoutReturnFocus: null
  };

  /* -------------------------------------------------------------------------
     Estado en la URL
     El catálogo y la ficha se pueden compartir y recargar:
       ?categoria=juegos&q=switch&orden=precio-asc&producto=elden-ring
     ---------------------------------------------------------------------- */

  const BASE_TITLE = document.title;
  const metaDescription = document.querySelector('meta[name="description"]');
  const BASE_DESCRIPTION = metaDescription ? metaDescription.getAttribute("content") : "";
  const SORT_VALUES = ["featured", "rating", "price-asc", "price-desc", "name"];

  // Las mismas etiquetas sociales que actualiza applyDocumentMeta al abrir una ficha.
  const socialMeta = {
    ogTitle: document.querySelector('meta[property="og:title"]'),
    ogDescription: document.querySelector('meta[property="og:description"]'),
    ogUrl: document.querySelector('meta[property="og:url"]'),
    twitterTitle: document.querySelector('meta[name="twitter:title"]'),
    twitterDescription: document.querySelector('meta[name="twitter:description"]')
  };

  // Cada producto tiene su página estática; la ficha enlaza y canonicaliza ahí.
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  const HOME_URL = canonicalLink ? canonicalLink.href : window.location.href;
  const SITE_BASE = HOME_URL.replace(/[^/]*$/, "");

  // Marca si la ficha abierta añadió una entrada al historial (para cerrarla con back).
  let productEntryPushed = false;

  function catalogQuery() {
    const params = new URLSearchParams();
    if (state.filter !== "all") params.set("categoria", state.filter);
    if (state.platform !== "all") params.set("plataforma", state.platform);
    if (state.price !== "all") params.set("precio", state.price);
    const query = state.search.trim();
    if (query) params.set("q", query);
    if (state.sort !== "featured") params.set("orden", state.sort);
    if (state.activeProductId) params.set("producto", state.activeProductId);
    const search = params.toString();
    return search ? `?${search}` : "";
  }

  function syncURL(mode) {
    if (mode === "none") return false;
    const next = `${window.location.pathname}${catalogQuery()}${window.location.hash}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next === current) return false;
    const record = { pulso: true };
    if (mode === "push") window.history.pushState(record, "", next);
    else window.history.replaceState(record, "", next);
    return true;
  }

  function readURL() {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get("categoria");
    const platform = params.get("plataforma");
    const price = params.get("precio");
    const sort = params.get("orden");
    const product = params.get("producto");
    return {
      filter: Object.prototype.hasOwnProperty.call(CATEGORY_LABELS, filter) ? filter : "all",
      platform: Object.prototype.hasOwnProperty.call(PLATFORM_LABELS, platform) ? platform : "all",
      price: Object.prototype.hasOwnProperty.call(PRICE_RANGES, price) ? price : "all",
      search: params.get("q") || "",
      sort: SORT_VALUES.includes(sort) ? sort : "featured",
      product: getProduct(product) ? product : null
    };
  }

  function setMetaContent(node, value) {
    if (node) node.setAttribute("content", value);
  }

  function applyDocumentMeta(product) {
    const title = product
      ? `${product.name} · ${product.categoryLabel} | PULSO`
      : BASE_TITLE;
    const description = product
      ? `${product.name} — ${product.description}`
      : BASE_DESCRIPTION;

    const pageUrl = product ? `${SITE_BASE}p/${product.id}.html` : HOME_URL;

    document.title = title;
    setMetaContent(metaDescription, description);

    // Sirve para las previsualizaciones que sí ejecutan JavaScript; los rastreadores
    // de WhatsApp/X/Telegram se quedan con las etiquetas estáticas del HTML.
    setMetaContent(socialMeta.ogTitle, title);
    setMetaContent(socialMeta.ogDescription, description);
    setMetaContent(socialMeta.ogUrl, pageUrl);
    setMetaContent(socialMeta.twitterTitle, title);
    setMetaContent(socialMeta.twitterDescription, description);

    // ?producto=... y p/<id>.html muestran lo mismo: el canonical apunta a la página.
    if (canonicalLink) canonicalLink.setAttribute("href", pageUrl);
    if (productModalLink && product) productModalLink.href = `p/${product.id}.html`;
  }

  // Lleva la URL al estado actual de la interfaz.
  function applyURLState() {
    const url = readURL();
    state.filter = url.filter;
    state.platform = url.platform;
    state.price = url.price;
    state.search = url.search;
    state.sort = url.sort;

    searchInput.value = url.search;
    searchClear.hidden = url.search.length === 0;
    sortSelect.value = url.sort;

    updateFilterUI();
    renderProducts();

    if (url.product && state.activeProductId !== url.product) {
      openProductModal(url.product, { syncUrl: false });
    } else if (!url.product && state.activeProductId) {
      closeProductModal(false, false);
    }
  }

  const productGrid = document.getElementById("product-grid");
  const emptyState = document.getElementById("empty-state");
  const emptyTitle = document.getElementById("empty-title");
  const emptyText = document.getElementById("empty-text");
  const resultCount = document.getElementById("result-count");
  const filterChips = Array.from(document.querySelectorAll(".filter-chip[data-filter]"));
  const sortSelect = document.getElementById("sort-select");
  const searchInput = document.getElementById("search-input");
  const searchClear = document.getElementById("search-clear");
  const searchForm = document.getElementById("search-form");
  const resetFilters = document.getElementById("reset-filters");
  const cartTrigger = document.getElementById("cart-open");
  const cartCount = document.getElementById("cart-count");
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const toast = document.getElementById("toast");
  const productModal = document.getElementById("product-modal");
  const productModalImage = document.getElementById("product-modal-image");
  const productModalBadge = document.getElementById("product-modal-badge");
  const productModalKicker = document.getElementById("product-modal-kicker");
  const productModalTitle = document.getElementById("product-modal-title");
  const productModalPlatform = document.getElementById("product-modal-platform");
  const productModalPrice = document.getElementById("product-modal-price");
  const productModalDescription = document.getElementById("product-modal-description");
  const productModalFeatures = document.getElementById("product-modal-features");
  const productModalThumbs = document.getElementById("product-modal-thumbs");
  const productModalRating = document.getElementById("product-modal-rating");
  const productRelatedList = document.getElementById("product-related-list");
  const modalFav = document.getElementById("modal-fav");
  const productModalLink = document.getElementById("product-modal-link");
  const productModalStock = document.getElementById("product-modal-stock");
  const modalQty = document.getElementById("modal-qty");
  const modalQtyMinus = document.getElementById("modal-qty-minus");
  const modalQtyPlus = document.getElementById("modal-qty-plus");
  const modalAdd = document.getElementById("modal-add");
  const modalAddLabel = document.getElementById("modal-add-label");
  const cartRoot = document.getElementById("cart-root");
  const cartTitleCount = document.getElementById("cart-title-count");
  const cartItems = document.getElementById("cart-items");
  const cartEmpty = document.getElementById("cart-empty");
  const cartFoot = document.getElementById("cart-foot");
  const shippingMeter = document.getElementById("shipping-meter");
  const shippingMessage = document.getElementById("shipping-message");
  const shippingProgress = document.getElementById("shipping-progress");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartShipping = document.getElementById("cart-shipping");
  const cartTotal = document.getElementById("cart-total");
  const checkoutOpen = document.getElementById("checkout-open");
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutCard = checkoutModal.querySelector(".checkout-card");
  const checkoutHead = document.getElementById("checkout-head");
  const checkoutContent = document.getElementById("checkout-content");
  const checkoutSuccess = document.getElementById("checkout-success");
  const checkoutForm = document.getElementById("checkout-form");
  const placeOrder = document.getElementById("place-order");
  const formErrors = document.getElementById("form-errors");
  const formErrorsList = document.getElementById("form-errors-list");
  const orderList = document.getElementById("order-list");
  const orderSubtotal = document.getElementById("order-subtotal");
  const orderShipping = document.getElementById("order-shipping");
  const orderTotal = document.getElementById("order-total");
  const orderReference = document.getElementById("order-reference");
  const successClose = document.getElementById("success-close");

  const ICONS = {
    plus: '<path d="M12 5v14M5 12h14"></path>',
    minus: '<path d="M5 12h14"></path>',
    check: '<path d="m5 12 4 4L19 6"></path>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"></path>',
    close: '<path d="m6 6 12 12M18 6 6 18"></path>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"></path>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"></path>',
    heart:
      '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.8-7.8 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"></path>'
  };

  let toastTimer = 0;
  let checkoutTimer = 0;

  function icon(name, size) {
    const style = size ? ` style="--od-icon-size:${size}px"` : "";
    return `<svg class="od-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${style}>${ICONS[name] || ""}</svg>`;
  }

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function normalize(value) {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function getProduct(id) {
    return PRODUCTS.find((product) => product.id === id);
  }

  // "PS5 · Xbox · PC" -> ["ps5", "xbox", "pc"] (una sola fuente de verdad: el texto visible).
  function platformTags(product) {
    return product.platform
      .split("·")
      .map((token) => normalize(token))
      .flatMap((token) => {
        if (token === "ps5" || token.includes("playstation")) return ["ps5"];
        if (token.includes("xbox")) return ["xbox"];
        if (token.includes("switch")) return ["switch"];
        if (token === "pc") return ["pc"];
        return [];
      });
  }

  function stockState(product) {
    if (product.stock <= 0) return "out";
    if (product.stock <= LOW_STOCK) return "low";
    return "in";
  }

  // Texto corto para la ficha; en las tarjetas solo se muestra cuando hay prisa.
  function stockLabel(product) {
    const state = stockState(product);
    if (state === "out") return "Agotado";
    if (state === "low") {
      return product.stock === 1 ? "Última unidad" : `Últimas ${product.stock} unidades`;
    }
    return "En stock";
  }

  function inStock(product) {
    return stockState(product) !== "out";
  }

  function matchesPrice(product) {
    const range = PRICE_RANGES[state.price];
    if (!range) return true;
    return product.price >= range.min && product.price < range.max;
  }

  // Cada producto tiene una segunda vista en assets/img/<id>-detalle.webp:
  // los juegos muestran una captura del juego y el hardware, un primer plano.
  function productViews(product) {
    const isGame = product.category === "juegos";

    return [
      {
        src: product.image,
        alt: product.alt,
        width: product.width,
        height: product.height,
        label: isGame ? "Portada" : "Vista general"
      },
      {
        src: `assets/img/${product.id}-detalle.webp`,
        alt: isGame ? `Captura de ${product.name}` : `Detalle de ${product.name}`,
        width: isGame ? 1280 : 700,
        height: isGame ? 720 : 700,
        label: isGame ? "Captura" : "Detalle"
      }
    ];
  }

  function ratingText(value) {
    return Number(value).toFixed(1).replace(".", ",");
  }

  function starIcon(size = 12) {
    return `<svg class="star" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path d="M12 3.6l2.7 5.5 6 .9-4.35 4.24 1.03 6L12 17.4l-5.38 2.83 1.03-6L3.3 10l6-.9L12 3.6Z"></path></svg>`;
  }

  function loadFavorites() {
    try {
      const saved = JSON.parse(localStorage.getItem(FAVS_KEY) || "[]");
      if (!Array.isArray(saved)) return [];
      return [...new Set(saved.map(String))].filter((id) =>
        PRODUCTS.some((product) => product.id === id)
      );
    } catch {
      return [];
    }
  }

  function saveFavorites() {
    try {
      localStorage.setItem(FAVS_KEY, JSON.stringify(state.favorites));
    } catch {
      return;
    }
  }

  function isFavorite(id) {
    return state.favorites.includes(id);
  }

  function updateFavButtons() {
    document.querySelectorAll("[data-fav]").forEach((button) => {
      const id = button.dataset.fav;
      const saved = isFavorite(id);
      const product = getProduct(id);
      button.setAttribute("aria-pressed", String(saved));
      if (product) {
        button.setAttribute(
          "aria-label",
          saved ? `Quitar ${product.name} de favoritos` : `Guardar ${product.name} en favoritos`
        );
      }
    });
  }

  function toggleFavorite(id) {
    const product = getProduct(id);
    if (!product) return;

    const index = state.favorites.indexOf(id);
    if (index >= 0) {
      state.favorites.splice(index, 1);
      showToast(`${product.name} fuera de favoritos`);
    } else {
      state.favorites.push(id);
      showToast(`${product.name} guardado en favoritos`);
    }

    saveFavorites();
    updateFavButtons();
    updateFavoriteChip();

    // Si estamos viendo la lista de favoritos, hay que volver a pintarla.
    if (state.filter === "favoritos") renderProducts();
  }

  function loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (!Array.isArray(saved)) return [];
      return saved
        .map((item) => ({
          id: String(item.id),
          qty: Math.max(1, Math.min(99, Number(item.qty) || 1))
        }))
        .filter((item) => PRODUCTS.some((product) => product.id === item.id));
    } catch {
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
    } catch {
      return;
    }
  }

  function cartLines() {
    return state.cart
      .map((item) => {
        const product = getProduct(item.id);
        return product ? { product, qty: item.qty } : null;
      })
      .filter(Boolean);
  }

  function cartQuantity() {
    return state.cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function cartSubtotalValue() {
    return cartLines().reduce((sum, line) => sum + line.product.price * line.qty, 0);
  }

  function shippingFor(subtotal) {
    if (subtotal <= 0 || subtotal >= SHIPPING_THRESHOLD) return 0;
    return SHIPPING_COST;
  }

  function shippingLabel(subtotal, shipping) {
    if (subtotal <= 0) return "—";
    return shipping === 0 ? "Gratis" : money.format(shipping);
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2300);
  }

  function hideToast() {
    window.clearTimeout(toastTimer);
    toast.classList.remove("is-visible");
  }

  function renderProducts() {
    const query = normalize(state.search);
    let visible = PRODUCTS.filter((product) => {
      const matchesFilter =
        state.filter === "all" ||
        (state.filter === "favoritos"
          ? isFavorite(product.id)
          : product.category === state.filter);
      const matchesPlatform =
        state.platform === "all" || platformTags(product).includes(state.platform);
      const haystack = normalize(
        `${product.name} ${product.categoryLabel} ${product.platform} ${product.description}`
      );
      return (
        matchesFilter &&
        matchesPlatform &&
        matchesPrice(product) &&
        (!query || haystack.includes(query))
      );
    });

    if (state.sort === "price-asc") {
      visible = visible.slice().sort((a, b) => a.price - b.price);
    } else if (state.sort === "price-desc") {
      visible = visible.slice().sort((a, b) => b.price - a.price);
    } else if (state.sort === "rating") {
      visible = visible.slice().sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    } else if (state.sort === "name") {
      visible = visible.slice().sort((a, b) => a.name.localeCompare(b.name, "es"));
    }

    const noun = visible.length === 1 ? "producto" : "productos";
    resultCount.textContent = query
      ? `${visible.length} ${noun} para «${state.search.trim()}»`
      : `${visible.length} ${noun}`;

    productGrid.innerHTML = visible.map(productCard).join("");
    emptyState.hidden = visible.length !== 0;

    if (!emptyState.hidden) {
      if (state.filter === "favoritos" && state.favorites.length === 0) {
        emptyTitle.textContent = "Todavía no has guardado nada.";
        emptyText.textContent =
          "Pulsa el corazón de cualquier producto y lo encontrarás aquí cuando vuelvas.";
      } else if (state.filter === "favoritos") {
        emptyTitle.textContent = "Ninguno de tus favoritos coincide.";
        emptyText.textContent = "Borra la búsqueda o quita la plataforma y el precio para verlos todos.";
      } else if (query) {
        emptyTitle.textContent = "No encontramos nada con esa búsqueda.";
        emptyText.textContent =
          "Prueba con otro nombre o borra la búsqueda para ver todo el catálogo.";
      } else if (state.platform !== "all" || state.price !== "all") {
        emptyTitle.textContent = "No hay nada con esa combinación.";
        emptyText.textContent = "Prueba otra plataforma, otro precio o cambia de categoría.";
      } else {
        emptyTitle.textContent = "No encontramos nada con ese filtro.";
        emptyText.textContent = "Prueba otra categoría para ver todo el catálogo.";
      }
    }

    const counts = PRODUCTS.reduce(
      (acc, product) => {
        acc.all += 1;
        acc[product.category] += 1;
        return acc;
      },
      { all: 0, consolas: 0, juegos: 0, mandos: 0, accesorios: 0, favoritos: 0 }
    );
    counts.favoritos = state.favorites.length;

    document.querySelectorAll("[data-filter-count]").forEach((node) => {
      const key = node.dataset.filterCount;
      node.textContent = String(counts[key] || 0);
    });

    document.querySelectorAll("[data-category-count]").forEach((node) => {
      const key = node.dataset.categoryCount;
      node.textContent = String(counts[key] || 0);
    });
  }

  function productCard(product) {
    const isGame = product.category === "juegos";
    const badge = product.badge
      ? `<span class="product-badge">${escapeHTML(product.badge)}</span>`
      : "";
    const saved = isFavorite(product.id);
    const favLabel = `${saved ? "Quitar" : "Guardar"} ${product.name} ${
      saved ? "de" : "en"
    } favoritos`;
    const stock = stockState(product);
    const soldOut = stock === "out";
    const stockNote = soldOut
      ? `<p class="stock-note is-out">${escapeHTML(stockLabel(product))}</p>`
      : stock === "low"
        ? `<p class="stock-note is-low">${escapeHTML(stockLabel(product))}</p>`
        : "";

    return `
      <article class="product-card" data-product-card="${product.id}">
        <div class="product-media${isGame ? " product-media-game" : ""}">
          ${badge}
          <button class="product-media-button" type="button" data-open-product="${product.id}">
            <img class="product-image" src="${product.image}" alt="${escapeHTML(product.alt)}" width="${product.width}" height="${product.height}" loading="lazy" decoding="async">
          </button>
          <button class="fav-btn" type="button" data-fav="${product.id}" aria-pressed="${saved}" aria-label="${escapeHTML(favLabel)}">
            ${icon("heart", 16)}
          </button>
        </div>
        <div class="product-body">
          <p class="product-kicker">${escapeHTML(product.categoryLabel)}</p>
          <h3 class="product-title"><button type="button" data-open-product="${product.id}">${escapeHTML(product.name)}</button></h3>
          <div class="product-meta">
            <p class="product-platform"><span>${escapeHTML(product.platform)}</span></p>
            <p class="product-rating">${starIcon(11)}<span>${ratingText(product.rating)}</span></p>
          </div>
          <div class="product-bottom">
            <div class="product-price-block">
              <p class="product-price"><strong>${money.format(product.price)}</strong><span>IVA incluido</span></p>
              ${stockNote}
            </div>
            <button class="add-btn" type="button" data-add-to-cart="${product.id}" ${soldOut ? "disabled" : ""} aria-label="${soldOut ? "Producto agotado" : `Añadir ${escapeHTML(product.name)} al carrito`}">
              ${soldOut ? icon("close", 14) : icon("plus", 14)}
              <span>${soldOut ? "Agotado" : "Añadir"}</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function updateFavoriteChip() {
    const chip = filterChips.find((node) => node.dataset.filter === "favoritos");
    if (!chip) return;
    const badge = chip.querySelector("[data-filter-count]");
    if (badge) badge.textContent = String(state.favorites.length);
    // Se esconde mientras no haya favoritos, salvo que el filtro activo sea este.
    chip.hidden = state.favorites.length === 0 && state.filter !== "favoritos";
  }

  function updateFilterUI() {
    filterChips.forEach((chip) => {
      const active = chip.dataset.filter === state.filter;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", String(active));
    });

    document.querySelectorAll("[data-platform]").forEach((chip) => {
      const active = chip.dataset.platform === state.platform;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", String(active));
    });

    document.querySelectorAll("[data-price]").forEach((chip) => {
      const active = chip.dataset.price === state.price;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", String(active));
    });

    updateFavoriteChip();
  }

  function applyPlatform(platform) {
    if (!Object.prototype.hasOwnProperty.call(PLATFORM_LABELS, platform)) return;
    state.platform = platform;
    updateFilterUI();
    renderProducts();
    syncURL("replace");
  }

  function applyPrice(price) {
    if (!Object.prototype.hasOwnProperty.call(PRICE_RANGES, price)) return;
    state.price = price;
    updateFilterUI();
    renderProducts();
    syncURL("replace");
  }

  function applyFilter(filter, options = {}) {
    if (!Object.prototype.hasOwnProperty.call(CATEGORY_LABELS, filter)) return;
    const changed = state.filter !== filter;
    state.filter = filter;
    updateFilterUI();
    renderProducts();
    closeMenu();

    if (options.url !== "none") {
      syncURL(options.url === "push" && changed ? "push" : "replace");
    }

    if (options.scroll) {
      document.getElementById("catalogo").scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "start"
      });
    }
  }

  function resetCatalog() {
    state.filter = "all";
    state.platform = "all";
    state.price = "all";
    state.search = "";
    state.sort = "featured";
    searchInput.value = "";
    searchClear.hidden = true;
    sortSelect.value = "featured";
    updateFilterUI();
    renderProducts();
    syncURL("replace");
  }

  function addToCart(id, qty = 1) {
    const product = getProduct(id);
    if (!product) return;

    if (!inStock(product)) {
      showToast(`${product.name} está agotado`);
      return;
    }

    const existing = state.cart.find((item) => item.id === id);
    const current = existing ? existing.qty : 0;
    const next = Math.min(product.stock, current + qty);

    if (next === current) {
      showToast(`No quedan más unidades de ${product.name}`);
      return;
    }

    if (existing) {
      existing.qty = next;
    } else {
      state.cart.push({ id, qty: next });
    }

    saveCart();
    renderCart();
    showToast(`${product.name} añadido al carrito`);
  }

  function setCartQuantity(id, qty) {
    const existing = state.cart.find((item) => item.id === id);
    if (!existing) return;

    if (qty <= 0) {
      state.cart = state.cart.filter((item) => item.id !== id);
    } else {
      const product = getProduct(id);
      const max = product ? Math.min(99, Math.max(1, product.stock)) : 99;
      existing.qty = Math.min(max, qty);
    }

    saveCart();
    renderCart();
    focusCartEmptyIfNeeded();
  }

  function removeCartItem(id) {
    const product = getProduct(id);
    const wasOpen = cartRoot.classList.contains("is-open");
    state.cart = state.cart.filter((item) => item.id !== id);
    saveCart();
    renderCart();
    focusCartEmptyIfNeeded();
    if (wasOpen && state.cart.length) {
      const nextRemove = cartItems.querySelector("[data-cart-remove]");
      if (nextRemove) nextRemove.focus({ preventScroll: true });
    }
    if (product && !wasOpen) {
      showToast(`${product.name} eliminado del carrito`);
    }
  }

  function focusCartEmptyIfNeeded() {
    if (state.cart.length || !cartRoot.classList.contains("is-open")) return;
    const target = cartEmpty.querySelector("[data-shop-now]");
    if (target) window.requestAnimationFrame(() => target.focus({ preventScroll: true }));
  }

  function renderCart() {
    const lines = cartLines();
    const quantity = cartQuantity();
    const subtotal = cartSubtotalValue();
    const shipping = shippingFor(subtotal);
    const total = subtotal + shipping;

    cartCount.textContent = String(quantity);
    cartTrigger.setAttribute(
      "aria-label",
      `Abrir carrito, ${quantity} ${quantity === 1 ? "artículo" : "artículos"}`
    );
    cartTitleCount.textContent = `(${quantity})`;

    cartEmpty.hidden = lines.length !== 0;
    cartFoot.hidden = lines.length === 0;
    shippingMeter.hidden = lines.length === 0;

    cartItems.innerHTML = lines
      .map(({ product, qty }) => {
        const max = Math.min(99, Math.max(1, product.stock));
        return `
        <li class="cart-item" data-cart-item="${product.id}">
          <div class="cart-item-media">
            <img src="${product.image}" alt="" width="${product.width}" height="${product.height}" loading="lazy">
          </div>
          <div class="cart-item-copy">
            <span class="cart-item-category">${escapeHTML(product.categoryLabel)}</span>
            <p class="cart-item-name">${escapeHTML(product.name)}</p>
            <p class="cart-item-price">${money.format(product.price)} / ud.</p>
            <div class="cart-item-actions">
              <div class="cart-item-qty" role="group" aria-label="Cantidad de ${escapeHTML(product.name)}">
                <button type="button" data-cart-step="-1" data-id="${product.id}" aria-label="Reducir cantidad de ${escapeHTML(product.name)}">${icon("minus", 12)}</button>
                <span aria-live="polite">${qty}</span>
                <button type="button" data-cart-step="1" data-id="${product.id}" aria-label="Aumentar cantidad de ${escapeHTML(product.name)}" ${qty >= max ? "disabled" : ""}>${icon("plus", 12)}</button>
              </div>
              <button class="cart-remove" type="button" data-cart-remove="${product.id}" aria-label="Eliminar ${escapeHTML(product.name)} del carrito">${icon("trash", 15)}</button>
            </div>
          </div>
          <p class="cart-item-total">${money.format(product.price * qty)}</p>
        </li>
      `;
      })
      .join("");

    cartSubtotal.textContent = money.format(subtotal);
    cartShipping.textContent = shippingLabel(subtotal, shipping);
    cartTotal.textContent = money.format(total);

    if (subtotal >= SHIPPING_THRESHOLD) {
      shippingMessage.textContent = "Envío gratis desbloqueado.";
      shippingProgress.style.width = "100%";
    } else {
      shippingMessage.textContent = `Te faltan ${money.format(SHIPPING_THRESHOLD - subtotal)} para el envío gratis.`;
      shippingProgress.style.width = `${Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100)}%`;
    }

    checkoutOpen.disabled = lines.length === 0;
  }

  function renderOrderSummary() {
    const lines = cartLines();
    const subtotal = cartSubtotalValue();
    const shipping = shippingFor(subtotal);
    const total = subtotal + shipping;

    orderList.innerHTML = lines
      .map(({ product, qty }) => `
        <li>
          <span class="order-name">${escapeHTML(product.name)} × ${qty}</span>
          <span class="order-price od-nowrap">${money.format(product.price * qty)}</span>
        </li>
      `)
      .join("");

    orderSubtotal.textContent = money.format(subtotal);
    orderShipping.textContent = shippingLabel(subtotal, shipping);
    orderTotal.textContent = money.format(total);
  }

  function setMenuOpen(open) {
    mobileMenu.hidden = !open;
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.innerHTML = `<span class="sr-only">${open ? "Cerrar menú" : "Abrir menú"}</span>${icon(open ? "close" : "menu")}`;
  }

  function closeMenu() {
    if (!mobileMenu.hidden) setMenuOpen(false);
  }

  function hasOpenLayer() {
    return [productModal, cartRoot, checkoutModal].some(
      (root) => !root.hidden && root.classList.contains("is-open")
    );
  }

  function openLayer(root, focusTarget) {
    hideToast();
    window.clearTimeout(root._hideTimer);
    root.hidden = false;
    document.body.classList.add("is-locked");

    window.requestAnimationFrame(() => {
      root.classList.add("is-open");
      if (focusTarget && typeof focusTarget.focus === "function") {
        focusTarget.focus({ preventScroll: true });
      }
    });
  }

  function closeLayer(root, returnFocus) {
    if (root.hidden) return;
    root.classList.remove("is-open");
    const delay = reducedMotion.matches ? 0 : 230;

    window.clearTimeout(root._hideTimer);
    root._hideTimer = window.setTimeout(() => {
      root.hidden = true;
      if (!hasOpenLayer()) {
        document.body.classList.remove("is-locked");
        if (returnFocus && returnFocus.isConnected) {
          returnFocus.focus({ preventScroll: true });
        }
      }
    }, delay);
  }

  let galleryViews = [];

  function showGalleryView(view) {
    productModalImage.src = view.src;
    productModalImage.alt = view.alt;
    productModalImage.width = view.width;
    productModalImage.height = view.height;
  }

  function renderGallery(product) {
    galleryViews = productViews(product);
    productModalThumbs.innerHTML = galleryViews
      .map(
        (view, index) => `
        <button class="gallery-thumb" type="button" data-view="${index}" aria-pressed="${index === 0}" aria-label="${escapeHTML(view.label)}">
          <img src="${view.src}" alt="" width="60" height="60" decoding="async">
        </button>`
      )
      .join("");
    showGalleryView(galleryViews[0]);
  }

  function renderRating(product) {
    const count = new Intl.NumberFormat("es-ES").format(product.reviews);
    const percent = Math.max(0, Math.min(100, (product.rating / 5) * 100));
    const text = ratingText(product.rating);

    productModalRating.innerHTML = `
      <span class="sr-only">Valoración ${text} de 5, ${count} valoraciones</span>
      <span class="stars" aria-hidden="true">
        <span class="stars-empty">★★★★★</span>
        <span class="stars-fill" style="width:${percent}%">★★★★★</span>
      </span>
      <span class="product-modal-rating-text" aria-hidden="true"><strong>${text}</strong> · ${count} valoraciones</span>
    `;
  }

  function renderRelated(product) {
    // Primero los de la misma categoría, ordenados por valoración.
    const related = PRODUCTS.filter((item) => item.id !== product.id)
      .sort((a, b) => {
        const sameA = a.category === product.category ? 1 : 0;
        const sameB = b.category === product.category ? 1 : 0;
        return sameB - sameA || b.rating - a.rating;
      })
      .slice(0, 3);

    productRelatedList.innerHTML = related
      .map(
        (item) => `
        <button class="related-card" type="button" data-open-product="${item.id}">
          <span class="related-media"><img src="${item.image}" alt="" width="54" height="54" decoding="async"></span>
          <span class="related-body">
            <span class="related-name">${escapeHTML(item.name)}</span>
            <span class="related-price">${money.format(item.price)}</span>
          </span>
        </button>`
      )
      .join("");
  }

  function openProductModal(id, options = {}) {
    const product = getProduct(id);
    if (!product) return;

    closeMenu();
    state.activeProductId = id;
    state.modalQty = 1;
    state.productReturnFocus =
      document.activeElement === document.body ? null : document.activeElement;
    modalQty.textContent = "1";

    renderGallery(product);
    renderRating(product);
    renderRelated(product);
    modalFav.dataset.fav = product.id;
    updateFavButtons();

    productModalBadge.textContent = product.badge;
    productModalBadge.hidden = !product.badge;
    productModalKicker.textContent = product.categoryLabel;
    productModalTitle.textContent = product.name;
    productModalPlatform.textContent = product.platform;
    productModalPrice.textContent = money.format(product.price);

    const stock = stockState(product);
    productModalStock.textContent = stockLabel(product);
    productModalStock.className = `product-modal-stock is-${stock}`;
    modalAdd.disabled = stock === "out";
    modalAddLabel.textContent = stock === "out" ? "Agotado" : "Añadir al carrito";
    modalQtyMinus.disabled = stock === "out";
    modalQtyPlus.disabled = stock === "out";

    productModalDescription.textContent = product.description;
    productModalFeatures.innerHTML = product.features
      .map((feature) => `<li>${icon("check", 15)}<span>${escapeHTML(feature)}</span></li>`)
      .join("");
    productModal.querySelector(".product-modal-card").scrollTop = 0;

    openLayer(productModal, productModal.querySelector(".product-modal-card .modal-close"));

    applyDocumentMeta(product);

    if (options.syncUrl === false) return;
    productEntryPushed = syncURL("push");
  }

  function closeProductModal(restoreFocus = true, syncUrl = true) {
    const wasOpen = !productModal.hidden;
    closeLayer(productModal, restoreFocus ? state.productReturnFocus : null);
    state.activeProductId = null;
    applyDocumentMeta(null);

    if (!syncUrl || !wasOpen) return;

    // Si la ficha añadió una entrada al historial, el botón atrás la cierra.
    if (productEntryPushed) {
      productEntryPushed = false;
      window.history.back();
      return;
    }
    syncURL("replace");
  }

  function openCart(returnFocus = cartTrigger) {
    if (!cartRoot.classList.contains("is-open")) {
      closeMenu();
      closeProductModal(false);
      state.cartReturnFocus = returnFocus;
      renderCart();
      cartRoot.querySelector(".cart-scroll").scrollTop = 0;
      openLayer(cartRoot, cartRoot.querySelector(".cart-close"));
    }
  }

  function closeCart(restoreFocus = true) {
    closeLayer(cartRoot, restoreFocus ? state.cartReturnFocus : null);
  }

  function openCheckout() {
    if (!cartLines().length) {
      showToast("Tu carrito está vacío.");
      return;
    }

    state.checkoutReturnFocus = cartTrigger;
    closeCart(false);
    closeProductModal(false);
    window.clearTimeout(checkoutTimer);
    checkoutTimer = 0;
    renderOrderSummary();
    checkoutForm.reset();
    clearAllErrors();
    checkoutCard.setAttribute("aria-labelledby", "checkout-title");
    checkoutHead.hidden = false;
    checkoutContent.hidden = false;
    checkoutSuccess.hidden = true;
    placeOrder.classList.remove("is-loading");
    placeOrder.disabled = false;
    checkoutCard.scrollTop = 0;
    openLayer(checkoutModal, document.getElementById("name"));
  }

  function closeCheckout(restoreFocus = true) {
    if (checkoutTimer) {
      window.clearTimeout(checkoutTimer);
      checkoutTimer = 0;
      placeOrder.classList.remove("is-loading");
      placeOrder.disabled = false;
    }
    closeLayer(checkoutModal, restoreFocus ? state.checkoutReturnFocus : null);
  }

  function openLayerForCheckoutSuccess() {
    checkoutCard.setAttribute("aria-labelledby", "checkout-success-title");
    checkoutHead.hidden = true;
    checkoutContent.hidden = true;
    checkoutSuccess.hidden = false;
    const reference = `PUL-${String(new Date().getFullYear()).slice(-2)}${String(new Date().getMonth() + 1).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
    orderReference.textContent = reference;
    state.cart = [];
    saveCart();
    renderCart();
    checkoutCard.scrollTop = 0;
    window.setTimeout(() => {
      document.getElementById("checkout-success-title").focus({ preventScroll: true });
    }, 80);
  }

  function getTopLayer() {
    if (!checkoutModal.hidden && checkoutModal.classList.contains("is-open")) return checkoutModal;
    if (!cartRoot.hidden && cartRoot.classList.contains("is-open")) return cartRoot;
    if (!productModal.hidden && productModal.classList.contains("is-open")) return productModal;
    return null;
  }

  function trapFocus(container, event) {
    const focusable = Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((node) => node.getClientRects().length > 0 && !node.closest("[hidden]"));

    if (!focusable.length) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || !container.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !container.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  }

  const validators = {
    name: (value) => (value.trim().length >= 2 ? "" : "Escribe tu nombre completo."),
    email: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? "" : "Escribe un email válido.",
    address: (value) =>
      value.trim().length >= 5 ? "" : "Incluye calle, número y, si aplica, piso.",
    postal: (value) => (/^\d{5}$/.test(value.trim()) ? "" : "Usa un código postal de 5 dígitos."),
    city: (value) => (value.trim().length >= 2 ? "" : "Indica tu ciudad."),
    card: (value) =>
      value.replace(/\D/g, "").length === 16 ? "" : "Introduce 16 dígitos de prueba.",
    expiry: (value) =>
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(value.trim()) ? "" : "Usa el formato MM/AA.",
    cvc: (value) => (/^\d{3,4}$/.test(value.trim()) ? "" : "Introduce 3 o 4 dígitos.")
  };

  const fieldLabels = {
    name: "Nombre completo",
    email: "Email",
    address: "Dirección",
    postal: "Código postal",
    city: "Ciudad",
    card: "Número de tarjeta",
    expiry: "Caducidad",
    cvc: "CVC"
  };

  function setFieldError(name, message) {
    const input = checkoutForm.elements.namedItem(name);
    if (!input) return;
    const wrapper = input.closest(".field");
    const error = document.getElementById(`error-${name}`);
    wrapper.classList.add("has-error");
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", `error-${name}`);
    error.textContent = message;
  }

  function clearFieldError(name) {
    const input = checkoutForm.elements.namedItem(name);
    if (!input) return;
    const wrapper = input.closest(".field");
    const error = document.getElementById(`error-${name}`);
    wrapper.classList.remove("has-error");
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
    error.textContent = "";
  }

  function clearAllErrors() {
    Object.keys(validators).forEach(clearFieldError);
    formErrors.hidden = true;
    formErrorsList.innerHTML = "";
  }

  function validateField(name) {
    const input = checkoutForm.elements.namedItem(name);
    if (!input) return "";
    const message = validators[name](input.value);
    if (message) {
      setFieldError(name, message);
    } else {
      clearFieldError(name);
    }
    return message;
  }

  function validateForm() {
    const errors = [];
    Object.keys(validators).forEach((name) => {
      const message = validateField(name);
      if (message) errors.push({ name, message });
    });
    return errors;
  }

  function showFormErrors(errors) {
    formErrorsList.innerHTML = errors
      .map(
        ({ name }) =>
          `<li><a href="#${name}" data-error-link="${name}">${fieldLabels[name]}</a></li>`
      )
      .join("");
    formErrors.hidden = errors.length === 0;
  }

  function formatCard(input) {
    const digits = input.value.replace(/\D/g, "").slice(0, 16);
    input.value = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  }

  function formatExpiry(input) {
    const digits = input.value.replace(/\D/g, "").slice(0, 4);
    input.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  }

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => applyFilter(chip.dataset.filter, { url: "push" }));
  });

  document.querySelectorAll("[data-platform]").forEach((chip) => {
    chip.addEventListener("click", () => applyPlatform(chip.dataset.platform));
  });

  document.querySelectorAll("[data-price]").forEach((chip) => {
    chip.addEventListener("click", () => applyPrice(chip.dataset.price));
  });

  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    renderProducts();
    syncURL("replace");
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.search = searchInput.value;
    searchClear.hidden = searchInput.value.length === 0;
    closeMenu();
    renderProducts();
    syncURL("replace");
    document.getElementById("catalogo").scrollIntoView({
      behavior: reducedMotion.matches ? "auto" : "smooth",
      block: "start"
    });
  });

  searchInput.addEventListener("input", () => {
    state.search = searchInput.value;
    searchClear.hidden = searchInput.value.length === 0;
    renderProducts();
    syncURL("replace");
  });

  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    state.search = "";
    searchClear.hidden = true;
    renderProducts();
    syncURL("replace");
    searchInput.focus();
  });

  resetFilters.addEventListener("click", () => {
    resetCatalog();
    searchInput.focus();
  });

  navToggle.addEventListener("click", () => {
    setMenuOpen(mobileMenu.hidden);
  });

  cartTrigger.addEventListener("click", () => openCart(cartTrigger));

  document.querySelectorAll("[data-close-product]").forEach((button) => {
    button.addEventListener("click", () => closeProductModal());
  });

  document.querySelectorAll("[data-close-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      closeCart();
      if (button.hasAttribute("data-shop-now")) {
        window.setTimeout(() => applyFilter("all", { scroll: true }), 240);
      }
    });
  });

  document.querySelectorAll("[data-close-checkout]").forEach((button) => {
    button.addEventListener("click", () => closeCheckout());
  });

  checkoutOpen.addEventListener("click", openCheckout);

  successClose.addEventListener("click", () => {
    closeCheckout(false);
    window.setTimeout(() => {
      resetCatalog();
      document.getElementById("catalogo").scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "start"
      });
      cartTrigger.focus({ preventScroll: true });
    }, 250);
  });

  productModalThumbs.addEventListener("click", (event) => {
    const thumb = event.target.closest(".gallery-thumb");
    if (!thumb) return;
    const view = galleryViews[Number(thumb.dataset.view)];
    if (!view) return;
    showGalleryView(view);
    productModalThumbs.querySelectorAll(".gallery-thumb").forEach((node) => {
      node.setAttribute("aria-pressed", String(node === thumb));
    });
  });

  document.getElementById("modal-qty-minus").addEventListener("click", () => {
    state.modalQty = Math.max(1, state.modalQty - 1);
    modalQty.textContent = String(state.modalQty);
  });

  document.getElementById("modal-qty-plus").addEventListener("click", () => {
    const product = getProduct(state.activeProductId);
    const max = product ? Math.min(99, Math.max(1, product.stock)) : 99;
    state.modalQty = Math.min(max, state.modalQty + 1);
    modalQty.textContent = String(state.modalQty);
  });

  modalAdd.addEventListener("click", () => {
    if (!state.activeProductId) return;
    const id = state.activeProductId;
    const qty = state.modalQty;
    addToCart(id, qty);
    closeProductModal(false);
    window.setTimeout(() => openCart(cartTrigger), 260);
  });

  document.addEventListener("click", (event) => {
    const filterLink = event.target.closest("[data-filter-link]");
    if (filterLink) {
      event.preventDefault();
      const filter = filterLink.dataset.filterLink;
      applyFilter(filter, { scroll: true, url: "push" });
      const activeChip = filterChips.find((chip) => chip.dataset.filter === filter);
      if (activeChip) activeChip.focus({ preventScroll: true });
      return;
    }

    const favButton = event.target.closest("[data-fav]");
    if (favButton) {
      toggleFavorite(favButton.dataset.fav);
      return;
    }

    const productTrigger = event.target.closest("[data-open-product]");
    if (productTrigger) {
      openProductModal(productTrigger.dataset.openProduct);
      return;
    }

    const addButton = event.target.closest("[data-add-to-cart]");
    if (addButton) {
      const id = addButton.dataset.addToCart;
      addToCart(id, 1);
      addButton.classList.add("is-added");
      addButton.innerHTML = `${icon("check", 14)}<span>Añadido</span>`;
      window.clearTimeout(addButton._feedbackTimer);
      addButton._feedbackTimer = window.setTimeout(() => {
        addButton.classList.remove("is-added");
        addButton.innerHTML = `${icon("plus", 14)}<span>Añadir</span>`;
      }, 1200);
      return;
    }

    const cartStep = event.target.closest("[data-cart-step]");
    if (cartStep) {
      const id = cartStep.dataset.id;
      const step = Number(cartStep.dataset.cartStep);
      const item = state.cart.find((entry) => entry.id === id);
      if (item) {
        setCartQuantity(id, item.qty + step);
        const nextControl = cartItems.querySelector(
          `[data-cart-step="${step}"][data-id="${id}"]`
        );
        if (nextControl) nextControl.focus({ preventScroll: true });
      }
      return;
    }

    const cartRemove = event.target.closest("[data-cart-remove]");
    if (cartRemove) {
      removeCartItem(cartRemove.dataset.cartRemove);
      return;
    }

    const errorLink = event.target.closest("[data-error-link]");
    if (errorLink) {
      event.preventDefault();
      const field = checkoutForm.elements.namedItem(errorLink.dataset.errorLink);
      if (field) field.focus();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!checkoutModal.hidden && checkoutModal.classList.contains("is-open")) {
        closeCheckout();
        return;
      }
      if (!cartRoot.hidden && cartRoot.classList.contains("is-open")) {
        closeCart();
        return;
      }
      if (!productModal.hidden && productModal.classList.contains("is-open")) {
        closeProductModal();
        return;
      }
      if (!mobileMenu.hidden) {
        setMenuOpen(false);
        navToggle.focus();
      }
    }

    if (event.key === "Tab") {
      const topLayer = getTopLayer();
      if (topLayer) trapFocus(topLayer, event);
    }
  });

  Object.keys(validators).forEach((name) => {
    const input = checkoutForm.elements.namedItem(name);
    if (!input) return;

    input.addEventListener("blur", () => {
      validateField(name);
    });

    input.addEventListener("input", () => {
      if (name === "card") formatCard(input);
      if (name === "expiry") formatExpiry(input);
      if (input.closest(".field").classList.contains("has-error")) {
        clearFieldError(name);
      }
      if (formErrors.hidden === false) {
        const remaining = Object.keys(validators).some((fieldName) => {
          const field = checkoutForm.elements.namedItem(fieldName);
          return validators[fieldName](field.value);
        });
        if (!remaining) {
          formErrors.hidden = true;
          formErrorsList.innerHTML = "";
        }
      }
    });
  });

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (placeOrder.disabled) return;

    const errors = validateForm();
    showFormErrors(errors);

    if (errors.length) {
      const first = checkoutForm.elements.namedItem(errors[0].name);
      if (first) first.focus();
      return;
    }

    placeOrder.classList.add("is-loading");
    placeOrder.disabled = true;

    checkoutTimer = window.setTimeout(() => {
      checkoutTimer = 0;
      placeOrder.classList.remove("is-loading");
      placeOrder.disabled = false;
      openLayerForCheckoutSuccess();
    }, 900);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) closeMenu();
  });

  // Atrás/adelante del navegador reconstruyen catálogo y ficha desde la URL.
  window.addEventListener("popstate", () => {
    productEntryPushed = false;
    applyURLState();
  });

  applyURLState();
  renderCart();

  // Las páginas de producto enlazan con ?carrito=1 para abrir el carrito al llegar.
  if (new URLSearchParams(window.location.search).get("carrito") === "1") {
    openCart(cartTrigger);
    syncURL("replace");
  }

  // Un enlace con filtro o búsqueda debe aterrizar en el catálogo, no en el hero.
  const incoming = readURL();
  if (
    !incoming.product &&
    (incoming.filter !== "all" ||
      incoming.platform !== "all" ||
      incoming.price !== "all" ||
      incoming.search)
  ) {
    document.getElementById("catalogo").scrollIntoView({ behavior: "auto", block: "start" });
  }

  // PWA: tras la primera visita la tienda se abre también sin conexión.
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {
        // Sin service worker la web sigue funcionando; solo se pierde el modo offline.
      });
    });
  }
})();
