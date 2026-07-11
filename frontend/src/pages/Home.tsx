import UploadBox from "../components/UploadBox";

function Home() {

  return (

    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        AI CSV Importer
      </h1>

      <UploadBox />

    </div>

  );

}

export default Home;