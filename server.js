const express = require("express");

const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

// Person routes
const personRoutes = require("./routes/personRoutes.js");

app.use("/person", personRoutes);

const menuRoutes = require("./routes/menuRoutes.js");

app.use("/menu", menuRoutes);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
