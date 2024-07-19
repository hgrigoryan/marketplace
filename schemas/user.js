import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        unique : true, 
        required : true, 
        index: true
    },
    password: {
        type: String, 
        required: true
    },
    type: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", userSchema);

export default User;