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

  // Inserción de datos en las tablas existentes
  await db.Customer.bulkCreate(customers);
  await db.Provider.bulkCreate(providers);
  const insertedSupervisors = await db.Supervisor.bulkCreate(supervisors, { returning: true });

  // Usar los IDs de los supervisores insertados
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

  console.log('Datos predefinidos insertados correctamente');
};

module.exports = db;
