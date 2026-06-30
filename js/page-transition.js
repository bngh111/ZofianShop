(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const transitionDuration = 220;

  const showPage = () => {
    if (reducedMotion) return;

    document.body.classList.remove("page-transition-out", "is-page-ready");
    document.body.classList.add("page-transition-in");

    requestAnimationFrame(() => {
      document.body.classList.add("is-page-ready");
    });
  };

  const isModifiedClick = (event) => (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );

  const shouldSkipLink = (link) => {
    if (!link) return true;
    if (link.target === "_blank" || link.hasAttribute("download")) return true;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return true;
    if (href.startsWith("mailto:") || href.startsWith("tel:")) return true;

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return true;
    if (url.pathname === window.location.pathname && url.hash) return true;

    return false;
  };

  const handleLinkClick = (event) => {
    if (reducedMotion || isModifiedClick(event)) return;

    const link = event.target.closest("a");
    if (shouldSkipLink(link)) return;

    event.preventDefault();
    document.body.classList.remove("page-transition-in", "is-page-ready");
    document.body.classList.add("page-transition-out");

    window.setTimeout(() => {
      window.location.href = link.href;
    }, transitionDuration);
  };

  window.addEventListener("pageshow", showPage);
  document.addEventListener("click", handleLinkClick);
})();
