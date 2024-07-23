"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class contactList extends Model {
    static associate(models) {
      contactList.belongsTo(models.users, { foreignKey: "personal_id" });
      contactList.belongsTo(models.users, { foreignKey: "contact_id" });
    }
  }
  contactList.init(
    {
      personal_id: DataTypes.INTEGER,
      contact_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "contactList",
    }
  );
  return contactList;
};
