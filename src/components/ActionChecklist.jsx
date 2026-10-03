'use client';

import React, { useState } from 'react';
import { Check, Clock, Tag } from 'lucide-react';

export default function ActionChecklist({
  actions = [],
  onToggle,
  title = 'What You Need To Do',
  subtitle = 'Click any task to track your progress',
}) {
  if (!actions || actions.length === 0) {
    return null;
  }

  const [filter, setFilter] = useState('all'); // 'all' | 'high' | 'pending' | 'completed'

  const completedCount = actions.filter((a) => a.isCompleted).length;
  const totalCount = actions.length;
  const progressPercent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredActions = actions.filter((item) => {
    if (filter === 'completed') return item.isCompleted;
    if (filter === 'pending') return !item.isCompleted;
    if (filter === 'high') return item.priority === 'high';
    return true;
  });

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'high':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
      {/* Top Header & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-100 pb-3 sm:pb-4 mb-3 sm:mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 uppercase">{title}</h2>
            <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-sky-700 border border-sky-200">
              {completedCount}/{totalCount} Completed
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 self-start sm:self-auto max-w-full">
          {['all', 'pending', 'high', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-medium capitalize shrink-0 transition ${
                filter === f
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4 sm:mb-5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-sky-500 to-blue-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Action Items List */}
      <div className="space-y-2 sm:space-y-2.5">
        {filteredActions.length === 0 ? (
          <p className="text-center py-6 text-xs text-slate-400">No action items in this filter.</p>
        ) : (
          filteredActions.map((action) => (
            <div
              key={action.id}
              onClick={() => onToggle(action.id)}
              className={`group flex items-start gap-2.5 sm:gap-3.5 rounded-xl border p-3 sm:p-3.5 cursor-pointer transition-all ${
                action.isCompleted
                  ? 'border-slate-100 bg-slate-50/60 opacity-60'
                  : 'border-slate-200 bg-white hover:border-sky-400 hover:bg-slate-50/50 shadow-sm'
              }`}
            >
              {/* Checkbox */}
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                  action.isCompleted
                    ? 'border-sky-600 bg-sky-600 text-white'
                    : 'border-slate-300 bg-white group-hover:border-sky-500'
                }`}
              >
                {action.isCompleted && <Check className="h-3.5 w-3.5 stroke-[3]" />}
              </div>

              {/* Task Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <h4
                    className={`text-xs font-semibold ${
                      action.isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}
                  >
                    {action.title}
                  </h4>

                  <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium border uppercase ${getPriorityBadge(
                      action.priority
                    )}`}
                  >
                    {action.priority}
                  </span>
                </div>

                {action.description && (
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    {action.description}
                  </p>
                )}

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {action.category && (
                    <span className="flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 border border-slate-200">
                      <Tag className="h-2.5 w-2.5 text-slate-500" />
                      <span>{action.category}</span>
                    </span>
                  )}
                  {action.estimatedTime && (
                    <span className="flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 border border-slate-200">
                      <Clock className="h-2.5 w-2.5 text-slate-500" />
                      <span>{action.estimatedTime}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
