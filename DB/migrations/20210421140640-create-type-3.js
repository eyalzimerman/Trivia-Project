"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("type3s", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      str_template: {
        type: Sequelize.STRING,
      },
      country_x: {
        type: Sequelize.STRING,
      },
      country_y: {
        type: Sequelize.STRING,
      },
      option1: {
        type: Sequelize.STRING,
      },
      option2: {
        type: Sequelize.STRING,
      },
      answer: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("type3s");
  },
};
