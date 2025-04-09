import { pool } from ".";

export async function createAuthorsTableIfDoesntExist() {
  await pool.query(`
            CREATE TABLE IF NOT EXISTS authors(
                author_id SERIAL PRIMARY KEY,
                name VARCHAR(30),
                secret CHAR(64)
            )
        `);
}

export async function createFightsTableIfDoesntExist() {
  await pool.query(`
            CREATE TABLE IF NOT EXISTS fights(
                fight_id SERIAL PRIMARY KEY,
                author_id INT REFERENCES authors,
                title VARCHAR(100),
                body VARCHAR(2000),
                upvotes INT,
                created_at TIMESTAMP,
                updated_at TIMESTAMP
            )
        `);
}

export async function createRepliesTableIfDoesntExist() {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS replies(
            reply_id SERIAL PRIMARY KEY,
            fight_id INT REFERENCES fights,
            author_id INT REFERENCES authors,
            parent_reply_id INT REFERENCES replies,
            body VARCHAR(2000),
            upvotes int,
            created_at TIMESTAMP
        )
    `);
}

export async function createTablesIfDontExist() {
  try {
    await createAuthorsTableIfDoesntExist();
    await createFightsTableIfDoesntExist();
    await createRepliesTableIfDoesntExist();
  } catch (error) {
    console.log(error);
  }
}
