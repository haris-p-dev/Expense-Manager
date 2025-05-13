document.addEventListener('DOMContentLoaded', () => {
  const changeThemeBtn = document.getElementById('change-theme');
  const themeWindow = document.getElementById('theme-window');
  const themeButtons = document.querySelectorAll('.theme-button');

  changeThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('theme-buttons-visible');
  });

  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const theme = button.dataset.theme;

      // Remove previous theme classes
      document.body.classList.remove('theme-neon', 'theme-waves');

      // Add new one
      if (theme) {
        document.body.classList.add(theme);
      }
    });
  });
});
