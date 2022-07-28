'use strict';

const { sequelize } = require("../models");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'yurij@elbrus-boot.camp',
        name: 'Юрий',
        password: '$2b$04$cY7DA5sPv6Xd4Jpd5Aczheue.9d3gGv/ryoBUJ76tedO0OItjOC.W', // test
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'aleksej@elbrus-boot.camp',
        name: 'Алексей',
        password: '$2b$04$cY7DA5sPv6Xd4Jpd5Aczheue.9d3gGv/ryoBUJ76tedO0OItjOC.W', // test
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'artem@elbrus-boot.camp',
        name: 'Артём',
        password: '$2b$04$cY7DA5sPv6Xd4Jpd5Aczheue.9d3gGv/ryoBUJ76tedO0OItjOC.W', // test
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'elena@elbrus-boot.camp',
        name: 'Елена',
        password: '$2b$04$cY7DA5sPv6Xd4Jpd5Aczheue.9d3gGv/ryoBUJ76tedO0OItjOC.W', // test
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
