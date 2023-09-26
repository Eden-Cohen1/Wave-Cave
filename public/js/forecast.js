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
const MAX_WAVES = 2;
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
    this.rating = this.rating.toFixed(1);
  }
}
const defaultData = [
  {
    airTemperature: {
      dwd: 23.44,
      noaa: 25.87,
      sg: 23.44,
    },
    swellPeriod: {
      dwd: 7.1,
      icon: 7.18,
      noaa: 7.36,
      sg: 7.18,
    },
    time: "2023-09-20T03:00:00+00:00",
    waveHeight: {
      dwd: 0.84,
      icon: 0.91,
      noaa: 0.76,
      sg: 0.91,
    },
    windDirection: {
      icon: 299.63,
      noaa: 295.91,
      sg: 299.63,
    },
    windSpeed: {
      icon: 3.37,
      noaa: 2.94,
      sg: 3.37,
    },
    windSpeed1000hpa: {
      noaa: 2.69,
      sg: 2.69,
    },
    windSpeed100m: {
      noaa: 2.69,
      sg: 2.69,
    },
    windSpeed200hpa: {
      noaa: 33.93,
      sg: 33.93,
    },
    windSpeed20m: {
      noaa: 2.65,
      sg: 2.65,
    },
    windSpeed50m: {
      noaa: 2.68,
      sg: 2.68,
    },
  },
  {
    airTemperature: {
      dwd: 23.47,
      noaa: 25.88,
      sg: 23.47,
    },
    swellPeriod: {
      dwd: 7.03,
      icon: 7.14,
      noaa: 7.34,
      sg: 7.14,
    },
    time: "2023-09-20T04:00:00+00:00",
    waveHeight: {
      dwd: 0.82,
      icon: 0.9,
      noaa: 0.75,
      sg: 0.9,
    },
    windDirection: {
      icon: 300.7,
      noaa: 301.7,
      sg: 300.7,
    },
    windSpeed: {
      icon: 2.88,
      noaa: 2.48,
      sg: 2.88,
    },
    windSpeed1000hpa: {
      noaa: 2.17,
      sg: 2.17,
    },
    windSpeed100m: {
      noaa: 2.17,
      sg: 2.17,
    },
    windSpeed200hpa: {
      noaa: 34.37,
      sg: 34.37,
    },
    windSpeed20m: {
      noaa: 2.15,
      sg: 2.15,
    },
    windSpeed50m: {
      noaa: 2.17,
      sg: 2.17,
    },
  },
  {
    airTemperature: {
      dwd: 24.44,
      noaa: 25.89,
      sg: 24.44,
    },
    swellPeriod: {
      dwd: 6.97,
      icon: 7.1,
      noaa: 7.32,
      sg: 7.1,
    },
    time: "2023-09-20T05:00:00+00:00",
    waveHeight: {
      dwd: 0.8,
      icon: 0.89,
      noaa: 0.75,
      sg: 0.89,
    },
    windDirection: {
      icon: 301.77,
      noaa: 307.49,
      sg: 301.77,
    },
    windSpeed: {
      icon: 2.39,
      noaa: 2.03,
      sg: 2.39,
    },
    windSpeed1000hpa: {
      noaa: 1.65,
      sg: 1.65,
    },
    windSpeed100m: {
      noaa: 1.66,
      sg: 1.66,
    },
    windSpeed200hpa: {
      noaa: 34.8,
      sg: 34.8,
    },
    windSpeed20m: {
      noaa: 1.64,
      sg: 1.64,
    },
    windSpeed50m: {
      noaa: 1.66,
      sg: 1.66,
    },
  },
  {
    airTemperature: {
      dwd: 26.17,
      noaa: 25.9,
      sg: 26.17,
    },
    swellPeriod: {
      dwd: 6.91,
      icon: 7.06,
      noaa: 7.3,
      sg: 7.06,
    },
    time: "2023-09-20T06:00:00+00:00",
    waveHeight: {
      dwd: 0.79,
      icon: 0.88,
      noaa: 0.74,
      sg: 0.88,
    },
    windDirection: {
      icon: 302.84,
      noaa: 313.28,
      sg: 302.84,
    },
    windSpeed: {
      icon: 1.9,
      noaa: 1.57,
      sg: 1.9,
    },
    windSpeed1000hpa: {
      noaa: 1.13,
      sg: 1.13,
    },
    windSpeed100m: {
      noaa: 1.14,
      sg: 1.14,
    },
    windSpeed200hpa: {
      noaa: 35.24,
      sg: 35.24,
    },
    windSpeed20m: {
      noaa: 1.14,
      sg: 1.14,
    },
    windSpeed50m: {
      noaa: 1.15,
      sg: 1.15,
    },
  },
  {
    airTemperature: {
      dwd: 27.54,
      noaa: 26.01,
      sg: 27.54,
    },
    swellPeriod: {
      dwd: 6.87,
      icon: 7.02,
      noaa: 7.32,
      sg: 7.02,
    },
    time: "2023-09-20T07:00:00+00:00",
    waveHeight: {
      dwd: 0.78,
      icon: 0.87,
      noaa: 0.73,
      sg: 0.87,
    },
    windDirection: {
      icon: 299.33,
      noaa: 306.39,
      sg: 299.33,
    },
    windSpeed: {
      icon: 2.24,
      noaa: 1.99,
      sg: 2.24,
    },
    windSpeed1000hpa: {
      noaa: 1.68,
      sg: 1.68,
    },
    windSpeed100m: {
      noaa: 1.68,
      sg: 1.68,
    },
    windSpeed200hpa: {
      noaa: 35.34,
      sg: 35.34,
    },
    windSpeed20m: {
      noaa: 1.64,
      sg: 1.64,
    },
    windSpeed50m: {
      noaa: 1.67,
      sg: 1.67,
    },
  },
  {
    airTemperature: {
      dwd: 28.56,
      noaa: 26.13,
      sg: 28.56,
    },
    swellPeriod: {
      dwd: 6.86,
      icon: 6.98,
      noaa: 7.35,
      sg: 6.98,
    },
    time: "2023-09-20T08:00:00+00:00",
    waveHeight: {
      dwd: 0.77,
      icon: 0.85,
      noaa: 0.73,
      sg: 0.85,
    },
    windDirection: {
      icon: 295.81,
      noaa: 299.5,
      sg: 295.81,
    },
    windSpeed: {
      icon: 2.59,
      noaa: 2.4,
      sg: 2.59,
    },
    windSpeed1000hpa: {
      noaa: 2.22,
      sg: 2.22,
    },
    windSpeed100m: {
      noaa: 2.23,
      sg: 2.23,
    },
    windSpeed200hpa: {
      noaa: 35.43,
      sg: 35.43,
    },
    windSpeed20m: {
      noaa: 2.15,
      sg: 2.15,
    },
    windSpeed50m: {
      noaa: 2.19,
      sg: 2.19,
    },
  },
  {
    airTemperature: {
      dwd: 29.18,
      noaa: 26.24,
      sg: 29.18,
    },
    swellPeriod: {
      dwd: 6.84,
      icon: 6.94,
      noaa: 7.37,
      sg: 6.94,
    },
    time: "2023-09-20T09:00:00+00:00",
    waveHeight: {
      dwd: 0.77,
      icon: 0.84,
      noaa: 0.72,
      sg: 0.84,
    },
    windDirection: {
      icon: 292.3,
      noaa: 292.61,
      sg: 292.3,
    },
    windSpeed: {
      icon: 2.93,
      noaa: 2.82,
      sg: 2.93,
    },
    windSpeed1000hpa: {
      noaa: 2.77,
      sg: 2.77,
    },
    windSpeed100m: {
      noaa: 2.77,
      sg: 2.77,
    },
    windSpeed200hpa: {
      noaa: 35.53,
      sg: 35.53,
    },
    windSpeed20m: {
      noaa: 2.65,
      sg: 2.65,
    },
    windSpeed50m: {
      noaa: 2.71,
      sg: 2.71,
    },
  },
  {
    airTemperature: {
      dwd: 29.68,
      noaa: 26.41,
      sg: 29.68,
    },
    swellPeriod: {
      dwd: 6.87,
      icon: 6.93,
      noaa: 7.34,
      sg: 6.93,
    },
    time: "2023-09-20T10:00:00+00:00",
    waveHeight: {
      dwd: 0.77,
      icon: 0.84,
      noaa: 0.72,
      sg: 0.84,
    },
    windDirection: {
      icon: 298.29,
      noaa: 300.08,
      sg: 298.29,
    },
    windSpeed: {
      icon: 3.77,
      noaa: 3.48,
      sg: 3.77,
    },
    windSpeed1000hpa: {
      noaa: 3.04,
      sg: 3.04,
    },
    windSpeed100m: {
      noaa: 3.04,
      sg: 3.04,
    },
    windSpeed200hpa: {
      noaa: 35.64,
      sg: 35.64,
    },
    windSpeed20m: {
      noaa: 2.92,
      sg: 2.92,
    },
    windSpeed50m: {
      noaa: 2.99,
      sg: 2.99,
    },
  },
  {
    airTemperature: {
      dwd: 29.63,
      noaa: 26.58,
      sg: 29.63,
    },
    swellPeriod: {
      dwd: 6.83,
      icon: 6.92,
      noaa: 7.32,
      sg: 6.92,
    },
    time: "2023-09-20T11:00:00+00:00",
    waveHeight: {
      dwd: 0.77,
      icon: 0.84,
      noaa: 0.73,
      sg: 0.84,
    },
    windDirection: {
      icon: 304.28,
      noaa: 307.54,
      sg: 304.28,
    },
    windSpeed: {
      icon: 4.61,
      noaa: 4.13,
      sg: 4.61,
    },
    windSpeed1000hpa: {
      noaa: 3.32,
      sg: 3.32,
    },
    windSpeed100m: {
      noaa: 3.32,
      sg: 3.32,
    },
    windSpeed200hpa: {
      noaa: 35.75,
      sg: 35.75,
    },
    windSpeed20m: {
      noaa: 3.18,
      sg: 3.18,
    },
    windSpeed50m: {
      noaa: 3.26,
      sg: 3.26,
    },
  },
  {
    airTemperature: {
      dwd: 29.78,
      noaa: 26.74,
      sg: 29.78,
    },
    swellPeriod: {
      dwd: 6.81,
      icon: 6.91,
      noaa: 7.29,
      sg: 6.91,
    },
    time: "2023-09-20T12:00:00+00:00",
    waveHeight: {
      dwd: 0.78,
      icon: 0.84,
      noaa: 0.73,
      sg: 0.84,
    },
    windDirection: {
      icon: 310.27,
      noaa: 315.01,
      sg: 310.27,
    },
    windSpeed: {
      icon: 5.45,
      noaa: 4.79,
      sg: 5.45,
    },
    windSpeed1000hpa: {
      noaa: 3.59,
      sg: 3.59,
    },
    windSpeed100m: {
      noaa: 3.59,
      sg: 3.59,
    },
    windSpeed200hpa: {
      noaa: 35.86,
      sg: 35.86,
    },
    windSpeed20m: {
      noaa: 3.45,
      sg: 3.45,
    },
    windSpeed50m: {
      noaa: 3.54,
      sg: 3.54,
    },
  },
  {
    airTemperature: {
      dwd: 29.41,
      noaa: 26.75,
      sg: 29.41,
    },
    swellPeriod: {
      dwd: 6.76,
      icon: 6.8,
      noaa: 7.26,
      sg: 6.8,
    },
    time: "2023-09-20T13:00:00+00:00",
    waveHeight: {
      dwd: 0.8,
      icon: 0.85,
      noaa: 0.74,
      sg: 0.85,
    },
    windDirection: {
      icon: 316.61,
      noaa: 322.75,
      sg: 316.61,
    },
    windSpeed: {
      icon: 5.52,
      noaa: 4.82,
      sg: 5.52,
    },
    windSpeed1000hpa: {
      noaa: 3.04,
      sg: 3.04,
    },
    windSpeed100m: {
      noaa: 3.04,
      sg: 3.04,
    },
    windSpeed200hpa: {
      noaa: 35.27,
      sg: 35.27,
    },
    windSpeed20m: {
      noaa: 2.91,
      sg: 2.91,
    },
    windSpeed50m: {
      noaa: 3,
      sg: 3,
    },
  },
  {
    airTemperature: {
      dwd: 28.9,
      noaa: 26.75,
      sg: 28.9,
    },
    swellPeriod: {
      dwd: 6.6,
      icon: 6.7,
      noaa: 7.23,
      sg: 6.7,
    },
    time: "2023-09-20T14:00:00+00:00",
    waveHeight: {
      dwd: 0.81,
      icon: 0.87,
      noaa: 0.75,
      sg: 0.87,
    },
    windDirection: {
      icon: 322.96,
      noaa: 330.5,
      sg: 322.96,
    },
    windSpeed: {
      icon: 5.58,
      noaa: 4.84,
      sg: 5.58,
    },
    windSpeed1000hpa: {
      noaa: 2.49,
      sg: 2.49,
    },
    windSpeed100m: {
      noaa: 2.49,
      sg: 2.49,
    },
    windSpeed200hpa: {
      noaa: 34.68,
      sg: 34.68,
    },
    windSpeed20m: {
      noaa: 2.38,
      sg: 2.38,
    },
    windSpeed50m: {
      noaa: 2.45,
      sg: 2.45,
    },
  },
  {
    airTemperature: {
      dwd: 28.05,
      noaa: 26.75,
      sg: 28.05,
    },
    swellPeriod: {
      dwd: 6.45,
      icon: 6.59,
      noaa: 7.2,
      sg: 6.59,
    },
    time: "2023-09-20T15:00:00+00:00",
    waveHeight: {
      dwd: 0.82,
      icon: 0.88,
      noaa: 0.76,
      sg: 0.88,
    },
    windDirection: {
      icon: 329.3,
      noaa: 338.24,
      sg: 329.3,
    },
    windSpeed: {
      icon: 5.65,
      noaa: 4.87,
      sg: 5.65,
    },
    windSpeed1000hpa: {
      noaa: 1.94,
      sg: 1.94,
    },
    windSpeed100m: {
      noaa: 1.94,
      sg: 1.94,
    },
    windSpeed200hpa: {
      noaa: 34.09,
      sg: 34.09,
    },
    windSpeed20m: {
      noaa: 1.84,
      sg: 1.84,
    },
    windSpeed50m: {
      noaa: 1.91,
      sg: 1.91,
    },
  },
  {
    airTemperature: {
      dwd: 27.11,
      noaa: 26.76,
      sg: 27.11,
    },
    swellPeriod: {
      dwd: 6.22,
      icon: 6.47,
      noaa: 7.21,
      sg: 6.47,
    },
    time: "2023-09-20T16:00:00+00:00",
    waveHeight: {
      dwd: 0.83,
      icon: 0.87,
      noaa: 0.77,
      sg: 0.87,
    },
    windDirection: {
      icon: 335.43,
      noaa: 343,
      sg: 335.43,
    },
    windSpeed: {
      icon: 5.39,
      noaa: 4.62,
      sg: 5.39,
    },
    windSpeed1000hpa: {
      noaa: 1.48,
      sg: 1.48,
    },
    windSpeed100m: {
      noaa: 1.48,
      sg: 1.48,
    },
    windSpeed200hpa: {
      noaa: 32.47,
      sg: 32.47,
    },
    windSpeed20m: {
      noaa: 1.41,
      sg: 1.41,
    },
    windSpeed50m: {
      noaa: 1.46,
      sg: 1.46,
    },
  },
  {
    airTemperature: {
      dwd: 26.61,
      noaa: 26.76,
      sg: 26.61,
    },
    swellPeriod: {
      dwd: 6.18,
      icon: 6.35,
      noaa: 7.23,
      sg: 6.35,
    },
    time: "2023-09-20T17:00:00+00:00",
    waveHeight: {
      dwd: 0.82,
      icon: 0.87,
      noaa: 0.77,
      sg: 0.87,
    },
    windDirection: {
      icon: 341.57,
      noaa: 347.77,
      sg: 341.57,
    },
    windSpeed: {
      icon: 5.13,
      noaa: 4.37,
      sg: 5.13,
    },
    windSpeed1000hpa: {
      noaa: 1.03,
      sg: 1.03,
    },
    windSpeed100m: {
      noaa: 1.03,
      sg: 1.03,
    },
    windSpeed200hpa: {
      noaa: 30.86,
      sg: 30.86,
    },
    windSpeed20m: {
      noaa: 0.97,
      sg: 0.97,
    },
    windSpeed50m: {
      noaa: 1.01,
      sg: 1.01,
    },
  },
  {
    airTemperature: {
      dwd: 26.32,
      noaa: 26.77,
      sg: 26.32,
    },
    swellPeriod: {
      dwd: 6.2,
      icon: 6.23,
      noaa: 7.24,
      sg: 6.23,
    },
    time: "2023-09-20T18:00:00+00:00",
    waveHeight: {
      dwd: 0.82,
      icon: 0.86,
      noaa: 0.78,
      sg: 0.86,
    },
    windDirection: {
      icon: 347.7,
      noaa: 352.53,
      sg: 347.7,
    },
    windSpeed: {
      icon: 4.87,
      noaa: 4.12,
      sg: 4.87,
    },
    windSpeed1000hpa: {
      noaa: 0.57,
      sg: 0.57,
    },
    windSpeed100m: {
      noaa: 0.57,
      sg: 0.57,
    },
    windSpeed200hpa: {
      noaa: 29.24,
      sg: 29.24,
    },
    windSpeed20m: {
      noaa: 0.54,
      sg: 0.54,
    },
    windSpeed50m: {
      noaa: 0.56,
      sg: 0.56,
    },
  },
  {
    airTemperature: {
      dwd: 26.1,
      noaa: 26.71,
      sg: 26.1,
    },
    swellPeriod: {
      dwd: 6.23,
      icon: 6.21,
      noaa: 7.22,
      sg: 6.21,
    },
    time: "2023-09-20T19:00:00+00:00",
    waveHeight: {
      dwd: 0.82,
      icon: 0.85,
      noaa: 0.78,
      sg: 0.85,
    },
    windDirection: {
      icon: 344.07,
      noaa: 348.08,
      sg: 344.07,
    },
    windSpeed: {
      icon: 4.54,
      noaa: 4.02,
      sg: 4.54,
    },
    windSpeed1000hpa: {
      noaa: 0.86,
      sg: 0.86,
    },
    windSpeed100m: {
      noaa: 0.86,
      sg: 0.86,
    },
    windSpeed200hpa: {
      noaa: 29.91,
      sg: 29.91,
    },
    windSpeed20m: {
      noaa: 0.82,
      sg: 0.82,
    },
    windSpeed50m: {
      noaa: 0.85,
      sg: 0.85,
    },
  },
  {
    airTemperature: {
      dwd: 25.21,
      noaa: 26.66,
      sg: 25.21,
    },
    swellPeriod: {
      dwd: 6.33,
      icon: 6.2,
      noaa: 7.19,
      sg: 6.2,
    },
    time: "2023-09-20T20:00:00+00:00",
    waveHeight: {
      dwd: 0.82,
      icon: 0.84,
      noaa: 0.77,
      sg: 0.84,
    },
    windDirection: {
      icon: 340.45,
      noaa: 343.63,
      sg: 340.45,
    },
    windSpeed: {
      icon: 4.2,
      noaa: 3.93,
      sg: 4.2,
    },
    windSpeed1000hpa: {
      noaa: 1.14,
      sg: 1.14,
    },
    windSpeed100m: {
      noaa: 1.14,
      sg: 1.14,
    },
    windSpeed200hpa: {
      noaa: 30.57,
      sg: 30.57,
    },
    windSpeed20m: {
      noaa: 1.1,
      sg: 1.1,
    },
    windSpeed50m: {
      noaa: 1.13,
      sg: 1.13,
    },
  },
  {
    airTemperature: {
      dwd: 24.85,
      noaa: 26.61,
      sg: 24.85,
    },
    swellPeriod: {
      dwd: 6.41,
      icon: 6.18,
      noaa: 7.17,
      sg: 6.18,
    },
    time: "2023-09-20T21:00:00+00:00",
    waveHeight: {
      dwd: 0.82,
      icon: 0.83,
      noaa: 0.77,
      sg: 0.83,
    },
    windDirection: {
      icon: 336.82,
      noaa: 339.18,
      sg: 336.82,
    },
    windSpeed: {
      icon: 3.87,
      noaa: 3.83,
      sg: 3.87,
    },
    windSpeed1000hpa: {
      noaa: 1.43,
      sg: 1.43,
    },
    windSpeed100m: {
      noaa: 1.43,
      sg: 1.43,
    },
    windSpeed200hpa: {
      noaa: 31.24,
      sg: 31.24,
    },
    windSpeed20m: {
      noaa: 1.38,
      sg: 1.38,
    },
    windSpeed50m: {
      noaa: 1.42,
      sg: 1.42,
    },
  },
  {
    airTemperature: {
      dwd: 24.45,
      noaa: 26.54,
      sg: 24.45,
    },
    swellPeriod: {
      dwd: 6.47,
      icon: 6.21,
      noaa: 7.12,
      sg: 6.21,
    },
    time: "2023-09-20T22:00:00+00:00",
    waveHeight: {
      dwd: 0.83,
      icon: 0.82,
      noaa: 0.76,
      sg: 0.82,
    },
    windDirection: {
      icon: 337.33,
      noaa: 340.73,
      sg: 337.33,
    },
    windSpeed: {
      icon: 3.71,
      noaa: 3.94,
      sg: 3.71,
    },
    windSpeed1000hpa: {
      noaa: 1.35,
      sg: 1.35,
    },
    windSpeed100m: {
      noaa: 1.35,
      sg: 1.35,
    },
    windSpeed200hpa: {
      noaa: 30.76,
      sg: 30.76,
    },
    windSpeed20m: {
      noaa: 1.3,
      sg: 1.3,
    },
    windSpeed50m: {
      noaa: 1.34,
      sg: 1.34,
    },
  },
  {
    airTemperature: {
      dwd: 23.94,
      noaa: 26.48,
      sg: 23.94,
    },
    swellPeriod: {
      dwd: 6.5,
      icon: 6.25,
      noaa: 7.08,
      sg: 6.25,
    },
    time: "2023-09-20T23:00:00+00:00",
    waveHeight: {
      dwd: 0.83,
      icon: 0.8,
      noaa: 0.76,
      sg: 0.8,
    },
    windDirection: {
      icon: 337.83,
      noaa: 342.28,
      sg: 337.83,
    },
    windSpeed: {
      icon: 3.55,
      noaa: 4.05,
      sg: 3.55,
    },
    windSpeed1000hpa: {
      noaa: 1.26,
      sg: 1.26,
    },
    windSpeed100m: {
      noaa: 1.26,
      sg: 1.26,
    },
    windSpeed200hpa: {
      noaa: 30.28,
      sg: 30.28,
    },
    windSpeed20m: {
      noaa: 1.23,
      sg: 1.23,
    },
    windSpeed50m: {
      noaa: 1.26,
      sg: 1.26,
    },
  },
  {
    airTemperature: {
      dwd: 23.61,
      noaa: 26.42,
      sg: 23.61,
    },
    swellPeriod: {
      dwd: 6.55,
      icon: 6.28,
      noaa: 7.03,
      sg: 6.28,
    },
    time: "2023-09-21T00:00:00+00:00",
    waveHeight: {
      dwd: 0.82,
      icon: 0.79,
      noaa: 0.75,
      sg: 0.79,
    },
    windDirection: {
      icon: 338.34,
      noaa: 343.83,
      sg: 338.34,
    },
    windSpeed: {
      icon: 3.39,
      noaa: 4.16,
      sg: 3.39,
    },
    windSpeed1000hpa: {
      noaa: 1.18,
      sg: 1.18,
    },
    windSpeed100m: {
      noaa: 1.18,
      sg: 1.18,
    },
    windSpeed200hpa: {
      noaa: 29.8,
      sg: 29.8,
    },
    windSpeed20m: {
      noaa: 1.15,
      sg: 1.15,
    },
    windSpeed50m: {
      noaa: 1.18,
      sg: 1.18,
    },
  },
  {
    airTemperature: {
      dwd: 23.2,
      noaa: 26.37,
      sg: 23.2,
    },
    swellPeriod: {
      dwd: 6.57,
      icon: 6.31,
      noaa: 7,
      sg: 6.31,
    },
    time: "2023-09-21T01:00:00+00:00",
    waveHeight: {
      dwd: 0.82,
      icon: 0.78,
      noaa: 0.74,
      sg: 0.78,
    },
    windDirection: {
      icon: 340.38,
      noaa: 347.85,
      sg: 340.38,
    },
    windSpeed: {
      icon: 3.29,
      noaa: 3.76,
      sg: 3.29,
    },
    windSpeed1000hpa: {
      noaa: 0.85,
      sg: 0.85,
    },
    windSpeed100m: {
      noaa: 0.85,
      sg: 0.85,
    },
    windSpeed200hpa: {
      noaa: 30.42,
      sg: 30.42,
    },
    windSpeed20m: {
      noaa: 0.84,
      sg: 0.84,
    },
    windSpeed50m: {
      noaa: 0.86,
      sg: 0.86,
    },
  },
  {
    airTemperature: {
      dwd: 23,
      noaa: 26.31,
      sg: 23,
    },
    swellPeriod: {
      dwd: 6.58,
      icon: 6.34,
      noaa: 6.98,
      sg: 6.34,
    },
    time: "2023-09-21T02:00:00+00:00",
    waveHeight: {
      dwd: 0.81,
      icon: 0.77,
      noaa: 0.72,
      sg: 0.77,
    },
    windDirection: {
      icon: 342.42,
      noaa: 351.86,
      sg: 342.42,
    },
    windSpeed: {
      icon: 3.19,
      noaa: 3.37,
      sg: 3.19,
    },
    windSpeed1000hpa: {
      noaa: 0.53,
      sg: 0.53,
    },
    windSpeed100m: {
      noaa: 0.53,
      sg: 0.53,
    },
    windSpeed200hpa: {
      noaa: 31.03,
      sg: 31.03,
    },
    windSpeed20m: {
      noaa: 0.52,
      sg: 0.52,
    },
    windSpeed50m: {
      noaa: 0.53,
      sg: 0.53,
    },
  },
  {
    airTemperature: {
      dwd: 23.05,
      noaa: 26.26,
      sg: 23.05,
    },
    swellPeriod: {
      dwd: 6.58,
      icon: 6.37,
      noaa: 6.95,
      sg: 6.37,
    },
    time: "2023-09-21T03:00:00+00:00",
    waveHeight: {
      dwd: 0.8,
      icon: 0.76,
      noaa: 0.71,
      sg: 0.76,
    },
    windDirection: {
      icon: 344.46,
      noaa: 355.88,
      sg: 344.46,
    },
    windSpeed: {
      icon: 3.09,
      noaa: 2.97,
      sg: 3.09,
    },
    windSpeed1000hpa: {
      noaa: 0.2,
      sg: 0.2,
    },
    windSpeed100m: {
      noaa: 0.2,
      sg: 0.2,
    },
    windSpeed200hpa: {
      noaa: 31.65,
      sg: 31.65,
    },
    windSpeed20m: {
      noaa: 0.21,
      sg: 0.21,
    },
    windSpeed50m: {
      noaa: 0.21,
      sg: 0.21,
    },
  },
  {
    airTemperature: {
      dwd: 23.02,
      noaa: 26.26,
      sg: 23.02,
    },
    swellPeriod: {
      dwd: 6.58,
      icon: 6.37,
      noaa: 6.94,
      sg: 6.37,
    },
    time: "2023-09-21T04:00:00+00:00",
    waveHeight: {
      dwd: 0.79,
      icon: 0.75,
      noaa: 0.7,
      sg: 0.75,
    },
    windDirection: {
      icon: 350.39,
      noaa: 350.04,
      sg: 350.39,
    },
    windSpeed: {
      icon: 2.88,
      noaa: 2.76,
      sg: 2.88,
    },
    windSpeed1000hpa: {
      noaa: 0.44,
      sg: 0.44,
    },
    windSpeed100m: {
      noaa: 0.44,
      sg: 0.44,
    },
    windSpeed200hpa: {
      noaa: 31.77,
      sg: 31.77,
    },
    windSpeed20m: {
      noaa: 0.43,
      sg: 0.43,
    },
    windSpeed50m: {
      noaa: 0.44,
      sg: 0.44,
    },
  },
  {
    airTemperature: {
      dwd: 24.02,
      noaa: 26.27,
      sg: 24.02,
    },
    swellPeriod: {
      dwd: 6.58,
      icon: 6.37,
      noaa: 6.93,
      sg: 6.37,
    },
    time: "2023-09-21T05:00:00+00:00",
    waveHeight: {
      dwd: 0.78,
      icon: 0.75,
      noaa: 0.68,
      sg: 0.75,
    },
    windDirection: {
      icon: 356.31,
      noaa: 344.2,
      sg: 356.31,
    },
    windSpeed: {
      icon: 2.68,
      noaa: 2.54,
      sg: 2.68,
    },
    windSpeed1000hpa: {
      noaa: 0.69,
      sg: 0.69,
    },
    windSpeed100m: {
      noaa: 0.69,
      sg: 0.69,
    },
    windSpeed200hpa: {
      noaa: 31.9,
      sg: 31.9,
    },
    windSpeed20m: {
      noaa: 0.66,
      sg: 0.66,
    },
    windSpeed50m: {
      noaa: 0.67,
      sg: 0.67,
    },
  },
  {
    airTemperature: {
      dwd: 25.93,
      noaa: 26.28,
      sg: 25.93,
    },
    swellPeriod: {
      dwd: 6.57,
      icon: 6.37,
      noaa: 6.92,
      sg: 6.37,
    },
    time: "2023-09-21T06:00:00+00:00",
    waveHeight: {
      dwd: 0.77,
      icon: 0.74,
      noaa: 0.67,
      sg: 0.74,
    },
    windDirection: {
      icon: 2.24,
      noaa: 338.36,
      sg: 2.24,
    },
    windSpeed: {
      icon: 2.47,
      noaa: 2.33,
      sg: 2.47,
    },
    windSpeed1000hpa: {
      noaa: 0.93,
      sg: 0.93,
    },
    windSpeed100m: {
      noaa: 0.93,
      sg: 0.93,
    },
    windSpeed200hpa: {
      noaa: 32.02,
      sg: 32.02,
    },
    windSpeed20m: {
      noaa: 0.88,
      sg: 0.88,
    },
    windSpeed50m: {
      noaa: 0.9,
      sg: 0.9,
    },
  },
  {
    airTemperature: {
      dwd: 27.61,
      noaa: 26.39,
      sg: 27.61,
    },
    swellPeriod: {
      dwd: 6.56,
      icon: 6.37,
      noaa: 6.9,
      sg: 6.37,
    },
    time: "2023-09-21T07:00:00+00:00",
    waveHeight: {
      dwd: 0.76,
      icon: 0.73,
      noaa: 0.66,
      sg: 0.73,
    },
    windDirection: {
      icon: 353.47,
      noaa: 338.25,
      sg: 353.47,
    },
    windSpeed: {
      icon: 2.55,
      noaa: 2.57,
      sg: 2.55,
    },
    windSpeed1000hpa: {
      noaa: 1.01,
      sg: 1.01,
    },
    windSpeed100m: {
      noaa: 1.01,
      sg: 1.01,
    },
    windSpeed200hpa: {
      noaa: 31.71,
      sg: 31.71,
    },
    windSpeed20m: {
      noaa: 0.97,
      sg: 0.97,
    },
    windSpeed50m: {
      noaa: 0.99,
      sg: 0.99,
    },
  },
  {
    airTemperature: {
      dwd: 28.44,
      noaa: 26.5,
      sg: 28.44,
    },
    swellPeriod: {
      dwd: 6.55,
      icon: 6.36,
      noaa: 6.88,
      sg: 6.36,
    },
    time: "2023-09-21T08:00:00+00:00",
    waveHeight: {
      dwd: 0.75,
      icon: 0.72,
      noaa: 0.65,
      sg: 0.72,
    },
    windDirection: {
      icon: 344.69,
      noaa: 338.15,
      sg: 344.69,
    },
    windSpeed: {
      icon: 2.62,
      noaa: 2.81,
      sg: 2.62,
    },
    windSpeed1000hpa: {
      noaa: 1.09,
      sg: 1.09,
    },
    windSpeed100m: {
      noaa: 1.08,
      sg: 1.08,
    },
    windSpeed200hpa: {
      noaa: 31.41,
      sg: 31.41,
    },
    windSpeed20m: {
      noaa: 1.06,
      sg: 1.06,
    },
    windSpeed50m: {
      noaa: 1.07,
      sg: 1.07,
    },
  },
  {
    airTemperature: {
      dwd: 28.82,
      noaa: 26.6,
      sg: 28.82,
    },
    swellPeriod: {
      dwd: 6.54,
      icon: 6.36,
      noaa: 6.86,
      sg: 6.36,
    },
    time: "2023-09-21T09:00:00+00:00",
    waveHeight: {
      dwd: 0.73,
      icon: 0.71,
      noaa: 0.64,
      sg: 0.71,
    },
    windDirection: {
      icon: 335.92,
      noaa: 338.04,
      sg: 335.92,
    },
    windSpeed: {
      icon: 2.7,
      noaa: 3.05,
      sg: 2.7,
    },
    windSpeed1000hpa: {
      noaa: 1.17,
      sg: 1.17,
    },
    windSpeed100m: {
      noaa: 1.16,
      sg: 1.16,
    },
    windSpeed200hpa: {
      noaa: 31.1,
      sg: 31.1,
    },
    windSpeed20m: {
      noaa: 1.15,
      sg: 1.15,
    },
    windSpeed50m: {
      noaa: 1.16,
      sg: 1.16,
    },
  },
  {
    airTemperature: {
      dwd: 29.26,
      noaa: 26.7,
      sg: 29.26,
    },
    swellPeriod: {
      dwd: 6.54,
      icon: 6.37,
      noaa: 6.83,
      sg: 6.37,
    },
    time: "2023-09-21T10:00:00+00:00",
    waveHeight: {
      dwd: 0.72,
      icon: 0.71,
      noaa: 0.64,
      sg: 0.71,
    },
    windDirection: {
      icon: 335.4,
      noaa: 338.9,
      sg: 335.4,
    },
    windSpeed: {
      icon: 3.4,
      noaa: 3.54,
      sg: 3.4,
    },
    windSpeed1000hpa: {
      noaa: 1.3,
      sg: 1.3,
    },
    windSpeed100m: {
      noaa: 1.3,
      sg: 1.3,
    },
    windSpeed200hpa: {
      noaa: 29.35,
      sg: 29.35,
    },
    windSpeed20m: {
      noaa: 1.27,
      sg: 1.27,
    },
    windSpeed50m: {
      noaa: 1.29,
      sg: 1.29,
    },
  },
  {
    airTemperature: {
      dwd: 29.28,
      noaa: 26.79,
      sg: 29.28,
    },
    swellPeriod: {
      dwd: 6.55,
      icon: 6.38,
      noaa: 6.81,
      sg: 6.38,
    },
    time: "2023-09-21T11:00:00+00:00",
    waveHeight: {
      dwd: 0.72,
      icon: 0.7,
      noaa: 0.63,
      sg: 0.7,
    },
    windDirection: {
      icon: 334.89,
      noaa: 339.75,
      sg: 334.89,
    },
    windSpeed: {
      icon: 4.1,
      noaa: 4.03,
      sg: 4.1,
    },
    windSpeed1000hpa: {
      noaa: 1.44,
      sg: 1.44,
    },
    windSpeed100m: {
      noaa: 1.43,
      sg: 1.43,
    },
    windSpeed200hpa: {
      noaa: 27.59,
      sg: 27.59,
    },
    windSpeed20m: {
      noaa: 1.4,
      sg: 1.4,
    },
    windSpeed50m: {
      noaa: 1.43,
      sg: 1.43,
    },
  },
  {
    airTemperature: {
      dwd: 29.14,
      noaa: 26.89,
      sg: 29.14,
    },
    swellPeriod: {
      dwd: 6.58,
      icon: 6.39,
      noaa: 6.78,
      sg: 6.39,
    },
    time: "2023-09-21T12:00:00+00:00",
    waveHeight: {
      dwd: 0.72,
      icon: 0.7,
      noaa: 0.63,
      sg: 0.7,
    },
    windDirection: {
      icon: 334.37,
      noaa: 340.61,
      sg: 334.37,
    },
    windSpeed: {
      icon: 4.8,
      noaa: 4.52,
      sg: 4.8,
    },
    windSpeed1000hpa: {
      noaa: 1.57,
      sg: 1.57,
    },
    windSpeed100m: {
      noaa: 1.57,
      sg: 1.57,
    },
    windSpeed200hpa: {
      noaa: 25.84,
      sg: 25.84,
    },
    windSpeed20m: {
      noaa: 1.52,
      sg: 1.52,
    },
    windSpeed50m: {
      noaa: 1.56,
      sg: 1.56,
    },
  },
  {
    airTemperature: {
      dwd: 28.92,
      noaa: 26.98,
      sg: 28.92,
    },
    swellPeriod: {
      dwd: 6.6,
      icon: 6.37,
      noaa: 6.74,
      sg: 6.37,
    },
    time: "2023-09-21T13:00:00+00:00",
    waveHeight: {
      dwd: 0.73,
      icon: 0.72,
      noaa: 0.63,
      sg: 0.72,
    },
    windDirection: {
      icon: 337.49,
      noaa: 343.52,
      sg: 337.49,
    },
    windSpeed: {
      icon: 5.33,
      noaa: 4.68,
      sg: 5.33,
    },
    windSpeed1000hpa: {
      noaa: 1.37,
      sg: 1.37,
    },
    windSpeed100m: {
      noaa: 1.37,
      sg: 1.37,
    },
    windSpeed200hpa: {
      noaa: 25.9,
      sg: 25.9,
    },
    windSpeed20m: {
      noaa: 1.33,
      sg: 1.33,
    },
    windSpeed50m: {
      noaa: 1.36,
      sg: 1.36,
    },
  },
  {
    airTemperature: {
      dwd: 28.46,
      noaa: 27.06,
      sg: 28.46,
    },
    swellPeriod: {
      dwd: 6.57,
      icon: 6.36,
      noaa: 6.7,
      sg: 6.36,
    },
    time: "2023-09-21T14:00:00+00:00",
    waveHeight: {
      dwd: 0.76,
      icon: 0.75,
      noaa: 0.64,
      sg: 0.75,
    },
    windDirection: {
      icon: 340.61,
      noaa: 346.44,
      sg: 340.61,
    },
    windSpeed: {
      icon: 5.85,
      noaa: 4.84,
      sg: 5.85,
    },
    windSpeed1000hpa: {
      noaa: 1.18,
      sg: 1.18,
    },
    windSpeed100m: {
      noaa: 1.18,
      sg: 1.18,
    },
    windSpeed200hpa: {
      noaa: 25.95,
      sg: 25.95,
    },
    windSpeed20m: {
      noaa: 1.13,
      sg: 1.13,
    },
    windSpeed50m: {
      noaa: 1.17,
      sg: 1.17,
    },
  },
  {
    airTemperature: {
      dwd: 27.8,
      noaa: 27.15,
      sg: 27.8,
    },
    swellPeriod: {
      dwd: 6.41,
      icon: 6.34,
      noaa: 6.66,
      sg: 6.34,
    },
    time: "2023-09-21T15:00:00+00:00",
    waveHeight: {
      dwd: 0.79,
      icon: 0.77,
      noaa: 0.64,
      sg: 0.77,
    },
    windDirection: {
      icon: 343.73,
      noaa: 349.35,
      sg: 343.73,
    },
    windSpeed: {
      icon: 6.38,
      noaa: 5,
      sg: 6.38,
    },
    windSpeed1000hpa: {
      noaa: 0.98,
      sg: 0.98,
    },
    windSpeed100m: {
      noaa: 0.98,
      sg: 0.98,
    },
    windSpeed200hpa: {
      noaa: 26.01,
      sg: 26.01,
    },
    windSpeed20m: {
      noaa: 0.94,
      sg: 0.94,
    },
    windSpeed50m: {
      noaa: 0.97,
      sg: 0.97,
    },
  },
  {
    airTemperature: {
      dwd: 27.18,
      noaa: 27.08,
      sg: 27.18,
    },
    swellPeriod: {
      dwd: 6.07,
      icon: 6.16,
      noaa: 6.62,
      sg: 6.16,
    },
    time: "2023-09-21T16:00:00+00:00",
    waveHeight: {
      dwd: 0.79,
      icon: 0.78,
      noaa: 0.64,
      sg: 0.78,
    },
    windDirection: {
      icon: 347.7,
      noaa: 349.22,
      sg: 347.7,
    },
    windSpeed: {
      icon: 6.23,
      noaa: 5.02,
      sg: 6.23,
    },
    windSpeed1000hpa: {
      noaa: 0.97,
      sg: 0.97,
    },
    windSpeed100m: {
      noaa: 0.97,
      sg: 0.97,
    },
    windSpeed200hpa: {
      noaa: 26.33,
      sg: 26.33,
    },
    windSpeed20m: {
      noaa: 0.95,
      sg: 0.95,
    },
    windSpeed50m: {
      noaa: 0.97,
      sg: 0.97,
    },
  },
  {
    airTemperature: {
      dwd: 26.92,
      noaa: 27.01,
      sg: 26.92,
    },
    swellPeriod: {
      dwd: 5.77,
      icon: 5.98,
      noaa: 6.57,
      sg: 5.98,
    },
    time: "2023-09-21T17:00:00+00:00",
    waveHeight: {
      dwd: 0.78,
      icon: 0.79,
      noaa: 0.65,
      sg: 0.79,
    },
    windDirection: {
      icon: 351.67,
      noaa: 349.09,
      sg: 351.67,
    },
    windSpeed: {
      icon: 6.08,
      noaa: 5.03,
      sg: 6.08,
    },
    windSpeed1000hpa: {
      noaa: 0.97,
      sg: 0.97,
    },
    windSpeed100m: {
      noaa: 0.97,
      sg: 0.97,
    },
    windSpeed200hpa: {
      noaa: 26.66,
      sg: 26.66,
    },
    windSpeed20m: {
      noaa: 0.95,
      sg: 0.95,
    },
    windSpeed50m: {
      noaa: 0.98,
      sg: 0.98,
    },
  },
  {
    airTemperature: {
      dwd: 26.56,
      noaa: 26.95,
      sg: 26.56,
    },
    swellPeriod: {
      dwd: 5.64,
      icon: 5.8,
      noaa: 6.53,
      sg: 5.8,
    },
    time: "2023-09-21T18:00:00+00:00",
    waveHeight: {
      dwd: 0.77,
      icon: 0.8,
      noaa: 0.65,
      sg: 0.8,
    },
    windDirection: {
      icon: 355.64,
      noaa: 348.96,
      sg: 355.64,
    },
    windSpeed: {
      icon: 5.93,
      noaa: 5.05,
      sg: 5.93,
    },
    windSpeed1000hpa: {
      noaa: 0.96,
      sg: 0.96,
    },
    windSpeed100m: {
      noaa: 0.96,
      sg: 0.96,
    },
    windSpeed200hpa: {
      noaa: 26.98,
      sg: 26.98,
    },
    windSpeed20m: {
      noaa: 0.96,
      sg: 0.96,
    },
    windSpeed50m: {
      noaa: 0.98,
      sg: 0.98,
    },
  },
  {
    airTemperature: {
      dwd: 26.23,
      noaa: 26.88,
      sg: 26.23,
    },
    swellPeriod: {
      dwd: 5.47,
      icon: 5.7,
      noaa: 6.53,
      sg: 5.7,
    },
    time: "2023-09-21T19:00:00+00:00",
    waveHeight: {
      dwd: 0.75,
      icon: 0.78,
      noaa: 0.65,
      sg: 0.78,
    },
    windDirection: {
      icon: 357.05,
      noaa: 349.44,
      sg: 357.05,
    },
    windSpeed: {
      icon: 5.64,
      noaa: 4.71,
      sg: 5.64,
    },
    windSpeed1000hpa: {
      noaa: 0.86,
      sg: 0.86,
    },
    windSpeed100m: {
      noaa: 0.86,
      sg: 0.86,
    },
    windSpeed200hpa: {
      noaa: 27.76,
      sg: 27.76,
    },
    windSpeed20m: {
      noaa: 0.86,
      sg: 0.86,
    },
    windSpeed50m: {
      noaa: 0.87,
      sg: 0.87,
    },
  },
  {
    airTemperature: {
      dwd: 25.96,
      noaa: 26.82,
      sg: 25.96,
    },
    swellPeriod: {
      dwd: 5.45,
      icon: 5.59,
      noaa: 6.52,
      sg: 5.59,
    },
    time: "2023-09-21T20:00:00+00:00",
    waveHeight: {
      dwd: 0.73,
      icon: 0.75,
      noaa: 0.64,
      sg: 0.75,
    },
    windDirection: {
      icon: 358.45,
      noaa: 349.93,
      sg: 358.45,
    },
    windSpeed: {
      icon: 5.35,
      noaa: 4.37,
      sg: 5.35,
    },
    windSpeed1000hpa: {
      noaa: 0.75,
      sg: 0.75,
    },
    windSpeed100m: {
      noaa: 0.76,
      sg: 0.76,
    },
    windSpeed200hpa: {
      noaa: 28.55,
      sg: 28.55,
    },
    windSpeed20m: {
      noaa: 0.76,
      sg: 0.76,
    },
    windSpeed50m: {
      noaa: 0.77,
      sg: 0.77,
    },
  },
  {
    airTemperature: {
      dwd: 25.6,
      noaa: 26.75,
      sg: 25.6,
    },
    swellPeriod: {
      dwd: 5.47,
      icon: 5.49,
      noaa: 6.52,
      sg: 5.49,
    },
    time: "2023-09-21T21:00:00+00:00",
    waveHeight: {
      dwd: 0.71,
      icon: 0.73,
      noaa: 0.64,
      sg: 0.73,
    },
    windDirection: {
      icon: 359.86,
      noaa: 350.41,
      sg: 359.86,
    },
    windSpeed: {
      icon: 5.06,
      noaa: 4.03,
      sg: 5.06,
    },
    windSpeed1000hpa: {
      noaa: 0.65,
      sg: 0.65,
    },
    windSpeed100m: {
      noaa: 0.66,
      sg: 0.66,
    },
    windSpeed200hpa: {
      noaa: 29.33,
      sg: 29.33,
    },
    windSpeed20m: {
      noaa: 0.66,
      sg: 0.66,
    },
    windSpeed50m: {
      noaa: 0.66,
      sg: 0.66,
    },
  },
  {
    airTemperature: {
      dwd: 25.2,
      noaa: 26.69,
      sg: 25.2,
    },
    swellPeriod: {
      dwd: 5.47,
      icon: 5.44,
      noaa: 6.49,
      sg: 5.44,
    },
    time: "2023-09-21T22:00:00+00:00",
    waveHeight: {
      dwd: 0.69,
      icon: 0.71,
      noaa: 0.63,
      sg: 0.71,
    },
    windDirection: {
      icon: 1.25,
      noaa: 352.05,
      sg: 1.25,
    },
    windSpeed: {
      icon: 4.79,
      noaa: 3.76,
      sg: 4.79,
    },
    windSpeed1000hpa: {
      noaa: 0.51,
      sg: 0.51,
    },
    windSpeed100m: {
      noaa: 0.52,
      sg: 0.52,
    },
    windSpeed200hpa: {
      noaa: 29.09,
      sg: 29.09,
    },
    windSpeed20m: {
      noaa: 0.52,
      sg: 0.52,
    },
    windSpeed50m: {
      noaa: 0.52,
      sg: 0.52,
    },
  },
  {
    airTemperature: {
      dwd: 24.83,
      noaa: 26.62,
      sg: 24.83,
    },
    swellPeriod: {
      dwd: 5.48,
      icon: 5.39,
      noaa: 6.45,
      sg: 5.39,
    },
    time: "2023-09-21T23:00:00+00:00",
    waveHeight: {
      dwd: 0.68,
      icon: 0.7,
      noaa: 0.62,
      sg: 0.7,
    },
    windDirection: {
      icon: 2.65,
      noaa: 353.69,
      sg: 2.65,
    },
    windSpeed: {
      icon: 4.53,
      noaa: 3.5,
      sg: 4.53,
    },
    windSpeed1000hpa: {
      noaa: 0.37,
      sg: 0.37,
    },
    windSpeed100m: {
      noaa: 0.37,
      sg: 0.37,
    },
    windSpeed200hpa: {
      noaa: 28.86,
      sg: 28.86,
    },
    windSpeed20m: {
      noaa: 0.39,
      sg: 0.39,
    },
    windSpeed50m: {
      noaa: 0.38,
      sg: 0.38,
    },
  },
  {
    airTemperature: {
      dwd: 24.57,
      noaa: 26.55,
      sg: 24.57,
    },
    swellPeriod: {
      dwd: 5.48,
      icon: 5.34,
      noaa: 6.42,
      sg: 5.34,
    },
    time: "2023-09-22T00:00:00+00:00",
    waveHeight: {
      dwd: 0.66,
      icon: 0.68,
      noaa: 0.61,
      sg: 0.68,
    },
    windDirection: {
      icon: 4.04,
      noaa: 355.33,
      sg: 4.04,
    },
    windSpeed: {
      icon: 4.26,
      noaa: 3.23,
      sg: 4.26,
    },
    windSpeed1000hpa: {
      noaa: 0.23,
      sg: 0.23,
    },
    windSpeed100m: {
      noaa: 0.23,
      sg: 0.23,
    },
    windSpeed200hpa: {
      noaa: 28.62,
      sg: 28.62,
    },
    windSpeed20m: {
      noaa: 0.25,
      sg: 0.25,
    },
    windSpeed50m: {
      noaa: 0.24,
      sg: 0.24,
    },
  },
  {
    airTemperature: {
      dwd: 24.43,
      noaa: 26.48,
      sg: 24.43,
    },
    swellPeriod: {
      dwd: 5.45,
      icon: 5.37,
      noaa: 6.38,
      sg: 5.37,
    },
    time: "2023-09-22T01:00:00+00:00",
    waveHeight: {
      dwd: 0.65,
      icon: 0.66,
      noaa: 0.6,
      sg: 0.66,
    },
    windDirection: {
      icon: 5.63,
      noaa: 355.91,
      sg: 5.63,
    },
    windSpeed: {
      icon: 3.79,
      noaa: 2.88,
      sg: 3.79,
    },
    windSpeed1000hpa: {
      noaa: 0.19,
      sg: 0.19,
    },
    windSpeed100m: {
      noaa: 0.19,
      sg: 0.19,
    },
    windSpeed200hpa: {
      noaa: 28.39,
      sg: 28.39,
    },
    windSpeed20m: {
      noaa: 0.2,
      sg: 0.2,
    },
    windSpeed50m: {
      noaa: 0.2,
      sg: 0.2,
    },
  },
  {
    airTemperature: {
      dwd: 24.35,
      noaa: 26.41,
      sg: 24.35,
    },
    swellPeriod: {
      dwd: 5.44,
      icon: 5.41,
      noaa: 6.34,
      sg: 5.41,
    },
    time: "2023-09-22T02:00:00+00:00",
    waveHeight: {
      dwd: 0.64,
      icon: 0.64,
      noaa: 0.59,
      sg: 0.64,
    },
    windDirection: {
      icon: 7.23,
      noaa: 356.49,
      sg: 7.23,
    },
    windSpeed: {
      icon: 3.32,
      noaa: 2.54,
      sg: 3.32,
    },
    windSpeed1000hpa: {
      noaa: 0.16,
      sg: 0.16,
    },
    windSpeed100m: {
      noaa: 0.16,
      sg: 0.16,
    },
    windSpeed200hpa: {
      noaa: 28.15,
      sg: 28.15,
    },
    windSpeed20m: {
      noaa: 0.16,
      sg: 0.16,
    },
    windSpeed50m: {
      noaa: 0.15,
      sg: 0.15,
    },
  },
  {
    airTemperature: {
      dwd: 24.32,
      noaa: 26.33,
      sg: 24.32,
    },
    swellPeriod: {
      dwd: 5.43,
      icon: 5.44,
      noaa: 6.3,
      sg: 5.44,
    },
    time: "2023-09-22T03:00:00+00:00",
    waveHeight: {
      dwd: 0.62,
      icon: 0.62,
      noaa: 0.58,
      sg: 0.62,
    },
    windDirection: {
      icon: 8.82,
      noaa: 357.07,
      sg: 8.82,
    },
    windSpeed: {
      icon: 2.85,
      noaa: 2.19,
      sg: 2.85,
    },
    windSpeed1000hpa: {
      noaa: 0.12,
      sg: 0.12,
    },
    windSpeed100m: {
      noaa: 0.12,
      sg: 0.12,
    },
    windSpeed200hpa: {
      noaa: 27.92,
      sg: 27.92,
    },
    windSpeed20m: {
      noaa: 0.11,
      sg: 0.11,
    },
    windSpeed50m: {
      noaa: 0.11,
      sg: 0.11,
    },
  },
  {
    airTemperature: {
      dwd: 24.2,
      noaa: 26.36,
      sg: 24.2,
    },
    swellPeriod: {
      dwd: 5.46,
      icon: 5.44,
      noaa: 6.24,
      sg: 5.44,
    },
    time: "2023-09-22T04:00:00+00:00",
    waveHeight: {
      dwd: 0.6,
      icon: 0.61,
      noaa: 0.57,
      sg: 0.61,
    },
    windDirection: {
      icon: 6.61,
      noaa: 355.97,
      sg: 6.61,
    },
    windSpeed: {
      icon: 2.33,
      noaa: 2.17,
      sg: 2.33,
    },
    windSpeed1000hpa: {
      noaa: 0.17,
      sg: 0.17,
    },
    windSpeed100m: {
      noaa: 0.17,
      sg: 0.17,
    },
    windSpeed200hpa: {
      noaa: 26.84,
      sg: 26.84,
    },
    windSpeed20m: {
      noaa: 0.15,
      sg: 0.15,
    },
    windSpeed50m: {
      noaa: 0.16,
      sg: 0.16,
    },
  },
  {
    airTemperature: {
      dwd: 24.88,
      noaa: 26.39,
      sg: 24.88,
    },
    swellPeriod: {
      dwd: 5.47,
      icon: 5.44,
      noaa: 6.18,
      sg: 5.44,
    },
    time: "2023-09-22T05:00:00+00:00",
    waveHeight: {
      dwd: 0.59,
      icon: 0.59,
      noaa: 0.55,
      sg: 0.59,
    },
    windDirection: {
      icon: 4.41,
      noaa: 354.86,
      sg: 4.41,
    },
    windSpeed: {
      icon: 1.8,
      noaa: 2.15,
      sg: 1.8,
    },
    windSpeed1000hpa: {
      noaa: 0.23,
      sg: 0.23,
    },
    windSpeed100m: {
      noaa: 0.23,
      sg: 0.23,
    },
    windSpeed200hpa: {
      noaa: 25.76,
      sg: 25.76,
    },
    windSpeed20m: {
      noaa: 0.2,
      sg: 0.2,
    },
    windSpeed50m: {
      noaa: 0.22,
      sg: 0.22,
    },
  },
  {
    airTemperature: {
      dwd: 26.49,
      noaa: 26.42,
      sg: 26.49,
    },
    swellPeriod: {
      dwd: 5.49,
      icon: 5.44,
      noaa: 6.12,
      sg: 5.44,
    },
    time: "2023-09-22T06:00:00+00:00",
    waveHeight: {
      dwd: 0.57,
      icon: 0.58,
      noaa: 0.54,
      sg: 0.58,
    },
    windDirection: {
      icon: 2.2,
      noaa: 353.76,
      sg: 2.2,
    },
    windSpeed: {
      icon: 1.28,
      noaa: 2.13,
      sg: 1.28,
    },
    windSpeed1000hpa: {
      noaa: 0.28,
      sg: 0.28,
    },
    windSpeed100m: {
      noaa: 0.28,
      sg: 0.28,
    },
    windSpeed200hpa: {
      noaa: 24.68,
      sg: 24.68,
    },
    windSpeed20m: {
      noaa: 0.24,
      sg: 0.24,
    },
    windSpeed50m: {
      noaa: 0.27,
      sg: 0.27,
    },
  },
  {
    airTemperature: {
      dwd: 28,
      noaa: 26.59,
      sg: 28,
    },
    swellPeriod: {
      dwd: 5.48,
      icon: 5.44,
      noaa: 6.08,
      sg: 5.44,
    },
    time: "2023-09-22T07:00:00+00:00",
    waveHeight: {
      dwd: 0.56,
      icon: 0.57,
      noaa: 0.53,
      sg: 0.57,
    },
    windDirection: {
      icon: 353.89,
      noaa: 347.77,
      sg: 353.89,
    },
    windSpeed: {
      icon: 1.96,
      noaa: 2.37,
      sg: 1.96,
    },
    windSpeed1000hpa: {
      noaa: 0.59,
      sg: 0.59,
    },
    windSpeed100m: {
      noaa: 0.59,
      sg: 0.59,
    },
    windSpeed200hpa: {
      noaa: 24.06,
      sg: 24.06,
    },
    windSpeed20m: {
      noaa: 0.55,
      sg: 0.55,
    },
    windSpeed50m: {
      noaa: 0.58,
      sg: 0.58,
    },
  },
  {
    airTemperature: {
      dwd: 28.97,
      noaa: 26.76,
      sg: 28.97,
    },
    swellPeriod: {
      dwd: 5.48,
      icon: 5.44,
      noaa: 6.05,
      sg: 5.44,
    },
    time: "2023-09-22T08:00:00+00:00",
    waveHeight: {
      dwd: 0.55,
      icon: 0.56,
      noaa: 0.51,
      sg: 0.56,
    },
    windDirection: {
      icon: 345.59,
      noaa: 341.78,
      sg: 345.59,
    },
    windSpeed: {
      icon: 2.65,
      noaa: 2.61,
      sg: 2.65,
    },
    windSpeed1000hpa: {
      noaa: 0.9,
      sg: 0.9,
    },
    windSpeed100m: {
      noaa: 0.91,
      sg: 0.91,
    },
    windSpeed200hpa: {
      noaa: 23.45,
      sg: 23.45,
    },
    windSpeed20m: {
      noaa: 0.87,
      sg: 0.87,
    },
    windSpeed50m: {
      noaa: 0.89,
      sg: 0.89,
    },
  },
  {
    airTemperature: {
      dwd: 29.42,
      noaa: 26.93,
      sg: 29.42,
    },
    swellPeriod: {
      dwd: 5.54,
      icon: 5.44,
      noaa: 6.01,
      sg: 5.44,
    },
    time: "2023-09-22T09:00:00+00:00",
    waveHeight: {
      dwd: 0.54,
      icon: 0.55,
      noaa: 0.5,
      sg: 0.55,
    },
    windDirection: {
      icon: 337.28,
      noaa: 335.79,
      sg: 337.28,
    },
    windSpeed: {
      icon: 3.33,
      noaa: 2.85,
      sg: 3.33,
    },
    windSpeed1000hpa: {
      noaa: 1.21,
      sg: 1.21,
    },
    windSpeed100m: {
      noaa: 1.22,
      sg: 1.22,
    },
    windSpeed200hpa: {
      noaa: 22.83,
      sg: 22.83,
    },
    windSpeed20m: {
      noaa: 1.18,
      sg: 1.18,
    },
    windSpeed50m: {
      noaa: 1.2,
      sg: 1.2,
    },
  },
  {
    airTemperature: {
      dwd: 29.46,
      noaa: 27.02,
      sg: 29.46,
    },
    swellPeriod: {
      dwd: 5.66,
      icon: 5.48,
      noaa: 5.97,
      sg: 5.48,
    },
    time: "2023-09-22T10:00:00+00:00",
    waveHeight: {
      dwd: 0.55,
      icon: 0.56,
      noaa: 0.5,
      sg: 0.56,
    },
    windDirection: {
      icon: 340.74,
      noaa: 337.15,
      sg: 340.74,
    },
    windSpeed: {
      icon: 4.11,
      noaa: 3.59,
      sg: 4.11,
    },
    windSpeed1000hpa: {
      noaa: 1.41,
      sg: 1.41,
    },
    windSpeed100m: {
      noaa: 1.42,
      sg: 1.42,
    },
    windSpeed200hpa: {
      noaa: 22.68,
      sg: 22.68,
    },
    windSpeed20m: {
      noaa: 1.37,
      sg: 1.37,
    },
    windSpeed50m: {
      noaa: 1.4,
      sg: 1.4,
    },
  },
  {
    airTemperature: {
      dwd: 29.54,
      noaa: 27.1,
      sg: 29.54,
    },
    swellPeriod: {
      dwd: 5.75,
      icon: 5.52,
      noaa: 5.94,
      sg: 5.52,
    },
    time: "2023-09-22T11:00:00+00:00",
    waveHeight: {
      dwd: 0.58,
      icon: 0.58,
      noaa: 0.49,
      sg: 0.58,
    },
    windDirection: {
      icon: 344.2,
      noaa: 338.5,
      sg: 344.2,
    },
    windSpeed: {
      icon: 4.89,
      noaa: 4.34,
      sg: 4.89,
    },
    windSpeed1000hpa: {
      noaa: 1.6,
      sg: 1.6,
    },
    windSpeed100m: {
      noaa: 1.61,
      sg: 1.61,
    },
    windSpeed200hpa: {
      noaa: 22.52,
      sg: 22.52,
    },
    windSpeed20m: {
      noaa: 1.57,
      sg: 1.57,
    },
    windSpeed50m: {
      noaa: 1.6,
      sg: 1.6,
    },
  },
  {
    airTemperature: {
      dwd: 29.34,
      noaa: 27.18,
      sg: 29.34,
    },
    swellPeriod: {
      dwd: 5.69,
      icon: 5.56,
      noaa: 5.9,
      sg: 5.56,
    },
    time: "2023-09-22T12:00:00+00:00",
    waveHeight: {
      dwd: 0.62,
      icon: 0.59,
      noaa: 0.49,
      sg: 0.59,
    },
    windDirection: {
      icon: 347.66,
      noaa: 339.86,
      sg: 347.66,
    },
    windSpeed: {
      icon: 5.66,
      noaa: 5.08,
      sg: 5.66,
    },
    windSpeed1000hpa: {
      noaa: 1.8,
      sg: 1.8,
    },
    windSpeed100m: {
      noaa: 1.81,
      sg: 1.81,
    },
    windSpeed200hpa: {
      noaa: 22.37,
      sg: 22.37,
    },
    windSpeed20m: {
      noaa: 1.76,
      sg: 1.76,
    },
    windSpeed50m: {
      noaa: 1.8,
      sg: 1.8,
    },
  },
  {
    airTemperature: {
      dwd: 29.07,
      noaa: 27.19,
      sg: 29.07,
    },
    swellPeriod: {
      dwd: 5.6,
      icon: 5.5,
      noaa: 5.69,
      sg: 5.5,
    },
    time: "2023-09-22T13:00:00+00:00",
    waveHeight: {
      dwd: 0.65,
      icon: 0.62,
      noaa: 0.5,
      sg: 0.62,
    },
    windDirection: {
      icon: 347.66,
      noaa: 344.73,
      sg: 347.66,
    },
    windSpeed: {
      icon: 5.98,
      noaa: 5.25,
      sg: 5.98,
    },
    windSpeed1000hpa: {
      noaa: 1.39,
      sg: 1.39,
    },
    windSpeed100m: {
      noaa: 1.39,
      sg: 1.39,
    },
    windSpeed200hpa: {
      noaa: 21.73,
      sg: 21.73,
    },
    windSpeed20m: {
      noaa: 1.35,
      sg: 1.35,
    },
    windSpeed50m: {
      noaa: 1.38,
      sg: 1.38,
    },
  },
  {
    airTemperature: {
      dwd: 28.54,
      noaa: 27.2,
      sg: 28.54,
    },
    swellPeriod: {
      dwd: 5.47,
      icon: 5.44,
      noaa: 5.48,
      sg: 5.44,
    },
    time: "2023-09-22T14:00:00+00:00",
    waveHeight: {
      dwd: 0.68,
      icon: 0.66,
      noaa: 0.51,
      sg: 0.66,
    },
    windDirection: {
      icon: 347.67,
      noaa: 349.6,
      sg: 347.67,
    },
    windSpeed: {
      icon: 6.29,
      noaa: 5.42,
      sg: 6.29,
    },
    windSpeed1000hpa: {
      noaa: 0.97,
      sg: 0.97,
    },
    windSpeed100m: {
      noaa: 0.97,
      sg: 0.97,
    },
    windSpeed200hpa: {
      noaa: 21.1,
      sg: 21.1,
    },
    windSpeed20m: {
      noaa: 0.95,
      sg: 0.95,
    },
    windSpeed50m: {
      noaa: 0.97,
      sg: 0.97,
    },
  },
  {
    airTemperature: {
      dwd: 27.83,
      noaa: 27.2,
      sg: 27.83,
    },
    swellPeriod: {
      dwd: 5.3,
      icon: 5.38,
      noaa: 5.27,
      sg: 5.38,
    },
    time: "2023-09-22T15:00:00+00:00",
    waveHeight: {
      dwd: 0.69,
      icon: 0.69,
      noaa: 0.52,
      sg: 0.69,
    },
    windDirection: {
      icon: 347.67,
      noaa: 354.47,
      sg: 347.67,
    },
    windSpeed: {
      icon: 6.61,
      noaa: 5.59,
      sg: 6.61,
    },
    windSpeed1000hpa: {
      noaa: 0.56,
      sg: 0.56,
    },
    windSpeed100m: {
      noaa: 0.55,
      sg: 0.55,
    },
    windSpeed200hpa: {
      noaa: 20.46,
      sg: 20.46,
    },
    windSpeed20m: {
      noaa: 0.54,
      sg: 0.54,
    },
    windSpeed50m: {
      noaa: 0.55,
      sg: 0.55,
    },
  },
  {
    airTemperature: {
      dwd: 27.21,
      noaa: 27.16,
      sg: 27.21,
    },
    swellPeriod: {
      dwd: 5.03,
      icon: 5.15,
      noaa: 5.39,
      sg: 5.15,
    },
    time: "2023-09-22T16:00:00+00:00",
    waveHeight: {
      dwd: 0.69,
      icon: 0.68,
      noaa: 0.52,
      sg: 0.68,
    },
    windDirection: {
      icon: 353.38,
      noaa: 353.72,
      sg: 353.38,
    },
    windSpeed: {
      icon: 6.25,
      noaa: 5.51,
      sg: 6.25,
    },
    windSpeed1000hpa: {
      noaa: 0.61,
      sg: 0.61,
    },
    windSpeed100m: {
      noaa: 0.61,
      sg: 0.61,
    },
    windSpeed200hpa: {
      noaa: 20.66,
      sg: 20.66,
    },
    windSpeed20m: {
      noaa: 0.6,
      sg: 0.6,
    },
    windSpeed50m: {
      noaa: 0.61,
      sg: 0.61,
    },
  },
  {
    airTemperature: {
      dwd: 27.02,
      noaa: 27.12,
      sg: 27.02,
    },
    swellPeriod: {
      dwd: 4.86,
      icon: 4.93,
      noaa: 5.5,
      sg: 4.93,
    },
    time: "2023-09-22T17:00:00+00:00",
    waveHeight: {
      dwd: 0.68,
      icon: 0.68,
      noaa: 0.53,
      sg: 0.68,
    },
    windDirection: {
      icon: 359.09,
      noaa: 352.96,
      sg: 359.09,
    },
    windSpeed: {
      icon: 5.88,
      noaa: 5.42,
      sg: 5.88,
    },
    windSpeed1000hpa: {
      noaa: 0.67,
      sg: 0.67,
    },
    windSpeed100m: {
      noaa: 0.66,
      sg: 0.66,
    },
    windSpeed200hpa: {
      noaa: 20.86,
      sg: 20.86,
    },
    windSpeed20m: {
      noaa: 0.66,
      sg: 0.66,
    },
    windSpeed50m: {
      noaa: 0.67,
      sg: 0.67,
    },
  },
  {
    airTemperature: {
      dwd: 26.78,
      noaa: 27.07,
      sg: 26.78,
    },
    swellPeriod: {
      dwd: 4.61,
      icon: 4.7,
      noaa: 5.62,
      sg: 4.7,
    },
    time: "2023-09-22T18:00:00+00:00",
    waveHeight: {
      dwd: 0.66,
      icon: 0.67,
      noaa: 0.53,
      sg: 0.67,
    },
    windDirection: {
      icon: 4.8,
      noaa: 352.21,
      sg: 4.8,
    },
    windSpeed: {
      icon: 5.52,
      noaa: 5.34,
      sg: 5.52,
    },
    windSpeed1000hpa: {
      noaa: 0.72,
      sg: 0.72,
    },
    windSpeed100m: {
      noaa: 0.72,
      sg: 0.72,
    },
    windSpeed200hpa: {
      noaa: 21.06,
      sg: 21.06,
    },
    windSpeed20m: {
      noaa: 0.72,
      sg: 0.72,
    },
    windSpeed50m: {
      noaa: 0.73,
      sg: 0.73,
    },
  },
  {
    airTemperature: {
      dwd: 26.51,
      noaa: 26.96,
      sg: 26.51,
    },
    swellPeriod: {
      dwd: 4.57,
      icon: 4.59,
      noaa: 5.6,
      sg: 4.59,
    },
    time: "2023-09-22T19:00:00+00:00",
    waveHeight: {
      dwd: 0.62,
      icon: 0.64,
      noaa: 0.52,
      sg: 0.64,
    },
    windDirection: {
      icon: 2.07,
      noaa: 350.43,
      sg: 2.07,
    },
    windSpeed: {
      icon: 4.95,
      noaa: 4.99,
      sg: 4.95,
    },
    windSpeed1000hpa: {
      noaa: 0.81,
      sg: 0.81,
    },
    windSpeed100m: {
      noaa: 0.81,
      sg: 0.81,
    },
    windSpeed200hpa: {
      noaa: 21.33,
      sg: 21.33,
    },
    windSpeed20m: {
      noaa: 0.81,
      sg: 0.81,
    },
    windSpeed50m: {
      noaa: 0.81,
      sg: 0.81,
    },
  },
  {
    airTemperature: {
      dwd: 26.31,
      noaa: 26.85,
      sg: 26.31,
    },
    swellPeriod: {
      dwd: 4.49,
      icon: 4.47,
      noaa: 5.58,
      sg: 4.47,
    },
    time: "2023-09-22T20:00:00+00:00",
    waveHeight: {
      dwd: 0.6,
      icon: 0.61,
      noaa: 0.5,
      sg: 0.61,
    },
    windDirection: {
      icon: 359.35,
      noaa: 348.64,
      sg: 359.35,
    },
    windSpeed: {
      icon: 4.39,
      noaa: 4.64,
      sg: 4.39,
    },
    windSpeed1000hpa: {
      noaa: 0.89,
      sg: 0.89,
    },
    windSpeed100m: {
      noaa: 0.89,
      sg: 0.89,
    },
    windSpeed200hpa: {
      noaa: 21.6,
      sg: 21.6,
    },
    windSpeed20m: {
      noaa: 0.89,
      sg: 0.89,
    },
    windSpeed50m: {
      noaa: 0.9,
      sg: 0.9,
    },
  },
  {
    airTemperature: {
      dwd: 26.03,
      noaa: 26.74,
      sg: 26.03,
    },
    swellPeriod: {
      dwd: 4.42,
      icon: 4.36,
      noaa: 5.56,
      sg: 4.36,
    },
    time: "2023-09-22T21:00:00+00:00",
    waveHeight: {
      dwd: 0.57,
      icon: 0.58,
      noaa: 0.49,
      sg: 0.58,
    },
    windDirection: {
      icon: 356.62,
      noaa: 346.86,
      sg: 356.62,
    },
    windSpeed: {
      icon: 3.82,
      noaa: 4.29,
      sg: 3.82,
    },
    windSpeed1000hpa: {
      noaa: 0.98,
      sg: 0.98,
    },
    windSpeed100m: {
      noaa: 0.98,
      sg: 0.98,
    },
    windSpeed200hpa: {
      noaa: 21.87,
      sg: 21.87,
    },
    windSpeed20m: {
      noaa: 0.98,
      sg: 0.98,
    },
    windSpeed50m: {
      noaa: 0.98,
      sg: 0.98,
    },
  },
  {
    airTemperature: {
      dwd: 25.66,
      noaa: 26.66,
      sg: 25.66,
    },
    swellPeriod: {
      dwd: 4.39,
      icon: 4.36,
      noaa: 4.91,
      sg: 4.36,
    },
    time: "2023-09-22T22:00:00+00:00",
    waveHeight: {
      dwd: 0.54,
      icon: 0.56,
      noaa: 0.48,
      sg: 0.56,
    },
    windDirection: {
      icon: 355.14,
      noaa: 347.75,
      sg: 355.14,
    },
    windSpeed: {
      icon: 3.56,
      noaa: 3.82,
      sg: 3.56,
    },
    windSpeed1000hpa: {
      noaa: 0.82,
      sg: 0.82,
    },
    windSpeed100m: {
      noaa: 0.82,
      sg: 0.82,
    },
    windSpeed200hpa: {
      noaa: 22.75,
      sg: 22.75,
    },
    windSpeed20m: {
      noaa: 0.83,
      sg: 0.83,
    },
    windSpeed50m: {
      noaa: 0.83,
      sg: 0.83,
    },
  },
  {
    airTemperature: {
      dwd: 25.44,
      noaa: 26.58,
      sg: 25.44,
    },
    swellPeriod: {
      dwd: 4.42,
      icon: 4.36,
      noaa: 4.25,
      sg: 4.36,
    },
    time: "2023-09-22T23:00:00+00:00",
    waveHeight: {
      dwd: 0.52,
      icon: 0.54,
      noaa: 0.46,
      sg: 0.54,
    },
    windDirection: {
      icon: 353.65,
      noaa: 348.64,
      sg: 353.65,
    },
    windSpeed: {
      icon: 3.29,
      noaa: 3.35,
      sg: 3.29,
    },
    windSpeed1000hpa: {
      noaa: 0.66,
      sg: 0.66,
    },
    windSpeed100m: {
      noaa: 0.66,
      sg: 0.66,
    },
    windSpeed200hpa: {
      noaa: 23.62,
      sg: 23.62,
    },
    windSpeed20m: {
      noaa: 0.67,
      sg: 0.67,
    },
    windSpeed50m: {
      noaa: 0.67,
      sg: 0.67,
    },
  },
  {
    airTemperature: {
      dwd: 25.24,
      noaa: 26.49,
      sg: 25.24,
    },
    swellPeriod: {
      dwd: 4.43,
      icon: 4.36,
      noaa: 3.6,
      sg: 4.36,
    },
    time: "2023-09-23T00:00:00+00:00",
    waveHeight: {
      dwd: 0.5,
      icon: 0.52,
      noaa: 0.45,
      sg: 0.52,
    },
    windDirection: {
      icon: 352.17,
      noaa: 349.53,
      sg: 352.17,
    },
    windSpeed: {
      icon: 3.03,
      noaa: 2.88,
      sg: 3.03,
    },
    windSpeed1000hpa: {
      noaa: 0.5,
      sg: 0.5,
    },
    windSpeed100m: {
      noaa: 0.5,
      sg: 0.5,
    },
    windSpeed200hpa: {
      noaa: 24.5,
      sg: 24.5,
    },
    windSpeed20m: {
      noaa: 0.52,
      sg: 0.52,
    },
    windSpeed50m: {
      noaa: 0.52,
      sg: 0.52,
    },
  },
  {
    airTemperature: {
      dwd: 24.82,
      noaa: 26.41,
      sg: 24.82,
    },
    swellPeriod: {
      dwd: 4.44,
      icon: 4.37,
      noaa: 4.17,
      sg: 4.37,
    },
    time: "2023-09-23T01:00:00+00:00",
    waveHeight: {
      dwd: 0.48,
      icon: 0.5,
      noaa: 0.44,
      sg: 0.5,
    },
    windDirection: {
      icon: 352.96,
      noaa: 353.23,
      sg: 352.96,
    },
    windSpeed: {
      icon: 2.9,
      noaa: 2.62,
      sg: 2.9,
    },
    windSpeed1000hpa: {
      noaa: 0.35,
      sg: 0.35,
    },
    windSpeed100m: {
      noaa: 0.35,
      sg: 0.35,
    },
    windSpeed200hpa: {
      noaa: 24.94,
      sg: 24.94,
    },
    windSpeed20m: {
      noaa: 0.36,
      sg: 0.36,
    },
    windSpeed50m: {
      noaa: 0.36,
      sg: 0.36,
    },
  },
  {
    airTemperature: {
      dwd: 24.54,
      noaa: 26.34,
      sg: 24.54,
    },
    swellPeriod: {
      dwd: 4.46,
      icon: 4.38,
      noaa: 4.75,
      sg: 4.38,
    },
    time: "2023-09-23T02:00:00+00:00",
    waveHeight: {
      dwd: 0.47,
      icon: 0.49,
      noaa: 0.42,
      sg: 0.49,
    },
    windDirection: {
      icon: 353.75,
      noaa: 356.92,
      sg: 353.75,
    },
    windSpeed: {
      icon: 2.77,
      noaa: 2.35,
      sg: 2.77,
    },
    windSpeed1000hpa: {
      noaa: 0.2,
      sg: 0.2,
    },
    windSpeed100m: {
      noaa: 0.2,
      sg: 0.2,
    },
    windSpeed200hpa: {
      noaa: 25.39,
      sg: 25.39,
    },
    windSpeed20m: {
      noaa: 0.19,
      sg: 0.19,
    },
    windSpeed50m: {
      noaa: 0.19,
      sg: 0.19,
    },
  },
  {
    airTemperature: {
      dwd: 24.35,
      noaa: 26.26,
      sg: 24.35,
    },
    swellPeriod: {
      dwd: 4.47,
      icon: 4.39,
      noaa: 5.32,
      sg: 4.39,
    },
    time: "2023-09-23T03:00:00+00:00",
    waveHeight: {
      dwd: 0.46,
      icon: 0.47,
      noaa: 0.41,
      sg: 0.47,
    },
    windDirection: {
      icon: 354.54,
      noaa: 0.62,
      sg: 354.54,
    },
    windSpeed: {
      icon: 2.64,
      noaa: 2.09,
      sg: 2.64,
    },
    windSpeed1000hpa: {
      noaa: 0.05,
      sg: 0.05,
    },
    windSpeed100m: {
      noaa: 0.05,
      sg: 0.05,
    },
    windSpeed200hpa: {
      noaa: 25.83,
      sg: 25.83,
    },
    windSpeed20m: {
      noaa: 0.03,
      sg: 0.03,
    },
    windSpeed50m: {
      noaa: 0.03,
      sg: 0.03,
    },
  },
  {
    airTemperature: {
      dwd: 24.14,
      noaa: 26.24,
      sg: 24.14,
    },
    swellPeriod: {
      dwd: 4.48,
      icon: 4.39,
      noaa: 5.29,
      sg: 4.39,
    },
    time: "2023-09-23T04:00:00+00:00",
    waveHeight: {
      dwd: 0.44,
      icon: 0.46,
      noaa: 0.4,
      sg: 0.46,
    },
    windDirection: {
      icon: 6.04,
      noaa: 358.13,
      sg: 6.04,
    },
    windSpeed: {
      icon: 2.56,
      noaa: 1.85,
      sg: 2.56,
    },
    windSpeed1000hpa: {
      noaa: 0.09,
      sg: 0.09,
    },
    windSpeed100m: {
      noaa: 0.09,
      sg: 0.09,
    },
    windSpeed200hpa: {
      noaa: 25.82,
      sg: 25.82,
    },
    windSpeed20m: {
      noaa: 0.07,
      sg: 0.07,
    },
    windSpeed50m: {
      noaa: 0.08,
      sg: 0.08,
    },
  },
  {
    airTemperature: {
      dwd: 24.89,
      noaa: 26.21,
      sg: 24.89,
    },
    swellPeriod: {
      dwd: 4.48,
      icon: 4.4,
      noaa: 5.27,
      sg: 4.4,
    },
    time: "2023-09-23T05:00:00+00:00",
    waveHeight: {
      dwd: 0.43,
      icon: 0.44,
      noaa: 0.38,
      sg: 0.44,
    },
    windDirection: {
      icon: 17.54,
      noaa: 355.63,
      sg: 17.54,
    },
    windSpeed: {
      icon: 2.47,
      noaa: 1.6,
      sg: 2.47,
    },
    windSpeed1000hpa: {
      noaa: 0.13,
      sg: 0.13,
    },
    windSpeed100m: {
      noaa: 0.13,
      sg: 0.13,
    },
    windSpeed200hpa: {
      noaa: 25.8,
      sg: 25.8,
    },
    windSpeed20m: {
      noaa: 0.12,
      sg: 0.12,
    },
    windSpeed50m: {
      noaa: 0.12,
      sg: 0.12,
    },
  },
  {
    airTemperature: {
      dwd: 26.66,
      noaa: 26.19,
      sg: 26.66,
    },
    swellPeriod: {
      dwd: 4.49,
      icon: 4.4,
      noaa: 5.24,
      sg: 4.4,
    },
    time: "2023-09-23T06:00:00+00:00",
    waveHeight: {
      dwd: 0.42,
      icon: 0.43,
      noaa: 0.37,
      sg: 0.43,
    },
    windDirection: {
      icon: 29.04,
      noaa: 353.14,
      sg: 29.04,
    },
    windSpeed: {
      icon: 2.39,
      noaa: 1.36,
      sg: 2.39,
    },
    windSpeed1000hpa: {
      noaa: 0.17,
      sg: 0.17,
    },
    windSpeed100m: {
      noaa: 0.17,
      sg: 0.17,
    },
    windSpeed200hpa: {
      noaa: 25.79,
      sg: 25.79,
    },
    windSpeed20m: {
      noaa: 0.16,
      sg: 0.16,
    },
    windSpeed50m: {
      noaa: 0.17,
      sg: 0.17,
    },
  },
  {
    airTemperature: {
      dwd: 27.61,
      noaa: 26.32,
      sg: 27.61,
    },
    swellPeriod: {
      icon: 4.43,
      noaa: 5.23,
      sg: 4.43,
    },
    time: "2023-09-23T07:00:00+00:00",
    waveHeight: {
      icon: 0.43,
      noaa: 0.36,
      sg: 0.43,
    },
    windDirection: {
      icon: 15.35,
      noaa: 344.03,
      sg: 15.35,
    },
    windSpeed: {
      icon: 2.79,
      noaa: 1.81,
      sg: 2.79,
    },
    windSpeed1000hpa: {
      noaa: 0.63,
      sg: 0.63,
    },
    windSpeed100m: {
      noaa: 0.63,
      sg: 0.63,
    },
    windSpeed200hpa: {
      noaa: 25.73,
      sg: 25.73,
    },
    windSpeed20m: {
      noaa: 0.62,
      sg: 0.62,
    },
    windSpeed50m: {
      noaa: 0.63,
      sg: 0.63,
    },
  },
  {
    airTemperature: {
      dwd: 28.55,
      noaa: 26.45,
      sg: 28.55,
    },
    swellPeriod: {
      icon: 4.45,
      noaa: 5.22,
      sg: 4.45,
    },
    time: "2023-09-23T08:00:00+00:00",
    waveHeight: {
      icon: 0.42,
      noaa: 0.35,
      sg: 0.42,
    },
    windDirection: {
      icon: 1.67,
      noaa: 334.93,
      sg: 1.67,
    },
    windSpeed: {
      icon: 3.2,
      noaa: 2.26,
      sg: 3.2,
    },
    windSpeed1000hpa: {
      noaa: 1.09,
      sg: 1.09,
    },
    windSpeed100m: {
      noaa: 1.09,
      sg: 1.09,
    },
    windSpeed200hpa: {
      noaa: 25.66,
      sg: 25.66,
    },
    windSpeed20m: {
      noaa: 1.07,
      sg: 1.07,
    },
    windSpeed50m: {
      noaa: 1.1,
      sg: 1.1,
    },
  },
  {
    airTemperature: {
      dwd: 29.49,
      noaa: 26.57,
      sg: 29.49,
    },
    swellPeriod: {
      icon: 4.48,
      noaa: 5.21,
      sg: 4.48,
    },
    time: "2023-09-23T09:00:00+00:00",
    waveHeight: {
      icon: 0.42,
      noaa: 0.34,
      sg: 0.42,
    },
    windDirection: {
      icon: 347.98,
      noaa: 325.82,
      sg: 347.98,
    },
    windSpeed: {
      icon: 3.6,
      noaa: 2.71,
      sg: 3.6,
    },
    windSpeed1000hpa: {
      noaa: 1.55,
      sg: 1.55,
    },
    windSpeed100m: {
      noaa: 1.55,
      sg: 1.55,
    },
    windSpeed200hpa: {
      noaa: 25.6,
      sg: 25.6,
    },
    windSpeed20m: {
      noaa: 1.53,
      sg: 1.53,
    },
    windSpeed50m: {
      noaa: 1.56,
      sg: 1.56,
    },
  },
  {
    airTemperature: {
      dwd: 29.38,
      noaa: 26.78,
      sg: 29.38,
    },
    swellPeriod: {
      icon: 4.58,
      noaa: 5.15,
      sg: 4.58,
    },
    time: "2023-09-23T10:00:00+00:00",
    waveHeight: {
      icon: 0.43,
      noaa: 0.34,
      sg: 0.43,
    },
    windDirection: {
      icon: 342.55,
      noaa: 329.37,
      sg: 342.55,
    },
    windSpeed: {
      icon: 4.3,
      noaa: 3.31,
      sg: 4.3,
    },
    windSpeed1000hpa: {
      noaa: 1.65,
      sg: 1.65,
    },
    windSpeed100m: {
      noaa: 1.65,
      sg: 1.65,
    },
    windSpeed200hpa: {
      noaa: 25.11,
      sg: 25.11,
    },
    windSpeed20m: {
      noaa: 1.62,
      sg: 1.62,
    },
    windSpeed50m: {
      noaa: 1.66,
      sg: 1.66,
    },
  },
  {
    airTemperature: {
      dwd: 29.27,
      noaa: 26.99,
      sg: 29.27,
    },
    swellPeriod: {
      icon: 4.69,
      noaa: 5.09,
      sg: 4.69,
    },
    time: "2023-09-23T11:00:00+00:00",
    waveHeight: {
      icon: 0.45,
      noaa: 0.35,
      sg: 0.45,
    },
    windDirection: {
      icon: 337.11,
      noaa: 332.93,
      sg: 337.11,
    },
    windSpeed: {
      icon: 5,
      noaa: 3.9,
      sg: 5,
    },
    windSpeed1000hpa: {
      noaa: 1.76,
      sg: 1.76,
    },
    windSpeed100m: {
      noaa: 1.76,
      sg: 1.76,
    },
    windSpeed200hpa: {
      noaa: 24.61,
      sg: 24.61,
    },
    windSpeed20m: {
      noaa: 1.72,
      sg: 1.72,
    },
    windSpeed50m: {
      noaa: 1.75,
      sg: 1.75,
    },
  },
  {
    airTemperature: {
      dwd: 29.17,
      noaa: 27.21,
      sg: 29.17,
    },
    swellPeriod: {
      icon: 4.79,
      noaa: 5.03,
      sg: 4.79,
    },
    time: "2023-09-23T12:00:00+00:00",
    waveHeight: {
      icon: 0.46,
      noaa: 0.35,
      sg: 0.46,
    },
    windDirection: {
      icon: 331.68,
      noaa: 336.48,
      sg: 331.68,
    },
    windSpeed: {
      icon: 5.69,
      noaa: 4.5,
      sg: 5.69,
    },
    windSpeed1000hpa: {
      noaa: 1.86,
      sg: 1.86,
    },
    windSpeed100m: {
      noaa: 1.86,
      sg: 1.86,
    },
    windSpeed200hpa: {
      noaa: 24.12,
      sg: 24.12,
    },
    windSpeed20m: {
      noaa: 1.81,
      sg: 1.81,
    },
    windSpeed50m: {
      noaa: 1.85,
      sg: 1.85,
    },
  },
  {
    airTemperature: {
      dwd: 28.54,
      noaa: 27.26,
      sg: 28.54,
    },
    swellPeriod: {
      icon: 4.73,
      noaa: 5.05,
      sg: 4.73,
    },
    time: "2023-09-23T13:00:00+00:00",
    waveHeight: {
      icon: 0.5,
      noaa: 0.37,
      sg: 0.5,
    },
    windDirection: {
      icon: 334,
      noaa: 341.02,
      sg: 334,
    },
    windSpeed: {
      icon: 5.87,
      noaa: 4.83,
      sg: 5.87,
    },
    windSpeed1000hpa: {
      noaa: 1.57,
      sg: 1.57,
    },
    windSpeed100m: {
      noaa: 1.56,
      sg: 1.56,
    },
    windSpeed200hpa: {
      noaa: 23.36,
      sg: 23.36,
    },
    windSpeed20m: {
      noaa: 1.52,
      sg: 1.52,
    },
    windSpeed50m: {
      noaa: 1.56,
      sg: 1.56,
    },
  },
  {
    airTemperature: {
      dwd: 27.9,
      noaa: 27.31,
      sg: 27.9,
    },
    swellPeriod: {
      icon: 4.67,
      noaa: 5.08,
      sg: 4.67,
    },
    time: "2023-09-23T14:00:00+00:00",
    waveHeight: {
      icon: 0.53,
      noaa: 0.39,
      sg: 0.53,
    },
    windDirection: {
      icon: 336.32,
      noaa: 345.57,
      sg: 336.32,
    },
    windSpeed: {
      icon: 6.04,
      noaa: 5.15,
      sg: 6.04,
    },
    windSpeed1000hpa: {
      noaa: 1.27,
      sg: 1.27,
    },
    windSpeed100m: {
      noaa: 1.27,
      sg: 1.27,
    },
    windSpeed200hpa: {
      noaa: 22.59,
      sg: 22.59,
    },
    windSpeed20m: {
      noaa: 1.23,
      sg: 1.23,
    },
    windSpeed50m: {
      noaa: 1.27,
      sg: 1.27,
    },
  },
  {
    airTemperature: {
      dwd: 27.27,
      noaa: 27.36,
      sg: 27.27,
    },
    swellPeriod: {
      icon: 4.61,
      noaa: 5.1,
      sg: 4.61,
    },
    time: "2023-09-23T15:00:00+00:00",
    waveHeight: {
      icon: 0.57,
      noaa: 0.41,
      sg: 0.57,
    },
    windDirection: {
      icon: 338.64,
      noaa: 350.11,
      sg: 338.64,
    },
    windSpeed: {
      icon: 6.21,
      noaa: 5.48,
      sg: 6.21,
    },
    windSpeed1000hpa: {
      noaa: 0.98,
      sg: 0.98,
    },
    windSpeed100m: {
      noaa: 0.97,
      sg: 0.97,
    },
    windSpeed200hpa: {
      noaa: 21.83,
      sg: 21.83,
    },
    windSpeed20m: {
      noaa: 0.94,
      sg: 0.94,
    },
    windSpeed50m: {
      noaa: 0.98,
      sg: 0.98,
    },
  },
  {
    airTemperature: {
      dwd: 26.96,
      noaa: 27.32,
      sg: 26.96,
    },
    swellPeriod: {
      icon: 4.42,
      noaa: 5.08,
      sg: 4.42,
    },
    time: "2023-09-23T16:00:00+00:00",
    waveHeight: {
      icon: 0.56,
      noaa: 0.42,
      sg: 0.56,
    },
    windDirection: {
      icon: 343.97,
      noaa: 352.6,
      sg: 343.97,
    },
    windSpeed: {
      icon: 5.79,
      noaa: 5.23,
      sg: 5.79,
    },
    windSpeed1000hpa: {
      noaa: 0.71,
      sg: 0.71,
    },
    windSpeed100m: {
      noaa: 0.7,
      sg: 0.7,
    },
    windSpeed200hpa: {
      noaa: 21.89,
      sg: 21.89,
    },
    windSpeed20m: {
      noaa: 0.69,
      sg: 0.69,
    },
    windSpeed50m: {
      noaa: 0.71,
      sg: 0.71,
    },
  },
  {
    airTemperature: {
      dwd: 26.65,
      noaa: 27.27,
      sg: 26.65,
    },
    swellPeriod: {
      icon: 4.22,
      noaa: 5.05,
      sg: 4.22,
    },
    time: "2023-09-23T17:00:00+00:00",
    waveHeight: {
      icon: 0.55,
      noaa: 0.42,
      sg: 0.55,
    },
    windDirection: {
      icon: 349.29,
      noaa: 355.09,
      sg: 349.29,
    },
    windSpeed: {
      icon: 5.37,
      noaa: 4.99,
      sg: 5.37,
    },
    windSpeed1000hpa: {
      noaa: 0.43,
      sg: 0.43,
    },
    windSpeed100m: {
      noaa: 0.42,
      sg: 0.42,
    },
    windSpeed200hpa: {
      noaa: 21.96,
      sg: 21.96,
    },
    windSpeed20m: {
      noaa: 0.43,
      sg: 0.43,
    },
    windSpeed50m: {
      noaa: 0.44,
      sg: 0.44,
    },
  },
  {
    airTemperature: {
      dwd: 26.34,
      noaa: 27.22,
      sg: 26.34,
    },
    swellPeriod: {
      icon: 4.03,
      noaa: 5.03,
      sg: 4.03,
    },
    time: "2023-09-23T18:00:00+00:00",
    waveHeight: {
      icon: 0.54,
      noaa: 0.43,
      sg: 0.54,
    },
    windDirection: {
      icon: 354.62,
      noaa: 357.58,
      sg: 354.62,
    },
    windSpeed: {
      icon: 4.94,
      noaa: 4.74,
      sg: 4.94,
    },
    windSpeed1000hpa: {
      noaa: 0.16,
      sg: 0.16,
    },
    windSpeed100m: {
      noaa: 0.15,
      sg: 0.15,
    },
    windSpeed200hpa: {
      noaa: 22.02,
      sg: 22.02,
    },
    windSpeed20m: {
      noaa: 0.18,
      sg: 0.18,
    },
    windSpeed50m: {
      noaa: 0.17,
      sg: 0.17,
    },
  },
  {
    airTemperature: {
      dwd: 26.21,
      noaa: 27.12,
      sg: 26.21,
    },
    swellPeriod: {
      icon: 3.96,
      noaa: 4.44,
      sg: 3.96,
    },
    time: "2023-09-23T19:00:00+00:00",
    waveHeight: {
      icon: 0.52,
      noaa: 0.42,
      sg: 0.52,
    },
    windDirection: {
      icon: 355.05,
      noaa: 356.45,
      sg: 355.05,
    },
    windSpeed: {
      icon: 4.23,
      noaa: 4.14,
      sg: 4.23,
    },
    windSpeed1000hpa: {
      noaa: 0.2,
      sg: 0.2,
    },
    windSpeed100m: {
      noaa: 0.19,
      sg: 0.19,
    },
    windSpeed200hpa: {
      noaa: 22.56,
      sg: 22.56,
    },
    windSpeed20m: {
      noaa: 0.22,
      sg: 0.22,
    },
    windSpeed50m: {
      noaa: 0.21,
      sg: 0.21,
    },
  },
  {
    airTemperature: {
      dwd: 26.09,
      noaa: 27.02,
      sg: 26.09,
    },
    swellPeriod: {
      icon: 3.88,
      noaa: 3.86,
      sg: 3.88,
    },
    time: "2023-09-23T20:00:00+00:00",
    waveHeight: {
      icon: 0.5,
      noaa: 0.41,
      sg: 0.5,
    },
    windDirection: {
      icon: 355.47,
      noaa: 355.33,
      sg: 355.47,
    },
    windSpeed: {
      icon: 3.51,
      noaa: 3.53,
      sg: 3.51,
    },
    windSpeed1000hpa: {
      noaa: 0.24,
      sg: 0.24,
    },
    windSpeed100m: {
      noaa: 0.24,
      sg: 0.24,
    },
    windSpeed200hpa: {
      noaa: 23.09,
      sg: 23.09,
    },
    windSpeed20m: {
      noaa: 0.26,
      sg: 0.26,
    },
    windSpeed50m: {
      noaa: 0.25,
      sg: 0.25,
    },
  },
  {
    airTemperature: {
      dwd: 25.96,
      noaa: 26.92,
      sg: 25.96,
    },
    swellPeriod: {
      icon: 3.81,
      noaa: 3.27,
      sg: 3.81,
    },
    time: "2023-09-23T21:00:00+00:00",
    waveHeight: {
      icon: 0.48,
      noaa: 0.4,
      sg: 0.48,
    },
    windDirection: {
      icon: 355.9,
      noaa: 354.2,
      sg: 355.9,
    },
    windSpeed: {
      icon: 2.79,
      noaa: 2.93,
      sg: 2.79,
    },
    windSpeed1000hpa: {
      noaa: 0.28,
      sg: 0.28,
    },
    windSpeed100m: {
      noaa: 0.28,
      sg: 0.28,
    },
    windSpeed200hpa: {
      noaa: 23.63,
      sg: 23.63,
    },
    windSpeed20m: {
      noaa: 0.3,
      sg: 0.3,
    },
    windSpeed50m: {
      noaa: 0.29,
      sg: 0.29,
    },
  },
  {
    airTemperature: {
      dwd: 25.62,
      noaa: 26.82,
      sg: 25.62,
    },
    swellPeriod: {
      icon: 3.85,
      noaa: 3.32,
      sg: 3.85,
    },
    time: "2023-09-23T22:00:00+00:00",
    waveHeight: {
      icon: 0.46,
      noaa: 0.39,
      sg: 0.46,
    },
    windDirection: {
      icon: 340.39,
      noaa: 350.21,
      sg: 340.39,
    },
    windSpeed: {
      icon: 2.16,
      noaa: 2.61,
      sg: 2.16,
    },
    windSpeed1000hpa: {
      noaa: 0.39,
      sg: 0.39,
    },
    windSpeed100m: {
      noaa: 0.39,
      sg: 0.39,
    },
    windSpeed200hpa: {
      noaa: 24.16,
      sg: 24.16,
    },
    windSpeed20m: {
      noaa: 0.4,
      sg: 0.4,
    },
    windSpeed50m: {
      noaa: 0.39,
      sg: 0.39,
    },
  },
  {
    airTemperature: {
      dwd: 25.28,
      noaa: 26.73,
      sg: 25.28,
    },
    swellPeriod: {
      icon: 3.88,
      noaa: 3.37,
      sg: 3.88,
    },
    time: "2023-09-23T23:00:00+00:00",
    waveHeight: {
      icon: 0.45,
      noaa: 0.38,
      sg: 0.45,
    },
    windDirection: {
      icon: 324.89,
      noaa: 346.22,
      sg: 324.89,
    },
    windSpeed: {
      icon: 1.54,
      noaa: 2.28,
      sg: 1.54,
    },
    windSpeed1000hpa: {
      noaa: 0.5,
      sg: 0.5,
    },
    windSpeed100m: {
      noaa: 0.5,
      sg: 0.5,
    },
    windSpeed200hpa: {
      noaa: 24.69,
      sg: 24.69,
    },
    windSpeed20m: {
      noaa: 0.5,
      sg: 0.5,
    },
    windSpeed50m: {
      noaa: 0.5,
      sg: 0.5,
    },
  },
  {
    airTemperature: {
      dwd: 24.95,
      noaa: 26.64,
      sg: 24.95,
    },
    swellPeriod: {
      icon: 3.92,
      noaa: 3.42,
      sg: 3.92,
    },
    time: "2023-09-24T00:00:00+00:00",
    waveHeight: {
      icon: 0.43,
      noaa: 0.37,
      sg: 0.43,
    },
    windDirection: {
      icon: 309.38,
      noaa: 342.23,
      sg: 309.38,
    },
    windSpeed: {
      icon: 0.91,
      noaa: 1.96,
      sg: 0.91,
    },
    windSpeed1000hpa: {
      noaa: 0.61,
      sg: 0.61,
    },
    windSpeed100m: {
      noaa: 0.61,
      sg: 0.61,
    },
    windSpeed200hpa: {
      noaa: 25.22,
      sg: 25.22,
    },
    windSpeed20m: {
      noaa: 0.6,
      sg: 0.6,
    },
    windSpeed50m: {
      noaa: 0.6,
      sg: 0.6,
    },
  },
  {
    airTemperature: {
      dwd: 24.59,
      noaa: 26.59,
      sg: 24.59,
    },
    swellPeriod: {
      icon: 3.94,
      noaa: 3.46,
      sg: 3.94,
    },
    time: "2023-09-24T01:00:00+00:00",
    waveHeight: {
      icon: 0.42,
      noaa: 0.36,
      sg: 0.42,
    },
    windDirection: {
      icon: 294.43,
      noaa: 344.96,
      sg: 294.43,
    },
    windSpeed: {
      icon: 1.05,
      noaa: 1.82,
      sg: 1.05,
    },
    windSpeed1000hpa: {
      noaa: 0.49,
      sg: 0.49,
    },
    windSpeed100m: {
      noaa: 0.49,
      sg: 0.49,
    },
    windSpeed200hpa: {
      noaa: 25.57,
      sg: 25.57,
    },
    windSpeed20m: {
      noaa: 0.49,
      sg: 0.49,
    },
    windSpeed50m: {
      noaa: 0.49,
      sg: 0.49,
    },
  },
  {
    airTemperature: {
      dwd: 24.23,
      noaa: 26.54,
      sg: 24.23,
    },
    swellPeriod: {
      icon: 3.96,
      noaa: 3.49,
      sg: 3.96,
    },
    time: "2023-09-24T02:00:00+00:00",
    waveHeight: {
      icon: 0.41,
      noaa: 0.34,
      sg: 0.41,
    },
    windDirection: {
      icon: 279.49,
      noaa: 347.68,
      sg: 279.49,
    },
    windSpeed: {
      icon: 1.18,
      noaa: 1.68,
      sg: 1.18,
    },
    windSpeed1000hpa: {
      noaa: 0.38,
      sg: 0.38,
    },
    windSpeed100m: {
      noaa: 0.38,
      sg: 0.38,
    },
    windSpeed200hpa: {
      noaa: 25.91,
      sg: 25.91,
    },
    windSpeed20m: {
      noaa: 0.37,
      sg: 0.37,
    },
    windSpeed50m: {
      noaa: 0.37,
      sg: 0.37,
    },
  },
  {
    airTemperature: {
      dwd: 23.86,
      noaa: 26.5,
      sg: 23.86,
    },
    swellPeriod: {
      icon: 3.98,
      noaa: 3.53,
      sg: 3.98,
    },
    time: "2023-09-24T03:00:00+00:00",
    waveHeight: {
      icon: 0.4,
      noaa: 0.33,
      sg: 0.4,
    },
    windDirection: {
      icon: 264.54,
      noaa: 350.41,
      sg: 264.54,
    },
    windSpeed: {
      icon: 1.32,
      noaa: 1.54,
      sg: 1.32,
    },
    windSpeed1000hpa: {
      noaa: 0.26,
      sg: 0.26,
    },
    windSpeed100m: {
      noaa: 0.26,
      sg: 0.26,
    },
    windSpeed200hpa: {
      noaa: 26.26,
      sg: 26.26,
    },
    windSpeed20m: {
      noaa: 0.26,
      sg: 0.26,
    },
    windSpeed50m: {
      noaa: 0.26,
      sg: 0.26,
    },
  },
  {
    airTemperature: {
      dwd: 24.58,
      noaa: 26.43,
      sg: 24.58,
    },
    swellPeriod: {
      icon: 3.99,
      noaa: 3.97,
      sg: 3.99,
    },
    time: "2023-09-24T04:00:00+00:00",
    waveHeight: {
      icon: 0.39,
      noaa: 0.32,
      sg: 0.39,
    },
    windDirection: {
      icon: 262.18,
      noaa: 325.03,
      sg: 262.18,
    },
    windSpeed: {
      icon: 1.49,
      noaa: 1.1,
      sg: 1.49,
    },
    windSpeed1000hpa: {
      noaa: 0.26,
      sg: 0.26,
    },
    windSpeed100m: {
      noaa: 0.26,
      sg: 0.26,
    },
    windSpeed200hpa: {
      noaa: 25.99,
      sg: 25.99,
    },
    windSpeed20m: {
      noaa: 0.25,
      sg: 0.25,
    },
    windSpeed50m: {
      noaa: 0.25,
      sg: 0.25,
    },
  },
  {
    airTemperature: {
      dwd: 25.3,
      noaa: 26.37,
      sg: 25.3,
    },
    swellPeriod: {
      icon: 4.01,
      noaa: 4.42,
      sg: 4.01,
    },
    time: "2023-09-24T05:00:00+00:00",
    waveHeight: {
      icon: 0.38,
      noaa: 0.3,
      sg: 0.38,
    },
    windDirection: {
      icon: 259.83,
      noaa: 299.66,
      sg: 259.83,
    },
    windSpeed: {
      icon: 1.67,
      noaa: 0.65,
      sg: 1.67,
    },
    windSpeed1000hpa: {
      noaa: 0.26,
      sg: 0.26,
    },
    windSpeed100m: {
      noaa: 0.26,
      sg: 0.26,
    },
    windSpeed200hpa: {
      noaa: 25.71,
      sg: 25.71,
    },
    windSpeed20m: {
      noaa: 0.23,
      sg: 0.23,
    },
    windSpeed50m: {
      noaa: 0.25,
      sg: 0.25,
    },
  },
  {
    airTemperature: {
      dwd: 26.01,
      noaa: 26.3,
      sg: 26.01,
    },
    swellPeriod: {
      icon: 4.02,
      noaa: 4.86,
      sg: 4.02,
    },
    time: "2023-09-24T06:00:00+00:00",
    waveHeight: {
      icon: 0.37,
      noaa: 0.29,
      sg: 0.37,
    },
    windDirection: {
      icon: 257.47,
      noaa: 274.28,
      sg: 257.47,
    },
    windSpeed: {
      icon: 1.84,
      noaa: 0.21,
      sg: 1.84,
    },
    windSpeed1000hpa: {
      noaa: 0.26,
      sg: 0.26,
    },
    windSpeed100m: {
      noaa: 0.26,
      sg: 0.26,
    },
    windSpeed200hpa: {
      noaa: 25.44,
      sg: 25.44,
    },
    windSpeed20m: {
      noaa: 0.22,
      sg: 0.22,
    },
    windSpeed50m: {
      noaa: 0.24,
      sg: 0.24,
    },
  },
  {
    airTemperature: {
      dwd: 26.95,
      noaa: 26.45,
      sg: 26.95,
    },
    swellPeriod: {
      icon: 4.03,
      noaa: 4.86,
      sg: 4.03,
    },
    time: "2023-09-24T07:00:00+00:00",
    waveHeight: {
      icon: 0.36,
      noaa: 0.28,
      sg: 0.36,
    },
    windDirection: {
      icon: 260.17,
      noaa: 284.58,
      sg: 260.17,
    },
    windSpeed: {
      icon: 2.09,
      noaa: 0.98,
      sg: 2.09,
    },
    windSpeed1000hpa: {
      noaa: 0.89,
      sg: 0.89,
    },
    windSpeed100m: {
      noaa: 0.88,
      sg: 0.88,
    },
    windSpeed200hpa: {
      noaa: 25.16,
      sg: 25.16,
    },
    windSpeed20m: {
      noaa: 0.84,
      sg: 0.84,
    },
    windSpeed50m: {
      noaa: 0.87,
      sg: 0.87,
    },
  },
  {
    airTemperature: {
      dwd: 27.89,
      noaa: 26.6,
      sg: 27.89,
    },
    swellPeriod: {
      icon: 4.03,
      noaa: 4.86,
      sg: 4.03,
    },
    time: "2023-09-24T08:00:00+00:00",
    waveHeight: {
      icon: 0.36,
      noaa: 0.28,
      sg: 0.36,
    },
    windDirection: {
      icon: 262.88,
      noaa: 294.87,
      sg: 262.88,
    },
    windSpeed: {
      icon: 2.34,
      noaa: 1.75,
      sg: 2.34,
    },
    windSpeed1000hpa: {
      noaa: 1.51,
      sg: 1.51,
    },
    windSpeed100m: {
      noaa: 1.51,
      sg: 1.51,
    },
    windSpeed200hpa: {
      noaa: 24.88,
      sg: 24.88,
    },
    windSpeed20m: {
      noaa: 1.46,
      sg: 1.46,
    },
    windSpeed50m: {
      noaa: 1.49,
      sg: 1.49,
    },
  },
  {
    airTemperature: {
      dwd: 28.83,
      noaa: 26.75,
      sg: 28.83,
    },
    swellPeriod: {
      icon: 4.04,
      noaa: 4.86,
      sg: 4.04,
    },
    time: "2023-09-24T09:00:00+00:00",
    waveHeight: {
      icon: 0.35,
      noaa: 0.27,
      sg: 0.35,
    },
    windDirection: {
      icon: 265.58,
      noaa: 305.17,
      sg: 265.58,
    },
    windSpeed: {
      icon: 2.6,
      noaa: 2.52,
      sg: 2.6,
    },
    windSpeed1000hpa: {
      noaa: 2.14,
      sg: 2.14,
    },
    windSpeed100m: {
      noaa: 2.13,
      sg: 2.13,
    },
    windSpeed200hpa: {
      noaa: 24.6,
      sg: 24.6,
    },
    windSpeed20m: {
      noaa: 2.08,
      sg: 2.08,
    },
    windSpeed50m: {
      noaa: 2.12,
      sg: 2.12,
    },
  },
  {
    airTemperature: {
      dwd: 28.77,
      noaa: 26.94,
      sg: 28.77,
    },
    swellPeriod: {
      icon: 4.09,
      noaa: 5.17,
      sg: 4.09,
    },
    time: "2023-09-24T10:00:00+00:00",
    waveHeight: {
      icon: 0.35,
      noaa: 0.27,
      sg: 0.35,
    },
    windDirection: {
      icon: 276.08,
      noaa: 312.33,
      sg: 276.08,
    },
    windSpeed: {
      icon: 3.19,
      noaa: 3.06,
      sg: 3.19,
    },
    windSpeed1000hpa: {
      noaa: 2.22,
      sg: 2.22,
    },
    windSpeed100m: {
      noaa: 2.22,
      sg: 2.22,
    },
    windSpeed200hpa: {
      noaa: 24.67,
      sg: 24.67,
    },
    windSpeed20m: {
      noaa: 2.16,
      sg: 2.16,
    },
    windSpeed50m: {
      noaa: 2.2,
      sg: 2.2,
    },
  },
  {
    airTemperature: {
      dwd: 28.72,
      noaa: 27.13,
      sg: 28.72,
    },
    swellPeriod: {
      icon: 4.14,
      noaa: 5.47,
      sg: 4.14,
    },
    time: "2023-09-24T11:00:00+00:00",
    waveHeight: {
      icon: 0.36,
      noaa: 0.28,
      sg: 0.36,
    },
    windDirection: {
      icon: 286.58,
      noaa: 319.5,
      sg: 286.58,
    },
    windSpeed: {
      icon: 3.78,
      noaa: 3.6,
      sg: 3.78,
    },
    windSpeed1000hpa: {
      noaa: 2.31,
      sg: 2.31,
    },
    windSpeed100m: {
      noaa: 2.3,
      sg: 2.3,
    },
    windSpeed200hpa: {
      noaa: 24.75,
      sg: 24.75,
    },
    windSpeed20m: {
      noaa: 2.23,
      sg: 2.23,
    },
    windSpeed50m: {
      noaa: 2.29,
      sg: 2.29,
    },
  },
  {
    airTemperature: {
      dwd: 28.66,
      noaa: 27.32,
      sg: 28.66,
    },
    swellPeriod: {
      icon: 4.19,
      noaa: 5.78,
      sg: 4.19,
    },
    time: "2023-09-24T12:00:00+00:00",
    waveHeight: {
      icon: 0.36,
      noaa: 0.28,
      sg: 0.36,
    },
    windDirection: {
      icon: 297.08,
      noaa: 326.66,
      sg: 297.08,
    },
    windSpeed: {
      icon: 4.37,
      noaa: 4.14,
      sg: 4.37,
    },
    windSpeed1000hpa: {
      noaa: 2.39,
      sg: 2.39,
    },
    windSpeed100m: {
      noaa: 2.39,
      sg: 2.39,
    },
    windSpeed200hpa: {
      noaa: 24.82,
      sg: 24.82,
    },
    windSpeed20m: {
      noaa: 2.31,
      sg: 2.31,
    },
    windSpeed50m: {
      noaa: 2.37,
      sg: 2.37,
    },
  },
  {
    airTemperature: {
      dwd: 28.14,
      noaa: 27.34,
      sg: 28.14,
    },
    swellPeriod: {
      icon: 4.12,
      noaa: 5.52,
      sg: 4.12,
    },
    time: "2023-09-24T13:00:00+00:00",
    waveHeight: {
      icon: 0.38,
      noaa: 0.3,
      sg: 0.38,
    },
    windDirection: {
      icon: 304.06,
      noaa: 330.71,
      sg: 304.06,
    },
    windSpeed: {
      icon: 4.47,
      noaa: 4.25,
      sg: 4.47,
    },
    windSpeed1000hpa: {
      noaa: 2.19,
      sg: 2.19,
    },
    windSpeed100m: {
      noaa: 2.2,
      sg: 2.2,
    },
    windSpeed200hpa: {
      noaa: 25.12,
      sg: 25.12,
    },
    windSpeed20m: {
      noaa: 2.09,
      sg: 2.09,
    },
    windSpeed50m: {
      noaa: 2.17,
      sg: 2.17,
    },
  },
  {
    airTemperature: {
      dwd: 27.62,
      noaa: 27.36,
      sg: 27.62,
    },
    swellPeriod: {
      icon: 4.05,
      noaa: 5.25,
      sg: 4.05,
    },
    time: "2023-09-24T14:00:00+00:00",
    waveHeight: {
      icon: 0.4,
      noaa: 0.31,
      sg: 0.4,
    },
    windDirection: {
      icon: 311.05,
      noaa: 334.77,
      sg: 311.05,
    },
    windSpeed: {
      icon: 4.57,
      noaa: 4.37,
      sg: 4.57,
    },
    windSpeed1000hpa: {
      noaa: 2,
      sg: 2,
    },
    windSpeed100m: {
      noaa: 2.01,
      sg: 2.01,
    },
    windSpeed200hpa: {
      noaa: 25.41,
      sg: 25.41,
    },
    windSpeed20m: {
      noaa: 1.88,
      sg: 1.88,
    },
    windSpeed50m: {
      noaa: 1.96,
      sg: 1.96,
    },
  },
  {
    airTemperature: {
      dwd: 27.1,
      noaa: 27.38,
      sg: 27.1,
    },
    swellPeriod: {
      icon: 3.98,
      noaa: 4.99,
      sg: 3.98,
    },
    time: "2023-09-24T15:00:00+00:00",
    waveHeight: {
      icon: 0.42,
      noaa: 0.33,
      sg: 0.42,
    },
    windDirection: {
      icon: 318.03,
      noaa: 338.82,
      sg: 318.03,
    },
    windSpeed: {
      icon: 4.67,
      noaa: 4.48,
      sg: 4.67,
    },
    windSpeed1000hpa: {
      noaa: 1.8,
      sg: 1.8,
    },
    windSpeed100m: {
      noaa: 1.82,
      sg: 1.82,
    },
    windSpeed200hpa: {
      noaa: 25.71,
      sg: 25.71,
    },
    windSpeed20m: {
      noaa: 1.66,
      sg: 1.66,
    },
    windSpeed50m: {
      noaa: 1.76,
      sg: 1.76,
    },
  },
  {
    airTemperature: {
      dwd: 26.79,
      noaa: 27.32,
      sg: 26.79,
    },
    swellPeriod: {
      icon: 3.84,
      noaa: 4.95,
      sg: 3.84,
    },
    time: "2023-09-24T16:00:00+00:00",
    waveHeight: {
      icon: 0.41,
      noaa: 0.33,
      sg: 0.41,
    },
    windDirection: {
      icon: 322.2,
      noaa: 344.37,
      sg: 322.2,
    },
    windSpeed: {
      icon: 3.74,
      noaa: 4.23,
      sg: 3.74,
    },
    windSpeed1000hpa: {
      noaa: 1.3,
      sg: 1.3,
    },
    windSpeed100m: {
      noaa: 1.31,
      sg: 1.31,
    },
    windSpeed200hpa: {
      noaa: 26.4,
      sg: 26.4,
    },
    windSpeed20m: {
      noaa: 1.2,
      sg: 1.2,
    },
    windSpeed50m: {
      noaa: 1.27,
      sg: 1.27,
    },
  },
  {
    airTemperature: {
      dwd: 26.48,
      noaa: 27.25,
      sg: 26.48,
    },
    swellPeriod: {
      icon: 3.71,
      noaa: 4.91,
      sg: 3.71,
    },
    time: "2023-09-24T17:00:00+00:00",
    waveHeight: {
      icon: 0.39,
      noaa: 0.34,
      sg: 0.39,
    },
    windDirection: {
      icon: 326.37,
      noaa: 349.92,
      sg: 326.37,
    },
    windSpeed: {
      icon: 2.81,
      noaa: 3.98,
      sg: 2.81,
    },
    windSpeed1000hpa: {
      noaa: 0.79,
      sg: 0.79,
    },
    windSpeed100m: {
      noaa: 0.8,
      sg: 0.8,
    },
    windSpeed200hpa: {
      noaa: 27.1,
      sg: 27.1,
    },
    windSpeed20m: {
      noaa: 0.75,
      sg: 0.75,
    },
    windSpeed50m: {
      noaa: 0.79,
      sg: 0.79,
    },
  },
  {
    airTemperature: {
      dwd: 26.17,
      noaa: 27.19,
      sg: 26.17,
    },
    swellPeriod: {
      icon: 3.57,
      noaa: 4.87,
      sg: 3.57,
    },
    time: "2023-09-24T18:00:00+00:00",
    waveHeight: {
      icon: 0.38,
      noaa: 0.34,
      sg: 0.38,
    },
    windDirection: {
      icon: 330.54,
      noaa: 355.47,
      sg: 330.54,
    },
    windSpeed: {
      icon: 1.88,
      noaa: 3.73,
      sg: 1.88,
    },
    windSpeed1000hpa: {
      noaa: 0.29,
      sg: 0.29,
    },
    windSpeed100m: {
      noaa: 0.29,
      sg: 0.29,
    },
    windSpeed200hpa: {
      noaa: 27.79,
      sg: 27.79,
    },
    windSpeed20m: {
      noaa: 0.29,
      sg: 0.29,
    },
    windSpeed50m: {
      noaa: 0.3,
      sg: 0.3,
    },
  },
  {
    airTemperature: {
      dwd: 25.95,
      noaa: 27.07,
      sg: 25.95,
    },
    swellPeriod: {
      icon: 3.61,
      noaa: 4.25,
      sg: 3.61,
    },
    time: "2023-09-24T19:00:00+00:00",
    waveHeight: {
      icon: 0.37,
      noaa: 0.33,
      sg: 0.37,
    },
    windDirection: {
      icon: 305.69,
      noaa: 354.72,
      sg: 305.69,
    },
    windSpeed: {
      icon: 1.63,
      noaa: 2.99,
      sg: 1.63,
    },
    windSpeed1000hpa: {
      noaa: 0.26,
      sg: 0.26,
    },
    windSpeed100m: {
      noaa: 0.25,
      sg: 0.25,
    },
    windSpeed200hpa: {
      noaa: 27.47,
      sg: 27.47,
    },
    windSpeed20m: {
      noaa: 0.25,
      sg: 0.25,
    },
    windSpeed50m: {
      noaa: 0.26,
      sg: 0.26,
    },
  },
  {
    airTemperature: {
      dwd: 25.73,
      noaa: 26.94,
      sg: 25.73,
    },
    swellPeriod: {
      icon: 3.65,
      noaa: 3.63,
      sg: 3.65,
    },
    time: "2023-09-24T20:00:00+00:00",
    waveHeight: {
      icon: 0.37,
      noaa: 0.33,
      sg: 0.37,
    },
    windDirection: {
      icon: 280.84,
      noaa: 353.96,
      sg: 280.84,
    },
    windSpeed: {
      icon: 1.38,
      noaa: 2.24,
      sg: 1.38,
    },
    windSpeed1000hpa: {
      noaa: 0.22,
      sg: 0.22,
    },
    windSpeed100m: {
      noaa: 0.22,
      sg: 0.22,
    },
    windSpeed200hpa: {
      noaa: 27.14,
      sg: 27.14,
    },
    windSpeed20m: {
      noaa: 0.21,
      sg: 0.21,
    },
    windSpeed50m: {
      noaa: 0.22,
      sg: 0.22,
    },
  },
  {
    airTemperature: {
      dwd: 25.52,
      noaa: 26.82,
      sg: 25.52,
    },
    swellPeriod: {
      icon: 3.69,
      noaa: 3.01,
      sg: 3.69,
    },
    time: "2023-09-24T21:00:00+00:00",
    waveHeight: {
      icon: 0.36,
      noaa: 0.32,
      sg: 0.36,
    },
    windDirection: {
      icon: 255.99,
      noaa: 353.21,
      sg: 255.99,
    },
    windSpeed: {
      icon: 1.13,
      noaa: 1.5,
      sg: 1.13,
    },
    windSpeed1000hpa: {
      noaa: 0.19,
      sg: 0.19,
    },
    windSpeed100m: {
      noaa: 0.18,
      sg: 0.18,
    },
    windSpeed200hpa: {
      noaa: 26.82,
      sg: 26.82,
    },
    windSpeed20m: {
      noaa: 0.17,
      sg: 0.17,
    },
    windSpeed50m: {
      noaa: 0.18,
      sg: 0.18,
    },
  },
  {
    airTemperature: {
      dwd: 25.12,
      noaa: 26.7,
      sg: 25.12,
    },
    swellPeriod: {
      icon: 3.71,
      noaa: 3.91,
      sg: 3.71,
    },
    time: "2023-09-24T22:00:00+00:00",
    waveHeight: {
      icon: 0.36,
      noaa: 0.31,
      sg: 0.36,
    },
    windDirection: {
      icon: 245.31,
      noaa: 344.91,
      sg: 245.31,
    },
    windSpeed: {
      icon: 1.38,
      noaa: 1.41,
      sg: 1.38,
    },
    windSpeed1000hpa: {
      noaa: 0.35,
      sg: 0.35,
    },
    windSpeed100m: {
      noaa: 0.35,
      sg: 0.35,
    },
    windSpeed200hpa: {
      noaa: 26.86,
      sg: 26.86,
    },
    windSpeed20m: {
      noaa: 0.33,
      sg: 0.33,
    },
    windSpeed50m: {
      noaa: 0.34,
      sg: 0.34,
    },
  },
  {
    airTemperature: {
      dwd: 24.73,
      noaa: 26.58,
      sg: 24.73,
    },
    swellPeriod: {
      icon: 3.74,
      noaa: 4.82,
      sg: 3.74,
    },
    time: "2023-09-24T23:00:00+00:00",
    waveHeight: {
      icon: 0.35,
      noaa: 0.31,
      sg: 0.35,
    },
    windDirection: {
      icon: 234.63,
      noaa: 336.6,
      sg: 234.63,
    },
    windSpeed: {
      icon: 1.64,
      noaa: 1.32,
      sg: 1.64,
    },
    windSpeed1000hpa: {
      noaa: 0.52,
      sg: 0.52,
    },
    windSpeed100m: {
      noaa: 0.51,
      sg: 0.51,
    },
    windSpeed200hpa: {
      noaa: 26.91,
      sg: 26.91,
    },
    windSpeed20m: {
      noaa: 0.5,
      sg: 0.5,
    },
    windSpeed50m: {
      noaa: 0.51,
      sg: 0.51,
    },
  },
  {
    airTemperature: {
      dwd: 24.33,
      noaa: 26.47,
      sg: 24.33,
    },
    swellPeriod: {
      icon: 3.76,
      noaa: 5.72,
      sg: 3.76,
    },
    time: "2023-09-25T00:00:00+00:00",
    waveHeight: {
      icon: 0.35,
      noaa: 0.3,
      sg: 0.35,
    },
    windDirection: {
      icon: 223.95,
      noaa: 328.3,
      sg: 223.95,
    },
    windSpeed: {
      icon: 1.89,
      noaa: 1.23,
      sg: 1.89,
    },
    windSpeed1000hpa: {
      noaa: 0.68,
      sg: 0.68,
    },
    windSpeed100m: {
      noaa: 0.68,
      sg: 0.68,
    },
    windSpeed200hpa: {
      noaa: 26.95,
      sg: 26.95,
    },
    windSpeed20m: {
      noaa: 0.66,
      sg: 0.66,
    },
    windSpeed50m: {
      noaa: 0.67,
      sg: 0.67,
    },
  },
  {
    airTemperature: {
      noaa: 26.4,
      sg: 26.4,
    },
    swellPeriod: {
      icon: 3.78,
      noaa: 5.55,
      sg: 3.78,
    },
    time: "2023-09-25T01:00:00+00:00",
    waveHeight: {
      icon: 0.35,
      noaa: 0.29,
      sg: 0.35,
    },
    windDirection: {
      icon: 223.42,
      noaa: 307.13,
      sg: 223.42,
    },
    windSpeed: {
      icon: 1.83,
      noaa: 0.93,
      sg: 1.83,
    },
    windSpeed1000hpa: {
      noaa: 0.59,
      sg: 0.59,
    },
    windSpeed100m: {
      noaa: 0.6,
      sg: 0.6,
    },
    windSpeed200hpa: {
      noaa: 27.61,
      sg: 27.61,
    },
    windSpeed20m: {
      noaa: 0.56,
      sg: 0.56,
    },
    windSpeed50m: {
      noaa: 0.58,
      sg: 0.58,
    },
  },
  {
    airTemperature: {
      noaa: 26.34,
      sg: 26.34,
    },
    swellPeriod: {
      icon: 3.81,
      noaa: 5.37,
      sg: 3.81,
    },
    time: "2023-09-25T02:00:00+00:00",
    waveHeight: {
      icon: 0.35,
      noaa: 0.28,
      sg: 0.35,
    },
    windDirection: {
      icon: 222.9,
      noaa: 285.95,
      sg: 222.9,
    },
    windSpeed: {
      icon: 1.77,
      noaa: 0.63,
      sg: 1.77,
    },
    windSpeed1000hpa: {
      noaa: 0.51,
      sg: 0.51,
    },
    windSpeed100m: {
      noaa: 0.52,
      sg: 0.52,
    },
    windSpeed200hpa: {
      noaa: 28.27,
      sg: 28.27,
    },
    windSpeed20m: {
      noaa: 0.46,
      sg: 0.46,
    },
    windSpeed50m: {
      noaa: 0.49,
      sg: 0.49,
    },
  },
  {
    airTemperature: {
      noaa: 26.28,
      sg: 26.28,
    },
    swellPeriod: {
      icon: 3.83,
      noaa: 5.2,
      sg: 3.83,
    },
    time: "2023-09-25T03:00:00+00:00",
    waveHeight: {
      icon: 0.35,
      noaa: 0.27,
      sg: 0.35,
    },
    windDirection: {
      icon: 222.37,
      noaa: 264.78,
      sg: 222.37,
    },
    windSpeed: {
      icon: 1.71,
      noaa: 0.33,
      sg: 1.71,
    },
    windSpeed1000hpa: {
      noaa: 0.42,
      sg: 0.42,
    },
    windSpeed100m: {
      noaa: 0.44,
      sg: 0.44,
    },
    windSpeed200hpa: {
      noaa: 28.93,
      sg: 28.93,
    },
    windSpeed20m: {
      noaa: 0.36,
      sg: 0.36,
    },
    windSpeed50m: {
      noaa: 0.4,
      sg: 0.4,
    },
  },
  {
    airTemperature: {
      noaa: 26.26,
      sg: 26.26,
    },
    swellPeriod: {
      icon: 3.85,
      noaa: 5.17,
      sg: 3.85,
    },
    time: "2023-09-25T04:00:00+00:00",
    waveHeight: {
      icon: 0.35,
      noaa: 0.26,
      sg: 0.35,
    },
    windDirection: {
      icon: 216.6,
      noaa: 253.45,
      sg: 216.6,
    },
    windSpeed: {
      icon: 1.81,
      noaa: 0.37,
      sg: 1.81,
    },
    windSpeed1000hpa: {
      noaa: 0.43,
      sg: 0.43,
    },
    windSpeed100m: {
      noaa: 0.45,
      sg: 0.45,
    },
    windSpeed200hpa: {
      noaa: 29.03,
      sg: 29.03,
    },
    windSpeed20m: {
      noaa: 0.37,
      sg: 0.37,
    },
    windSpeed50m: {
      noaa: 0.41,
      sg: 0.41,
    },
  },
  {
    airTemperature: {
      noaa: 26.25,
      sg: 26.25,
    },
    swellPeriod: {
      icon: 3.86,
      noaa: 5.14,
      sg: 3.86,
    },
    time: "2023-09-25T05:00:00+00:00",
    waveHeight: {
      icon: 0.34,
      noaa: 0.26,
      sg: 0.34,
    },
    windDirection: {
      icon: 210.83,
      noaa: 242.12,
      sg: 210.83,
    },
    windSpeed: {
      icon: 1.91,
      noaa: 0.42,
      sg: 1.91,
    },
    windSpeed1000hpa: {
      noaa: 0.45,
      sg: 0.45,
    },
    windSpeed100m: {
      noaa: 0.47,
      sg: 0.47,
    },
    windSpeed200hpa: {
      noaa: 29.12,
      sg: 29.12,
    },
    windSpeed20m: {
      noaa: 0.38,
      sg: 0.38,
    },
    windSpeed50m: {
      noaa: 0.41,
      sg: 0.41,
    },
  },
  {
    airTemperature: {
      noaa: 26.23,
      sg: 26.23,
    },
    swellPeriod: {
      icon: 3.88,
      noaa: 5.11,
      sg: 3.88,
    },
    time: "2023-09-25T06:00:00+00:00",
    waveHeight: {
      icon: 0.34,
      noaa: 0.25,
      sg: 0.34,
    },
    windDirection: {
      icon: 205.06,
      noaa: 230.79,
      sg: 205.06,
    },
    windSpeed: {
      icon: 2.01,
      noaa: 0.46,
      sg: 2.01,
    },
    windSpeed1000hpa: {
      noaa: 0.46,
      sg: 0.46,
    },
    windSpeed100m: {
      noaa: 0.48,
      sg: 0.48,
    },
    windSpeed200hpa: {
      noaa: 29.22,
      sg: 29.22,
    },
    windSpeed20m: {
      noaa: 0.39,
      sg: 0.39,
    },
    windSpeed50m: {
      noaa: 0.42,
      sg: 0.42,
    },
  },
  {
    airTemperature: {
      noaa: 26.39,
      sg: 26.39,
    },
    swellPeriod: {
      icon: 3.9,
      noaa: 5.09,
      sg: 3.9,
    },
    time: "2023-09-25T07:00:00+00:00",
    waveHeight: {
      icon: 0.34,
      noaa: 0.25,
      sg: 0.34,
    },
    windDirection: {
      icon: 223.17,
      noaa: 248.76,
      sg: 223.17,
    },
    windSpeed: {
      icon: 2.22,
      noaa: 1.08,
      sg: 2.22,
    },
    windSpeed1000hpa: {
      noaa: 1.08,
      sg: 1.08,
    },
    windSpeed100m: {
      noaa: 1.1,
      sg: 1.1,
    },
    windSpeed200hpa: {
      noaa: 29.29,
      sg: 29.29,
    },
    windSpeed20m: {
      noaa: 1.02,
      sg: 1.02,
    },
    windSpeed50m: {
      noaa: 1.05,
      sg: 1.05,
    },
  },
  {
    airTemperature: {
      noaa: 26.55,
      sg: 26.55,
    },
    swellPeriod: {
      icon: 3.92,
      noaa: 5.06,
      sg: 3.92,
    },
    time: "2023-09-25T08:00:00+00:00",
    waveHeight: {
      icon: 0.34,
      noaa: 0.24,
      sg: 0.34,
    },
    windDirection: {
      icon: 241.27,
      noaa: 266.72,
      sg: 241.27,
    },
    windSpeed: {
      icon: 2.44,
      noaa: 1.71,
      sg: 2.44,
    },
    windSpeed1000hpa: {
      noaa: 1.71,
      sg: 1.71,
    },
    windSpeed100m: {
      noaa: 1.71,
      sg: 1.71,
    },
    windSpeed200hpa: {
      noaa: 29.36,
      sg: 29.36,
    },
    windSpeed20m: {
      noaa: 1.64,
      sg: 1.64,
    },
    windSpeed50m: {
      noaa: 1.68,
      sg: 1.68,
    },
  },
  {
    airTemperature: {
      noaa: 26.71,
      sg: 26.71,
    },
    swellPeriod: {
      icon: 3.94,
      noaa: 5.04,
      sg: 3.94,
    },
    time: "2023-09-25T09:00:00+00:00",
    waveHeight: {
      icon: 0.34,
      noaa: 0.24,
      sg: 0.34,
    },
    windDirection: {
      icon: 259.38,
      noaa: 284.69,
      sg: 259.38,
    },
    windSpeed: {
      icon: 2.65,
      noaa: 2.33,
      sg: 2.65,
    },
    windSpeed1000hpa: {
      noaa: 2.33,
      sg: 2.33,
    },
    windSpeed100m: {
      noaa: 2.33,
      sg: 2.33,
    },
    windSpeed200hpa: {
      noaa: 29.43,
      sg: 29.43,
    },
    windSpeed20m: {
      noaa: 2.27,
      sg: 2.27,
    },
    windSpeed50m: {
      noaa: 2.31,
      sg: 2.31,
    },
  },
  {
    airTemperature: {
      noaa: 26.91,
      sg: 26.91,
    },
    swellPeriod: {
      icon: 3.97,
      noaa: 5.19,
      sg: 3.97,
    },
    time: "2023-09-25T10:00:00+00:00",
    waveHeight: {
      icon: 0.34,
      noaa: 0.25,
      sg: 0.34,
    },
    windDirection: {
      icon: 271.75,
      noaa: 296.34,
      sg: 271.75,
    },
    windSpeed: {
      icon: 3.09,
      noaa: 2.98,
      sg: 3.09,
    },
    windSpeed1000hpa: {
      noaa: 2.53,
      sg: 2.53,
    },
    windSpeed100m: {
      noaa: 2.54,
      sg: 2.54,
    },
    windSpeed200hpa: {
      noaa: 28.69,
      sg: 28.69,
    },
    windSpeed20m: {
      noaa: 2.45,
      sg: 2.45,
    },
    windSpeed50m: {
      noaa: 2.51,
      sg: 2.51,
    },
  },
  {
    airTemperature: {
      noaa: 27.11,
      sg: 27.11,
    },
    swellPeriod: {
      icon: 4.01,
      noaa: 5.34,
      sg: 4.01,
    },
    time: "2023-09-25T11:00:00+00:00",
    waveHeight: {
      icon: 0.35,
      noaa: 0.26,
      sg: 0.35,
    },
    windDirection: {
      icon: 284.11,
      noaa: 307.99,
      sg: 284.11,
    },
    windSpeed: {
      icon: 3.54,
      noaa: 3.63,
      sg: 3.54,
    },
    windSpeed1000hpa: {
      noaa: 2.74,
      sg: 2.74,
    },
    windSpeed100m: {
      noaa: 2.75,
      sg: 2.75,
    },
    windSpeed200hpa: {
      noaa: 27.96,
      sg: 27.96,
    },
    windSpeed20m: {
      noaa: 2.64,
      sg: 2.64,
    },
    windSpeed50m: {
      noaa: 2.72,
      sg: 2.72,
    },
  },
  {
    airTemperature: {
      noaa: 27.31,
      sg: 27.31,
    },
    swellPeriod: {
      icon: 4.04,
      noaa: 5.49,
      sg: 4.04,
    },
    time: "2023-09-25T12:00:00+00:00",
    waveHeight: {
      icon: 0.35,
      noaa: 0.27,
      sg: 0.35,
    },
    windDirection: {
      icon: 296.48,
      noaa: 319.64,
      sg: 296.48,
    },
    windSpeed: {
      icon: 3.98,
      noaa: 4.28,
      sg: 3.98,
    },
    windSpeed1000hpa: {
      noaa: 2.94,
      sg: 2.94,
    },
    windSpeed100m: {
      noaa: 2.96,
      sg: 2.96,
    },
    windSpeed200hpa: {
      noaa: 27.22,
      sg: 27.22,
    },
    windSpeed20m: {
      noaa: 2.82,
      sg: 2.82,
    },
    windSpeed50m: {
      noaa: 2.92,
      sg: 2.92,
    },
  },
  {
    airTemperature: {
      noaa: 27.33,
      sg: 27.33,
    },
    swellPeriod: {
      icon: 3.97,
      noaa: 5.41,
      sg: 3.97,
    },
    time: "2023-09-25T13:00:00+00:00",
    waveHeight: {
      icon: 0.35,
      noaa: 0.29,
      sg: 0.35,
    },
    windDirection: {
      icon: 306.15,
      noaa: 326.7,
      sg: 306.15,
    },
    windSpeed: {
      icon: 3.87,
      noaa: 4.34,
      sg: 3.87,
    },
    windSpeed1000hpa: {
      noaa: 2.5,
      sg: 2.5,
    },
    windSpeed100m: {
      noaa: 2.51,
      sg: 2.51,
    },
    windSpeed200hpa: {
      noaa: 26.33,
      sg: 26.33,
    },
    windSpeed20m: {
      noaa: 2.38,
      sg: 2.38,
    },
    windSpeed50m: {
      noaa: 2.47,
      sg: 2.47,
    },
  },
  {
    airTemperature: {
      noaa: 27.36,
      sg: 27.36,
    },
    swellPeriod: {
      icon: 3.9,
      noaa: 5.32,
      sg: 3.9,
    },
    time: "2023-09-25T14:00:00+00:00",
    waveHeight: {
      icon: 0.36,
      noaa: 0.31,
      sg: 0.36,
    },
    windDirection: {
      icon: 315.81,
      noaa: 333.77,
      sg: 315.81,
    },
    windSpeed: {
      icon: 3.75,
      noaa: 4.4,
      sg: 3.75,
    },
    windSpeed1000hpa: {
      noaa: 2.05,
      sg: 2.05,
    },
    windSpeed100m: {
      noaa: 2.06,
      sg: 2.06,
    },
    windSpeed200hpa: {
      noaa: 25.45,
      sg: 25.45,
    },
    windSpeed20m: {
      noaa: 1.94,
      sg: 1.94,
    },
    windSpeed50m: {
      noaa: 2.03,
      sg: 2.03,
    },
  },
  {
    airTemperature: {
      noaa: 27.38,
      sg: 27.38,
    },
    swellPeriod: {
      icon: 3.83,
      noaa: 5.24,
      sg: 3.83,
    },
    time: "2023-09-25T15:00:00+00:00",
    waveHeight: {
      icon: 0.36,
      noaa: 0.33,
      sg: 0.36,
    },
    windDirection: {
      icon: 325.48,
      noaa: 340.83,
      sg: 325.48,
    },
    windSpeed: {
      icon: 3.64,
      noaa: 4.46,
      sg: 3.64,
    },
    windSpeed1000hpa: {
      noaa: 1.61,
      sg: 1.61,
    },
    windSpeed100m: {
      noaa: 1.61,
      sg: 1.61,
    },
    windSpeed200hpa: {
      noaa: 24.56,
      sg: 24.56,
    },
    windSpeed20m: {
      noaa: 1.5,
      sg: 1.5,
    },
    windSpeed50m: {
      noaa: 1.58,
      sg: 1.58,
    },
  },
  {
    airTemperature: {
      noaa: 27.32,
      sg: 27.32,
    },
    swellPeriod: {
      icon: 3.79,
      noaa: 5.23,
      sg: 3.79,
    },
    time: "2023-09-25T16:00:00+00:00",
    waveHeight: {
      icon: 0.35,
      noaa: 0.34,
      sg: 0.35,
    },
    windDirection: {
      icon: 334.51,
      noaa: 346.68,
      sg: 334.51,
    },
    windSpeed: {
      icon: 3.07,
      noaa: 4.2,
      sg: 3.07,
    },
    windSpeed1000hpa: {
      noaa: 1.11,
      sg: 1.11,
    },
    windSpeed100m: {
      noaa: 1.11,
      sg: 1.11,
    },
    windSpeed200hpa: {
      noaa: 23.75,
      sg: 23.75,
    },
    windSpeed20m: {
      noaa: 1.04,
      sg: 1.04,
    },
    windSpeed50m: {
      noaa: 1.09,
      sg: 1.09,
    },
  },
  {
    airTemperature: {
      noaa: 27.26,
      sg: 27.26,
    },
    swellPeriod: {
      icon: 3.75,
      noaa: 5.23,
      sg: 3.75,
    },
    time: "2023-09-25T17:00:00+00:00",
    waveHeight: {
      icon: 0.35,
      noaa: 0.35,
      sg: 0.35,
    },
    windDirection: {
      icon: 343.55,
      noaa: 352.53,
      sg: 343.55,
    },
    windSpeed: {
      icon: 2.51,
      noaa: 3.93,
      sg: 2.51,
    },
    windSpeed1000hpa: {
      noaa: 0.61,
      sg: 0.61,
    },
    windSpeed100m: {
      noaa: 0.62,
      sg: 0.62,
    },
    windSpeed200hpa: {
      noaa: 22.94,
      sg: 22.94,
    },
    windSpeed20m: {
      noaa: 0.57,
      sg: 0.57,
    },
    windSpeed50m: {
      noaa: 0.6,
      sg: 0.6,
    },
  },
  {
    airTemperature: {
      noaa: 27.19,
      sg: 27.19,
    },
    swellPeriod: {
      icon: 3.71,
      noaa: 5.22,
      sg: 3.71,
    },
    time: "2023-09-25T18:00:00+00:00",
    waveHeight: {
      icon: 0.34,
      noaa: 0.36,
      sg: 0.34,
    },
    windDirection: {
      icon: 352.58,
      noaa: 358.38,
      sg: 352.58,
    },
    windSpeed: {
      icon: 1.94,
      noaa: 3.67,
      sg: 1.94,
    },
    windSpeed1000hpa: {
      noaa: 0.11,
      sg: 0.11,
    },
    windSpeed100m: {
      noaa: 0.12,
      sg: 0.12,
    },
    windSpeed200hpa: {
      noaa: 22.13,
      sg: 22.13,
    },
    windSpeed20m: {
      noaa: 0.11,
      sg: 0.11,
    },
    windSpeed50m: {
      noaa: 0.11,
      sg: 0.11,
    },
  },
  {
    airTemperature: {
      noaa: 27.09,
      sg: 27.09,
    },
    swellPeriod: {
      icon: 3.73,
      noaa: 4.46,
      sg: 3.73,
    },
    time: "2023-09-25T19:00:00+00:00",
    waveHeight: {
      icon: 0.34,
      noaa: 0.36,
      sg: 0.34,
    },
    windDirection: {
      icon: 351.73,
      noaa: 355.65,
      sg: 351.73,
    },
    windSpeed: {
      icon: 1.53,
      noaa: 3.03,
      sg: 1.53,
    },
    windSpeed1000hpa: {
      noaa: 0.17,
      sg: 0.17,
    },
    windSpeed100m: {
      noaa: 0.18,
      sg: 0.18,
    },
    windSpeed200hpa: {
      noaa: 22,
      sg: 22,
    },
    windSpeed20m: {
      noaa: 0.17,
      sg: 0.17,
    },
    windSpeed50m: {
      noaa: 0.18,
      sg: 0.18,
    },
  },
  {
    airTemperature: {
      noaa: 26.99,
      sg: 26.99,
    },
    swellPeriod: {
      icon: 3.75,
      noaa: 3.7,
      sg: 3.75,
    },
    time: "2023-09-25T20:00:00+00:00",
    waveHeight: {
      icon: 0.33,
      noaa: 0.35,
      sg: 0.33,
    },
    windDirection: {
      icon: 350.87,
      noaa: 352.93,
      sg: 350.87,
    },
    windSpeed: {
      icon: 1.13,
      noaa: 2.38,
      sg: 1.13,
    },
    windSpeed1000hpa: {
      noaa: 0.24,
      sg: 0.24,
    },
    windSpeed100m: {
      noaa: 0.25,
      sg: 0.25,
    },
    windSpeed200hpa: {
      noaa: 21.88,
      sg: 21.88,
    },
    windSpeed20m: {
      noaa: 0.24,
      sg: 0.24,
    },
    windSpeed50m: {
      noaa: 0.24,
      sg: 0.24,
    },
  },
  {
    airTemperature: {
      noaa: 26.89,
      sg: 26.89,
    },
    swellPeriod: {
      icon: 3.77,
      noaa: 2.94,
      sg: 3.77,
    },
    time: "2023-09-25T21:00:00+00:00",
    waveHeight: {
      icon: 0.33,
      noaa: 0.35,
      sg: 0.33,
    },
    windDirection: {
      icon: 350.02,
      noaa: 350.2,
      sg: 350.02,
    },
    windSpeed: {
      icon: 0.72,
      noaa: 1.74,
      sg: 0.72,
    },
    windSpeed1000hpa: {
      noaa: 0.3,
      sg: 0.3,
    },
    windSpeed100m: {
      noaa: 0.31,
      sg: 0.31,
    },
    windSpeed200hpa: {
      noaa: 21.75,
      sg: 21.75,
    },
    windSpeed20m: {
      noaa: 0.3,
      sg: 0.3,
    },
    windSpeed50m: {
      noaa: 0.31,
      sg: 0.31,
    },
  },
  {
    airTemperature: {
      noaa: 26.78,
      sg: 26.78,
    },
    swellPeriod: {
      icon: 3.79,
      noaa: 3,
      sg: 3.79,
    },
    time: "2023-09-25T22:00:00+00:00",
    waveHeight: {
      icon: 0.32,
      noaa: 0.35,
      sg: 0.32,
    },
    windDirection: {
      icon: 321.72,
      noaa: 329.67,
      sg: 321.72,
    },
    windSpeed: {
      icon: 0.82,
      noaa: 1.78,
      sg: 0.82,
    },
    windSpeed1000hpa: {
      noaa: 0.81,
      sg: 0.81,
    },
    windSpeed100m: {
      noaa: 0.82,
      sg: 0.82,
    },
    windSpeed200hpa: {
      noaa: 21.89,
      sg: 21.89,
    },
    windSpeed20m: {
      noaa: 0.8,
      sg: 0.8,
    },
    windSpeed50m: {
      noaa: 0.82,
      sg: 0.82,
    },
  },
  {
    airTemperature: {
      noaa: 26.66,
      sg: 26.66,
    },
    swellPeriod: {
      icon: 3.8,
      noaa: 3.05,
      sg: 3.8,
    },
    time: "2023-09-25T23:00:00+00:00",
    waveHeight: {
      icon: 0.32,
      noaa: 0.34,
      sg: 0.32,
    },
    windDirection: {
      icon: 293.43,
      noaa: 309.15,
      sg: 293.43,
    },
    windSpeed: {
      icon: 0.93,
      noaa: 1.83,
      sg: 0.93,
    },
    windSpeed1000hpa: {
      noaa: 1.33,
      sg: 1.33,
    },
    windSpeed100m: {
      noaa: 1.33,
      sg: 1.33,
    },
    windSpeed200hpa: {
      noaa: 22.03,
      sg: 22.03,
    },
    windSpeed20m: {
      noaa: 1.3,
      sg: 1.3,
    },
    windSpeed50m: {
      noaa: 1.32,
      sg: 1.32,
    },
  },
  {
    airTemperature: {
      noaa: 26.55,
      sg: 26.55,
    },
    swellPeriod: {
      icon: 3.82,
      noaa: 3.11,
      sg: 3.82,
    },
    time: "2023-09-26T00:00:00+00:00",
    waveHeight: {
      icon: 0.31,
      noaa: 0.34,
      sg: 0.31,
    },
    windDirection: {
      icon: 265.13,
      noaa: 288.62,
      sg: 265.13,
    },
    windSpeed: {
      icon: 1.03,
      noaa: 1.87,
      sg: 1.03,
    },
    windSpeed1000hpa: {
      noaa: 1.84,
      sg: 1.84,
    },
    windSpeed100m: {
      noaa: 1.84,
      sg: 1.84,
    },
    windSpeed200hpa: {
      noaa: 22.17,
      sg: 22.17,
    },
    windSpeed20m: {
      noaa: 1.8,
      sg: 1.8,
    },
    windSpeed50m: {
      noaa: 1.83,
      sg: 1.83,
    },
  },
  {
    airTemperature: {
      noaa: 26.5,
      sg: 26.5,
    },
    swellPeriod: {
      icon: 3.85,
      noaa: 3.79,
      sg: 3.85,
    },
    time: "2023-09-26T01:00:00+00:00",
    waveHeight: {
      icon: 0.31,
      noaa: 0.33,
      sg: 0.31,
    },
    windDirection: {
      icon: 243.22,
      noaa: 292.46,
      sg: 243.22,
    },
    windSpeed: {
      icon: 0.95,
      noaa: 1.49,
      sg: 0.95,
    },
    windSpeed1000hpa: {
      noaa: 1.46,
      sg: 1.46,
    },
    windSpeed100m: {
      noaa: 1.46,
      sg: 1.46,
    },
    windSpeed200hpa: {
      noaa: 22.22,
      sg: 22.22,
    },
    windSpeed20m: {
      noaa: 1.42,
      sg: 1.42,
    },
    windSpeed50m: {
      noaa: 1.45,
      sg: 1.45,
    },
  },
  {
    airTemperature: {
      noaa: 26.46,
      sg: 26.46,
    },
    swellPeriod: {
      icon: 3.87,
      noaa: 4.48,
      sg: 3.87,
    },
    time: "2023-09-26T02:00:00+00:00",
    waveHeight: {
      icon: 0.3,
      noaa: 0.33,
      sg: 0.3,
    },
    windDirection: {
      icon: 221.3,
      noaa: 296.29,
      sg: 221.3,
    },
    windSpeed: {
      icon: 0.87,
      noaa: 1.12,
      sg: 0.87,
    },
    windSpeed1000hpa: {
      noaa: 1.07,
      sg: 1.07,
    },
    windSpeed100m: {
      noaa: 1.09,
      sg: 1.09,
    },
    windSpeed200hpa: {
      noaa: 22.27,
      sg: 22.27,
    },
    windSpeed20m: {
      noaa: 1.04,
      sg: 1.04,
    },
    windSpeed50m: {
      noaa: 1.06,
      sg: 1.06,
    },
  },
  {
    airTemperature: {
      noaa: 26.42,
      sg: 26.42,
    },
    swellPeriod: {
      icon: 3.9,
      noaa: 5.16,
      sg: 3.9,
    },
    time: "2023-09-26T03:00:00+00:00",
    waveHeight: {
      icon: 0.3,
      noaa: 0.32,
      sg: 0.3,
    },
    windDirection: {
      icon: 199.39,
      noaa: 300.13,
      sg: 199.39,
    },
    windSpeed: {
      icon: 0.79,
      noaa: 0.74,
      sg: 0.79,
    },
    windSpeed1000hpa: {
      noaa: 0.69,
      sg: 0.69,
    },
    windSpeed100m: {
      noaa: 0.71,
      sg: 0.71,
    },
    windSpeed200hpa: {
      noaa: 22.32,
      sg: 22.32,
    },
    windSpeed20m: {
      noaa: 0.66,
      sg: 0.66,
    },
    windSpeed50m: {
      noaa: 0.68,
      sg: 0.68,
    },
  },
  {
    airTemperature: {
      noaa: 26.36,
      sg: 26.36,
    },
    swellPeriod: {
      icon: 3.96,
      noaa: 5.12,
      sg: 3.96,
    },
    time: "2023-09-26T04:00:00+00:00",
    waveHeight: {
      icon: 0.3,
      noaa: 0.31,
      sg: 0.3,
    },
    windDirection: {
      icon: 198.98,
      noaa: 277.28,
      sg: 198.98,
    },
    windSpeed: {
      icon: 0.88,
      noaa: 0.99,
      sg: 0.88,
    },
    windSpeed1000hpa: {
      noaa: 0.89,
      sg: 0.89,
    },
    windSpeed100m: {
      noaa: 0.91,
      sg: 0.91,
    },
    windSpeed200hpa: {
      noaa: 22.81,
      sg: 22.81,
    },
    windSpeed20m: {
      noaa: 0.84,
      sg: 0.84,
    },
    windSpeed50m: {
      noaa: 0.87,
      sg: 0.87,
    },
  },
  {
    airTemperature: {
      noaa: 26.3,
      sg: 26.3,
    },
    swellPeriod: {
      icon: 4.01,
      noaa: 5.07,
      sg: 4.01,
    },
    time: "2023-09-26T05:00:00+00:00",
    waveHeight: {
      icon: 0.3,
      noaa: 0.3,
      sg: 0.3,
    },
    windDirection: {
      icon: 198.56,
      noaa: 254.42,
      sg: 198.56,
    },
    windSpeed: {
      icon: 0.96,
      noaa: 1.24,
      sg: 0.96,
    },
    windSpeed1000hpa: {
      noaa: 1.1,
      sg: 1.1,
    },
    windSpeed100m: {
      noaa: 1.11,
      sg: 1.11,
    },
    windSpeed200hpa: {
      noaa: 23.29,
      sg: 23.29,
    },
    windSpeed20m: {
      noaa: 1.02,
      sg: 1.02,
    },
    windSpeed50m: {
      noaa: 1.06,
      sg: 1.06,
    },
  },
  {
    airTemperature: {
      noaa: 26.23,
      sg: 26.23,
    },
    swellPeriod: {
      icon: 4.07,
      noaa: 5.03,
      sg: 4.07,
    },
    time: "2023-09-26T06:00:00+00:00",
    waveHeight: {
      icon: 0.3,
      noaa: 0.29,
      sg: 0.3,
    },
    windDirection: {
      icon: 198.15,
      noaa: 231.57,
      sg: 198.15,
    },
    windSpeed: {
      icon: 1.05,
      noaa: 1.49,
      sg: 1.05,
    },
    windSpeed1000hpa: {
      noaa: 1.3,
      sg: 1.3,
    },
    windSpeed100m: {
      noaa: 1.31,
      sg: 1.31,
    },
    windSpeed200hpa: {
      noaa: 23.78,
      sg: 23.78,
    },
    windSpeed20m: {
      noaa: 1.2,
      sg: 1.2,
    },
    windSpeed50m: {
      noaa: 1.25,
      sg: 1.25,
    },
  },
  {
    airTemperature: {
      noaa: 26.4,
      sg: 26.4,
    },
    swellPeriod: {
      icon: 4.17,
      noaa: 4.99,
      sg: 4.17,
    },
    time: "2023-09-26T07:00:00+00:00",
    waveHeight: {
      icon: 0.3,
      noaa: 0.29,
      sg: 0.3,
    },
    windDirection: {
      icon: 226.49,
      noaa: 243.6,
      sg: 226.49,
    },
    windSpeed: {
      icon: 1.21,
      noaa: 1.92,
      sg: 1.21,
    },
    windSpeed1000hpa: {
      noaa: 1.84,
      sg: 1.84,
    },
    windSpeed100m: {
      noaa: 1.85,
      sg: 1.85,
    },
    windSpeed200hpa: {
      noaa: 23.66,
      sg: 23.66,
    },
    windSpeed20m: {
      noaa: 1.73,
      sg: 1.73,
    },
    windSpeed50m: {
      noaa: 1.79,
      sg: 1.79,
    },
  },
  {
    airTemperature: {
      noaa: 26.56,
      sg: 26.56,
    },
    swellPeriod: {
      icon: 4.28,
      noaa: 4.96,
      sg: 4.28,
    },
    time: "2023-09-26T08:00:00+00:00",
    waveHeight: {
      icon: 0.3,
      noaa: 0.28,
      sg: 0.3,
    },
    windDirection: {
      icon: 254.83,
      noaa: 255.63,
      sg: 254.83,
    },
    windSpeed: {
      icon: 1.38,
      noaa: 2.34,
      sg: 1.38,
    },
    windSpeed1000hpa: {
      noaa: 2.37,
      sg: 2.37,
    },
    windSpeed100m: {
      noaa: 2.38,
      sg: 2.38,
    },
    windSpeed200hpa: {
      noaa: 23.53,
      sg: 23.53,
    },
    windSpeed20m: {
      noaa: 2.27,
      sg: 2.27,
    },
    windSpeed50m: {
      noaa: 2.33,
      sg: 2.33,
    },
  },
  {
    airTemperature: {
      noaa: 26.73,
      sg: 26.73,
    },
    swellPeriod: {
      icon: 4.38,
      noaa: 4.92,
      sg: 4.38,
    },
    time: "2023-09-26T09:00:00+00:00",
    waveHeight: {
      icon: 0.3,
      noaa: 0.28,
      sg: 0.3,
    },
    windDirection: {
      icon: 283.17,
      noaa: 267.66,
      sg: 283.17,
    },
    windSpeed: {
      icon: 1.54,
      noaa: 2.77,
      sg: 1.54,
    },
    windSpeed1000hpa: {
      noaa: 2.91,
      sg: 2.91,
    },
    windSpeed100m: {
      noaa: 2.92,
      sg: 2.92,
    },
    windSpeed200hpa: {
      noaa: 23.41,
      sg: 23.41,
    },
    windSpeed20m: {
      noaa: 2.8,
      sg: 2.8,
    },
    windSpeed50m: {
      noaa: 2.87,
      sg: 2.87,
    },
  },
  {
    airTemperature: {
      noaa: 26.94,
      sg: 26.94,
    },
    swellPeriod: {
      icon: 4.58,
      noaa: 4.98,
      sg: 4.58,
    },
    time: "2023-09-26T10:00:00+00:00",
    waveHeight: {
      icon: 0.31,
      noaa: 0.29,
      sg: 0.31,
    },
    windDirection: {
      icon: 296.61,
      noaa: 279.61,
      sg: 296.61,
    },
    windSpeed: {
      icon: 2.38,
      noaa: 3.13,
      sg: 2.38,
    },
    windSpeed1000hpa: {
      noaa: 3.08,
      sg: 3.08,
    },
    windSpeed100m: {
      noaa: 3.09,
      sg: 3.09,
    },
    windSpeed200hpa: {
      noaa: 23.02,
      sg: 23.02,
    },
    windSpeed20m: {
      noaa: 2.96,
      sg: 2.96,
    },
    windSpeed50m: {
      noaa: 3.04,
      sg: 3.04,
    },
  },
  {
    airTemperature: {
      noaa: 27.16,
      sg: 27.16,
    },
    swellPeriod: {
      icon: 4.77,
      noaa: 5.05,
      sg: 4.77,
    },
    time: "2023-09-26T11:00:00+00:00",
    waveHeight: {
      icon: 0.32,
      noaa: 0.3,
      sg: 0.32,
    },
    windDirection: {
      icon: 310.05,
      noaa: 291.56,
      sg: 310.05,
    },
    windSpeed: {
      icon: 3.23,
      noaa: 3.49,
      sg: 3.23,
    },
    windSpeed1000hpa: {
      noaa: 3.25,
      sg: 3.25,
    },
    windSpeed100m: {
      noaa: 3.26,
      sg: 3.26,
    },
    windSpeed200hpa: {
      noaa: 22.62,
      sg: 22.62,
    },
    windSpeed20m: {
      noaa: 3.11,
      sg: 3.11,
    },
    windSpeed50m: {
      noaa: 3.21,
      sg: 3.21,
    },
  },
  {
    airTemperature: {
      noaa: 27.38,
      sg: 27.38,
    },
    swellPeriod: {
      icon: 4.97,
      noaa: 5.11,
      sg: 4.97,
    },
    time: "2023-09-26T12:00:00+00:00",
    waveHeight: {
      icon: 0.33,
      noaa: 0.31,
      sg: 0.33,
    },
    windDirection: {
      icon: 323.49,
      noaa: 303.51,
      sg: 323.49,
    },
    windSpeed: {
      icon: 4.07,
      noaa: 3.85,
      sg: 4.07,
    },
    windSpeed1000hpa: {
      noaa: 3.42,
      sg: 3.42,
    },
    windSpeed100m: {
      noaa: 3.43,
      sg: 3.43,
    },
    windSpeed200hpa: {
      noaa: 22.23,
      sg: 22.23,
    },
    windSpeed20m: {
      noaa: 3.27,
      sg: 3.27,
    },
    windSpeed50m: {
      noaa: 3.38,
      sg: 3.38,
    },
  },
  {
    airTemperature: {
      noaa: 27.37,
      sg: 27.37,
    },
    swellPeriod: {
      icon: 5.02,
      noaa: 5.07,
      sg: 5.02,
    },
    time: "2023-09-26T13:00:00+00:00",
    waveHeight: {
      icon: 0.37,
      noaa: 0.33,
      sg: 0.37,
    },
    windDirection: {
      icon: 331.48,
      noaa: 312.08,
      sg: 331.48,
    },
    windSpeed: {
      icon: 4.4,
      noaa: 4.2,
      sg: 4.4,
    },
    windSpeed1000hpa: {
      noaa: 3.2,
      sg: 3.2,
    },
    windSpeed100m: {
      noaa: 3.21,
      sg: 3.21,
    },
    windSpeed200hpa: {
      noaa: 21.41,
      sg: 21.41,
    },
    windSpeed20m: {
      noaa: 3.04,
      sg: 3.04,
    },
    windSpeed50m: {
      noaa: 3.16,
      sg: 3.16,
    },
  },
  {
    airTemperature: {
      noaa: 27.36,
      sg: 27.36,
    },
    swellPeriod: {
      icon: 5.08,
      noaa: 5.02,
      sg: 5.08,
    },
    time: "2023-09-26T14:00:00+00:00",
    waveHeight: {
      icon: 0.4,
      noaa: 0.36,
      sg: 0.4,
    },
    windDirection: {
      icon: 339.48,
      noaa: 320.66,
      sg: 339.48,
    },
    windSpeed: {
      icon: 4.74,
      noaa: 4.56,
      sg: 4.74,
    },
    windSpeed1000hpa: {
      noaa: 2.99,
      sg: 2.99,
    },
    windSpeed100m: {
      noaa: 3,
      sg: 3,
    },
    windSpeed200hpa: {
      noaa: 20.58,
      sg: 20.58,
    },
    windSpeed20m: {
      noaa: 2.81,
      sg: 2.81,
    },
    windSpeed50m: {
      noaa: 2.94,
      sg: 2.94,
    },
  },
  {
    airTemperature: {
      noaa: 27.35,
      sg: 27.35,
    },
    swellPeriod: {
      icon: 5.13,
      noaa: 4.98,
      sg: 5.13,
    },
    time: "2023-09-26T15:00:00+00:00",
    waveHeight: {
      icon: 0.44,
      noaa: 0.38,
      sg: 0.44,
    },
    windDirection: {
      icon: 347.47,
      noaa: 329.23,
      sg: 347.47,
    },
    windSpeed: {
      icon: 5.07,
      noaa: 4.91,
      sg: 5.07,
    },
    windSpeed1000hpa: {
      noaa: 2.77,
      sg: 2.77,
    },
    windSpeed100m: {
      noaa: 2.78,
      sg: 2.78,
    },
    windSpeed200hpa: {
      noaa: 19.76,
      sg: 19.76,
    },
    windSpeed20m: {
      noaa: 2.58,
      sg: 2.58,
    },
    windSpeed50m: {
      noaa: 2.72,
      sg: 2.72,
    },
  },
  {
    airTemperature: {
      noaa: 27.24,
      sg: 27.24,
    },
    swellPeriod: {
      icon: 5.08,
      noaa: 4.95,
      sg: 5.08,
    },
    time: "2023-09-26T16:00:00+00:00",
    waveHeight: {
      icon: 0.44,
      noaa: 0.4,
      sg: 0.44,
    },
    windDirection: {
      icon: 355.22,
      noaa: 336.1,
      sg: 355.22,
    },
    windSpeed: {
      icon: 4.47,
      noaa: 4.52,
      sg: 4.47,
    },
    windSpeed1000hpa: {
      noaa: 2.08,
      sg: 2.08,
    },
    windSpeed100m: {
      noaa: 2.09,
      sg: 2.09,
    },
    windSpeed200hpa: {
      noaa: 19.13,
      sg: 19.13,
    },
    windSpeed20m: {
      noaa: 1.95,
      sg: 1.95,
    },
    windSpeed50m: {
      noaa: 2.04,
      sg: 2.04,
    },
  },
  {
    airTemperature: {
      noaa: 27.14,
      sg: 27.14,
    },
    swellPeriod: {
      icon: 5.03,
      noaa: 4.91,
      sg: 5.03,
    },
    time: "2023-09-26T17:00:00+00:00",
    waveHeight: {
      icon: 0.45,
      noaa: 0.43,
      sg: 0.45,
    },
    windDirection: {
      icon: 2.98,
      noaa: 342.97,
      sg: 2.98,
    },
    windSpeed: {
      icon: 3.88,
      noaa: 4.14,
      sg: 3.88,
    },
    windSpeed1000hpa: {
      noaa: 1.4,
      sg: 1.4,
    },
    windSpeed100m: {
      noaa: 1.4,
      sg: 1.4,
    },
    windSpeed200hpa: {
      noaa: 18.5,
      sg: 18.5,
    },
    windSpeed20m: {
      noaa: 1.31,
      sg: 1.31,
    },
    windSpeed50m: {
      noaa: 1.37,
      sg: 1.37,
    },
  },
  {
    airTemperature: {
      noaa: 27.03,
      sg: 27.03,
    },
    swellPeriod: {
      icon: 4.98,
      noaa: 4.88,
      sg: 4.98,
    },
    time: "2023-09-26T18:00:00+00:00",
    waveHeight: {
      icon: 0.45,
      noaa: 0.45,
      sg: 0.45,
    },
    windDirection: {
      icon: 10.73,
      noaa: 349.84,
      sg: 10.73,
    },
    windSpeed: {
      icon: 3.28,
      noaa: 3.75,
      sg: 3.28,
    },
    windSpeed1000hpa: {
      noaa: 0.71,
      sg: 0.71,
    },
    windSpeed100m: {
      noaa: 0.71,
      sg: 0.71,
    },
    windSpeed200hpa: {
      noaa: 17.87,
      sg: 17.87,
    },
    windSpeed20m: {
      noaa: 0.68,
      sg: 0.68,
    },
    windSpeed50m: {
      noaa: 0.69,
      sg: 0.69,
    },
  },
  {
    airTemperature: {
      noaa: 26.89,
      sg: 26.89,
    },
    swellPeriod: {
      icon: 5.19,
      noaa: 4.73,
      sg: 5.19,
    },
    time: "2023-09-26T19:00:00+00:00",
    waveHeight: {
      icon: 0.45,
      noaa: 0.46,
      sg: 0.45,
    },
    windDirection: {
      icon: 10.66,
      noaa: 342.76,
      sg: 10.66,
    },
    windSpeed: {
      icon: 2.89,
      noaa: 3.38,
      sg: 2.89,
    },
    windSpeed1000hpa: {
      noaa: 0.95,
      sg: 0.95,
    },
    windSpeed100m: {
      noaa: 0.95,
      sg: 0.95,
    },
    windSpeed200hpa: {
      noaa: 17.95,
      sg: 17.95,
    },
    windSpeed20m: {
      noaa: 0.91,
      sg: 0.91,
    },
    windSpeed50m: {
      noaa: 0.93,
      sg: 0.93,
    },
  },
  {
    airTemperature: {
      noaa: 26.76,
      sg: 26.76,
    },
    swellPeriod: {
      icon: 5.4,
      noaa: 4.59,
      sg: 5.4,
    },
    time: "2023-09-26T20:00:00+00:00",
    waveHeight: {
      icon: 0.46,
      noaa: 0.48,
      sg: 0.46,
    },
    windDirection: {
      icon: 10.58,
      noaa: 335.69,
      sg: 10.58,
    },
    windSpeed: {
      icon: 2.51,
      noaa: 3.01,
      sg: 2.51,
    },
    windSpeed1000hpa: {
      noaa: 1.18,
      sg: 1.18,
    },
    windSpeed100m: {
      noaa: 1.18,
      sg: 1.18,
    },
    windSpeed200hpa: {
      noaa: 18.03,
      sg: 18.03,
    },
    windSpeed20m: {
      noaa: 1.15,
      sg: 1.15,
    },
    windSpeed50m: {
      noaa: 1.17,
      sg: 1.17,
    },
  },
  {
    airTemperature: {
      noaa: 26.62,
      sg: 26.62,
    },
    swellPeriod: {
      icon: 5.61,
      noaa: 4.44,
      sg: 5.61,
    },
    time: "2023-09-26T21:00:00+00:00",
    waveHeight: {
      icon: 0.46,
      noaa: 0.49,
      sg: 0.46,
    },
    windDirection: {
      icon: 10.51,
      noaa: 328.61,
      sg: 10.51,
    },
    windSpeed: {
      icon: 2.12,
      noaa: 2.64,
      sg: 2.12,
    },
    windSpeed1000hpa: {
      noaa: 1.42,
      sg: 1.42,
    },
    windSpeed100m: {
      noaa: 1.42,
      sg: 1.42,
    },
    windSpeed200hpa: {
      noaa: 18.11,
      sg: 18.11,
    },
    windSpeed20m: {
      noaa: 1.38,
      sg: 1.38,
    },
    windSpeed50m: {
      noaa: 1.41,
      sg: 1.41,
    },
  },
  {
    airTemperature: {
      noaa: 26.52,
      sg: 26.52,
    },
    swellPeriod: {
      icon: 5.78,
      noaa: 4.46,
      sg: 5.78,
    },
    time: "2023-09-26T22:00:00+00:00",
    waveHeight: {
      icon: 0.47,
      noaa: 0.5,
      sg: 0.47,
    },
    windDirection: {
      icon: 8.11,
      noaa: 322.4,
      sg: 8.11,
    },
    windSpeed: {
      icon: 1.92,
      noaa: 2.67,
      sg: 1.92,
    },
    windSpeed1000hpa: {
      noaa: 1.66,
      sg: 1.66,
    },
    windSpeed100m: {
      noaa: 1.66,
      sg: 1.66,
    },
    windSpeed200hpa: {
      noaa: 19.21,
      sg: 19.21,
    },
    windSpeed20m: {
      noaa: 1.62,
      sg: 1.62,
    },
    windSpeed50m: {
      noaa: 1.65,
      sg: 1.65,
    },
  },
  {
    airTemperature: {
      noaa: 26.41,
      sg: 26.41,
    },
    swellPeriod: {
      icon: 5.95,
      noaa: 4.49,
      sg: 5.95,
    },
    time: "2023-09-26T23:00:00+00:00",
    waveHeight: {
      icon: 0.49,
      noaa: 0.51,
      sg: 0.49,
    },
    windDirection: {
      icon: 5.7,
      noaa: 316.19,
      sg: 5.7,
    },
    windSpeed: {
      icon: 1.72,
      noaa: 2.69,
      sg: 1.72,
    },
    windSpeed1000hpa: {
      noaa: 1.9,
      sg: 1.9,
    },
    windSpeed100m: {
      noaa: 1.9,
      sg: 1.9,
    },
    windSpeed200hpa: {
      noaa: 20.32,
      sg: 20.32,
    },
    windSpeed20m: {
      noaa: 1.86,
      sg: 1.86,
    },
    windSpeed50m: {
      noaa: 1.89,
      sg: 1.89,
    },
  },
  {
    airTemperature: {
      noaa: 26.31,
      sg: 26.31,
    },
    swellPeriod: {
      icon: 6.12,
      noaa: 4.51,
      sg: 6.12,
    },
    time: "2023-09-27T00:00:00+00:00",
    waveHeight: {
      icon: 0.5,
      noaa: 0.52,
      sg: 0.5,
    },
    windDirection: {
      icon: 3.3,
      noaa: 309.98,
      sg: 3.3,
    },
    windSpeed: {
      icon: 1.52,
      noaa: 2.72,
      sg: 1.52,
    },
    windSpeed1000hpa: {
      noaa: 2.14,
      sg: 2.14,
    },
    windSpeed100m: {
      noaa: 2.14,
      sg: 2.14,
    },
    windSpeed200hpa: {
      noaa: 21.42,
      sg: 21.42,
    },
    windSpeed20m: {
      noaa: 2.1,
      sg: 2.1,
    },
    windSpeed50m: {
      noaa: 2.13,
      sg: 2.13,
    },
  },
  {
    airTemperature: {
      noaa: 26.22,
      sg: 26.22,
    },
    swellPeriod: {
      icon: 6.22,
      noaa: 4.59,
      sg: 6.22,
    },
    time: "2023-09-27T01:00:00+00:00",
    waveHeight: {
      icon: 0.52,
      noaa: 0.53,
      sg: 0.52,
    },
    windDirection: {
      icon: 7.63,
      noaa: 311.09,
      sg: 7.63,
    },
    windSpeed: {
      icon: 1.54,
      noaa: 2.57,
      sg: 1.54,
    },
    windSpeed1000hpa: {
      noaa: 1.99,
      sg: 1.99,
    },
    windSpeed100m: {
      noaa: 1.99,
      sg: 1.99,
    },
    windSpeed200hpa: {
      noaa: 21.57,
      sg: 21.57,
    },
    windSpeed20m: {
      noaa: 1.95,
      sg: 1.95,
    },
    windSpeed50m: {
      noaa: 1.98,
      sg: 1.98,
    },
  },
  {
    airTemperature: {
      noaa: 26.12,
      sg: 26.12,
    },
    swellPeriod: {
      icon: 6.31,
      noaa: 4.67,
      sg: 6.31,
    },
    time: "2023-09-27T02:00:00+00:00",
    waveHeight: {
      icon: 0.53,
      noaa: 0.55,
      sg: 0.53,
    },
    windDirection: {
      icon: 11.95,
      noaa: 312.19,
      sg: 11.95,
    },
    windSpeed: {
      icon: 1.57,
      noaa: 2.42,
      sg: 1.57,
    },
    windSpeed1000hpa: {
      noaa: 1.83,
      sg: 1.83,
    },
    windSpeed100m: {
      noaa: 1.83,
      sg: 1.83,
    },
    windSpeed200hpa: {
      noaa: 21.73,
      sg: 21.73,
    },
    windSpeed20m: {
      noaa: 1.8,
      sg: 1.8,
    },
    windSpeed50m: {
      noaa: 1.83,
      sg: 1.83,
    },
  },
  {
    airTemperature: {
      noaa: 26.02,
      sg: 26.02,
    },
    swellPeriod: {
      icon: 6.41,
      noaa: 4.75,
      sg: 6.41,
    },
    time: "2023-09-27T03:00:00+00:00",
    waveHeight: {
      icon: 0.55,
      noaa: 0.56,
      sg: 0.55,
    },
    windDirection: {
      icon: 16.28,
      noaa: 313.3,
      sg: 16.28,
    },
    windSpeed: {
      icon: 1.6,
      noaa: 2.27,
      sg: 1.6,
    },
    windSpeed1000hpa: {
      noaa: 1.68,
      sg: 1.68,
    },
    windSpeed100m: {
      noaa: 1.68,
      sg: 1.68,
    },
    windSpeed200hpa: {
      noaa: 21.88,
      sg: 21.88,
    },
    windSpeed20m: {
      noaa: 1.65,
      sg: 1.65,
    },
    windSpeed50m: {
      noaa: 1.68,
      sg: 1.68,
    },
  },
];
let israelData, sriData, indoData, maldivesData;

function formatForcast(data = defaultData) {
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

exports.generateForecast = async function () {
  const api_key =
    "ccb6ca00-39ec-11ee-8b7f-0242ac130002-ccb6ca64-39ec-11ee-8b7f-0242ac130002";
  //setting time
  const start = new Date();
  exports.lastForecastApiCall = start;
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
  const params =
    "waveHeight,airTemperature,swellPeriod,windSpeed,windSpeed20m,windDirection,windSpeed50m,windSpeed100m,windSpeed1000hpa,windSpeed200hpa";

  //Hilton - Israel, TelAviv
  israelData = fetchData(israelLat, israelLng);
  //Cocunat Point - Weligama, Sri Lanka
  sriData = fetchData(sriLat, sriLng);
  //Uluwatu - Bali, Indonessia
  indoData = fetchData(indolLat, indoLng);
  //The Jailbreaks Surf Point, Himmafushi, Maldives
  maldivesData = fetchData(maldiveLat, maldiveLng);
  return {
    israel: formatForcast(israelData),
    srilanka: formatForcast(sriData),
    indonessia: formatForcast(indoData),
    maldives: formatForcast(maldivesData),
  };
};

function fetchData(
  lat,
  lng,
  params = params,
  start = timestampStart,
  end = timestampEnd
) {
  fetch(
    `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${start}&end=${end}`,
    {
      headers: {
        Authorization: api_key,
      },
    }
  )
    .then((response) => response.json())
    .then((jsonData) => {
      return jsonData["hours"];
      // Do something with response data.
    });
}
