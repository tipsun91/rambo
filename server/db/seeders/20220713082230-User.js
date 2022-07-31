'use strict';

const { sequelize } = require("../models");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'yurij@elbrus-boot.camp',
        name: 'Юрий',
        password: '$2b$04$cY7DA5sPv6Xd4Jpd5Aczheue.9d3gGv/ryoBUJ76tedO0OItjOC.W', // test
        money: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
    // await sequelize.query('ALTER SEQUENCE Users_id_seq RESTART WITH 5');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
