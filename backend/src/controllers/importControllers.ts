import { Request, Response } from "express";
import { parseCSV } from "../services/csvService.js";
import { processWithAI } from "../services/aiService.js";

export const importCSV = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "CSV file is required",
      });
      return;
    }

    // Parse CSV from memory
    const records = await parseCSV(req.file.buffer);

    console.log("========== CSV RECORDS ==========");
    console.log(JSON.stringify(records, null, 2));
    console.log("================================");

    // Process with AI
    const aiResult = await processWithAI(records);

    console.log("========== AI RAW RESPONSE ==========");
    console.log(aiResult);
    console.log("====================================");

    // Remove markdown if AI returns ```json ... ```
    const cleanedResponse = aiResult
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsedData;

    try {
      parsedData = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("========== JSON PARSE ERROR ==========");
      console.error(parseError);
      console.error("Invalid AI Response:");
      console.error(cleanedResponse);
      console.error("======================================");

      res.status(500).json({
        success: false,
        message: "AI returned invalid JSON.",
        rawResponse: cleanedResponse,
      });
      return;
    }

    res.status(200).json({
      success: true,
      totalRecords: records.length,
      data: parsedData,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Internal Server Error",
    });
  }
};