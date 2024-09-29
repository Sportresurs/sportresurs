const { exec } = require("child_process");
const path = require("path");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fields = await queryInterface.describeTable("areas");

    if (fields.district_id && !fields.district && !fields.type) {
      return;
    }

    await queryInterface.addColumn("areas", "district_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "districts",
        key: "id",
      },
      allowNull: true,
    });

    const [districts] = await queryInterface.sequelize.query(
      `SELECT COUNT(*) as count FROM districts`
    );
    const [types] = await queryInterface.sequelize.query(
      `SELECT COUNT(*) as count FROM types`
    );
    const [areas] = await queryInterface.sequelize.query(
      `SELECT COUNT(*) as count FROM areas`
    );

    if (districts[0].count === "0") {
      const districtSeedPath = path.resolve(
        __dirname,
        "../seeders/20240926210447-seed-districts.js"
      );
      await new Promise((resolve, reject) => {
        exec(
          `npx sequelize-cli db:seed --seed ${districtSeedPath}`,
          (err, stdout, stderr) => {
            if (err) return reject(err);
            resolve();
          }
        );
      });
    }

    if (types[0].count === "0") {
      const typeSeedPath = path.resolve(
        __dirname,
        "../seeders/20240926210523-seed-types.js"
      );
      await new Promise((resolve, reject) => {
        exec(
          `npx sequelize-cli db:seed --seed ${typeSeedPath}`,
          (err, stdout, stderr) => {
            if (err) return reject(err);
            resolve();
          }
        );
      });
    }

    if (areas[0].count === "0") {
      const areaSeedPath = path.resolve(
        __dirname,
        "../seeders/20210922101125-setup.js"
      );
      await new Promise((resolve, reject) => {
        exec(
          `npx sequelize-cli db:seed --seed ${areaSeedPath}`,
          (err, stdout, stderr) => {
            if (err) return reject(err);
            resolve();
          }
        );
      });
    }

    await queryInterface.sequelize.query(`
      UPDATE areas 
      SET district_id = (
        SELECT id FROM districts WHERE districts.name = CAST(areas.district AS VARCHAR)
      )
    `);

    await queryInterface.sequelize.query(`
      INSERT INTO area_types (area_id, type_id, created_at, updated_at)
      SELECT a.id, t.id, NOW(), NOW()
      FROM areas a
      JOIN types t ON t.name = CAST(a.type AS VARCHAR)
    `);

    await queryInterface.removeColumn("areas", "district");
    await queryInterface.removeColumn("areas", "type");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("areas", "district", {
      type: Sequelize.ENUM(
        "Галицький",
        "Шевченківський",
        "Франківський",
        "Залізничний",
        "Сихівський",
        "Личаківський",
        "Інший"
      ),
    });

    await queryInterface.addColumn("areas", "type", {
      type: Sequelize.ENUM("спортивний", "дитячо-спортивний", "інший"),
    });

    await queryInterface.sequelize.query(`
      DELETE FROM area_types
      WHERE area_id IN (SELECT id FROM areas);
    `);

    await queryInterface.removeColumn("areas", "district_id");
  },
};
