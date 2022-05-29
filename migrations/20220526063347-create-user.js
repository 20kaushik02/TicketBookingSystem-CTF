'use strict';

const typedefs = require('../typedefs');

module.exports = {
  /**
   * @param {typedefs.QueryInterface} queryInterface 
   * @param {typedefs.Sequelize} Sequelize 
   */
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('Users', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          username: {
            allowNull: false,
            unique: true,
            type: Sequelize.STRING
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING
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
          { transaction: t },
        ),
        queryInterface.dropTable(
          'Users',
          { transaction: t },
        ),
      ])
    });
  }
};