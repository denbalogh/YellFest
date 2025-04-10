import { MiddlewareFuncAsync } from "../App";
import authorDetail from "../controllers/author";
import fightDetail from "../controllers/fights/detail";
import newFight from "../controllers/fights/new";
import home from "../controllers/home";
import notFound from "../controllers/notFound";

export const fightDetailRegex = /\/fights\/(?<fightId>\d+)$/;
export const authorDetailRegex = /\/authors\/(?<authorId>\d+)$/;

const router: MiddlewareFuncAsync = async (...args) => {
  const [req] = args;

  if (req.url === "/") {
    return home(...args);
  } else if (req.url === "/fights/new") {
    return newFight(...args);
  } else if (req.url && fightDetailRegex.test(req.url)) {
    return fightDetail(...args);
  } else if (req.url && authorDetailRegex.test(req.url)) {
    return authorDetail(...args);
  } else {
    return notFound(...args);
  }
};

export default router;
