export const SAMPLE_DOCUMENTS = [
  {
    id: 'college-exam-circular',
    title: 'University Term-End Examination Circular (Dec 2026)',
    category: 'Academic Notice',
    rawText: `NOTICE: Term-End Examination Form Submission (Dec 2026 Session)
Office of the Controller of Examinations, Apex Technical University

All eligible registered candidates intending to appear for the upcoming Odd Semester Term-End Examinations are hereby notified that the examination application portal is now active.

1. SUBMISSION SCHEDULE & DEADLINES:
- Standard Online Submission Window: Oct 10, 2026 to Oct 25, 2026 (Hard cutoff: 5:00 PM IST).
- Late Submission Window (With fine of INR 500): Oct 26, 2026 to Oct 28, 2026 (5:00 PM IST).
- Absolute Portal Lockout: No forms will be accepted under any circumstances after Oct 28, 2026, 11:59 PM IST.

2. PREREQUISITES & ELIGIBILITY LOCKS:
- Library Clearance: Students who have not obtained formal clearance from the Central Library will be electronically locked out of the examination portal. Clearance counters are operational Monday through Friday between 10:00 AM and 3:00 PM. All overdue books must be physically deposited and outstanding fines settled.
- Minimum Attendance: Departmental verification of 75% attendance must be certified by your respective HOD prior to registration finalization.

3. MANDATORY UPLOADS & FILE SPECIFICATIONS:
- Scanned Student Identity Card (Format: PDF only, maximum size: 500 KB).
- Recent Passport-size Photograph (Format: JPEG/PNG, 3.5cm x 4.5cm, white background, < 100 KB).
- Clear Specimen Signature (Black ballpoint pen on white paper, JPEG < 50 KB).
- Fee Payment Challan / UTR Voucher receipt for Rs. 2,400.

4. SEQUENCE OF OPERATIONS:
Step A: Visit Central Library and obtain digital No-Dues token.
Step B: Receive HOD attendance clearance on the intranet portal.
Step C: Log into the ERP Examination Portal, upload mandatory documents, and select course codes.
Step D: Complete payment via payment gateway and immediately download the system-generated acknowledgement slip.

5. IMPORTANT WARNINGS & DISQUALIFICATIONS:
- Submission of incomplete credentials or corrupt scanned files will result in immediate disqualification without any fee refund.
- Examination hall tickets will NOT be generated if fee receipt upload is omitted.`,
    presetPlan: {
      documentTitle: 'Term-End Examination Registration (Dec 2026)',
      documentType: 'University Circular',
      summary: 'Mandatory registration process for upcoming university term-end exams requiring sequential clearance before portal submission.',
      actions: [
        {
          id: 'act-1',
          title: 'Obtain Central Library No-Dues Clearance',
          description: 'Return all borrowed books and clear fines at Central Library counter (Mon–Fri, 10 AM – 3 PM).',
          category: 'Clearance',
          priority: 'high',
          isCompleted: false,
          estimatedTime: '45 mins'
        },
        {
          id: 'act-2',
          title: 'Verify HOD Attendance Certification',
          description: 'Check university intranet to confirm minimum 75% attendance status has been signed off.',
          category: 'Verification',
          priority: 'medium',
          isCompleted: false,
          estimatedTime: '15 mins'
        },
        {
          id: 'act-3',
          title: 'Prepare Scanned Proofs & Photos',
          description: 'Compress ID card to PDF (<500KB), photo (<100KB), and signature (<50KB) according to specs.',
          category: 'Documentation',
          priority: 'medium',
          isCompleted: false,
          estimatedTime: '20 mins'
        },
        {
          id: 'act-4',
          title: 'Complete ERP Form & Course Selection',
          description: 'Login to examination portal, verify elective course codes, and attach mandatory uploads.',
          category: 'Application',
          priority: 'high',
          isCompleted: false,
          estimatedTime: '30 mins'
        },
        {
          id: 'act-5',
          title: 'Pay Examination Fee & Download Slip',
          description: 'Pay ₹2,400 fee online and archive the generated acknowledgement receipt.',
          category: 'Finance',
          priority: 'high',
          isCompleted: false,
          estimatedTime: '10 mins'
        }
      ],
      deadlines: [
        {
          id: 'dl-1',
          title: 'Regular Submission Cutoff',
          date: 'October 25, 2026',
          time: '5:00 PM IST',
          isStrict: true,
          notes: 'Standard application fee window (no surcharge).',
          urgency: 'upcoming'
        },
        {
          id: 'dl-2',
          title: 'Late Submission Cutoff',
          date: 'October 28, 2026',
          time: '5:00 PM IST',
          isStrict: true,
          notes: 'Requires additional ₹500 late penalty fee.',
          urgency: 'upcoming'
        },
        {
          id: 'dl-3',
          title: 'Hard System Lockout',
          date: 'October 28, 2026',
          time: '11:59 PM IST',
          isStrict: true,
          notes: 'Zero forms accepted under any circumstances after this minute.',
          urgency: 'imminent'
        }
      ],
      requirements: [
        {
          id: 'req-1',
          name: 'Student ID Card',
          format: 'PDF (< 500 KB)',
          details: 'Scanned original university identification card.',
          mandatory: true
        },
        {
          id: 'req-2',
          name: 'Passport Photograph',
          format: 'JPEG/PNG (< 100 KB)',
          details: 'Recent 3.5cm x 4.5cm on pure white background.',
          mandatory: true
        },
        {
          id: 'req-3',
          name: 'Specimen Signature',
          format: 'JPEG (< 50 KB)',
          details: 'Black ballpoint pen on plain white sheet.',
          mandatory: true
        },
        {
          id: 'req-4',
          name: 'Exam Fee Receipt',
          format: 'UTR / Challan Slip',
          details: 'Proof of ₹2,400 exam fee payment.',
          mandatory: true
        }
      ],
      dependencies: [
        {
          id: 'dep-1',
          stepNumber: 1,
          title: 'Library Clearance & Token',
          prerequisiteFor: 'ERP Portal Form Unlock',
          details: 'Portal automatically checks library database; forms stay locked without clearance.'
        },
        {
          id: 'dep-2',
          stepNumber: 2,
          title: 'Department Attendance Signoff',
          prerequisiteFor: 'Course Code Enrollment',
          details: 'HOD must confirm >= 75% attendance threshold.'
        },
        {
          id: 'dep-3',
          stepNumber: 3,
          title: 'ERP Form & Document Upload',
          prerequisiteFor: 'Payment Gateway Access',
          details: 'All 4 asset files must validate before proceeding to checkout.'
        },
        {
          id: 'dep-4',
          stepNumber: 4,
          title: 'Fee Payment & Slip Download',
          prerequisiteFor: 'Hall Ticket Issuance',
          details: 'Admit card will not generate without confirmed fee reconciliation.'
        }
      ],
      warnings: [
        {
          id: 'warn-1',
          title: 'Electronic Portal Lockout for Library Defaulters',
          consequence: 'Form submission is disabled until the library digital token is synchronized.',
          severity: 'critical'
        },
        {
          id: 'warn-2',
          title: 'Strict Late Submission Penalty',
          consequence: 'Submissions between Oct 26 and Oct 28 incur an automatic non-negotiable ₹500 fine.',
          severity: 'warning'
        },
        {
          id: 'warn-3',
          title: 'Disqualification for Corrupt Scans',
          consequence: 'Unreadable or wrong-format uploads are rejected with zero fee refund.',
          severity: 'warning'
        }
      ],
      suggestedQuestions: [
        'What happens if I try to submit without library clearance?',
        'Can I submit after October 25 if I pay the late fee?',
        'What are the exact image size and format constraints for uploads?',
        'What time do the library clearance counters close each day?'
      ]
    }
  },
  {
    id: 'government-grant-notice',
    title: 'National Innovation Seed Grant Circular (2026-27)',
    category: 'Government Circular',
    rawText: `MINISTRY OF SCIENCE & TECHNOLOGY — INNOVATION SEED GRANT PROGRAM (2026)
Reference Circular: MST/INV/2026/G-881

Applications are invited from early-stage founders and university researchers for grant disbursements up to $25,000.

1. APPLICATION TIMELINE:
- Window Open: November 1, 2026.
- Portal Submission Deadline: November 20, 2026 (23:59 GMT).
- Review Board Interview Shortlist: December 5, 2026.

2. MANDATORY PREREQUISITES:
- Entity Incorporation: The applicant entity must be a registered startup or university research team incorporated within the last 36 months.
- Institutional Endorsement Letter: Must be signed by the Dean of Research or Incubation Center Director prior to submitting the online budget annexure.

3. REQUIRED DOCUMENTS:
- Pitch Deck & Technical Architecture (PDF, max 15 slides, < 10 MB).
- Itemized Budget Utilization Plan (Excel or PDF using Annexure-B template).
- Certificate of Incorporation & Tax PIN documentation.
- Signed Conflict of Interest Declaration.

4. DEPENDENCIES:
Step 1: Obtain signed Institutional Endorsement Letter from Incubation Center.
Step 2: Complete Annexure-B financial forecast.
Step 3: Upload grant proposal and submit digital application.

5. RESTRICTIONS & WARNINGS:
- Applications lacking the institutional endorsement will be rejected at Stage 0 without panel review.
- Retrospective fund allocation is prohibited.`,
    presetPlan: {
      documentTitle: 'Innovation Seed Grant Application (MST/2026)',
      documentType: 'Government Grant Circular',
      summary: 'Competitive grant application process for early-stage research teams and startups requiring institutional endorsement.',
      actions: [
        {
          id: 'act-g1',
          title: 'Request Institutional Endorsement Letter',
          description: 'Submit proposal brief to Dean of Research / Incubation Director for formal signoff.',
          category: 'Endorsement',
          priority: 'high',
          isCompleted: false,
          estimatedTime: '2-3 days'
        },
        {
          id: 'act-g2',
          title: 'Complete Annexure-B Budget Plan',
          description: 'Fill official spreadsheet with itemized equipment, cloud, and stipend breakdowns.',
          category: 'Financials',
          priority: 'high',
          isCompleted: false,
          estimatedTime: '2 hours'
        },
        {
          id: 'act-g3',
          title: 'Finalize Pitch & Architecture Deck',
          description: 'Ensure presentation adheres to 15-slide cap and <10MB file ceiling.',
          category: 'Proposal',
          priority: 'medium',
          isCompleted: false,
          estimatedTime: '4 hours'
        },
        {
          id: 'act-g4',
          title: 'Submit Ministry Portal Application',
          description: 'Upload all attachments, sign Conflict of Interest declaration, and obtain confirmation ID.',
          category: 'Submission',
          priority: 'high',
          isCompleted: false,
          estimatedTime: '30 mins'
        }
      ],
      deadlines: [
        {
          id: 'dl-g1',
          title: 'Application Submission Deadline',
          date: 'November 20, 2026',
          time: '23:59 GMT',
          isStrict: true,
          notes: 'Online portal closes automatically.',
          urgency: 'upcoming'
        },
        {
          id: 'dl-g2',
          title: 'Shortlist Announcement',
          date: 'December 5, 2026',
          time: 'Direct Email',
          isStrict: false,
          notes: 'Invited applicants proceed to interview panel.',
          urgency: 'standard'
        }
      ],
      requirements: [
        {
          id: 'req-g1',
          name: 'Institutional Endorsement Letter',
          format: 'Signed PDF',
          details: 'Official letterhead signed by Dean of Research or Incubation Director.',
          mandatory: true
        },
        {
          id: 'req-g2',
          name: 'Annexure-B Budget Plan',
          format: 'PDF / XLSX',
          details: 'Strict itemized breakdown without retrospective allocations.',
          mandatory: true
        },
        {
          id: 'req-g3',
          name: 'Pitch Deck & Architecture',
          format: 'PDF (< 10 MB)',
          details: 'Maximum 15 slides covering problem, solution, tech stack, and roadmap.',
          mandatory: true
        },
        {
          id: 'req-g4',
          name: 'Incorporation & Tax PIN',
          format: 'PDF',
          details: 'Proof of incorporation under 36 months.',
          mandatory: true
        }
      ],
      dependencies: [
        {
          id: 'dep-g1',
          stepNumber: 1,
          title: 'Institutional Endorsement Signoff',
          prerequisiteFor: 'Portal Budget Submission',
          details: 'Portal blocks submission if endorsement token is missing.'
        },
        {
          id: 'dep-g2',
          stepNumber: 2,
          title: 'Annexure-B Budget Completion',
          prerequisiteFor: 'Grant Portal Finalization',
          details: 'Total claimed amount must match the budget spreadsheet exactly.'
        }
      ],
      warnings: [
        {
          id: 'warn-g1',
          title: 'Immediate Stage 0 Rejection for Missing Endorsement',
          consequence: 'No cure period or appeals are granted if Dean signoff is omitted.',
          severity: 'critical'
        },
        {
          id: 'warn-g2',
          title: 'Retrospective Allocation Prohibition',
          consequence: 'Any funds claimed for expenses before grant award date will be struck.',
          severity: 'warning'
        }
      ],
      suggestedQuestions: [
        'Who is eligible to sign the Institutional Endorsement Letter?',
        'Can I include retrospective expenses in the Annexure-B budget?',
        'What is the maximum file size and slide count for the pitch deck?'
      ]
    }
  }
];
