'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CryptoCurrency', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id1: {
        type: Sequelize.STRING
      },
      symbol: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      ath: {
        type: Sequelize.FLOAT
      },
      ath_date: {
        type: Sequelize.DATE
      },
      atl: {
        type: Sequelize.FLOAT
      },
      atl_date: {
        type: Sequelize.DATE
      },
      max_supply: {
        type: Sequelize.FLOAT
      },
      roi: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CryptoCurrency');
  }
};