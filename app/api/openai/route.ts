import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.openai.com/v1',
});

export async function POST(req: NextRequest) {
  try {
    const { translation, language } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a language translator assistant and conversant with languages like French, Japanese, and Spanish. You are to translate the following text to ${language}.`,
        },
        {
          role: 'user',
          content: translation,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({ result: response.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch from OpenAI' }, { status: 500 });
  }
}
