import Head from 'next/head';
import { useState, useEffect } from 'react';
import StandardView from '../src/components/StandardView';
import TerminalView from '../src/components/Terminal';
import ModeToggle from '../src/components/ModeToggle';

type ViewMode = 'standard' | 'terminal';

const STORAGE_KEY = 'portfolio-view-mode';

export default function Home() {
  const [mode, setMode] = useState<ViewMode>('terminal');
  const [isLoading, setIsLoading] = useState(true);
  const [terminalCommand, setTerminalCommand] = useState<string | undefined>();

  useEffect(() => {
    // Check for saved preference, default to terminal
    const savedMode = localStorage.getItem(STORAGE_KEY) as ViewMode | null;
    if (savedMode) {
      setMode(savedMode);
    }
    setIsLoading(false);
  }, []);

  const handleModeChange = (newMode: ViewMode) => {
    setMode(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  const handleTerminalDemo = (command: string) => {
    setTerminalCommand(command);
    setMode('terminal');
    localStorage.setItem(STORAGE_KEY, 'terminal');
  };


  // Prevent flash of content while loading
  if (isLoading) {
    return (
      <>
        <Head>
          <title>Owen Fisher · Developer Portfolio</title>
          <meta name="description" content="Quantitative developer portfolio for Owen Fisher showcasing projects, experience, and contact information." />
        </Head>
        <div style={{
          minHeight: '100vh',
          background: '#0d1117',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: '#00d4ff' }}>Loading...</span>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Owen Fisher · Developer Portfolio</title>
        <meta name="description" content="Quantitative developer portfolio for Owen Fisher showcasing projects, experience, and contact information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⌨️</text></svg>" />
      </Head>

      <ModeToggle mode={mode} onModeChange={handleModeChange} />
      {mode === 'standard' ? (
        <StandardView onTerminalDemo={handleTerminalDemo} />
      ) : (
        <TerminalView
          onClose={() => handleModeChange('standard')}
          initialCommand={terminalCommand}
          key={terminalCommand}
        />
      )}
    </>
  );
}
