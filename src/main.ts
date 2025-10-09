import { Navigation } from './components/Navigation.js';
import { ThemeToggle } from './components/ThemeToggle.js';
import { ProjectFilters } from './components/ProjectFilters.js';
import { ContactForm } from './components/ContactForm.js';
import { Animations } from './components/Animations.js';
import { FooterYear } from './components/FooterYear.js';

const init = (): void => {
  const navigation = new Navigation();
  const themeToggle = new ThemeToggle();
  const projectFilters = new ProjectFilters();
  const contactForm = new ContactForm();
  const animations = new Animations();
  const footerYear = new FooterYear();

  navigation.init();
  themeToggle.init();
  projectFilters.init();
  contactForm.init();
  animations.init();
  footerYear.init();
};

window.addEventListener('DOMContentLoaded', init);
