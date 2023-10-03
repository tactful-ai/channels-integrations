import { TactfulMessage } from '@tactful/common';
import { InstagramMessage } from '../../types';
import { getInstaSettings } from '..';
import config from '../../config';

/** Map the received instagram webhook message to tactful message and return it */
export async function mapIGMsgToTactful
(
  instagramMessage: InstagramMessage,
  customer: any
) : Promise<TactfulMessage> {
  let msg;
  const entry = instagramMessage.entry[0];
  if (entry.messaging?.length) msg = entry.messaging[0];

  let channelId;
  try {
    let { id: id } = await getInstaSettings(config.instagram.accountUsername as string);
    channelId = id;
  } catch (err) {
    throw err;
  }

  const tactMsg: TactfulMessage = {
    recipient: { id: config.app.profileId.toString(), name: 'mohamed' },
    sender: { id: msg?.sender.id, name: 'ahmed' },
    profileId: config.app.profileId,
    channelInfo: { id: channelId, name: 'aaaa', type: 'facebook' },
  };

  tactMsg.id = entry.time.toString();
  tactMsg.conversationId = msg?.sender.id;
  tactMsg.timestamp = entry.time;
  tactMsg.messageFormat = 'media';
  tactMsg.tactfulAttachments = [];
  if (msg?.message?.attachments) {
    for (let i of msg.message.attachments) {
      tactMsg.tactfulAttachments?.push({
        type: ((i.type === 'share') ? 'image' : i.type),
        url: i.payload?.url
      });
    }
  }
  tactMsg.source = (
    (instagramMessage.entry[0].id === msg?.sender.id)
      ? 'agent' : 'user'
  );
  tactMsg.userInfo = {};
  tactMsg.userInfo.id = customer.id;
  tactMsg.userInfo.name = 'Ahmed Abdelatty';
  tactMsg.userInfo.nick_name = ((instagramMessage.object === 'instagram') ? 'Instagram' : 'Facebook');
  tactMsg.text = msg?.message?.text || ' ';
  tactMsg.type = 'message';
  tactMsg.emoji = msg?.reaction?.reaction;
  tactMsg.isEcho = msg?.message?.is_echo;

  return tactMsg;
}