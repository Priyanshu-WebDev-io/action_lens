import React from 'react';
import { Calendar, Clock } from 'lucide-react';

export default function DeadlinesView({
  deadlines = [],
  title = 'Deadlines & Cutoffs',
  subtitle = 'Critical dates and milestone cutoffs from the notice',
}) {
  if (!deadlines || deadlines.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="border-b border-slate-100 pb-3 mb-4">
        <h2 className="text-sm font-bold tracking-tight text-slate-900 uppercase flex items-center gap-2">
          <Calendar className="h-4 w-4 text-sky-600" />
          <span>{title}</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>

      <div className="space-y-3">
        {deadlines.map((dl) => (
          <div
            key={dl.id}
            className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 hover:bg-slate-100/60 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-900">{dl.title}</span>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-700 border border-sky-200">
                  <Calendar className="h-3 w-3" />
                  <span>{dl.date}</span>
                </span>
                {dl.time && (
                  <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700 border border-slate-200 font-mono">
                    <Clock className="h-3 w-3 text-slate-500" />
                    <span>{dl.time}</span>
                  </span>
                )}
              </div>
            </div>

            {dl.notes && (
              <p className="text-[11px] text-slate-600 mt-2 flex items-start gap-1.5">
                <span className="text-amber-700 font-bold shrink-0">Note:</span>
                <span>{dl.notes}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
