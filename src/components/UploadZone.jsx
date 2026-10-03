'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, ArrowRight, Clipboard } from 'lucide-react';

export default function UploadZone({ onProcessFile, onProcessText, isLoading }) {
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
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
          Documents tell you everything. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ActionLens tells you what to do.
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Upload any circular, notice, or official policy. ActionLens extracts checklists, deadlines, dependencies, and rules in seconds.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
            activeTab === 'upload'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
          }`}
        >
          <UploadCloud className="h-4 w-4" />
          <span>Upload PDF Notice</span>
        </button>

        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
            activeTab === 'text'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
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
          className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all shadow-sm ${
            isDragging
              ? 'border-sky-500 bg-sky-50/60 shadow-lg shadow-sky-500/10'
              : 'border-slate-300 bg-white hover:border-sky-500 hover:bg-slate-50/60'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
          />

          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 border border-slate-200 text-sky-600 transition-transform group-hover:scale-110 shadow-sm">
            <UploadCloud className="h-8 w-8" />
          </div>

          <h3 className="text-base font-semibold text-slate-900 mb-1">
            {selectedFile ? selectedFile.name : 'Drop your PDF circular here, or browse'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mb-4">
            Supports university notices, office circulars, policy memos, and guidelines (up to 15MB).
          </p>

          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 group-hover:bg-sky-600 group-hover:text-white transition">
            <FileText className="h-3.5 w-3.5" />
            <span>Select PDF from device</span>
          </span>
        </div>
      ) : (
        /* Tab 2: Text Paste Card */
        <form onSubmit={handleTextSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Paste Notice / Circular Text:
          </label>
          <textarea
            rows={7}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste raw notice text (e.g. Notice on Holiday Observance / Exam form submission...)"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={!pastedText.trim() || isLoading}
              className="flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-sky-600/20 hover:bg-sky-700 disabled:opacity-50 transition"
            >
              <span>Generate Action Plan</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
