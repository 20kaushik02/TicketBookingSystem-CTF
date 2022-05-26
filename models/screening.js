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
    movieID: DataTypes.INTEGER,
    screen: DataTypes.STRING,
    showtime: DataTypes.DATE,
    seats: DataTypes.ARRAY(DataTypes.BOOLEAN),
  }, {
    sequelize,
    modelName: 'Screening',
  });
  return Screening;
};