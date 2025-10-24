'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CryptoCurrency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CryptoCurrency.hasMany(models.CurrencyData, {
        foreignKey: "crypto_id",
        as: "dataPoints", 
      });
      CryptoCurrency.hasMany(models.ChartData, {
        foreignKey: "crypto_id",
        as: "chart", 
      });
    }
  }
  CryptoCurrency.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    symbol: DataTypes.STRING,
    name: DataTypes.STRING,
    image_url: DataTypes.TEXT,
    ath: DataTypes.FLOAT,
    ath_date: DataTypes.DATE,
    atl: DataTypes.FLOAT,
    atl_date: DataTypes.DATE,
    max_supply: DataTypes.FLOAT,
    roi: DataTypes.JSON,


  }, {
    sequelize,
    modelName: 'CryptoCurrency',
  });
  return CryptoCurrency;
};

