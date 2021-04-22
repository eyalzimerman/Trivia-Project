"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "saved_questions",
      [
        {
          str_question: "Which country is the largest by total area?",
          option1: "Palestine",
          option2: "Vatican City",
          option3: "Cameroon",
          option4: "Martinique (France)",
          answer1: 6020,
          answer2: 0.44,
          answer3: 466050,
          answer4: 1128,
          answer: "Cameroon",
          question_type: 1,
          grade: 3,
          amount: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_question: "What is the birthrate in Azerbaijan?",
          option1: 18.2,
          option2: 15.56,
          option3: 22.18,
          option4: 20.74,
          answer1: "South Africa",
          answer2: "Qatar",
          answer3: "Tuvalu",
          answer4: "Azerbaijan",
          answer: 20.74,
          question_type: 2,
          grade: 4,
          amount: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_question:
            "Is the quality of life in Hungary higher than the quality of life in Vietnam?",
          option1: "Hungary",
          option2: "Vietnam",
          option3: null,
          option4: null,
          answer1: 128.16,
          answer2: 87.48,
          answer3: null,
          answer4: null,
          answer: "true",
          question_type: 3,
          grade: 2.5,
          amount: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          str_question: "How many people live in Turkmenistan?",
          option1: 5851466,
          option2: 304500,
          option3: 34218169,
          option4: 2413643,
          answer1: "Turkmenistan",
          answer2: "Vanuatu",
          answer3: "Saudi Arabia",
          answer4: "Namibia",
          answer: 5851466,
          question_type: 2,
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
