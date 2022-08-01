'use strict';

const { sequelize } = require("../models");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Games', [
      {
        userId: 1,
        countEnemies: 50,
        countMoney: 100,
        countDamage: 1000,
        timeGame: 60 * 60, // 1  час
        countWaves: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
    // await sequelize.query('ALTER SEQUENCE Users_id_seq RESTART WITH 5');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Games', null, {});
  }
};
