// models/usuario.model.js
module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('Usuario', {
      USUARIO_ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      NOMBRE_USUARIO: {
        type: Sequelize.STRING
      },
      CORREO: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      CONTRASEÑA: {
        type: Sequelize.STRING
      },
      ROL: {
        type: Sequelize.STRING,
        defaultValue: 'usuario'
      },
      TELEFONO: {
        type: Sequelize.STRING,
        allowNull: true
      },
      AVATAR_URL: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  
    return Usuario;
  };

  