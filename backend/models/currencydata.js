'use strict';
const {
  Model,
  ForeignKeyConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CurrencyData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // associate
      CurrencyData.belongsTo(models.CryptoCurrency, {
        foreignKey: "crypto_id",
        as: "chartdata",
      })
    }
  }
  CurrencyData.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    crypto_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'CryptoCurrency', 
        key: 'id'
      },
      allowNull: false
    },

    
    current_price: DataTypes.FLOAT,
    market_cap: DataTypes.BIGINT,
    fully_diluted_valuation: DataTypes.BIGINT,
    market_cap_rank: DataTypes.INTEGER,
    total_volume: DataTypes.BIGINT,
    high_24h: DataTypes.FLOAT,
    low_24h: DataTypes.DOUBLE,
    price_change_24h: DataTypes.FLOAT,
    price_change_pct_24h: DataTypes.FLOAT,
    market_cap_change_24h: DataTypes.BIGINT,
    market_cap_change_pct_24h: DataTypes.FLOAT,
    circulating_supply: DataTypes.FLOAT,
    total_supply: DataTypes.FLOAT,
    last_updated: DataTypes.DATE,
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    sequelize,
    modelName: 'CurrencyData',
  });
  return CurrencyData;
};
