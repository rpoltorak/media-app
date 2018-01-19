
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('member', function(table) {
      table.increments();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('password_reset_token');
      table.dateTime('password_reset_expires');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('member')
  ]);
};
