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
import CustomSectionsView from '@/components/CustomSectionsView';
import DocumentChat from '@/components/DocumentChat';

import { SAMPLE_DOCUMENTS } from '@/lib/sampleData';

export default function Home() {
  const [plan, setPlan] = useState(null);
  const [rawText, setRawText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [processingDocName, setProcessingDocName] = useState('Uploaded Notice');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle PDF file upload
  const handleProcessFile = async (file) => {
    setIsLoading(true);
    setErrorMessage('');
    setProcessingDocName(file.name || 'Uploaded PDF Notice');
    setProcessingStep(0);

    const timer1 = setTimeout(() => setProcessingStep(1), 600);
    const timer2 = setTimeout(() => setProcessingStep(2), 1500);
    const timer3 = setTimeout(() => setProcessingStep(3), 3400);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      });

      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

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
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setIsLoading(false);
    }
  };

  // Handle raw pasted text
  const handleProcessText = async (text) => {
    setIsLoading(true);
    setErrorMessage('');
    setProcessingDocName('Pasted Circular Notice');
    setProcessingStep(1);

    const timer1 = setTimeout(() => setProcessingStep(2), 800);
    const timer2 = setTimeout(() => setProcessingStep(3), 2200);

    try {
      const res = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

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
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsLoading(false);
    }
  };

  // Handle preloaded demo sample click
  const handleSelectDemo = async (demoId) => {
    setIsLoading(true);
    setErrorMessage('');
    const sample = SAMPLE_DOCUMENTS.find((d) => d.id === demoId);
    setProcessingDocName(sample ? sample.name : 'Sample Notice');
    setProcessingStep(0);

    const timer1 = setTimeout(() => setProcessingStep(1), 350);
    const timer2 = setTimeout(() => setProcessingStep(2), 800);
    const timer3 = setTimeout(() => setProcessingStep(3), 1400);

    try {
      const res = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ demoId }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

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
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      <Navbar
        onReset={handleReset}
        hasDocument={!!plan}
        documentTitle={plan?.documentTitle || ''}
      />

      <main className="flex-1 mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
        {errorMessage && (
          <div className="mb-4 sm:mb-6 rounded-xl border border-rose-200 bg-rose-50 p-3.5 sm:p-4 text-xs text-rose-700 flex items-center justify-between">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage('')}
              className="text-rose-500 hover:text-rose-800 font-bold ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="py-8 sm:py-14">
            <ProcessingState step={processingStep} documentName={processingDocName} />
          </div>
        ) : !plan ? (
          <div className="py-4 sm:py-12">
            <UploadZone
              onProcessFile={handleProcessFile}
              onProcessText={handleProcessText}
              onSelectDemo={handleSelectDemo}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            <PlanHeader plan={plan} onReset={handleReset} />

            {/* Dynamic Results Grid */}
            {(() => {
              const hasActions = Boolean(plan.actions && plan.actions.length > 0);
              const hasDependencies = Boolean(plan.dependencies && plan.dependencies.length > 0);
              const hasDeadlines = Boolean(plan.deadlines && plan.deadlines.length > 0);
              const hasRequirements = Boolean(plan.requirements && plan.requirements.length > 0);
              const hasWarnings = Boolean(plan.warnings && plan.warnings.length > 0);
              const hasCustom = Boolean(plan.customSections && plan.customSections.length > 0);

              const hasLeft = hasActions || hasDependencies;
              const hasRight = hasDeadlines || hasRequirements || hasWarnings || hasCustom;

              const headings = plan.sectionHeadings || {};

              return (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                    {/* Primary Column */}
                    <div className={hasRight ? 'lg:col-span-7 space-y-4 sm:space-y-6' : 'lg:col-span-12 space-y-4 sm:space-y-6'}>
                      {hasActions && (
                        <ActionChecklist
                          actions={plan.actions}
                          onToggle={handleToggleAction}
                          title={headings.actions?.title}
                          subtitle={headings.actions?.subtitle}
                        />
                      )}

                      {hasDependencies && (
                        <DependencyFlow
                          dependencies={plan.dependencies}
                          title={headings.dependencies?.title}
                          subtitle={headings.dependencies?.subtitle}
                        />
                      )}

                      {!hasLeft && (
                        <>
                          {hasDeadlines && (
                            <DeadlinesView
                              deadlines={plan.deadlines}
                              title={headings.deadlines?.title}
                              subtitle={headings.deadlines?.subtitle}
                            />
                          )}
                          {hasRequirements && (
                            <RequirementsView
                              requirements={plan.requirements}
                              title={headings.requirements?.title}
                              subtitle={headings.requirements?.subtitle}
                            />
                          )}
                          {hasWarnings && (
                            <WarningsView
                              warnings={plan.warnings}
                              title={headings.warnings?.title}
                              subtitle={headings.warnings?.subtitle}
                            />
                          )}
                          {hasCustom && <CustomSectionsView customSections={plan.customSections} />}
                        </>
                      )}
                    </div>

                    {/* Secondary Column */}
                    {hasRight && hasLeft && (
                      <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                        {hasDeadlines && (
                          <DeadlinesView
                            deadlines={plan.deadlines}
                            title={headings.deadlines?.title}
                            subtitle={headings.deadlines?.subtitle}
                          />
                        )}
                        {hasRequirements && (
                          <RequirementsView
                            requirements={plan.requirements}
                            title={headings.requirements?.title}
                            subtitle={headings.requirements?.subtitle}
                          />
                        )}
                        {hasWarnings && (
                          <WarningsView
                            warnings={plan.warnings}
                            title={headings.warnings?.title}
                            subtitle={headings.warnings?.subtitle}
                          />
                        )}
                        {hasCustom && <CustomSectionsView customSections={plan.customSections} />}
                      </div>
                    )}
                  </div>

                  {/* Below Cards: Dedicated Document Chat for Custom Inquiries */}
                  {(rawText || plan) && (
                    <div className="mt-6 pt-4 sm:mt-8 border-t border-slate-200">
                      <DocumentChat
                        documentText={rawText}
                        plan={plan}
                        suggestedQuestions={plan.suggestedQuestions || []}
                      />
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>
          ActionLens • Powered by Google Gemma 4 & MinerU • Designed for clarity and decisive action.
        </p>
      </footer>
    </div>
  );
}
