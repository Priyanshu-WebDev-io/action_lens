'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, Sparkles, Loader2, Copy, Check, RotateCcw } from 'lucide-react';

export default function DocumentChat({ documentText, plan, suggestedQuestions = [] }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'I am ActionLens Copilot. Ask any question about this document, its rules, deadlines, or specifics.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAsking]);

  const handleSend = async (questionText) => {
    const query = questionText || input;
    if (!query.trim() || isAsking) return;

    setInput('');
    const newMessages = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    setIsAsking(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentText: documentText || '',
          question: query,
          conversationHistory: newMessages.slice(-6),
          plan: plan || null,
        }),
      });

      const data = await res.json();
      if (data.success && data.answer) {
        setMessages([...newMessages, { role: 'assistant', content: data.answer }]);
      } else {
        setMessages([
          ...newMessages,
          { role: 'assistant', content: data.error || 'Could not retrieve an answer.' },
        ]);
      }
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Connection error while contacting Gemma API.' },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        role: 'assistant',
        content:
          'I am ActionLens Copilot. Ask any question about this document, its rules, deadlines, or specifics.',
      },
    ]);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-5 shadow-sm flex flex-col h-[480px] sm:h-[520px]">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 shrink-0">
        <div>
          <h2 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 uppercase flex items-center gap-1.5 sm:gap-2">
            <MessageSquare className="h-4 w-4 text-sky-600 shrink-0" />
            <span>Ask The Document</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Instant grounded answers verified by Google AI</p>
        </div>

        {messages.length > 1 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-[10px] sm:text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition"
            title="Reset conversation"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Suggested Questions */}
      {suggestedQuestions.length > 0 && (
        <div className="mb-2.5 sm:mb-3 shrink-0">
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-500 mb-1.5 font-medium">
            <Sparkles className="h-3 w-3 text-sky-600 shrink-0" />
            <span>Suggested queries:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                disabled={isAsking}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] sm:text-[11px] text-slate-700 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800 transition text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-2.5 sm:space-y-3 pr-1">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 sm:gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.role === 'assistant' && (
              <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 border border-sky-200">
                <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
            )}

            <div className="relative group max-w-[90%] sm:max-w-[85%]">
              <div
                className={`rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs leading-relaxed ${m.role === 'user'
                    ? 'bg-sky-600 text-white shadow-sm whitespace-pre-wrap'
                    : 'bg-slate-50 border border-slate-200 text-slate-800'
                  }`}
              >
                <FormattedContent content={m.content} isUser={m.role === 'user'} />
              </div>

              {m.role === 'assistant' && idx > 0 && (
                <button
                  onClick={() => handleCopy(m.content, idx)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition p-1 rounded bg-white shadow-sm border border-slate-200 text-slate-500 hover:text-slate-800"
                  title="Copy answer"
                >
                  {copiedIdx === idx ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                </button>
              )}
            </div>

            {m.role === 'user' && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {isAsking && (
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 border border-sky-200">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-600 flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-sky-600" />
              <span>AI is reasoning over document facts...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about this document..."
          disabled={isAsking}
          className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3 sm:px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || isAsking}
          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-sky-600 text-white shadow-md shadow-sky-600/20 hover:bg-sky-700 disabled:opacity-50 transition shrink-0"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}

function renderInline(text) {
  if (!text) return '';
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const codeMatch = remaining.match(/`(.+?)`/);

    let firstMatch = null;
    let matchType = null;

    if (boldMatch && codeMatch) {
      if (boldMatch.index < codeMatch.index) {
        firstMatch = boldMatch;
        matchType = 'bold';
      } else {
        firstMatch = codeMatch;
        matchType = 'code';
      }
    } else if (boldMatch) {
      firstMatch = boldMatch;
      matchType = 'bold';
    } else if (codeMatch) {
      firstMatch = codeMatch;
      matchType = 'code';
    }

    if (!firstMatch) {
      parts.push(remaining);
      break;
    }

    if (firstMatch.index > 0) {
      parts.push(remaining.substring(0, firstMatch.index));
    }

    if (matchType === 'bold') {
      parts.push(
        <strong key={key++} className="font-semibold text-slate-900">
          {firstMatch[1]}
        </strong>
      );
    } else if (matchType === 'code') {
      parts.push(
        <code
          key={key++}
          className="rounded bg-slate-200/70 px-1 py-0.5 font-mono text-[11px] text-sky-800"
        >
          {firstMatch[1]}
        </code>
      );
    }

    remaining = remaining.substring(firstMatch.index + firstMatch[0].length);
  }

  return parts;
}

function FormattedContent({ content, isUser }) {
  if (isUser) {
    return <div className="text-xs leading-relaxed whitespace-pre-wrap">{content}</div>;
  }

  const lines = (content || '').split('\n');
  return (
    <div className="text-xs leading-relaxed text-slate-800 space-y-1.5">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIdx} className="h-1" />;
        }

        if (
          trimmed.startsWith('• ') ||
          trimmed.startsWith('- ') ||
          trimmed.startsWith('* ')
        ) {
          const bulletText = trimmed.replace(/^[•\-\*]\s+/, '');
          return (
            <div key={lineIdx} className="flex items-start gap-1.5 ml-1">
              <span className="text-sky-600 font-bold shrink-0 leading-relaxed">•</span>
              <div className="flex-1">{renderInline(bulletText)}</div>
            </div>
          );
        }

        if (trimmed.startsWith('> ')) {
          const quoteText = trimmed.slice(2);
          return (
            <div
              key={lineIdx}
              className="border-l-2 border-sky-400 pl-2.5 py-1 my-1 text-slate-700 italic bg-sky-50/60 rounded-r"
            >
              {renderInline(quoteText)}
            </div>
          );
        }

        return <p key={lineIdx}>{renderInline(trimmed)}</p>;
      })}
    </div>
  );
}

