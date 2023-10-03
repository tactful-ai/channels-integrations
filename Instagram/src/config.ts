const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const config = {
  app: {
    port: parseInt(process.env.APP_PORT as string) || 3000,
    accessToken: process.env.ACCESS_TOKEN,
    livechatHostUrl: process.env.LIVECHAT_HOST_URL,
    erpBasePath: process.env.ERP_BASEPATH,
    profileId: parseInt(process.env.PROFILE_ID as string)
  },
  instagram: {
    webhookToken: process.env.WEBHOOK_TOKEN,
    pageAccessToken: process.env.INSTAGRAM_PAGE_ACCESS_TOKEN,
    otherPageAccessToken: process.env.INSTAGRAM_OTHER_PAGE_ACCESS_TOKEN,
    customerId: parseInt(process.env.INSTAGRAM_CUSTOMER_ID as string),
    otherCustomerId: parseInt(process.env.INSTAGRAM_OTHER_CUSTOMER_ID as string),
    pageName: process.env.INSTAGRAM_PAGE_NAME,
    otherPageName: process.env.INSTAGRAM_OTHER_PAGE_NAME,
    pageId: parseInt(process.env.INSTAGRAM_PAGE_ID as string),
    otherPageId: parseInt(process.env.INSTAGRAM_OTHER_PAGE_ID as string),
    accountUsername: process.env.INSTAGRAM_ACCOUNT_USERNAME,
    otherAccountUsername: process.env.INSTAGRAM_OTHER_ACCOUNT_USERNAME,
    uuid: process.env.INSTAGRAM_SETTINGS_UUID,
    basePath: process.env.INSTAGRAM_BASE_PATH
  },
  db: {
    connectionUrl: process.env.POSTGRES_CONNECTION_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT as string) || 27017,
    name: process.env.DEV_DB_NAME || 'db',
    password: process.env.DEV_DB_PASSWORD || 'root',
    database: process.env.DEV_DB_DATABASE || 'postgres',
    dialect: process.env.DEV_DB_DIALECT || 'postgres'
  },
  bus: {
    broker: process.env.BUS_BROKER,
    messageExpiration: process.env.BUS_MESSAGE_EXPIRATION,
    namespace: process.env.BUS_NAMESPACE,
    url: process.env.BUS_URL
  }
};

export default config;