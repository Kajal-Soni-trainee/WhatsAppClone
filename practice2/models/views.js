"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class views extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      views.belongsTo(models.users, { foreignKey: "viewer_id" });
      views.belongsTo(models.status, { foreignKey: "status_id" });
    }
  }
  views.init(
    {
      viewer_id: DataTypes.INTEGER,
      status_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "views",
      paranoid: true,
    }
  );
  return views;
};
