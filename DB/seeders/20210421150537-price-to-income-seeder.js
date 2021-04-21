"use strict";

const priceToIncome = require("../Jsons/Properties price index by countries 2020");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("price_to_incomes", priceToIncome, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("price_to_incomes", null, {});
  },
};
