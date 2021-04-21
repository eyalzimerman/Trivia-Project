"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "type2",
      [
        {
          str_template: "What is the capital of X?",
          table_name: "country_capitals",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "How many people live in X?",
          table_name: "population_densities",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "In what continent is X?",
          table_name: "country_capitals",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "What is the birth date in X?",
          table_name: "country_generals",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "What is the crime percentage in X?",
          table_name: "country_generals",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "What is the price to income ratio in X?",
          table_name: "price_to_incomes",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "What is the area size of X?",
          table_name: "population_densities",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ].map((data, i) => {
        data.id = i + 1;
        return data;
      }),
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("type2", null, {});
  },
};
