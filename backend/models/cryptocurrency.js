'use strict';
const {
  Model
} = require('sequelize');
const currencydata = require('./currencydata');
const CurrencyData = require('./currencydata')
module.exports = (sequelize, DataTypes) => {
  class Cryptocurrency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cryptocurrency.hasMany(models.CurrencyData, {
        foreignKey: "crypto_id",
        as: "dataPoints", 
      });
      Cryptocurrency.hasMany(models.ChartData, {
        foreignKey: "crypto_id",
        as: "chart", 
      });
    }
  }
  Cryptocurrency.init({
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
    modelName: 'Cryptocurrency',
  });
  return Cryptocurrency;
};