module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("areas", "ownership_form", {
      type: Sequelize.ENUM("Шкільна", "Приватна", "Комунальна"),
      allowNull: true,
    });
    await queryInterface.addColumn("areas", "inclusiveness", {
      type: Sequelize.ENUM(
        "Інклюзивний",
        "З елементами інклюзії",
        "Не інклюзивний"
      ),
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("areas", "ownership_form");
    await queryInterface.removeColumn("areas", "inclusiveness");
  },
};
