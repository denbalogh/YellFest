import { HttpArgs } from "../App";
import homeGET from "../controllers/homeGET";

export default function router(...args: HttpArgs) {
  const [req, res] = args;

  switch (req.url) {
    case "/":
      switch (req.method) {
        case "GET":
          return homeGET(...args);
      }
  }
}
