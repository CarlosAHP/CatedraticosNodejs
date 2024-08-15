module.exports = (sequelize, Sequelize) => {
  const Supervisor = sequelize.define('supervisor', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      firstname: {
          type: Sequelize.STRING
      },
      lastname: {
          type: Sequelize.STRING
      },
      department: {
          type: Sequelize.STRING
      }
  });

  return Supervisor;
};
