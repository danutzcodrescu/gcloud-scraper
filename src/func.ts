import { scrap } from "./index";

const req: any = {
  query: {
    url: "https://en.wikipedia.org/wiki/Everton_F.C."
  }
};

const res: any = {
  send: (arg: string) => console.log(arg)
};

scrap(req, res);
