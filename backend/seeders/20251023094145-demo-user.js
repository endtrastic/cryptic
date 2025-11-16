'use strict';

  const { v4: uuidv4 } = require('uuid')

// test
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        firstName: 'Johnny',
        lastName: 'Smither',
        password_hash: '529340t9043fre',
        email: 'johnny@smite.com',
        phone_nr: '546460464',
        address: 'Kopli 24, doxxed himself',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        firstName: 'Eugene',
        lastName: 'Goldberg',
        password_hash: '529340t9043fre343252',
        email: 'Eugene@gmail.com',
        phone_nr: '5452044',
        address: 'Turu 2, doxxed himself',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
