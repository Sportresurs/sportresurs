const districtColors = [
  { name: "Шевченківський", color: "#009645" },
  { name: "Франківський", color: "#008ccc" },
  { name: "Личаківський", color: "#e87d0d" },
  { name: "Залізничний", color: "#9c1a87" },
  { name: "Сихівський", color: "#f2ba4c" },
  { name: "Галицький", color: "#d12421" },
  { name: "Інший", color: "#000000" },
];

module.exports = {
  up: async (queryInterface) => {
    await Promise.all(
      districtColors.map(async (district) => {
        await queryInterface.bulkUpdate(
          "districts",
          { color: district.color },
          { name: district.name }
        );
      })
    );
  },

  down: async (queryInterface) => {
    await Promise.all(
      districtColors.map(async (district) => {
        await queryInterface.bulkUpdate(
          "districts",
          { color: null },
          { name: district.name }
        );
      })
    );
  },
};
