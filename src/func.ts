import { scrap } from "./puppeteer";

const req: any = {
  query: {
    url:
      "https://www.amazon.com/London-Rules-Jackson-Lamb-Thriller-ebook/dp/B072L7JM4K/ref=tmm_kin_swatch_0?_encoding=UTF8&qid=1538671659&sr=8-1",
    min: 4
  }
};

const res: any = {
  send: (arg: string) => console.log(arg)
};

scrap(req, res);
