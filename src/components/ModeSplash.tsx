interface ModeSplashProps {
  onSelectMode: (mode: 'standard' | 'terminal') => void;
}

export default function ModeSplash({ onSelectMode }: ModeSplashProps) {
  return (
    <div className="splash-overlay">
      <div className="splash-content">
        <pre style={{ color: 'var(--accent)', fontSize: '8px', lineHeight: '1.2', marginBottom: 'var(--spacing-lg)' }}>
{`
 ██████╗ ██╗    ██╗███████╗███╗   ██╗
██╔═══██╗██║    ██║██╔════╝████╗  ██║
██║   ██║██║ █╗ ██║█████╗  ██╔██╗ ██║
██║   ██║██║███╗██║██╔══╝  ██║╚██╗██║
╚██████╔╝╚███╔███╔╝███████╗██║ ╚████║
 ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═══╝
`}
        </pre>

        <h1>Choose your experience</h1>

        <p>
          This portfolio has two viewing modes.
          You can switch between them at any time.
        </p>

        <div className="splash-buttons">
          <button onClick={() => onSelectMode('standard')}>
            Standard View
            <br />
            <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
              Traditional scrolling page
            </span>
          </button>
          <button className="primary" onClick={() => onSelectMode('terminal')}>
            Terminal Mode
            <br />
            <span style={{ fontSize: '12px', color: 'var(--accent-dim)' }}>
              Interactive CLI experience
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
