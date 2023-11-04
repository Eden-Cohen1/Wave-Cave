import { findUser, findUserById } from "../public/db/models/user.js";
import { generateKey, getPost } from "../server.js";
import express from "express";

export const router = express.Router();

function generateNotifHtml(user) {
  let html = "";
  user.notifications.slice(-5).forEach((notif) => {
    html += notif.generateHtml();
  });
  return html;
}
function generateLikesHtml(likes){
  let html = ""
  likes.forEach(like =>{
    html += `<div class="user-link user-click" id=${like.userID}>
    <a class="profile-link">
    <div class="profile-photo curr-user">
      <img src=${like.img} />
    </div>
    <div class="handle">
      <h4>${like.name}</h4>
    </div>
  </a>
</div>`
  })
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
    res.json({user: currentUser, notifHtml: notificationsHtml});
  } else {
    console.log("session not authorized");
    res.json(null);
  } 
});

router.post('/likes', async(req, res) => {
  const { postId } = req.body;
  const post = await getPost(postId)
  const html = generateLikesHtml(post.likes)
  res.json({html});
})
router.post('/following', async(req, res) => {
  
})
router.post('/followers', async(req, res) => {
  
})
