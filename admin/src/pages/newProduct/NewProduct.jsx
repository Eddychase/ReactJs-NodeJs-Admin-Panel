import "./newProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { productInputs } from "../../formSource";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  
  
  console.log(file)

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
          data.append("file", file);
          setFile("file")
          data.append("upload_preset", "upload");
    try {

      const newProduct = {
        ...info,
      };

      await axios.post("http://localhost:8800/api/products", newProduct);
      navigate("/");
    } catch (err) {console.log(err)}
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form>
              
              {productInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
