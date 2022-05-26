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
        queryInterface.createTable('Screenings', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          movieID: {
            type: Sequelize.INTEGER,
          },
          screen: {
            type: Sequelize.STRING
          },
          showtime: {
            type: Sequelize.DATE
          },
          seats: {
            type: Sequelize.ARRAY(Sequelize.BOOLEAN)

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
        )
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
        queryInterface.dropTable(
          'Screenings',
          { transaction: t }
        ),
      ]);
    });
  }
};