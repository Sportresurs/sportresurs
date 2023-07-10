module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("areas", "has_poster", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("areas", "has_poster");
  },
};
