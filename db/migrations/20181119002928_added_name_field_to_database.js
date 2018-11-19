
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.text('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('name');
  })
};
