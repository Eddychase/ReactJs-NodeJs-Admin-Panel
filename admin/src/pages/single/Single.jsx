import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import axios from "axios";
import './single.scss'
import { useParams } from "react-router-dom";

const Single = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionResponse = await axios.get(`http://localhost:8800/api/transactions/${id}`);
        console.log(transactionResponse)
        setData(transactionResponse.data);
      } catch (error) {
        console.log(error);
      try {
          const response = await axios.get(`http://localhost:8800/api/products/${id}`);
          console.log(response)
          setData(response.data);
        } catch (err) {
          console.log(err);
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [id]);
  
  if (isLoading) {
    return <div>Loading...</div>; // Add a loading state if the data is not yet available
  }

  // Check if data.productName exists before destructuring
  const { productName, paymentMethod, quantity, status, totalPrice, today, name, description, buyingPrice, minSellingPrice } = data || {};


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{productName || name}</h1>
                {productName ? (
                  <>
                    <div className="detailItem">
                      <span className="itemKey">Payment Method:</span>
                      <span className="itemValue">{paymentMethod}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Quantity:</span>
                      <span className="itemValue">{quantity}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Status:</span>
                      <span className="itemValue">{status}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Price Sold:</span>
                      <span className="itemValue">{totalPrice}kshs</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Date:</span>
                      <span className="itemValue">{today}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="detailItem">
                      <span className="itemKey">Description:</span>
                      <span className="itemValue">{description}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Buying Price:</span>
                      <span className="itemValue">{buyingPrice}kshs</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Min Selling Price:</span>
                      <span className="itemValue">{minSellingPrice}kshs</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Quantity:</span>
                      <span className="itemValue">{quantity}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="right">
          <Chart aspect={3 / 1} title=" ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
         
        </div>
      </div>
    </div>
  );
};

export default Single;
