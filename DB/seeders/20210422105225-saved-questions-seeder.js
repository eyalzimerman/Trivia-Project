"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "saved_questions",
      [
        {
          str_question: "What is the crime percentage in Guatemala?",
          option1: 43.59,
          option2: 43.98,
          option3: 20.66,
          option4: 57.83,
          answer: 57.83,
          question_type: 2,
          grade: 3,
          amount: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_question: "What is the area size of Norfolk Island (Australia)?",
          option1: 47.3,
          option2: 390757,
          option3: 35,
          option4: 825118,
          answer: 35,
          question_type: 2,
          grade: 4,
          amount: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_question: "Which country is the smallest by total area?",
          option1: "Guam (US)",
          option2: "Guatemala",
          option3: "Sweden",
          option4: "Yemen",
          answer: "Guam (US)",
          question_type: 1,
          grade: 2.5,
          amount: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_question:
            "Is the quality of life in Slovakia higher than the quality of life in Ecuador?",
          option1: "true",
          option2: "false",
          option3: null,
          option4: null,
          answer: "true",
          question_type: 3,
          grade: 4,
          amount: 3,
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
    await queryInterface.bulkDelete("saved_questions", null, {});
  },
};
