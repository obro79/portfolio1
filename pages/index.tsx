import Head from 'next/head';
import { useState, useEffect } from 'react';
import StandardView from '../src/components/StandardView';
import TerminalView from '../src/components/Terminal';
import ModeToggle from '../src/components/ModeToggle';
import ModeSplash from '../src/components/ModeSplash';

type ViewMode = 'standard' | 'terminal';

const STORAGE_KEY = 'portfolio-view-mode';
const VISITED_KEY = 'portfolio-visited';

export default function Home() {
  const [mode, setMode] = useState<ViewMode>('standard');
  const [showSplash, setShowSplash] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem(VISITED_KEY);
    const savedMode = localStorage.getItem(STORAGE_KEY) as ViewMode | null;

    if (hasVisited && savedMode) {
      setMode(savedMode);
      setShowSplash(false);
    } else {
      setShowSplash(true);
    }

    setIsLoading(false);
  }, []);

  const handleModeChange = (newMode: ViewMode) => {
    setMode(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  const handleSplashSelect = (selectedMode: ViewMode) => {
    setMode(selectedMode);
    setShowSplash(false);
    localStorage.setItem(STORAGE_KEY, selectedMode);
    localStorage.setItem(VISITED_KEY, 'true');
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

      {showSplash ? (
        <ModeSplash onSelectMode={handleSplashSelect} />
      ) : (
        <>
          <ModeToggle mode={mode} onModeChange={handleModeChange} />
          {mode === 'standard' ? <StandardView /> : <TerminalView onClose={() => handleModeChange('standard')} />}
        </>
      )}
    </>
  );
}
