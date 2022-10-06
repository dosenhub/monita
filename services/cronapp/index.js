import { CronJob } from 'cron';
import uptime from '../uptime/index.js';

(async () => {
    const job = new CronJob('0 * * * * *', async () => {
        const response = await uptime('https://google.com', 200);
        console.log(response);
    });
    
    job.start();
})();
