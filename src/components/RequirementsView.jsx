import React from 'react';
import { Paperclip, FileCheck, Layers } from 'lucide-react';

export default function RequirementsView({ requirements = [] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-sm">
      <div className="border-b border-white/5 pb-3 mb-4">
        <h2 className="text-sm font-bold tracking-tight text-white uppercase flex items-center gap-2">
          <Paperclip className="h-4 w-4 text-sky-400" />
          <span>Required Documents & Proofs</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">Physical and digital assets you must assemble</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {requirements.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center col-span-2">No required documents specified.</p>
        ) : (
          requirements.map((req) => (
            <div
              key={req.id}
              className="rounded-xl border border-white/10 bg-slate-900/60 p-3.5 hover:border-white/20 transition"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-xs font-semibold text-slate-200">{req.name}</span>
                {req.mandatory && (
                  <span className="rounded bg-rose-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-rose-400 border border-rose-500/20">
                    Mandatory
                  </span>
                )}
              </div>

              {req.format && (
                <div className="mb-2">
                  <span className="inline-flex items-center gap-1 rounded bg-sky-500/10 px-2 py-0.5 text-[11px] font-mono text-sky-300 border border-sky-500/20">
                    <FileCheck className="h-3 w-3" />
                    <span>{req.format}</span>
                  </span>
                </div>
              )}

              {req.details && (
                <p className="text-[11px] text-slate-400 leading-relaxed">{req.details}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
