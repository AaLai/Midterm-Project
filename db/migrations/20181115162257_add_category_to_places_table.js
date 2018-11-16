
exports.up = function(knex, Promise) {
  return knex.schema.table('places', function(table) {
    table.string('category');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('places', function(table) {
    table.dropColumn('category');
  })
};
