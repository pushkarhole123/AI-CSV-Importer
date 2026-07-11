import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

async function testGemini() {

    try {

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY!,
        });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Say Hello",
        });

        console.log(response.text);

    } catch (error) {

        console.error(error);

    }

}

testGemini();