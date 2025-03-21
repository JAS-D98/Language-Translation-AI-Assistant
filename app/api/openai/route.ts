import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { translation, language } = await req.json();

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1-zero:free",
        messages: [
          {
            role: "system",
            content: `You are a language translator assistant and conversant with languages like French, Japanese, and Spanish. Translate the following text to ${language}.`,
          },
          {
            role: "user",
            content: translation,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      },
    );

    // If successful, return the translation result
    return NextResponse.json({
      result: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from OpenRouter" },
      { status: 500 },
    );
  }
}
