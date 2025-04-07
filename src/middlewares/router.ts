import { MiddlewareFuncAsync } from "../App";
import fightDetail from "../controllers/fights/detail";
import newFight from "../controllers/fights/new";
import home from "../controllers/home";
import notFound from "../controllers/notFound";

export const fightDetailRegex = /\/fights\/(?<fightId>\d+)$/;

const router: MiddlewareFuncAsync = async (...args) => {
  const [req] = args;

  if (req.url === "/") {
    return home(...args);
  } else if (req.url === "/fights/new") {
    return newFight(...args);
  } else if (req.url && fightDetailRegex.test(req.url)) {
    return fightDetail(...args);
  } else {
    return notFound(...args);
  }
};

export default router;
