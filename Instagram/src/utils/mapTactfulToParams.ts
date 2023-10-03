import config from '../config';
import { getInstaSettings } from './';

/** map tactful message to instagram send API params */
export async function mapTactfulToParams(msg: any) {
  try {
    const { insta_page_access_token: accessToken } = await getInstaSettings(
      config.instagram.accountUsername as string
    );
    const params = {
      'access_token': accessToken,
      'recipient': {
        'id': msg.tactfulUserId
      },
      'message': {
        'text': msg.text
      }
    };
    return params;
  } catch (err) {
    throw err;
  }
}