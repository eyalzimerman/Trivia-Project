"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("type1", "column_name", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("type2", "column_name", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("type3", "column_name", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("type1", "column_name");
    await queryInterface.removeColumn("type2", "column_name");
    await queryInterface.removeColumn("type3", "column_name");
  },
};
