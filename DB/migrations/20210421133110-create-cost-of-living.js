"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("cost_of_livings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country: {
        type: Sequelize.STRING,
      },
      cost_of_living_index: {
        type: Sequelize.FLOAT,
      },
      rent_index: {
        type: Sequelize.FLOAT,
      },
      groceries_index: {
        type: Sequelize.FLOAT,
      },
      restaurant_price_index: {
        type: Sequelize.FLOAT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("cost_of_livings");
  },
};
