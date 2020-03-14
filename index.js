
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session)

const userRouter = require("./users/user-router.js");

const server = express();
const port = process.env.PORT || 5000;
const dbConfig = require('./data/config.js');


server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session({
  name: "token",
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET || "secret",
  cookie: {
    httpOnly: true,
  },
  store: new KnexSessionStore({
    knex:dbConfig,
    createtable: true,
  }),
}))

server.use("/api", userRouter);

server.get("/api", (req, res, next) => {
  res.json({ message: "Test Api" });
});

server.use((err, req, res, next) => {
  console.log("error:", err);

  res.status(500).json({
    message: "something went wrong"
  });
});

server.listen(port, () => {
  console.log(`\now running on http://localhost:${port} **\n`);
});
