const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const tipo_usuario = sequelize.define(
    'tipo_usuario',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'tipo_usuario',
    }
)

module.exports = tipo_usuario;