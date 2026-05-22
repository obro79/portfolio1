import { useEffect, useState } from 'react';
import { Project, projectCategories } from '../../data/projects';

const ASCII_NAME = `
 ██████╗ ██╗    ██╗███████╗███╗   ██╗    ███████╗██╗███████╗██╗  ██╗███████╗██████╗
██╔═══██╗██║    ██║██╔════╝████╗  ██║    ██╔════╝██║██╔════╝██║  ██║██╔════╝██╔══██╗
██║   ██║██║ █╗ ██║█████╗  ██╔██╗ ██║    █████╗  ██║███████╗███████║█████╗  ██████╔╝
██║   ██║██║███╗██║██╔══╝  ██║╚██╗██║    ██╔══╝  ██║╚════██║██╔══██║██╔══╝  ██╔══██╗
╚██████╔╝╚███╔███╔╝███████╗██║ ╚████║    ██║     ██║███████║██║  ██║███████╗██║  ██║
 ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═══╝    ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`;

type Experience = {
  period: string;
  company: string;
  role: string;
  description?: string;
  bullets?: string[];
};

const experiences: Experience[] = [
  {
    period: 'Sep. 2025 — May 2026',
    company: 'Royal Bank of Canada',
    role: 'Software Engineer',
    bullets: [
      'Migrated legacy MATLAB factor-scoring pipeline to Python/PySpark on Databricks, cutting single-factor backfills from 3.25 hours to under 1 minute for a 250x+ speedup across 30+ years of financial time-series data.',
      'Owned Python POC rebuild of legacy MATLAB batch preprocessing pipeline, preserving backward-compatible file outputs while adding caching and multithreading to make daily runs more reliable and 15-20x faster.',
      'Built regression validation framework across golden datasets, 26 intermediate calculation columns, 150 factor-region combinations, and 500M+ score rows, giving the team confidence to replace the legacy MATLAB pipeline.',
      'Built Parquet/Delta migration pipeline centralizing 3.1B+ rows of legacy research data from proprietary MATLAB/NAS formats into Databricks volumes and governed Delta tables for faster querying.'
    ]
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

interface ProjectsSectionProps {
  filter: FilterType;
  filteredProjects: Project[];
  selectedProject: Project;
  onFilterChange: (filter: FilterType) => void;
  onProjectSelect: (projectId: string) => void;
  onOpenSandbox: (project: Project) => void;
  onTerminalDemo?: (command: string) => void;
}

interface ContactSectionProps {
  copied: boolean;
  onCopyEmail: () => void;
}

export function SiteHeader() {
  return (
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
  );
}

export function HeroSection() {
  return (
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
  );
}

export function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header fade-in-section">
          <p className="section-command">cat experience.log</p>
          <h2 className="section-title">Experience</h2>
        </div>
        <div className="experience-list">
          {experiences.map((exp) => (
            <article key={`${exp.company}-${exp.period}`} className="experience-item fade-in-section">
              <div className="experience-header">
                <div>
                  <span className="experience-timestamp">{exp.period}</span>
                  <span className="experience-company"> {exp.company}</span>
                </div>
                <span className="experience-role">{exp.role}</span>
              </div>
              {exp.bullets ? (
                <ul className="experience-bullets">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : (
                <p className="experience-description">{exp.description}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection({
  filter,
  filteredProjects,
  selectedProject,
  onFilterChange,
  onProjectSelect,
  onOpenSandbox,
  onTerminalDemo
}: ProjectsSectionProps) {
  return (
    <section className="section" id="projects">
      <div className="container projects-container">
        <div className="section-header fade-in-section">
          <p className="section-command">ls projects/</p>
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="project-filters" role="tablist" aria-label="Project filters">
          {projectCategories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => onFilterChange(category)}
              role="tab"
              aria-selected={filter === category}
            >
              {category === 'all' ? '*' : ''}{category}
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
                onClick={() => onProjectSelect(project.id)}
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
                <ProjectActions
                  project={selectedProject}
                  onOpenSandbox={onOpenSandbox}
                  onTerminalDemo={onTerminalDemo}
                />
              </div>

              <ProjectVisual project={selectedProject} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ProjectActions({
  project,
  onOpenSandbox,
  onTerminalDemo
}: {
  project: Project;
  onOpenSandbox: (project: Project) => void;
  onTerminalDemo?: (command: string) => void;
}) {
  return (
    <div className="project-links project-actions">
      {project.stackblitz && (
        <button className="project-link" onClick={() => onOpenSandbox(project)}>
          open sandbox
        </button>
      )}
      {project.terminalDemo && onTerminalDemo && (
        <button className="project-link" onClick={() => onTerminalDemo(project.terminalDemo!)}>
          run demo
        </button>
      )}
      {project.links.github && (
        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-link">
          view source
        </a>
      )}
      {project.links.demo && (
        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="project-link">
          live demo
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
    </div>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  const media = project.visual.media || (
    project.visual.image
      ? [{ src: project.visual.image, title: project.visual.title, alt: project.visual.imageAlt || `${project.title} preview` }]
      : []
  );
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const activeMedia = media[activeMediaIndex] || media[0];

  useEffect(() => {
    setActiveMediaIndex(0);
  }, [project.id]);

  return (
    <div className={`project-visual project-visual-${project.visual.type}`}>
      <div className="project-visual-header">
        <span>{activeMedia?.title || project.visual.title}</span>
        <span>{project.visual.type}</span>
      </div>
      {activeMedia && (
        <div className="project-media">
          <img
            src={activeMedia.src}
            alt={activeMedia.alt}
            className="project-visual-image"
          />
          {media.length > 1 && (
            <div className="project-media-strip" aria-label={`${project.title} media`}>
              {media.slice(0, 4).map((item, index) => (
                <button
                  key={item.src}
                  className={`project-media-thumb ${index === activeMediaIndex ? 'active' : ''}`}
                  onClick={() => setActiveMediaIndex(index)}
                  aria-label={`Show ${item.title}`}
                  type="button"
                >
                  <img src={item.src} alt="" />
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {project.visual.variant === 'pipeline' && project.visual.stages ? (
        <PipelineVisual
          stages={project.visual.stages}
          flows={project.visual.flows || []}
          lines={project.visual.lines}
        />
      ) : (
        <pre>{project.visual.lines.join('\n')}</pre>
      )}
    </div>
  );
}

function PipelineVisual({
  stages,
  flows,
  lines
}: {
  stages: NonNullable<Project['visual']['stages']>;
  flows: NonNullable<Project['visual']['flows']>;
  lines: string[];
}) {
  return (
    <div className="pipeline-visual" aria-label="Pipeline architecture">
      <div className="pipeline-main">
        {stages.map((stage, index) => (
          <div className="pipeline-stage" key={stage.label}>
            <div className="pipeline-stage-node">
              <span>{stage.label}</span>
              <small>{stage.detail}</small>
            </div>
            {index < stages.length - 1 && <span className="pipeline-arrow">-&gt;</span>}
          </div>
        ))}
      </div>

      <div className="pipeline-flows">
        {flows.map((flow) => (
          <div className="pipeline-flow" key={`${flow.from}-${flow.to}-${flow.label}`}>
            <span className="pipeline-flow-from">{flow.from}</span>
            <span className="pipeline-flow-line" />
            <span className="pipeline-flow-to">{flow.to}</span>
            <span className="pipeline-flow-label">{flow.label}</span>
          </div>
        ))}
      </div>

      <div className="pipeline-console">
        {lines.map((line) => (
          <span key={line}>
            <span className="term-accent">$</span> {line}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ContactSection({ copied, onCopyEmail }: ContactSectionProps) {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header fade-in-section">
          <p className="section-command">cat contact.txt</p>
          <h2 className="section-title">Contact</h2>
        </div>
        <div className="contact-content fade-in-section">
          <p className="contact-lede">
            Available for freelance projects and consulting.
          </p>
          <div className="contact-email">
            <span className="label">mail:</span>
            <span className="email">owenfisher46@gmail.com</span>
            <button
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={onCopyEmail}
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
            <li>
              <a href="https://devpost.com/obro79" target="_blank" rel="noopener noreferrer">
                Devpost
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
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
            <a href="https://devpost.com/obro79" target="_blank" rel="noopener noreferrer">Devpost</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
