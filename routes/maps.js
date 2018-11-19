const express = require("express");
const router = express.Router();

module.exports = function(mapFunctions) {
  // this one brings up a test page
  router.get("/", (req, res) => {
    res.render("tester");
  }),
    // creates a map and redirects to url once it's done
    router.post("/", (req, res) => {
      mapFunctions.createMap(
        req.body.name,
        req.body.description,
        req.body.userid,
        (err, result) => {
          if (err) {
            console.log("error", err);
          } else {
            res.redirect(`/${result}`);
          }
        }
      );
    }),
    // tabkes cookie as userid and uses it to grab favourites
    router.get("/favourites", (req, res) => {
      mapFunctions.findMapByFavourites(req.session.userid, (err, result) => {
        if (err) {
          console.log("error", err);
        } else {
          res.json(result);
        }
      });
    }),
    // takes cookie as userid and uses it to grab contribution
    router.get("/contributions", (req, res) => {
      mapFunctions.findMapByContribution(req.session.userid, (err, result) => {
        if (err) {
          console.log("error", err);
        } else {
          res.json(result);
        }
      });
    });

  router.get("/:mapUrl", (req, res) => {
    mapFunctions.findMapByUrl(req.params.mapUrl, (err, result) => {
      if (err) {
        console.log("error", err);
      } else {
        res.json(result);
      }
    });
  });

  // deletes a map and redirects to hopefully the index
  router.delete("/:mapurl", (req, res) => {
    mapFunctions.deleteMap(req.body.mapid).then(result => {
      console.log(res);
      // CHECK THIS ONE!
      res.redirect("/");
    });
  });

  return router;
};
