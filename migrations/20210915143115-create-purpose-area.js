module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("purpose-area", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      purpose_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "purposes",
          },
          key: "id",
        },
      },
      area_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "areas",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("purpose-area");
  },
};
