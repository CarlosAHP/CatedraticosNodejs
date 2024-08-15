module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define('employee', {
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
      position: {
          type: Sequelize.STRING
      },
      salary: {
          type: Sequelize.FLOAT
      },
      hireDate: {
          type: Sequelize.DATE
      },
      supervisorId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'supervisors',
              key: 'id'
          }
      }
  });

  return Employee;
};
