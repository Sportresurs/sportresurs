const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Area, { foreignKey: "area_id" });
    }
  }
  Image.init(
    {
      file: DataTypes.BLOB,
      name: DataTypes.STRING,
      filetype: DataTypes.STRING,
      order: DataTypes.INTEGER,
      area_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Area",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Image",
      underscored: true,
    }
  );
  return Image;
};
