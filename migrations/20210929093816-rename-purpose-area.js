'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("purpose-area", "purpose-areas");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("purpose-areas", "purpose-area");
  },
};
