import { createUser, findUser } from "../public/db/models/user.js";
import { generateKey, upload } from "../server.js";
import express from "express";

export const router = express.Router();
router.post("/newUser", upload.single("image"), (req, res) => {
  const name = `${req.body.firstname} ${req.body.lastname}`;
  const { country, age, email, password, timeSurfing } = req.body;
  const profileImg = req.file?.path || "./images/profile-photo.png";
  const handle = email.split("@")[0];
  createUser(
    name,
    country,
    age,
    email,
    handle,
    password,
    profileImg,
    timeSurfing
  );
  res.redirect("/community.html");
});

router.post(`/login`, async (req, res) => {
  const { email, password } = req.body;
  const currentUser = await findUser(email, password);
  const sessionKey = generateKey();
  if (!currentUser) {
    res.json(null);
    return;
  }
  req.session.user = currentUser;
  req.session.authorized = true;
  res.json({ currentUser, sessionKey });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  console.log(req.session);
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
