require('dotenv').config(); 

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(
//   process.env.DB_NAME,     
//   process.env.DB_USER,     
//   process.env.DB_PASSWORD, 
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',      
//     logging: false,        
//   }
// );

// did it work?
// module.exports = sequelize;

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(
//   process.env.DB_NAME,     
//   process.env.DB_USER,     
//   process.env.DB_PASSWORD, 
//   {
//     host: process.env.DIRECT_URL,
//     dialect: 'postgresql',      
//     logging: false,        
//   }
// );

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DIRECT_URL, {
  dialect: 'postgres',
  logging: false,
});
module.exports = sequelize;

// import postgres from 'postgres'

// const connectionString = process.env.DATABASE_URL
// const sql = postgres(connectionString)

// export default sql
