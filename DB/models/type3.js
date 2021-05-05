"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type3 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Type3.init(
    {
      strTemplate: DataTypes.STRING,
      tableName: DataTypes.STRING,
      columnName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Type3",
      tableName: "type3",
      underscored: true,
    }
  );
  return Type3;
};
