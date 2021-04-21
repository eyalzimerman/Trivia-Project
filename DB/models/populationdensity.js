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
      areaKm2: DataTypes.FLOAT,
      population: DataTypes.FLOAT,
      densityPerKm2: DataTypes.FLOAT,
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
