import "./featured.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [dailyTransactions, setDailyTransactions] = useState([]);
  const [dailyTotalPrice,setDailyTotalPrice] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/transactions")
      .then((response) => {
        const transactions = response.data;
        const numTransactions = transactions.length;
        const total = transactions.reduce(
          (acc, transaction) => acc + transaction.totalPrice,
          0
        );
        setTotalTransactions(numTransactions);
        setTotalPrice(total);
  
        // Filter transactions for today
        const today = new Date();
        const todayTransactions = transactions.filter(transaction => {
          const transactionDate = new Date(transaction.createdAt);
          return (
            transactionDate.getDate() === today.getDate() &&
            transactionDate.getMonth() === today.getMonth() &&
            transactionDate.getFullYear() === today.getFullYear()
          );
        });
  
        // Calculate total price for today's transactions
        const todayTotalPrice = todayTransactions.reduce(
          (acc, transaction) => acc + transaction.totalPrice,
          0
        );
  
        setDailyTransactions(todayTransactions);
        setDailyTotalPrice(todayTotalPrice);
      })
      .catch((error) => console.log(error));
  }, []);
  

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Transactions Today</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={totalTransactions} text={dailyTransactions.length} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">${dailyTotalPrice}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
          {totalPrice}
        </p>
      </div>
    </div>
  );
  
};

export default Featured;
