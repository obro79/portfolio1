export class Animations {
  private observer: IntersectionObserver;

  constructor() {
    this.observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      },
    );
  }

  init(): void {
    const animatedElements = document.querySelectorAll<HTMLElement>('[data-animate]');
    animatedElements.forEach((element) => this.observer.observe(element));
  }
}
