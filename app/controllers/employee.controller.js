const db = require('../config/db.config.js');
const Employee = db.Employee;

exports.create = (req, res) => {
    const employee = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        position: req.body.position,
        salary: req.body.salary,
        hireDate: req.body.hireDate,
        supervisorId: req.body.supervisorId
    };

    Employee.create(employee)
        .then(result => {
            res.status(200).json({
                message: "Employee created successfully with id = " + result.id,
                employee: result
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error while creating employee!",
                error: error.message
            });
        });
};

exports.findAll = (req, res) => {
    Employee.findAll()
        .then(employees => {
            res.status(200).json({
                message: "Retrieved all employees successfully",
                employees: employees
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error while retrieving employees",
                error: error.message
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;
    Employee.findByPk(id)
        .then(employee => {
            if (employee) {
                res.status(200).json({
                    message: "Retrieved employee successfully",
                    employee: employee
                });
            } else {
                res.status(404).json({
                    message: "Employee not found with id = " + id
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error while retrieving employee",
                error: error.message
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const updatedData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        position: req.body.position,
        salary: req.body.salary,
        hireDate: req.body.hireDate,
        supervisorId: req.body.supervisorId
    };

    Employee.update(updatedData, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: "Employee updated successfully"
                });
            } else {
                res.status(404).json({
                    message: "Employee not found with id = " + id
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error while updating employee",
                error: error.message
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Employee.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: "Employee deleted successfully"
                });
            } else {
                res.status(404).json({
                    message: "Employee not found with id = " + id
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error while deleting employee",
                error: error.message
            });
        });
};
