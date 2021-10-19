module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("blocked-news", {
      instagram_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("blocked-news");
  },
};
