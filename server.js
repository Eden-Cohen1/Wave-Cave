// SERVER
import express, { urlencoded, json } from "express";
import multer from "multer";
import { config } from "dotenv";
import { connectDB } from "./public/db/dbConn.js";
import mongoose from "mongoose";
import { join } from "path";
import cors from "cors";
import { logger, logEvents } from "./logEvents.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { writeFile, readFileSync } from "fs";
import { User } from "./public/db/models/user.js";
config();
//connect to mongoDB
connectDB();
//
const app = express();
const PORT = process.env.PORT || 3500;
const currentFileUrl = import.meta.url;
const currentDir = dirname(fileURLToPath(currentFileUrl));
const whitelist = [
  "https://www.wavecave.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
]; // those are allowed to access the backend application (add React server for example) remove local after development
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
app.use(logger);

//loading all images, scripts and css
app.use(express.static(join(currentDir, "/public")));
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
// redirect
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, +"/"); // 302
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
  const user = await findUser(email, password);
  res.json(user);
});
// 404
app.all("*", (req, res) => {
  res.status(404).sendFile(join(currentDir, "views", "404.html"));
});

//Error Handler
app.use(function (err, req, res, next) {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  res.status(500).send(err.message);
});

mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(PORT, () => {
    console.log(`Server ruuning on ${PORT}`);
  });
});

// Route handlers
// ---------------------------------------------------------------

//Create User//
export async function createUser(
  name,
  country,
  age,
  email,
  handle,
  password,
  img
) {
  const user = new User({
    name: name,
    country: country,
    age: age,
    email: email,
    handle: handle,
    password: password,
    dateJoined: new Date().toISOString().split("T")[0],
    img: img,
  });
  await user
    .save()
    .then((newUser) => {
      console.log("user created: ", newUser);
    })
    .catch((err) => console.error("Error creating user:", err));
}

async function findUser(email, password) {
  const user = await User.findOne({
    email: email,
    password: password,
  }).exec();
  if (!user) {
    throw new Error("User not found");
  }
  console.log("Found user", user);
  return user;
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
// async function main2() {
//   const allArticles = await fetchAndProccessArticles();
//   //update ui with correct data
//   console.log(allArticles);
// }
