import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        unique : true, 
        required : true, 
        index: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        index: true,
        required: true
    },
    images: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String, 
        required: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model("Product", productSchema);

export default Product;