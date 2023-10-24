"use strict";
import mongoose from "mongoose";
import { User } from "./user.js";
import { generateKey } from "../../../server.js";
const postSchema = new mongoose.Schema({
  user: Object,
  postText: String,
  time: {
    type: String,
    default: new Date().toLocaleString(),
  },
  img: {
    type: String,
    default: "",
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  id: String,
});
postSchema.methods.generateHtml = function () {
  let likeByHtml;
  if (this.likes.length > 2) {
    likeByHtml = `
            <span><img src=${this.likes[0]?.photo} ></span>
            <span><img src=${this.likes[1]?.photo} ></span>
            <span><img src=${this.likes[2]?.photo} </span>
            <p>Liked by ${this.likes.length - 1} people</p>`;
  } else {
    likeByHtml = `<p>Liked by </b> ${this.likes.length} people</p>`;
  }
  const imgHtml = this.img ? `<img src=${this.img}>` : "";
  const html = `<div class="feed" id="${this.id}">
        <div class="head">
          <div class="user">
            <div class="profile-photo">
              <img src=${this.user.img}>
            </div>
            <div class="info">
              <h3>${this.user.name}</h3>
              <small><b>${this.user.country}</b>, ${this.time}</small>
            </div>
          </div>
          <span class="edit">
            <i class="uil uil-ellipsis-h"></i>
          </span>
        </div>
        <div class="photo">
          ${imgHtml}
        </div>
        <div class="caption">
          <p> <b>${this.user.name}: </b> ${this.postText}</p>
        </div>
        <div class="action-buttons">
          <div class="interaction-buttons">
            <span><i class="uil uil-heart" data-item-id=${this.id}></i></span>
            <span><i class="uil uil-comment-dots" data-item-id=${this.id}></i></span>
            <span><i class="uil uil-share-alt" data-item-id=${this.id}></i></span>
          </div>
        </div>
        <div class="liked-by">
            ${likeByHtml}
        </div>
        <div class="comment-input hidden" id=${this.id}>
        <form class="container post-comment">
          <div class="profile-photo">
            <img src="./images/userImg/me.jpg" alt="profile-photo">
          </div>
            <input type="text" placeholder="Leave a comment" id="post-comment">
            <input type="submit" value="Comment" class="post">
          </form>
    </div>
        <div class="comments text-muted">View all ${this.comments.length} comments</div>
      </div>`;
  return html;
};

postSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = generateKey();
  }
  next();
});
export const Post = mongoose.model("Post", postSchema);

export async function createPost(currentUser, postBody, postImg) {
  const post = new Post({
    user: currentUser,
    postText: postBody,
    img: postImg,
    time: new Date().toLocaleString(),
  });
  try {
    const newPost = await post.save();
    console.log("post created: ", newPost);
    return newPost;
  } catch (err) {
    console.error("Error Posting:", err);
    throw err;
  }
}
