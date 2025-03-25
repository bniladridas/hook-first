import { generateInference } from '@/lib/gemini';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input } = body;

    if (!input) {
      return NextResponse.json(
        { error: 'Input is required' },
        { status: 400 }
      );
    }

    const result = await generateInference(input);
    return NextResponse.json({ result });
  } catch (error) {
    console.error('Inference error:', error);
    return NextResponse.json(
      { error: 'Failed to generate inference' },
      { status: 500 }
    );
  }
}