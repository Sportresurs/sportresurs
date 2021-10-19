require("dotenv-safe").config({
  allowEmptyValues: true,
});

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL",
    migrationStorageTableName: "sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_data",
    dialect: "postgres",
  },
  test: {
    use_env_variable: "DATABASE_URL",
    migrationStorageTableName: "sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_data",
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    migrationStorageTableName: "sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_data",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
