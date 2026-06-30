(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealItems = new Map();

  const addReveal = (element, delay = 0) => {
    if (!element || revealItems.has(element)) return;
    revealItems.set(element, delay);
  };

  const addAll = (selector, delay = 0) => {
    document.querySelectorAll(selector).forEach((element) => addReveal(element, delay));
  };

  const addStagger = (selector, step = 60) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      addReveal(element, index * step);
    });
  };

  addAll(".hero, .hero-slider, .page-hero, .product-hero", 0);
  addAll(".section-heading, .small-heading", 80);
  addAll(".featured-carousel, .apps-search, .site-footer", 120);
  addStagger(".stats-grid .stat-card, .apps-grid .app-card, .package-grid .package-card, .contact-grid .contact-card", 60);

  if (reducedMotion) {
    revealItems.forEach((delay, element) => {
      element.classList.add("is-visible");
    });
    return;
  }

  revealItems.forEach((delay, element) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${delay}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  });

  revealItems.forEach((delay, element) => observer.observe(element));
})();
