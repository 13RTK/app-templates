import { ref } from 'vue';

export function useThemeToggle() {
  const html = document.querySelector('html');
  const oppositeTheme = ref(html.getAttribute('data-theme') || 'dark');

  function toggleTheme() {
    if (oppositeTheme.value === 'dark') {
      html.setAttribute('data-theme', 'dark');
      oppositeTheme.value = 'light';
      return;
    }

    html.setAttribute('data-theme', 'light');
    oppositeTheme.value = 'dark';
  }

  return { oppositeTheme, toggleTheme };
}
