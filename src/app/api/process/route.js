import { NextResponse } from 'next/server';
import { parsePdfToMarkdown, generateActionPlanFromText } from '@/lib/gemini';
import { SAMPLE_DOCUMENTS } from '@/lib/sampleData';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    // Case 1: Preloaded sample document requested
    if (contentType.includes('application/json')) {
      const body = await request.json();
      
      if (body.demoId) {
        const sample = SAMPLE_DOCUMENTS.find((d) => d.id === body.demoId) || SAMPLE_DOCUMENTS[0];
        return NextResponse.json({
          success: true,
          plan: sample.presetPlan,
          rawText: sample.rawText,
          documentTitle: sample.presetPlan.documentTitle,
        });
      }

      if (body.text) {
        const plan = await generateActionPlanFromText(body.text, body.documentName || 'Pasted Document');
        return NextResponse.json({
          success: true,
          plan,
          rawText: body.text,
          documentTitle: plan.documentTitle,
        });
      }

      return NextResponse.json({ success: false, error: 'No text or demoId provided' }, { status: 400 });
    }

    // Case 2: File Upload (Multipart Form Data)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file');

      if (!file || typeof file === 'string') {
        return NextResponse.json({ success: false, error: 'No PDF file uploaded' }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name || 'document.pdf';

      // 1. Convert PDF to structured text/markdown (via MinerU or fallback)
      const markdown = await parsePdfToMarkdown(buffer, filename);

      // 2. Reason over document using Google Gemma 4
      const plan = await generateActionPlanFromText(markdown, filename.replace(/\.pdf$/i, ''));

      return NextResponse.json({
        success: true,
        plan,
        rawText: markdown,
        documentTitle: plan.documentTitle,
      });
    }

    return NextResponse.json({ success: false, error: 'Unsupported content type' }, { status: 400 });
  } catch (error) {
    console.error('Error in /api/process:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to process document',
      },
      { status: 500 }
    );
  }
}
