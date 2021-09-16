const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Purpose extends Model {
    static associate(models) {
      this.belongsToMany(models.Area, {
        through: "purpose-area",
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
    }
  );
  return Purpose;
};
