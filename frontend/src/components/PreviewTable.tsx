type PreviewTableProps = {
  data: Record<string, string>[];
};

function PreviewTable({ data }: PreviewTableProps) {
  if (data.length === 0) {
    return null;
  }

  return (
    <div style={{ margin: "20px 0" }}>
      <h2>CSV Preview</h2>

      <table
        border={1}
        cellPadding={10}
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PreviewTable;