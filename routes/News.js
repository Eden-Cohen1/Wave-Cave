import { generateForecast } from "./public/js/forecast.js";
import { fetchArticles, wrapArticles, lastAPIcall } from "./public/js/news.js";
app.get("/news", async (req, res) => {
  UpdateForecastDB();
  const articles = await fetchAndProccessArticles();
  res.json(articles);
});

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
