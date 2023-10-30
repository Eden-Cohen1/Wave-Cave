// SERVER
import express, { urlencoded, json } from "express";
import session from "express-session";
import multer from "multer";
import { config } from "dotenv";
import { connectDB } from "./public/db/dbConn.js";
import mongoose from "mongoose";
import { join } from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { writeFile, readFileSync } from "fs";
import crypto from "crypto";
import {
  User,
  createUser,
  findUser,
  findUserById,
} from "./public/db/models/user.js";
import { Post, createPost } from "./public/db/models/post.js";
import { createComment } from "./public/db/models/comment.js";
config();
connectDB();
//variables
const PAGE_SIZE = 5;
const app = express();
const PORT = process.env.PORT || 3500;
const currentFileUrl = import.meta.url;
const currentDir = dirname(fileURLToPath(currentFileUrl));
const whitelist = [
  "https://www.wavecave.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      //remove !origin after development
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Set the file name to the original name
  },
});
const upload = multer({ storage: storage });
let currentUser;

app.use(cors(corsOptions));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // One hour
    },
  })
);
//loading all images, scripts and css
app.use(express.static(join(currentDir, "/public")));
app.use("/uploads", express.static("uploads"));
app.use(urlencoded({ extended: false }));
app.use(json());

// <=========================== HELPER FUNCTIONS ===========================> //

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
async function getPostsByUser(userID) {
  return await Post.find({ "user.userID": userID })
    .sort({ createdAt: -1 })
    .limit(10)
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
function isContainUser(userList, user) {
  if (!user) {
    return false;
  }
  for (let u of userList) {
    if (u.userID == user.userID) {
      return true;
    }
  }
  return false;
}
export function generateKey() {
  const key = crypto.randomBytes(16).toString("base64");
  const sanitizedKey = key.replace(/[^a-zA-Z0-9-]/g, "-");
  return sanitizedKey;
}

// <=========================== GET-REQUESTS ===========================> //

// <============ MAIN ROUTES ============> //
app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(join(currentDir, "views", "index.html"));
});
app.get("/community(.html)?", (req, res) => {
  res.sendFile(join(currentDir, "views", "community.html"));
});

// <============ FEED ============> //
app.get("/api/feed", async (req, res) => {
  const page = req.query.page || 1;
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .populate([
      { path: "likes", model: "User" },
      {
        path: "comments",
        model: "Comment",
        populate: { path: "user", model: "User" },
      },
    ])
    .exec();

  const postHtmlList = posts.map((post) => {
    let liked = isContainUser(post.likes, currentUser);
    const html = post.generateHtml(liked);
    return { html: html, id: post.id };
  });
  const user = currentUser;
  res.json({ postHtmlList, user });
});

// <============ MY-POSTS ============> //
app.get("/api/my-profile", async (req, res) => {
  const posts = await getPostsByUser(currentUser.userID);
  const postHtmlList = posts.map((post) => {
    let liked = isContainUser(post.likes, currentUser);
    const html = post.generateHtml(liked);
    return { html: html, id: post.id, user: currentUser };
  });
  const user = currentUser;
  const userHtml = user.generateProfileHtml(true);
  res.json({ postHtmlList, user, userHtml });
});

// <============ USER-PROFILE ============> //
app.get("/api/profile", async (req, res) => {
  const userId = req.headers.authorization.split(" ")[1];
  const posts = await getPostsByUser(userId);
  const user = await User.findOne({
    userID: userId,
  })
    .populate([
      { path: "followers", model: "User" },
      { path: "following", model: "User" },
    ])
    .exec();
  const isFollow = user.followers.includes(currentUser._id);
  const postHtmlList = posts.map((post) => {
    let liked = isContainUser(post.likes, currentUser);
    const html = post.generateHtml(liked);
    return { html: html, id: post.id, user: currentUser };
  });
  const userHtml = user.generateProfileHtml(false, isFollow);
  res.json({ postHtmlList, user, userHtml });
});
// <============ RE_LOGIN/REFRESH ============> //
app.get("/user", async (req, res) => {
  try {
    const userId = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({
      userID: userId,
    })
      .populate([
        { path: "followers", model: "User" },
        { path: "following", model: "User" },
      ])
      .exec();
    if (!user) {
      currentUser = null;
      return res.status(404).json({ message: "User not found" });
    }
    currentUser = user;
    res.json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// <============ NEWS ============> //
app.get("/news", async (req, res) => {
  const articles = await fetchAndProccessArticles();
  res.json(articles);
});

// <=========================== POST-REQUESTS ===========================> //

// <============ SIGN-UP ============> //
app.post("/newUser", upload.single("image"), (req, res) => {
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

// <============ LOGIN ============> //
app.post(`/login`, async (req, res) => {
  const { email, password } = req.body;
  currentUser = await findUser(email, password);
  const sessionKey = generateKey();
  if (!currentUser) {
    res.json(null);
    return;
  }
  res.json({ currentUser, sessionKey });
});

// <============ POSTING ============> //
app.post("/Post", upload.single("postImage"), async (req, res) => {
  const { postBody } = req.body;
  const imgPath = req.body.imgName ? `./uploads/${req.body.imgName}` : "";
  const post = await createPost(currentUser, postBody, imgPath);
  const html = post.generateHtml();
  currentUser.postCount++;
  await currentUser.save();
  res.json(html);
});

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
// <=========================== 404 ===========================> //
app.all("*", (req, res) => {
  res.status(404).sendFile(join(currentDir, "views", "404.html"));
});

// <=========================== DB ===========================> //
mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(PORT, () => {
    console.log(`Server ruuning on ${PORT}`);
  });
});

// <=========================== FORECAST && ARTICLES ===========================> //
import { fetchArticles, wrapArticles, lastAPIcall } from "./public/js/news.js";

async function fetchAndProccessArticles() {
  let allArticles;
  const today = new Date().toISOString();
  // if (lastAPIcall?.split("T")[0] !== today.split("T")[0]) {
  //   const articles = await fetchArticles();
  //   allArticles = wrapArticles(articles);
  //   // add to data-base
  // }
  // else {allArticles = take articles from data base}
  const articles = await fetchArticles();
  allArticles = wrapArticles(articles);
  return allArticles;
}
async function main() {
  const allArticles = await fetchAndProccessArticles();
  //update ui with correct data
}
// ---------------------------------------------------------------
//Forecast Data
import { generateForecast } from "./public/js/forecast.js";
async function UpdateForecastDB() {
  let allForecast;
  const today = new Date().toISOString();
  const lastApiCall = readFileSync(
    join(currentDir, "public", "db", "lastApiCall.txt"),
    "utf8"
  );
  if (lastApiCall?.split("T")[0] !== today.split("T")[0]) {
    allForecast = await generateForecast();
    writeFile(
      join(currentDir, "public", "db", "wavesData.txt"),
      JSON.stringify(allForecast),
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  }
}
UpdateForecastDB();
