// models/project.model.js
module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define('project', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('pending', 'in progress', 'completed'),
        defaultValue: 'pending'
      },
      dueDate: {
        type: Sequelize.DATE
      }
    });
  
    return Project;
  };
  