/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('urls').del()
  await knex('urls').insert([
    { user_id: 10358896, address: 'https://www.google.com', status: 200 },
    { user_id: 10358896, address: 'https://www.facebook.com', status: 200 },
    { user_id: 10358896, address: 'https://www.instagram.com', status: 200 },
    { user_id: 10358896, address: 'https://ulfillah.com', status: 200 },
    { user_id: 10358896, address: 'https://ikavihara.com', status: 200 },
    { user_id: 10358896, address: 'https://ihram.asia', status: 200 },
  ]);
};
