import React from 'react';
import { Sparkles, FileText, RotateCcw } from 'lucide-react';

function GitHubIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function Navbar({ onReset, hasDocument, documentTitle }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#090d16]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">ActionLens</span>
              <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[11px] font-medium text-sky-400 border border-sky-500/20">
                Gemma 4
              </span>
            </div>
            <p className="text-[12px] text-slate-400 hidden sm:block">Turn documents into actionable execution plans</p>
          </div>
        </div>

        {/* Current Document Pill (if loaded) */}
        {hasDocument && (
          <div className="hidden md:flex items-center gap-2 rounded-full bg-slate-900/90 border border-white/10 px-3.5 py-1 text-xs text-slate-300">
            <FileText className="h-3.5 w-3.5 text-sky-400" />
            <span className="max-w-[220px] truncate font-medium text-slate-200">{documentTitle}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          {hasDocument && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>New Document</span>
            </button>
          )}

          <a
            href="https://github.com/Priyanshu-WebDev-io/hacktoberfest"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
