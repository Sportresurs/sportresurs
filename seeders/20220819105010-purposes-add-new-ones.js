const newPurposes = [
  "спортзал",
  "стадіон",
  "басейн",
];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "purposes",
      newPurposes.map((value) => ({ title: value })),
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(
      "purposes",
      { title: newPurposes },
      {},
    );
  },
};
