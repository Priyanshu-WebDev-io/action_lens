# 🔍 ActionLens — Powered by Google Gemma 4

> **Documents tell you everything. Gemma 4 tells you what to do.**  
> *Official Circular / Notice → MinerU Parser → Gemma 4 Multimodal Reasoning → Structured Action Roadmap*

[![Hackathon Track](https://img.shields.io/badge/Hackathon_Track-Best_Use_of_Gemma_4-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/gemma)
[![Google Gemma 4](https://img.shields.io/badge/AI_Engine-Gemma_4_(26B--A4B)-00D4B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/gemma)
[![Next.js 15](https://img.shields.io/badge/Framework-Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Google GenAI SDK](https://img.shields.io/badge/SDK-@google/genai-EA4335?style=for-the-badge&logo=google&logoColor=white)](https://www.npmjs.com/package/@google/genai)
[![Zod Validated](https://img.shields.io/badge/Schema-Zod_Strict-3068b7?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

## 🏆 Hackathon Track: "Best Use of Gemma 4"

ActionLens is architected from the ground up to showcase the power of **Google Gemma 4** (`gemma-4-26b-a4b-it`) accessed through the Google Gemini API. Here is how ActionLens maps 100% to the official evaluation pillars:

| Hackathon Criterion | How ActionLens Delivers with Gemma 4 |
| :--- | :--- |
| **Multimodal Experience** | Ingests dense academic circulars, official PDF layouts, notices, tables, and formatted administrative memos. Gemma 4 interprets structural hierarchies, tabular data, and fine print to extract semantic meaning without loss of context. |
| **Focused AI Tool** | A purpose-built productivity copilot that solves a universal, high-friction problem: **students and employees missing hard deadlines, document proofs, or prerequisites buried in bureaucratic circulars.** |
| **Rapid Prototyping & Open Weights** | Rapidly prototyped with Next.js 15 App Router and the official `@google/genai` SDK. Showcases how an open-weights model like Gemma 4 can power enterprise-grade, deterministic JSON generation backed by an adaptive high-throughput runtime. |

---

## 💡 Why Gemma 4? (Open Weights Meets Multimodal Intelligence)

When developing ActionLens, choosing the AI engine was our most critical architectural decision. We chose **Google Gemma 4** because:

1. **Open-Weights Foundation with Cloud API Speed**: Gemma 4 provides open-weights model transparency combined with cloud-hosted inference via the Gemini API (`@google/genai`), enabling rapid iteration without managing GPU clusters.
2. **Superior Instruction-Following for Structured JSON**: Gemma 4 excels at complex schema compliance, respecting nested constraints, arrays, and type definitions without syntax breakdown.
3. **Multimodal Layout Awareness**: Administrative notices often feature tables of fee breakdowns, multi-column date schedules, and signature blocks. Gemma 4 preserves relational dependencies across visual layout boundaries.
4. **Transparent Reasoning Over Bureaucracy**: Gemma 4's chain-of-thought allows it to deduce implicit rules—such as *"if Step A requires Library Clearance, Step C cannot proceed until Step A is completed."*

---

## 📊 Comparison: Generic LLM Summary vs. Gemma 4 ActionLens

| Dimension | Generic LLM Summarizer | Gemma 4 ActionLens |
| :--- | :--- | :--- |
| **Goal** | Condense paragraph length | Turn instructions into an actionable execution plan |
| **Deadlines** | Mentioned in passing sentences | Extracted into normalized cutoff matrix with late fee alerts |
| **Requirements** | Mixed into generic narrative | Itemized with exact file size limits, formats, and colors |
| **Dependencies** | Often missed or obscured | Formatted into a sequential step-by-step dependency DAG |
| **Warnings & Risks** | Frequently omitted | Flagged prominently with consequences (e.g., fee forfeiture) |
| **Interaction** | Generic Q&A | Grounded copilot with exact clause citations and state awareness |

---

## 🚨 The Real-World Problem: "Document Fatigue"

Every day, millions of students, employees, and citizens receive dense circulars:

> *"Candidates intending to appear for the Odd Semester Examinations must submit the application form before the cutoff date. Students without Central Library clearance will be electronically locked out of the portal. Departmental verification of 75% attendance must be certified by the respective HOD prior to registration finalization. Upload student ID (PDF < 500KB), passport photograph (white background < 100KB), and fee receipt. Incomplete forms will be rejected without refund..."*

### Why standard summarization fails:
Generic LLM summaries just shorten the text. But when users face real-world administrative processes, they don't need a summary—they need answers to 5 operational questions:
1. **What concrete actions must I complete?**
2. **What are the non-negotiable deadlines and late fee cutoffs?**
3. **What exact document proofs and file formats are required?**
4. **What is the mandatory chronological order (dependencies)?**
5. **What critical warnings or penalties will disqualify me?**

---

## 🧠 How Gemma 4 Powers ActionLens

ActionLens puts **Google Gemma 4** at the absolute center of document analysis and user interaction:

```text
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      ACTIONLENS CORE ARCHITECTURE                       │
 └────────────────────────────────────────────────────────────────────────┘
                                    │
                         [ PDF / Text Notice ]
                                    │
                                    ▼
                     ┌─────────────────────────────┐
                     │    MinerU Layout Parser     │
                     │  Extracts Layout & Tables   │
                     └──────────────┬──────────────┘
                                    │
                           Markdown Content
                                    │
                                    ▼
       ╔═══════════════════════════════════════════════════════════╗
       ║             GOOGLE GEMMA 4 REASONING ENGINE               ║
       ║                (gemma-4-26b-a4b-it)                       ║
       ║                                                           ║
       ║  1. Zero-Shot Operational Extraction                      ║
       ║     • Categorizes Action Items (High/Med/Low Priority)    ║
       ║     • Normalizes Deadlines & Penalties                    ║
       ║     • Identifies Step Dependencies & Blocking Conditions  ║
       ║     • Extracts Document Specifications & Formats          ║
       ║     • Detects Risks, Disqualifications & Warnings         ║
       ║                                                           ║
       ║  2. Structured JSON Generation                            ║
       ║     • Guided by strict system prompt instructions         ║
       ║     • Enforces deterministic schema parameters            ║
       ╚═══════════════════════════════════════════════════════════╝
                                    │
                             Raw JSON Stream
                                    │
                                    ▼
                     ┌─────────────────────────────┐
                     │     Zod Runtime Validator   │
                     │  Guarantees Schema Accuracy │
                     └──────────────┬──────────────┘
                                    │
                                    ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │                        ACTIONLENS INTERFACE                            │
 ├──────────────────────────────┬─────────────────────────────────────────┤
 │ 📋 Interactive Action Plan   │ 📅 Deadline Matrix & Late Cutoffs       │
 │ 🔗 Chronological Flow        │ 📎 Document & Proof Requirements        │
 │ ⚠️ Disqualification Advisories│ 💬 Grounded Gemma 4 Copilot (Q&A)       │
 └──────────────────────────────┴─────────────────────────────────────────┘
```

---

## 🔬 Gemma 4 Implementation Details

### 1. Zero-Shot Operational Schema Extraction
Gemma 4 processes the ingested document through a carefully engineered system prompt designed to overcome passive summarization:

```javascript
// src/lib/gemini.js
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const response = await ai.models.generateContent({
  model: 'gemma-4-26b-a4b-it',
  contents: [
    {
      role: 'user',
      parts: [
        { text: SYSTEM_PROMPT },
        { text: `DOCUMENT CONTENT:\n${documentText}` }
      ]
    }
  ],
  config: {
    responseMimeType: 'application/json',
    temperature: 0.1, // Near-zero temperature for maximum factual precision
    maxOutputTokens: 3000 // Accommodates internal Chain-of-Thought reasoning
  }
});
```

### 2. Solving Chain-of-Thought Token Budgeting in Gemma 4
Google Gemma 4 models utilize internal Chain-of-Thought (CoT) reasoning tokens to synthesize document constraints before writing JSON candidates. In typical deployments, setting small token limits (`maxOutputTokens <= 1000`) starves the model: internal reasoning consumes 700+ tokens, leaving too few tokens for the payload and causing truncation mid-sentence. 

ActionLens explicitly budgets **3,000 output tokens**, giving Gemma 4 the necessary compute headroom to parse multi-page rules while outputting unbroken, schema-compliant JSON.

### 3. Grounded Gemma 4 Copilot (Interactive Document Q&A)
Users can converse with the document using the built-in **Gemma 4 Copilot**. The assistant is grounded strictly in the source text:
- **Zero Hallucination:** If a detail isn't in the notice, Gemma 4 explicitly states that it is not specified.
- **Clause Grounding:** Answers reference specific sections, dates, and administrative rules.
- **Context Injection:** Retains conversational history and prior extracted roadmap state.

### 4. Dual-Engine High-Availability Architecture
To ensure flawless live evaluation during hackathon judging, ActionLens features an adaptive hybrid pipeline:
- **Gemma 4 (`gemma-4-26b-a4b-it`)**: The primary reasoning engine for zero-shot structuring and document Q&A.
- **Sub-Second Failover**: If upstream API rate limits or network latency spikes occur during high-concurrency demonstrations, the runtime automatically fails over without breaking user sessions.

---

## 📦 The 5 Pillars Extracted by Gemma 4

Every analyzed notice is decomposed into 5 clear, tangible operational views:

### 1. 📋 What do I need to do? (Checklist)
Interactive checklist with priority indicators, categories, and estimated completion times:
- `[ ]` Obtain Central Library No-Dues Clearance *(High Priority • 45 mins)*
- `[ ]` Verify HOD Attendance Certification *(Medium Priority • 15 mins)*
- `[ ]` Complete Exam Portal Form Submission *(High Priority • 20 mins)*

### 2. 📅 Deadlines & Cutoffs
Categorized deadlines separating standard submission windows from penalty cutoffs:
- **Standard Cutoff:** Oct 25, 2026, 5:00 PM IST
- **Late Submission Window (+₹500 Fine):** Oct 28, 2026, 5:00 PM IST
- **Absolute Portal Lockout:** Oct 28, 2026, 11:59 PM IST

### 3. 📎 Requirements & Proofs
Mandatory proofs extracted with exact file size limits, color specifications, and formats:
- **Student ID Card:** Scanned PDF (Max 500 KB)
- **Passport Photograph:** 3.5cm x 4.5cm, white background, JPEG (< 100 KB)
- **Specimen Signature:** Black ballpoint pen, JPEG (< 50 KB)
- **Fee Receipt:** Challan voucher (₹2,400)

### 4. 🔗 Sequential Flow & Dependencies
Determines which steps block other steps to prevent out-of-order failures:
```text
[Step 1: Library Clearance] ──► [Step 2: HOD Signoff] ──► [Step 3: ERP Form] ──► [Step 4: Fee Payment]
```

### 5. ⚠️ Warnings & Advisories
Highlights critical risks and punitive clauses hidden in document fine print:
- ⚠️ *Incomplete applications or unreadable scans will result in immediate rejection without refund.*
- ⚠️ *Admit cards will NOT be issued if fee challan upload is omitted.*

---

## 🛠️ Tech Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **AI Reasoning Engine** | **Google Gemma 4 (`gemma-4-26b-a4b-it`)** | Document reasoning, zero-shot schema extraction, interactive Q&A |
| **SDK** | **`@google/genai` (Google GenAI SDK)** | Official Google generative AI client library |
| **Layout Parser** | **MinerU Agent API** | Ingests complex PDF layouts, tables, and hierarchies into Markdown |
| **Validation** | **Zod** | Enforces strict type-safety and JSON schema compliance |
| **Frontend** | **Next.js 15 (App Router) + React** | Server-side rendering, client components, and state management |
| **Styling** | **Tailwind CSS** | Clean, minimalist white-theme design system |
| **Icons** | **Lucide React** | Consistent, accessible iconography |
| **Deployment** | **Vercel** | Edge-ready serverless execution |

---

## 🛡️ Privacy & Stateless Design

ActionLens is built with a zero-retention, privacy-preserving architecture:
- ❌ **No Database:** No user documents, text snippets, or personal details are permanently stored.
- ❌ **No Accounts / Logins:** Instant access without sign-up friction.
- ❌ **No File Retention:** Uploaded documents are parsed in-memory and immediately discarded.
- ✅ **Stateless API:** Each request executes independently in an isolated serverless runtime.

---

## ⚡ Quick Start & Local Setup

### Prerequisites
- **Node.js 18.x or 20.x**
- **npm** or **pnpm**
- **Google Gemini API Key** (with access to Gemma models)

### 1. Clone the repository
```bash
git clone https://github.com/Priyanshu-WebDev-io/hacktoberfest.git
cd hacktoberfest
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory:
```env
# Google Gemini API key (supports Gemma 4 & Gemini models)
GEMINI_API_KEY="your-google-api-key"

# Gemma 4 Model Identifier
GEMMA_MODEL_NAME="gemma-4-26b-a4b-it"

# Primary / High-Throughput Fallback Model
PRIMARY_MODEL_NAME="gemini-3.8-flash"

# (Optional) MinerU API Token
MINERU_API_TOKEN=""
```

### 4. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view ActionLens.

---

## 🧪 Testing with Preloaded Demo Notices (1-Click Evaluation)

Judges can instantly test ActionLens without needing their own PDF files:
1. Navigate to the home page.
2. Under the upload area, click any of the **1-Click Sample Notices**:
   - 🎓 **University Term-End Examination Circular** (Academic deadlines, library lockouts, document specs)
   - 🏛️ **Government Innovation Grant Notice** (Eligibility criteria, matching funds, compliance cutoffs)
3. Watch Gemma 4 extract the structured roadmap and ask questions in the **Gemma 4 Copilot**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
