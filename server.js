const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromise = require("fs").promises;

const logEvents = require("./js/logEvents");
const EventsEmitter = require("events");
const { error } = require("console");
class Emitter extends EventsEmitter {}
//initialize Emitter Object
const myEmitter = new Emitter();
myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));

const { fetchArticles, wrapArticles, lastAPIcall } = require("./js/news");

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
//main();

const PORT = process.env.PORT || 3500;

async function serveFile(filePath, contentType, response) {
  try {
    const rawData = await fsPromise.readFile(
      filePath,
      contentType.includes("image") ? "" : "utf8"
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEmitter.emit("log", `${err.name}: ${err.message}`, "errLog.txt");
    response.statusCode = 500;
    response.end();
  }
}
const server = http.createServer((req, res) => {
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");
  const extention = path.extname(req.url);
  let contentType;
  switch (extention) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }
  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  if (!extention && req.url.slice(-1) !== "/") {
    filePath += ".html";
  }
  const fileExist = fs.existsSync(filePath);

  if (fileExist) {
    console.log("Exists");
    serveFile(filePath, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      //redirecting to home page
      case "old-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      // serve 404
      default:
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server ruuning on port ${PORT}`);
});
