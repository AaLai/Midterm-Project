module.exports = function(dataHelpers) {
  // app.use the datahelper in server.js
  const express = require("express");
  const router = express.Router();

  router.get("/", (req, res) => {
    res.render("login");
  });

  router.post("/", (req, res) => {
    if (req.body.username && req.body.password) {
      dataHelpers.userIdByEmailPassword(
        req.body.username,
        req.body.password,
        (err, user) => {
          if (err) throw err;
          console.log("error", err); // how to use the throw error
          if (user) {
            req.session.user_id = users.id;
            req.session.email = users.email;
            req.session.password = users.password;
            res.redirect("/");
          } else {
            res.redirect("/login");
          }
        }
      );
    } else {
      res.redirect("register");
    }
  });

  return router;
};
//need to do the session
