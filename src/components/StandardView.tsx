import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { projects, Project, projectCategories } from '../data/projects';
import MarketTicker from './MarketTicker';

const StackBlitzEmbed = dynamic(() => import('./StackBlitzEmbed'), { ssr: false });

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
    period: 'Sep. 2025 — May 2026',
    company: 'Royal Bank of Canada',
    role: 'Software Engineer',
    description: 'Migrated legacy MATLAB factor-scoring and preprocessing paths to Python/PySpark on Databricks, preserving backward-compatible outputs while adding caching, multithreading, and regression validation across 500M+ score rows.'
  },
  {
    period: 'Jan. 2025 — Mar. 2025',
    company: 'Quantico Research',
    role: 'Software Engineer',
    description: 'Provisioned Terraform-managed AWS infrastructure, built Python/NumPy risk-signal pipelines, and automated walk-forward validation and stress testing with Pytest inside CI.'
  },
  {
    period: 'June 2025 — Present',
    company: 'UBC Science Undergraduate Society',
    role: 'Frontend Developer',
    description: 'Built production Next.js/TypeScript pages and reusable components for student-facing workflows, room bookings, clubs, and events.'
  },
  {
    period: 'May 2025 — Present',
    company: 'UBC Actuarial Science Club',
    role: 'Frontend Engineer',
    description: 'Led the club website build and shipped event/member surfaces in Next.js, React, and Tailwind CSS.'
  }
];

type FilterType = typeof projectCategories[number];

interface StandardViewProps {
  onTerminalDemo?: (command: string) => void;
}

export default function StandardView({ onTerminalDemo }: StandardViewProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
  const [sandboxProject, setSandboxProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.categories.includes(filter);
  });

  const selectedProject =
    filteredProjects.find(project => project.id === selectedProjectId) ||
    filteredProjects[0] ||
    projects[0];

  const copyEmail = () => {
    navigator.clipboard.writeText('owenfisher46@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-section').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filter]);

  useEffect(() => {
    if (filteredProjects.length > 0 && !filteredProjects.some(project => project.id === selectedProjectId)) {
      setSelectedProjectId(filteredProjects[0].id);
    }
  }, [filter, filteredProjects, selectedProjectId]);

  if (sandboxProject?.stackblitz) {
    return (
      <StackBlitzEmbed
        repo={sandboxProject.stackblitz.repo}
        openFile={sandboxProject.stackblitz.openFile}
        startScript={sandboxProject.stackblitz.startScript}
        onClose={() => setSandboxProject(null)}
      />
    );
  }

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
                Backend Engineer<span className="cursor"></span>
              </h1>

              <p className="hero-subtitle">
                Building Python services, data pipelines, and reliable infrastructure for production systems.
              </p>

              <div className="hero-meta">
                <div className="hero-meta-item">
                  <span className="key">location:</span>
                  <span className="value">Vancouver, BC, Canada</span>
                </div>
                <div className="hero-meta-item">
                  <span className="key">focus:</span>
                  <span className="value">backend engineering, Python, data infrastructure</span>
                </div>
                <div className="hero-meta-item">
                  <span className="key">stack:</span>
                  <span className="value">FastAPI, Kafka, Postgres, Redis, Docker, Databricks, AWS</span>
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
            <div className="section-header fade-in-section">
              <p className="section-command">cat experience.log</p>
              <h2 className="section-title">Experience</h2>
            </div>

            <div className="experience-list">
              {experiences.map((exp, index) => (
                <article key={index} className="experience-item fade-in-section" style={{ transitionDelay: `${index * 0.1}s` }}>
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
            <div className="section-header fade-in-section">
              <p className="section-command">ls projects/</p>
              <h2 className="section-title">Projects</h2>
            </div>

            <div className="project-filters" role="tablist" aria-label="Project filters">
              {projectCategories.map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                  role="tab"
                  aria-selected={filter === f}
                >
                  {f === 'all' ? '*' : ''}{f}
                </button>
              ))}
            </div>

            <div className="project-explorer fade-in-section">
              <aside className="project-tree" aria-label="Project file tree">
                <div className="project-tree-header">projects/</div>
                {filteredProjects.map((project) => (
                  <button
                    key={project.id}
                    className={`project-file ${selectedProject.id === project.id ? 'active' : ''}`}
                    onClick={() => setSelectedProjectId(project.id)}
                  >
                    <span>{project.slug}</span>
                    <span className="project-file-meta">{project.categories.includes('infra') ? 'infra' : project.categories[0]}</span>
                  </button>
                ))}
              </aside>

              <article className="project-preview" aria-live="polite">
                <div className="project-preview-topline">
                  <span>cat projects/{selectedProject.slug}</span>
                  <span>{selectedProject.year}</span>
                </div>

                <div className="project-preview-grid">
                  <div className="project-preview-copy">
                    <p className="eyebrow">{selectedProject.role}</p>
                    <h3>{selectedProject.title}</h3>
                    <p>{selectedProject.description}</p>

                    <div className="project-stack" aria-label={`${selectedProject.title} stack`}>
                      {selectedProject.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>

                    <ul className="project-metrics">
                      {selectedProject.metrics.map((metric) => (
                        <li key={metric}>{metric}</li>
                      ))}
                    </ul>

                    <div className="project-links project-actions">
                      {selectedProject.stackblitz && (
                        <button className="project-link" onClick={() => setSandboxProject(selectedProject)}>
                          open sandbox
                        </button>
                      )}
                      {selectedProject.terminalDemo && onTerminalDemo && (
                        <button className="project-link" onClick={() => onTerminalDemo(selectedProject.terminalDemo!)}>
                          run demo
                        </button>
                      )}
                      {selectedProject.links.github && (
                        <a href={selectedProject.links.github} target="_blank" rel="noopener noreferrer" className="project-link">
                          view source
                        </a>
                      )}
                      {selectedProject.links.demo && (
                        <a href={selectedProject.links.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                          live demo
                        </a>
                      )}
                      {selectedProject.links.devpost && (
                        <a href={selectedProject.links.devpost} target="_blank" rel="noopener noreferrer" className="project-link">
                          devpost
                        </a>
                      )}
                      {selectedProject.links.video && (
                        <a href={selectedProject.links.video} target="_blank" rel="noopener noreferrer" className="project-link">
                          video
                        </a>
                      )}
                    </div>
                  </div>

                  <div className={`project-visual project-visual-${selectedProject.visual.type}`}>
                    <div className="project-visual-header">
                      <span>{selectedProject.visual.title}</span>
                      <span>{selectedProject.visual.type}</span>
                    </div>
                    {selectedProject.visual.image && (
                      <img
                        src={selectedProject.visual.image}
                        alt={selectedProject.visual.imageAlt || `${selectedProject.title} preview`}
                        className="project-visual-image"
                      />
                    )}
                    <pre>{selectedProject.visual.lines.join('\n')}</pre>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Live Markets Section */}
        <section className="section" id="markets" style={{ paddingBottom: 0 }}>
          <div className="container">
            <MarketTicker />
          </div>
        </section>

        {/* Contact Section */}
        <section className="section" id="contact">
          <div className="container">
            <div className="section-header fade-in-section">
              <p className="section-command">cat contact.txt</p>
              <h2 className="section-title">Contact</h2>
            </div>

            <div className="contact-content fade-in-section">
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
