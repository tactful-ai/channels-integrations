import { findCustomer } from './';
import { ERPCore } from '../dstny';
import { getInstaSettings } from './';
import config from '../config';

/** get a customer if exists or create a new one and return it */
export async function getOrCreateCustomer(senderId: any, options: any) {
  try {
    let customer;
    const { id: uuid } = await getInstaSettings(config.instagram.accountUsername as string);
    const customerList = await findCustomer(
      { 'facebook_id': senderId },
      uuid,
      options
    );
    if (!customerList.items?.length) {
      customer = await ERPCore.customers.createCustomer({
        payload: {
          facebook_id: senderId,
          channel_id: uuid
        }
      });
    } else {
      customer = customerList.items[0];
    }
    return customer;
  } catch (err) {
    throw err;
  }
}
