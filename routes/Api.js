import { generateForecast } from "../public/js/forecast.js";
import { fetchArticles, wrapArticles } from "../public/js/news.js";
import { writeFile, readFileSync } from "fs";
import { join } from "path";
import { currentDir } from "../server.js";
import express from "express";

export const router = express.Router();
router.get("/news", async (req, res) => {
  const articles = await fetchAndProccessArticles();
  res.json(articles);
});

router.get("^/$|/index(.html)?", (req, res) => {
  UpdateForecastDB();
  console.log("index.html");
  res.sendFile(join(currentDir, "views", "index.html"));
});

async function fetchAndProccessArticles() {
  let allArticles;
  const today = new Date().toISOString();
  const lastApiCall = readFileSync(
    join(currentDir, "public", "db", "lastApiCall.txt"),
    "utf8"
  );
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
