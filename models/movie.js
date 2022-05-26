'use strict';
const {
  Model
} = require('sequelize');

const typedefs = require("../typedefs");

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init({
    details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referral: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });

  return Movie;
};