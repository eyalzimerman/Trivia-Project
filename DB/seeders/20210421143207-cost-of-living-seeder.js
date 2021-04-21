"use strict";

const costLiving = require("../Jsons/Cost of living index by country 2020");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("cost_of_livings", costLiving, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cost_of_livings", null, {});
  },
};
