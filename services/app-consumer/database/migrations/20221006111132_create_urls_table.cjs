/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('urls', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('users.id');
    table.text('address').notNullable();
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
