'use client';

import React, { useState, useEffect } from 'react';
import {
  Loader2,
  CheckCircle2,
  FileText,
  Cpu,
  ShieldCheck,
  Layers,
  Sparkles,
  Clock,
  Terminal,
  Activity,
  Zap,
} from 'lucide-react';

const INSIGHTS = [
  'Extracting official circular structure, headings, and formatting...',
  'Identifying chronological milestones, deadlines, and submission cutoffs...',
  'Mapping sequential dependencies and workflow prerequisites...',
  'Detecting mandatory documents, identity proofs, and clearance requirements...',
  'Isolating critical policy warnings, penalty rules, and operational terms...',
  'Synthesizing structured roadmap with strict Zod type-safe validation...',
];

export default function ProcessingState({ step = 2, documentName = 'Uploaded Notice' }) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);

  // Live timer for elapsed time
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setElapsedMs(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Cycle telemetry insights every 2.4s
  useEffect(() => {
    const interval = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % INSIGHTS.length);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  // Compute a natural, dynamic progress percentage based on step and elapsed time
  const targetPercent = Math.min(
    95,
    Math.max(12, (step + 1) * 24 + Math.min(20, Math.floor(elapsedMs / 600)))
  );

  const steps = [
    {
      title: 'Document Ingestion',
      subtitle: 'Buffer Ingestion & Layout Analysis',
      desc: 'Validating PDF binary stream and raw text boundaries',
      icon: FileText,
    },
    {
      title: 'Structural Layout Parsing',
      subtitle: 'MinerU Document Extraction',
      desc: 'Preserving multi-column circulars, tables, and typography',
      icon: Layers,
    },
    {
      title: 'Multimodal AI Reasoning',
      subtitle: 'Gemini & Gemma Intelligence Core',
      desc: 'Extracting actions, chronological cutoffs, and dependencies',
      icon: Sparkles,
    },
    {
      title: 'Zod Schema Validation',
      subtitle: 'Type-Safe Integrity Verification',
      desc: 'Validating 6-pillar action plan schema with zero hallucination',
      icon: ShieldCheck,
    },
  ];

  const seconds = (elapsedMs / 1000).toFixed(1);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-7 shadow-xl shadow-slate-200/40 relative overflow-hidden">
      {/* Top Ambient Glow Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-36 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="relative text-center mb-5 sm:mb-6">
        <div className="inline-flex relative mb-3">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-600 opacity-20 blur-sm animate-pulse" />
          <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25">
            <Cpu className="h-6 w-6 sm:h-7 sm:w-7 animate-pulse" />
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
          Synthesizing Action Plan
        </h3>

        {/* Document Name Pill & Timer */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700 border border-slate-200 max-w-[260px] truncate">
            <FileText className="h-3.5 w-3.5 text-sky-600 shrink-0" />
            <span className="truncate">{documentName}</span>
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 font-mono text-xs font-semibold text-sky-700 border border-sky-200">
            <Clock className="h-3 w-3" />
            <span>{seconds}s elapsed</span>
          </span>
        </div>
      </div>

      {/* Progress Bar with Shimmer */}
      <div className="mb-6 rounded-2xl bg-slate-50 p-3 sm:p-4 border border-slate-100">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="text-slate-700 flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-sky-600 animate-spin" />
            <span>Reasoning Pipeline Progress</span>
          </span>
          <span className="font-mono text-sky-700 font-bold text-sm">
            {targetPercent}%
          </span>
        </div>

        <div className="relative h-2.5 sm:h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 transition-all duration-300 ease-out relative"
            style={{ width: `${targetPercent}%` }}
          >
            {/* Shimmer light beam animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="space-y-2.5 sm:space-y-3 mb-5">
        {steps.map((s, idx) => {
          const isDone = idx < step;
          const isCurrent = idx === step;
          const Icon = s.icon;

          return (
            <div
              key={s.title}
              className={`flex items-start sm:items-center gap-3 sm:gap-3.5 rounded-xl border p-3 transition-all ${isCurrent
                  ? 'border-sky-300 bg-sky-50/70 shadow-sm ring-2 ring-sky-100'
                  : isDone
                    ? 'border-slate-200 bg-slate-50/90 text-slate-800'
                    : 'border-slate-100 bg-white text-slate-400 opacity-60'
                }`}
            >
              {/* Icon Container */}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all ${isDone
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-xs'
                    : isCurrent
                      ? 'bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : isCurrent ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span
                    className={`text-xs sm:text-sm font-bold ${isCurrent
                        ? 'text-slate-900'
                        : isDone
                          ? 'text-slate-800'
                          : 'text-slate-400'
                      }`}
                  >
                    {s.title}
                  </span>

                  {isCurrent && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-800 border border-sky-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-600 animate-ping" />
                      In Progress
                    </span>
                  )}
                  {isDone && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3" />
                      Completed
                    </span>
                  )}
                  {!isDone && !isCurrent && (
                    <span className="text-[10px] text-slate-400 font-medium">
                      Queued
                    </span>
                  )}
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Telemetry Insight Bar */}
      <div className="rounded-xl border border-slate-200 bg-slate-900 px-3.5 py-2.5 text-xs text-slate-200 flex items-center gap-2.5 shadow-inner">
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400">
          <Terminal className="h-3.5 w-3.5" />
        </div>
        <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
          <p className="truncate text-[11px] sm:text-xs text-slate-300 font-mono">
            {INSIGHTS[insightIndex]}
          </p>
          <span className="hidden sm:inline-flex items-center gap-1 rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono font-medium text-emerald-400 shrink-0">
            <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        </div>
      </div>
    </div>
  );
}
