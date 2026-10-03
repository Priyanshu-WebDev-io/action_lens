import React from 'react';
import { Paperclip, FileCheck } from 'lucide-react';

export default function RequirementsView({
  requirements = [],
  title = 'Required Documents & Proofs',
  subtitle = 'Physical and digital assets you must assemble',
}) {
  if (!requirements || requirements.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
      <div className="border-b border-slate-100 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
        <h2 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 uppercase flex items-center gap-2">
          <Paperclip className="h-4 w-4 text-sky-600 shrink-0" />
          <span>{title}</span>
        </h2>
        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {requirements.map((req) => (
          <div
            key={req.id}
            className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:p-3.5 hover:bg-slate-100/60 transition"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold text-slate-900">{req.name}</span>
              {req.mandatory && (
                <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700 border border-rose-200">
                  Mandatory
                </span>
              )}
            </div>

            {req.format && (
              <div className="mb-2">
                <span className="inline-flex items-center gap-1 rounded bg-sky-50 px-2 py-0.5 text-[11px] font-mono text-sky-700 border border-sky-200">
                  <FileCheck className="h-3 w-3" />
                  <span>{req.format}</span>
                </span>
              </div>
            )}

            {req.details && (
              <p className="text-[11px] text-slate-600 leading-relaxed">{req.details}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
