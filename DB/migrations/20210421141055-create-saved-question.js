"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("saved_questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      str_question: {
        type: Sequelize.STRING,
      },
      option1: {
        type: Sequelize.STRING,
      },
      option2: {
        type: Sequelize.STRING,
      },
      option3: {
        type: Sequelize.STRING,
      },
      option4: {
        type: Sequelize.STRING,
      },
      answer: {
        type: Sequelize.STRING,
      },
      question_type: {
        type: Sequelize.INTEGER,
      },
      grade: {
        type: Sequelize.FLOAT,
      },
      amount: {
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
    await queryInterface.dropTable("saved_questions");
  },
};
