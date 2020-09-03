const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const passport = require("passport");
app.use(passport.initialize());
require("./middleware/passport")(passport);

const MONGO_URI = "mongodb://localhost:27017/blogdb";
//const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Mongo Connection successful"))
  .catch((err) => console.log("err"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/user", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.use("/api/users/", require("./routes/users"));
app.use("/api/posts/", require("./routes/posts"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
