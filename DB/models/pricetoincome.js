"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PriceToIncome extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PriceToIncome.init(
    {
      country: DataTypes.STRING,
      priceToIncome: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PriceToIncome",
      tableName: "PriceToIncomes",
      underscored: true,
    }
  );
  return PriceToIncome;
};
