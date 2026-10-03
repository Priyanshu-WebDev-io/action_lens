import React from 'react';
import { Loader2, CheckCircle2, FileText, Cpu, ShieldCheck } from 'lucide-react';

export default function ProcessingState({ step = 2 }) {
  const steps = [
    { title: 'Document Ingestion', desc: 'Parsing PDF bytes and metadata', icon: FileText },
    { title: 'MinerU Markdown Conversion', desc: 'Preserving layout, headers & tables', icon: Loader2 },
    { title: 'Gemma 4 Reasoning Core', desc: 'Extracting actions, rules & dependencies', icon: Cpu },
    { title: 'Zod Schema Validation', desc: 'Verifying structured data integrity', icon: ShieldCheck },
  ];

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
      <div className="text-center mb-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 mb-3 border border-sky-500/20 animate-pulse">
          <Cpu className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-white">Synthesizing Action Plan</h3>
        <p className="text-xs text-slate-400">Google Gemma 4 is parsing rules, prerequisites, and deadlines...</p>
      </div>

      <div className="space-y-3">
        {steps.map((s, idx) => {
          const isDone = idx < step;
          const isCurrent = idx === step;
          const Icon = s.icon;

          return (
            <div
              key={s.title}
              className={`flex items-center gap-3.5 rounded-xl border p-3 transition-all ${
                isCurrent
                  ? 'border-sky-500/40 bg-sky-500/5 shadow-md shadow-sky-500/10'
                  : isDone
                  ? 'border-white/5 bg-white/[0.02] text-slate-400'
                  : 'border-transparent text-slate-600 opacity-60'
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  isDone
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : isCurrent
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    : 'bg-white/5 text-slate-500'
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
                  <span className={`text-xs font-semibold ${isCurrent ? 'text-white' : isDone ? 'text-slate-300' : 'text-slate-500'}`}>
                    {s.title}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] text-sky-400 font-mono animate-pulse">Active</span>
                  )}
                  {isDone && (
                    <span className="text-[10px] text-emerald-400 font-mono">Done</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
