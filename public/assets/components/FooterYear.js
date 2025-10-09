export class FooterYear {
    constructor() {
        this.currentYear = document.getElementById('year');
    }
    init() {
        if (!this.currentYear) {
            return;
        }
        this.currentYear.textContent = new Date().getFullYear().toString();
    }
}
