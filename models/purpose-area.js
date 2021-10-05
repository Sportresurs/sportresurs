const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PurposeArea extends Model {}
  PurposeArea.init(
    {
      purpose_id: DataTypes.INTEGER,
      area_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "purpose-areas",
      underscored: true,
    }
  );
  return PurposeArea;
};
