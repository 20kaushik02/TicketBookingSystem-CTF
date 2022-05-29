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
        queryInterface.bulkInsert(
          'Movies',
          [
            {
              details: "Don (Sivakarthikeyan)",
              referral: '',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              details: "Vikram (Kamal Haasan)",
              referral: "ARAMBIKALAMA",
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          ],
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
        queryInterface.bulkDelete(
          'Movies',
          null,
          { transaction: t }
        ),
      ]);
    });
  }
};
