"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "type1",
      [
        {
          str_template: "Which country is most populous?",
          table_name: "population_densities",
          column_name: "population",
          min_or_max: "max",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "Which country is least populous?",
          table_name: "population_densities",
          column_name: "population",
          min_or_max: "min",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "Which country is the largest by total area?",
          table_name: "population_densities",
          column_name: "areaKm2",
          min_or_max: "max",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "Which country is the smallest by total area?",
          table_name: "population_densities",
          column_name: "areaKm2",
          min_or_max: "min",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "Which country is the most densely populated?",
          table_name: "population_densities",
          column_name: "rank",
          min_or_max: "max",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "Which country is the least densely populated?",
          table_name: "population_densities",
          column_name: "rank",
          min_or_max: "min",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "Which country has the most cell phones per person?",
          table_name: "country_generals",
          column_name: "phones",
          min_or_max: "max",
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
    await queryInterface.bulkDelete("type1", null, {});
  },
};
