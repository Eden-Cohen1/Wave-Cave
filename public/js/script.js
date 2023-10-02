"use strict";
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
const btnsLocationContainer = document.querySelector(".location-buttons");
const spotHeader = document.querySelector("#spot-header");
const guideP = document.querySelector("#loc-guide-p");
const guideH = document.querySelector("#loc-guide-h");
let tableGroup = document.querySelector(".table-group-1");
let tableDiv = document.createElement("div");
tableDiv.classList.add("table-group");
tableDiv.appendChild(table);
tableGroup.appendChild(tableDiv);

//-----------------------------------------------------------------------

//top of the page when refreshing
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}
// <=========================== INITIATE TABLES ===========================> //
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
      groupImg.src = `/images/surfer${divCounter}.jpg`;
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

// <=========================== UPDATING TABLE WITH DATA ===========================> //

const allTables = document.querySelectorAll(".wave-table");
async function fetchForecastData() {
  return fetch("./db/wavesData.txt")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Cannot read data! Status:${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      return JSON.parse(data);
    });
}
const forecasts = await fetchForecastData();
let forecastLoc;
btnsLocationContainer.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("loc-btn")) {
    const LocationID = e.target.getAttribute("id");
    switch (LocationID) {
      case "indonessia":
        spotHeader.textContent = "📍 Uluwatu - Bali, Indonessia";
        guideP.textContent =
          "Uluwatu is at the forefront of surfing in Bali, thanks to its ability to cope with all sizes of swells on its vast scattered jetty-like reef playground. With kilometers of sandy beaches tucked into cliff-backed, secretive inlets, Ulu's is a wide reef offering 5 different peaks that turn on at different tides. These main 5 waves all break left down the reef with variations sections that change with the size of the swell also.";
        guideH.textContent = "Uluwatu Point Break";

        break;
      case "srilanka":
        spotHeader.textContent = "📍 Coconut Point - Weligama, Sri Lanka";
        guideP.textContent =
          "Coconut point is a classic A frame point break, powerful peeling left and rights for a 400 m ride. Reef entry point or paddle from the sand on the right. Works best at high tide so generally sunrise and sun set. Usually a friendly local around to give you tips on on the best entry and exit points.";
        guideH.textContent = "Coconut Point Break";
        break;
      case "maldives":
        spotHeader.textContent =
          "📍 The Jailbreaks Surf Point, Himmafushi, Maldives";
        guideP.textContent =
          "Jailbreaks in North Male Atoll is an exposed reef break that has reasonably consistent surf. The surf tends to be best in the spring. Offshore winds blow from the south southwest. Groundswells more frequent than windswells and the best swell direction is from the south. There is a right hand reef break. Good surf at all stages of the tide.";
        guideH.textContent = "The Jailbreaks Point Break";
        break;
      default:
        spotHeader.textContent = "📍 Hilton, TelAviv - Israel";
        guideP.textContent =
          "Hilton on the West Coast is an exposed reef/jetties break that has inconsistent surf. Winter is the optimum time of year for surfing here. Works best in offshore winds from the east. Usually gets local windswells, but groundswells do happen and the ideal wave angle is from the southwest. The reef provides both left and right breaks. It's often crowded here. Take care to avoid the rocks.";
        guideH.textContent = "Hilton Reaf Break";
    }

    fillTables(LocationID);
  }
});
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
function fillTables(location) {
  allTables.forEach((table, index) => {
    updateTable(forecasts[location][index], table);
  });
}
fillTables("israel");

function fillStarRating(col, rating) {
  const starList = col.querySelector(".stars");
  const full_stars = Math.floor(rating);
  const isHalfStar = rating - full_stars >= 0.5;
  for (let i = 1; i < full_stars + 1; i++) {
    const star = starList.querySelector(`.star-${i}`);
    star.src = "/images/star-16.png";
  }
  if (isHalfStar) {
    const star = starList.querySelector(`.star-${full_stars + 1}`);
    star.src = "/images/star-half-empty-16.png";
    for (let i = full_stars + 2; i <= 5; i++) {
      const star = starList.querySelector(`.star-${i}`);
      star.src = "/images/empty-star-16.png";
    }
  } else {
    for (let i = full_stars + 1; i <= 5; i++) {
      const star = starList.querySelector(`.star-${i}`);
      star.src = "/images/empty-star-16.png";
    }
  }
}
//-----------------------------------------------------------------------

// <=========================== PAGE NAVIGATION ===========================> //
btnForecast.addEventListener("click", function (e) {
  e.preventDefault();
  const sectionID = e.target.getAttribute("href");
  const section = document.querySelector(sectionID);
  section.scrollIntoView({ behavior: "smooth" });
});

//hover effect

// function handleHover(e) {
//   e.target.style.color = this;
// }
// nav.addEventListener("mouseover", handleHover.bind("#a7ecee"));
// nav.addEventListener("mouseout", handleHover.bind("#f0f8ff"));
// console.log(btnsFooter);
// btnsFooter.forEach((link) =>
//   link.addEventListener("mouseover", handleHover.bind("#a7ecee"))
// );
// btnsFooter.forEach((link) =>
//   link.addEventListener("mouseout", handleHover.bind("#f0f8ff"))
// );

//-----------------------------------------------------------------------

// <=========================== REVEAL IMGES ===========================> //
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

// <=========================== REVEAL TABLES ===========================> //
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
