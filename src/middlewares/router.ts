import { HttpArgs } from "../App";
import newFight from "../controllers/fights/new";
import home from "../controllers/home";

export default function router(...args: HttpArgs) {
  const [req] = args;

  switch (req.url) {
    case "/":
      return home(...args);
    case "/fights/new":
      return newFight(...args);
  }
}
