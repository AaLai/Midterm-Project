// short URL that is used while the map is shared
const generateRandomString = () => {
  let r = Math.random()
    .toString(36)
    .substring(7);
  return r;
};

module.exports = function makeMapDataHelpers(knex) {
  return {
    // Create map and returns mapurl
    createMap: (name, description, userid, callback) => {
      const nameStr = name.toString();
      const descriptionStr = description.toString();
      const useridInt = parseInt(userid);
      let randomNum = generateRandomString().toString();
      return knex("maps")
        .insert({
          url: randomNum,
          name: nameStr,
          description: descriptionStr
        })
        .returning("id")
        .then(id => {
          return knex("user_contributions")
            .insert({
              user_id: userid,
              map_id: id[0]
            })
            .asCallback((err, res) => {
              if (err) {
                callback(err);
              } else {
                callback(null, randomNum);
              }
            })
        })
    },

    // Delete map
    deleteMap: (mapid, callback) => {
      const mapIdInt = parseInt(mapid);
      return Promise.all([
        knex("user_contributions")
          .where("map_id", mapIdInt)
          .del(),
        knex("user_favourites")
          .where("map_id", mapIdInt)
          .del()
      ])
        .then(() => {
          return knex("places")
            .where("map_id", mapIdInt)
            .del();
        })
        .then(() => {
<<<<<<< HEAD
          return knex("maps")
            .where("id", mapIdInt)
            .del();
=======
          return knex('maps')
            .insert({
              url: randomNum,
              name: nameStr,
              description: descriptionStr
            })
            .returning('id')
            .then((id) => {
              return knex('user_contributions').insert({
                  user_id: userid,
                  map_id: id[0]
                })
                .asCallback((err, res) => {
                  if (err) {
                    callback(err);
                  } else {
                    callback(null, randomNum);
                  }
                });
            });
>>>>>>> 23daf9b20b4b6f623f5b3b7f6620be021967c214
        });
    },

    // Find map by URL
    findMapByUrl: (url, callback) => {
      const urlStr = url.toString();
      return knex
        .select("id")
        .from("maps")
        .where("url", urlStr)
        .asCallback((err, res) => {
          if (err) {
            callback(err);
          } else {
            callback(null, res);
          }
        });
    },

<<<<<<< HEAD
    // Find map by user favourites
    findMapByFavourites: (userid, callback) => {
      const useridInt = parseInt(userid);
      return knex
        .select("map_id")
        .from("user_favourites")
        .where("user_id", useridInt)
=======
    // Find map by URL
    findMapByUrl: (url, callback) => {
      return knex.select('id')
        .from('maps')
        .where('url', urlStr)
        .asCallback((err, res) => {
          if (err) {
            callback(err);
          } else {
            callback(null, res);
          }
        });
    },

    // Find map by user favourites
    findMapByFavourites: (userid, callback) => {
      return knex.select('map_id')
        .from('user_favourites')
        .where('user_id', userid)
>>>>>>> 23daf9b20b4b6f623f5b3b7f6620be021967c214
        .asCallback((err, res) => {
          if (err) {
            callback(err);
          } else {
            callback(null, res);
          }
        });
    },

    // Find map by user contributions
    findMapByContribution: (userid, callback) => {
<<<<<<< HEAD
      const useridInt = parseInt(userid);
      return knex
        .select("map_id")
        .from("user_contributions")
        .where("user_id", useridInt)
=======
      return knex.select('map_id')
        .from('user_contributions')
        .where('user_id', userid)
>>>>>>> 23daf9b20b4b6f623f5b3b7f6620be021967c214
        .asCallback((err, res) => {
          if (err) {
            callback(err);
          } else {
            callback(null, res);
          }
        });
    }
  };
};
