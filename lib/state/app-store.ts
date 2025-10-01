import { useSyncExternalStore } from 'react';

type AppState = {
  theme: 'light' | 'dark';
  isNavOpen: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleNav: () => void;
};

const createStore = <T extends object>(createState: (set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void, get: () => T) => T) => {
  let state: T;
  const listeners = new Set<() => void>();

  const setState = (partial: Partial<T> | ((state: T) => Partial<T>)) => {
    const oldState = { ...state };
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    state = { ...state, ...nextState };
    listeners.forEach(listener => listener());
    
    // Persistence Logic
    Object.keys(nextState).forEach(key => {
        if(key === 'theme' || key === 'isNavOpen') {
            try {
                localStorage.setItem(`investorfit_${key}`, JSON.stringify(state[key as keyof T]));
            } catch (e) {
                console.error("Failed to save to localStorage", e);
            }
        }
    })
  };

  const getState = () => state;

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  state = createState(setState, getState);

  return <U>(selector: (state: T) => U): U => {
    return useSyncExternalStore(subscribe, () => selector(state));
  };
};

const getInitialState = () => {
    try {
        const theme = localStorage.getItem('investorfit_theme');
        const isNavOpen = localStorage.getItem('investorfit_isNavOpen');
        return {
            theme: theme ? JSON.parse(theme) : 'dark',
            isNavOpen: isNavOpen ? JSON.parse(isNavOpen) : true,
        };
    } catch {
        return {
            theme: 'dark' as const,
            isNavOpen: true,
        };
    }
}


export const useAppStore = createStore<AppState>((set) => ({
    ...getInitialState(),
    setTheme: (theme) => set({ theme }),
    toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
}));