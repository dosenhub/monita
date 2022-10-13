import { CronJob } from 'cron';
import knex from './database/index.js';
import uptime from '../uptime/index.js';

const getUsers = async () => {
  const result = await knex('users')
    .select('id', 'username');
  return result;
}

const getUrls = async (user_id) => {
  const result = await knex
    .select('user_id', 'urls.id as url_id', 'address', 'status', 'body', 'defaced')
    .from('urls')
    .leftJoin('snapshots', 'urls.id', 'snapshots.id')
    .where({ user_id });
  return result;
}

const updateUrlStatus = async ({ id, status }) => {
  const result = await knex('urls')
    .where({ id })
    .update({ status });
  return result;
}

const updateSnapshot = async ({ id, body, defaced }) => {
  const result = await knex('snapshots')
    .insert({ id, body, defaced })
    .onConflict('id')
    .merge();
  return result;
};

(async () => {
  console.log('Starting cron job');
  const job = new CronJob('0 * * * * *', async () => {
    const users = await getUsers();
    console.log(`checking users ${users.length}`);
    users.forEach(async (user) => {
      const urls = await getUrls(user.id);
      urls.forEach(async (url) => {
        console.log('checking url', url.address);
        const response = await uptime(url.address, { statusCode: url.status, body: url.body });
        console.log(`address: ${url.address} message: ${response.message} defaced: ${response.defaced}`);
        const saveSnapshot = await updateSnapshot({ id: url.url_id, body: response.body, defaced: response.defaced });
        const row = await updateUrlStatus({ id: url.url_id, status: response.statusCode });
      })
    });
  });

  job.start();
})();
