'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Sparkles, ArrowRight, Clipboard, FileCheck } from 'lucide-react';
import { SAMPLE_DOCUMENTS } from '@/lib/sampleData';

export default function UploadZone({ onProcessFile, onProcessText, onSelectDemo, isLoading }) {
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'text'
  const [pastedText, setPastedText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelected(files[0]);
    }
  };

  const handleFileSelected = (file) => {
    setSelectedFile(file);
    onProcessFile(file);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!pastedText.trim()) return;
    onProcessText(pastedText);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Hero Headline */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400 mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Multimodal Document Reasoning</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
          Documents tell you everything. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            ActionLens tells you what to do.
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Upload any circular, exam notice, or official policy. ActionLens extracts checklists, deadlines, dependencies, and warning cutoffs in seconds.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
            activeTab === 'upload'
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
              : 'bg-slate-900/60 text-slate-400 border border-white/10 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <UploadCloud className="h-4 w-4" />
          <span>Upload PDF Notice</span>
        </button>

        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
            activeTab === 'text'
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
              : 'bg-slate-900/60 text-slate-400 border border-white/10 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Clipboard className="h-4 w-4" />
          <span>Paste Notice Text</span>
        </button>
      </div>

      {/* Tab 1: Upload Card */}
      {activeTab === 'upload' ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
            isDragging
              ? 'border-sky-400 bg-sky-950/20 shadow-2xl shadow-sky-500/20'
              : 'border-white/15 bg-slate-900/40 hover:border-sky-500/50 hover:bg-slate-900/70'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
          />

          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/80 border border-white/10 text-sky-400 transition-transform group-hover:scale-110 shadow-lg">
            <UploadCloud className="h-8 w-8" />
          </div>

          <h3 className="text-base font-semibold text-white mb-1">
            {selectedFile ? selectedFile.name : 'Drop your PDF circular here, or browse'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mb-4">
            Supports university circulars, exam memos, government notifications, and compliance instructions (up to 15MB).
          </p>

          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 group-hover:bg-sky-500 group-hover:text-white transition">
            <FileText className="h-3.5 w-3.5" />
            <span>Select PDF from device</span>
          </span>
        </div>
      ) : (
        /* Tab 2: Text Paste Card */
        <form onSubmit={handleTextSubmit} className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Paste Notice / Circular Text:
          </label>
          <textarea
            rows={7}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste raw notice text (e.g. Students must complete exam form before Oct 25. Library clearance required first...)"
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 p-4 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={!pastedText.trim() || isLoading}
              className="flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-sky-500/20 hover:bg-sky-400 disabled:opacity-50 transition"
            >
              <span>Generate Action Plan</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      )}

      {/* Instant Demo Presets */}
      <div className="mt-6 border-t border-white/10 pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
            <FileCheck className="h-4 w-4 text-sky-400" />
            <span>Try with preloaded circulars:</span>
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {SAMPLE_DOCUMENTS.map((demo) => (
              <button
                key={demo.id}
                onClick={() => onSelectDemo(demo.id)}
                disabled={isLoading}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/70 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:border-sky-500/40 hover:bg-slate-800/80 hover:text-white transition"
              >
                <span>{demo.title.split('(')[0].trim()}</span>
                <span className="text-[10px] rounded bg-white/5 px-1.5 py-0.5 text-slate-400 border border-white/5">
                  {demo.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
