import { useState } from "react";
import Papa from "papaparse";

import API from "../services/api";
import PreviewTable from "./PreviewTable";
import StatsCard from "./StatsCard";
import Loader from "./Loader";
import SearchBox from "./SearchBox";
import ResultTable from "./ResultTable";    

type CRMRecord = Record<string, string>;

function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState<CRMRecord[]>([]);
  const [result, setResult] = useState<CRMRecord[]>([]);
  const [search, setSearch] = useState("");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const selectedFile = e.target.files[0];

    setFile(selectedFile);

    Papa.parse<CRMRecord>(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setPreview(results.data);
      },
    });
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await API.post("/import", formData);

      console.log(response.data);

      setResult(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Upload Failed!");
    } finally {
      setLoading(false);
    }
  };

  const filteredResult = result.filter((row) =>
    JSON.stringify(row)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const downloadJSON = () => {
    const blob = new Blob(
      [JSON.stringify(result, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "crm-data.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>AI CSV Importer</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />

      <StatsCard
        total={preview.length}
        processed={result.length}
        invalid={preview.length - result.length}
      />

      <PreviewTable data={preview} />

      <br />

      <button
        onClick={handleUpload}
        disabled={loading}
      >
        Upload CSV
      </button>

      {loading && <Loader />}

      {result.length > 0 && (
        <>
          <SearchBox
            value={search}
            onChange={setSearch}
          />

          <button
            onClick={downloadJSON}
            style={{
              marginBottom: "20px",
            }}
          >
            Download JSON
          </button>

          <ResultTable data={filteredResult} />
        </>
      )}
    </div>
  );
}

export default UploadBox;