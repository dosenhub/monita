/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { id: 10358896 , username: 'dhanifudin', first_name: 'Dian Hanifudin' , last_name: 'Subhi' },
  ]);
};
