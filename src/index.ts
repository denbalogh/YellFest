import express from "express";

const app = express();
const port = 3000;

// App config
app.set("view engine", "pug");
app.set("views", "./views");

// Static files
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.render("home", {
    title: "YellFest - yell at each other to your heart's content",
    threads: [
      {
        id: 1,
        title: "Pineapple on pizza is a war crime",
        replyCount: 73,
        upvotes: 42,
        lastActivity: "5 minutes ago", // Approx. 10 mins ago from April 01, 2025
      },
      {
        id: 2,
        title: "Cats are just furry scams",
        replyCount: 19,
        upvotes: 15,
        lastActivity: "2 hours ago", // Approx. 2 hours ago from April 01, 2025
      },
      {
        id: 3,
        title: "Ur all wrong about everything",
        replyCount: 105,
        upvotes: 67,
        lastActivity: "Yesterday", // Approx. now-ish from April 01, 2025
      },
    ],
  });
});

// Launching
app.listen(port, () => {
  console.log(`YellFest listening on port ${port}`);
});
