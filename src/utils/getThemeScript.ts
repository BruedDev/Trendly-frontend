export const themeScript = `
  (function() {
    try {
      var Mode = localStorage.getItem('Mode');
      if (Mode === 'dark' || Mode === 'light') {
        document.documentElement.setAttribute('data-theme', Mode);
      } else {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      }
    } catch(e) {}
  })();
`;