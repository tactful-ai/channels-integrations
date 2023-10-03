import { InstagramSettings } from '../Models';

/** get the configuration settings of instagram from the database */
export async function getInstaSettings(username: string) {
  try {
    const instagramSettings = await InstagramSettings.findOne({
      where: {
        insta_account_username: username
      }
    });
    return instagramSettings;
  } catch (err) {
    throw err;
  }
}