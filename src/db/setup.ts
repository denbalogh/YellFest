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

// export async function createRepliesTableIfDoesntExist() {
//   await pool.query(`
//         CREATE TABLE IF NOT EXISTS replies(
//             replyID int NOT NULL,
//             authorID int NOT NULL,
//             fightID int NOT NULL,
//             parentReplyID int NOT NULL,
//             body varchar(2000),
//             upvotes int,
//             createdAt DATE,
//             PRIMARY KEY (replyID),
//             FOREIGN KEY (authorID) REFERENCES Authors(authorID),
//             FOREIGN KEY (fightID) REFERENCES Fights(fightID),
//             FOREIGN KEY (parentReplyID) REFERENCES Replies(parentReplyID)
//         )
//     `);
// }

export async function createTablesIfDontExist() {
  try {
    await createAuthorsTableIfDoesntExist();
    await createFightsTableIfDoesntExist();
    // await createRepliesTable();
  } catch (error) {
    console.log(error);
  }
}
