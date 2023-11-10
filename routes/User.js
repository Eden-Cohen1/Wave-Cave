import {
  findUser,
  findUserById,
  findUserBySearch,
} from "../public/db/models/user.js";
import { findPostsBySearch } from "../public/db/models/post.js";
import { generateKey, getPost, isContainUser } from "../server.js";
import express from "express";

export const router = express.Router();

function generateNotifHtml(user) {
  let html = "";
  user.notifications
    .slice()
    .reverse()
    .forEach((notif) => {
      html += notif.generateHtml();
    });
  return html;
}
function generateLikesHtml(likes) {
  let html = "";
  likes.forEach((like) => {
    html += `<div class="user-link user-click" id=${like.userID}>
    <a class="profile-link">
    <div class="profile-photo curr-user">
      <img src=${like.img} />
    </div>
    <div class="handle">
      <h4>${like.name}</h4>
    </div>
  </a>
</div>`;
  });
  return html;
}
function generateFollowersHtml(follows) {
  let html = "";
  follows.forEach((follow) => {
    html += `<div class="user-link user-click" id=${follow.userID}>
    <a class="profile-link">
    <div class="profile-photo curr-user">
      <img src=${follow.img} />
    </div>
    <div class="handle">
      <h4>${follow.name}</h4>
    </div>
  </a>
</div>`;
  });
  return html;
}
async function generateSearchResults(users, posts, currentUser) {
  let html = `<h3>Search Results</h3>`;
  users?.forEach((user) => {
    html += `<div class="user-link user-click user-search result" id=${user.userID}>
    <a class="profile-link user-click" id=${user.userID}>
    <div class="profile-photo curr-user">
      <img src=${user.img} />
    </div>
    <div class="handle">
      <h4>${user.name}</h4>
    </div>
  </a>
  </div>`;
  });
  let liked, isMine;
  posts?.forEach((post) => {
    liked = isContainUser(post.likes, currentUser);
    isMine = currentUser?.userID == post.user.userID;
    html += post.generateHtml(liked, false, isMine);
  });
  return html;
}
router.post(`/login`, async (req, res) => {
  const { email, password } = req.body;
  const currentUser = await findUser(email, password);
  const sessionKey = generateKey();
  if (!currentUser) {
    res.json(null);
    return;
  }
  req.session.user = currentUser;
  req.session.userID = currentUser.userID;
  req.session.authorized = true;
  const notificationsHtml = generateNotifHtml(currentUser);
  res.json({ currentUser, sessionKey, notifHtml: notificationsHtml });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/community.html");
});
router.post("/user", async (req, res) => {
  if (req.session.authorized) {
    const currentUser = await findUserById(req.session.userID);
    const notificationsHtml = generateNotifHtml(currentUser);
    res.json({ user: currentUser, notifHtml: notificationsHtml });
  } else {
    console.log("session not authorized");
    res.json(null);
  }
});

router.post("/likes", async (req, res) => {
  const { postId } = req.body;
  const post = await getPost(postId);
  const html = generateLikesHtml(post.likes);
  res.json({ html });
});
router.post("/following", async (req, res) => {
  const { userID } = req.body;
  const user = await findUserById(userID);
  const html = generateFollowersHtml(user.following);
  res.json({ html });
});
router.post("/followers", async (req, res) => {
  const { userID } = req.body;
  const user = await findUserById(userID);
  const html = generateFollowersHtml(user.followers);
  res.json({ html });
});
router.post("/search", async (req, res) => {
  let currentUser;
  if (req.session.authorized) {
    currentUser = await findUserById(req.session.userID);
  }
  const { searchTerm } = req.body;
  const usersFound = await findUserBySearch(searchTerm);
  const postsFound = await findPostsBySearch(searchTerm);
  const html = await generateSearchResults(usersFound, postsFound, currentUser);
  console.log(html);
  res.json({ html });
});
