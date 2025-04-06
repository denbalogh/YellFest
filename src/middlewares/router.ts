import { HttpArgs } from "../App";
import newFight from "../controllers/fights/new";
import home from "../controllers/home";

const fightDetailRegex = /\/fights\/(?<fightId>\d+)$/;

export default function router(...args: HttpArgs) {
  const [req] = args;

  if (req.url === "/") {
    return home(...args);
  } else if (req.url === "/fights/new") {
    return newFight(...args);
  } else if (fightDetailRegex.test(req.url || "")) {
    // const matches = req.url?.match(fightDetailRegex);
  }
}
