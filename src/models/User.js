const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const tipo_usuario = require('./tipousuario');

const User = sequelize.define('User', {
  nome: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING(11),
    unique: true,
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  senha: {
  type: DataTypes.STRING,
  allowNull: false,
},
  genero: {
    type: DataTypes.ENUM('masculino', 'feminino', 'outro'),
    allowNull: false,
  },
  id_tipo_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tipo_usuario',
      key: 'id'
    }
  }
}, {
  timestamps: true, 
  tableName: 'users'
});

module.exports = User;