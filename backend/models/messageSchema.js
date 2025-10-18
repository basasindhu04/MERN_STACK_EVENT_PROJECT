import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"name required"],
        minlength: [3,"must contain atleast 3 characters"]
    },
    email: {
        type: String,
        required: [true,"emaiil required"],
        validate: [validator.isEmail, "please provide valid email"]
    },
    subject: {
        type: String,
        required: [true,"subject required"],
        minlength: [3,"must contain atleast 5 characters"]
    },
    message: {
        type: String,
        required: [true,"name required"],
        minlength: [10, "must contain atleast 10 characters"]
    }
});

export const Message = mongoose.model("message",messageSchema);