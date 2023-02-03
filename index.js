const express = require("express");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const key = "this is my secret key";
const username = "om";
const cookieParser = require("cookie-parser");
const password = "om";
const bp = require("body-parser");

const user = {
  isAdmin: true,
  name: "om dalavi",
};
const app = express();
app.use(bp.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/verify", (req, res) => {
  let token = req.cookies["token"];
  console.log(token);
  if (token == undefined) {
    res.send("not loggedin");
  } else {
    let decoded = jwt.verify(token, key);
    res.send(decoded);
  }
});
app.post("/login", (req, res) => {
  if (req.body.u == username && req.body.p == password) {
    let payload = user;
    const token = jwt.sign(payload, key);
    res.cookie("token", token, { maxAge: 1000000, httpOnly: true });
    res.json({
      user: user,
    });
  } else {
    res.json({ message: "invalid credentials" });
  }
});
app.listen(5000, (req, res) => {
  console.log("server running on 5000");
});
