module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("districts", "color", {
      type: Sequelize.STRING(7),
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("districts", "color");
  },
};
