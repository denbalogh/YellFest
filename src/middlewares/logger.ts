import { MiddlewareFunc } from "../App";

const logger: MiddlewareFunc = (...args) => {
  const [req] = args;

  console.log(`${req.method} ${req.url}`);

  return false;
};

export default logger;
