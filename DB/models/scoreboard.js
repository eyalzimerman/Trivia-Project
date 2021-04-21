"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Scoreboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, { foreignKey: "id" });
    }
  }
  Scoreboard.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      score: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Scoreboard",
      tableName: "scoreboard",
      underscored: true,
    }
  );
  return Scoreboard;
};
