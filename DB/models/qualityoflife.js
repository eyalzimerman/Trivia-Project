"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QualityOfLife extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QualityOfLife.init(
    {
      country: DataTypes.STRING,
      qualityOfLifeIndex: DataTypes.FLOAT,
      purchasingPowerIndex: DataTypes.FLOAT,
      healthCareIndex: DataTypes.FLOAT,
      costOfLivingIndex: DataTypes.FLOAT,
      propertyPriceToIncomeRatio: DataTypes.FLOAT,
      pollutionIndex: DataTypes.FLOAT,
      climateIndex: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "QualityOfLife",
      tableName: "QualityOfLives",
      underscored: true,
    }
  );
  return QualityOfLife;
};
