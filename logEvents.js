// const { format } = require("date-fns");
// const { v4: uuid } = require("uuid");

// const fs = require("fs");
// const fsPromises = require("fs").promises;
// const path = require("path");

import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const currentFileUrl = import.meta.url;
const currentDir = dirname(fileURLToPath(currentFileUrl));

export const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "dd/MM/yyyy\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t ${uuid()} \t ${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(currentDir, "logs"))) {
      await fsPromises.mkdir(path.join(currentDir, "logs"));
    }
    await fsPromises.appendFile(
      path.join(currentDir, "logs", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

export const logger = (req, res, next) => {
  logEvents(`${req.method}/t ${req.headers.origin}\t ${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
};
// module.exports = { logger, logEvents };

// console.log(format(new Date(), "dd/MM/yyyy\tHH:mm:ss"));
// console.log(uuid());
