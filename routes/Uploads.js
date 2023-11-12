import express from "express";
import multer from "multer";
import { createPost } from "../public/db/models/post.js";
import { createUser, findUserById } from "../public/db/models/user.js";

export const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Set the file name to the original name
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit for the entire request
    fieldSize: 10 * 1024 * 1024, // 10 MB limit for individual fields (adjust as needed)
  },
});

router.post("/Post", upload.single("postImage"), async (req, res) => {
  const currentUser = await findUserById(req.session.userID);
  const { postBody } = req.body;
  const imgPath = req.body.imgUrl;
  const post = await createPost(currentUser, postBody, imgPath);
  const html = post.generateHtml();
  currentUser.postCount++;
  await currentUser.save();
  res.json(html);
});

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
