import { feathers } from '@feathersjs/feathers';
import express, { json, urlencoded, rest } from '@feathersjs/express';
import config from './config';
import { webhookRoute } from './routes';
import { SequelizeService } from 'feathers-sequelize';
import { InstagramSettings } from './Models';

const port = config.app.port;
const app = express(feathers());
app.use(urlencoded({ extended: true }));
app.use(json());
app.configure(rest());
app.use('/InstagramSettings', new SequelizeService({ Model: InstagramSettings }));

import { db } from './db';

import { bus, startBus } from './dstny';

import { sendToIG } from './api';

bus.on('tactful.reply', async (msg: any, callback: any) => {
  console.log('Item changed', msg.body);
  try {
    const response = await sendToIG(msg.body, msg.body.type);
    if (response.error) throw new Error('Failed to send to IG');
  } catch (err) {
    console.error('Error sending to IG: ', err);
  }
  callback();
});

app.use('webhook', new webhookRoute());

async function main() {
  try {
    await db();
    startBus();
    app.listen(port, async () => {
      console.log(`Listening at port ${port}`);
    });
  } catch (err) {
    console.error('Error starting server: ', err);
  }
}

main();

export default app;