import { Queue } from 'bullmq';
import knex from './database/index.js';

const QUEUE = 'monita:uptime';

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

  const redisConfiguration = {
    connection: {
      host: 'localhost',
      port: 6379,
    }
  };

  const queue = new Queue(QUEUE, redisConfiguration);

  const uptimeSchedule = async (url, delay) => {
    const { user_id, url_id } = url;
    await queue.add(`${user_id}:${url_id}`,  url, { delay });
  }

  console.log('Starting message queue main agent');
  const users = await getUsers();
  users.forEach(async (user) => {
    const urls = await getUrls(user.id);
    urls.forEach(async (url) => {
      console.log(url);
      uptimeSchedule(url, 60000);
    });
  });
})();
