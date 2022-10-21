const express = require("express");
const cors = require("cors");
// const pool = require("./configuration/dbConfig");
const authRouter = require("./routes/auth")
const studentRouter = require("./routes/stud_details")
const app = express();
require("./configuration/dbConfig.js")

app.use(express.json());
app.use(cors({ origin:true, credentials:true }));


const port = 8000;

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });
// app.get("/test",testController);
app.use("/api/auth",authRouter)
app.use("/api/student",studentRouter);
// pool.query('select * from login')
//  .then(function (data) {
//     console.log(data.rows);
//  });

app.listen(port, function (err) {
  if (err) {
    console.log("Error while starting server");
  } else {
    console.log("Server has been started at " + port);
  }
});

