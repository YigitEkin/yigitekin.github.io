/* Restore the saved theme before styles render; default to light. */
(function () {
  var storageKey = 'theme';
  var root = document.documentElement;
  var theme = 'light';
  var toggle;

  try {
    if (localStorage.getItem(storageKey) === 'dark') theme = 'dark';
  } catch (error) {
    // Theme switching also works when storage is unavailable.
  }

  function applyTheme(nextTheme) {
    theme = nextTheme;
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content =
      theme === 'dark' ? '#0d1c32' : '#f7faff';
    if (toggle) {
      var dark = theme === 'dark';
      toggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
      toggle.setAttribute('aria-label', toggle.title);
      toggle.querySelector('i').className = dark ? 'fas fa-sun' : 'fas fa-moon';
      toggle.querySelector('span').textContent = dark ? 'Light mode' : 'Dark mode';
    }
  }

  applyTheme(theme);
  document.addEventListener('DOMContentLoaded', function () {
    toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    applyTheme(theme);
    toggle.hidden = false;
    toggle.addEventListener('click', function () {
      applyTheme(theme === 'dark' ? 'light' : 'dark');
      try {
        localStorage.setItem(storageKey, theme);
      } catch (error) {
        // Keep the selected theme on this page without persistence.
      }
    });
  });

  window.addEventListener('storage', function (event) {
    if (event.key === storageKey || event.key === null) {
      applyTheme(event.newValue === 'dark' ? 'dark' : 'light');
    }
  });
})();
