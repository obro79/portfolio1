
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (!targetId) return;
    const target = document.querySelector(targetId);
    if (target) {
      const header = document.querySelector('.site-header') as HTMLElement;
      const headerHeight = header?.offsetHeight ?? 0;
      const offset = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
    closeNav();
  };

  return (
    <nav className="nav">
      <a href="#top" className="brand" aria-label="Owen Fisher home">
        <span className="brand-mark">OF</span>
        <span className="brand-text">Owen Fisher</span>
      </a>
      <button className={`nav-toggle ${isOpen ? 'is-open' : ''}`} aria-expanded={isOpen} aria-controls="nav-menu" onClick={toggleNav}>
        <span className="sr-only">Toggle navigation</span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`nav-menu ${isOpen ? 'is-open' : ''}`} id="nav-menu">
        <a href="#experience" className="nav-link" onClick={handleSmoothScroll}>Experience</a>
        <a href="#projects" className="nav-link" onClick={handleSmoothScroll}>Projects</a>
        <a href="#contact" className="nav-link" onClick={handleSmoothScroll}>Contact</a>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navigation;
