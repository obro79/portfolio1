import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Project } from '../../data/projects';

interface ProjectVisualProps {
  project: Project;
}

function TraceBlock({ project }: { project: Project }) {
  return (
    <div className="project-visual project-visual-terminal" aria-label={`${project.title} trace`}>
      <div className="project-visual-label">{project.visual.title}</div>
      <pre className="project-visual-trace">
        {project.visual.lines.join('\n')}
      </pre>
    </div>
  );
}

export default function ProjectVisual({ project }: ProjectVisualProps) {
  const { visual } = project;
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [project.id]);

  const hasImage = Boolean(visual.image || visual.media?.length);

  if (visual.type === 'terminal' || (!hasImage && visual.lines.length > 0)) {
    return <TraceBlock project={project} />;
  }

  if (imageFailed || (!hasImage && visual.lines.length > 0)) {
    return <TraceBlock project={project} />;
  }

  const gallery = visual.media?.length
    ? visual.media
    : visual.image
      ? [{ src: visual.image, title: visual.title, alt: visual.imageAlt || project.title }]
      : [];

  if (gallery.length === 0) {
    return visual.lines.length > 0 ? <TraceBlock project={project} /> : null;
  }

  const [hero, ...thumbs] = gallery;

  return (
    <div className="project-visual project-visual-product">
      <div className="project-visual-hero">
        <Image
          src={hero.src}
          alt={hero.alt}
          width={960}
          height={540}
          className="project-visual-image"
          sizes="(max-width: 768px) 100vw, 60vw"
          onError={() => setImageFailed(true)}
        />
      </div>
      {thumbs.length > 0 && (
        <div className="project-visual-gallery" role="list" aria-label={`${project.title} gallery`}>
          {thumbs.map((item) => (
            <div key={item.src} className="project-visual-thumb" role="listitem">
              <Image
                src={item.src}
                alt={item.alt}
                width={320}
                height={180}
                className="project-visual-image"
                sizes="200px"
                onError={() => setImageFailed(true)}
              />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      )}
      {visual.lines.length > 0 && (
        <pre className="project-visual-trace project-visual-trace-compact">
          {visual.lines.join('\n')}
        </pre>
      )}
    </div>
  );
}
