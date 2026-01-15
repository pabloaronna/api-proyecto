const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {

    const Usuario = sequelize.define('Usuario', {
    
        email: {
            type: DataTypes.STRING(100), 
            allowNull: false,
            unique: true  
        },
        password: {
            type: DataTypes.STRING(),
            allowNull: false  
        }

    }, {});

    return Usuario;
}

