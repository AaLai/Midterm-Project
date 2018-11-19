"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";

const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const bcrypt = require("bcryptjs");
const cookieSession = require("cookie-session");
var methodOverride = require("method-override");

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require("morgan"); //what is this?
const knexLogger = require("knex-logger"); //what is this?

// Seperated Routes for each Resource

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(methodOverride("_method"));
// app.use(bodyParser.json()); //
app.use(
  cookieSession({
    name: "wikiMapSession",
    keys: ["wikiMap321"], //how to set this
    maxAge: 24 * 60 * 60 * 1000 * 30
  })
);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded"
  })
);

app.use(express.static("public"));

// Seperated Routes for each Resource
const indexRoutes = require("./routes/index")(knex);
const usersRoutes = require("./routes/users.js");
const placeRoutes = require("./routes/places");
const mapRoutes = require("./routes/maps");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");

// pass the knex db connection object to data helpers to perform DB ops
const placesDataHelpers = require("./db/data-helpers-places.js")(knex);
const mapsDataHelpers = require("./db/data-helpers-maps.js")(knex);
const usersDataHelpers = require("./db/data-helpers-users.js")(knex);

// Mount all resource routes
app.use(indexRoutes);
app.use("/api/users", usersRoutes(usersDataHelpers));
app.use("/api/map/:mapId/places", placeRoutes(placesDataHelpers));
app.use("/api/map/:mapId", mapRoutes(mapsDataHelpers));
app.use(registerRoutes(usersDataHelpers));
app.use(loginRoutes(usersDataHelpers));
app.use(logoutRoutes());

// Home page

app.post("wat", (req, res) => {
  console.log("BODY", req.body);
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
