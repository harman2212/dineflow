import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { name, description } = await request.json();

    if (!name || !description) {
      return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
    }

    const zai = await ZAI.create();

    const systemPrompt =
      'You are a professional food copywriter. Rewrite the given food description to be mouth-watering, appetizing, and professional. Keep it 2-3 sentences. Use sensory language (taste, texture, aroma). Make it sound like a premium restaurant menu. Return only the improved description text, nothing else.';

    const userPrompt = `Food name: ${name}\nCurrent description: ${description}\n\nPlease rewrite this description to be more appetizing and professional.`;

    const result = await zai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const improvedDescription = result.choices?.[0]?.message?.content?.trim();

    if (!improvedDescription) {
      return NextResponse.json({ error: 'Failed to generate description' }, { status: 500 });
    }

    return NextResponse.json({ description: improvedDescription });
  } catch (error) {
    console.error('Error improving description:', error);
    return NextResponse.json({ error: 'Failed to improve description' }, { status: 500 });
  }
}
