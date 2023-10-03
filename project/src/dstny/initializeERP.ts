import {
  Configuration as ERPConfig,
  initializeTactful as ERPInit
} from '@tactful/erp-sdk-typescript';
import config from '../config';

const accessToken = config.app.accessToken;

/** config settings for ERP SDK */
export const erpApiConfig = new ERPConfig({
  basePath: config.app.erpBasePath,
  apiKey: `Bearer ${accessToken}`,
  options: {
    mode: 'cors',
  }
});

/** ERP SDK to interact with customers (searching and creating) */
export const ERPCore = ERPInit(erpApiConfig);