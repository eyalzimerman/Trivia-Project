"use strict";

const populationDensity = require("../Jsons/newPopulationDensity");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "population_densities",
      populationDensity,
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("population_densities", null, {});
  },
};
