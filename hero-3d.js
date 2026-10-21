/* ============================================================================
   PULSO · ESCENA 3D DEL HERO (Three.js)
   Núcleo wireframe + carcasa exterior + anillos + polvo + chispas lima.
   Responde al puntero y al scroll. Se pausa fuera de pantalla y respeta
   prefers-reduced-motion (con override desde el interruptor del footer).
   ========================================================================== */

import * as THREE from "./assets/vendor/three.module.min.js";

const canvas = document.getElementById("hero-3d");
const stage = canvas ? canvas.parentElement : null;

if (canvas && stage) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motionEnabled = () =>
    !reducedMotion.matches || document.documentElement.dataset.motion === "on";

  const INK = 0x111511;
  const LIME = 0xd6ff4f;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch (error) {
    canvas.hidden = true;
    renderer = null;
  }

  if (renderer) {
    renderer.setClearAlpha(0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 6.4);

    const group = new THREE.Group();
    scene.add(group);

    /* --- Núcleo: icosaedro wireframe --- */
    const coreGeometry = new THREE.IcosahedronGeometry(1.62, 1);
    const core = new THREE.LineSegments(
      new THREE.WireframeGeometry(coreGeometry),
      new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.52 })
    );
    group.add(core);

    /* --- Carcasa exterior: malla más abierta y lenta --- */
    const shellGeometry = new THREE.IcosahedronGeometry(2.42, 0);
    const shell = new THREE.LineSegments(
      new THREE.WireframeGeometry(shellGeometry),
      new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.2 })
    );
    group.add(shell);

    /* --- Vértices del núcleo en lima --- */
    const vertexPositions = coreGeometry.attributes.position.array;
    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute("position", new THREE.BufferAttribute(vertexPositions, 3));
    const dots = new THREE.Points(
      dotGeometry,
      new THREE.PointsMaterial({
        color: LIME,
        size: 0.1,
        sizeAttenuation: true,
        transparent: true,
        opacity: 1,
        depthWrite: false,
      })
    );
    group.add(dots);

    /* --- Anillos orbitales --- */
    function makeRing(radius, segments, opacity) {
      const points = [];
      for (let i = 0; i <= segments; i += 1) {
        const angle = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return new THREE.LineLoop(
        geometry,
        new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity })
      );
    }

    const ring = makeRing(2.45, 180, 0.34);
    ring.rotation.x = Math.PI / 2.6;
    ring.rotation.y = 0.24;
    group.add(ring);

    const ring2 = makeRing(2.05, 150, 0.24);
    ring2.rotation.x = Math.PI / 1.9;
    ring2.rotation.z = 0.6;
    group.add(ring2);

    const ring3 = makeRing(2.9, 200, 0.14);
    ring3.rotation.x = Math.PI / 3.4;
    ring3.rotation.y = -0.5;
    group.add(ring3);

    /* --- Polvo: nube de partículas alrededor --- */
    function makeCloud(count, innerRadius, outerRadius, size, opacity, color, flat) {
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i += 1) {
        const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * flat;
        positions[i * 3 + 2] = radius * Math.cos(phi);
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      return new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
          color,
          size,
          sizeAttenuation: true,
          transparent: true,
          opacity,
          depthWrite: false,
        })
      );
    }

    const dust = makeCloud(900, 2.6, 5.4, 0.03, 0.42, INK, 0.62);
    scene.add(dust);

    // Chispas lima: pocas, pequeñas y brillantes.
    const sparks = makeCloud(110, 2.2, 4.6, 0.055, 0.85, LIME, 0.75);
    scene.add(sparks);

    /* --- Tamaño / densidad de píxeles --- */
    let width = 0;
    let height = 0;
    let baseZ = 6.4;

    function resize() {
      const rect = stage.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      baseZ = camera.aspect < 1 ? 7.8 : 6.4;
      camera.position.z = baseZ;
      camera.updateProjectionMatrix();
      if (!motionEnabled()) renderStatic();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);

    /* --- Interacción --- */
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    const hero = stage.closest(".hero");

    function onPointerMove(event) {
      const rect = stage.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    }

    /* --- Bucle --- */
    let visible = true;
    let frame = 0;
    const clock = new THREE.Clock();

    function renderStatic() {
      group.rotation.set(0.38, 0.6, 0.18);
      shell.rotation.set(-0.2, 0.4, 0);
      ring.rotation.z = 0.2;
      dust.rotation.set(0.1, 0.2, 0);
      sparks.rotation.set(-0.1, 0.35, 0);
      renderer.render(scene, camera);
    }

    function tick() {
      frame = 0;
      if (!visible) return;

      const elapsed = clock.getElapsedTime();
      eased.x += (pointer.x - eased.x) * 0.055;
      eased.y += (pointer.y - eased.y) * 0.055;

      /* Progreso de scroll dentro del hero (0 → 1). */
      let progress = 0;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      }

      /* Núcleo: giro constante + empuje del puntero + vuelco por scroll. */
      group.rotation.y = elapsed * 0.42 + eased.x * 0.62;
      group.rotation.x = Math.sin(elapsed * 0.34) * 0.16 + eased.y * 0.36;
      group.rotation.z = progress * 0.85 + Math.sin(elapsed * 0.21) * 0.05;

      /* Carcasa en contrafase: da sensación de dos volúmenes. */
      shell.rotation.y = elapsed * -0.19 - eased.x * 0.22;
      shell.rotation.x = Math.cos(elapsed * 0.24) * 0.22;

      ring.rotation.z = elapsed * 0.22;
      ring2.rotation.y = elapsed * -0.31;
      ring3.rotation.z = elapsed * 0.13;

      dust.rotation.y = elapsed * 0.055 + eased.x * 0.12;
      dust.rotation.x = Math.sin(elapsed * 0.15) * 0.06;
      sparks.rotation.y = elapsed * -0.08 + eased.x * 0.18;
      sparks.rotation.z = Math.sin(elapsed * 0.4) * 0.1;

      /* Latido sutil del conjunto. */
      const beat = 1 + Math.sin(elapsed * 1.1) * 0.012;
      group.scale.setScalar(beat);

      camera.position.x = eased.x * 0.55;
      camera.position.y = -eased.y * 0.42;
      camera.position.z = baseZ - progress * 1.1;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      if (!document.hidden) frame = window.requestAnimationFrame(tick);
    }

    function startLoop() {
      if (!motionEnabled()) {
        renderStatic();
        return;
      }
      if (!frame) {
        frame = window.requestAnimationFrame(tick);
      }
    }

    function stopLoop() {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    }

    function syncLoop() {
      stopLoop();
      if (!motionEnabled()) renderStatic();
      else if (visible) startLoop();
    }

    new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible) {
          clock.start();
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.02 }
    ).observe(stage);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopLoop();
      else if (visible) startLoop();
    });

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      stage.addEventListener("pointermove", onPointerMove, { passive: true });
      stage.addEventListener(
        "pointerleave",
        () => {
          pointer.x = 0;
          pointer.y = 0;
        },
        { passive: true }
      );
    }

    reducedMotion.addEventListener("change", syncLoop);
    window.addEventListener("pulso:motionchange", syncLoop);

    resize();
    startLoop();

    // Hook de depuración: permite comprobar que la escena realmente dibuja.
    window.__pulso3d = { renderer, scene, camera, group, shell };
  }
}
