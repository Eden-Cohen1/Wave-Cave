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
import { router as userRoute } from "./routes/User.js";
import { router as postsRoute } from "./routes/Posts.js";
import { router as engagementRoute } from "./routes/Engagement.js";
import { router as newsRoute } from "./routes/News.js";
import { Post, createPost } from "./public/db/models/post.js";
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
export const upload = multer({ storage: storage });
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
app.use("/user", userRoute);
app.use("/posts", postsRoute);
app.use("/engage", engagementRoute);
app.use("/news", newsRoute);
// <=========================== HELPER FUNCTIONS ===========================> //

const setCurrentUser = async (req, res, next) => {
  // You can fetch and set currentUser here based on the request, e.g., from a session or token
  // For demonstration purposes, let's assume you're using a token for authentication.
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({ token }); // Adjust the query based on your authentication method
    req.currentUser = user; // Set currentUser on the request object
  }

  next(); // Move to the next middleware or route handler
};

export function isContainUser(userList, user) {
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
