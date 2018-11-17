const express = require("express");

module.exports = function() {
  const router = express.Router();

  router.post("/", (req, res) => {
    req.session.user_id = null;
    res.redirect("/");
  });
  return router;
};

/*


}

the knex function

use the createRouter(knex) function
*/
