const express = require("express");
const ejs = require("ejs");
const dotenv = require("dotenv");

dotenv.config();
let PORT = process.env.PORT || 8080;

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, (req, res) => {
  console.log("server running on 5000");
});
