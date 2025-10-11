export class ProjectFilters {
    constructor() {
        this.filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
        this.projectCards = Array.from(document.querySelectorAll('.project-card'));
    }
    init() {
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
    setActiveButton(activeButton) {
        this.filterButtons.forEach((btn) => {
            btn.classList.toggle('is-active', btn === activeButton);
            btn.setAttribute('aria-selected', String(btn === activeButton));
        });
    }
    filterProjects(category) {
        this.projectCards.forEach((card) => {
            const cardCategories = card.dataset.category?.split(' ') ?? [];
            const isVisible = category === 'all' || cardCategories.includes(category);
            card.classList.toggle('is-hidden', !isVisible);
        });
    }
}
