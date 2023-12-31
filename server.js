// SERVER
import express, { urlencoded, json } from "express";
import session from "express-session";
import { config } from "dotenv";
import { connectDB } from "./public/db/dbConn.js";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { writeFile, readFileSync } from "fs";
import crypto from "crypto";
import { Post } from "./public/db/models/post.js";
import { router as userRoute } from "./routes/User.js";
import { router as postsRoute } from "./routes/Posts.js";
import { router as engagementRoute } from "./routes/Engagement.js";
import { router as apiRoute } from "./routes/Api.js";
import { router as uploadsRoute } from "./routes/Uploads.js";
import { generateForecast } from "./public/js/forecast.js";
config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3500;
const currentFileUrl = import.meta.url;
export const currentDir = dirname(fileURLToPath(currentFileUrl));

//session
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
//images, scripts and css
app.use(express.static(join(currentDir, "/public")));
app.use("/uploads", express.static("uploads"));
app.use(urlencoded({ extended: false }));
app.use(json());
//Routes
app.use("/", userRoute);
app.use("/", postsRoute);
app.use("/", engagementRoute);
app.use("/", apiRoute);
app.use("/", uploadsRoute);

// <=========================== HELPER FUNCTIONS ===========================> //

export function isContainUser(userList, user) {
  let contain = false;
  if (!user) {
    return contain;
  }
  userList.forEach((user_) => {
    if (user_.userID == user.userID) {
      contain = true;
    }
  });
  return contain;
}
export function generateKey() {
  const key = crypto.randomBytes(16).toString("base64");
  const sanitizedKey = key.replace(/[^a-zA-Z0-9-]/g, "-");
  return sanitizedKey;
}

export async function getPost(postId) {
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

// <============ MAIN ROUTES ============> //

app.get("/community(.html)?", (req, res) => {
  res.sendFile(join(currentDir, "views", "community.html"));
});

// <=========================== 404 ===========================> //
app.all("*", (req, res) => {
  res.sendFile(join(currentDir, "views", "community.html"));
});

// <=========================== DB + SERVER ===========================> //
mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(PORT, () => {
    console.log(`Server ruuning on ${PORT}`);
  });
});

// <=========================== FORECAST ===========================> //
