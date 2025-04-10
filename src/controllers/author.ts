import { pool } from "../db";
import { authorDetailRegex } from "../middlewares/router";
import Page from "../Page";
import { Author } from "../types/author";
import { Fight } from "../types/fight";
import { ViewFuncAsync } from "../types/view";
import container from "../views/container";
import fightsList from "../views/fightsList";
import header from "../views/header";
import main from "../views/main";
import notFound from "./notFound";

const authorDetail: ViewFuncAsync = async (...args) => {
  const [req, res] = args;

  const matches = req.url?.match(authorDetailRegex);
  const authorId = matches?.groups?.authorId as string; // The string matched in router, it has to include the group

  const authorQuery = await pool.query<Author>(
    `
      SELECT author_id, name
      FROM authors
      WHERE author_id = $1
    `,
    [authorId],
  );

  if (authorQuery.rowCount === 0) {
    return notFound(...args);
  }

  const author = authorQuery.rows[0];

  const fightsCreated = await pool.query<Fight>(
    `
      SELECT 
        f.fight_id,
        f.author_id,
        a.name AS author_name,
        f.title,
        f.body,
        f.created_at,
        f.updated_at,
          COUNT(r.reply_id) AS replies_count
      FROM 
          fights f
      JOIN 
          authors a ON f.author_id = a.author_id
      LEFT JOIN 
          replies r ON f.fight_id = r.fight_id
      WHERE f.author_id = $1
      GROUP BY 
          f.fight_id, a.name
      ORDER BY
          replies_count DESC, f.updated_at DESC
    `,
    [author.author_id],
  );

  const fightsParticipatedIn = await pool.query<Fight>(
    `
      SELECT 
        f.fight_id,
        f.author_id,
        a.name AS author_name,
        f.title,
        f.body,
        f.created_at,
        f.updated_at,
          COUNT(r.reply_id) AS replies_count
      FROM 
          fights f
      JOIN 
          authors a ON f.author_id = a.author_id
      LEFT JOIN 
          replies r ON f.fight_id = r.fight_id
      WHERE r.author_id = $1
      GROUP BY 
          f.fight_id, a.name
      ORDER BY
          replies_count DESC, f.updated_at DESC
    `,
    [author.author_id],
  );

  const page = new Page();
  page.setTitle(`YellFest - Author: ${author.name}`);
  page.addCss("/css/authorDetail.css");
  page.addCss("/css/fightsList.css");
  page.setBody(
    container([
      header(),
      main([
        `
          <h2>${author.name}</h2>
          <hr>
          <p>Created fights:</p>
          ${fightsList(fightsCreated.rows)}
          <hr>
          <p>Participated in fights:</p>
          ${fightsList(fightsParticipatedIn.rows)}
        `,
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

export default authorDetail;
