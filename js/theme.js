// Light/dark theme toggle, shared by every page.
// The theme is stored on <html data-theme="..."> and remembered in
// localStorage (the browser's small built-in storage). A one-line script
// in each page's <head> applies the saved theme before the page is drawn,
// so the page never flashes the wrong colors. Light is the default.

(function () {
  var STORAGE_KEY = "theme";
  var root = document.documentElement;

  function isDark() {
    return root.dataset.theme === "dark";
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // Storage can be blocked (e.g. private browsing); the toggle still works on this page.
    }
  }

  function updateButtons() {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      // aria-pressed tells screen readers whether "Dark theme" is switched on.
      button.setAttribute("aria-pressed", String(isDark()));
      button.querySelector("[data-theme-icon]").textContent = isDark() ? "☀" : "☾";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateButtons();
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        var next = isDark() ? "light" : "dark";
        root.dataset.theme = next;
        saveTheme(next);
        updateButtons();
      });
    });
  });
})();
