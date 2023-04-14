import autopopulate from "mongoose-autopopulate";
import mongoose from 'mongoose';
const { Schema } = mongoose;



const TransactionSchema = new mongoose.Schema({
    product: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      autopopulate: { select: 'name' } 
    }],
    productName: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    sellingPrice: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "mpesa"],
      required: true
    },
    status: {
      type: String,
      enum: ["approved", "pending", "declined"],
      required: true
    },
    today: {
      type: Date,
      default: Date.now
    }
  }, { timestamps: true });
  
  TransactionSchema.plugin(autopopulate);
  
  export default mongoose.model("Transaction", TransactionSchema);
