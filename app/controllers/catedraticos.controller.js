const db = require('../config/db.config.js');
const Catedratico = db.Catedratico;

// Crear un nuevo catedrático
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

// Obtener todos los catedráticos
exports.retrieveAll = (req, res) => {
  Catedratico.findAll()
    .then(catedraticos => {
      res.status(200).json({
        message: "Catedráticos recuperados con éxito",
        catedraticos: catedraticos,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error al recuperar los catedráticos",
        error: error.message
      });
    });
};

// Obtener un catedrático por ID
exports.getById = (req, res) => {
  Catedratico.findByPk(req.params.id)
    .then(catedratico => {
      if (!catedratico) {
        return res.status(404).json({
          message: "Catedrático no encontrado",
        });
      }
      res.status(200).json({
        message: "Catedrático recuperado con éxito",
        catedratico: catedratico,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error al recuperar el catedrático",
        error: error.message
      });
    });
};

// Actualizar un catedrático
exports.update = (req, res) => {
  const id = req.params.id;

  Catedratico.update(req.body, { where: { idCatedratico: id } })
    .then(result => {
      if (result == 0) {
        return res.status(404).json({
          message: "Catedrático no encontrado o no actualizado",
        });
      }
      res.status(200).json({
        message: "Catedrático actualizado con éxito",
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error al actualizar el catedrático",
        error: error.message
      });
    });
};

// Eliminar un catedrático
exports.delete = (req, res) => {
  const id = req.params.id;

  Catedratico.destroy({ where: { idCatedratico: id } })
    .then(result => {
      if (result == 0) {
        return res.status(404).json({
          message: "Catedrático no encontrado o no eliminado",
        });
      }
      res.status(200).json({
        message: "Catedrático eliminado con éxito",
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error al eliminar el catedrático",
        error: error.message
      });
    });
};
