import { pool } from "../../db";
import { getNewAuthorName } from "../../db/author";
import { fightDetailRegex } from "../../middlewares/router";
import Page from "../../Page";
import { Fight } from "../../types/fight";
import { ViewFuncAsync } from "../../types/view";
import container from "../../views/container";
import header from "../../views/header";
import main from "../../views/main";
import { replyForm } from "../../views/replyForm";
import notFound from "../notFound";

const fightDetail: ViewFuncAsync = async (...args) => {
  const [req, res] = args;

  const matches = req.url?.match(fightDetailRegex);
  const fightId = matches?.groups?.fightId as string; // The string matched in router, it has to include the group

  const fightQuery = await pool.query<Fight>(
    `
      SELECT title, body, name AS author_name
      FROM authors NATURAL JOIN fights
      WHERE fight_id = $1
    `,
    [fightId],
  );

  if (fightQuery.rowCount === 0) {
    return notFound(...args);
  }

  const fight = fightQuery.rows[0];

  const newUserName = await getNewAuthorName();

  const page = new Page();
  page.setTitle(`YellFest - Fight: ${fight.title}`);
  page.addCss("/css/fightDetail.css");
  page.setBody(
    container([
      header(),
      main([
        `
          <h2>${fight.title}</h2>
          <div class="author-wrapper">
            <a class="link" href="#">${fight.author_name}</a>
          </div>
          <p>${fight.body}</p>
        `,
        replyForm(fight, newUserName),
      ]),
    ]),
  );

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
