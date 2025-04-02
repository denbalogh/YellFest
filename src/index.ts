import express from "express";
import { Thread } from "./types";
import { createThread, getThreadWithDateDistance } from "./helpers/thread";

const app = express();
const port = 3000;

// App config
app.set("view engine", "pug");
app.set("views", "./src/views");

// Middlewares
app.use(express.urlencoded());

// Static files
app.use(express.static("public"));

// TEMP: static data for debugging
const threads: Thread[] = [];
let idCnt = 1;

// Routes
app
  .route("/")
  .get((req, res) => {
    res.render("home", {
      title: "YellFest - yell at each other to your heart's content",
      threads: threads.map(getThreadWithDateDistance),
    });
  })
  .post((req, res) => {
    threads.push(
      createThread({
        id: idCnt++,
        title: req.body.title || "No title",
        body: req.body.body || "No body",
        authorName: req.body.name || `Anon${idCnt}`,
        authorSecret: req.body.secret,
      }),
    );
    res.render("home", {
      title: "YellFest - yell at each other to your heart's content",
      threads: threads.map(getThreadWithDateDistance),
      newThread: true,
    });
  });

app.get("/new", (req, res) => {
  res.render("new", {
    title: "YellFest - Creating new fight",
    defaultAuthorName: `Anon${idCnt}`,
  });
});

// Launching
app.listen(port, () => {
  console.log(`YellFest listening on port ${port}`);
});
