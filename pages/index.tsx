import Head from 'next/head';
import { useState, useEffect } from 'react';
import StandardView from '../src/components/StandardView';
import TerminalView from '../src/components/Terminal';
import ModeToggle from '../src/components/ModeToggle';

type ViewMode = 'standard' | 'terminal';

const STORAGE_KEY = 'portfolio-view-mode';

const TITLE = 'Owen Fisher · Backend & Infrastructure Engineer';
const DESCRIPTION =
  'Owen Fisher builds real-time data and ML systems, backend infrastructure, and AI agents. AI engineering intern at Sendbird, ex-RBC quant developer, 3x hackathon 1st place.';
const SITE_URL = 'https://owenfisher.vercel.app';

export default function Home() {
  // Render the portfolio on the server so crawlers and link previews see real
  // content; switch to the saved view (if any) after hydration.
  const [mode, setMode] = useState<ViewMode>('standard');
  const [terminalCommand, setTerminalCommand] = useState<string | undefined>();

  useEffect(() => {
    try {
      const savedMode = localStorage.getItem(STORAGE_KEY) as ViewMode | null;
      if (savedMode === 'terminal') {
        setMode(savedMode);
      }
    } catch {
      // Storage can be unavailable (private mode); keep the default view.
    }
  }, []);

  const persistMode = (newMode: ViewMode) => {
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch {
      // Ignore storage failures; the view still switches for this visit.
    }
  };

  const handleModeChange = (newMode: ViewMode) => {
    setMode(newMode);
    persistMode(newMode);
  };

  const handleTerminalDemo = (command: string) => {
    setTerminalCommand(command);
    setMode('terminal');
    persistMode('terminal');
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⌨️</text></svg>" />
      </Head>

      <ModeToggle mode={mode} onModeChange={handleModeChange} />
      {mode === 'standard' ? (
        <StandardView
          onTerminalDemo={handleTerminalDemo}
          onTryTerminal={() => handleModeChange('terminal')}
        />
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
