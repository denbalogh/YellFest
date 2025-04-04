import { HttpArgs } from "../App";
import Page from "../Page";
import { Fight } from "../types";
import { createFight, getFightWithDateDistance } from "../utils/fight";
import getFormData from "../utils/form";
import container from "../views/container";
import fightsList from "../views/fightsList";
import header from "../views/header";

const fights: Fight[] = [];
let idCnt = 1;

export default async function home(...args: HttpArgs) {
  const [req, res] = args;

  // Handle creation of new fight
  if (req.method === "POST") {
    const data = await getFormData(req);
    fights.push(
      createFight({
        id: idCnt++,
        title: data.title || "No title",
        body: data.body || "No body",
        authorName: data.name || `Anon${idCnt}`,
        authorSecret: data.secret,
      }),
    );
  }

  const fightsWithDistance = fights.map(getFightWithDateDistance);

  const page = new Page();
  page.addCss("/css/home.css");
  page.setBody(container([header(), fightsList(fightsWithDistance)]));

  const html = page.render();

  res
    .writeHead(200, {
      "content-type": "text/html",
      "content-length": Buffer.byteLength(html),
    })
    .end(html);
}
