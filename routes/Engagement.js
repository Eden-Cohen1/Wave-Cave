import { createComment } from "./public/db/models/comment.js";
import { isContainUser } from "../server.js";
// FUNCTIONS
async function unlikePost(post) {
  if (isContainUser(post.likes, currentUser)) {
    const indexToRemove = post.likes.findIndex(
      (user) => user.userID == currentUser.userID
    );
    if (indexToRemove !== -1) {
      post.likes.splice(indexToRemove, 1);
      currentUser.likeCount--;
      await currentUser.save();
    }
    await post.save();
    const html = post.generateHtml();
    return html;
  } else {
    return null;
  }
}
async function likePost(post) {
  if (isContainUser(post.likes, currentUser)) {
    return null;
  } else {
    post.likes.push(currentUser);
    currentUser.likeCount++;
    await currentUser.save();
    await post.save();
    const html = post.generateHtml(true);
    return html;
  }
}
async function follow(userID) {
  const followedUser = await User.findOne({
    userID: userID,
  })
    .populate([
      { path: "followers", model: "User" },
      { path: "following", model: "User" },
    ])
    .exec();
  followedUser.followers.push(currentUser);
  currentUser.following.push(followedUser);
  await followedUser.save();
  await currentUser.save();
  return followedUser.followers.length;
}
async function unFollow(userID) {
  const unfollowedUser = await User.findOne({
    userID: userID,
  })
    .populate([
      { path: "followers", model: "User" },
      { path: "following", model: "User" },
    ])
    .exec();
  let indexToRemove = unfollowedUser.followers.findIndex(
    (user) => user.userID === currentUser.userID
  );
  if (indexToRemove !== -1) {
    unfollowedUser.followers.splice(indexToRemove, 1);
    await unfollowedUser.save();
  }
  indexToRemove = currentUser.following.findIndex(
    (user) => user.userID == unfollowedUser.userID
  );
  if (indexToRemove !== -1) {
    currentUser.following.splice(indexToRemove, 1);
    await currentUser.save();
  }
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
app.post("/comment", async (req, res) => {
  const { text, postId } = req.body;
  const comment = await createComment(text, currentUser);
  const post = await getPost(postId);
  post.comments.push(comment._id);
  await populatePost(post);
  await post.save();
  const isLiked = isContainUser(post.likes, currentUser);
  const html = post.generateHtml(isLiked, true);
  res.json(html);
});

// <============ LIKE ============> //
app.post("/like", async (req, res) => {
  const { postId } = req.body;
  const post = await getPost(postId);
  const response = await likePost(post);
  res.json(response);
});

// <============ UNLIKE ============> //
app.post("/unlike", async (req, res) => {
  const { postId } = req.body;
  const post = await getPost(postId);
  const response = await unlikePost(post);
  res.json(response);
});

// <============ FOLLOW ============> //
app.post("/follow", async (req, res) => {
  const { userID } = req.body;
  const newFollowersCount = await follow(userID);
  res.json(newFollowersCount);
});
// <============ UNFOLLOW ============> //

app.post("/unfollow", async (req, res) => {
  const { userID } = req.body;
  const newFollowersCount = await unFollow(userID);
  res.json(newFollowersCount);
});
