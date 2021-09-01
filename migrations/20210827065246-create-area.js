'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('areas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      district: {
        allowNull: false,
        type: Sequelize.ENUM('Галицький', 'Шевченківський', 'Франківський', 'Залізничний', 'Сихівський', 'Личаківський', 'Інший')
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('спортивний', 'дитячо-спортивний', 'інший')
      },
      purpose: {
        allowNull: false,
        type: Sequelize.ENUM('баскетбольний', 'футбольний', 'волейбольний', 'воркаут', 'мультифункційний')
      },
      opening_year: {
        type: Sequelize.DATEONLY
      },
      size: {
        type: Sequelize.FLOAT
      },
      coating: {
        type: Sequelize.STRING
      },
      access: {
        type: Sequelize.ENUM('безкоштовний', 'платний')
      },
      open_time: {
        type: Sequelize.TIME
      },
      close_time: {
        type: Sequelize.TIME
      },
      light: {
        type: Sequelize.BOOLEAN
      },
      additional: {
        type: Sequelize.TEXT
      },
      rating: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      featured: {
        type: Sequelize.BOOLEAN
      },
      updated_by: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        }
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('areas');
  }
};