module.exports = function(dataHelpers) {
  //   const dataHelpers = require("../db/data-helpers-users.js")(knex);

  const express = require("express");
  const router = express.Router();
  const bcrypt = require("bcryptjs");

  router.get("/api/register", (req, res) => {
    res.render("register"); // make the ejs
  });

  // insert the input info into database! have not done yet
  router.post("/api/register", (req, res) => {
    if (req.body.email && req.body.password) {
      dataHelpers.createUser(req.body.email, req.body.password, (err, user) => {
        if (err) throw err;
        console.log(user);
        // req.body.user_id = users[0]; //user the seesion later
        req.session.user_id = user.id;
        // req.session.password = req.body.password;
        console.log("user info", user);
        res.redirect("/"); // to the main page??
      });
    } else {
      res.redirect("/api/register");
    }
  });

  return router;
};
