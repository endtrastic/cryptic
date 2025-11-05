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
      unique: true,
      references: {
        model: 'CryptoCurrency', 
        key: 'id'
      },
      allowNull: false
    },
    interval: {
      type: DataTypes.ENUM('live', '24h', '7d'), 
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ChartData',
    indexes: [
      { fields: ['crypto_id', 'interval', 'timestamp']}
    ]
  });
  return ChartData;
};
