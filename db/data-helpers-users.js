module.exports = function makeUserDataHelpers(knex) {
  return {
    // Create User, returns newly created user ID on success
    createUser: (email, password, callback) => {
      return knex("users")
        .insert({
          email: email,
          password: password
        })
        .returning("id")
        .asCallback((err, res) => {
          if (err) {
            callback(err);
          } else {
            callback(null, res);
          }
        });
    },

    // Find user by email and password
    userEmailPasswordById: userid => {
      const useridInt = parseInt(userid);
      return knex
        .select("email", "password")
        .from("users")
        .where("id", useridInt)
        .asCallback((err, res) => {
          if (err) {
            callback(err);
          } else {
            callback(null, res);
          }
        });
    },

    //find user Id by email and password
    userIdByEmailPassword: (email, password, callback) => {
      const emailStr = email.toString();
      const passwordStr = password.toString();
      return knex
        .select("id")
        .from("users")
        .where("email", emailStr)
        .andWhere("password", passwordStr)
        .from("users")
        .asCallback((err, res) => {
          if (err) {
            callback(err);
          } else {
            callback(null, res);
          }
        });
    },

    //user Id by email and password
    userIdByEmailPassword: (email, password, callback) => {
      const emailStr = email.toString();
      const passwordStr = password.toString();
      return knex
        .select("id")
        .from("users")
        .where("email", emailStr)
        .andWhere("password", passwordStr)
        .from("users")
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
