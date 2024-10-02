module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("areas", "title", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("areas", "title");
  },
};
