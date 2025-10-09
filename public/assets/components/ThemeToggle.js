export class ThemeToggle {
    constructor() {
        this.body = document.body;
        this.themeToggle = document.querySelector('.theme-toggle');
    }
    init() {
        if (!this.themeToggle) {
            return;
        }
        const initialTheme = this.getInitialTheme();
        this.setTheme(initialTheme);
        this.themeToggle.addEventListener('click', () => {
            const nextTheme = this.body.classList.contains('theme-light') ? 'theme-dark' : 'theme-light';
            this.setTheme(nextTheme);
        });
    }
    setTheme(theme) {
        this.body.classList.remove('theme-dark', 'theme-light');
        this.body.classList.add(theme);
        this.themeToggle?.setAttribute('aria-pressed', theme === 'theme-light' ? 'true' : 'false');
        localStorage.setItem(ThemeToggle.THEME_KEY, theme);
    }
    getInitialTheme() {
        const stored = localStorage.getItem(ThemeToggle.THEME_KEY);
        if (stored === 'theme-dark' || stored === 'theme-light') {
            return stored;
        }
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'theme-light' : 'theme-dark';
    }
}
ThemeToggle.THEME_KEY = 'owen-portfolio-theme';
