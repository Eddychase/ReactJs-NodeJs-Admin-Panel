import "./widget.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


const Widget = ({ type }) => {
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [daysActive, setDaysActive] = useState(0);
  let data;
  const diff=20;

  

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/transactions")
      .then((response) => {
        const transactions = response.data;
        console.log(transactions)
        const numTransactions = transactions.length;
        const total = transactions.reduce(
          (acc, transaction) => acc + transaction.totalPrice,
          0
        );
        setTotalTransactions(numTransactions);
        setTotalPrice(total);
      })
      .catch((error) => console.log(error));
  
    axios
      .get("http://localhost:8800/api/products")
      .then((response) => {
        const products = response.data;
        const numProducts = products.length;
        setTotalProducts(numProducts);
      })
      .catch((error) => console.log(error));
  
      axios
      .get("http://localhost:8800/api/users")
      .then((response) => {
        const users = response.data;
        console.log(users);
        const numUsers = users.count.total;
        setTotalUsers(numUsers);
        // Calculate the number of days since today
        const today = new Date();
        const activeDate = new Date("2023-03-31"); // Replace this with your desired date
        const days = Math.floor(
          (today.getTime() - activeDate.getTime()) / (1000 * 3600 * 24)
        );
        setDaysActive(days);
      })
      .catch((error) => console.log(error));
  }, [type]);
  

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        count: totalUsers,
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "PRODUCTS",
        count: totalProducts,
        isMoney: false,
        link: "View all products",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "TRANSACTIONS",
        count: totalTransactions,
        isMoney: false,
        link: "View transactions",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "EARNINGS",
        count: totalPrice,
        isMoney: true,
        link: "See earnings",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  
  const { title, count, isMoney, link, icon } = data;
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{title}</span>
        <span className="counter">
          {isMoney && "kshs"}{" "}
          {type === "balance"
            ? totalPrice.toFixed(2)
            : type === "earning"
            ? count
            : count}

        </span>
        <span className="link">{link}</span>
      </div>
      <div className="right">
        {type === "earning" ? (
          <div className={`percentage ${diff >= 0 ? "positive" : "negative"}`}>
            {diff >= 0 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}{" "}
            {Math.abs(diff)} 
          </div>
        ) : (
          <div className="percentage">
            <span>&nbsp;</span>
          </div>
        )}
        {icon}
      </div>
    </div>
  );
};

export default Widget;
