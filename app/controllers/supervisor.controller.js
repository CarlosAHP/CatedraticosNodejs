const db = require('../config/db.config.js');
const Supervisor = db.Supervisor;

exports.create = (req, res) => {
    const supervisor = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        department: req.body.department
    };

    Supervisor.create(supervisor)
        .then(result => {
            res.status(200).json({
                message: "Supervisor created successfully with id = " + result.id,
                supervisor: result
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error while creating supervisor!",
                error: error.message
            });
        });
};

exports.findAll = (req, res) => {
    Supervisor.findAll()
        .then(supervisors => {
            res.status(200).json({
                message: "Retrieved all supervisors successfully",
                supervisors: supervisors
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error while retrieving supervisors",
                error: error.message
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;
    Supervisor.findByPk(id)
        .then(supervisor => {
            if (supervisor) {
                res.status(200).json({
                    message: "Retrieved supervisor successfully",
                    supervisor: supervisor
                });
            } else {
                res.status(404).json({
                    message: "Supervisor not found with id = " + id
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error while retrieving supervisor",
                error: error.message
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const updatedData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        department: req.body.department
    };

    Supervisor.update(updatedData, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: "Supervisor updated successfully"
                });
            } else {
                res.status(404).json({
                    message: "Supervisor not found with id = " + id
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error while updating supervisor",
                error: error.message
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Supervisor.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: "Supervisor deleted successfully"
                });
            } else {
                res.status(404).json({
                    message: "Supervisor not found with id = " + id
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error while deleting supervisor",
                error: error.message
            });
        });
};
