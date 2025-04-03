import { HttpArgs } from "../App";

export default function homePOST(...args: HttpArgs) {
  const [, res] = args;

  res.end("HOME POST");
}
