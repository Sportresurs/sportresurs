const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      this.belongsToMany(models.Area, {
        through: models.AreaType,
        foreignKey: "type_id",
      });
    }
  }

  Type.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Type",
      underscored: true,
    }
  );

  return Type;
};
