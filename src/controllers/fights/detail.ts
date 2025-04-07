import { pool } from "../../db";
import { fightDetailRegex } from "../../middlewares/router";
import Page from "../../Page";
import { Fight } from "../../types/fight";
import { ViewFundAsync } from "../../types/view";
import container from "../../views/container";
import header from "../../views/header";
import notFound from "../notFound";

const fightDetail: ViewFundAsync = async (...args) => {
  const [req, res] = args;

  const matches = req.url?.match(fightDetailRegex);
  const fightId = matches?.groups?.fightId as string; // The string matched in router, it has to include the group

  const fightQuery = await pool.query<Fight>(
    `
      SELECT *
      FROM fights
      WHERE fight_id = $1
    `,
    [fightId],
  );

  if (fightQuery.rowCount === 0) {
    return notFound(...args);
  }

  const fight = fightQuery.rows[0];

  const page = new Page();
  page.setTitle(`YellFest - Fight: ${fight.title}`);
  // page.addCss("/css/new.css");
  page.setBody(container([header()]));

  const html = page.render();

  res
    .writeHead(200, {
      "content-type": "text/html",
      "content-length": Buffer.byteLength(html),
    })
    .end(html);

  return true;
};

export default fightDetail;
