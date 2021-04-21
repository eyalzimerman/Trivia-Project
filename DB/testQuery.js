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

//unfinished---------------------------------------------------------------
// Type1.findAll({ order: Sequelize.literal("rand()"), limit: 1 }).then(
//   async (question) => {
//     const { tableName } = question[0];
//     console.log(question[0].strTemplate);
//     console.log(question[0].columnName);
//     const table = await tableNavigator(tableName);
//     table
//       .findAll({ order: Sequelize.literal("rand()"), limit: 4 })
//       .then((encounters) => {
//         console.log(encounters.map((el) => el.toJSON()));
//       });
//   }
// );

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
          const allAnswers = other.map((el) => el[question.columnName]);
          allAnswers.push(answer);
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
typeTwo().then((data) => console.log(data));
