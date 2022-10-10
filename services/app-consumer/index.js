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

  const queue = new Queue(QUEUE, redisConfiguration);

  const checkUptime = async (job) => {
    const { id, user_id, address, status } = job.data;
    const response = await uptime(address, status);
    console.log(`Checking ${address}...${new Date().toLocaleString()}`);
    await queue.add(`${id}:${user_id}`,  {id, user_id, address, status: response.statusCode }, { delay: 10000 });
  }

  const worker = new Worker(QUEUE, checkUptime, redisConfiguration);

  worker.on('completed', job => {
    console.log(`Job ${job.id} completed!`);
  });

  worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error ${err.message}`);
  });

})();
