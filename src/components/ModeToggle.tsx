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
        aria-label="Switch to standard view"
      >
        GUI
      </button>
      <button
        className={mode === 'terminal' ? 'active' : ''}
        onClick={() => onModeChange('terminal')}
        aria-label="Switch to terminal view"
      >
        &gt;_
      </button>
    </div>
  );
}
