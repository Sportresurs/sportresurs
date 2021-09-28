const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ContactRequest extends Model {}
  ContactRequest.init(
    {
      date: DataTypes.DATE,
      status: DataTypes.ENUM("новий", "в процесі", "оброблено"),
      admin: DataTypes.STRING,
      name: DataTypes.STRING,
      tel: DataTypes.STRING,
      info: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "ContactRequest",
      underscored: true,
    }
  );
  return ContactRequest;
};
