export const themeScript = `
  (function() {
    try {
      var dataTheme = localStorage.getItem('data-theme');
      if (dataTheme === 'dark' || dataTheme === 'light') {
        document.documentElement.setAttribute('data-theme', dataTheme);
      } else {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      }
    } catch(e) {}
  })();
`;