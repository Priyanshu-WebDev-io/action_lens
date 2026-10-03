'use client';

import React from 'react';
import { Loader2, CheckCircle2, FileText, Check, Sparkles, ShieldCheck } from 'lucide-react';

export default function ProcessingState({ step = 0, documentName = 'Uploaded Document' }) {
  const steps = [
    {
      title: 'Reading Document Layout',
      desc: 'Extracting text and identifying document structure via MinerU parser',
    },
    {
      title: 'Gemma 4 Multimodal Reasoning',
      desc: 'Analyzing clauses, deadlines, requirements, and policy rules',
    },
    {
      title: 'Synthesizing Actions & Dependencies',
      desc: 'Extracting checklists, chronological flow, and penalty cutoffs',
    },
    {
      title: 'Validating Roadmap Schema',
      desc: 'Enforcing deterministic JSON structure with Zod runtime verification',
    },
  ];

  // Dynamic progress percentage:
  // step 0 -> 22%
  // step 1 -> 48%
  // step 2 -> 72%
  // step 3 -> 90% (stays at 90% while actively waiting for model response)
  // step 4 -> 100% (final completion)
  const progressPercent = step >= 4 ? 100 : step === 3 ? 90 : step === 2 ? 72 : step === 1 ? 48 : 22;
  const isComplete = step >= 4;

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100 mx-auto mb-3">
          {isComplete ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-600 animate-bounce" />
          ) : (
            <Loader2 className="h-6 w-6 text-sky-600 animate-spin" />
          )}
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          {isComplete ? 'Action Plan Ready!' : 'Generating Action Plan'}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {isComplete
            ? 'Roadmap generated and validated successfully.'
            : 'Gemma 4 is analyzing document details and extracting your roadmap...'}
        </p>

        {documentName && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 font-medium max-w-[320px] truncate border border-slate-200">
            <FileText className="h-3.5 w-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{documentName}</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ease-out ${
            isComplete ? 'bg-emerald-600' : 'bg-sky-600'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 4 Qualified Progress Tiers */}
      <div className="space-y-3">
        {steps.map((s, idx) => {
          const isDone = idx < step;
          const isCurrent = idx === step && !isComplete;

          return (
            <div
              key={s.title}
              className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                isCurrent
                  ? 'border-sky-300 bg-sky-50/60 shadow-xs'
                  : isDone
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-slate-100 bg-white opacity-40'
              }`}
            >
              {/* Status Indicator */}
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  isDone
                    ? 'bg-emerald-100 text-emerald-700'
                    : isCurrent
                    ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-300 ring-offset-1'
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
                        ? 'text-slate-900 font-bold'
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
                        ? 'text-sky-600 font-semibold animate-pulse'
                        : isDone
                        ? 'text-emerald-600 font-semibold'
                        : 'text-slate-400'
                    }`}
                  >
                    {isDone ? 'Completed' : isCurrent ? 'Processing...' : 'Waiting'}
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
