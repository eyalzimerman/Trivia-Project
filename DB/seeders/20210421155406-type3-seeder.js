"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "type3",
      [
        {
          str_template: "Are there more people in X than in Y?",
          table_name: "population_densities",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "Is X larger than Y?",
          table_name: "population_densities",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "Does X have a higher population density than Y?",
          table_name: "population_densities",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template:
            "Is the quality of life in X higher than the quality of life in Y?",
          table_name: "quality_of_lives",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template:
            "Is the crime rate of X higher than the crime rate in Y?",
          table_name: "crimes_by_countries",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template:
            "Are restaurants in X more expensive than restaurants in Y?",
          table_name: "cost_of_livings",
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
    await queryInterface.bulkDelete("type3", null, {});
  },
};
