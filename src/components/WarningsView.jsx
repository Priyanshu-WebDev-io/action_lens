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
          card: 'border-rose-500/30 bg-rose-950/15',
          icon: <AlertOctagon className="h-4 w-4 text-rose-400 shrink-0" />,
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        };
      case 'warning':
        return {
          card: 'border-amber-500/30 bg-amber-950/15',
          icon: <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />,
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        };
      default:
        return {
          card: 'border-blue-500/30 bg-blue-950/15',
          icon: <Info className="h-4 w-4 text-blue-400 shrink-0" />,
          badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        };
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-sm">
      <div className="border-b border-white/5 pb-3 mb-4">
        <h2 className="text-sm font-bold tracking-tight text-white uppercase flex items-center gap-2">
          <AlertOctagon className="h-4 w-4 text-rose-400" />
          <span>{title}</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
      </div>

      <div className="space-y-3">
        {warnings.map((w, index) => {
          const style = getSeverityStyle(w.severity);
          return (
            <div
              key={w.id || index}
              className={`rounded-xl border p-3.5 transition ${style.card}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{style.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-semibold text-slate-100">{w.title}</h4>
                    <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${style.badge}`}>
                      {w.severity}
                    </span>
                  </div>
                  {w.consequence && (
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
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
