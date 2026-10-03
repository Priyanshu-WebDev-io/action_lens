'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import UploadZone from '@/components/UploadZone';
import ProcessingState from '@/components/ProcessingState';
import PlanHeader from '@/components/PlanHeader';
import ActionChecklist from '@/components/ActionChecklist';
import DeadlinesView from '@/components/DeadlinesView';
import RequirementsView from '@/components/RequirementsView';
import DependencyFlow from '@/components/DependencyFlow';
import WarningsView from '@/components/WarningsView';
import DocumentChat from '@/components/DocumentChat';

export default function Home() {
  const [plan, setPlan] = useState(null);
  const [rawText, setRawText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle PDF file upload
  const handleProcessFile = async (file) => {
    setIsLoading(true);
    setErrorMessage('');
    setProcessingStep(1);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate realistic step updates for high UX polish
      const timer1 = setTimeout(() => setProcessingStep(2), 700);
      const timer2 = setTimeout(() => setProcessingStep(3), 1600);

      const res = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to process document');
      }

      setPlan(data.plan);
      setRawText(data.rawText || '');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Error communicating with document engine.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle raw pasted text
  const handleProcessText = async (text) => {
    setIsLoading(true);
    setErrorMessage('');
    setProcessingStep(2);

    try {
      const timer = setTimeout(() => setProcessingStep(3), 1000);

      const res = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      clearTimeout(timer);

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to process text');
      }

      setPlan(data.plan);
      setRawText(data.rawText || text);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Error processing document text.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle preloaded demo sample click
  const handleSelectDemo = async (demoId) => {
    setIsLoading(true);
    setErrorMessage('');
    setProcessingStep(1);

    try {
      const timer1 = setTimeout(() => setProcessingStep(2), 400);
      const timer2 = setTimeout(() => setProcessingStep(3), 900);

      const res = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ demoId }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to load demo document');
      }

      setPlan(data.plan);
      setRawText(data.rawText || '');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to load sample circular.');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle action item checklist
  const handleToggleAction = (actionId) => {
    if (!plan) return;
    setPlan((prev) => ({
      ...prev,
      actions: prev.actions.map((act) =>
        act.id === actionId ? { ...act, isCompleted: !act.isCompleted } : act
      ),
    }));
  };

  // Reset to upload view
  const handleReset = () => {
    setPlan(null);
    setRawText('');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      <Navbar
        onReset={handleReset}
        hasDocument={!!plan}
        documentTitle={plan?.documentTitle || ''}
      />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {errorMessage && (
          <div className="mb-6 rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-xs text-rose-300 flex items-center justify-between">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage('')}
              className="text-rose-400 hover:text-rose-200 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="py-16">
            <ProcessingState step={processingStep} />
          </div>
        ) : !plan ? (
          <div className="py-6 sm:py-12">
            <UploadZone
              onProcessFile={handleProcessFile}
              onProcessText={handleProcessText}
              onSelectDemo={handleSelectDemo}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <PlanHeader plan={plan} onReset={handleReset} />

            {/* Dynamic Result Layout: Only show sections that have data */}
            {(() => {
              const hasActions = Boolean(plan.actions && plan.actions.length > 0);
              const hasDependencies = Boolean(plan.dependencies && plan.dependencies.length > 0);
              const hasDeadlines = Boolean(plan.deadlines && plan.deadlines.length > 0);
              const hasRequirements = Boolean(plan.requirements && plan.requirements.length > 0);
              const hasWarnings = Boolean(plan.warnings && plan.warnings.length > 0);

              const hasLeft = hasActions || hasDependencies;
              const hasRight = hasDeadlines || hasRequirements || hasWarnings;

              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Primary Column */}
                  <div className={hasRight ? 'lg:col-span-7 space-y-6' : 'lg:col-span-8 space-y-6'}>
                    {hasActions && (
                      <ActionChecklist
                        actions={plan.actions}
                        onToggle={handleToggleAction}
                      />
                    )}

                    {hasDependencies && (
                      <DependencyFlow dependencies={plan.dependencies} />
                    )}

                    {!hasLeft && (
                      <>
                        {hasDeadlines && <DeadlinesView deadlines={plan.deadlines} />}
                        {hasRequirements && <RequirementsView requirements={plan.requirements} />}
                        {hasWarnings && <WarningsView warnings={plan.warnings} />}
                      </>
                    )}
                  </div>

                  {/* Secondary Column */}
                  <div className={hasRight ? 'lg:col-span-5 space-y-6' : 'lg:col-span-4 space-y-6'}>
                    {hasLeft && (
                      <>
                        {hasDeadlines && <DeadlinesView deadlines={plan.deadlines} />}
                        {hasRequirements && <RequirementsView requirements={plan.requirements} />}
                        {hasWarnings && <WarningsView warnings={plan.warnings} />}
                      </>
                    )}

                    {rawText && (
                      <DocumentChat
                        documentText={rawText}
                        suggestedQuestions={plan.suggestedQuestions}
                      />
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 text-center text-xs text-slate-500">
        <p>
          ActionLens • Powered by Google Gemma 4 & MinerU • Designed for clarity and decisive action.
        </p>
      </footer>
    </div>
  );
}
