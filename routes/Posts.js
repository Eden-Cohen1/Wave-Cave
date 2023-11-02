import { Post } from "../public/db/models/post.js";
import { User, findUserById } from "../public/db/models/user.js";
import { isContainUser } from "../server.js";
import express from "express";

export const router = express.Router();
const PAGE_SIZE = 5;

//FUNCTIONS
async function getPostsByUser(User) {
  return await Post.find({ user: User })
    .sort({ createdAt: -1 })
    .limit(10)
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
}
async function getFeed(page, currentUser) {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE)
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
  if (posts.length > 0) {
    const postHtmlList = posts.map((post) => {
      let liked = isContainUser(post.likes, currentUser);
      const html = post.generateHtml(liked);
      return { html: html, id: post.id };
    });
    return postHtmlList;
  }
  return null;
}
// <============ FEED ============> //
router.get("/api/feed", async (req, res) => {
  const currentUser = await findUserById(req.session.userID);
  const page = req.query.page || 1;
  const postHtmlList = await getFeed(page, currentUser);
  console.log(postHtmlList, "11111111111");
  res.json({ postHtmlList, user: currentUser });
});

// <============ MY-PROFILE ============> //
router.get("/api/my-profile", async (req, res) => {
  if (!req.session.authorized) {
    res.json(null);
    return;
  }
  const currentUser = await findUserById(req.session.userID);
  const posts = await getPostsByUser(currentUser);
  const postHtmlList = posts.map((post) => {
    let liked = isContainUser(post.likes, currentUser);
    const html = post.generateHtml(liked);
    return { html: html, id: post.id, user: currentUser };
  });
  const userHtml = currentUser.generateProfileHtml(false);
  res.json({ postHtmlList, user: currentUser, userHtml });
});

// <============ USER-PROFILE ============> //
router.get("/api/profile", async (req, res) => {
  const currentUser = await findUserById(req.session.userID);
  const targetUser = await findUserById(
    req.headers.authorization.split(" ")[1]
  );
  console.log(targetUser, "@@@@@@@@@@@@@@@@@@@");
  const posts = await getPostsByUser(targetUser);
  const isFollow = targetUser.followers.includes(currentUser?._id);
  const postHtmlList = posts.map((post) => {
    let liked = isContainUser(post.likes, currentUser);
    const html = post.generateHtml(liked);
    return { html: html, id: post.id, user: currentUser };
  });
  const enableFollowBtn = currentUser ? true : false;
  const userHtml = targetUser.generateProfileHtml(enableFollowBtn, isFollow);
  res.json({ postHtmlList, user: targetUser, userHtml });
});
