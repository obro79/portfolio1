
import { useState } from 'react';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('Copy email');

  const copyEmail = async () => {
    const email = 'owenfisher46@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setButtonText('Copied!');
      setStatus("Email copied—can't wait to hear from you.");
      setTimeout(() => {
        setButtonText('Copy email');
      }, 1800);
    } catch (error) {
      setStatus('Clipboard unavailable. Email: hello@owenfisher.dev');
    }
  };

  return (
    <div className="contact-actions">
      <a href="mailto:owenfisher46@gmail.com" className="btn btn-primary">owenfisher46@gmail.com</a>
      <button className="btn btn-ghost copy-email" onClick={copyEmail}>{buttonText}</button>
      <p className="form-status" role="status" aria-live="polite">{status}</p>
    </div>
  );
};

export default ContactForm;
