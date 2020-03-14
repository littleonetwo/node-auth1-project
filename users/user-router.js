
const bcrypt = require("bcryptjs");
const express = require("express");


const usersModel = require("./user-model.js");

const router = express.Router();

function restricted() {

  const authError = {
    errorMessage: "Invalid credentials"
  };

  return async (req, res, next) => {
    // console.log(req.session)
    try {

      if (!req.session || !req.session.username) {
        console.log("uh oh")
        return res.status(401).json(authError);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

router.get("/users", restricted(), async (req, res, next) => {
  try {
    const users = await usersModel.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    // console.log(req.body);
    const saved = await usersModel.add(req.body);
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await usersModel.findBy({ username }).first();
    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      req.session.username = user;
      res.status(200).json({
        message: `Welcome ${user.username}!`
      });
    } else {
      res.status(401).json({
        message: "Invalid Credentials"
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/logout", restricted(), (req, res, next) => {

    req.session.destroy(err => {
      if (err) {
        res.send('error logging out');
      } else {
        res.send('good bye');
      }
    });

});

module.exports = router;
