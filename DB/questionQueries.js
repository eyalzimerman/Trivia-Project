const {
  Type1,
  Type2,
  Type3,
  CostOfLiving,
  CountryCapital,
  CountryGeneral,
  CrimesByCountry,
  PopulationDensity,
  PriceToIncome,
  QualityOfLife,
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
          const countries = allOptions.map((answer) => answer.country);
          const answer = findMaxOrMin(allOptions, minOrMax, question.columnName)
            .country;
          const obj = {
            question: question.strTemplate,
            answer: answer,
            allAnswers: countries,
          };
          return obj;
        });
    }
  );
};
// typeOne().then((data) => console.log(data));

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

          let allAnswers = other.map((answer) => answer[question.columnName]);
          allAnswers.push(answer);
          allAnswers = allAnswers.sort(() => Math.random() - 0.5);
          const obj = {
            question: newQuestion,
            answer: answer,
            allAnswers: allAnswers,
          };
          return obj;
        });
    }
  );
};
// typeTwo().then((data) => console.log(data));

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
            theAnswer = true;
          } else {
            theAnswer = false;
          }

          const obj = {
            question: newQuestion,
            answer: theAnswer,
            allAnswers: [true, false],
          };
          return obj;
        });
    }
  );
};
// typeThree().then((data) => console.log(data));

module.exports = { typeOne, typeTwo, typeThree };
