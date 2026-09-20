(() => {
  // Each placement gets its own document so the vendor's atOptions cannot collide.
  const units = {
    short: { key: '691057f9481bb636fa9eb690820b01ea', height: 300 },
    tall: { key: 'dbedf2b5c1140efacee3f2392e2d1ca7', height: 600 },
  };
  const desktop = window.matchMedia('(min-width: 1280px) and (min-height: 720px)');
  const pending = new Set();

  function load(slot) {
    if (slot.dataset.adLoaded || !slot.isConnected || slot.getClientRects().length === 0) return;
    if (slot.dataset.adUnit === 'tall' && !desktop.matches) return;
    const unit = units[slot.dataset.adUnit];
    if (!unit) return;
    slot.dataset.adLoaded = 'true';
    const frame = document.createElement('iframe');
    frame.title = slot.getAttribute('aria-label') || 'Advertisement';
    frame.width = '160';
    frame.height = String(unit.height);
    frame.setAttribute('scrolling', 'no');
    frame.setAttribute('frameborder', '0');
    // Keep navigation initiated by an ad inside a new tab, not the content page.
    frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox');
    frame.src = `/ad-placements/${unit.key}.html`;
    slot.append(frame);
    pending.delete(slot);
    observer?.unobserve(slot);
  }

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) load(entry.target); }), { rootMargin: '200px 0px' })
    : null;

  function scan() {
    const nativeSlot = document.querySelector('[data-native-ad]');
    if (nativeSlot && !nativeSlot.dataset.adLoaded) {
      nativeSlot.dataset.adLoaded = 'true';
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl31423357.profitableratecpmnetwork.com/d93522345fe7fd01c719b5d879c19138/invoke.js';
      nativeSlot.before(script);
    }
    for (const slot of document.querySelectorAll('[data-ad-unit]')) {
      if (slot.dataset.adLoaded || pending.has(slot)) continue;
      pending.add(slot);
      if (observer) observer.observe(slot);
      else load(slot);
    }
    for (const slot of pending) {
      if (!slot.isConnected) { pending.delete(slot); observer?.unobserve(slot); }
    }
  }

  desktop.addEventListener('change', () => {
    for (const slot of pending) {
      if (observer) { observer.unobserve(slot); observer.observe(slot); }
      else load(slot);
    }
  });
  scan();
  // The homepage mounts through React; static guide pages are present immediately.
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
})();
