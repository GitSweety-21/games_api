const cors = require("cors");
const express = require("express");
const { getAllgames, getGamesById } = require("./controllers");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/games", async (req, res) => {
  const games = getAllgames();
  res.json({ games });
});

app.get("/games/details/:id", async (req, res) => {
  let game = getGamesById(parseInt(req.params.id));
  res.json({ game });
});

module.exports = { app };

// app.listen(3000, () => {
//   console.log("server is running on 3000");
// });
