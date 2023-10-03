import { getInstaSettings, getOrCreateCustomer, mapIGMsgToTactful, mapFBCmntToTactful, mapIGCmntToTactful } from '.';
import { getIGComment, getIGPost } from '../api';
import config from '../config';
import { bus } from '../dstny';
import { InstagramMessage } from '../types';
import { TactfulMessage } from '@tactful/common';

export async function receiveInDstny(instagramMessage: InstagramMessage) {
  if (instagramMessage.object === 'page' || instagramMessage.object === 'instagram') {
    try {
      let msg = null;
      let igCmnt = null;
      let fbCmnt = null;
      if (instagramMessage.entry[0].messaging?.length) {
        msg = instagramMessage.entry[0].messaging[0];
      } else if (instagramMessage.entry[0].changes?.length) {
        let change = instagramMessage.entry[0].changes[0];
        if (change.field === 'comments') {
          igCmnt = change;
          const commentId = igCmnt.value.id;
          const postId = igCmnt.value.media.id;
          const { parent_id: parentId } = await getIGComment(commentId);
          const { media_url: mediaUrl, caption: text } = await getIGPost(postId);
          igCmnt.value.media.text = text;
          igCmnt.value.media.media_url = mediaUrl;
          if (parentId) {
            igCmnt.value.parent_id = parentId;
          } else {
            igCmnt.value.parent_id = igCmnt.value.media.id;
          }
        } else {
          fbCmnt = change;
        }
      }
      if (msg && !msg.message) return false;
      const { profile_id: profileId } = await getInstaSettings(config.instagram.accountUsername as string);
      const options = { headers: { 'profile': profileId.toString() } };
      let senderId;
      if (msg) {
        senderId = msg.sender.id;
      } else if (fbCmnt) {
        senderId = fbCmnt.value.from.id;
      } else if (igCmnt) {
        senderId = igCmnt.value.from.id;
      }
      let customer = await getOrCreateCustomer(senderId, options);
      console.log(msg,igCmnt,fbCmnt);
      let tactMsg: TactfulMessage = {};
      if (msg) {
        tactMsg = await mapIGMsgToTactful(instagramMessage, customer);
      } else if (fbCmnt) {
        tactMsg = await mapFBCmntToTactful(instagramMessage, customer);
      } else if (igCmnt) {
        tactMsg = await mapIGCmntToTactful(instagramMessage, customer);
      }
      if (tactMsg.source === 'user') {
        console.log(tactMsg);
        const state = bus.publish('tactful.message', tactMsg);
        if (state) return true;
        throw new Error('Bus error');
      }
    } catch (err) {
      console.error('Error: ', err);
      throw err;
    }
  }
  return false;
}