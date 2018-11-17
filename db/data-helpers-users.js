const args = process.argv.slice(2);

const knex = require("knex")({
  client: "postgresql",
  connection: {
    host: "localhost",
    user: "labber",
    password: "labber",
    database: "midterm",
    port: 5432
  }
});

// const bcrypt = require("bcryptjs");

//register
module.exports = function makeUserDataHelpers(knex) {
  return {

    //bcrypt.hashSync(password,10)}
// Create User, returns newly created user ID on success
    createUser: (email, password, callback) => {
      return knex('users')
      .insert({'email': email, 'password': password})
      .returning('id')
      .asCallback((err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null, res);
        }
      });
    },

// Find user by email and password
    userEmailPasswordById: (userid) => {
      const useridInt = parseInt(userid);
      return knex.select("email", "password")
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
      return knex.select('id')
      .from('users')
      .where('email', emailStr)
      .andWhere('password', passwordStr)
      .from('users')
      .asCallback((err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null, res);
        }
      });
    }

    /*
    removeUser: function(email, callback) {
      knex("users")
        .where("email", email)
        .del()
        .asCallback(callback);
    },
    getUserId: function(email,callback) {
			knex('users').where('email',email).select('id').asCallback(function(err,res) {
				callback(err,res[0].id);
			});		
    },
    
		loginUser: function(email,password,callback) {
			knex('users').where('email',email).select(['id','name','password'])
				.asCallback(function(err,res) { 
					if (!res) {
						callback(err);
					} else if (!bcrypt.compareSync(password,res[0].password)) {
						callback(err);
					}
					else if (bcrypt.compareSync(password,res[0].password)){ 
						console.log(res[0].id);
						callback(err,{
							 id: res[0].id,
							 name: res[0].name,
							 email: res[0].email
						}); }
			})


*/
  };
};
