import Transaction from "../models/Transaction.js"
import Product from "../models/Product.js"
import mongoose from 'mongoose';
import moment from 'moment';


export const createTransaction = async (req, res, next) => {
  try {
    // Fetch the product from the database
    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if there is enough quantity of the product
    if (product.quantity < req.body.quantity) {
      return res.status(400).json({ message: "Not enough quantity of the product" });
    }

    // Create a new transaction object with the product assigned to it
    const newTransaction = new Transaction({
      product: product._id,
      productName: product.name,  // add the product name to the transaction object
      quantity: req.body.quantity,
      sellingPrice: req.body.sellingPrice,
      totalPrice: req.body.quantity * req.body.sellingPrice,
      paymentMethod: req.body.paymentMethod,
      status: req.body.status,
    });

    // Update the product quantity
    product.quantity -= req.body.quantity;
    await product.save();

    // Save the new transaction to the database
    const savedTransaction = await newTransaction.save();

    res.status(200).json(savedTransaction);
  } catch (err) {
    next(err);
  }
};

export const getTransaction = async (req,res,next) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate("product");
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().populate({
      path: "product",
      select: "name"
    });
    res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
};

export const updateTransaction = async (req,res,next) => {
  try{
      const updatedTransaction = await Transaction.findByIdAndUpdate(
          req.params.id, 
          {$set:req.body},
          {new:true}
          )
      res.status(200).json(updatedTransaction);
      }catch (err) {
          next(err);
        }
}



export const deleteTransaction = async (req, res, next) => {
    try {
      const transaction = await Transaction.findById(req.params.id);
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
  
      // Update the product quantity when deleting a transaction
      const foundProduct = await Product.findById(transaction.product);
      if (!foundProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      foundProduct.quantity += transaction.quantity;
      await foundProduct.save();
  
      await transaction.deleteOne();
  
      res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (err) {
      next(err);
    }
  };

  export const getTransactionsToday = async (req, res, next) => {
    try {
      const transactions = await Transaction.find({ today: moment().startOf('day').toDate() });
      const totalTransactions = transactions.length;
      res.status(200).json({ totalTransactions });
    } catch (err) {
      next(err);
    }
  };

  export const getFilteredTransactions = async (req, res) => {
    const searchQuery = req.query.search || "";
    const regex = new RegExp(searchQuery, "i");
    const transactions = await Transaction.find({
      $or: [{ productName: regex }, { paymentMethod: regex }, { status: regex }]
    }).populate("product", "name");
    res.status(200).json(transactions);
  };

  export const deleteAllTransactions = async (req, res, next) => {
    try {
      // Find all transactions in the database
      const transactions = await Transaction.find();
  
      // Loop through each transaction and update the product quantity
      for (const transaction of transactions) {
        const foundProduct = await Product.findById(transaction.product);
        if (!foundProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
        foundProduct.quantity += transaction.quantity;
        await foundProduct.save();
      }
  
      // Delete all transactions from the database
      await Transaction.deleteMany();
  
      res.status(200).json({ message: "All transactions deleted successfully" });
    } catch (err) {
      next(err);
    }
  };
  