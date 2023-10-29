"use strict";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  country: String,
  age: Number,
  email: String,
  handle: String,
  password: String,
  dateJoined: String,
  userID: String,
  img: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  likeCount: Number,
  postCount: Number,
  yearsSurfing: String,
});

export const User = mongoose.model("User", userSchema);

export async function createUser(
  name,
  country,
  age,
  email,
  handle,
  password,
  img,
  yearsSurfing
) {
  console.log(yearsSurfing);
  const user = new User({
    name: name,
    country: country,
    age: age,
    email: email,
    handle: handle,
    password: password,
    dateJoined: new Date().toISOString().split("T")[0],
    userID: Math.floor(Date.now()).toString(),
    img: img,
    friends: [],
    likeCount: 0,
    postCount: 0,
    yearsSurfing: yearsSurfing,
  });
  await user.save().catch((err) => console.error("Error creating user:", err));
}

export async function findUser(email, password) {
  const user = await User.findOne({
    email: email,
    password: password,
  }).exec();
  if (!user) {
    console.log("User not found");
    return null;
  }
  console.log("Found user");
  return user;
}

export async function findUserById(id) {
  const user = await User.findOne({
    userID: id,
  }).exec();
  if (!user) {
    console.log("User not found");
    return null;
  }
  console.log("Found user by id");
  return user;
}
