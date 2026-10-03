import React from 'react';
import { Layers, Bookmark } from 'lucide-react';

export default function CustomSectionsView({ customSections = [] }) {
  if (!customSections || customSections.length === 0) {
    return null;
  }

  return (
    <>
      {customSections.map((sec, idx) => (
        <div
          key={sec.id || idx}
          className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-sm"
        >
          <div className="border-b border-white/5 pb-3 mb-4">
            <h2 className="text-sm font-bold tracking-tight text-white uppercase flex items-center gap-2">
              <Layers className="h-4 w-4 text-sky-400" />
              <span>{sec.title}</span>
            </h2>
            {sec.subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">{sec.subtitle}</p>
            )}
          </div>

          <div className="space-y-2.5">
            {sec.items?.map((item, itemIdx) => (
              <div
                key={item.id || itemIdx}
                className="rounded-xl border border-white/10 bg-slate-900/60 p-3.5 hover:border-white/20 transition flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-200">{item.label}</div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.value}</p>
                </div>

                {item.tag && (
                  <span className="shrink-0 rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-300 border border-white/10">
                    {item.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
