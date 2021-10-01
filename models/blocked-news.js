const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BlockedNews extends Model {}
  BlockedNews.init(
    {
      instagram_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      url: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "blocked-news",
      updatedAt: false,
      underscored: true,
    }
  );
  return BlockedNews;
};
