interface ModeToggleProps {
  mode: 'standard' | 'terminal';
  onModeChange: (mode: 'standard' | 'terminal') => void;
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="mode-toggle">
      <button
        className={mode === 'standard' ? 'active' : ''}
        onClick={() => onModeChange('standard')}
        title="Portfolio view — projects, experience, contact"
        aria-label="Switch to portfolio view"
      >
        Portfolio
      </button>
      <button
        className={mode === 'terminal' ? 'active' : ''}
        onClick={() => onModeChange('terminal')}
        title="Terminal view — interactive CLI"
        aria-label="Switch to terminal view"
      >
        Terminal
      </button>
    </div>
  );
}
