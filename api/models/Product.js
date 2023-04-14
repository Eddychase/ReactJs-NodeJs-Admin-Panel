import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    buyingPrice: {
        type: Number,
        required: true
    },
    minSellingPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);