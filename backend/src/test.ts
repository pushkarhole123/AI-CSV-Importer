import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
});

async function main() {
  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [
        {
          role: "user",
          content: "Reply only with Hello",
        },
      ],
    });

    console.log(response.choices[0].message.content);
  } catch (err) {
    console.error(err);
  }
}

main();