import { IncomingMessage, ServerResponse } from "http";
import homeGET from "./controllers/homeGET";

export type RouterArgs = [req: IncomingMessage, res: ServerResponse];

export default function router(...args: RouterArgs) {
  const [req] = args;

  switch (req.url) {
    case "/":
      switch (req.method) {
        case "GET":
          return homeGET(...args);
      }
  }
}
