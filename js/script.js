"use strict";
// ELEMENTS
import { DayForecast, HourForecast, generateForecast } from "./forecast.js";
const body = document.querySelector("body");
const table = document.querySelector(".wave-table");
const tablesContainer = document.querySelector(".wave-tables");
const tablesText = tablesContainer.querySelectorAll(".wave-table h2");
const btnForecast = document.querySelector(".forecast");
const btnCommunity = document.querySelector(".community");
const dates = ["17/9", "18/9", "19/9", "20/9", "21/9", "22/9"];
const nav = document.querySelector("nav");
const btnsFooter = document.querySelectorAll(".footer-menu a");
const btnEnter = document.querySelector(".btn-container button");
const mainHeaders = document.querySelector(".main-headers");
const overlay = document.querySelector(".overlay");
const tableElements = document.querySelectorAll("table");
let tableGroup = document.querySelector(".table-group-1");
let tableDiv = document.createElement("div");
tableDiv.classList.add("table-group");
tableDiv.appendChild(table);
tableGroup.appendChild(tableDiv);
btnForecast.style.opacity = 0;
btnCommunity.style.opacity = 0;

//-----------------------------------------------------------------------

//top of the page when refreshing
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}
//ENTER THE CAVE

function allowScroll() {
  body.style["overflow-y"] = "auto";
  const section1 = document.querySelector(".secgalf1");
  // section1.scrollIntoView({ behavior: "smooth" });
  btnEnter.style.opacity = 0;
  btnForecast.style.opacity = 1;
  btnCommunity.style.opacity = 1;
  overlay.style.background = `linear-gradient(rgba(31, 32, 32, 0.184), var(--bg-color))`;
}
btnEnter.addEventListener("click", allowScroll);
//-----------------------------------------------------------------------

// INITIATE TABLES
let divCounter = 2;
init();
function init() {
  const displayTable = function (table, newDate, tableDiv) {
    let newTable = table.cloneNode(true);
    let date = newTable.querySelector("h2");
    date.textContent = newDate;
    tableDiv.appendChild(newTable);
  };
  let tableCounter = 0;
  dates.forEach((date, index) => {
    if (tableCounter === 2) {
      // Create table div + img div
      tableGroup = document.createElement("div");
      tableGroup.classList.add(`table-group-${divCounter}`);
      const imgDiv = document.createElement("div");
      imgDiv.classList.add("img-group");
      tableDiv = document.createElement("div");
      tableDiv.classList.add("table-group");
      // Create an image for the table group
      const groupImg = document.createElement("img");
      groupImg.src = `images/surfer${divCounter}.jpg`;
      groupImg.id = `surfer${divCounter}`;
      groupImg.classList.add("bg-img", "img-hidden");
      imgDiv.appendChild(groupImg);
      // Wrap all the elements together
      tableGroup.appendChild(imgDiv);
      tableGroup.appendChild(tableDiv);
      tablesContainer.appendChild(tableGroup);
      divCounter++;
      tableCounter = 0;
    }
    tableCounter++;
    displayTable(table, date, tableDiv);
  });
}
//-----------------------------------------------------------------------

//UPDATING TABLE WITH DATA [DATA=DATA[HOURS]]
const allTables = document.querySelectorAll(".wave-table");
const forecast = generateForecast();
function updateTable(day, table) {
  // change date header
  const { date } = day;
  const headerLabel = table.querySelector("h2");
  headerLabel.textContent = date;

  //loop over the rows and cols and insert data into a table
  const rows = table.querySelectorAll("tr.data");
  for (let i = 0; i < rows.length; i++) {
    const hour = rows[i].classList[0];
    rows[i].querySelectorAll("th").forEach((col) => {
      const attribute = col.classList[0];
      if (attribute === "rating") {
        fillStarRating(col, day[hour][attribute]);
      } else {
        col.textContent = day[hour][attribute];
      }
    });
  }
}
// loop over all the tables and forecasts to fill
allTables.forEach((table, index) => {
  console.log(table);
  console.log(forecast[index]);
  updateTable(forecast[index], table);
});

function fillStarRating(col, rating) {
  const starList = col.querySelector(".stars");
  const full_stars = Math.floor(rating);
  const isHalfStar = rating - full_stars >= 0.5;
  for (let i = 1; i < full_stars + 1; i++) {
    const star = starList.querySelector(`.star-${i}`);
    star.src = "images/star-16.png";
  }
  if (isHalfStar) {
    const star = starList.querySelector(`.star-${full_stars + 1}`);
    star.src = "images/star-half-empty-16.png";
    for (let i = full_stars + 2; i <= 5; i++) {
      const star = starList.querySelector(`.star-${i}`);
      star.src = "images/empty-star-16.png";
    }
  } else {
    for (let i = full_stars + 1; i <= 5; i++) {
      const star = starList.querySelector(`.star-${i}`);
      star.src = "images/empty-star-16.png";
    }
  }
}
//-----------------------------------------------------------------------

// PAGE NAVIGATION
btnForecast.addEventListener("click", function (e) {
  e.preventDefault();
  const sectionID = e.target.getAttribute("href");
  const section = document.querySelector(sectionID);
  section.scrollIntoView({ behavior: "smooth" });
});

//hover effect

function handleHover(e) {
  e.target.style.color = this;
}
nav.addEventListener("mouseover", handleHover.bind("#a7ecee"));
nav.addEventListener("mouseout", handleHover.bind("#f0f8ff"));
console.log(btnsFooter);
btnsFooter.forEach((link) =>
  link.addEventListener("mouseover", handleHover.bind("#a7ecee"))
);
btnsFooter.forEach((link) =>
  link.addEventListener("mouseout", handleHover.bind("#f0f8ff"))
);

//-----------------------------------------------------------------------

// REVEAL IMGES
const bgImages = document.querySelectorAll(".bg-img");

function reavelImges(entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove("img-hidden");
    observer.unobserve(entry.target);
  }
}
const imgObserver = new IntersectionObserver(reavelImges, {
  root: null,
  threshold: 0.5,
});
bgImages.forEach((img) => imgObserver.observe(img));
//-----------------------------------------------------------------------

// REVEAL TABLES
function revealTable(entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove("table--hidden");
    observer.unobserve(entry.target);
  }
}

const tableObserver = new IntersectionObserver(revealTable, {
  root: null,
  threshold: 0.2,
});
allTables.forEach((table) => tableObserver.observe(table));

//-----------------------------------------------------------------------
