"use strict";

const capitals = require("../Jsons/capitals");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("country_capitals", capitals, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("country_capitals", null, {});
  },
};
