import { Queue, Worker } from 'bullmq';
import uptime from '../uptime/index.js';

const QUEUE = 'monita:uptime';

(async () => {
  const redisConfiguration = {
    connection: {
      host: 'localhost',
      port: 6379,
    }
  };

  console.log('Starting message queue worker');
  const queue = new Queue(QUEUE, redisConfiguration);

  const checkUptime = async (job) => {
    const { user_id, url_id, address, status, body, defaced } = job.data;
    const response = await uptime(address, { statusCode: status, body });
    await queue.add(`${user_id}:${url_id}`,  {user_id, url_id, address, status: response.statusCode, body, defaced }, { delay: 60000 });
  }

  const worker = new Worker(QUEUE, checkUptime, redisConfiguration);

  worker.on('completed', job => {
    console.log(`Job ${job.id} completed!`);
  });

  worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error ${err.message}`);
  });

})();
