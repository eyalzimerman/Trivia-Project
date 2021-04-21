"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PopulationDensity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PopulationDensity.init(
    {
      rank: DataTypes.INTEGER,
      country: DataTypes.STRING,
      areaKm2: DataTypes.INTEGER,
      population: DataTypes.INTEGER,
      densityPerKm2: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PopulationDensity",
      tableName: "PopulationDensities",
      underscored: true,
    }
  );
  return PopulationDensity;
};
