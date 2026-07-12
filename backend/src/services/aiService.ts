import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import { crmPrompt } from "../prompts/crmPrompt.js";

const apiKey = process.env.OPENROUTER_API_KEY;

if (!apiKey) {
  throw new Error("OPENROUTER_API_KEY is missing.");
}

console.log("API Key Loaded:", apiKey.substring(0, 15) + "...");

const client = new OpenAI({
  apiKey,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function processWithAI(
  records: Record<string, string>[]
): Promise<string> {
  const prompt = `
${crmPrompt}

Input Records:

${JSON.stringify(records, null, 2)}

IMPORTANT:

Return ONLY a valid JSON array.

Do NOT return:

- Markdown
- \`\`\`json
- Explanations
- Notes
- Comments
- Extra text

Return exactly like this:

[
  {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "company": "",
    "country": ""
  }
]
`;

  const response = await client.chat.completions.create({
    model: "openai/gpt-oss-20b:free",

    temperature: 0,

    messages: [
      {
        role: "system",
        content:
          "You are a JSON API. Always return ONLY valid JSON. Never return markdown or explanations.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const result = response.choices[0].message.content;

  if (!result) {
    throw new Error("AI returned an empty response.");
  }

  console.log("========== AI RAW RESPONSE ==========");
  console.log(result);
  console.log("====================================");

  return result.trim();
}