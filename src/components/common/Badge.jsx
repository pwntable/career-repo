import React from 'react';

export function Badge({ children, variant = 'default', className = '' }) {
  const baseStyle = "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide";
  
  const variants = {
    default: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    brand: "bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/50 dark:border-brand-800/50",
    emerald: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50",
    amber: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50",
    purple: "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/50",
  };

  return (
    <span className={`${baseStyle} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
