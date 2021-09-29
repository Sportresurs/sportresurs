module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("areas", "longitude", {
      type: Sequelize.DECIMAL(10, 8),
      allowNull: false,
    });
    queryInterface.changeColumn("areas", "latitude", {
      type: Sequelize.DECIMAL(10, 8),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("areas", "longitude", {
      type: Sequelize.DECIMAL(10, 10),
      allowNull: false,
    });
    queryInterface.changeColumn("areas", "latitude", {
      type: Sequelize.DECIMAL(10, 10),
      allowNull: false,
    });
  },
};
