import dotenv from "dotenv";

const result = dotenv.config();

console.log(result);

console.log("KEY =", process.env.OPENROUTER_API_KEY);