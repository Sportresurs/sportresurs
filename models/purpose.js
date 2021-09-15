const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Purpose extends Model {
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
  Purpose.init(
    {
      purpose: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "Purpose",
    }
  );
  return Purpose;
};
