import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-csv-importer-8vu6.onrender.com/api",
});

export default API;