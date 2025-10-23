require('dotenv').config();


console.log("DB_USERNAME: ", process.env.DB_USERNAME);
console.log("DB_NAME: ", process.env.DB_NAME);
console.log("DB_NAME P : ", process.env.DB_PNAME);
console.log("DB_HOST: ", process.env.DB_HOST);
console.log("DB_PORT: ", process.env.DB_PORT);



// Using supabase to connect>
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_PNAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
      dialectOptions: {
        // some ipv4 stuff, also had to disable ipv6 https://stackoverflow.com/questions/49015634/error-connect-enetunreach
    family: 4,
  },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_PNAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
      dialectOptions: {
    family: 4,
  },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_PNAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
      dialectOptions: {
    family: 4,
  },
  },
};
