import { scrap } from "./puppeteer";

const req: any = {
  query: {
    item: "London Rules: Jackson Lamb Thriller 5",
    min: 4
  }
};

const res: any = {
  send: (arg: string) => console.log(arg)
};

scrap(req, res);
