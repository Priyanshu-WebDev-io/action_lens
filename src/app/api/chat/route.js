import { NextResponse } from 'next/server';
import { askDocumentQuestion } from '@/lib/gemini';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const { documentText, question, conversationHistory, plan } = await request.json();

    if (!question || !question.trim()) {
      return NextResponse.json({ success: false, error: 'Question is required' }, { status: 400 });
    }

    const answer = await askDocumentQuestion(
      documentText || '',
      question,
      conversationHistory || [],
      plan || null
    );

    return NextResponse.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to answer question',
      },
      { status: 500 }
    );
  }
}
