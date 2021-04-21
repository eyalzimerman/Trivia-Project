"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "type2",
      [
        {
          str_template: "What is the capital of X?",
          table_name: "country_capitals",
          column_name: "capital",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "How many people live in X?",
          table_name: "population_densities",
          column_name: "population",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "In what continent is X?",
          table_name: "country_capitals",
          column_name: "continent",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "What is the birthrate in X?",
          table_name: "country_generals",
          column_name: "birthrate",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "What is the crime percentage in X?",
          table_name: "crimes_by_countries",
          column_name: "crimeIndex",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "What is the price to income ratio in X?",
          table_name: "price_to_incomes",
          column_name: "priceToIncome",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "What is the area size of X?",
          table_name: "population_densities",
          column_name: "areaKm2",
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
