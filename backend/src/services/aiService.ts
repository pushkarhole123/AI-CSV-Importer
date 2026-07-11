import dotenv from "dotenv";
dotenv.config();



import OpenAI from "openai";
import { crmPrompt } from "../prompts/crmPrompt.js";

console.log("API Key:", process.env.OPENROUTER_API_KEY);

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function processWithAI(
    records: any[]
): Promise<string> {

    const prompt = `
${crmPrompt}

Input Records:

${JSON.stringify(records)}

Return ONLY valid JSON.
`;

    const response = await client.chat.completions.create({
    model: "openai/gpt-oss-20b:free",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
});

    const result = response.choices[0].message.content;

    if (!result) {
        throw new Error("AI returned empty response");
    }

console.log("========== AI RAW RESPONSE ==========");
console.log(result);
console.log("====================================");

return result;
}