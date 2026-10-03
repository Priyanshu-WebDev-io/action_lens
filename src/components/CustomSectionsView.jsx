import React from 'react';
import { Layers } from 'lucide-react';

export default function CustomSectionsView({ customSections = [] }) {
  if (!customSections || customSections.length === 0) {
    return null;
  }

  return (
    <>
      {customSections.map((sec, idx) => (
        <div
          key={sec.id || idx}
          className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"
        >
          <div className="border-b border-slate-100 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
            <h2 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 uppercase flex items-center gap-2">
              <Layers className="h-4 w-4 text-sky-600 shrink-0" />
              <span>{sec.title}</span>
            </h2>
            {sec.subtitle && (
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{sec.subtitle}</p>
            )}
          </div>

          <div className="space-y-2 sm:space-y-2.5">
            {sec.items?.map((item, itemIdx) => (
              <div
                key={item.id || itemIdx}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:p-3.5 hover:bg-slate-100/60 transition flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-2"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-900">{item.label}</div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{item.value}</p>
                </div>

                {item.tag && (
                  <span className="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 border border-slate-200">
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
