module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currentMax =
      (
        await queryInterface.sequelize.query("select max(id) from purposes")
      )[0][0].max || 1;
    await queryInterface.sequelize
      .query(`create sequence purposes_id_seq as integer start ${currentMax.toString()};
          alter table purposes alter column id set default nextval('public.purposes_id_seq'::regclass);
          alter sequence purposes_id_seq owned by purposes.id;`);
    await queryInterface.removeColumn("purposes", "created_at");
    await queryInterface.removeColumn("purposes", "updated_at");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("purposes", "created_at", {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("purposes", "updated_at", {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },
};
