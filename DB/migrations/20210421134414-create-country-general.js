"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("country_generals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country: {
        type: Sequelize.STRING,
      },
      region: {
        type: Sequelize.STRING,
      },
      gdp: {
        type: Sequelize.INTEGER,
      },
      literacy: {
        type: Sequelize.INTEGER,
      },
      phones: {
        type: Sequelize.INTEGER,
      },
      climate: {
        type: Sequelize.INTEGER,
      },
      birthrate: {
        type: Sequelize.INTEGER,
      },
      deathrate: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("country_generals");
  },
};
