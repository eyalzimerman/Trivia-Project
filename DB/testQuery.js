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
const sequelize = require("sequelize");

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

// Type1.findOne({}).then(async (question) => {
//   const { tableName } = question;
//   tableNavigator(tableName)
//     .findOne({})
//     .then((data) => console.log(data.toJSON()));
// });
Type2.findOne({}).then(async (question) => {
  const { tableName } = question;
  tableNavigator(tableName)
    .findOne({})
    .then((data) => console.log(data.toJSON()));
});
// PopulationDensity.findOne({}).then((data) => console.log(data.toJSON()));
