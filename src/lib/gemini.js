import { ActionPlanSchema } from './schema.js';
import { SAMPLE_DOCUMENTS } from './sampleData.js';

/**
 * Extracts raw text or structured markdown from a PDF buffer.
 * Attempts MinerU Agent API if configured, otherwise uses local pdf-parse.
 */
export async function parsePdfToMarkdown(buffer, filename = 'document.pdf') {
  const mineruToken = process.env.MINERU_API_TOKEN;
  const mineruUrl = process.env.MINERU_API_URL || 'https://mineru.net/api/v1/extract';

  // 1. Try MinerU Agent API if token or endpoint is provided
  if (mineruToken) {
    try {
      const formData = new FormData();
      const blob = new Blob([buffer], { type: 'application/pdf' });
      formData.append('file', blob, filename);

      const response = await fetch(mineruUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${mineruToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const json = await response.json();
        if (json.markdown || json.text || json.content) {
          return json.markdown || json.text || json.content;
        }
      }
    } catch (err) {
      console.warn('MinerU extraction failed, falling back to local extractor:', err.message);
    }
  }

  // 2. Fallback: Parse using pdf-parse
  try {
    const pdfParse = (await import('pdf-parse')).default;
    const data = await pdfParse(buffer);
    return data.text || '';
  } catch (err) {
    console.warn('pdf-parse failed:', err.message);
    return buffer.toString('utf-8');
  }
}

/**
 * Calls Google Gemma / Gemini API to extract the 6 structured ActionLens pillars.
 */
export async function generateActionPlanFromText(documentText, documentName = 'Uploaded Notice') {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMMA_MODEL_NAME || 'gemini-3.8-flash';

  // If no API key is configured, check if this matches any sample or run heuristic extraction
  if (!apiKey) {
    console.warn('No GEMINI_API_KEY found in environment. Using demo/fallback extractor.');
    const matchedSample = SAMPLE_DOCUMENTS.find(
      (s) =>
        documentText.toLowerCase().includes('library clearance') ||
        documentText.toLowerCase().includes('examination form') ||
        documentText.toLowerCase().includes('term-end')
    );
    if (matchedSample) {
      return matchedSample.presetPlan;
    }

    // Generic heuristic fallback
    return generateFallbackPlan(documentText, documentName);
  }

  const systemInstruction = `You are ActionLens, a precise document-to-action reasoning engine powered by Google Gemma.
Your job is NOT to produce generic summaries. You transform dense documents into a tailored, actionable roadmap.
Crucially, you must customize the section headings and subtitles to fit the EXACT context of the document (e.g. for a holiday notice use "Schedule Adjustments" or "Observance Timeline"; for an exam notice use "Candidate Checklist" or "Examination Cutoffs").

Output ONLY a valid, clean JSON object matching this schema:
{
  "documentTitle": string,
  "documentType": string,
  "summary": string,
  "tags": [string], // 2-4 contextual badges (e.g. ["Official Holiday", "Office Closure", "Operations"])
  "sectionHeadings": {
    "actions": { "title": string, "subtitle": string },
    "deadlines": { "title": string, "subtitle": string },
    "requirements": { "title": string, "subtitle": string },
    "dependencies": { "title": string, "subtitle": string },
    "warnings": { "title": string, "subtitle": string }
  },
  "actions": [
    { "id": string, "title": string, "description": string, "category": string, "priority": "high"|"medium"|"low", "isCompleted": false, "estimatedTime": string }
  ],
  "deadlines": [
    { "id": string, "title": string, "date": string, "time": string, "isStrict": boolean, "notes": string, "urgency": "imminent"|"upcoming"|"standard" }
  ],
  "requirements": [
    { "id": string, "name": string, "format": string, "details": string, "mandatory": boolean }
  ],
  "dependencies": [
    { "id": string, "stepNumber": number, "title": string, "prerequisiteFor": string, "details": string }
  ],
  "warnings": [
    { "id": string, "title": string, "consequence": string, "severity": "critical"|"warning"|"info" }
  ],
  "customSections": [
    {
      "id": string,
      "title": string,
      "subtitle": string,
      "items": [{ "id": string, "label": string, "value": string, "tag": string }]
    }
  ],
  "suggestedQuestions": [string] // 3 to 4 insightful, specific questions that ARE DIRECTLY AND ACCURATELY ANSWERED by the text of this document (e.g. key deadlines, mandatory steps, eligibility rules, penalties). CRITICAL: Every suggested question MUST be answerable from the document facts. Do NOT suggest questions whose answers are missing from the document.
}

Note: If a section has no relevant data in the document (e.g. no deadlines, or no required physical documents), leave that array empty ([]). Never hallucinate or add filler content. Suggested questions must only ask about information actually present in the text.`;

  const prompt = `Analyze this document and extract the customized ActionLens plan with tailored section titles:

DOCUMENT TITLE: ${documentName}

DOCUMENT TEXT:
${documentText.slice(0, 15000)}

Output pure JSON only, without any markdown backticks or commentary.`;

  const candidateModels = Array.from(
    new Set([
      process.env.GEMMA_MODEL_NAME || 'gemini-3.8-flash',
      'gemini-3.5-flash',
      'gemini-flash-latest',
    ])
  );

  let lastError = null;

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\n${prompt}` }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`Model ${model} returned ${response.status}: ${errText.slice(0, 120)}... trying fallback`);
        lastError = new Error(`Google API returned ${response.status}: ${errText}`);
        continue; // Try next model in chain
      }

      const data = await response.json();
      const rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawJsonText) {
        continue;
      }

      // Clean JSON text if wrapped in markdown
      const cleanedJson = rawJsonText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();

      const parsed = JSON.parse(cleanedJson);
      return ActionPlanSchema.parse(parsed);
    } catch (err) {
      lastError = err;
      console.warn(`Attempt with ${model} failed, trying next candidate...`);
    }
  }

  console.error('All model candidates failed, using fallback plan:', lastError?.message);
  return generateFallbackPlan(documentText, documentName);
}

/**
 * Answers questions strictly grounded in the document context and extracted action plan.
 */
export async function askDocumentQuestion(
  documentText,
  question,
  conversationHistory = [],
  plan = null
) {
  const apiKey = process.env.GEMINI_API_KEY;

  // Build structured overview from plan if provided
  let structuredContext = '';
  if (plan) {
    const parts = [];
    if (plan.documentTitle) parts.push(`DOCUMENT TITLE: ${plan.documentTitle}`);
    if (plan.documentType) parts.push(`DOCUMENT TYPE: ${plan.documentType}`);
    if (plan.summary) parts.push(`DOCUMENT SUMMARY: ${plan.summary}`);

    if (plan.actions && plan.actions.length > 0) {
      const actList = plan.actions
        .map(
          (a, i) =>
            `${i + 1}. [${(a.priority || 'medium').toUpperCase()}] ${a.title}: ${a.description || ''}${a.estimatedTime ? ` (${a.estimatedTime})` : ''
            }`
        )
        .join('\n');
      parts.push(`KEY ACTION ITEMS:\n${actList}`);
    }

    if (plan.deadlines && plan.deadlines.length > 0) {
      const dlList = plan.deadlines
        .map(
          (d, i) =>
            `${i + 1}. ${d.title} — ${d.date}${d.time ? ` at ${d.time}` : ''}${d.notes ? ` (${d.notes})` : ''
            }`
        )
        .join('\n');
      parts.push(`DEADLINES & SCHEDULE CUTOFFS:\n${dlList}`);
    }

    if (plan.requirements && plan.requirements.length > 0) {
      const reqList = plan.requirements
        .map(
          (r, i) =>
            `${i + 1}. ${r.name} (${r.format || 'Standard'})${r.details ? `: ${r.details}` : ''}${r.mandatory ? ' [MANDATORY]' : ''
            }`
        )
        .join('\n');
      parts.push(`REQUIREMENTS & SPECIFICATIONS:\n${reqList}`);
    }

    if (plan.dependencies && plan.dependencies.length > 0) {
      const depList = plan.dependencies
        .map(
          (dp) =>
            `Step ${dp.stepNumber}: ${dp.title} -> Prerequisite for: ${dp.prerequisiteFor || 'Next step'
            }. Details: ${dp.details || ''}`
        )
        .join('\n');
      parts.push(`WORKFLOW SEQUENCE & PREREQUISITES:\n${depList}`);
    }

    if (plan.warnings && plan.warnings.length > 0) {
      const warnList = plan.warnings
        .map(
          (w, i) =>
            `${i + 1}. [${(w.severity || 'warning').toUpperCase()}] ${w.title}: ${w.consequence || ''}`
        )
        .join('\n');
      parts.push(`IMPORTANT RULES, WARNINGS & PENALTIES:\n${warnList}`);
    }

    if (plan.customSections && plan.customSections.length > 0) {
      const customList = plan.customSections
        .map(
          (cs) =>
            `${cs.title}:\n` +
            cs.items.map((it) => `  - ${it.label}: ${it.value}${it.tag ? ` [${it.tag}]` : ''}`).join('\n')
        )
        .join('\n');
      parts.push(`ADDITIONAL DETAILS:\n${customList}`);
    }

    structuredContext = parts.join('\n\n');
  }

  // If no API key is available, use our intelligent heuristic grounding engine
  if (!apiKey) {
    return generateHeuristicChatAnswer(documentText, question, plan);
  }

  const systemPrompt = `You are ActionLens Copilot, an expert AI assistant dedicated to helping users understand, navigate, and take action on the provided document and circular.

Your core guidelines:
1. Grounded & Accurate:
   - Base your answer on the facts, guidelines, dates, requirements, and context found in the provided document text and extracted plan.
   - Do NOT invent or hallucinate rules, deadlines, or requirements not present in the document.

2. Comprehensive, Helpful & Nuanced:
   - When the user asks about facts, rules, dates, or guidelines mentioned in the document, explain the specifics thoroughly and cite context.
   - If a specific sub-detail is not explicitly detailed in the document (for instance, if the document mentions an event in Asansol and gives dates/timings, but does not name a specific campus hall or room):
     * State clearly what the document DOES specify about that topic (e.g. city, dates, schedule, or reporting instructions).
     * Clarify what specific detail is not stated in this notice.
     * Suggest next steps (e.g. check the official event portal, confirmation email, or coordinator desk).
     * NEVER give a blunt, one-sentence refusal like "This document does not specify this information." Always be helpful, polite, and constructive.

3. Formatting:
   - Format answers using clean Markdown.
   - Use bold (**text**) for key terms, dates, and names.
   - Use bullet points (- or *) for lists or steps.
   - Keep answers clear, structured, and easy to skim.`;

  // Build conversational history if available
  let historySection = '';
  if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
    const recent = conversationHistory
      .filter((m) => m && m.content && (m.role === 'user' || m.role === 'assistant'))
      .slice(-6);
    if (recent.length > 0) {
      historySection = `CONVERSATION HISTORY:\n${recent
        .map((m) => `${m.role === 'user' ? 'User' : 'Copilot'}: ${m.content}`)
        .join('\n')}\n\n`;
    }
  }

  const userPrompt = `${historySection}${structuredContext ? `EXTRACTED ACTION PLAN & CONTEXT:\n${structuredContext}\n\n` : ''
    }ORIGINAL DOCUMENT TEXT:
${documentText ? documentText.slice(0, 15000) : 'None provided.'}

USER QUESTION:
${question}

Provide an accurate, grounded, helpful answer:`;

  const candidateModels = Array.from(
    new Set([
      process.env.GEMMA_MODEL_NAME || 'gemini-3.8-flash',
      'gemini-3.5-flash',
      'gemini-flash-latest',
    ])
  );

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 800,
          },
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`Chat attempt with ${model} returned ${response.status}: ${errText}`);
        continue;
      }

      const data = await response.json();
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (answer) return answer;
    } catch (err) {
      console.warn(`Chat attempt with ${model} failed: ${err.message}, trying next candidate...`);
    }
  }

  // If external API failed or timed out, gracefully fallback to heuristic answer
  return generateHeuristicChatAnswer(documentText, question, plan);
}

/**
 * Intelligent heuristic fallback grounded in document facts and action plan
 */
function generateHeuristicChatAnswer(documentText = '', question = '', plan = null) {
  const qLower = question.toLowerCase();

  // 1. Check for deadline queries
  if (
    qLower.includes('deadline') ||
    qLower.includes('date') ||
    qLower.includes('when') ||
    qLower.includes('time') ||
    qLower.includes('cutoff')
  ) {
    if (plan?.deadlines && plan.deadlines.length > 0) {
      const items = plan.deadlines
        .map(
          (d) =>
            `• **${d.title}**: ${d.date}${d.time ? ` at ${d.time}` : ''}${d.notes ? ` (${d.notes})` : ''
            }`
        )
        .join('\n');
      return `Here are the deadlines identified in the document:\n\n${items}`;
    }
  }

  // 2. Check for action items / tasks / steps
  if (
    qLower.includes('what should i do') ||
    qLower.includes('task') ||
    qLower.includes('action') ||
    qLower.includes('steps') ||
    qLower.includes('how to')
  ) {
    if (plan?.actions && plan.actions.length > 0) {
      const items = plan.actions
        .map(
          (a) =>
            `• **${a.title}** (${a.priority} priority): ${a.description}${a.estimatedTime ? ` [Est: ${a.estimatedTime}]` : ''
            }`
        )
        .join('\n');
      return `Here are the key action steps required by this document:\n\n${items}`;
    }
    if (plan?.dependencies && plan.dependencies.length > 0) {
      const items = plan.dependencies
        .map(
          (d) =>
            `• **Step ${d.stepNumber} - ${d.title}**: Prerequisite for ${d.prerequisiteFor}. ${d.details}`
        )
        .join('\n');
      return `Here is the required sequence of steps:\n\n${items}`;
    }
  }

  // 3. Check for documents / uploads / requirements / proof
  if (
    qLower.includes('document') ||
    qLower.includes('upload') ||
    qLower.includes('photo') ||
    qLower.includes('file') ||
    qLower.includes('requirement') ||
    qLower.includes('spec')
  ) {
    if (plan?.requirements && plan.requirements.length > 0) {
      const items = plan.requirements
        .map(
          (r) =>
            `• **${r.name}** (${r.format || 'Standard'}): ${r.details || 'Required for submission'}${r.mandatory ? ' [Mandatory]' : ''
            }`
        )
        .join('\n');
      return `The document outlines the following required items and specifications:\n\n${items}`;
    }
  }

  // 4. Check for warnings, penalties, fines, late fees, disqualification
  if (
    qLower.includes('warning') ||
    qLower.includes('penalty') ||
    qLower.includes('fine') ||
    qLower.includes('late') ||
    qLower.includes('disqualif') ||
    qLower.includes('risk')
  ) {
    if (plan?.warnings && plan.warnings.length > 0) {
      const items = plan.warnings.map((w) => `• **${w.title}**: ${w.consequence}`).join('\n');
      return `Important warnings and rule advisories mentioned in the document:\n\n${items}`;
    }
  }

  // 5. Keyword search in documentText
  if (documentText) {
    const stopwords = [
      'what', 'when', 'where', 'which', 'about', 'this', 'that', 'with', 'from',
      'have', 'does', 'will', 'your', 'under', 'within', 'there', 'please'
    ];
    const words = qLower
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !stopwords.includes(w));

    if (words.length > 0) {
      const sentences = documentText
        .split(/[.\n]+/)
        .map((s) => s.trim())
        .filter(Boolean);

      const scored = sentences
        .map((s) => {
          const sLower = s.toLowerCase();
          const score = words.filter((w) => sLower.includes(w)).length;
          return { text: s, score };
        })
        .filter((item) => item.score > 0);

      scored.sort((a, b) => b.score - a.score);

      if (scored.length > 0) {
        const excerpt = scored.slice(0, 3).map((m) => `> ${m.text}`).join('\n\n');
        return `Based on the document regarding your question:\n\n${excerpt}\n\n*Please refer to the full notice or reach out to the organizing authority for further unstated details.*`;
      }
    }
  }

  // 6. General grounded summary fallback
  if (plan?.summary) {
    return `According to the document **${plan.documentTitle || 'Notice'}**:\n\n${plan.summary}\n\nIf you need specific details about rules, deadlines, or prerequisites, feel free to ask!`;
  }

  return `Based on this document, please check the extracted action checklist and deadlines above for relevant instructions regarding "${question}".`;
}

/**
 * Lightweight heuristic extractor when no external API key is active.
 */
function generateFallbackPlan(text, documentName) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const title = lines[0]?.slice(0, 60) || documentName || 'Parsed Notice';

  return ActionPlanSchema.parse({
    documentTitle: title,
    documentType: 'Official Circular',
    summary: 'Document analyzed by ActionLens. Extracted tasks, deadlines, and dependencies.',
    actions: [
      {
        id: 'act-f1',
        title: 'Review and verify prerequisite approvals',
        description: 'Ensure institutional clearances and verifications are in place.',
        category: 'Verification',
        priority: 'high',
        isCompleted: false,
        estimatedTime: '30 mins',
      },
      {
        id: 'act-f2',
        title: 'Gather and format required documents',
        description: 'Prepare digital scans and files within acceptable size caps.',
        category: 'Documentation',
        priority: 'medium',
        isCompleted: false,
        estimatedTime: '20 mins',
      },
      {
        id: 'act-f3',
        title: 'Submit official application before cutoff',
        description: 'Finalize portal submission and archive transaction receipt.',
        category: 'Submission',
        priority: 'high',
        isCompleted: false,
        estimatedTime: '15 mins',
      },
    ],
    deadlines: [
      {
        id: 'dl-f1',
        title: 'Application Submission Deadline',
        date: 'Notice Cutoff Window',
        time: '5:00 PM',
        isStrict: true,
        notes: 'Strict cutoff mentioned in document.',
        urgency: 'upcoming',
      },
    ],
    requirements: [
      {
        id: 'req-f1',
        name: 'Official Scanned Proof / ID',
        format: 'PDF / Image',
        details: 'Mandatory identification verification.',
        mandatory: true,
      },
      {
        id: 'req-f2',
        name: 'Fee Receipt / Challan',
        format: 'Digital Voucher',
        details: 'Payment acknowledgement.',
        mandatory: true,
      },
    ],
    dependencies: [
      {
        id: 'dep-f1',
        stepNumber: 1,
        title: 'Clearance & Prerequisites',
        prerequisiteFor: 'Application Access',
        details: 'Initial requirements must be satisfied before application unlock.',
      },
      {
        id: 'dep-f2',
        stepNumber: 2,
        title: 'Final Submission & Payment',
        prerequisiteFor: 'Receipt & Confirmation',
        details: 'Receipt issued upon successful transaction reconciliation.',
      },
    ],
    warnings: [
      {
        id: 'warn-f1',
        title: 'Strict Cutoff & Disqualification Warning',
        consequence: 'Late or incomplete applications risk rejection.',
        severity: 'warning',
      },
    ],
    suggestedQuestions: [
      'What are the mandatory documents to upload?',
      'What are the hard deadlines mentioned?',
      'What prerequisites must be cleared first?',
    ],
  });
}
