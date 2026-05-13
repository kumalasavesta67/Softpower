(function () {
  var SELECTORS = [
    '.card', '.scard',
    '.section-head', '.section-head-grid',
    '.story-grid > *',
    '.series-row',
    '.billboard-grid > *',
    '.spotlight-grid > *',
    '.impact-grid > *',
    '.decade',
    '.director-card',
    '.platform-card',
    '.fest-card',
    '.ledger-row',
    '.cal-row',
    '.quote',
    '.footer-grid > *'
  ].join(', ');

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  function init() {
    var seen = new Set();
    document.querySelectorAll(SELECTORS).forEach(function (el) {
      if (seen.has(el)) return;
      seen.add(el);
      el.classList.add('will-reveal');

      // stagger siblings in same parent grid/flex
      var siblings = Array.from(el.parentElement.children).filter(function (c) {
        return c.classList.contains('will-reveal');
      });
      var idx = siblings.indexOf(el);
      if (idx > 0) {
        el.style.transitionDelay = Math.min(idx * 0.07, 0.35) + 's';
      }

      io.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();