import Head from 'next/head';
import Navigation from '../src/components/Navigation';
import Animations from '../src/components/Animations';
import ParticleBackground from '../src/components/ParticleBackground';
import ProjectFilters from '../src/components/ProjectFilters';
import ContactForm from '../src/components/ContactForm';
import FooterYear from '../src/components/FooterYear';

export default function Home() {
  return (
    <>
      <Head>
        <title>Owen Fisher · Developer Portfolio</title>
        <meta name="description" content="Full-stack developer portfolio for Owen Fisher showcasing selected projects, experience, and contact information." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet" />
      </Head>
      <ParticleBackground />
      <Animations />
      <div className="backdrop-layers" aria-hidden="true">
        <span className="orb orb-primary"></span>
        <span className="orb orb-secondary"></span>
        <span className="noise"></span>
      </div>

      <header className="site-header">
        <div className="container">
          <Navigation />
        </div>
      </header>

      <main id="top">
        <section className="hero" data-animate>
          <div className="container hero-content">
            <div className="hero-text">
              <p className="eyebrow">Quantitative Developer | Canada</p>
              <h1>Building quantitative systems.</h1>
              <p className="lead">
                Engineering data-driven solutions for systematic finance.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">View Projects</a>
                <a href="#contact" className="btn btn-ghost">Get in touch</a>
              </div>
            </div>
            <div className="hero-visual" data-animate>
              <div className="hero-card">
                <div className="hero-avatar" role="img" aria-label="Illustrated portrait of Owen Fisher"></div>
                <h2>Owen Fisher</h2>
                <p>Quantitative developer engineering data-driven systems for systematic finance.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section experience" id="experience" data-animate>
          <div className="container">
            <header className="section-header">
              <p className="eyebrow">Experience</p>
              <h2>Professional background.</h2>
            </header>
            <div className="timeline">
              <article className="timeline-item">
                <div className="timeline-meta">
                  <p className="timeline-period">Sept. 2025 — Present</p>
                  <p className="timeline-company">Royal Bank of Canada</p>
                </div>
                <div className="timeline-content">
                  <h3>Quantitative Developer</h3>
                  <ul>
                    <li>Optimized risk assessment by migrating pricing engine from MATLAB to Python + Dask, deploying scalable pipelines that sped up valuations 70% and cut maintenance 50%+, while improving release cadence via CI/CD</li>
                    <li>Created comprehensive onboarding documentation using Confluence with annotated screenshots and troubleshooting guides, cutting onboarding time by 50% and reducing senior support through self service learning</li>
                  </ul>
                </div>
              </article>
              <article className="timeline-item">
                <div className="timeline-meta">
                  <p className="timeline-period">Jan. 2025 — May 2025</p>
                  <p className="timeline-company">Quantico Research</p>
                </div>
                <div className="timeline-content">
                  <h3>Quantitative Developer</h3>
                  <ul>
                    <li>Led development of a Hidden Markov Model in Stan with a Python/NumPy interface, which established the first real-time seismic risk adjustment framework and slashed seismic risk exposure by 80%</li>
                    <li>Designed and implemented real-time seismic data pipelines in Python using NumPy for vectorized data cleaning, which accelerated downstream model responsiveness by 60% and enabled near real-time risk detection</li>
                    <li>Automated walk-forward validation and stress testing with PyTest inside a CI/CD pipeline, making model releases fully reproducible and cutting QA while boosting release cadence by 3x</li>
                  </ul>
                </div>
              </article>
              <article className="timeline-item">
                <div className="timeline-meta">
                  <p className="timeline-period">June 2025 — Present</p>
                  <p className="timeline-company">UBC Science Undergraduate Society</p>
                </div>
                <div className="timeline-content">
                  <h3>Frontend Developer</h3>
                  <ul>
                    <li>Redesigned the Science Undergraduate Society website by implementing 5+ new pages and features (room bookings, clubs, events), improving accessibility for 55,000+ undergraduates</li>
                    <li>Engineered 10+ reusable components and introduced 15+ design tokens in Next.js/TypeScript, ensuring consistency across the site and reducing long-term maintenance effort by 50%</li>
                    <li>Collaborated with designers to translate 20+ Figma wireframes into production-ready code, delivering a modernized interface that increased event page traffic by 40%</li>
                  </ul>
                </div>
              </article>
              <article className="timeline-item">
                <div className="timeline-meta">
                  <p className="timeline-period">May 2025 — Present</p>
                  <p className="timeline-company">UBC Actuarial Science Club</p>
                </div>
                <div className="timeline-content">
                  <h3>Frontend Engineer</h3>
                  <ul>
                    <li>Built the site with Next.js, React, and Tailwind CSS, adding responsive design and event registration that increased member sign-ups by 200% and doubled monthly engagement</li>
                    <li>Led planning and development of the club's first website, delegating tasks to a developer and UI/UX designer while coordinating code reviews and merges</li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section projects" id="projects" data-animate>
          <div className="container">
            <header className="section-header">
              <p className="eyebrow">Selected Work</p>
              <h2>Technical projects.</h2>
              <ProjectFilters />
            </header>
            <div className="project-grid">
              <article className="project-card" data-category="highlighted personal" data-animate>
                <div className="project-image" style={{background: 'linear-gradient(135deg, rgba(124, 108, 255, 0.3), rgba(59, 201, 255, 0.3))'}}></div>
                <div className="project-content">
                  <div className="project-header">
                    <h3>PrepMe</h3>
                    <span className="project-year">May 2025</span>
                  </div>
                  <p>Built AI voice interviewer with real-time speech, transcripts, and 100 Lighthouse accessibility score.</p>
                  <div className="project-footer">
                    <a href="https://github.com/obro79/mock_interview_ai" target="_blank" rel="noopener" className="text-link">GitHub</a>
                    <a href="https://mock-interview-ai-git-main-owens-projects-e5b63a60.vercel.app/sign-in" target="_blank" rel="noopener" className="text-link">Live Demo</a>
                  </div>
                </div>
              </article>
              <article className="project-card" data-category="highlighted personal" data-animate>
                <div className="project-image" style={{background: 'linear-gradient(135deg, rgba(255, 107, 170, 0.3), rgba(124, 108, 255, 0.3))'}}></div>
                <div className="project-content">
                  <div className="project-header">
                    <h3>Financely</h3>
                    <span className="project-year">June 2025</span>
                  </div>
                  <p>Configured Vercel CI/CD pipeline to auto-build/test/deploy, cutting manual release steps 75%. Built ETL services in Python/Node to load transactions into SQL.</p>
                  <div className="project-footer">
                    <a href="https://github.com/obro79/financely" target="_blank" rel="noopener" className="text-link">GitHub</a>
                    <a href="https://financely-nine.vercel.app/sign-in" target="_blank" rel="noopener" className="text-link">Live Demo</a>
                    <a href="https://noisy-pansy-2e8.notion.site/Financely-1eab9c27045980579544ce5e4f96ed55" target="_blank" rel="noopener" className="text-link">Docs</a>
                  </div>
                </div>
              </article>
              <article className="project-card" data-category="highlighted personal" data-animate>
                <div className="project-image" style={{background: 'linear-gradient(135deg, rgba(59, 201, 255, 0.3), rgba(107, 255, 193, 0.3))'}}></div>
                <div className="project-content">
                  <div className="project-header">
                    <h3>Option Pricing & Portfolio Management Web App</h3>
                    <span className="project-year">Sept. 2025</span>
                  </div>
                  <p>Implemented Black-Scholes and Monte Carlo pricing models with 4x faster vectorized loops. Delivered interactive portfolio dashboards surfacing pricing results, portfolio metrics, and risk attribution.</p>
                  <div className="project-footer">
                    <a href="https://github.com/obro79/optionStrategyApp" target="_blank" rel="noopener" className="text-link">GitHub</a>
                    <a href="https://optitrade.streamlit.app" target="_blank" rel="noopener" className="text-link">Live Demo</a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact" data-animate>
          <div className="container">
            <header className="section-header">
              <p className="eyebrow">Contact</p>
              <h2>Let's work together.</h2>
            </header>
            <p>
              Available for freelance projects and consulting.
            </p>
            <ContactForm />
            <ul className="social-links">
              <li><a href="https://github.com/obro79" target="_blank" rel="noopener">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/fisherowen" target="_blank" rel="noopener">LinkedIn</a></li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>© <FooterYear /> Owen Fisher</p>
          <div className="footer-links">
            <a href="#top">Back to top</a>
            <a href="mailto:owenfisher46@gmail.com">Email</a>
            <a href="https://github.com/obro79" target="_blank" rel="noopener">GitHub</a>
            <a href="https://www.linkedin.com/in/fisherowen" target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
}