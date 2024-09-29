const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AreaType extends Model {}

  AreaType.init(
    {
      area_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "areas",
          key: "id",
        },
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "types",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "AreaType",
      underscored: true,
    }
  );

  return AreaType;
};
