"use strict";

const qualityOfLife = require("../Jsons/Quality of life index by countries 2020");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("quality_of_lives", qualityOfLife, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("quality_of_lives", null, {});
  },
};
