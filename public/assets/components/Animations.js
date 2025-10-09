export class Animations {
    constructor() {
        this.observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
        });
    }
    init() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach((element) => this.observer.observe(element));
    }
}
