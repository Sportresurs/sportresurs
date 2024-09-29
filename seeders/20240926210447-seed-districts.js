module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("districts", [
      { name: "Галицький", created_at: new Date(), updated_at: new Date() },
      {
        name: "Шевченківський",
        created_at: new Date(),
        updated_at: new Date(),
      },
      { name: "Франківський", created_at: new Date(), updated_at: new Date() },
      { name: "Залізничний", created_at: new Date(), updated_at: new Date() },
      { name: "Сихівський", created_at: new Date(), updated_at: new Date() },
      { name: "Личаківський", created_at: new Date(), updated_at: new Date() },
      { name: "Інший", created_at: new Date(), updated_at: new Date() },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("districts", null, {});
  },
};
