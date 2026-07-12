import { Readable } from "stream";
import csv from "csv-parser";

export const parseCSV = (
  buffer: Buffer
): Promise<Record<string, string>[]> => {
  return new Promise((resolve, reject) => {
    const results: Record<string, string>[] = [];

    Readable.from(buffer)
      .pipe(csv())
      .on("data", (data: Record<string, string>) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};