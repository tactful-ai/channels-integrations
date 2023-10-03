import { TactfulMessage } from '@tactful/common';
import { InstagramMessage } from '../../types';
import { getInstaSettings } from '..';
import config from '../../config';

/** Map the received instagram webhook message to tactful message and return it */
export async function mapFBCmntToTactful
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
    recipient: { id: config.app.profileId.toString(), name: 'mohamed' },
    sender: { id: change.value.from.id, name: 'ahmed' },
    profileId: config.app.profileId,
    channelInfo: { id: channelId, name: 'aaaa', type: 'facebook' },
  };

  tactMsg.id = entry.time.toString();
  const postId = change.value.post_id;
  const commentId = change.value.comment_id;
  tactMsg.timestamp = entry.time;
  tactMsg.messageFormat = 'text';
  tactMsg.tactfulAttachments = [];
  if (change.value.video) {
    tactMsg.tactfulAttachments.push({
      type: 'video',
      url: change.value.video
    });
  }
  if (change.value.photo) {
    tactMsg.tactfulAttachments.push({
      type: 'image',
      url: change.value.photo
    });
  }
  tactMsg.source = (
    (instagramMessage.entry[0].id === change.value.from.id)
      ? 'agent' : 'user'
  );
  tactMsg.userInfo = {};
  tactMsg.userInfo.id = customer.id;
  tactMsg.userInfo.name = 'Ahmed Abdelatty';
  tactMsg.userInfo.nick_name = ((instagramMessage.object === 'instagram') ? 'Instagram' : 'Facebook');
  tactMsg.text = change.value.message || ' ';
  tactMsg.type = 'comment';
  const parentId = change.value.parent_id || postId;
  tactMsg.comment = {};
  tactMsg.comment.id = commentId;
  tactMsg.comment.isComment = true;
  tactMsg.comment.parentCommentId = parentId;
  tactMsg.comment.postId = postId;
  if (tactMsg.comment.parentCommentId === tactMsg.comment.postId) {
    tactMsg.conversationId = postId + '_' + commentId;
  } else {
    tactMsg.conversationId = postId + '_' + change.value.parent_id;
  }
  tactMsg.comment.postData = {};
  tactMsg.comment.postData.id = postId;
  tactMsg.comment.postData.url = change.value.post.permalink_url;
  tactMsg.comment.postData.hasAttachment = true;
  tactMsg.comment.postData.text = 'POST';
  // tactMsg.comment.postData.createdTime = entry.time.toString();
  return tactMsg;
}