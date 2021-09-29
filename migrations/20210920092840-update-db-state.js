module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("purposes", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.removeColumn("areas", "purpose");
    await queryInterface.sequelize.query("drop type enum_areas_purpose;");
    await queryInterface.addColumn("areas", "latitude", {
      type: Sequelize.DECIMAL(10, 10),
      allowNull: false,
    });
    await queryInterface.addColumn("areas", "longitude", {
      type: Sequelize.DECIMAL(10, 10),
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("purpose-area");
    await queryInterface.dropTable("purposes");
    await queryInterface.addColumn("areas", "purpose", {
      type: Sequelize.ENUM(
        "баскетбольний",
        "футбольний",
        "волейбольний",
        "воркаут",
        "мультифункційний"
      ),
      allowNull: false,
    });
    await queryInterface.removeColumn("areas", "latitude");
    await queryInterface.removeColumn("areas", "longitude");
  },
};
