/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  const  ITERATION = 2;
  const  NUM =  500;
  // Deletes ALL existing entries
  await knex('urls').del()

  for (let i = 0; i < ITERATION; i++) {
    let urls = [];
    for (let j = 0; j < NUM; j++) {
      urls.push({ user_id: 10358896, address: `http://${(i * NUM) + (j + 1)}.monita.dhanifudin.com`, status: 200, hacked: false });
    }
    await knex('urls').insert(urls);
  }

};
