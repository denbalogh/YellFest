import express from "express";
import { Thread } from "./types";

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
let idCnt = 0;

// Routes
app
  .route("/")
  .get((req, res) => {
    res.render("home", {
      title: "YellFest - yell at each other to your heart's content",
      threads,
    });
  })
  .post((req, res) => {
    threads.push({
      id: idCnt++,
      title: req.body.title || "No title",
      replyCount: 0,
      upvotes: 0,
      latestActivity: Date.now(),
    });
    res.redirect("/");
  });

app.get("/new", (req, res) => {
  res.render("new", {
    title: "YellFest - Creating new fight",
  });
});

// Launching
app.listen(port, () => {
  console.log(`YellFest listening on port ${port}`);
});
