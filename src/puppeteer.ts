import puppeteer, { Browser } from "puppeteer";
import { Request, Response } from "express";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

let browser: Browser;
const startBrowser = async () => {
  browser = await puppeteer.launch({
    args: ["--no-sandbox"]
  });
  return browser.newPage();
};

const getElements = async (page: puppeteer.Page) => {
  const [element, title] = await Promise.all([
    page.$eval("td.a-color-price", (elem: any) => elem.innerText),
    page.$eval("#ebooksProductTitle", (elem: any) => elem.innerText)
  ]);
  const pattern = new RegExp(/([1-9][0-9]*.[0-9]+)/);
  const price = (element as string).match(pattern)![0];
  return { price, title };
};

const sendEmail = async (price: string, title: string, url: string) => {
  const msg = {
    to: process.env.RECEIVER!,
    from: process.env.SENDER!,
    subject: `Price deal for ${title}`,
    html: `The price for <strong>${title}</strong> is only <strong>$${price}</strong>. Get it from <a href="${url}">${title}</a>!!!`
  };
  return sgMail.send(msg);
};

export const scrap = async (req: Request, res: Response) => {
  const url = req.query.url;
  const page = await startBrowser();
  await page.goto(url);
  const { price, title } = await getElements(page);
  if (price < req.query.min) {
    await sendEmail(price, title, url);
  }
  await browser.close();
  res.send(`${price < req.query.min} ${title}`);
};
