import React from 'react';
import { useAppStore } from '../../lib/state/app-store';
import { cn } from '../../lib/utils';
import { Icons } from '../../components/icons/Icons';
import { ThemeToggle } from '../../components/shared/ThemeToggle';
import { Button } from '../../components/ui/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/ui/Tooltip';

const SideNav: React.FC = () => {
    const { isNavOpen, toggleNav } = useAppStore(state => ({ isNavOpen: state.isNavOpen, toggleNav: state.toggleNav }));

    return (
        <>
            <div className="fixed top-4 right-4 z-50">
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={toggleNav}>
                            {isNavOpen ? <Icons.panelRightClose className="h-4 w-4" /> : <Icons.panelLeftClose className="h-4 w-4" />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isNavOpen ? 'Close Panel' : 'Open Panel'}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <aside className={cn(
                "fixed top-0 right-0 h-full bg-background border-l border-border transition-transform duration-300 ease-in-out z-40",
                "flex flex-col",
                isNavOpen ? "translate-x-0 w-80" : "translate-x-full w-80"
            )}>
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-tight">Settings</h2>
                </div>
                <nav className="flex-1 px-4 py-4 space-y-4">
                     <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent">
                        <span className="text-sm font-medium">Theme</span>
                        <ThemeToggle />
                    </div>
                </nav>
                 <div className="p-6 border-t border-border mt-auto">
                    <div className="flex items-center gap-2">
                         <Icons.logo className="h-6 w-6"/>
                        <span className="font-semibold">InvestorFit</span>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default SideNav;
