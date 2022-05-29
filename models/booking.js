'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    screeningID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    redeemed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};