import { useEffect, useRef, useState } from 'react';
import sdk from '@stackblitz/sdk';

interface StackBlitzEmbedProps {
  repo: string;
  openFile?: string;
  startScript?: string;
  onClose: () => void;
}

export default function StackBlitzEmbed({ repo, openFile, startScript, onClose }: StackBlitzEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const embedInitiated = useRef(false);

  useEffect(() => {
    // Prevent double-embedding in React strict mode
    if (embedInitiated.current) return;
    if (!containerRef.current) return;

    embedInitiated.current = true;

    const embedProject = async () => {
      try {
        setIsLoading(true);
        setError(null);

        await sdk.embedGithubProject(
          containerRef.current!,
          repo,
          {
            openFile: openFile || 'README.md',
            startScript: startScript || 'dev',
            theme: 'dark',
            clickToLoad: false,
            hideNavigation: false,
            hideDevTools: false,
          }
        );

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project');
        setIsLoading(false);
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(embedProject, 100);
  }, [repo, openFile, startScript]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="stackblitz-overlay">
      <div className="stackblitz-container">
        <div className="stackblitz-header">
          <div className="stackblitz-header-left">
            <span className="stackblitz-title">
              <span style={{ color: 'var(--accent)' }}>$</span> npm run dev
              <span style={{ color: 'var(--text-dim)' }}> — {repo}</span>
            </span>
          </div>
          <button
            className="stackblitz-close"
            onClick={onClose}
            aria-label="Close StackBlitz"
          >
            <span style={{ color: 'var(--accent)' }}>ESC</span> Close
          </button>
        </div>

        <div className="stackblitz-body">
          {/* Loading overlay - positioned on top of iframe container */}
          {isLoading && (
            <div className="stackblitz-loading">
              <div className="loading-text">
                <span style={{ color: 'var(--accent)' }}>{'>'}</span> Starting development server...
                <br />
                <span style={{ color: 'var(--accent)' }}>{'>'}</span> Installing dependencies...
                <br />
                <span style={{ color: 'var(--accent)' }}>{'>'}</span> Compiling...
              </div>
            </div>
          )}

          {error && (
            <div className="stackblitz-error">
              <span style={{ color: 'var(--error)' }}>Error:</span> {error}
              <br />
              <button onClick={onClose} style={{ marginTop: '1rem', color: 'var(--accent)', background: 'none', border: '1px solid var(--accent)', padding: '0.5rem 1rem', cursor: 'pointer' }}>
                Return to terminal
              </button>
            </div>
          )}

          {/* Container always visible so StackBlitz can embed */}
          <div
            ref={containerRef}
            className="stackblitz-iframe-container"
            style={{
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.3s ease'
            }}
          />
        </div>
      </div>
    </div>
  );
}
