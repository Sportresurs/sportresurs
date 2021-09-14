module.exports = {
  up: async (queryInterface) =>
    queryInterface.removeColumn("areas", "opening_year"),
  down: async (queryInterface, Sequelize) =>
    queryInterface.addColumn("areas", "opening_year", Sequelize.DATEONLY),
};
