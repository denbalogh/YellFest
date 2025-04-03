import { RouterArgs } from "../router";

export default function homePOST(...args: RouterArgs) {
  const [, res] = args;

  res.end("HOME POST");
}
