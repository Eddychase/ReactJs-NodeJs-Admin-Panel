import React, { useEffect, useState } from "react";
import axios from "axios";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Table1 = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/products/${productId}`);
        setProduct(response.data);

        
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={product.id}>
            <TableCell className="tableCell">{product.id}</TableCell>
            <TableCell className="tableCell">
              <div className="cellWrapper">
                
              </div>
            </TableCell>
            <TableCell className="tableCell">{product.name}</TableCell>
            <TableCell className="tableCell">{product.buyingPrice}</TableCell>
            <TableCell className="tableCell">{product.sellingPrice}</TableCell>
            <TableCell className="tableCell">{product.description}</TableCell>
            <TableCell className="tableCell">
              
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Table1;
