import React, { useEffect } from 'react';
import { useAppStore } from './lib/state/app-store';
import AppRouter from './app/router';
import { TooltipProvider } from './components/ui/Tooltip';

function App() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <TooltipProvider>
      <AppRouter />
    </TooltipProvider>
  );
}

export default App;