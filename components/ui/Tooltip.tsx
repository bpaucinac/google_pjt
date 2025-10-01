import React, { useState, createContext, useContext, cloneElement, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface TooltipContextProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    triggerRef: React.RefObject<HTMLElement>;
}

const TooltipContext = createContext<TooltipContextProps | null>(null);

const useTooltip = () => {
    const context = useContext(TooltipContext);
    if (!context) {
        throw new Error('useTooltip must be used within a TooltipProvider');
    }
    return context;
};

export const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>; // Simplified provider
};

export const Tooltip = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLElement>(null);
    return (
        <TooltipContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
            <div className="relative inline-block">{children}</div>
        </TooltipContext.Provider>
    );
};

export const TooltipTrigger = ({ children, asChild }: { children: React.ReactElement, asChild?: boolean }) => {
    const { setIsOpen, triggerRef } = useTooltip();
    
    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);
    const handleFocus = () => setIsOpen(true);
    const handleBlur = () => setIsOpen(false);

    const triggerProps = {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleFocus,
        onBlur: handleBlur,
        ref: triggerRef,
    };
    
    if (asChild) {
        return cloneElement(children, triggerProps);
    }
    
    return <span {...triggerProps}>{children}</span>;
};


export const TooltipContent = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const { isOpen, triggerRef } = useTooltip();
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && triggerRef.current && contentRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const contentRect = contentRef.current.getBoundingClientRect();
            
            const top = triggerRect.top - contentRect.height - 8;
            const left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2);

            setPosition({ top: top + window.scrollY, left: left + window.scrollX });
        }
    }, [isOpen, triggerRef]);

    if (!isOpen) return null;

    return (
        <div
            ref={contentRef}
            // style={{ top: `${position.top}px`, left: `${position.left}px` }}
            className={cn(
                "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                "absolute", // using absolute positioning instead of portal for simplicity
                className
            )}
        >
            {children}
        </div>
    );
};