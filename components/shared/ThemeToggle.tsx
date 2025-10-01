import React from 'react';
import { useAppStore } from '../../lib/state/app-store';
import { Switch } from '../ui/Switch';
import { Icons } from '../icons/Icons';

export const ThemeToggle = () => {
  const { theme, setTheme } = useAppStore(state => ({ theme: state.theme, setTheme: state.setTheme }));

  const isDark = theme === 'dark';

  const handleCheckedChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center gap-2">
      <Icons.sun className="h-4 w-4" />
      <Switch checked={isDark} onCheckedChange={handleCheckedChange} />
      <Icons.moon className="h-4 w-4" />
    </div>
  );
};