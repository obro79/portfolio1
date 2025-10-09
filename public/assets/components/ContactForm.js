export class ContactForm {
    constructor() {
        this.emailCopyButton = document.querySelector('.copy-email');
        this.formStatus = document.querySelector('.form-status');
    }
    init() {
        this.setupEmailCopy();
    }
    setupEmailCopy() {
        if (!this.emailCopyButton || !this.formStatus) {
            return;
        }
        this.emailCopyButton.addEventListener('click', async () => {
            const email = this.emailCopyButton?.dataset.email ?? '';
            try {
                await navigator.clipboard.writeText(email);
                if (this.emailCopyButton) {
                    this.emailCopyButton.textContent = 'Copied!';
                }
                if (this.formStatus) {
                    this.formStatus.textContent = "Email copied—can't wait to hear from you.";
                    this.formStatus.classList.add('form-status--success');
                }
                setTimeout(() => {
                    if (this.emailCopyButton) {
                        this.emailCopyButton.textContent = 'Copy email';
                    }
                }, 1800);
            }
            catch (error) {
                if (this.formStatus) {
                    this.formStatus.textContent = 'Clipboard unavailable. Email: hello@owenfisher.dev';
                    this.formStatus.classList.add('form-status--error');
                }
            }
        });
    }
}
