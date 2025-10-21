'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cryptocurrencies', [
      {
        id: 1,
        symbol: 'btc',
        name: 'Bitcoin',
        image_url: 'https://example.com/bitcoin.png',
        ath: 69000,
        ath_date: new Date('2021-11-10'),
        atl: 67,
        atl_date: new Date('2013-07-06'),
        max_supply: 21000000,
        roi: JSON.stringify({ times: 15, percentage: 1500 }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        symbol: 'eth',
        name: 'Ethereum',
        image_url: 'https://example.com/ethereum.png',
        ath: 4800,
        ath_date: new Date('2021-11-10'),
        atl: 0.42,
        atl_date: new Date('2015-10-20'),
        max_supply: null,
        roi: JSON.stringify({ times: 30, percentage: 3000 }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cryptocurrencies', null, {});
  }
};
