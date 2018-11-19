module.exports = function(dataHelpers) {
  // app.use the datahelper in server.js
  const express = require("express");
  const router = express.Router();

  router.post("/api/login", (req, res) => {
    if (req.body.email && req.body.password) {
      dataHelpers.userIdByEmailPassword(
        req.body.email,
        req.body.password,
        (err, user) => {
          if (err) throw err;
          if (user) {
            console.log("success", user);
            // res.json(user.id);
            req.session.user_id = user.id;
            res.redirect("/");
          } else {
            console.log("failed");
            res.redirect("/");
          }
        }
      );
    } else {
      // empty form submit
      res.redirect("/api/register");
    }
  });

  // router.get("/api/login/:user_id", (req, res) => {
  //   if (!req.session.user_id) {
  //     req.session.user_id = req.params.user_id;
  //   } else {
  //     alert("OK!");
  //   }
  //   res.status(200).redirect("/");
  // });

  return router;
};
//need to do the session
