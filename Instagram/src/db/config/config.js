const dotenv = require('dotenv');
dotenv.config({ path: '../../.env'});

module.exports = {
  'development': {
    'username': process.env.DEV_DB_NAME,
    'password': process.env.DEV_DB_PASSWORD,
    'database': process.env.DEV_DB_DATABASE,
    'host': process.env.DB_HOST,
    'dialect': process.env.DEV_DB_DIALECT
  },
  // Replace dummy values with env variables when testing
  'test': {
    'username': 'root',
    'password': null,
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  // Replace dummy values with env variables when in production
  'production': {
    'username': 'root',
    'password': null,
    'database': 'database_production',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  }
};