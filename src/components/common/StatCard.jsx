import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, trend, trendLabel, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    rose: 'bg-rose-50 text-rose-700 border-rose-100',
    slate: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const iconStyle = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{value}</div>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-md border ${iconStyle}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-1.5 text-xs pt-3 border-t border-slate-100">
          <span className={`font-semibold ${trend >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend >= 0 ? `+${trend}%` : `${trend}%`}
          </span>
          <span className="text-slate-500">{trendLabel || 'vs last month'}</span>
        </div>
      )}
    </div>
  );
}
