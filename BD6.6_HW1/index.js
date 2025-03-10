const cors = require("cors");
const express = require("express");
const app = express();

const { getAllMovies, getAllmoviesdetails } = require("./controllers");
app.use(cors());
app.use(express.json());

app.get("/movies", async (req, res) => {
  let movies = await getAllMovies();
  res.json({ movies });
});

app.get("/movies/details/:id", async (req, res) => {
  let movie = await getAllmoviesdetails(parseInt(req.params.id));
  res.json({ movie });
});

module.exports = { app };
// app.listen(3000, () => {
//   console.log("server is ruuning on port 3000");
// });
