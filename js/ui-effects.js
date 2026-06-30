(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktopQuery = window.matchMedia("(min-width: 821px)");
  const header = document.querySelector(".site-header");
  const heroes = document.querySelectorAll(".hero, .hero-slider, .product-hero");

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (reducedMotion || !desktopQuery.matches) return;

  heroes.forEach((hero) => {
    const layers = hero.querySelectorAll(".hero-bg, .featured-slide-media img");
    if (!layers.length) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;

    const render = () => {
      frame = 0;
      layers.forEach((layer) => {
        layer.style.setProperty("--hero-shift-x", `${targetX}px`);
        layer.style.setProperty("--hero-shift-y", `${targetY}px`);
      });
    };

    hero.addEventListener("mousemove", (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = Math.max(-15, Math.min(15, x * 30));
      targetY = Math.max(-15, Math.min(15, y * 30));

      if (!frame) {
        frame = requestAnimationFrame(render);
      }
    });

    hero.addEventListener("mouseleave", () => {
      targetX = 0;
      targetY = 0;

      if (!frame) {
        frame = requestAnimationFrame(render);
      }
    });
  });
})();
