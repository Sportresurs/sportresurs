module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("types", [
      { name: "спортивний", created_at: new Date(), updated_at: new Date() },
      {
        name: "дитячо-спортивний",
        created_at: new Date(),
        updated_at: new Date(),
      },
      { name: "інший", created_at: new Date(), updated_at: new Date() },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("types", null, {});
  },
};
