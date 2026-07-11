type Props = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBox({
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      style={{
        width: "100%",
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
      }}
    />
  );
}

export default SearchBox;