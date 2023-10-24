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
const PAGE_SIZE = 5;
config();
connectDB();
//variables
let currentUser;
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

//Pages, Redirect, 404.
// home
app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(join(currentDir, "views", "index.html"));
});
// community
app.get("/community(.html)?", (req, res) => {
  res.sendFile(join(currentDir, "views", "community.html"));
});
//.filter((post) => !loadedPosts.has(post.id));
const loadedPosts = new Set();
app.get("/api/feed", async (req, res) => {
  const page = req.query.page || 1;
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE);
  const uniquePosts = posts;
  const postHtmlList = uniquePosts.map((post) => {
    loadedPosts.add(post.id);
    return { html: post.generateHtml(), id: post.id };
  });
  res.json(postHtmlList);
});
app.get("/user", async (req, res) => {
  try {
    const userId = req.headers.authorization.split(" ")[1];
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    currentUser = user;
    res.json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//newUser form
app.post("/newUser", upload.single("image"), (req, res) => {
  const name = `${req.body.firstname} ${req.body.lastname}`;
  const { country, age, email, password } = req.body;
  const profileImg = req.file?.path || "./images/profile-photo.png";
  const handle = email.split("@")[0];
  createUser(name, country, age, email, handle, password, profileImg);
  res.sendFile(join(currentDir, "views", "community.html"));
});

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

app.post("/Post", upload.single("postImage"), async (req, res) => {
  const { postBody } = req.body;
  const imgPath = req.body.imgName ? `./uploads/${req.body.imgName}` : "";
  const post = await createPost(currentUser, postBody, imgPath);
  const html = post.generateHtml();
  res.json(html);
});

app.post("/like", async (req, res) => {
  const { postId } = req.body;
  const post = await Post.findOne({ id: postId }).exec();
  if (post.likes.includes(currentUser._id, 0)) {
    res.json(null);
  }
  post.likes.push(currentUser);
  await post.save();
  res.json(post);
});
// 404
app.all("*", (req, res) => {
  res.status(404).sendFile(join(currentDir, "views", "404.html"));
});

mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(PORT, () => {
    console.log(`Server ruuning on ${PORT}`);
  });
});

// Route handlers
// ---------------------------------------------------------------
export function generateKey() {
  const key = crypto.randomBytes(16).toString("base64");
  const sanitizedKey = key.replace(/[^a-zA-Z0-9-]/g, "-");
  return sanitizedKey;
}

//Article Data
import { fetchArticles, wrapArticles, lastAPIcall } from "./public/js/news.js";

async function fetchAndProccessArticles() {
  let allArticles;
  const today = new Date().toISOString();
  if (lastAPIcall?.split("T")[0] !== today.split("T")[0]) {
    const articles = await fetchArticles();
    allArticles = wrapArticles(articles);
    // add to data-base
  }
  // else {allArticles = take articles from data base}
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
