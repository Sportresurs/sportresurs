module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("requests", "admin_email", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("requests", "admin_email");
  },
};
