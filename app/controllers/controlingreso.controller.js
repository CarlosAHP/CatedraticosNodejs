const db = require('../config/db.config.js');
const ControlIngreso = db.ControlIngreso;
const LogInasistencia = db.LogInasistencia;

exports.create = (req, res) => {
  let controlIngreso = {};

  try {
    controlIngreso.IdCatedratico = req.body.IdCatedratico;
    controlIngreso.FechaHoraIngreso = req.body.FechaHoraIngreso;
    controlIngreso.FechaHoraSalida = req.body.FechaHoraSalida;
    controlIngreso.Estatus = req.body.Estatus;

    ControlIngreso.create(controlIngreso).then(result => {
      if (controlIngreso.Estatus === 0) { // Si es inasistencia
        ControlIngreso.count({
          where: { IdCatedratico: controlIngreso.IdCatedratico, Estatus: 0 }
        }).then(count => {
          if (count >= 3) {
            LogInasistencia.create({
              IdCatedratico: controlIngreso.IdCatedratico,
              Descripcion: "Tres inasistencias registradas"
            });
          }
        });
      }
      res.status(200).json({
        message: "Registro de ingreso creado con éxito",
        controlIngreso: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al registrar ingreso",
      error: error.message
    });
  }
};
