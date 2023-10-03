import { ERPCore } from '../dstny';

/** find a customer using ERP SDK, returns customer list */
export async function findCustomer(
  customerPayload: any,
  channelId: string,
  options: any
) {
  try {
    const customerList = await ERPCore.customers.listCustomers({
      ...customerPayload,
      channel_id: channelId
    }, options);
    return customerList;
  } catch (err) {
    throw err;
  }
}