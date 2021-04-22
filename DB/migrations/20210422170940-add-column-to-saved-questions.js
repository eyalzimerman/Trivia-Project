"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("saved_questions", "answer1", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("saved_questions", "answer2", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("saved_questions", "answer3", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("saved_questions", "answer4", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("saved_questions", "answer1");
    await queryInterface.removeColumn("saved_questions", "answer2");
    await queryInterface.removeColumn("saved_questions", "answer3");
    await queryInterface.removeColumn("saved_questions", "answer4");
  },
};
