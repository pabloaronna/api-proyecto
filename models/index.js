const dbConfig = require('../config/db.config');
//const dbConfig = require('../config/db_server.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        port: dbConfig.port
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
// MODELOS BASE
db.Usuario = require('./usuario')(sequelize,Sequelize);
db.Rol = require('./rol')(sequelize,Sequelize);

// RELACIONES
db.Rol.hasMany(db.Usuario);
db.Usuario.belongsTo(db.Rol);

// - - - - - - - 

module.exports = db;

