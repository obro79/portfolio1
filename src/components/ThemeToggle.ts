type Theme = 'theme-dark' | 'theme-light';

export class ThemeToggle {
  private static readonly THEME_KEY = 'owen-portfolio-theme';
  private body: HTMLElement;
  private themeToggle: HTMLButtonElement | null;

  constructor() {
    this.body = document.body;
    this.themeToggle = document.querySelector<HTMLButtonElement>('.theme-toggle');
  }

  init(): void {
    if (!this.themeToggle) {
      return;
    }

    const initialTheme = this.getInitialTheme();
    this.setTheme(initialTheme);

    this.themeToggle.addEventListener('click', () => {
      const nextTheme: Theme = this.body.classList.contains('theme-light') ? 'theme-dark' : 'theme-light';
      this.setTheme(nextTheme);
    });
  }

  private setTheme(theme: Theme): void {
    this.body.classList.remove('theme-dark', 'theme-light');
    this.body.classList.add(theme);
    this.themeToggle?.setAttribute('aria-pressed', theme === 'theme-light' ? 'true' : 'false');
    localStorage.setItem(ThemeToggle.THEME_KEY, theme);
  }

  private getInitialTheme(): Theme {
    const stored = localStorage.getItem(ThemeToggle.THEME_KEY) as Theme | null;
    if (stored === 'theme-dark' || stored === 'theme-light') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'theme-light' : 'theme-dark';
  }
}
