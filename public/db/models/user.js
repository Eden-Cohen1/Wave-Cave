import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  country: String,
  age: Number,
  email: String,
  handle: String,
  password: String,
  img: String,
});

export const User = mongoose.model("User", userSchema);
