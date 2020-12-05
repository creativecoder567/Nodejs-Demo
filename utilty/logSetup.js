'use strict';
const {createLogger, format, transports} = require("winston");
const {combine, timestamp, json} = format;
const path = require("path");
const ISPRODUCTION = process.env.NODE_ENV === undefined || process.env.NODE_ENV === "development" ? false : process.env.NODE_ENV === "staging" || process.env.NODE_ENV === "test" || process.env.NODE_ENV === "production" ? true : false;
let transportsArr;
if (!ISPRODUCTION) {
    transportsArr = [new transports.Console()];
} else {
    transportsArr = [
        new transports.File({
            filename: path.join(__dirname, "../log/logDetail.log")
        })
    ];
}

const logger = createLogger({
    level: "info",
    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        json()
    ),
    transports: [...transportsArr]
});

module.exports = logger;
