"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chanels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      chanels.belongsTo(models.users, { foreignKey: "user1_id" }),
        chanels.belongsTo(models.users, { foreignKey: "user2_id" });
      chanels.hasMany(models.messages, { foreignKey: "chanel_id" });
    }
  }
  chanels.init(
    {
      user1_id: DataTypes.INTEGER,
      user2_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "chanels",
      paranoid: true,
    }
  );
  return chanels;
};
