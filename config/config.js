require('dotenv-safe').config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    migrationStorageTableName: 'sequelize_meta',
    dialect: 'postgres',
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    migrationStorageTableName: 'sequelize_meta',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    migrationStorageTableName: 'sequelize_meta',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
