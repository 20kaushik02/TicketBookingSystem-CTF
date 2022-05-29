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
          'Screenings',
          [
            {
              movieID: 1,
              screen: "Rohini Silver Screens, Koyambedu",
              showtime: new Date("2022-05-23 17:25:00"),
              price: 196.25,
              seats: new Array(250).fill(false),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              movieID: 1,
              screen: "Rohini Silver Screens, Koyambedu",
              showtime: new Date("2022-05-23 14:45:00"),
              price: 196.25,
              seats: new Array(250).fill(false),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              movieID: 2,
              screen: "IMAX 3D, Phoenix Market City, Velachery",
              showtime: new Date("2022-06-3 15:10:00"),
              price: 369,
              seats: new Array(250).fill(false),
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
          'Screenings',
          null,
          { transaction: t }
        ),
      ]);
    });
  }
};
