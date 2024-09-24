module.exports = (sequelize, Sequelize) => {
  const ControlIngreso = sequelize.define('control_ingreso', {
    IdIngreso: {
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
    FechaHoraIngreso: {
      type: Sequelize.DATE
    },
    FechaHoraSalida: {
      type: Sequelize.DATE
    },
    Estatus: {
      type: Sequelize.INTEGER, // 1: Asistió, 0: Inasistencia
      defaultValue: 0
    }
  });

  return ControlIngreso;
};
