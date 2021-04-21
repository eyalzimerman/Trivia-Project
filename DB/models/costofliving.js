"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CostOfLiving extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CostOfLiving.init(
    {
      country: DataTypes.STRING,
      costOfLivingIndex: DataTypes.INTEGER,
      rentIndex: DataTypes.INTEGER,
      groceriesIndex: DataTypes.INTEGER,
      restaurantPriceIndex: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CostOfLiving",
      tableName: "CostOfLivings",
      underscored: true,
    }
  );
  return CostOfLiving;
};
