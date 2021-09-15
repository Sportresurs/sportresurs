module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn("areas", "purpose");
  },

  down: async (queryInterface, Sequelize) => {
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
  },
};
