import { pool } from "../../db";
import {
  getExistingAuthorOrCreateNew,
  getNewAuthorName,
} from "../../db/author";
import { fightDetailRegex } from "../../middlewares/router";
import Page from "../../Page";
import { Fight } from "../../types/fight";
import { Reply } from "../../types/reply";
import { ViewFuncAsync } from "../../types/view";
import getFormData from "../../utils/form";
import container from "../../views/container";
import header from "../../views/header";
import main from "../../views/main";
import repliesList from "../../views/repliesList";
import { replyForm } from "../../views/replyForm";
import notFound from "../notFound";

const fightDetail: ViewFuncAsync = async (...args) => {
  const [req, res] = args;

  const matches = req.url?.match(fightDetailRegex);
  const fightId = matches?.groups?.fightId as string; // The string matched in router, it has to include the group

  const fightQuery = await pool.query<Fight>(
    `
      SELECT fight_id, title, body, author_id, name AS author_name
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

  // Handle creation of new reply
  if (req.method === "POST") {
    const {
      name,
      secret,
      body = "",
      parent_reply_id,
    } = await getFormData<"name" | "secret" | "body" | "parent_reply_id">(req);

    const { author_id } = await getExistingAuthorOrCreateNew(
      name || newUserName,
      secret,
    );

    await pool.query(
      `
        INSERT INTO replies(fight_id, author_id, parent_reply_id, body, created_at)
        VALUES($1, $2, $3, $4, $5) 
      `,
      [fight.fight_id, author_id, parent_reply_id, body, new Date()],
    );

    await pool.query(
      `
        UPDATE fights
        SET updated_at = $1
        WHERE fight_id = $2
      `,
      [new Date(), fight.fight_id],
    );
  }

  const topLevelReplies = await pool.query<Reply>(
    `
      SELECT *, name AS author_name
      FROM replies NATURAL JOIN authors
      WHERE fight_id = $1 AND parent_reply_id IS NULL
      ORDER BY created_at DESC
    `,
    [fight.fight_id],
  );

  const replies = await Promise.all(
    topLevelReplies.rows.map(async (reply) => {
      const childReplies = await pool.query<Reply>(
        `
        SELECT *, name AS author_name
        FROM replies NATURAL JOIN authors
        WHERE fight_id = $1 AND parent_reply_id = $2
        ORDER BY created_at ASC
      `,
        [fight.fight_id, reply.reply_id],
      );
      return { ...reply, children: childReplies.rows };
    }),
  );

  const page = new Page();
  page.setTitle(`YellFest - Fight: ${fight.title}`);
  page.addCss("/css/form.css");
  page.addCss("/css/fightDetail.css");
  page.addCss("/css/repliesList.css");
  page.setBody(
    container([
      header(),
      main([
        `
          <h2>${fight.title}</h2>
          <div class="author-wrapper">
            <a class="link" href="/authors/${fight.author_id}"><strong>${fight.author_name}</strong></a>
          </div>
          <article>${fight.body}</article>
        `,
        repliesList(replies, newUserName),
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
