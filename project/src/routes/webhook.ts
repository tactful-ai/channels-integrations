import config from '../config';
import { receiveInDstny } from '../utils/receiveInDstny';
export class webhookRoute {
  async find(req: any) {
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    if (mode && token) {
      if (mode === 'subscribe' && token === config.instagram.webhookToken) {
        console.log('WEBHOOK_VERIFIED');
        return parseInt(challenge);
      } else {
        return 'NOT OK';
      }
    }
    return 'NOT OK';
  }

  async create(data: any) {
    let instagramMessage = data;
    console.log('\u{1F7EA} Received webhook:');
    console.dir(instagramMessage, { depth: null });
    try {
      const sent = await receiveInDstny(instagramMessage);
      if (sent) return 'EVENT_RECEIVED';
      return 'NOT OK 404';
    } catch (err) {
      return 'NOT OK 500';
    }
  }
}