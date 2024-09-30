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
    await queryInterface.bulkInsert(
      "districts",
      districtColors.map((district) => ({
        name: district.name,
        color: district.color,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("districts", {
      name: districtColors.map((district) => district.name),
    });
  },
};
