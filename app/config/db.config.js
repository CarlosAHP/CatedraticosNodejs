const env = require('./env.js');
const bcrypt = require('bcrypt');  // Asegúrate de importar bcrypt al inicio
const { Sequelize } = require('sequelize');

// Confirmamos el valor de dialecto para asegurar que es una cadena de texto
console.log('Dialect:', env.dialect); // Esto debería mostrar "postgres"

// Inicialización de Sequelize
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions: {
    ssl: env.ssl, // Usa directamente el objeto ssl desde env.js
  },
  pool: env.pool,
});

const db = {};

// Asignamos Sequelize y la instancia a db
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importación de modelos
db.Provider = require('../models/provider.model.js')(sequelize, Sequelize);
db.Supervisor = require('../models/supervisor.model.js')(sequelize, Sequelize);
db.Song = require('../models/song.model.js')(sequelize, Sequelize);
db.Project = require('../models/project.model.js')(sequelize, Sequelize);
db.Usuario = require('../models/usuario.model.js')(sequelize, Sequelize); // Asegúrate de importar el modelo de Usuario

// Función para inicializar la base de datos con datos predefinidos
db.initialize = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Base de datos sincronizada correctamente.');

    // Datos de prueba para la tabla Provider
    await db.Provider.bulkCreate([
      { name: 'Provider 1', contactNumber: '123-456-7890', email: 'provider1@example.com', address: '789 Pine St' },
      { name: 'Provider 2', contactNumber: '987-654-3210', email: 'provider2@example.com', address: '123 Oak Ave' }
    ]);

    // Datos de prueba para la tabla Supervisor
    await db.Supervisor.bulkCreate([
      { firstname: 'Carlos', lastname: 'Santana', department: 'IT' },
      { firstname: 'Marie', lastname: 'Curie', department: 'Research' }
    ]);

    // Datos de prueba para la tabla Project (ToDo)
    await db.Project.bulkCreate([
      {
        title: 'Finalizar el backend de API',
        description: 'Crear, leer, actualizar y borrar operaciones para proyectos.',
        status: 'in progress',
        dueDate: new Date(2024, 11, 20)
      },
      {
        title: 'Diseñar el frontend con React',
        description: 'Crear componentes en React para interactuar con la API.',
        status: 'pending',
        dueDate: new Date(2024, 11, 25)
      },
      {
        title: 'Desplegar en Render',
        description: 'Configurar y desplegar la API y el frontend en Render.',
        status: 'pending',
        dueDate: new Date(2024, 11, 30)
      }
    ]);

    // Datos de prueba para la tabla Usuario
    await db.Usuario.bulkCreate([
      {
        NOMBRE_USUARIO: 'usuario1',
        CORREO: 'usuario1@example.com',
        CONTRASEÑA: await bcrypt.hash('password123', 10),  // Contraseña hasheada
        ROL: 'usuario',
        TELEFONO: '123-456-7890',
        AVATAR_URL: null  // Deja el avatar como null o añade una URL si prefieres
      },
      {
        NOMBRE_USUARIO: 'admin1',
        CORREO: 'admin1@example.com',
        CONTRASEÑA: await bcrypt.hash('adminpass123', 10),  // Contraseña hasheada
        ROL: 'admin',
        TELEFONO: '987-654-3210',
        AVATAR_URL: null  // Deja el avatar como null o añade una URL si prefieres
      }
    ]);

    console.log('Datos de prueba insertados correctamente.');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
};


module.exports = db;
