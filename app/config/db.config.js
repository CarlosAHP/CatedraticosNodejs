const env = require('./env.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  operatorsAliases: false,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importación de modelos
db.Customer = require('../models/customer.model.js')(sequelize, Sequelize);
db.Provider = require('../models/provider.model.js')(sequelize, Sequelize);
db.Employee = require('../models/employee.model.js')(sequelize, Sequelize);
db.Supervisor = require('../models/supervisor.model.js')(sequelize, Sequelize);
db.Song = require('../models/song.model.js')(sequelize, Sequelize);
db.Libro = require('../models/libro.model.js')(sequelize, Sequelize);
db.Prestamo = require('../models/prestamo.model.js')(sequelize, Sequelize);

// Función para inicializar la base de datos con datos predefinidos
db.initialize = async () => {
  await sequelize.sync({ force: true }); // Esta opción eliminará y recreará las tablas cada vez que se ejecute (solo para desarrollo)

  // Datos predefinidos para las tablas existentes (ejemplo)
  const customers = [
    { firstname: 'John', lastname: 'Doe', address: '123 Main St', age: 30 },
    { firstname: 'Jane', lastname: 'Doe', address: '456 Elm St', age: 25 }
  ];

  const providers = [
    { name: 'Provider 1', contactNumber: '123-456-7890', email: 'provider1@example.com', address: '789 Pine St' },
    { name: 'Provider 2', contactNumber: '987-654-3210', email: 'provider2@example.com', address: '321 Oak St' }
  ];

  const supervisors = [
    { firstname: 'Carlos', lastname: 'Santana', department: 'IT' },
    { firstname: 'Marie', lastname: 'Curie', department: 'Research' }
  ];

  await db.Customer.bulkCreate(customers);
  await db.Provider.bulkCreate(providers);
  const insertedSupervisors = await db.Supervisor.bulkCreate(supervisors, { returning: true });

  const employees = [
    { firstname: 'Alice', lastname: 'Johnson', position: 'Manager', salary: 60000, hireDate: new Date(), supervisorId: insertedSupervisors[0].id },
    { firstname: 'Bob', lastname: 'Smith', position: 'Developer', salary: 50000, hireDate: new Date(), supervisorId: insertedSupervisors[1].id }
  ];

  await db.Employee.bulkCreate(employees);

  // Datos predefinidos para la tabla Song
  const songs = [
    { name: 'Song 1', description: 'Description for Song 1', artist: 'Artist 1', duration: 240, extension: 'mp3', album: 'Album 1', year: 2023 },
    { name: 'Song 2', description: 'Description for Song 2', artist: 'Artist 2', duration: 180, extension: 'wav', album: 'Album 2', year: 2022 }
  ];

  await db.Song.bulkCreate(songs);

  // Datos predefinidos para la tabla Libro
  const libros = [
    { codigo: 1, nombre: 'Libro 1', editorial: 'Editorial 1', autor: 'Autor 1', genero: 'Género 1', paisAutor: 'País 1', numeroPaginas: 200, anoEdicion: new Date(2020, 0, 1), precio: 19.99 },
    { codigo: 2, nombre: 'Libro 2', editorial: 'Editorial 2', autor: 'Autor 2', genero: 'Género 2', paisAutor: 'País 2', numeroPaginas: 300, anoEdicion: new Date(2021, 0, 1), precio: 29.99 }
  ];

  await db.Libro.bulkCreate(libros);

  // Datos predefinidos para la tabla Prestamo
  const prestamos = [
    { numeroPedido: 1, codigoLibro: 1, codigoUsuario: 100, fechaSalida: new Date(2023, 7, 1), fechaMaximaDevolver: new Date(2023, 7, 15), fechaDevolucion: null },
    { numeroPedido: 2, codigoLibro: 2, codigoUsuario: 101, fechaSalida: new Date(2023, 7, 5), fechaMaximaDevolver: new Date(2023, 7, 20), fechaDevolucion: null }
  ];

  await db.Prestamo.bulkCreate(prestamos);

  console.log('Datos predefinidos insertados correctamente');
};

module.exports = db;
