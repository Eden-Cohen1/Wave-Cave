import { createComment } from "../public/db/models/comment.js";
import { isContainUser } from "../server.js";
import { findUserById, User } from "../public/db/models/user.js";
import { Post } from "../public/db/models/post.js";
import { createNotification } from "../public/db/models/notification.js";
import express from "express";

export const router = express.Router();
// FUNCTIONS
async function addNotification(toUser, fromUser, actionText, gotoId, type) {
  const notification = await createNotification(
    toUser,
    fromUser,
    actionText,
    gotoId,
    type
  );
  toUser.notifications.push(notification);
  await toUser.save();
}
async function unlikePost(post, currentUser) {
  if (isContainUser(post.likes, currentUser)) {
    const indexToRemove = post.likes.findIndex(
      (user) => user.userID == currentUser.userID
    );
    if (indexToRemove !== -1) {
      post.likes.splice(indexToRemove, 1);
      post.user.likeCount--;
      await post.user.save();
    }
    await post.save();
    const html = post.generateHtml();
    return html;
  } else {
    return null;
  }
}
async function likePost(post, currentUser) {
  if (isContainUser(post.likes, currentUser)) {
    return null;
  } else {
    post.likes.push(currentUser);
    post.user.likeCount++;
    await post.user.save();
    await post.save();
    const html = post.generateHtml(true);
    return html;
  }
}
async function follow(userID, currentUser) {
  const followedUser = await findUserById(userID);
  followedUser.followers.push(currentUser);
  currentUser.following.push(followedUser);
  addNotification(
    followedUser,
    currentUser,
    "Started following you",
    currentUser.userID,
    "user-profile"
  );
  console.log(followedUser.name, currentUser.name);
  await currentUser.save();
  return followedUser.followers.length;
}
async function unFollow(userID, currentUser) {
  const unfollowedUser = await findUserById(userID);
  let indexToRemove = unfollowedUser.followers.findIndex(
    (user) => user.userID === currentUser.userID
  );
  if (indexToRemove !== -1) {
    unfollowedUser.followers.splice(indexToRemove, 1);
  }
  indexToRemove = currentUser.following.findIndex(
    (user) => user.userID == unfollowedUser.userID
  );
  if (indexToRemove !== -1) {
    currentUser.following.splice(indexToRemove, 1);
  }
  await currentUser.save();
  await unfollowedUser.save();

  return unfollowedUser.followers.length;
}
async function populatePost(post) {
  await post.populate([
    { path: "likes", model: "User" },
    {
      path: "comments",
      model: "Comment",
      populate: { path: "user", model: "User" },
    },
  ]);
}
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
// <============ COMMENT ============> //
router.post("/comment", async (req, res) => {
  const currentUser = await findUserById(req.session.userID);
  const { text, postId } = req.body;
  const comment = await createComment(text, currentUser);
  const post = await getPost(postId);
  post.comments.push(comment._id);
  await populatePost(post);
  await post.save();
  const isLiked = isContainUser(post.likes, currentUser);
  const html = post.generateHtml(isLiked, true);
  addNotification(
    post.user,
    currentUser,
    "Commented on your post",
    postId,
    "post"
  );
  res.json(html);
});

// <============ LIKE ============> //
router.post("/like", async (req, res) => {
  const currentUser = await findUserById(req.session.userID);
  const { postId } = req.body;
  const post = await getPost(postId);
  const response = await likePost(post, currentUser);
  addNotification(post.user, currentUser, "Liked your post", postId, "post");
  res.json(response);
});

// <============ UNLIKE ============> //
router.post("/unlike", async (req, res) => {
  const currentUser = await findUserById(req.session.userID);
  const { postId } = req.body;
  const post = await getPost(postId);
  const response = await unlikePost(post, currentUser);
  res.json(response);
});

// <============ FOLLOW ============> //
router.post("/follow", async (req, res) => {
  const currentUser = await findUserById(req.session.userID);
  const { userID } = req.body;
  const newFollowersCount = await follow(userID, currentUser);
  res.json(newFollowersCount);
});
// <============ UNFOLLOW ============> //

router.post("/unfollow", async (req, res) => {
  const currentUser = await findUserById(req.session.userID);
  const { userID } = req.body;
  const newFollowersCount = await unFollow(userID, currentUser);
  res.json(newFollowersCount);
});

router.delete("/comment/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log(await Notification.findOneAndDelete({ gotoId: id }));
  const deletedItem = await Comment.findOneAndDelete({ id: id });
  if (deletedItem) {
    res.json({ message: "Item Deleted", deletedItem });
  } else {
    res.status(500).json({ message: "Error deleting item" });
  }
});
