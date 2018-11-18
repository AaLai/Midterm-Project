module.exports = function(dataHelpers) {
  // app.use the datahelper in server.js
  const express = require("express");
  const router = express.Router();

  router.get("/api/login", (req, res) => {
    res.render("login");
  });

  //set the cookie session.
  /*
  // return the use_id once input the correct password and email
  */

  router.post("/api/login", (req, res) => {
    if (req.body.email && req.body.password) {
      dataHelpers.userIdByEmailPassword(
        req.body.email,
        req.body.password,
        (err, user) => {
          if (err) throw err;
          console.log("this is an error", err); // how to use the throw error
          if (user) {
            req.session.user_id = user.id;
            // req.session.email = users.email;
            // req.session.password = users.password;
            res.redirect("/");
          } else {
            res.redirect("/api/login");
          }
        }
      );
    } else {
      res.redirect("/api/register");
    }
  });

  return router;
};
//need to do the session
