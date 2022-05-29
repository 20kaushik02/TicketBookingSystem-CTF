'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Screening extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Screening.init({
    movieID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    screen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    showtime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    seats: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Screening',
  });
  return Screening;
};