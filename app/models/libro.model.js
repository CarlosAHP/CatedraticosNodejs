module.exports = (sequelize, Sequelize) => {
    const Libro = sequelize.define('libro', {
      codigo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      editorial: {
        type: Sequelize.STRING(25)
      },
      autor: {
        type: Sequelize.STRING(25)
      },
      genero: {
        type: Sequelize.STRING(20)
      },
      paisAutor: {
        type: Sequelize.STRING(20)
      },
      numeroPaginas: {
        type: Sequelize.INTEGER
      },
      añoEdicion: {
        type: Sequelize.DATEONLY
      },
      precio: {
        type: Sequelize.DECIMAL(10, 2)
      }
    });
  
    return Libro;
  };
  