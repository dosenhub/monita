/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('urls', (table) => {
    table.increments('id').primary();
    table.foreign('user_id').references('users.id');
    table.integer('user_id').notNullable();
    table.text('address').notNullable();
    table.unique(['user_id', 'address']);
    table.integer('status').defaultTo(200);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('urls');
};