const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Area extends Model {}
  Area.init(
    {
      number: DataTypes.INTEGER,
      district: DataTypes.ENUM(
        "Галицький",
        "Шевченківський",
        "Франківський",
        "Залізничний",
        "Сихівський",
        "Личаківський",
        "Інший"
      ),
      address: DataTypes.STRING,
      type: DataTypes.ENUM("спортивний", "дитячо-спортивний", "інший"),
      purpose: DataTypes.ENUM(
        "баскетбольний",
        "футбольний",
        "волейбольний",
        "воркаут",
        "мультифункційний"
      ),
      size: DataTypes.FLOAT,
      coating: DataTypes.STRING,
      access: DataTypes.ENUM("безкоштовний", "платний"),
      open_time: DataTypes.TIME,
      close_time: DataTypes.TIME,
      light: DataTypes.BOOLEAN,
      additional: DataTypes.TEXT,
      rating: DataTypes.FLOAT,
      featured: DataTypes.BOOLEAN,
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
