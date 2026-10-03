import React from 'react';
import { AlertOctagon, AlertTriangle, Info } from 'lucide-react';

export default function WarningsView({
  warnings = [],
  title = 'Important Advisories & Rules',
  subtitle = 'Penalties, conditions, and closure notices',
}) {
  if (!warnings || warnings.length === 0) {
    return null;
  }

  const getSeverityStyle = (sev) => {
    switch (sev) {
      case 'critical':
        return {
          card: 'border-rose-200 bg-rose-50/60',
          icon: <AlertOctagon className="h-4 w-4 text-rose-600 shrink-0" />,
          badge: 'bg-rose-100 text-rose-800 border-rose-200',
        };
      case 'warning':
        return {
          card: 'border-amber-200 bg-amber-50/60',
          icon: <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />,
          badge: 'bg-amber-100 text-amber-800 border-amber-200',
        };
      default:
        return {
          card: 'border-blue-200 bg-blue-50/60',
          icon: <Info className="h-4 w-4 text-blue-600 shrink-0" />,
          badge: 'bg-blue-100 text-blue-800 border-blue-200',
        };
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
      <div className="border-b border-slate-100 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
        <h2 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 uppercase flex items-center gap-2">
          <AlertOctagon className="h-4 w-4 text-rose-600 shrink-0" />
          <span>{title}</span>
        </h2>
        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>

      <div className="space-y-2.5 sm:space-y-3">
        {warnings.map((w, index) => {
          const style = getSeverityStyle(w.severity);
          return (
            <div
              key={w.id || index}
              className={`rounded-xl border p-3 sm:p-3.5 transition ${style.card}`}
            >
              <div className="flex items-start gap-2.5 sm:gap-3">
                <div className="mt-0.5">{style.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
                    <h4 className="text-xs font-semibold text-slate-900">{w.title}</h4>
                    <span className={`self-start sm:self-auto rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${style.badge}`}>
                      {w.severity}
                    </span>
                  </div>
                  {w.consequence && (
                    <p className="text-[11px] text-slate-700 mt-1 leading-relaxed">
                      {w.consequence}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
