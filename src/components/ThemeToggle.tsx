
import { useState, useEffect } from 'react';

const THEME_KEY = 'owen-portfolio-theme';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<string>('theme-dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    const initialTheme = storedTheme || 'theme-dark';
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'theme-light' ? 'theme-dark' : 'theme-light');
  };

  return (
    <button className="theme-toggle" type="button" aria-label="Toggle theme" onClick={toggleTheme}>
      <span className="theme-icon theme-icon--sun" aria-hidden="true"></span>
      <span className="theme-icon theme-icon--moon" aria-hidden="true"></span>
    </button>
  );
};

export default ThemeToggle;
