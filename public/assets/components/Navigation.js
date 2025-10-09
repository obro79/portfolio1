export class Navigation {
    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('#nav-menu');
        this.navLinks = Array.from(document.querySelectorAll('.nav-link'));
    }
    init() {
        this.setupToggle();
        this.setupSmoothScroll();
    }
    setupToggle() {
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
    toggleNav() {
        if (!this.navMenu || !this.navToggle) {
            return;
        }
        const isOpen = this.navMenu.classList.toggle('is-open');
        this.navToggle.setAttribute('aria-expanded', String(isOpen));
        this.navToggle.classList.toggle('is-open', isOpen);
    }
    closeNav() {
        if (!this.navMenu || !this.navToggle) {
            return;
        }
        this.navMenu.classList.remove('is-open');
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.navToggle.classList.remove('is-open');
    }
    setupSmoothScroll() {
        const header = document.querySelector('.site-header');
        const headerHeight = header?.offsetHeight ?? 0;
        this.navLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                const targetId = link.getAttribute('href');
                if (!targetId || !targetId.startsWith('#')) {
                    return;
                }
                const target = document.querySelector(targetId);
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
