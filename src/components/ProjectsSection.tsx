import { useState } from 'react';
import { projects, Project } from '../data/projects';

const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('highlighted');

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.categories.includes(filter);
  });

  return (
    <section className="section projects" id="projects" data-animate>
      <div className="container">
        <header className="section-header">
          <p className="eyebrow">Selected Work</p>
          <h2>Technical projects.</h2>
          <div className="project-filters" role="tablist" aria-label="Project categories">
            <button
              className={`filter-btn ${filter === 'all' ? 'is-active' : ''}`}
              onClick={() => setFilter('all')}
              role="tab"
              aria-selected={filter === 'all'}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'highlighted' ? 'is-active' : ''}`}
              onClick={() => setFilter('highlighted')}
              role="tab"
              aria-selected={filter === 'highlighted'}
            >
              Highlighted
            </button>
            <button
              className={`filter-btn ${filter === 'hackathon' ? 'is-active' : ''}`}
              onClick={() => setFilter('hackathon')}
              role="tab"
              aria-selected={filter === 'hackathon'}
            >
              Hackathon
            </button>
            <button
              className={`filter-btn ${filter === 'school' ? 'is-active' : ''}`}
              onClick={() => setFilter('school')}
              role="tab"
              aria-selected={filter === 'school'}
            >
              School
            </button>
          </div>
        </header>
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="project-card" data-animate>
              <div
                className="project-image"
                style={{ background: project.gradient }}
              ></div>
              <div className="project-content">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <span className="project-year">{project.year}</span>
                </div>
                <p>{project.description}</p>
                <div className="project-footer">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener"
                      className="text-link"
                    >
                      GitHub
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener"
                      className="text-link"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.links.video && (
                    <a
                      href={project.links.video}
                      target="_blank"
                      rel="noopener"
                      className="text-link"
                    >
                      Demo Video
                    </a>
                  )}
                  {project.links.devpost && (
                    <a
                      href={project.links.devpost}
                      target="_blank"
                      rel="noopener"
                      className="text-link"
                    >
                      Devpost
                    </a>
                  )}
                  {project.links.docs && (
                    <a
                      href={project.links.docs}
                      target="_blank"
                      rel="noopener"
                      className="text-link"
                    >
                      Docs
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
