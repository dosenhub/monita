import uptime from "../uptime/index.js";

const UPTIME_EXCHANGE = 'monita:uptime:exchange';
const UPTIME_QUEUE = 'monita:uptime:queue';
const UPTIME_EXCHANGE_DLX = 'monita:uptime:exchange:dlx';
const UPTIME_ROUTING_KEY_DLX = 'monita:uptime:routing-key:dlx';

class Listener {
  constructor(channel) {
    this.channel = channel;

    this.listen = this.listen.bind(this);
    this.sendToQueue = this.sendToQueue.bind(this);
  }

  async listen(message) {
    try {
      const content = JSON.parse(message.content.toString());
      const { address, status } = content;
      console.log(`Checking ${address}...${new Date().toLocaleString()}`);
      const response = await uptime(address, status);
      console.log(`Status: ${address} is ${response.statusCode} ${new Date().toLocaleString()}`);
      this.sendToQueue(content);
    } catch (error) {
      console.error(error);
    }
  }

  async sendToQueue(message) {
    await this.channel.assertExchange(UPTIME_EXCHANGE, 'direct', { durable: true });
    const queueResult = await this.channel.assertQueue(UPTIME_QUEUE, {
      exclusive: false,
      deadletterExchange: UPTIME_EXCHANGE_DLX,
      deadletterRoutingKey: UPTIME_ROUTING_KEY_DLX,
    });

    await this.channel.bindQueue(queueResult.queue, UPTIME_EXCHANGE);
    await channel.sendToQueue(queueResult.queue, Buffer.from(JSON.stringify(message)), { expiration: '10000' });
    console.log(`Message sent to ${queueResult.queue} queue`);
  }
}

export default Listener;
