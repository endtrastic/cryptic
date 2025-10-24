'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChartData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChartData.belongsTo(models.CryptoCurrency, {
        foreignKey: "crypto_id",
        as: "chart", 
      });
    }
  }
  ChartData.init({
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
    timestamp: DataTypes.DATE,
    price: DataTypes.FLOAT,
    volume: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ChartData',
  });
  return ChartData;
};
