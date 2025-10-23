'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      autoIncrement: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    }, 
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    password_hash: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    phone_nr: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.TEXT, allowNull: false},
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};