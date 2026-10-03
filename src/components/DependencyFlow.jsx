import React from 'react';
import { GitMerge, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

export default function DependencyFlow({ dependencies = [] }) {
  const sortedDeps = [...dependencies].sort((a, b) => a.stepNumber - b.stepNumber);

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-sm">
      <div className="border-b border-white/5 pb-3 mb-4">
        <h2 className="text-sm font-bold tracking-tight text-white uppercase flex items-center gap-2">
          <GitMerge className="h-4 w-4 text-sky-400" />
          <span>Sequential Order & Dependencies</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">Complete tasks in this order to avoid portal locks or rejections</p>
      </div>

      <div className="relative space-y-3">
        {sortedDeps.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">No sequential dependencies identified.</p>
        ) : (
          sortedDeps.map((dep, index) => (
            <div key={dep.id} className="relative flex items-start gap-3.5">
              {/* Step Badge */}
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold font-mono">
                {dep.stepNumber || index + 1}
              </div>

              {/* Step Card */}
              <div className="flex-1 rounded-xl border border-white/10 bg-slate-900/60 p-3 hover:border-white/20 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <h4 className="text-xs font-semibold text-slate-100">{dep.title}</h4>
                  
                  {dep.prerequisiteFor && (
                    <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400 border border-amber-500/20">
                      <Lock className="h-2.5 w-2.5" />
                      <span>Required for: {dep.prerequisiteFor}</span>
                    </span>
                  )}
                </div>

                {dep.details && (
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{dep.details}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
