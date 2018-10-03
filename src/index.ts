import puppeteer from "puppeteer";
import { Request, Response } from "express";

export const scrap = async (req: Request, res: Response) => {
  const url = req.query.url;
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.goto(url);
  const element = await page.$eval(
    "table.infobox > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2)",
    (elem: any) => elem.innerText
  );
  res.send(element);
};
