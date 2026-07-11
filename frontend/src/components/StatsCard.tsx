type Props = {
  total: number;
  processed: number;
  invalid: number;
};

function StatsCard({
  total,
  processed,
  invalid,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          flex: 1,
          background: "#eee",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <h3>Total Records</h3>
        <h1>{total}</h1>
      </div>

      <div
        style={{
          flex: 1,
          background: "#d9ffd9",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <h3>Processed</h3>
        <h1>{processed}</h1>
      </div>

      <div
        style={{
          flex: 1,
          background: "#ffd9d9",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <h3>Invalid</h3>
        <h1>{invalid}</h1>
      </div>
    </div>
  );
}

export default StatsCard;