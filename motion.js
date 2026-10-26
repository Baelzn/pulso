/* ============================================================================
   PULSO · MOTOR DE MOVIMIENTO
   - Tilt 3D (delegado: funciona con tarjetas que se re-renderizan)
   - Revelado al scroll con IntersectionObserver
   - Parallax del hero ligado al scroll
   - Botones magnéticos, halo de cursor y cabecera condensada
   - Interruptor que reactiva el movimiento aunque el sistema lo reduzca
   ========================================================================== */

(() => {
  "use strict";

  const root = document.documentElement;

  // Marca que el motor de movimiento está vivo. Sin esta clase, el CSS nunca
  // oculta contenido (si el JS falla, la página se ve igual).
  root.classList.add("js-motion");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  const MOTION_KEY = "pulso-motion";

  // El sistema manda, salvo que la persona active el interruptor del footer.
  const motionEnabled = () =>
    !reducedMotion.matches || root.dataset.motion === "on";

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  /* -------------------------------------------------------------------------
     Preferencia guardada
     ---------------------------------------------------------------------- */

  try {
    if (window.localStorage.getItem(MOTION_KEY) === "on") {
      root.dataset.motion = "on";
    }
  } catch {
    /* almacenamiento bloqueado: seguimos con la preferencia del sistema */
  }

  /* -------------------------------------------------------------------------
     Revelado al scroll
     ---------------------------------------------------------------------- */

  let ioFired = false;

  const revealObserver = new IntersectionObserver(
    (entries) => {
      ioFired = true;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        revealObserver.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.12 }
  );

  function revealAll() {
    document.querySelectorAll("[data-reveal]").forEach((node) => node.classList.add("is-revealed"));
    revealTitles();
  }

  function observeReveals() {
    const nodes = Array.from(document.querySelectorAll("[data-reveal]:not(.is-revealed)"));
    nodes.forEach((node, index) => {
      if (!node.style.getPropertyValue("--reveal-delay")) {
        node.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 70}ms`);
      }
      revealObserver.observe(node);
    });
  }

  /* -------------------------------------------------------------------------
     Entrada escalonada de las tarjetas de producto
     ---------------------------------------------------------------------- */

  const productGrid = document.getElementById("product-grid");

  function staggerCards() {
    if (!productGrid) return;
    const cards = Array.from(productGrid.querySelectorAll(".product-card"));
    cards.forEach((card, index) => {
      card.classList.remove("is-entering");
      void card.offsetWidth; // reinicia la animación
      card.style.setProperty("--enter-delay", `${Math.min(index, 8) * 55}ms`);
      card.classList.add("is-entering");
    });
  }

  /* -------------------------------------------------------------------------
     Título del hero: revelado palabra por palabra
     ---------------------------------------------------------------------- */

  let heroWords = null;

  function splitHeroTitle() {
    const title = document.getElementById("hero-title");
    if (!title || title.dataset.split === "1") return heroWords;

    const accessibleText = title.textContent.replace(/\s+/g, " ").trim();
    const fragment = document.createDocumentFragment();
    const words = [];

    const pushWord = (text, accent) => {
      const word = document.createElement("span");
      word.className = accent ? "hero-word accent" : "hero-word";

      const inner = document.createElement("span");
      inner.className = "hero-word-in";
      inner.textContent = text;
      word.appendChild(inner);

      fragment.appendChild(word);
      fragment.appendChild(document.createTextNode(" "));
      words.push(word);
    };

    Array.from(title.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent
          .split(/\s+/)
          .filter(Boolean)
          .forEach((word) => pushWord(word, false));
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const accent = node.classList.contains("accent");
        node.textContent
          .split(/\s+/)
          .filter(Boolean)
          .forEach((word) => pushWord(word, accent));
      }
    });

    if (!words.length) return null;

    title.textContent = "";
    title.appendChild(fragment);
    title.dataset.split = "1";
    title.setAttribute("aria-label", accessibleText);

    heroWords = words;
    return words;
  }

  function playHeroTitle() {
    const words = splitHeroTitle();
    if (!words) return;

    // Reinicia por si se vuelve a activar el movimiento.
    words.forEach((word) => {
      word.classList.remove("is-in");
      void word.offsetWidth;
    });

    words.forEach((word, index) => {
      word.style.setProperty("--word-delay", `${index * 65}ms`);
      word.classList.add("is-armed");
      word.classList.add("is-in");
    });
  }

  function resetHeroTitle() {
    if (!heroWords) return;
    heroWords.forEach((word) => {
      word.classList.remove("is-armed", "is-in");
      word.style.removeProperty("--word-delay");
    });
  }

  /* -------------------------------------------------------------------------
     Títulos de sección: revelado palabra a palabra
     ---------------------------------------------------------------------- */

  const titleObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        titleObserver.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.35 }
  );

  function splitSectionTitles() {
    document.querySelectorAll("[data-reveal-title]").forEach((title) => {
      if (title.dataset.split === "1") return;

      const text = title.textContent.replace(/\s+/g, " ").trim();
      const words = text.split(" ").filter(Boolean);
      if (!words.length) return;

      title.textContent = "";
      words.forEach((word, index) => {
        const outer = document.createElement("span");
        outer.className = "title-word";

        const inner = document.createElement("span");
        inner.className = "title-word-in";
        inner.textContent = word;
        inner.style.setProperty("--word-delay", `${index * 55}ms`);

        outer.appendChild(inner);
        title.appendChild(outer);
        if (index < words.length - 1) title.appendChild(document.createTextNode(" "));
      });

      title.dataset.split = "1";
      title.setAttribute("aria-label", text);
      titleObserver.observe(title);
    });
  }

  function revealTitles() {
    document.querySelectorAll("[data-reveal-title]").forEach((title) => {
      title.classList.add("is-revealed");
    });
  }

  /* -------------------------------------------------------------------------
     Tilt 3D delegado
     ---------------------------------------------------------------------- */

  let activeTilt = null;
  let pointerX = 0;
  let pointerY = 0;
  let tiltFrame = 0;

  function resetTilt(el) {
    if (!el) return;
    el.classList.remove("is-tilting");
    el.style.setProperty("--tilt-rx", "0deg");
    el.style.setProperty("--tilt-ry", "0deg");
    el.style.setProperty("--tilt-x", "0");
    el.style.setProperty("--tilt-y", "0");
    el.style.setProperty("--sheen-x", "50%");
    el.style.setProperty("--sheen-y", "50%");
  }

  function applyTilt() {
    tiltFrame = 0;
    const el = activeTilt;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const nx = clamp(((pointerX - rect.left) / rect.width - 0.5) * 2, -1, 1);
    const ny = clamp(((pointerY - rect.top) / rect.height - 0.5) * 2, -1, 1);

    const isCard = el.classList.contains("product-card");
    const max = isCard ? 6 : Number.parseFloat(el.dataset.tiltMax || "6") || 6;

    el.style.setProperty("--tilt-ry", `${(nx * max).toFixed(2)}deg`);
    el.style.setProperty("--tilt-rx", `${(-ny * max).toFixed(2)}deg`);
    el.style.setProperty("--tilt-x", nx.toFixed(3));
    el.style.setProperty("--tilt-y", ny.toFixed(3));

    if (isCard) {
      el.style.setProperty("--sheen-x", `${((pointerX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--sheen-y", `${((pointerY - rect.top) / rect.height) * 100}%`);
    }
  }

  function onPointerMove(event) {
    if (event.pointerType !== "mouse") return;

    if (!motionEnabled()) {
      endTilt();
      return;
    }

    pointerX = event.clientX;
    pointerY = event.clientY;

    const target =
      event.target instanceof Element
        ? event.target.closest("[data-tilt], .product-card")
        : null;

    if (target !== activeTilt) {
      resetTilt(activeTilt);
      activeTilt = target;
      if (activeTilt) activeTilt.classList.add("is-tilting");
    }

    if (activeTilt && !tiltFrame) {
      tiltFrame = window.requestAnimationFrame(applyTilt);
    }
  }

  function endTilt() {
    resetTilt(activeTilt);
    activeTilt = null;
  }

  /* -------------------------------------------------------------------------
     Parallax del hero y cabecera condensada
     ---------------------------------------------------------------------- */

  const hero = document.querySelector(".hero");
  const header = document.querySelector(".site-header");
  const grid = document.querySelector(".product-grid");
  const featureVisual = document.querySelector(".feature-visual");
  let scrollFrame = 0;
  let progressBar = null;

  function initProgressBar() {
    if (progressBar) return;
    progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.setAttribute("aria-hidden", "true");
    document.body.appendChild(progressBar);
  }

  function updateScrollEffects() {
    scrollFrame = 0;

    if (hero && motionEnabled()) {
      const rect = hero.getBoundingClientRect();
      const progress = clamp(-rect.top / Math.max(rect.height, 1), 0, 1);
      hero.style.setProperty("--scroll-progress", progress.toFixed(4));
    } else if (hero) {
      hero.style.setProperty("--scroll-progress", "0");
    }

    /* Las tarjetas se inclinan en 3D según su posición en la pantalla. */
    if (grid && motionEnabled()) {
      const vh = window.innerHeight;
      const cards = Array.from(grid.children);
      const rects = cards.map((card) => card.getBoundingClientRect());

      cards.forEach((card, index) => {
        const rect = rects[index];
        if (!rect.height) return;

        let rx = 0;
        let pop = 1;

        if (rect.bottom >= -vh * 0.25 && rect.top <= vh * 1.25) {
          const offset = clamp((rect.top + rect.height / 2 - vh / 2) / (vh / 2), -1, 1);
          rx = Math.round(offset * 40) / 10;
          pop = Math.round((1 - Math.abs(offset) * 0.025) * 1000) / 1000;
        }

        if (card._rx === rx && card._pop === pop) return;

        card._rx = rx;
        card._pop = pop;
        card.style.setProperty("--card-rx", `${rx}deg`);
        card.style.setProperty("--card-pop", `${pop}`);
      });
    } else if (grid) {
      grid.querySelectorAll(".product-card").forEach((card) => {
        if (card._rx === 0 && card._pop === 1) return;
        card._rx = 0;
        card._pop = 1;
        card.style.setProperty("--card-rx", "0deg");
        card.style.setProperty("--card-pop", "1");
      });
    }

    /* El mando gira en 3D mientras la sección cruza la pantalla. */
    if (featureVisual && motionEnabled()) {
      const rect = featureVisual.getBoundingClientRect();
      const travel = clamp(
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
        0,
        1
      );
      const signed = travel * 2 - 1;
      const ry = Math.round(signed * -130) / 10;
      const roll = Math.round(signed * 30) / 10;
      const shift = Math.round(signed * -160) / 10;

      if (featureVisual._ry !== ry) {
        featureVisual._ry = ry;
        featureVisual.style.setProperty("--feature-ry", `${ry}deg`);
        featureVisual.style.setProperty("--feature-roll", `${roll}deg`);
        featureVisual.style.setProperty("--feature-shift", `${shift}px`);
      }
    } else if (featureVisual) {
      featureVisual._ry = null;
      featureVisual.style.setProperty("--feature-ry", "0deg");
      featureVisual.style.setProperty("--feature-roll", "0deg");
      featureVisual.style.setProperty("--feature-shift", "0px");
    }

    if (progressBar) {
      progressBar.hidden = !motionEnabled();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
      progressBar.style.setProperty("--scroll-ratio", ratio.toFixed(4));
    }

    if (header) {
      header.classList.toggle("is-condensed", window.scrollY > 24);
    }
  }

  function onScroll() {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollEffects);
  }

  /* -------------------------------------------------------------------------
     Botones magnéticos
     ---------------------------------------------------------------------- */

  function attachMagnets() {
    document.querySelectorAll(".btn, .hero-product-link, .add-btn").forEach((button) => {
      if (button.dataset.magnetBound === "1") return;
      button.dataset.magnetBound = "1";

      button.addEventListener("pointermove", (event) => {
        if (event.pointerType !== "mouse" || !motionEnabled()) return;
        const rect = button.getBoundingClientRect();
        const dx = clamp((event.clientX - rect.left - rect.width / 2) * 0.3, -12, 12);
        const dy = clamp((event.clientY - rect.top - rect.height / 2) * 0.38, -10, 10);
        button.classList.add("is-magnetized");
        button.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
      });

      button.addEventListener("pointerleave", () => {
        button.classList.remove("is-magnetized");
        button.style.transform = "";
      });
    });
  }

  /* -------------------------------------------------------------------------
     Halo de cursor
     ---------------------------------------------------------------------- */

  let glow = null;
  let glowFrame = 0;
  let glowX = 0;
  let glowY = 0;

  function initGlow() {
    if (!finePointer.matches) return;
    glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);

    document.addEventListener(
      "pointermove",
      (event) => {
        if (event.pointerType !== "mouse") return;
        if (!motionEnabled()) {
          glow.classList.remove("is-active");
          return;
        }
        glowX = event.clientX;
        glowY = event.clientY;
        glow.classList.add("is-active");
        if (!glowFrame) {
          glowFrame = window.requestAnimationFrame(() => {
            glowFrame = 0;
            glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
          });
        }
      },
      { passive: true }
    );

    document.addEventListener("pointerleave", () => glow.classList.remove("is-active"));
  }

  /* -------------------------------------------------------------------------
     Interruptor de animaciones
     ---------------------------------------------------------------------- */

  const toggle = document.getElementById("motion-toggle");
  const toggleLabel = document.getElementById("motion-toggle-label");

  function syncToggle() {
    if (!toggle) return;
    const on = motionEnabled();
    toggle.setAttribute("aria-pressed", String(on));
    if (toggleLabel) {
      toggleLabel.textContent = on ? "Desactivar animaciones" : "Activar animaciones";
    }
  }

  function setMotion(next) {
    root.dataset.motion = next;
    try {
      window.localStorage.setItem(MOTION_KEY, next);
    } catch {
      /* sin persistencia: vale solo para esta sesión */
    }

    if (next === "off") {
      endTilt();
      resetHeroTitle();
      if (glow) glow.classList.remove("is-active");
      document.querySelectorAll(".is-magnetized").forEach((el) => {
        el.classList.remove("is-magnetized");
        el.style.transform = "";
      });
    } else {
      playHeroTitle();
      staggerCards();
    }

    syncToggle();
    updateScrollEffects();
    window.dispatchEvent(
      new CustomEvent("pulso:motionchange", { detail: { enabled: next === "on" } })
    );
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      setMotion(root.dataset.motion === "on" ? "off" : "on");
    });
  }

  /* Aviso flotante: solo si el sistema reduce el movimiento y no hay
     preferencia guardada. Así las animaciones son descubribles. */
  function initMotionHint() {
    if (!reducedMotion.matches) return;

    let stored = null;
    try {
      stored = window.localStorage.getItem(MOTION_KEY);
    } catch {
      /* sin almacenamiento: mostramos el aviso igualmente */
    }
    if (stored === "on" || stored === "off") return;

    const hint = document.createElement("div");
    hint.className = "motion-hint";
    hint.innerHTML = [
      "<p>Tu sistema tiene el movimiento reducido.</p>",
      '<button type="button" data-motion-on>Activar animaciones</button>',
      '<button type="button" class="motion-hint-close" aria-label="Descartar aviso">&times;</button>',
    ].join("");

    document.body.appendChild(hint);

    hint.querySelector("[data-motion-on]").addEventListener("click", () => {
      setMotion("on");
      hint.remove();
    });

    hint.querySelector(".motion-hint-close").addEventListener("click", () => {
      setMotion("off");
      hint.remove();
    });
  }

  /* -------------------------------------------------------------------------
     Arranque
     ---------------------------------------------------------------------- */

  function start() {
    splitSectionTitles();
    observeReveals();
    if (motionEnabled()) {
      playHeroTitle();
      staggerCards();
    }

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", endTilt, { passive: true });
    window.addEventListener("blur", endTilt);

    initProgressBar();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScrollEffects();

    attachMagnets();
    initGlow();
    initMotionHint();
    syncToggle();

    if (productGrid) {
      new MutationObserver(() => {
        attachMagnets();
        if (motionEnabled()) staggerCards();
      }).observe(productGrid, { childList: true });
    }

    const appReady = () => {
      observeReveals();
      attachMagnets();
    };

    if (document.readyState === "complete") appReady();
    else window.addEventListener("load", appReady, { once: true });

    // Red de seguridad: si el observer nunca disparó, muestra todo.
    window.setTimeout(() => {
      if (!ioFired) revealAll();
    }, 2500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
