'use server'

import Groq from "groq-sdk";
import { Movie } from "@/schema/type";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function getInsights(allMediaData: Movie, spoilerType: string) {
  try {
    const movieTitle = allMediaData.title || allMediaData.name;
    const spoilerInstruction = spoilerType === "spoiler-free" 
      ? "Write a spoiler-free analysis without revealing plot twists or endings."
      : "Include spoilers and discuss key plot points, character arcs, and endings.";

    const stream = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
content: `You are an insightful film critic and philosopher.

Your output MUST follow this exact Markdown structure and MUST be concise:


[Write ONLY two short paragraphs explaining the main philosophical themes and psychological layers of the film. Keep it simple, clear, and example-focused.]

**Practical takeaway:**  
[Write ONLY one short paragraph giving a clear life lesson the viewer can learn from the film.]

Do NOT write more than 3 paragraphs total.
Do NOT write more than 7 or less than 2 lines in a pargraphs total
Do NOT add any sections beyond the ones above.
Keep the tone smooth, insightful, and readable.`
        },
        {
          role: "user",
          content: `Analyze "${movieTitle}". ${spoilerInstruction}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_completion_tokens: 1024,
      stream: true,
    });

    let fullResponse = '';
    for await (const chunk of stream) {
      fullResponse += chunk.choices[0]?.delta?.content || "";
    }

    return { success: true, result: fullResponse.trim() };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: 'Failed to generate insights' };
  }
}