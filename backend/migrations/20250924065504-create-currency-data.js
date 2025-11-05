'use strict';

const sequelize = require('../db/db');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CurrencyData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      crypto_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CryptoCurrency',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      current_price: {
        type: Sequelize.FLOAT
      },
      market_cap: {
        type: Sequelize.DOUBLE
      },
      fully_diluted_valuation: {
        type: Sequelize.DOUBLE
      },
      market_cap_rank: {
        type: Sequelize.INTEGER
      },
      total_volume: {
        type: Sequelize.DOUBLE
      },
      high_24h: {
        type: Sequelize.FLOAT
      },
      low_24h: {
        type: Sequelize.FLOAT
      },
      price_change_24h: {
        type: Sequelize.FLOAT
      },
      price_change_pct_24h: {
        type: Sequelize.FLOAT
      },
      market_cap_change_24h: {
        type: Sequelize.DOUBLE
      },
      market_cap_change_pct_24h: {
        type: Sequelize.FLOAT
      },
      circulating_supply: {
        type: Sequelize.FLOAT
      },
      total_supply: {
        type: Sequelize.FLOAT
      },
      last_updated: {
        type: Sequelize.DATE
      },

      timestamp: {
        type: Sequelize.DATE, defaultValue: Sequelize.NOW
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
    await queryInterface.dropTable('CurrencyData');
  }
};