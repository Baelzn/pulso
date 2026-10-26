/* Página de producto estática (p/<id>.html).
   Comparte el carrito con la tienda: mismo localStorage y mismo formato. */
(() => {
  "use strict";

  const CART_KEY = "pulso-cart-v1";
  const toast = document.getElementById("toast");
  let toastTimer = 0;

  function readCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  function writeCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      return;
    }
  }

  function cartQuantity() {
    return readCart().reduce(
      (sum, item) => sum + Math.max(1, Math.min(99, Number(item.qty) || 1)),
      0
    );
  }

  function renderCartCount() {
    const count = cartQuantity();
    document.querySelectorAll("[data-cart-count]").forEach((node) => {
      node.textContent = String(count);
    });

    const trigger = document.querySelector(".cart-trigger");
    if (trigger) {
      const noun = count === 1 ? "artículo" : "artículos";
      trigger.setAttribute("aria-label", `Abrir carrito, ${count} ${noun}`);
    }
  }

  function showToast(message) {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
  }

  function addToCart(id, stock) {
    const cart = readCart().map((item) => ({
      id: String(item.id),
      qty: Math.max(1, Math.min(99, Number(item.qty) || 1))
    }));

    const max = Math.max(1, Math.min(99, Number(stock) || 99));
    const line = cart.find((item) => item.id === id);

    if (line) {
      if (line.qty >= max) {
        showToast("No quedan más unidades de este producto.");
        return;
      }
      line.qty = Math.min(max, line.qty + 1);
    } else {
      cart.push({ id, qty: 1 });
    }

    writeCart(cart);
    renderCartCount();
    showToast("Añadido al carrito. Puedes verlo en la tienda.");
  }

  function showView(thumb) {
    const image = document.getElementById("product-image");
    if (!image || !thumb.dataset.src) return;

    image.src = thumb.dataset.src;
    image.alt = thumb.dataset.alt || image.alt;

    document.querySelectorAll(".gallery-thumb").forEach((node) => {
      node.setAttribute("aria-pressed", String(node === thumb));
    });
  }

  document.addEventListener("click", (event) => {
    const add = event.target.closest("[data-add-to-cart]");
    if (add) {
      addToCart(add.dataset.addToCart, add.dataset.stock);
      return;
    }

    const thumb = event.target.closest(".gallery-thumb");
    if (thumb) showView(thumb);
  });

  renderCartCount();

  // Mismo service worker que la portada (su ámbito es la raíz del sitio).
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("../sw.js", { scope: "../" }).catch(() => {});
    });
  }
})();
