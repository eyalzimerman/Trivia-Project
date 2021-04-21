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
        type: Sequelize.FLOAT,
      },
      literacy: {
        type: Sequelize.FLOAT,
      },
      phones: {
        type: Sequelize.FLOAT,
      },
      climate: {
        type: Sequelize.FLOAT,
      },
      birthrate: {
        type: Sequelize.FLOAT,
      },
      deathrate: {
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
    await queryInterface.dropTable("country_generals");
  },
};
