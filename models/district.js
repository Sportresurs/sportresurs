const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    static associate(models) {
      this.hasMany(models.Area, { foreignKey: "district_id" });
    }
  }

  District.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(7),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "District",
      underscored: true,
    }
  );

  return District;
};
