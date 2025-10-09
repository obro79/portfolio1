export class Navigation {
  private navToggle: HTMLButtonElement | null;
  private navMenu: HTMLDivElement | null;
  private navLinks: HTMLAnchorElement[];

  constructor() {
    this.navToggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
    this.navMenu = document.querySelector<HTMLDivElement>('#nav-menu');
    this.navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-link'));
  }

  init(): void {
    this.setupToggle();
    this.setupSmoothScroll();
  }

  private setupToggle(): void {
    if (!this.navToggle || !this.navMenu) {
      return;
    }

    this.navToggle.addEventListener('click', () => this.toggleNav());

    this.navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        this.closeNav();
      });
    });
  }

  private toggleNav(): void {
    if (!this.navMenu || !this.navToggle) {
      return;
    }
    const isOpen = this.navMenu.classList.toggle('is-open');
    this.navToggle.setAttribute('aria-expanded', String(isOpen));
    this.navToggle.classList.toggle('is-open', isOpen);
  }

  private closeNav(): void {
    if (!this.navMenu || !this.navToggle) {
      return;
    }
    this.navMenu.classList.remove('is-open');
    this.navToggle.setAttribute('aria-expanded', 'false');
    this.navToggle.classList.remove('is-open');
  }

  private setupSmoothScroll(): void {
    const header = document.querySelector<HTMLElement>('.site-header');
    const headerHeight = header?.offsetHeight ?? 0;

    this.navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) {
          return;
        }

        const target = document.querySelector<HTMLElement>(targetId);
        if (!target) {
          return;
        }

        event.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      });
    });
  }
}
