import { useState } from 'react';
import { projects } from '../data/projects';

const ASCII_NAME = `
 ██████╗ ██╗    ██╗███████╗███╗   ██╗    ███████╗██╗███████╗██╗  ██╗███████╗██████╗
██╔═══██╗██║    ██║██╔════╝████╗  ██║    ██╔════╝██║██╔════╝██║  ██║██╔════╝██╔══██╗
██║   ██║██║ █╗ ██║█████╗  ██╔██╗ ██║    █████╗  ██║███████╗███████║█████╗  ██████╔╝
██║   ██║██║███╗██║██╔══╝  ██║╚██╗██║    ██╔══╝  ██║╚════██║██╔══██║██╔══╝  ██╔══██╗
╚██████╔╝╚███╔███╔╝███████╗██║ ╚████║    ██║     ██║███████║██║  ██║███████╗██║  ██║
 ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═══╝    ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`;

const experiences = [
  {
    period: 'Sept. 2025 — Present',
    company: 'Royal Bank of Canada',
    role: 'Quantitative Developer',
    description: 'Optimized risk assessment by migrating pricing engine from MATLAB to Python + Dask, deploying scalable pipelines that sped up valuations 70% and cut maintenance 50%+. Created comprehensive onboarding documentation using Confluence, cutting onboarding time by 50%.'
  },
  {
    period: 'Jan. 2025 — May 2025',
    company: 'Quantico Research',
    role: 'Quantitative Developer',
    description: 'Led development of a Hidden Markov Model in Stan with a Python/NumPy interface, slashing seismic risk exposure by 80%. Designed real-time seismic data pipelines in Python using NumPy for vectorized data cleaning. Automated walk-forward validation and stress testing with PyTest inside a CI/CD pipeline.'
  },
  {
    period: 'June 2025 — Present',
    company: 'UBC Science Undergraduate Society',
    role: 'Frontend Developer',
    description: 'Redesigned the Science Undergraduate Society website by implementing 5+ new pages and features. Engineered 10+ reusable components and introduced 15+ design tokens in Next.js/TypeScript.'
  },
  {
    period: 'May 2025 — Present',
    company: 'UBC Actuarial Science Club',
    role: 'Frontend Engineer',
    description: 'Built the site with Next.js, React, and Tailwind CSS, increasing member sign-ups by 200%. Led planning and development of the club\'s first website.'
  }
];

type FilterType = 'all' | 'highlighted' | 'hackathon' | 'school';

export default function StandardView() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [copied, setCopied] = useState(false);

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.categories.includes(filter);
  });

  const copyEmail = () => {
    navigator.clipboard.writeText('owenfisher46@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="standard-view">
      <header className="site-header">
        <div className="container">
          <div className="header-content">
            <span className="logo">owen_fisher</span>
            <nav>
              <ul className="nav-links">
                <li><a href="#about">about</a></li>
                <li><a href="#experience">experience</a></li>
                <li><a href="#projects">projects</a></li>
                <li><a href="#contact">contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero" id="about">
          <div className="container">
            <div className="hero-content">
              <pre className="hero-ascii">{ASCII_NAME}</pre>

              <p className="hero-prompt">
                <span className="user">visitor</span>@<span className="path">owenfisher.dev</span>:~$ whoami
              </p>

              <h1 className="hero-title">
                Quantitative Developer<span className="cursor"></span>
              </h1>

              <p className="hero-subtitle">
                Engineering data-driven solutions for systematic finance.
              </p>

              <div className="hero-meta">
                <div className="hero-meta-item">
                  <span className="key">location:</span>
                  <span className="value">Vancouver, BC, Canada</span>
                </div>
                <div className="hero-meta-item">
                  <span className="key">focus:</span>
                  <span className="value">quantitative development, full-stack</span>
                </div>
                <div className="hero-meta-item">
                  <span className="key">current:</span>
                  <span className="value">Royal Bank of Canada</span>
                </div>
                <div className="hero-meta-item">
                  <span className="key">education:</span>
                  <span className="value">University of British Columbia</span>
                </div>
              </div>

              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">View Projects</a>
                <a href="#contact" className="btn">Get in touch</a>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="section" id="experience">
          <div className="container">
            <div className="section-header">
              <p className="section-command">cat experience.log</p>
              <h2 className="section-title">Experience</h2>
            </div>

            <div className="experience-list">
              {experiences.map((exp, index) => (
                <article key={index} className="experience-item">
                  <div className="experience-header">
                    <div>
                      <span className="experience-timestamp">{exp.period}</span>
                      <span className="experience-company"> {exp.company}</span>
                    </div>
                    <span className="experience-role">{exp.role}</span>
                  </div>
                  <p className="experience-description">{exp.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="section" id="projects">
          <div className="container">
            <div className="section-header">
              <p className="section-command">ls projects/</p>
              <h2 className="section-title">Projects</h2>
            </div>

            <div className="project-filters">
              {(['all', 'highlighted', 'hackathon', 'school'] as FilterType[]).map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f === 'all' ? '*' : ''}{f}
                </button>
              ))}
            </div>

            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <article key={project.id} className="project-card">
                  <div className="project-header">
                    <h3 className="project-name">{project.title}</h3>
                    <span className="project-year">{project.year}</span>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-categories">
                    {project.categories.map((cat) => (
                      <span key={cat} className="project-category">{cat}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-link">
                        github
                      </a>
                    )}
                    {project.links.demo && (
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                        demo
                      </a>
                    )}
                    {project.links.devpost && (
                      <a href={project.links.devpost} target="_blank" rel="noopener noreferrer" className="project-link">
                        devpost
                      </a>
                    )}
                    {project.links.video && (
                      <a href={project.links.video} target="_blank" rel="noopener noreferrer" className="project-link">
                        video
                      </a>
                    )}
                    {project.links.docs && (
                      <a href={project.links.docs} target="_blank" rel="noopener noreferrer" className="project-link">
                        docs
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section" id="contact">
          <div className="container">
            <div className="section-header">
              <p className="section-command">cat contact.txt</p>
              <h2 className="section-title">Contact</h2>
            </div>

            <div className="contact-content">
              <p style={{ color: 'var(--text-dim)', marginBottom: 'var(--spacing-lg)' }}>
                Available for freelance projects and consulting.
              </p>

              <div className="contact-email">
                <span className="label">mail:</span>
                <span className="email">owenfisher46@gmail.com</span>
                <button
                  className={`copy-btn ${copied ? 'copied' : ''}`}
                  onClick={copyEmail}
                >
                  {copied ? 'copied!' : 'copy'}
                </button>
              </div>

              <ul className="social-links">
                <li>
                  <a href="https://github.com/obro79" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/fisherowen" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Owen Fisher
            </p>
            <div className="footer-links">
              <a href="#about">Back to top</a>
              <a href="mailto:owenfisher46@gmail.com">Email</a>
              <a href="https://github.com/obro79" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
