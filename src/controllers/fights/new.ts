import { HttpArgs } from "../../App";
import Page from "../../Page";
import container from "../../views/container";
import header from "../../views/header";
import newFightForm from "../../views/newFightForm";

const idCnt = 1;

export default function newFight(...args: HttpArgs) {
  const [, res] = args;

  const page = new Page();
  page.setTitle("YellFest - Creating new fight");
  page.addCss("/css/new.css");
  page.setBody(
    container([
      header("<h2>Creating new fight</h2>"),
      newFightForm(`Anon${idCnt}`),
    ]),
  );

  const html = page.render();

  res
    .writeHead(200, {
      "content-type": "text/html",
      "content-length": Buffer.byteLength(html),
    })
    .end(html);
}
