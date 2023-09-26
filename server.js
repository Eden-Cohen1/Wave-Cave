// SERVER
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger, logEvents } = require("./logEvents");
const PORT = process.env.PORT || 3500;

const fs = require("fs");
const fsPromises = require("fs").promises;

// Middleware
//custom middlewate logger
app.use(logger);
//Cross Origin Resource Sharing
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

//loading all images, scripts and css
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Pages, Redirect, 404.
// home
app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
// community
app.get("/community(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "community.html"));
});
// redirect
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, +"/"); // 302
});
// 404
app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

//Error Handler
app.use(function (err, req, res, next) {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
});

//Port
app.listen(PORT, () => {
  console.log(`Server ruuning on port ${PORT}`);
});

// Route handlers
// ---------------------------------------------------------------

//Article Data
const {
  fetchArticles,
  wrapArticles,
  lastAPIcall,
} = require("./public/js/news.js");
const { log } = require("console");

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
const {
  generateForecast,
  lastForecastApiCall,
} = require("./public/js/forecast.js");
exports.fetchAndProccessForecast = async function fetchAndProccessForecast() {
  let allForecast;
  const today = new Date().toISOString();
  if (lastForecastApiCall?.split("T")[0] !== today.split("T")[0]) {
    allForecast = await generateForecast();
    fs.writeFile(
      path.join(__dirname, "db", "wavesData.txt"),
      JSON.stringify(allForecast),
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  } else {
    const jsonString = fs.readFileSync(
      path.join(__dirname, "db", "wavesData.txt"),
      "utf8"
    );
    allForecast = JSON.parse(jsonString);
  }
  return allArticles;
};
async function main2() {
  const allArticles = await fetchAndProccessArticles();
  //update ui with correct data
  console.log(allArticles);
}
