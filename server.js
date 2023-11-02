// SERVER
import express, { urlencoded, json } from "express";
import session from "express-session";
import { config } from "dotenv";
import { connectDB } from "./public/db/dbConn.js";
import mongoose from "mongoose";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import crypto from "crypto";
import { router as userRoute } from "./routes/User.js";
import { router as postsRoute } from "./routes/Posts.js";
import { router as engagementRoute } from "./routes/Engagement.js";
import { router as apiRoute } from "./routes/Api.js";
import { router as uploadsRoute } from "./routes/Uploads.js";

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

// <=========================== DB + SERVER ===========================> //
mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(PORT, () => {
    console.log(`Server ruuning on ${PORT}`);
  });
});
