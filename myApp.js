let express = require("express");
let app = express();
require("dotenv").config();
let bodyParser = require("body-parser");

app.use("/", bodyParser.urlencoded({ extended: false }));

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  },
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
  var msgJson = { message: "Hello json" };
  if (process.env.MESSAGE_STYLE === "uppercase") {
    msgJson["message"] = msgJson["message"].toUpperCase();
  }
  res.json(msgJson);
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/:world/echo", function (req, res) {
  var world = req.params.world;
  res.json({ echo: world });
});

app
  .route("/name")
  .get(function (req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;
    res.json({ name: firstName + " " + lastName });
  })
  .post(function (req, res) {
    var firstName = req.body.first;
    var lastName = req.body.last;
    res.json({ name: firstName + " " + lastName });
  });

module.exports = app;
