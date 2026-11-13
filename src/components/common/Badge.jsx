import React from 'react';

export default function Badge({ variant = 'neutral', children, size = 'sm' }) {
  const variantClasses = {
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-blue-50 text-blue-700 border-blue-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    navy: 'bg-slate-900 text-white border-slate-800'
  };

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[11px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-semibold'
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-md border ${variantClasses[variant] || variantClasses.neutral} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
}
