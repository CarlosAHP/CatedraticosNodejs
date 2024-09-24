module.exports = (sequelize, Sequelize) => {
  const LogInasistencia = sequelize.define('log_inasistencia', {
    IdLog: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    IdCatedratico: {
      type: Sequelize.INTEGER,
      references: {
        model: 'catedraticos',
        key: 'IdCatedratico'
      }
    },
    Fecha: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    Descripcion: {
      type: Sequelize.STRING
    }
  });

  return LogInasistencia;
};
