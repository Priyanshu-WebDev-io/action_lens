import React from 'react';
import { GitMerge, Lock } from 'lucide-react';

export default function DependencyFlow({
  dependencies = [],
  title = 'Sequential Order & Dependencies',
  subtitle = 'Complete tasks in this order to avoid portal locks or rejections',
}) {
  if (!dependencies || dependencies.length === 0) {
    return null;
  }

  const sortedDeps = [...dependencies].sort((a, b) => a.stepNumber - b.stepNumber);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="border-b border-slate-100 pb-3 mb-4">
        <h2 className="text-sm font-bold tracking-tight text-slate-900 uppercase flex items-center gap-2">
          <GitMerge className="h-4 w-4 text-sky-600" />
          <span>{title}</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>

      <div className="relative space-y-3">
        {sortedDeps.map((dep, index) => (
          <div key={dep.id || index} className="relative flex items-start gap-3.5">
            {/* Step Badge */}
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold font-mono">
              {dep.stepNumber || index + 1}
            </div>

            {/* Step Card */}
            <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50/70 p-3 hover:bg-slate-100/60 transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <h4 className="text-xs font-semibold text-slate-900">{dep.title}</h4>
                
                {dep.prerequisiteFor && (
                  <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-800 border border-amber-200">
                    <Lock className="h-2.5 w-2.5" />
                    <span>Required for: {dep.prerequisiteFor}</span>
                  </span>
                )}
              </div>

              {dep.details && (
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{dep.details}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
