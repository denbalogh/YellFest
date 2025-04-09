import { pool } from "../db";
import { getExistingAuthorOrCreateNew, getNewAuthorName } from "../db/author";
import Page from "../Page";
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
        INSERT INTO fights(author_id, title, body, upvotes, created_at, updated_at)
        VALUES($1, $2, $3, $4, $5, $6) 
      `,
      [author_id, title, body, 0, new Date(), new Date()],
    );

    newFight = true;
  }

  const fights = await pool.query(`
    SELECT fight_id, name AS author_name, title, body, upvotes, created_at, updated_at
    FROM fights NATURAL JOIN authors
  `);

  const page = new Page();
  page.addCss("/css/home.css");
  page.addCss("/css/fightsList.css");
  page.setBody(container([header(), main(fightsList(fights.rows, newFight))]));

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
