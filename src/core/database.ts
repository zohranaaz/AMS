// //const dbConfig = require("../config/db.config.js");

// let Sequelize = require("sequelize");
// // const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
// //   host: dbConfig.HOST,
// //   dialect: dbConfig.dialect,
// //   operatorsAliases: false,

// //   pool: {
// //     max: dbConfig.pool.max,
// //     min: dbConfig.pool.min,
// //     acquire: dbConfig.pool.acquire,
// //     idle: dbConfig.pool.idle
// //   }
// // });

// let sequelize = new Sequelize('postgres', 'postgres', 'myPassword', { 
//     host: 'localhost',
//     dialect: 'postgres'
// });

// const db: any = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.users = require("./user.model.js")(sequelize, Sequelize);
// db.employees = require("./employee.model.js")(sequelize, Sequelize);
// db.addresses = require("./address.model")(sequelize, Sequelize);
// db.roles = require("./role.model")(sequelize, Sequelize);
// db.permissions = require("./permission.model")(sequelize, Sequelize);

// module.exports = db;