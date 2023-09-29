import fs from "fs/promises";
class DayForecast {
  constructor(date, am6, am9, am12, pm3, pm6) {
    this.am6 = am6;
    this.am12 = am12;
    this.am9 = am9;
    this.pm3 = pm3;
    this.pm6 = pm6;
    this.date = date;
  }
}
const MAX_WIND = 30;
const MAX_WAVES = 2.7;
class HourForecast {
  constructor(height, wind, swell, hour) {
    this.hour = hour;
    this.height = `${height}m`;
    this.wind = wind < 1 ? "1 kph" : `${wind} kph`;
    this.swell = `${Math.round(swell)}s`;
    this.rating =
      ((height - 0.1) / (MAX_WAVES - 0.5)) *
      ((MAX_WIND - Number(wind)) / (MAX_WIND - 1)) *
      5;
    this.rating = this.rating > 5 ? 5 : this.rating.toFixed(1);
  }
}

let israelData, sriData, indoData, maldivesData;

function formatForcast(data) {
  let dayForecast;
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekForcast = [];
  for (let i = 0; i < 7; i++) {
    const hours = [];
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + i);
    const day = targetDate.getDay();
    const formattedDate = `${daysOfWeek[day]}, ${targetDate.getDate()}/${
      targetDate.getMonth() + 1
    }`;
    for (let j = 0; j < 15; j += 3) {
      const hour = new HourForecast(
        data[j + i * 24].waveHeight.sg,
        Math.round(data[j + i * 24].windSpeed20m.noaa * 3.6),
        data[j + i * 24].swellPeriod.sg + 1,
        `${(j + 6) % 12}${j > 6 ? "PM" : "AM"}`
      );
      hours.push(hour);
    }
    dayForecast = new DayForecast(formattedDate, ...hours);
    weekForcast.push(dayForecast);
  }
  return weekForcast;
}

export const generateForecast = async function () {
  //setting time
  const params =
    "waveHeight,airTemperature,swellPeriod,windSpeed,windSpeed20m,windDirection,windSpeed50m,windSpeed100m,windSpeed1000hpa,windSpeed200hpa";
  const start = new Date();
  const lastForecastApiCall = start.toISOString().split("T")[0];
  start.setUTCHours(3, 0, 0, 0);
  const timestampStart = start.getTime() / 1000;
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 7);
  end.setUTCHours(3, 0, 0, 0);
  const timestampEnd = end.getTime() / 1000;
  //lat & lng
  const israelLat = 32.017444;
  const israelLng = 34.735509;
  const sriLat = 5.97117;
  const sriLng = 80.427206;
  const indolLat = -8.654951;
  const indoLng = 115.12488;
  const maldiveLat = 4.307837;
  const maldiveLng = 73.577551;
  await fs.writeFile("./public/db/lastApiCall.txt", lastForecastApiCall);
  //Hilton, TelAviv - Israel
  israelData = await fetchData(
    israelLat,
    israelLng,
    params,
    timestampStart,
    timestampEnd
  );
  //Cocunat Point - Weligama, Sri Lanka
  sriData = await fetchData(
    sriLat,
    sriLng,
    params,
    timestampStart,
    timestampEnd
  );
  //Uluwatu - Bali, Indonessia
  indoData = await fetchData(
    indolLat,
    indoLng,
    params,
    timestampStart,
    timestampEnd
  );
  //The Jailbreaks Surf Point, Himmafushi, Maldives
  maldivesData = await fetchData(
    maldiveLat,
    maldiveLng,
    params,
    timestampStart,
    timestampEnd
  );
  return {
    israel: formatForcast(israelData["hours"]),
    srilanka: formatForcast(sriData["hours"]),
    indonessia: formatForcast(indoData["hours"]),
    maldives: formatForcast(maldivesData["hours"]),
  };
};

async function fetchData(lat, lng, params, start, end) {
  const api_key =
    "faf29aa6-5c66-11ee-8d52-0242ac130002-faf29b0a-5c66-11ee-8d52-0242ac130002";
  // const api_key =
  //   "ccb6ca00-39ec-11ee-8b7f-0242ac130002-ccb6ca64-39ec-11ee-8b7f-0242ac130002";
  return fetch(
    `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${start}&end=${end}`,
    {
      headers: {
        Authorization: api_key,
      },
    }
  )
    .then((response) => {
      console.log(response.status);
      return response.json();
    })
    .then((jsonData) => {
      return jsonData;
      // Do something with response data.
    });
}
