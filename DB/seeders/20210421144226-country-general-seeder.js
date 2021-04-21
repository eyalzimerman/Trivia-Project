"use strict";

const countryGeneral = require("../Jsons/newCountriesGeneral");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("country_generals", countryGeneral, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("country_generals", null, {});
  },
};
