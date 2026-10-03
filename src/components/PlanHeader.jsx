'use client';

import React, { useState } from 'react';
import { Download, Copy, Check, Printer, FileText, Calendar, AlertOctagon, CheckCircle2 } from 'lucide-react';

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

    md += `## 📋 Action Checklist\n`;
    plan.actions?.forEach((act) => {
      md += `- [ ] **${act.title}** (${act.priority.toUpperCase()})\n`;
      if (act.description) md += `  - ${act.description}\n`;
    });

    md += `\n## 📅 Deadlines & Cutoffs\n`;
    plan.deadlines?.forEach((dl) => {
      md += `- **${dl.title}:** ${dl.date} ${dl.time || ''} ${dl.notes ? `(${dl.notes})` : ''}\n`;
    });

    md += `\n## 📎 Required Documents\n`;
    plan.requirements?.forEach((req) => {
      md += `- **${req.name}** [${req.format || 'Standard'}]: ${req.details || ''}\n`;
    });

    md += `\n## 🔗 Dependencies & Sequential Order\n`;
    plan.dependencies?.forEach((dep) => {
      md += `Step ${dep.stepNumber}: **${dep.title}** ${dep.prerequisiteFor ? `(Required for: ${dep.prerequisiteFor})` : ''}\n`;
    });

    md += `\n## ⚠️ Warnings & Penalties\n`;
    plan.warnings?.forEach((warn) => {
      md += `- ⚠️ **${warn.title}:** ${warn.consequence || ''}\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${plan.documentTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-action-plan.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl mb-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        {/* Title & Summary */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="rounded-md bg-sky-500/10 px-2 py-0.5 text-[11px] font-semibold text-sky-400 border border-sky-500/20">
              {plan.documentType || 'Analyzed Document'}
            </span>
            <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>Gemma Verified</span>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
            {plan.documentTitle}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {plan.summary}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-start">
          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10 hover:text-white transition shadow-sm"
            title="Download formatted Markdown action plan"
          >
            <Download className="h-3.5 w-3.5 text-sky-400" />
            <span>Export MD</span>
          </button>

          <button
            onClick={handleCopyJson}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10 hover:text-white transition shadow-sm"
            title="Copy structured JSON"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-400" />
                <span>JSON</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10 hover:text-white transition shadow-sm hidden sm:flex"
            title="Print action plan"
          >
            <Printer className="h-3.5 w-3.5 text-slate-400" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/5">
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <div className="text-[11px] text-slate-400 font-medium">Action Tasks</div>
          <div className="text-lg font-bold text-white mt-0.5">{plan.actions?.length || 0}</div>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <div className="text-[11px] text-slate-400 font-medium">Key Deadlines</div>
          <div className="text-lg font-bold text-sky-400 mt-0.5">{plan.deadlines?.length || 0}</div>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <div className="text-[11px] text-slate-400 font-medium">Required Proofs</div>
          <div className="text-lg font-bold text-amber-400 mt-0.5">{plan.requirements?.length || 0}</div>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <div className="text-[11px] text-slate-400 font-medium">Risk Callouts</div>
          <div className="text-lg font-bold text-rose-400 mt-0.5">{plan.warnings?.length || 0}</div>
        </div>
      </div>
    </div>
  );
}
