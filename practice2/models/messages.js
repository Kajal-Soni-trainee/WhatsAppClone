"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      messages.hasMany(models.deletedMsgs, { foreignKey: "message_id" });
    }
  }
  messages.init(
    {
      sender_id: DataTypes.INTEGER,
      receiver_id: DataTypes.INTEGER,
      chanel_id: DataTypes.INTEGER,
      messages: DataTypes.STRING,
      isSeen: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "messages",
      paranoid: true,
    }
  );
  return messages;
};
