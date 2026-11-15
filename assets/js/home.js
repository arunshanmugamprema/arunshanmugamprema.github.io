/* Home page: theme toggle and the one reveal for the before/after lines. */
(function () {
  var root = document.documentElement;

  // Theme toggle. Follows the system setting until the visitor picks one.
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var current = root.dataset.theme || (systemDark ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // Before/after lines draw once when they scroll into view.
  var shifts = document.querySelectorAll('.shift');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    shifts.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  root.classList.add('can-animate');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  shifts.forEach(function (el) { io.observe(el); });
})();
