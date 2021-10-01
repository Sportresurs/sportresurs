const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Purpose extends Model {
    static associate(models) {
      this.belongsToMany(models.Area, {
        through: "purpose-areas",
        foreignKey: "purpose_id",
        otherKey: "area_id",
      });
    }
  }
  Purpose.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Purpose",
      underscored: true,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Purpose;
};
