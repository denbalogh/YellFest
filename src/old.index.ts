// // import express from "express";
// import { Fight } from "./types";
// import { createFight, getFightWithDateDistance } from "./helpers/fight";
// import path from "path";

// const app = express();
// const port = 3000;

// // App config
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));

// // Middlewares
// app.use(express.urlencoded());

// // Static files
// app.use(express.static(path.join(__dirname, "..", "public")));

// // TEMP: static data for debugging
// const fights: Fight[] = [];
// let idCnt = 1;

// const homeTitle = "YellFest - yell at each other to your heart's content";

// // Routes
// app
//   .route("/")
//   .get((req, res) => {
//     res.render("home", {
//       title: homeTitle,
//       fights: fights.map(getFightWithDateDistance),
//     });
//   })
//   .post((req, res) => {
//     fights.push(
//       createFight({
//         id: idCnt++,
//         title: req.body.title || "No title",
//         body: req.body.body || "No body",
//         authorName: req.body.name || `Anon${idCnt}`,
//         authorSecret: req.body.secret,
//       }),
//     );
//     res.render("home", {
//       title: homeTitle,
//       fights: fights.map(getFightWithDateDistance),
//       newFight: true,
//     });
//   });

// app.get("/fights/:fightId", (req, res) => {
//   // New fight
//   if (req.params.fightId === "new") {
//     return res.render("new", {
//       title: "YellFest - Creating new fight",
//       defaultAuthorName: `Anon${idCnt}`,
//     });
//   }

//   // Existing fight
//   const fight = fights.find(({ id }) => String(id) === req.params.fightId);

//   res.render("fight", {
//     title: `YellFest - ${fight ? fight.title : "Fight does not exist"}`,
//     fight: undefined,
//   });
// });

// // Launching
// app.listen(port, () => {
//   console.log(`YellFest listening on port ${port}`);
// });
