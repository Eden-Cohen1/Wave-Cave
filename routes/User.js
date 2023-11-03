import { findUser } from "../public/db/models/user.js";
import { generateKey } from "../server.js";
import express from "express";

export const router = express.Router();

function generateNotifHtml(user) {
  let html = "";
  user.notifications.slice(-5).forEach((notif) => {
    html += notif.generateHtml();
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
router.get("/user", async (req, res) => {
  if (req.session.authorized) {
    res.json(req.session.user);
  } else {
    console.log("session not authorized");
    res.json(null);
  }
});
