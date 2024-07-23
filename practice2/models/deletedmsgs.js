"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class deletedMsgs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      deletedMsgs.belongsTo(models.messages, { foreignKey: "message_id" });
      deletedMsgs.belongsTo(models.users, { foreignKey: "deletedBy" });
    }
  }
  deletedMsgs.init(
    {
      message_id: DataTypes.INTEGER,
      deletedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "deletedMsgs",
      paranoid: true,
    }
  );
  return deletedMsgs;
};
