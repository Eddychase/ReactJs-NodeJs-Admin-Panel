import "./featured.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Featured = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [dailyTransactions, setDailyTransactions] = useState([]);
  const [dailyTotalPrice, setDailyTotalPrice] = useState([]);
  const [weeklyTotalPrice, setWeeklyTotalPrice] = useState(0);
  const [monthlyTotalPrice, setMonthlyTotalPrice] = useState(0);
  const [totalBuyingPrice, setTotalBuyingPrice] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    axios
      .get("https://admin-panel-shop.onrender.com/api/transactions")
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
        const todayTransactions = transactions.filter((transaction) => {
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
  
        // Filter transactions for this week
        const firstDayOfWeek = new Date(
          today.setDate(today.getDate() - today.getDay())
        );
        const weekTransactions = transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.createdAt);
          return (
            transactionDate >= firstDayOfWeek &&
            transactionDate < new Date(today.setDate(today.getDate() + 1))
          );
        });
  
        // Calculate total price for this week's transactions
        const weekTotalPrice = weekTransactions.reduce(
          (acc, transaction) => acc + transaction.totalPrice,
          0
        );
  
        setWeeklyTotalPrice(weekTotalPrice);
  
      // Filter transactions for this month
      const monthTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        return (
          transactionDate.getMonth() === today.getMonth() &&
          transactionDate.getFullYear() === today.getFullYear()
        );
      });

      // Calculate total price for this month's transactions
      const monthTotalPrice = monthTransactions.reduce(
        (acc, transaction) => acc + transaction.totalPrice,
        0
      );

      setMonthlyTotalPrice(monthTotalPrice);
    })
    .catch((error) => console.log(error));

  
    axios
      .get("https://admin-panel-shop.onrender.com/api/products")
      .then((response) => {
        const products = response.data;
        const totalBuyingPrice = products.reduce(
          (acc, product) => acc + product.buyingPrice,
          0
        );
        setTotalBuyingPrice(totalBuyingPrice);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setProfit(totalPrice - totalBuyingPrice);
  }, [totalPrice, totalBuyingPrice]);



  return (
    <div className="featured">
      
      <div className="bottom">
      <h4 className="title">TRANSACTIONS</h4>
        <div className="featuredChart">
          <CircularProgressbar value={totalTransactions} text={dailyTransactions.length} strokeWidth={5} />
        </div>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Today</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">{dailyTotalPrice}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">{weeklyTotalPrice}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">{monthlyTotalPrice}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="top">
        
      </div>
      <div className="bottom">
        <div className="summary">
          
          <div className="item">
            <div className="itemTitle">Expenses</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">{totalBuyingPrice}</div>
            </div>
          </div>
          <div className="item">
            
          </div>
          <div className="item">
            <div className="itemTitle">Profit</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">{profit}</div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
  
};

export default Featured;
