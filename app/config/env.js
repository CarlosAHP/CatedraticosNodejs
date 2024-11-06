const env = {
  database: 'to_do_cqk4',
  username: 'usertodo',
  password: 'lJqgYjPj26UC12gFhFZ3ML88ynFVPIhH',
  host: 'dpg-cslt7gd6l47c73aalb90-a.oregon-postgres.render.com',
  dialect: 'postgres', // Mantén esto como texto
  pool: { 
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
};

module.exports = env;
