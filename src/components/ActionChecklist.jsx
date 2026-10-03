'use client';

import React, { useState } from 'react';
import { Check, Clock, Tag, AlertCircle, Filter } from 'lucide-react';

export default function ActionChecklist({ actions = [], onToggle }) {
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
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-sm">
      {/* Top Header & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold tracking-tight text-white uppercase">What You Need To Do</h2>
            <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[11px] font-semibold text-sky-400 border border-sky-500/20">
              {completedCount}/{totalCount} Completed
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Click any task to track your progress</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {['all', 'pending', 'high', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-medium capitalize transition ${
                filter === f
                  ? 'bg-sky-500 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 rounded-full h-1.5 mb-5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-sky-500 to-blue-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Action Items List */}
      <div className="space-y-2.5">
        {filteredActions.length === 0 ? (
          <p className="text-center py-6 text-xs text-slate-500">No action items in this filter.</p>
        ) : (
          filteredActions.map((action) => (
            <div
              key={action.id}
              onClick={() => onToggle(action.id)}
              className={`group flex items-start gap-3.5 rounded-xl border p-3.5 cursor-pointer transition-all ${
                action.isCompleted
                  ? 'border-white/5 bg-white/[0.01] opacity-60'
                  : 'border-white/10 bg-slate-900/60 hover:border-sky-500/40 hover:bg-slate-900/90'
              }`}
            >
              {/* Checkbox */}
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                  action.isCompleted
                    ? 'border-sky-500 bg-sky-500 text-white'
                    : 'border-slate-600 bg-slate-950 group-hover:border-sky-400'
                }`}
              >
                {action.isCompleted && <Check className="h-3.5 w-3.5 stroke-[3]" />}
              </div>

              {/* Task Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <h4
                    className={`text-xs font-semibold ${
                      action.isCompleted ? 'line-through text-slate-400' : 'text-slate-100'
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
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {action.description}
                  </p>
                )}

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {action.category && (
                    <span className="flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-400 border border-white/5">
                      <Tag className="h-2.5 w-2.5 text-slate-400" />
                      <span>{action.category}</span>
                    </span>
                  )}
                  {action.estimatedTime && (
                    <span className="flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-400 border border-white/5">
                      <Clock className="h-2.5 w-2.5 text-slate-400" />
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
