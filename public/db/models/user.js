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
  notifications: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
  ],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  likeCount: Number,
  postCount: Number,
  yearsSurfing: String,
});

userSchema.methods.generateProfileHtml = function (
  enableFollowButton = true,
  isFollower = false
) {
  let followState;
  if (!enableFollowButton) {
    followState = "";
  } else {
    followState = isFollower
      ? `<a href="" class="unfollow m-t-10 waves-effect waves-dark btn btn-primary btn-md btn-rounded" data-abc="true">Following</a>`
      : `<a href="" class="follow m-t-10 waves-effect waves-dark btn btn-primary btn-md btn-rounded" data-abc="true">Follow</a>`;
  }
  const html = `<div class="container-profile" id=${this.userID}>
  <div class="col-md-12">
  <div class="card"> <img class="card-img-top" src="./images/wavebg.jpg" alt="Card image cap">
      <div class="card-body little-profile text-center">
          <div class="pro-img"><img src="${this.img}" alt="user"></div>
          <h3 class="m-b-0">${this.name}</h3>
          <p>📌 Surfing <b>${this.yearsSurfing}</b>, From <b>${this.country}</b></p> 
          <div class="row text-center m-t-5 card-bottom">
              <div class="postCount col-lg-4 col-md-4">
              <h3 class="m-b-0 font-light">${this.postCount}</h3><small>Posts</small>
              </div>
              <div class="followersCount col-lg-4 col-md-4" id=${this.userID}>
              <h3 class="m-b-0 font-light followersCount" id=${this.userID}>${this.followers.length}</h3><small>Followers</small>
              </div>
              <div class="followingCount col-lg-4 col-md-4" id=${this.userID}>
              <h3 class="followingCount m-b-0 font-light" id=${this.userID}>${this.following.length}</h3><small>Following</small>
              </div>
          </div>
          ${followState}
        </div>
      </div>
</div>
</div>
<div class="user-posts">
</div>`;
  return html;
};

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
    notifications: [],
    followers: [],
    following: [],
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
  })
    .populate([
      {
        path: "notifications",
        model: "Notification",
        populate: { path: "fromUser", model: "User" },
      },
      { path: "followers", model: "User" },
      { path: "following", model: "User" },
    ])
    .exec();
  if (!user) {
    console.log("User not found");
    return null;
  }
  return user;
}

export async function findUserById(id) {
  const user = await User.findOne({
    userID: id,
  })
    .populate([
      {
        path: "notifications",
        model: "Notification",
        populate: { path: "fromUser", model: "User" },
      },
      { path: "followers", model: "User" },
      { path: "following", model: "User" },
    ])
    .exec();
  if (!user) {
    return null;
  }
  return user;
}
