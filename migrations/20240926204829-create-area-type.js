module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("area_types", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      area_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "areas",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "types",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("area_types");
  },
};
