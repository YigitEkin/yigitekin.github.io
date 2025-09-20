/* Simple theme toggle: cycles between light and dark (default: light). */
(function() {
  var storageKey = 'theme';
  var classDark = 'theme-dark';
  var classLight = 'theme-light';

  function applyTheme(theme) {
    var b = document.body;
    b.classList.remove(classDark, classLight);
    if (theme === 'dark') b.classList.add(classDark);
    else b.classList.add(classLight);
  }

  function currentTheme() {
    return localStorage.getItem(storageKey) || 'light';
  }

  function setTheme(theme) {
    localStorage.setItem(storageKey, theme);
    applyTheme(theme);
    var icon = document.querySelector('.theme-toggle i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // Initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    // Default to light unless user previously chose dark
    applyTheme(currentTheme());
    var toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', function() {
        setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
      });
    }
  });
})();

