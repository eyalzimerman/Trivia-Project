const {
  Type1,
  Type2,
  Type3,
  SavedQuestion,
  CostOfLiving,
  CountryCapital,
  CountryGeneral,
  CrimesByCountry,
  PopulationDensity,
  PriceToIncome,
  QualityOfLife,
  User,
  Scoreboard,
} = require("./models");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

// find the model by table name from DB
const tableNavigator = (str) => {
  switch (str) {
    case "population_densities":
      return PopulationDensity;
    case "country_capitals":
      return CountryCapital;
    case "country_generals":
      return CountryGeneral;
    case "price_to_incomes":
      return PriceToIncome;
    case "quality_of_lives":
      return QualityOfLife;
    case "crimes_by_countries":
      return CrimesByCountry;
    case "cost_of_livings":
      return CostOfLiving;
  }
};

// return min or max object
const findMaxOrMin = (arr, str, column) => {
  if (str === "max") {
    return arr.reduce((max, obj) => (max[column] > obj[column] ? max : obj));
  } else {
    return arr.reduce((min, obj) => (min[column] < obj[column] ? min : obj));
  }
};

// function for type one of questions
const typeOne = async () => {
  return Type1.findOne({ order: Sequelize.literal("rand()") }).then(
    async (question) => {
      const { tableName } = question;
      const { minOrMax } = question;
      const table = await tableNavigator(tableName);
      return table
        .findAll({ order: Sequelize.literal("rand()"), limit: 4 })
        .then((option) => {
          const allOptions = option.map((answer) => answer);
          const optionWithAnswers = allOptions.map((option) => {
            return {
              country: option.country,
              answer: option[question.columnName],
            };
          });
          const answer = findMaxOrMin(allOptions, minOrMax, question.columnName)
            .country;
          const obj = {
            question: question.strTemplate,
            answer: answer,
            allAnswers: optionWithAnswers,
          };
          return obj;
        });
    }
  );
};

// function for type two of questions
const typeTwo = async () => {
  return Type2.findOne({ order: Sequelize.literal("rand()") }).then(
    async (question) => {
      const { tableName } = question;
      const table = await tableNavigator(tableName);

      return table
        .findOne({ order: Sequelize.literal("rand()") })
        .then(async (country) => {
          const countryName = country.country;
          const newQuestion = question.strTemplate.replace("X", countryName);
          const answer = country[question.columnName];

          const objAnswer = {
            option: country[question.columnName],
            answer: country.country,
          };

          const column = question.columnName
            .split(/(?=[A-Z])/)
            .join("_")
            .toLowerCase();

          const other = await table.findAll({
            where: { [column]: { [Op.notLike]: answer } },
            group: column,
            order: Sequelize.literal("rand()"),
            limit: 3,
          });

          let allOthers = other.map((answer) => {
            return {
              option: answer[question.columnName],
              answer: answer.country,
            };
          });
          allOthers.push(objAnswer);
          allOthers = allOthers.sort(() => Math.random() - 0.5);
          const obj = {
            question: newQuestion,
            answer: answer,
            allAnswers: allOthers,
          };
          return obj;
        });
    }
  );
};

// function for type three of questions
const typeThree = async () => {
  return Type3.findOne({ order: Sequelize.literal("rand()") }).then(
    async (question) => {
      const { tableName } = question;
      const column = question.columnName;
      const table = await tableNavigator(tableName);

      return table
        .findAll({ order: Sequelize.literal("rand()"), limit: 2 })
        .then(async (countries) => {
          const firstCountry = countries[0];
          const secondCountry = countries[1];
          const newQuestion = question.strTemplate
            .replace("X", firstCountry.country)
            .replace("Y", secondCountry.country);

          const answer = countries.sort((a, b) => {
            return b[column] - a[column];
          })[0];

          let theAnswer;
          if (firstCountry.country === answer.country) {
            theAnswer = "Yes";
          } else {
            theAnswer = "No";
          }

          const obj = {
            question: newQuestion,
            answer: theAnswer,
            allAnswers: ["Yes", "No"],
            countries: [
              {
                country: firstCountry.country,
                answer: firstCountry[question.columnName],
              },
              {
                country: secondCountry.country,
                answer: secondCountry[question.columnName],
              },
            ],
          };
          return obj;
        });
    }
  );
};

// Loads a question based on their grading (the higher the grade the higher the percentage)
const savedQuestion = async () => {
  const allSaved = await SavedQuestion.findAll({});
  const idGradeArray = allSaved.map((question) => {
    return {
      id: question.id,
      grade: question.grade,
    };
  });
  let gradeSum = 0;
  idGradeArray.forEach((obj) => {
    gradeSum += obj.grade;
  });
  const percentages = idGradeArray.map((obj) => {
    return {
      id: obj.id,
      percent: Math.floor((obj.grade / gradeSum) * 100),
    };
  });
  const idArray = [];
  percentages.forEach((obj) => {
    for (let index = 0; index < obj.percent; index++) {
      idArray.push(obj.id);
    }
  });
  const randomId = idArray[Math.floor(Math.random() * idArray.length)];
  return SavedQuestion.findOne({ where: { id: randomId } }).then(
    async (question) => {
      return question.toJSON();
    }
  );
};

const allSavedQuestions = async () => {
  return await SavedQuestion.findAll({});
};

//Adds a new questions to the saved questions database
const addSavedQuestion = async (arr) => {
  arr.forEach(async (obj) => {
    if (
      obj.user.allAnswers.length === 4 &&
      obj.user.question.includes("Which")
    ) {
      await SavedQuestion.create({
        strQuestion: obj.user.question,
        option1: obj.user.allAnswers[0].option,
        option2: obj.user.allAnswers[1].option,
        option3: obj.user.allAnswers[2].option,
        option4: obj.user.allAnswers[3].option,
        answer1: obj.user.allAnswers[0].answer,
        answer2: obj.user.allAnswers[1].answer,
        answer3: obj.user.allAnswers[2].answer,
        answer4: obj.user.allAnswers[3].answer,
        answer: obj.answer,
        questionType: 1,
        grade: obj.grade,
        amount: 1,
      });
    } else if (
      obj.user.allAnswers.length === 4 &&
      !obj.user.question.includes("Which")
    ) {
      await SavedQuestion.create({
        strQuestion: obj.user.question,
        option1: obj.user.allAnswers[0].option,
        option2: obj.user.allAnswers[1].option,
        option3: obj.user.allAnswers[2].option,
        option4: obj.user.allAnswers[3].option,
        answer1: obj.user.allAnswers[0].answer,
        answer2: obj.user.allAnswers[1].answer,
        answer3: obj.user.allAnswers[2].answer,
        answer4: obj.user.allAnswers[3].answer,
        answer: obj.answer,
        questionType: 2,
        grade: obj.grade,
        amount: 1,
      });
    } else {
      await SavedQuestion.create({
        strQuestion: obj.user.question,
        option1: obj.user.allAnswers[0].country,
        option2: obj.user.allAnswers[1].country,
        option3: null,
        option4: null,
        answer1: obj.user.allAnswers[0].answer,
        answer2: obj.user.allAnswers[1].answer,
        answer3: null,
        answer4: null,
        answer: obj.answer,
        questionType: 3,
        grade: obj.grade,
        amount: 1,
      });
    }
  });
};

// const addManyQuestions = async () => {
//   await
// }

//Updates a saved question's grade and amount
const updateSavedQuestion = async (obj) => {
  const savedQuestion = await SavedQuestion.findOne({ where: { id: obj.id } });
  const { grade } = savedQuestion;
  const { amount } = savedQuestion;
  const newAmount = amount + 1;
  const newGrade = (grade * amount + obj.grade) / newAmount;

  await SavedQuestion.update(
    { grade: newGrade, amount: newAmount },
    { where: { id: obj.id } }
  );
};

//Creates a user with a user name and a score
const createUser = async (obj) => {
  const user = await User.create({ name: obj.name, score: obj.score });
  await Scoreboard.create({
    userId: user.id,
    name: user.name,
    score: user.score,
  });
};

//Returns the scoreboard sorted from highest score to lowest
const getOrderedScoreboard = async () => {
  const scoreboard = await Scoreboard.findAll({ order: [["score", "DESC"]] });
  return scoreboard;
};

module.exports = {
  typeOne,
  typeTwo,
  typeThree,
  savedQuestion,
  addSavedQuestion,
  updateSavedQuestion,
  createUser,
  getOrderedScoreboard,
  allSavedQuestions,
};
