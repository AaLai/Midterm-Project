const express = require("express");
const router = express.Router({
  mergeParams: true
});

module.exports = function(mapFunctions) {

  router.get('/:mapurl', function (res, req) {
    mapFunctions.findMapByUrl(req.body.mapurl, (err, result) => {
      if (err) {
        res.send('something failed');
      } else {
        res.json(result);
      }
    })
  })

  router.delete('/:mapurl', function (req, res) {
    mapFunctions.deleteMap(req.params.id, (err, result) => {
      if (err) {
        res.send('something failed');
      } else {
        // CHECK THIS ONE!
        res.redirect('localhost:8080/index')
      }
    })
  })

  router.get('/', function (req, res) {
    res.render("tester")
  })

  router.post('/', function (req, res)  {
    mapFunctions.createMap(req.body.name, req.body.description, req.body.userid, (err, result) => {
      if (err) {
        res.send('something failed');
      } else {
        res.redirect(`/${result}`);
      }
    })
  })

  router.get('/favourites', function (req, res)  {
    mapFunctions.findMapByFavourites(req.body.userid, (err, result) => {
      if (err) {
        res.send('something failed');
      } else {
        res.json(result)
      }
    })
  })

  router.get('/contributions', function (req, res)  {
    mapFunctions.findMapByContribution(req.body.userid, (err, result) => {
      if (err) {
        res.send('something failed');
      } else {
        res.json(result)
      }
    })
  })

};


