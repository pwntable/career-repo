import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export function Toast({ toast }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
    warn: <AlertCircle className="w-4 h-4 text-amber-400" />,
    info: <Sparkles className="w-4 h-4 text-brand-400" />,
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium border border-slate-700/50 dark:border-slate-200 transition-all duration-300 animate-bounce">
      {icons[toast.type] || icons.info}
      <span>{toast.msg}</span>
    </div>
  );
}
