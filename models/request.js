const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {}
  Request.init(
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
      modelName: "Request",
      underscored: true,
    }
  );
  return Request;
};
