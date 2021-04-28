"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "score");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "score", {
      type: Sequelize.INTEGER,
    });
  },
};
