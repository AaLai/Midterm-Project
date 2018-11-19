const express = require("express");

module.exports = function() {
  const router = express.Router();

  router.post("/api/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });
  return router;
};
