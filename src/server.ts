import express from "express";
import { logger } from "./log";
import { scrap } from "./puppeteer";

const app = express();

app.get("/", scrap);

app.listen(process.env.PORT || 3000, () => {
  logger.info("app running");
});
