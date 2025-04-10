import { pool } from "../db";
import { getExistingAuthorOrCreateNew, getNewAuthorName } from "../db/author";
import Page from "../Page";
import { Fight } from "../types/fight";
import { ViewFuncAsync } from "../types/view";
import getFormData from "../utils/form";
import container from "../views/container";
import fightsList from "../views/fightsList";
import header from "../views/header";
import main from "../views/main";

const home: ViewFuncAsync = async (...args) => {
  const [req, res] = args;

  const newUserName = await getNewAuthorName();
  let newFight = false;

  // Handle creation of new fight
  if (req.method === "POST") {
    const {
      name,
      secret,
      title = "",
      body = "",
    } = await getFormData<"name" | "secret" | "title" | "body">(req);

    const { author_id } = await getExistingAuthorOrCreateNew(
      name || newUserName,
      secret,
    );

    await pool.query(
      `
        INSERT INTO fights(author_id, title, body, created_at, updated_at)
        VALUES($1, $2, $3, $4, $5) 
      `,
      [author_id, title, body, new Date(), new Date()],
    );

    newFight = true;
  }

  const fights = await pool.query<Fight>(`
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
      GROUP BY 
          f.fight_id, a.name
      ORDER BY
          replies_count DESC, f.updated_at DESC
  `);

  const page = new Page();
  page.addCss("/css/home.css");
  page.addCss("/css/fightsList.css");
  page.setBody(
    container([
      header(),
      main(`
          ${newFight ? `<p class="new-fight-info">New fight created</p>` : ""}
          <p>Hottest fights:</p>
          ${fightsList(fights.rows)}
        `),
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

export default home;
