module.exports = (sequelize, Sequelize) => {
	const Catedratico = sequelize.define('catedratico', {	
	  IdCatedratico: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	  },
	  NombreCompleto: {
		type: Sequelize.STRING
	  },
	  FechaContratacion: {
		type: Sequelize.DATE
	  },
	  FechaNacimiento: {
		type: Sequelize.DATE
	  },
	  Genero: {
		type: Sequelize.STRING
	  },
	  Titulo: {
		type: Sequelize.STRING
	  },
	  Salario: {
		type: Sequelize.DECIMAL(10, 2)
	  }
	});
	
	return Catedratico;
  };
  