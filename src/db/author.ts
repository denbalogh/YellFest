import { createHash } from "node:crypto";
import { pool } from ".";
import { Author } from "../types/author";

export async function getNewAuthorName() {
  const authors = await pool.query(`
        SELECT author_id
        FROM authors
        `);

  return `Anon${authors.rowCount}`;
}

export async function getExistingAuthorOrCreateNew(
  name: string,
  secret: string = "",
) {
  // With secret defined
  if (secret !== "") {
    const secretHash = createHash("sha256").update(secret).digest("hex");
    const authors = await pool.query<Author>(
      `
        SELECT author_id
        FROM authors
        WHERE name = $1 AND secret = $2
      `,
      [name, secretHash],
    );

    //Author with name and secret exists
    if (authors.rowCount) {
      return authors.rows[0];
    }

    //Author doesn't exist
    const newAuthor = await pool.query<Author>(
      `
      INSERT INTO authors(name, secret)
      VALUES ($1, $2) RETURNING author_id
    `,
      [name, secretHash],
    );

    return newAuthor.rows[0];
  }

  //Without defined secret, always create new author
  const newAuthor = await pool.query<Author>(
    `
      INSERT INTO authors(name)
      VALUES ($1) RETURNING author_id
    `,
    [name],
  );

  return newAuthor.rows[0];
}
