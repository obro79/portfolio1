export class FooterYear {
  private currentYear: HTMLElement | null;

  constructor() {
    this.currentYear = document.getElementById('year');
  }

  init(): void {
    if (!this.currentYear) {
      return;
    }
    this.currentYear.textContent = new Date().getFullYear().toString();
  }
}
