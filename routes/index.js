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
    res.send("welcome");
  });
*/

/*
render ejs:
. index.ejs //map's operation
. login.ejs
. logout.ejs
. register.ejs

*/

//export a function
module.exports = function(dataHelpers) {
   router.get("/", (req, res) => {
    if (req.session) {
      const templateVars = {
        user: req.session.user_id
      };
      res.render("index", templateVars);
    } else {
      const templateVars = {
        user: null
      };
      res.render("index", templateVars);
    }
  });

  // verify the user information
  router.get("/login", (req, res) => {
    res.render("index");
    res.send("this is the login page");
  });

  // router.post("/login", (req, res) => {
  //   if (req.body.username && req.body.password) {
  //     dataHelpers.loginUser(req.body.username, req.body.password, function(
  //       err,
  //       userObj
  //     ) {
  //       if (err) console.log("error", err); // how to use the throw error
  //       if (users) {
  //         req.session.user_id = users.id;
  //         req.session.email = users.email;
  //         req.session.password = users.password;
  //         // req.session.name = userObj.name;
  //         res.redirect("/");
  //       } else {
  //         res.redirect("/login");
  //       }
  //     });
  //   }
  // });

  router.post("/logout", (req, res) => {
    //clear the cookie session
    // or delete the cookieSession;
    res.redirect("/");
  });

  router.get("/register", (req, res) => {
    res.render("register"); // make the ejs
  });

  // insert the input info into database! have not done yet
  router.post("/register", (req, res) => {
    if (req.body.email && req.body.name) {
      dataHelpers.createUser(req.body.email, req.body.password, (err, res) => {
        if (err) throw err;
        req.body.user_id = users[0]; //user the seesion later
        req.session.email = req.body.email;
        req.session.password = req.body.password;
        res.redirect("/login"); // to the main page??
      });
    } else {
      res.redirect("/register");
    }
  });

  // List all the maps ListObj as the placehoder
  router.get("/maps", (req, res) => {
    dataHelpers.getMapList((err, listObj) => {
      res.json(listObj);
    });
  });

  //create a new map, generate map_id for each map
  router.post("/maps", (req, res) => {
    if (req.session.name) {
      //if login (set the session in register)
      dataHelpers.createMapList(
        req.body.mapName,
        req.body.description,
        req.session.user_id, //need a mapID?
        function(err, response) {
          // if (err){console.log("error", err)}else
          // if (response) {
          res.send(response);
        }
      );
    } else {
      console.log(req.session); // what is req.session
      res.send("Only log-in users could create a new map");
    }
  });

  //list all the places on a single map
  // router.get("/maps/:map_id/places", (req, res) => {
  //   DataHelpers.getPlacesByMapId(req.params.map_id(err, places)=> {
  //     res.send(places);
  //   })
  // });

  //create a new place
  // router.post("/maps/:map_id/places", (req, res) => {
  //   if (
  //     !req.params.map_id ||
  //     !req.body.placeName ||
  //     !req.body.latitude ||
  //     !req.body.longitude
  //   ) {
  //     res.redirect("/");
  //   }
  //   DataHelpers.createPlace(
  //     req.body.placeName,
  //     req.body.description,
  //     req.body.latitude,
  //     req.body.longitude,
  //     req.params.map_id,
  //     function(err, response) {
  //       if (err) throw err;
  //       res.send("a new place has been added");
  //     }
  //   );
  // });

  // router.get("/maps/:map_id/places/:place_id/images", (req, res) => {
  //   DataHelpers.getAllPlacesImages(req.params.place_id, (err, imagesArr) => {
  //     res.json(imageArr);
  //   });
  // });

  // edit the images for the place
  // router.post("/maps/:map_id/places/:place_id/images", (req, res) => {});

  return router;
};
