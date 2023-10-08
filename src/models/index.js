const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: dbConfig.operatorsAliases,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true
      //  key: dbConfig.key,
      //  cert: dbConfig.cert,
    },
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// routes 사용
db.USER = require("./user.model.js")(sequelize, Sequelize);
db.MENU = require("./menu.model.js")(sequelize, Sequelize);
db.CATEGORY = require("./category.model.js")(sequelize, Sequelize);
db.PAYMENT = require("./payment.model.js")(sequelize, Sequelize);

module.exports = db;