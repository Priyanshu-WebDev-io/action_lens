import React from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function DeadlinesView({ deadlines = [] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-sm">
      <div className="border-b border-white/5 pb-3 mb-4">
        <h2 className="text-sm font-bold tracking-tight text-white uppercase flex items-center gap-2">
          <Calendar className="h-4 w-4 text-sky-400" />
          <span>Deadlines & Cutoffs</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">Critical dates and milestone cutoffs from the notice</p>
      </div>

      <div className="space-y-3">
        {deadlines.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">No explicit deadlines identified in this document.</p>
        ) : (
          deadlines.map((dl) => (
            <div
              key={dl.id}
              className="rounded-xl border border-white/10 bg-slate-900/60 p-3.5 hover:border-white/20 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-200">{dl.title}</span>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded bg-sky-500/10 px-2 py-0.5 text-xs font-semibold text-sky-400 border border-sky-500/20">
                    <Calendar className="h-3 w-3" />
                    <span>{dl.date}</span>
                  </span>
                  {dl.time && (
                    <span className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 text-[11px] text-slate-300 border border-white/5 font-mono">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span>{dl.time}</span>
                    </span>
                  )}
                </div>
              </div>

              {dl.notes && (
                <p className="text-[11px] text-slate-400 mt-2 flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold shrink-0">Note:</span>
                  <span>{dl.notes}</span>
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
