import { useState, useEffect } from "react";
import api from "../services/api";
import Button from "../components/Button";
import InputText from "../components/Input";
import Button2 from "../components/Button2";
import TesUi from "../components/TesUl";

function Home() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Contoh penggunaan axios
    const fetchData = async () => {
      try {
        // Uncomment dan sesuaikan saat API siap
        // const response = await api.get("/posts");
        // // console.log(response.data);
        // setData(response.data);
        setData([{ id: 1, title: "Test Item" }]);
        console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onClickButton = () => {
    setData([...data, { id: data.length + 1, title: "New Item " + data.length }]);
    console.log(data)
  };

  return (
    <div className="flex flex-row gap-5">
      <div>
        <h1>Home Page {input}</h1>
        <Button id="button" onClick={onClickButton}>Klik Saya</Button>
        <TesUi data={data} />
      </div>
      <div>
        {/* <InputText name="username" /> */}
        <InputText onChange={(e) => setInput(e.target.value)} name="password" />
      </div>
      <div>
        <Button2 name="utton2" id="bu" color="blue" hello={"world"} />
      </div>
    </div>
  );
}

export default Home;
