import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { projects, Project, projectCategories } from '../data/projects';
import GitHubContributions from './GitHubContributions';
import MarketTicker from './MarketTicker';
import {
  ContactSection,
  ExperienceSection,
  FeaturedProjectsSection,
  HeroSection,
  ProjectsSection,
  SiteFooter,
  SiteHeader
} from './standard/StandardSections';

const StackBlitzEmbed = dynamic(() => import('./StackBlitzEmbed'), { ssr: false });

type FilterType = typeof projectCategories[number];

interface StandardViewProps {
  onTerminalDemo?: (command: string) => void;
  onTryTerminal?: () => void;
}

export default function StandardView({ onTerminalDemo, onTryTerminal }: StandardViewProps) {
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
      <SiteHeader />
      <main>
        <HeroSection onTryTerminal={onTryTerminal} />
        <ExperienceSection />
        <FeaturedProjectsSection onProjectSelect={setSelectedProjectId} />
        <ProjectsSection
          filter={filter}
          filteredProjects={filteredProjects}
          selectedProject={selectedProject}
          onFilterChange={setFilter}
          onProjectSelect={setSelectedProjectId}
          onOpenSandbox={setSandboxProject}
          onTerminalDemo={onTerminalDemo}
        />
        <GitHubContributions />
        <section className="section market-section-wrapper" id="markets">
          <div className="container">
            <MarketTicker />
          </div>
        </section>
        <ContactSection copied={copied} onCopyEmail={copyEmail} />
      </main>
      <SiteFooter />
    </div>
  );
}
