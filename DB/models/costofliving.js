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
      costOfLivingIndex: DataTypes.FLOAT,
      rentIndex: DataTypes.FLOAT,
      groceriesIndex: DataTypes.FLOAT,
      restaurantPriceIndex: DataTypes.FLOAT,
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
