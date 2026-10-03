'use client';

import React from 'react';
import { Loader2, CheckCircle2, FileText, Check } from 'lucide-react';

export default function ProcessingState({ step = 1, documentName = 'Uploaded Document' }) {
  const steps = [
    {
      title: 'Reading Document',
      desc: 'Extracting text and document sections',
    },
    {
      title: 'Analyzing Actions & Deadlines',
      desc: 'Identifying checklist items, dates, and prerequisites',
    },
    {
      title: 'Structuring Action Plan',
      desc: 'Organizing your clear execution roadmap',
    },
  ];

  // Simple progress percentage: step 0 -> 33%, step 1 -> 66%, step 2+ -> 90%
  const progressPercent = Math.min(95, Math.max(25, (step + 1) * 32));

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100 mx-auto mb-3">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Generating Action Plan
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Analyzing document details and extracting your roadmap...
        </p>

        {documentName && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 font-medium max-w-[280px] truncate border border-slate-200">
            <FileText className="h-3.5 w-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{documentName}</span>
          </div>
        )}
      </div>

      {/* Clean Minimalist Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
        <div
          className="bg-sky-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 3 Clear, Understandable Steps */}
      <div className="space-y-3">
        {steps.map((s, idx) => {
          const isDone = idx < step;
          const isCurrent = idx === step;

          return (
            <div
              key={s.title}
              className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
                isCurrent
                  ? 'border-sky-200 bg-sky-50/50'
                  : isDone
                  ? 'border-slate-200 bg-slate-50/60'
                  : 'border-slate-100 bg-white opacity-50'
              }`}
            >
              {/* Status Indicator */}
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  isDone
                    ? 'bg-emerald-100 text-emerald-700'
                    : isCurrent
                    ? 'bg-sky-100 text-sky-700'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isDone ? (
                  <Check className="h-4 w-4 stroke-[2.5]" />
                ) : isCurrent ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Title & Description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold ${
                      isCurrent
                        ? 'text-slate-900'
                        : isDone
                        ? 'text-slate-800'
                        : 'text-slate-400'
                    }`}
                  >
                    {s.title}
                  </span>
                  <span
                    className={`text-[10px] font-medium ${
                      isCurrent
                        ? 'text-sky-600'
                        : isDone
                        ? 'text-emerald-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {isDone ? 'Done' : isCurrent ? 'In progress...' : 'Pending'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
