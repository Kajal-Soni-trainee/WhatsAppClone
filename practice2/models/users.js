"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.hasMany(models.contactList, { foreignKey: "personal_id" });
      users.hasMany(models.contactList, { foreignKey: "contact_id" });
      users.hasMany(models.messages, { foreignKey: "sender_id" });
      users.hasMany(models.messages, { foreignKey: "receiver_id" });
      users.hasMany(models.sessions, { foreignKey: "user_id" });
      users.hasMany(models.chanels, { foreignKey: "user1_id" });
      users.hasMany(models.chanels, { foreignKey: "user2_id" });
      users.hasMany(models.status, { foreignKey: "user_id" });
      users.hasMany(models.views, { foreignKey: "viewer_id" });
      users.hasMany(models.deletedMsgs, { foreignKey: "deletedBy" });
    }
  }
  users.init(
    {
      u_name: DataTypes.STRING,
      u_email: DataTypes.STRING,
      contact: DataTypes.BIGINT,
      password: DataTypes.STRING,
      u_img: DataTypes.STRING,
      caption: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "users",
    }
  );
  return users;
};
