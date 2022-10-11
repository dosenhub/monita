import { Queue } from 'bullmq';
import knex from './database/index.js';

const QUEUE = 'monita:uptime';

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

  const redisConfiguration = {
    connection: {
      host: 'localhost',
      port: 6379,
    }
  };

  const queue = new Queue(QUEUE, redisConfiguration);

  const uptimeSchedule = async (url) => {
    const { id, user_id } = url;
    await queue.add(`${id}:${user_id}`,  url, { delay: 60000 });
  }

  const users = await getUsers();
  users.forEach(async (user) => {
    const urls = await getUrls(user.id);
    urls.forEach(async (url) => {
      uptimeSchedule(url, 10000);
      console.log(`Sent ${url.address} to queue ${new Date().toLocaleTimeString()}`);
    });
  });
})();
