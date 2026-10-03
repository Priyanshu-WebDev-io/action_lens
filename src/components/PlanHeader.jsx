'use client';

import React, { useState } from 'react';
import { Download, Copy, Check, Printer, CheckCircle2 } from 'lucide-react';

export default function PlanHeader({ plan, onReset }) {
  const [copied, setCopied] = useState(false);

  if (!plan) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(plan, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    let md = `# 🚀 Action Plan: ${plan.documentTitle}\n\n`;
    md += `> **Type:** ${plan.documentType || 'Official Notice'}\n`;
    md += `> **Summary:** ${plan.summary}\n\n`;

    if (plan.tags?.length > 0) {
      md += `**Tags:** ${plan.tags.map((t) => `#${t}`).join(' ')}\n\n`;
    }

    if (plan.actions?.length > 0) {
      md += `## 📋 ${plan.sectionHeadings?.actions?.title || 'Action Checklist'}\n`;
      plan.actions.forEach((act) => {
        md += `- [ ] **${act.title}** (${act.priority.toUpperCase()})\n`;
        if (act.description) md += `  - ${act.description}\n`;
      });
      md += `\n`;
    }

    if (plan.deadlines?.length > 0) {
      md += `## 📅 ${plan.sectionHeadings?.deadlines?.title || 'Deadlines & Cutoffs'}\n`;
      plan.deadlines.forEach((dl) => {
        md += `- **${dl.title}:** ${dl.date} ${dl.time || ''} ${dl.notes ? `(${dl.notes})` : ''}\n`;
      });
      md += `\n`;
    }

    if (plan.requirements?.length > 0) {
      md += `## 📎 ${plan.sectionHeadings?.requirements?.title || 'Required Documents'}\n`;
      plan.requirements.forEach((req) => {
        md += `- **${req.name}** [${req.format || 'Standard'}]: ${req.details || ''}\n`;
      });
      md += `\n`;
    }

    if (plan.dependencies?.length > 0) {
      md += `## 🔗 ${plan.sectionHeadings?.dependencies?.title || 'Sequential Order'}\n`;
      plan.dependencies.forEach((dep) => {
        md += `Step ${dep.stepNumber}: **${dep.title}** ${dep.prerequisiteFor ? `(Required for: ${dep.prerequisiteFor})` : ''}\n`;
      });
      md += `\n`;
    }

    if (plan.warnings?.length > 0) {
      md += `## ⚠️ ${plan.sectionHeadings?.warnings?.title || 'Warnings & Advisories'}\n`;
      plan.warnings.forEach((warn) => {
        md += `- ⚠️ **${warn.title}:** ${warn.consequence || ''}\n`;
      });
      md += `\n`;
    }

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${plan.documentTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-action-plan.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        {/* Title & Summary */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-700 border border-sky-200">
              {plan.documentType || 'Analyzed Document'}
            </span>
            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>Gemma Verified</span>
            </span>
            {plan.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 border border-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-2">
            {plan.documentTitle}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            {plan.summary}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-start">
          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition shadow-sm"
            title="Download formatted Markdown action plan"
          >
            <Download className="h-3.5 w-3.5 text-sky-600" />
            <span>Export MD</span>
          </button>

          <button
            onClick={handleCopyJson}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition shadow-sm"
            title="Copy structured JSON"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-500" />
                <span>JSON</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition shadow-sm hidden sm:flex"
            title="Print action plan"
          >
            <Printer className="h-3.5 w-3.5 text-slate-500" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Dynamic Metrics Row: only show sections that have results */}
      {(() => {
        const metrics = [
          plan.actions?.length > 0 && {
            label: plan.sectionHeadings?.actions?.title || 'Action Tasks',
            value: plan.actions.length,
            color: 'text-slate-900',
          },
          plan.deadlines?.length > 0 && {
            label: plan.sectionHeadings?.deadlines?.title || 'Key Deadlines',
            value: plan.deadlines.length,
            color: 'text-sky-700',
          },
          plan.requirements?.length > 0 && {
            label: plan.sectionHeadings?.requirements?.title || 'Required Proofs',
            value: plan.requirements.length,
            color: 'text-amber-700',
          },
          plan.warnings?.length > 0 && {
            label: plan.sectionHeadings?.warnings?.title || 'Risk Callouts',
            value: plan.warnings.length,
            color: 'text-rose-700',
          },
        ].filter(Boolean);

        if (metrics.length === 0) return null;

        return (
          <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-slate-200">
            {metrics.map((m) => (
              <div key={m.label} className="min-w-[130px] flex-1 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-[11px] text-slate-500 font-medium truncate">{m.label}</div>
                <div className={`text-lg font-bold mt-0.5 ${m.color}`}>{m.value}</div>
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  );
}
