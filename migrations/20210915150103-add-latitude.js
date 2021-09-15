module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("areas", "latitude", {
      type: Sequelize.DECIMAL(10, 10),
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("areas", "latitude");
  },
};
