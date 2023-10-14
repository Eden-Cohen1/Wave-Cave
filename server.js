// SERVER
import express, { urlencoded, json } from "express";
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
console.log(process.env.DATABASE_URI);
//connect to mongoDB
connectDB();
//
const app = express();
const PORT = process.env.PORT || 3600;
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

app.use(cors(corsOptions));
app.use(logger);

//loading all images, scripts and css
console.log(currentDir);
app.use(express.static(join(currentDir, "/public")));
app.use(urlencoded({ extended: false }));
app.use(json());

//Pages, Redirect, 404.
// home
app.get("^/$|/index(.html)?", (req, res) => {
  const user = new User({
    name: "Eden Cohen",
    country: "Israel",
    age: 26,
    email: "eden2@gmail.com",
    handle: "eden2",
    password: "7450",
    img: "",
  });
  console.log(user);
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
// 404
app.all("*", (req, res) => {
  res.status(404).sendFile(join(currentDir, "views", "404.html"));
});

//Error Handler
app.use(function (err, req, res, next) {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
});

// mongoose
//   .connect(
//     "mongodb+srv://edenfortesting:1ea61d5d14@cluster0.vij0auc.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
//   )
//   .then(() =>
//     app.listen(PORT, () => {
//       console.log(`Server ruuning on ${PORT}`);
//     })
//   );
mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(PORT, () => {
    console.log(`Server ruuning on ${PORT}`);
  });
});
// app.listen(PORT, () => {
//   console.log(`Server ruuning on ${PORT}`);
// });

// Route handlers
// ---------------------------------------------------------------

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
  console.log(allArticles);
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
