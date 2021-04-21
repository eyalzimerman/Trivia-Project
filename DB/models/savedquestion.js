"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SavedQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SavedQuestion.init(
    {
      strQuestion: DataTypes.STRING,
      option1: DataTypes.STRING,
      option2: DataTypes.STRING,
      option3: DataTypes.STRING,
      option4: DataTypes.STRING,
      answer: DataTypes.STRING,
      questionType: DataTypes.INTEGER,
      grade: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SavedQuestion",
      tableName: "SavedQuestions",
      underscored: true,
    }
  );
  return SavedQuestion;
};
