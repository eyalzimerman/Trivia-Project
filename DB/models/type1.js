"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type1 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Type1.init(
    {
      strTemplate: DataTypes.STRING,
      tableName: DataTypes.STRING,
      columnName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Type1",
      tableName: "Type1",
      underscored: true,
    }
  );
  return Type1;
};
