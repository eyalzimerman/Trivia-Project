"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CrimesByCountry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CrimesByCountry.init(
    {
      country: DataTypes.STRING,
      crimeIndex: DataTypes.INTEGER,
      safetyIndex: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CrimesByCountry",
      tableName: "CrimesByCountries",
      underscored: true,
    }
  );
  return CrimesByCountry;
};
