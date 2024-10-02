const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    static associate(models) {
      this.belongsToMany(models.Purpose, {
        through: models.PurposeArea,
        foreignKey: "area_id",
        otherKey: "purpose_id",
      });

      this.belongsTo(models.District, { foreignKey: "district_id" });

      this.belongsToMany(models.Type, {
        through: models.AreaType,
        foreignKey: "area_id",
        otherKey: "type_id",
      });
    }
  }
  Area.init(
    {
      number: DataTypes.INTEGER,
      address: DataTypes.STRING,
      longitude: DataTypes.DECIMAL(10, 8),
      latitude: DataTypes.DECIMAL(10, 8),
      size: DataTypes.FLOAT,
      coating: DataTypes.STRING,
      access: DataTypes.ENUM("безкоштовний", "платний"),
      open_time: DataTypes.TIME,
      close_time: DataTypes.TIME,
      light: DataTypes.BOOLEAN,
      additional: DataTypes.TEXT,
      rating: DataTypes.FLOAT,
      featured: DataTypes.BOOLEAN,
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ownership_form: {
        type: DataTypes.ENUM("Шкільна", "Приватна", "Комунальна"),
        allowNull: true,
      },
      inclusiveness: {
        type: DataTypes.ENUM(
          "Інклюзивний",
          "З елементами інклюзії",
          "Не інклюзивний"
        ),
        allowNull: true,
      },
      has_poster: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      district_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "District",
          key: "id",
        },
      },
      updated_by: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      created_by: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Area",
      underscored: true,
    }
  );
  return Area;
};
