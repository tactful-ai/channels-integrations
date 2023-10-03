import { TactfulMessage } from '@tactful/common';
import { InstagramMessage } from '../../types';
import { getInstaSettings } from '..';
import config from '../../config';

/** Map the received instagram webhook message to tactful message and return it */
export async function mapIGCmntToTactful
(
  instagramMessage: InstagramMessage,
  customer: any
) : Promise<TactfulMessage> {
  let change;
  const entry = instagramMessage.entry[0];
  if (entry.changes?.length) change = entry.changes[0];

  let channelId;
  try {
    let { id: id } = await getInstaSettings(config.instagram.accountUsername as string);
    channelId = id;
  } catch (err) {
    throw err;
  }

  const tactMsg: TactfulMessage = {
    recipient: { id: config.app.profileId.toString(), name: 'Dstny' },
    sender: { id: change.value.from.id, name: change.value.from.username },
    profileId: config.app.profileId,
    channelInfo: { id: channelId, name: 'ig comments', type: 'facebook' },
  };

  tactMsg.id = entry.time.toString();
  const postId = change.value.media.id;
  const commentId = change.value.id;
  // tactMsg.conversationId = postId + '_' + change.value.from.id;
  tactMsg.timestamp = entry.time;
  tactMsg.messageFormat = 'text';
  tactMsg.source = (
    (instagramMessage.entry[0].id === change.value.from.id)
      ? 'agent' : 'user'
  );
  tactMsg.userInfo = {};
  tactMsg.userInfo.id = customer.id;
  tactMsg.userInfo.name = change.value.from.username;
  tactMsg.userInfo.nick_name = ((instagramMessage.object === 'instagram') ? 'Instagram' : 'Facebook');
  tactMsg.text = change.value.text || ' ';
  tactMsg.type = 'comment';
  tactMsg.comment = {};
  tactMsg.comment.id = commentId;
  tactMsg.comment.parentCommentId = change.value.parent_id;
  tactMsg.comment.postId = postId;
  if (tactMsg.comment.parentCommentId === tactMsg.comment.postId) {
    tactMsg.conversationId = postId + '_' + commentId;
  } else {
    tactMsg.conversationId = postId + '_' + change.value.parent_id;
  }
  tactMsg.comment.postData = {};
  tactMsg.comment.postData.id = postId;
  tactMsg.comment.postData.hasAttachment = true;
  tactMsg.comment.postData.url = change.value.media.media_url;
  tactMsg.comment.postData.text = change.value.media.text;
  return tactMsg;
}