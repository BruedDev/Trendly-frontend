export const themeScript = `
  (function() {
    try {
      function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(';').shift();
        return undefined;
      }

      var dataTheme = getCookie('data-theme');
      var theme;

      if (dataTheme === 'dark' || dataTheme === 'light') {
        theme = dataTheme;
      } else {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dark' : 'light';
        // Save detected theme to cookie immediately
        document.cookie = 'data-theme=' + theme + '; path=/; max-age=31536000';
      }

      document.documentElement.setAttribute('data-theme', theme);
    } catch(e) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  })();
`;