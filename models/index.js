'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const User = require("./user.js");
const Area = require("./area.js");
const Image = require("./image.js");
const PurposeArea = require("./purpose-area.js");
const Purpose = require("./purpose.js");
const Request = require("./request.js");

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = User(sequelize, Sequelize.DataTypes);
db.Image = Image(sequelize, Sequelize.DataTypes);
db.PurposeArea = PurposeArea(sequelize, Sequelize.DataTypes);
db.Purpose = Purpose(sequelize, Sequelize.DataTypes);
db.Area = Area(sequelize, Sequelize.DataTypes);
db.Request = Request(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
