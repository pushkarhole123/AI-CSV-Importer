import { Request, Response } from "express";
import { parseCSV } from "../services/csvService.js";
import { processWithAI } from "../services/aiService.js";

export const importCSV = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "CSV file is required",
      });
    }

    // Parse CSV
    const records = await parseCSV(req.file.path);

    console.log("========== CSV RECORDS ==========");
    console.log(JSON.stringify(records, null, 2));
    console.log("================================");

    // Send to AI
    const aiResult = await processWithAI(records);

    return res.status(200).json({
      success: true,
      totalRecords: records.length,
      data: JSON.parse(aiResult),
    });

  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};