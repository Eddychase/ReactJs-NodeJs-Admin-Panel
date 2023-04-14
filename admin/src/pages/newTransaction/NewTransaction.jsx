import "./newTransaction.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { transactionInputs } from "../../formSource";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewTransaction = () => {
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [transactionData, setTransactionData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProductList(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleTransactionDataChange = (e) => {
    setTransactionData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTransaction = {
        ...transactionData,
        productId: selectedProduct,
      };
      await axios.post(
        "/api/transactions",
        newTransaction
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchSelectedProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/products/${selectedProduct}`
        );
        console.log(response.data);
        console.log(response.data.name)
      } catch (err) {
        console.log(err);
      }
    };
    if (selectedProduct) {
      fetchSelectedProduct();
    }
  }, [selectedProduct]);


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Transaction</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <h3>Select a Product:</h3>
            <select value={selectedProduct} onChange={handleProductChange}>
              <option value="">-- Select a product --</option>
              {productList.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              {transactionInputs.map((input) => (
                input.id === "totalPrice" ? null :
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "select" ? (
                    <select
                      id={input.id}
                      onChange={handleTransactionDataChange}
                      value={transactionData[input.id] || ""}
                    >
                      <option value="">{input.placeholder}</option>
                      {input.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={input.id}
                      onChange={handleTransactionDataChange}
                      type={input.type}
                      placeholder={input.placeholder}
                    />
                  )}
                </div>
              ))}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTransaction;
