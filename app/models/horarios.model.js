module.exports = (sequelize, Sequelize) => {
    const Horario = sequelize.define('horario', {
      IdHorario: {
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
      Curso: {
        type: Sequelize.STRING
      },
      HoraInicio: {
        type: Sequelize.TIME
      },
      HoraFin: {
        type: Sequelize.TIME
      }
    });
    
    return Horario;
  };
  