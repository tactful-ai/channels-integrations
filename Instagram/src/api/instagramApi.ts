import { TactfulMessage } from '@tactful/common';
import { getInstaSettings, mapTactfulToParams } from '../utils';
import config from '../config';


export async function sendToIG(tactfulMessage: TactfulMessage, type: string) {
  try {
    let response;
    if (type == 'message') {
      response = await postIGMessage(tactfulMessage);
    } else if (type === 'comment' || type === 'facebook_comment') {
      response = await postIGreply(tactfulMessage);
    }
    return response;
  } catch (err) {
    throw err;
  }
}

/**
 * This method uses the Instagram API to send a message to an instagram
 * account
 * @param tactfulMessage
 * @returns postResp
 * @example {
    recipient_id: '24585593727706042',
    message_id: 'aWdfZAG1faXRlbToxOklHTWVzc2FnZAUlEOjE3ODQxNDQ4NjE0Mjg2NjQ3OjM0MDI4MjM2Njg0MTcxMDMwMTI0NDI3NjEzOTY5Mzg4MTcwNzQ1MzozMTI2MTU2NzI0NTg2NzMwNTM1MzU1Mjg4Nzc3MjM0ODQxNgZDZD'
  }
 * @throws error sending to ig
 */
export async function postIGMessage(tactfulMessage: TactfulMessage) {
  try {
    const params = await mapTactfulToParams(tactfulMessage);
    const { insta_base_path: instaBasePath } = await getInstaSettings(
      config.instagram.accountUsername as string
    );
    const postResp = await fetch(
      instaBasePath + '/me/messages',
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(params),
      }
    );
    return await postResp.json();
  } catch (err) {
    throw err;
  }
}

export async function getIGComment(commentId: string) {
  try {
    const {
      insta_base_path: instaBasePath,
      insta_page_access_token: accessToken
    } = await getInstaSettings(config.instagram.otherAccountUsername as string);
    const getResp = await fetch(
      instaBasePath + '/' + commentId + '?' + new URLSearchParams({
        fields: 'from,hidden,id,like_count,media,parent_id,text,timestamp,user,username',
        access_token: accessToken
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      }
    );
    return await getResp.json();
  } catch (err) {
    throw err;
  }
}

export async function postIGreply(tactfulMessage: TactfulMessage) {
  try {
    const {
      insta_base_path: instaBasePath,
      insta_page_access_token: accessToken
    } = await getInstaSettings(config.instagram.otherAccountUsername as string);
    const params = {
      access_token: accessToken,
      message: tactfulMessage.text
    };
    const commentId = tactfulMessage.tactfulUserId?.split('_')[1];
    const postResp = await fetch(
      instaBasePath + '/' + commentId + '/replies',
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(params)
      }
    );
    return await postResp.json();
  } catch (err) {
    throw err;
  }
}

export async function getIGPost(postId: string) {
  try {
    const {
      insta_base_path: instaBasePath,
      insta_page_access_token: accessToken
    } = await getInstaSettings(config.instagram.otherAccountUsername as string);
    const getResp = await fetch(
      instaBasePath + '/' + postId + '?' +
      new URLSearchParams({
        fields: 'media_url,caption',
        access_token: accessToken,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      }
    );
    const tmp = await getResp.json();
    return tmp;
  } catch (err) {
    throw err;
  }
}