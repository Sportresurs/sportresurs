const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PurposeArea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  PurposeArea.init(
    {
      purpose_id: DataTypes.INTEGER,
      area_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PurposeArea",
      underscored: true,
    }
  );
  return PurposeArea;
};
