const { Sequelize } = require('sequelize');

const env = {
  database: 'cc_appi', // Nombre de la base de datos en Render
  username: 'cc123',   // Nombre de usuario de la base de datos
  password: 'RDvNs4lQkEjjDFe2Zv2qzmtkFaDTyzHi', // Contraseña para la base de datos
  host: 'dpg-cqk9c4jqf0us73c52hvg-a.oregon-postgres.render.com', // Host de la base de datos
  dialect: 'postgres', // Dialecto de la base de datos
  pool: { 
    max: 5,             // Número máximo de conexiones
    min: 0,             // Número mínimo de conexiones
    acquire: 30000,     // Tiempo de espera máximo para adquirir una conexión
    idle: 10000         // Tiempo que una conexión puede estar inactiva antes de ser liberada
  },
  ssl: {
    require: true,           // Habilita la conexión SSL
    rejectUnauthorized: false // Desactiva la verificación de certificados
  }
};

// Inicialización de Sequelize
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions: {
    ssl: {
      require: env.ssl.require,
      rejectUnauthorized: env.ssl.rejectUnauthorized
    }
  },
  pool: env.pool
});

// Verificación de la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida exitosamente.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = sequelize;
