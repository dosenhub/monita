import uptime from '../uptime/index.js';

(async () => {
    const response = await uptime('https://google.com', 200);
    console.log(response);
})();