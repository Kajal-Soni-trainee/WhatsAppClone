const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const cookie = require("cookie-parser");
app.use(cookie());
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const route = require("./routes.js");
const cors = require("cors");
const cron = require("node-cron");
const { autoDelStatus } = require("./controllers/status.js");
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
};
app.use(allowCrossDomain);
app.use("/", route);
cron.schedule("* * * * *", () => {
  autoDelStatus();
});
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  socket.on("sentMsg", (msg) => {
    console.log("sent message");
    io.emit("receiveMsg", msg);
  });
});
server.listen(PORT);
