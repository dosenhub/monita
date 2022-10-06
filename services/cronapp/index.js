import { CronJob } from 'cron';
import knex from './database/index.js';
import uptime from '../uptime/index.js';


const getUsers = async () => {
  const result = await knex('users')
    .select('id', 'username');
  return result;
}

const getUrls = async (user_id) => {
  const result = await knex('urls')
    .where({ user_id });
  return result;
}

const updateUrlStatus = async ({ id, status }) => {
  const result = await knex('urls')
    .where({ id })
    .update({ status });
  return result;
}

(async () => {
  const job = new CronJob('* * * * * *', async () => {
    const users = await getUsers();
    users.forEach(async (user) => {
      const urls = await getUrls(user.id);
      urls.forEach(async (url) => {
        const response = await uptime(url.address, url.status);
        console.log(response);
        const row = await updateUrlStatus(url);
        console.log(row);
      })
    });
  });

  job.start();
})();
