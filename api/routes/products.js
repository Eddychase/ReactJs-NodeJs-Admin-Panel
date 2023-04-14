import express from "express"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.js"
const router = express.Router()
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";


router.post("/", createProduct)

router.put("/:id",  updateProduct)

router.delete("/:id",  deleteProduct)

router.get("/:id", getProduct)

router.get("/", getProducts)

export default router;
