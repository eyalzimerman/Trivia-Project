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
      gdp: DataTypes.INTEGER,
      literacy: DataTypes.INTEGER,
      phones: DataTypes.INTEGER,
      climate: DataTypes.INTEGER,
      birthrate: DataTypes.INTEGER,
      deathrate: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CountryGeneral",
      tableName: "CountryGenerals",
      underscored: true,
    }
  );
  return CountryGeneral;
};
