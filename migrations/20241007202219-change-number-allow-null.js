module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("areas", "number", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("areas", "number", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
