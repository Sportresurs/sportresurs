module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("requests", "user_id", {
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("requests", "user_id");
  },
};
