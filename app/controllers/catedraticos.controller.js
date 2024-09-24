const db = require('../config/db.config.js');
const Catedratico = db.Catedratico;

exports.create = (req, res) => {
  let catedratico = {};

  try {
    catedratico.NombreCompleto = req.body.NombreCompleto;
    catedratico.FechaContratacion = req.body.FechaContratacion;
    catedratico.FechaNacimiento = req.body.FechaNacimiento;
    catedratico.Genero = req.body.Genero;
    catedratico.Titulo = req.body.Titulo;
    catedratico.Salario = req.body.Salario;

    Catedratico.create(catedratico).then(result => {
      res.status(200).json({
        message: "Catedratico creado con éxito",
        catedratico: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear catedrático",
      error: error.message
    });
  }
};

// Otros métodos como retrieveAll, getById, update, delete...
