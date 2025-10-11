export class ProjectFilters {
  private filterButtons: HTMLButtonElement[];
  private projectCards: HTMLElement[];

  constructor() {
    this.filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.filter-btn'));
    this.projectCards = Array.from(document.querySelectorAll<HTMLElement>('.project-card'));
  }

  init(): void {
    if (this.filterButtons.length === 0) {
      return;
    }

    this.filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const selected = button.dataset.filter ?? 'all';
        this.setActiveButton(button);
        this.filterProjects(selected);
      });
    });
  }

  private setActiveButton(activeButton: HTMLButtonElement): void {
    this.filterButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn === activeButton);
      btn.setAttribute('aria-selected', String(btn === activeButton));
    });
  }

  private filterProjects(category: string): void {
    this.projectCards.forEach((card) => {
      const cardCategories = card.dataset.category?.split(' ') ?? [];
      const isVisible = category === 'all' || cardCategories.includes(category);
      card.classList.toggle('is-hidden', !isVisible);
    });
  }
}
