'use strict';

const typedefs = require("../typedefs");

module.exports = {
  /**
   * @param {typedefs.QueryInterface} queryInterface 
   * @param {typedefs.Sequelize} Sequelize 
   */
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('Bookings', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          username: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          screeningID: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          seat: {
            allowNull: false,
            type: Sequelize.INTEGER
          },
          redeemed: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        },
          { transaction: t },
        ),
      ]);
    });
  },

  /**
   * @param {typedefs.QueryInterface} queryInterface 
   * @param {typedefs.Sequelize} Sequelize 
   */
  down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable(
          'Bookings',
          { transaction: t }
        ),
      ]);
    });
  }
};