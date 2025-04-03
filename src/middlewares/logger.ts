import { HttpArgs } from "../App";

export default function logger(...args: HttpArgs) {
  const [req] = args;

  console.log(`${req.method} ${req.url}`);
}
