const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate(models) {
      this.hasOne(models.User);
    }
  }
  Request.init(
    {
      status: DataTypes.ENUM("новий", "в процесі", "оброблено"),
      admin: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      details: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Request",
      underscored: true,
    }
  );
  return Request;
};
