"use strict";
import mongoose from "mongoose";
import { generateKey } from "../../../server.js";
import { User } from "./user.js";
import moment from "moment";
const postSchema = new mongoose.Schema({
  // user: Object,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
postSchema.methods.generateHtml = function (
  likeActive = false,
  afterComment = false,
  isMine = false
) {
  const deletePost = isMine
    ? `<span class="delete" id=${this.id}>
  <i class="uil uil-trash-alt" id=${this.id}></i>
  </span>`
    : "";
  const timeAgo = generateTime(this);
  const state = likeActive ? "btn-active" : "";
  let showCommentState = "";
  let commentSectionState = "hidden";
  if (afterComment) {
    showCommentState = "hidden";
    commentSectionState = "";
  }
  let likeByHtml;
  let commentsHtml = "";
  this.comments.forEach((comment) => {
    commentsHtml += generateCommentHtml(comment);
  });
  if (this.likes.length > 2) {
    likeByHtml = `
            <span><img src=${this.likes[this.likes.length - 1]?.img} ></span>
            <span><img src=${this.likes[this.likes.length - 2]?.img} ></span>
            <span><img src=${this.likes[this.likes.length - 3]?.img} ></span>
            <a class="liked-by-modal"> Liked by ${
              this.likes[this.likes.length - 1].name
            } and ${this.likes.length - 1} others</a>`;
  } else if (this.likes.length == 1) {
    likeByHtml = `
    <span><img src=${this.likes[0]?.img} ></span>
    <a class="liked-by-modal">Liked by </b> ${this.likes[0]?.name}</a>`;
  } else if (this.likes.length == 2) {
    likeByHtml = `            
    <span><img src=${this.likes[this.likes?.length - 1]?.img} ></span>
    <span><img src=${this.likes[this.likes?.length - 2]?.img} ></span>
    <a class="liked-by-modal">Liked by </b> ${
      this.likes[0]?.name
    } and 1 other</a>
    `;
  } else {
    likeByHtml = `0 likes`;
  }
  const imgHtml = this.img.length > 1 ? `<img src=${this?.img}>` : "";
  const html = `<div class="feed" id="${this?.id}">
        <div class="head">
          <div class="user user-click" id=${this?.user?.userID}>
            <div class="profile-photo user-click" id=${this?.user?.userID}>
              <img class="user-click" id=${this?.user?.userID} src=${this?.user?.img}>
            </div>
            <div class="info">
              <h3>${this?.user.name}</h3>
              <small><b>${this?.user.country}</b>, ${timeAgo}</small>
            </div>
          </div>
        ${deletePost}
        </div>
        <div class="photo">
          ${imgHtml}
        </div>
        <div class="caption">
          <p> <b>${this.user.name}: </b> ${this.postText}</p>
        </div>
        <div class="action-buttons">
          <div class="interaction-buttons">
            <span><i class="uil uil-heart ${state}" data-item-id=${this.id}></i></span>
            <span><i class="uil uil-comment-dots" data-item-id=${this.id}></i></span>
          </div>
        </div>
        <div class="liked-by">
            ${likeByHtml}
        </div>
        <div class="comments ${commentSectionState}">
            <p class="comment-section">COMMENT SECTION ( ${this.comments.length} )</p>
            ${commentsHtml}
        </div>
        <div class="comment-input ${commentSectionState}" id=${this.id}>
        <form class="container post-comment">
          <div class="profile-photo curr-user">
            <img src="" alt="profile-photo">
          </div>
            <input type="text" placeholder="Leave a comment" id="post-comment">
            <input type="submit" value="Comment" class="post post-click">
          </form>
          <a class="hide-comments">Hide comments</a>
    </div>
        <div class="text-muted"><a class="view-comments ${showCommentState}">View all ${this.comments.length} comments</a></div>

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
  return await post.save();
}

function generateCommentHtml(comment) {
  const timeAgo = generateTime(comment);
  const html = `<div class="comment">
      <img id=${comment.user.userID} class="profile-photo curr-user user-click" src=${comment.user.img} alt="">
      <div class="comment-body">
        <h3 class="user-click" id=${comment.user.userID}>${comment.user.name}:</h3>
        <p class="read-more-text">
        ${comment.text}
        </p>
        </div>
      <div class="comment-time">
      <p class="text-muted"> ${timeAgo} </p>
        </div>
    </div>`;
  return html;
}

export function generateTime(object) {
  const objectDate = moment(object.createdAt);
  const currentDate = moment();
  const timeAgo = objectDate.from(currentDate);
  return timeAgo;
}

export async function findPostsBySearch(searchTerm) {
  const posts = await Post.find({
    $or: [
      { postText: { $regex: new RegExp(searchTerm, "i") } }, // Search by post text
      {
        user: {
          $in: await User.find({
            name: { $regex: new RegExp(searchTerm, "i") }, // Search by user name
          }).select("_id"),
        },
      },
    ],
  })
    .sort({ createdAt: -1 })
    .populate([
      { path: "user", model: "User" },
      { path: "likes", model: "User" },
      {
        path: "comments",
        model: "Comment",
        populate: { path: "user", model: "User" },
      },
    ])
    .exec();
  return posts;
}
