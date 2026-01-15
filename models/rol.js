const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {

    const Rol = sequelize.define('Rol', {
    
        nombre: {  // ADMINISTRADOR GENERAL
            type: DataTypes.STRING(50), 
            allowNull: false,
            unique: true  
        },
        codigo: {   // ADM-GEN
            type: DataTypes.STRING(10), 
            allowNull: false,
            unique: true  
        },
        eliminado: {
            type: DataTypes.BOOLEAN(),
            allowNull: true,
            defaultValue: false
        }
       
    }, {});

    return Rol;
}

