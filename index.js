const express = require("express");

const app = express();

const port = 8000;

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error while starting server");
  } else {
    console.log("Server has been started at " + port);
  }
});
