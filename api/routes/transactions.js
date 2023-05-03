import express from "express"
import { createTransaction, getTransaction, getTransactions, updateTransaction, deleteAllTransactions, getTransactionsToday, deleteTransaction } from "../controllers/transaction.js"
const router = express.Router()
import { verifyToken } from "../utils/verifyToken.js";

router.post("/",  createTransaction)

router.get("/:id",  getTransaction)

router.get("/",  getTransactions)

router.put("/:id",  updateTransaction)

router.get('/today', getTransactionsToday);

router.delete("/:id", deleteTransaction);

router.delete('/', deleteAllTransactions);

export default router;
