"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      status.belongsTo(models.users, { foreignKey: "user_id" });
      status.hasMany(models.views, { foreignKey: "status_id" });
    }
  }
  status.init(
    {
      user_id: DataTypes.INTEGER,
      image_path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "status",
    }
  );
  return status;
};
