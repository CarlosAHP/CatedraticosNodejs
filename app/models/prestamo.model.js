module.exports = (sequelize, Sequelize) => {
    const Prestamo = sequelize.define('prestamo', {
      numeroPedido: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      codigoLibro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'libros', // Nombre de la tabla que estamos referenciando
          key: 'codigo'
        }
      },
      codigoUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fechaSalida: {
        type: Sequelize.DATE
      },
      fechaMaxDevolucion: {
        type: Sequelize.DATE
      },
      fechaDevolucion: {
        type: Sequelize.DATE
      }
    });
  
    return Prestamo;
  };
  