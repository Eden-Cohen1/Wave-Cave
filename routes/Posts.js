import { Post } from "../public/db/models/post.js";
import { User, findUserById } from "../public/db/models/user.js";
import { isContainUser } from "../server.js";
import { Notification } from "../public/db/models/notification.js";
import express from "express";

export const router = express.Router();
const PAGE_SIZE = 5;
async function getPost(postId) {
  return await Post.findOne({ id: postId })
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
      console.log(liked);
      const html = post.generateHtml(
        liked,
        false,
        currentUser?.userID == post.user.userID
      );
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
    const html = post.generateHtml(liked, false, true);
    return { html: html, id: post.id, user: currentUser };
  });
  const userHtml = currentUser.generateProfileHtml(false);
  res.json({ postHtmlList, user: currentUser, userHtml });
});

// <============ USER-PROFILE ============> //
router.get("/api/profile", async (req, res) => {
  const currentUser = await findUserById(req.session?.userID);
  const targetUser = await findUserById(
    req.headers.authorization.split(" ")[1]
  );
  const posts = await getPostsByUser(targetUser);
  const isFollow = isContainUser(targetUser.followers, currentUser);
  const postHtmlList = posts.map((post) => {
    let liked = isContainUser(post?.likes, currentUser);
    const html = post.generateHtml(
      liked,
      false,
      currentUser?.userID == post.user.userID
    );
    return { html: html, id: post.id, user: currentUser };
  });
  let enableFollowBtn = currentUser ? true : false;
  enableFollowBtn = currentUser?.userID == targetUser?.userID ? false : true;
  const userHtml = targetUser.generateProfileHtml(enableFollowBtn, isFollow);
  res.json({ postHtmlList, user: targetUser, userHtml });
});
// <============ SINGLE-POST ============> //

router.post("/api/post", async (req, res) => {
  const currentUser = req.session.user;
  const { postId } = req.body;
  const post = await getPost(postId);
  if (!post) {
    res.json(null);
    return;
  }
  const isLiked = isContainUser(post?.likes, currentUser);
  const html = post.generateHtml(
    isLiked,
    false,
    currentUser?.userID == post.user.userID
  );
  res.json(html);
});

// <============ DELETE-POST ============> //
router.delete("/post/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const deletedNorif = await Notification.findOneAndDelete({ gotoId: id });
  console.log(await Notification.findOneAndDelete({ gotoId: id }));
  const deletedItem = await Post.findOneAndDelete({ id: id });
  if (deletedItem) {
    res.json({ message: "Item Deleted", deletedItem });
  } else {
    res.status(500).json({ message: "Error deleting item" });
  }
});
