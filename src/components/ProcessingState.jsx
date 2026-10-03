import React from 'react';
import { Loader2, CheckCircle2, FileText, Cpu, ShieldCheck } from 'lucide-react';

export default function ProcessingState({ step = 2 }) {
  const steps = [
    { title: 'Document Ingestion', desc: 'Parsing PDF bytes and layout', icon: FileText },
    { title: 'MinerU Markdown Conversion', desc: 'Preserving structure, headers & tables', icon: Loader2 },
    { title: 'AI Reasoning Engine', desc: 'Extracting actions, rules & dependencies in real-time', icon: Cpu },
    { title: 'Zod Schema Validation', desc: 'Verifying structured data integrity', icon: ShieldCheck },
  ];

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm">
      <div className="text-center mb-5 sm:mb-6">
        <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 mb-2.5 sm:mb-3 border border-sky-200 animate-pulse">
          <Cpu className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900">Synthesizing Action Plan</h3>
        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 px-2">Analyzing rules, prerequisites, and deadlines in real-time...</p>
      </div>

      <div className="space-y-2.5 sm:space-y-3">
        {steps.map((s, idx) => {
          const isDone = idx < step;
          const isCurrent = idx === step;
          const Icon = s.icon;

          return (
            <div
              key={s.title}
              className={`flex items-center gap-2.5 sm:gap-3.5 rounded-xl border p-2.5 sm:p-3 transition-all ${
                isCurrent
                  ? 'border-sky-300 bg-sky-50/60 shadow-sm'
                  : isDone
                  ? 'border-slate-200 bg-slate-50 text-slate-700'
                  : 'border-transparent text-slate-400 opacity-50'
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  isDone
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : isCurrent
                    ? 'bg-sky-100 text-sky-700 border border-sky-200'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${isCurrent ? 'text-slate-900' : isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                    {s.title}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] text-sky-700 font-mono font-medium animate-pulse">Active</span>
                  )}
                  {isDone && (
                    <span className="text-[10px] text-emerald-600 font-mono font-medium">Done</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 truncate">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
