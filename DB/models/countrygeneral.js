"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CountryGeneral extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CountryGeneral.init(
    {
      country: DataTypes.STRING,
      region: DataTypes.STRING,
      gdp: DataTypes.FLOAT,
      literacy: DataTypes.FLOAT,
      phones: DataTypes.FLOAT,
      climate: DataTypes.FLOAT,
      birthrate: DataTypes.FLOAT,
      deathrate: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "CountryGeneral",
      tableName: "country_generals",
      underscored: true,
    }
  );
  return CountryGeneral;
};
