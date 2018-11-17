"use strict";

const express = require("express");
const router = express.Router();
// const DataHelpers = require("...DataHelpers");
// const bcrypt = require("bcryptjs");

/* example by default
router.get("/users", (req, res) => {
    const user = knex('users').select(*).where('id', req.session.user_id);
    const favoritesList = knex(); // connect to the favorite
    const contributionsList = knex(); //
    .select("*")
    .from("users")
      .then(results =>
      {
        const templateVars = {
          user: req.body.user_id,
          favorites:,
        0p   contributions:,
          makers:
        };
      res.json(results); //???
    });
/*
Browse/List/Index: GET /photos
Create/Add: POST /photos
Read/Show: GET /photos/:id
Update/Edit: PUT /photos/:id
Remove/Destroy: DELETE /photos/:id
*/

const express = require("express");
const router = express.Router();

module.exports = function(DataHelpers) {
  router.get("/", (req, res) => {
    if (req.session) {
      res.render("index", {
        name: req.session.name
      });
    } else {
      res.render("index");
    }
  });

  router.get("/users", (req, res) => {
    // const user = knex('users').select(*).where('id', req.session.user_id);
    // const favoritesList = knex(); // connect to the favorite
    // const contributionsList = knex(); //
    // .select("*")
    // .from("users")
    //   .then(results =>
    //   {
    //     const templateVars = {
    //       user: req.body.user_id,
    //       favorites:,
    //       contributions:,
    //       makers:
    //     };
    //   res.json(results); //???
    // });
    res.send("welcome");
  });

  // verify the user information
  router.get("/login", (req, res) => {
    res.send("this is the login page");
  });

  // PUT perhaps
  router.post("/login", (req, res) => {
    if (req.body.username && req.body.password) {
      DataHelpers.loginUser(req.body.username, req.body.password, function(
        err,
        userObj
      ) {
        if (err) throw err;
        if (userObj) {
          //save the cookiesession {id, email, name};
          res.redirect("/");
        } else {
          res.redirect("/login");
        }
      });
    }
  });

  // DELETE perhaps
  router.post("/logout", (req, res) => {
    //clear the cookie session
    // or delete the cookieSession;
    res.redirect("/");
  });

  // POST definitely
  router.get("/register", (req, res) => {
    res.render("register");
    // res.render('register');
  });

  // insert the input info into database
  router.post("/register", (req, res) => {
    if (req.body.email && req.body.name) {
      DataHelpers.createUser(req.body.email, req.body.password, (err, xxx) => {
        if (err) throw err;
        req.body.user_id = arrIds[0]; //user the seesion later
        req.body.email;
        req.body.password = test;
        res.redirect("/login"); // to the main page??
      });
    } else {
      const templateVars = {
        user: null
      };
      res.render("index", templateVars);
    }
  });

  // List all the maps ListObj as the placehoder
  router.get("/maps", (req, res) => {
    DataHelpers.getMapList((err, listObj) => {
      res.json(listObj);
    });
  });

  //create a new map, generate map_id for each map
  router.post("/maps", (req, res) => {
    if (req.session.name) {
      //if login (set the session in register)
      DataHelpers.createMapList(
        req.body.mapName,
        req.body.description,
        req.session.user_id, //need a mapID?
        function(err, response) {
          if (err) throw err;
          if (response) {
            res.send(response);
          }
        }
      );
    }
  });

  //list all the places on a single map
  router.get("/maps/:map_id/places", (req, res) => {
    DataHelpers.getPlacesByMapId(req.params.map_id, (err, places) => {
      res.send(places);
    });
  });

  //create a new place
  router.post("/maps/:map_id/places", (req, res) => {
    if (
      !req.params.map_id ||
      !req.body.placeName ||
      !req.body.latitude ||
      !req.body.longitude
    ) {
      res.redirect("/");
    }
    DataHelpers.createPlace(
      req.body.placeName,
      req.body.description,
      req.body.latitude,
      req.body.longitude,
      req.params.map_id,
      function(err, response) {
        if (err) throw err;
        res.send(response);
      }
    );
  });

  // router.get("/maps/:map_id/places/:place_id/images", (req, res) => {
  //   DataHelpers.getAllPlacesImages(req.params.place_id, (err, imagesArr) => {
  //     res.json(imageArr);
  //   });
  // });

  // edit the images for the place
  // router.post("/maps/:map_id/places/:place_id/images", (req, res) => {});

  return router;
};
