"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "type3",
      [
        {
          str_template: "Are there more people in X than in Y?",
          table_name: "population_densities",
          column_name: "population",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "Is the size of X bigger than Y?",
          table_name: "population_densities",
          column_name: "areaKm2",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template: "Does X have a higher population density than Y?",
          table_name: "population_densities",
          column_name: "densityPerKm2",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template:
            "Is the quality of life in X higher than the quality of life in Y?",
          table_name: "quality_of_lives",
          column_name: "qualityOfLifeIndex",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template:
            "Is the crime rate of X higher than the crime rate in Y?",
          table_name: "crimes_by_countries",
          column_name: "crimeIndex",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_template:
            "Are restaurants in X more expensive than restaurants in Y?",
          table_name: "cost_of_livings",
          column_name: "restaurantPriceIndex",
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
