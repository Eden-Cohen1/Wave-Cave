"use strict";
import mongoose from "mongoose";
import { User } from "./user.js";
import { Comment } from "./comment.js";
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
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  id: String,
});
postSchema.methods.generateHtml = function (likeActive=false, afterComment=false) {
  likeActive = likeActive ? 'btn-active' : '';
  let showCommentStatus = '';
  let commentSectionStatus = 'hidden';
  if(afterComment){
    showCommentStatus = 'hidden'
    commentSectionStatus = ''
  }
  let likeByHtml;
  let commentsHtml = "";
  this.comments.forEach((comment) => {
    commentsHtml += generateCommentHtml(comment);
  });
  if (this.likes.length > 2) {
    likeByHtml = `
            <span><img src=${this.likes[0]?.img} ></span>
            <span><img src=${this.likes[1]?.img} ></span>
            <span><img src=${this.likes[2]?.img} ></span>
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
            <span><i class="uil uil-heart ${likeActive}" data-item-id=${this.id}></i></span>
            <span><i class="uil uil-comment-dots" data-item-id=${this.id}></i></span>
            <span><i class="uil uil-share-alt" data-item-id=${this.id}></i></span>
          </div>
        </div>
        <div class="liked-by">
            ${likeByHtml}
        </div>
        <div class="comments ${commentSectionStatus}">
            <p class="comment-section">COMMENT SECTION ( ${this.comments.length} )</p>
            ${commentsHtml}
        </div>
        <div class="comment-input ${commentSectionStatus}" id=${this.id}>
        <form class="container post-comment">
          <div class="profile-photo">
            <img src="./images/userImg/me.jpg" alt="profile-photo">
          </div>
            <input type="text" placeholder="Leave a comment" id="post-comment">
            <input type="submit" value="Comment" class="post post-click">
          </form>
          <a class="hide-comments">Hide comments</a>
    </div>
        <div class="text-muted"><a class="view-comments ${showCommentStatus}">View all ${this.comments.length} comments</a></div>

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
    return await post.save();
  } catch (err) {
    console.error("Error Posting:", err);
    throw err;
  }
}

function generateCommentHtml(comment) {
  const html = `<div class="comment">
      <img class="profile-photo curr-user" src=${comment.user.img} alt="">
      <div class="comment-body">
        <h3>${comment.user.name}:</h3>
        <p class="read-more-text">
        ${comment.text}
        </p>
      </div>
      <div class="comment-time">   
      <p class="text-muted"> ${comment.createdAt
        .toLocaleString()
        .split("GMT")[0]
        .slice(0, -3)} </p>
        </div>
    </div>`;
  return html;
}
