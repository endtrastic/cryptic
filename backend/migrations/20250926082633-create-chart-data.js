'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChartData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      crypto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cryptocurrencies',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      volume: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ChartData');
  }
};