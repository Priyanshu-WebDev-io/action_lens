# 🔍 ActionLens — Turn Documents Into Action Plans

> **Documents tell you everything. ActionLens tells you what to do.**  
> *PDF → MinerU → Gemma 4 → Action Plan*

[![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemma 4](https://img.shields.io/badge/AI-Gemma%204%20(Gemini%20API)-4285F4?logo=google&logoColor=white)](https://ai.google.dev/gemma)
[![MinerU API](https://img.shields.io/badge/PDF_Parser-MinerU_Agent_API-7928CA)](https://github.com/opendatalab/MinerU)
[![Zod](https://img.shields.io/badge/Validation-Zod-3068b7?logo=zod&logoColor=white)](https://zod.dev/)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**ActionLens** is an open-source multimodal AI tool that transforms dense, complicated documents, circulars, and notices into clear, ordered, deadline-aware action roadmaps. Designed with a lean, serverless-first architecture, ActionLens runs entirely in the cloud and deploys seamlessly to Vercel without requiring dedicated VMs or complex GPU infrastructure.

---

## 🚨 The Problem

Critical information is routinely buried inside long, confusing documents like college circulars, government notices, or compliance policies:

> *"Students are required to complete the examination form submission process before the specified deadline. Students who have not obtained library clearance must complete the clearance process before submitting the examination form. The required documents must be uploaded in the prescribed format..."*

Standard text summarizers simply shorten the text. But when users face real-world processes, they need concrete answers to operational questions:

* ❓ **What do I need to do?**
* ❓ **When do I need to do it?**
* ❓ **What documents and proofs do I need?**
* ❓ **Is there anything I need to complete first (dependencies)?**
* ❓ **What happens if I miss something (penalties & warnings)?**

---

## 🚀 Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **Next.js + React** | Application UI & interactive views |
| **Styling** | **Tailwind CSS** | Clean, responsive, and polished UI |
| **Backend** | **Next.js Serverless Functions** | API logic & pipeline orchestration |
| **PDF Processing** | **MinerU Agent API** | Converts complex PDF layouts into structured Markdown |
| **AI Reasoning** | **Gemma 4 via Gemini API** | Understands rules, constraints, and extracts actions |
| **Schema Validation** | **Zod** | Strictly validates Gemma's structured JSON output |
| **State Management** | **React State** | Upload, processing stages, results, and chat state |
| **Database** | **None (Stateless)** | Zero overhead; privacy-preserving instant execution |
| **File Storage** | **None (In-Memory)** | In-memory processing; documents are never permanently stored |
| **Deployment** | **Vercel** | Single-click unified frontend + serverless backend |
| **Version Control** | **Git + GitHub** | Open source repository & issue tracking |

---

## 🏗️ Architecture

```text
                         ACTIONLENS
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Next.js + React   │
                 │                     │
                 │  • PDF Upload       │
                 │  • Processing UI    │
                 │  • Action Plan      │
                 │  • Q&A Chat         │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Vercel Function   │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │     MinerU API      │
                 │                     │
                 │ PDF → Markdown      │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │      Gemma 4        │
                 │    Gemini API       │
                 │                     │
                 │ Document Reasoning  │
                 └──────────┬──────────┘
                            │
                       Structured JSON
                            │
                            ▼
                 ┌─────────────────────┐
                 │        Zod          │
                 │ Response Validation │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │    ActionLens UI    │
                 │                     │
                 │ 📋 Actions          │
                 │ 📅 Deadlines        │
                 │ 📎 Requirements     │
                 │ ⚠️ Warnings         │
                 │ 🔗 Dependencies     │
                 │ 💬 Ask Document     │
                 └─────────────────────┘
```

---

## 🎯 The Core Engineering Challenge

Rather than relying on bloated, heavyweight infrastructure, ActionLens is designed around a single, highly refined reasoning pipeline:

```text
       PDF
        │
        ▼
     MinerU
        │
        ▼
 Structured Markdown
        │
        ▼
     Gemma 4
        │
        ▼
"What does this person
 actually need to do?"
        │
        ▼
   Action Plan
```

**That is the entire heart of ActionLens.**

---

## 📦 Capabilities & Scope

### 📥 Input
**PDF documents**, including:
- 🎓 College & university circulars
- 📝 Examination & registration notices
- 💰 Scholarship & financial aid applications
- 🏛️ Government & municipal circulars
- 🏢 Company & HR workplace policies

### 📤 Output: The 6 Action Pillars

ActionLens extracts and displays 6 specific, tangible sections:

#### 1. What do I need to do? (Checklist)
```text
☐ Clear library dues
☐ Fill examination form
☐ Upload photograph
☐ Upload signature
☐ Pay examination fee
```

#### 2. Deadlines
```text
📅 Examination form deadline: 15 October 2026, 5:00 PM IST
📅 Late submission with fine (₹500): 18 October 2026
```

#### 3. Requirements & Proofs
```text
Required Documents:
• Student ID Card (Scanned PDF < 500KB)
• Recent Passport-size Photograph
• Specimen Signature (Black ink)
• Fee Payment Receipt
```

#### 4. Dependencies & Prerequisites
```text
Library clearance
       ↓
Examination registration
       ↓
Fee payment
```

#### 5. Important Warnings
```text
⚠️ Library clearance must be completed before submitting the examination form.
⚠️ Incomplete applications will be rejected without refund.
```

#### 6. Ask the Document (Interactive Q&A)
```text
User:   "What do I need to complete first?"
Gemma:  "You must obtain library clearance first. The circular states that students 
         with pending library dues will be locked out of the online form submission."
```

---

## 🛡️ Architectural Principles & Non-Goals

ActionLens is deliberately built to be lightweight, stateless, and privacy-respecting. To avoid bloat and ensure zero maintenance overhead, the following design decisions were intentionally made:

```text
• No Authentication Walls       → Instant access with zero sign-up friction
• No Database Overhead          → Completely stateless; your documents remain private
• No File Retention             → In-memory processing; documents are never saved
• No Heavy Local OCR Daemons    → High-accuracy layout parsing handled via API
• No Complex Vector Databases   → Gemma reasons directly over the structured document
• No Cloud Storage Dependencies  → Pure serverless runtime with zero cold storage costs
```

> **Why Stateless?** Eliminating persistence guarantees user document privacy, near-instant response times, and the ability to run anywhere with zero database provisioning.

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js 18.x or 20.x**
- **npm** or **pnpm**
- **Gemini API Key** (with access to Gemma models)
- *(Optional)* **MinerU API Token** (if using an authenticated endpoint)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/actionlens.git
   cd actionlens
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # Google Gemini / Gemma API key
   GEMINI_API_KEY="your-gemini-api-key"

   # Primary Model (Default: gemini-3.8-flash for instant sub-2s responses)
   PRIMARY_MODEL_NAME="gemini-3.8-flash"

   # Failover & Track Qualification Model (Google Gemma 4 open-weights)
   GEMMA_MODEL_NAME="gemma-4-26b-a4b-it"

   # MinerU API Token (leave empty if using no-auth agent endpoint)
   MINERU_API_TOKEN=""
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment (Vercel)

ActionLens is designed to deploy with zero extra configuration on Vercel:

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Add `GEMINI_API_KEY` (and `MINERU_API_TOKEN` if needed) under **Environment Variables**.
4. Click **Deploy**. Your app will be live with serverless backend execution.

---

## 🤝 Contributing

We welcome contributions from the open-source community!

1. Fork the repo and create your feature branch: `git checkout -b feature/cool-feature`
2. Commit your changes: `git commit -m 'feat: add cool feature'`
3. Push to the branch: `git push origin feature/cool-feature`
4. Open a Pull Request!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
