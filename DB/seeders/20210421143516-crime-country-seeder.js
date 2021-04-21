"use strict";

const crimeCountry = require("../Jsons/Crime index by countries 2020");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("crimes_by_countries", crimeCountry, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("crimes_by_countries", null, {});
  },
};
