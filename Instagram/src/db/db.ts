import config from '../config';

const { Sequelize } = require('sequelize');

/** sequelize connection */
// export const sequelize = new Sequelize(config.db.connectionUrl);

export const sequelize = new Sequelize('postgres', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

/** function to test sequelize connection */
export async function db() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}