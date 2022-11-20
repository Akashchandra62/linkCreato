import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : String,
    description: String,
    url: String
})

const User = mongoose.model("users", userSchema);

export default User;