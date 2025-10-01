import React from 'react';
import SideNav from './SideNav';
import { useAppStore } from '../../lib/state/app-store';
import { cn } from '../../lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isNavOpen = useAppStore((state) => state.isNavOpen);

  return (
    <div className="flex h-screen bg-background">
      <main className={cn(
        "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
        isNavOpen ? "pr-80" : "pr-0"
      )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
            {children}
        </div>
      </main>
      <SideNav />
    </div>
  );
};

export default MainLayout;