import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Since I cannot add dependencies, I'll polyfill clsx and twMerge here.
// This is a simplified version for demonstration purposes.

// Simplified clsx
function clsx(...args: any[]): string {
  let str = '';
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    const t = typeof arg;
    if (t === 'string' || t === 'number') {
      str += (str && ' ') + arg;
    } else if (Array.isArray(arg)) {
      str += (str && ' ') + clsx(...arg);
    } else if (t === 'object') {
      for (const k in arg) {
        if (arg.hasOwnProperty(k) && arg[k]) {
          str += (str && ' ') + k;
        }
      }
    }
  }
  return str;
}

// Simplified tailwind-merge
function twMerge(...classLists: any[]): string {
    const classStr = classLists.flat().filter(Boolean).join(' ');
    const classMap = new Map();
    
    classStr.split(/\s+/).forEach(className => {
        const [base] = className.split('-');
        // A very naive merge: last one wins for a given base class
        // e.g., 'p-2' and 'p-4', the one that comes later wins.
        // This is not a full implementation but works for simple cases.
        classMap.set(base, className);
    });

    return Array.from(classMap.values()).join(' ');
}