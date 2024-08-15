const db = require('../config/db.config.js');
const Prestamo = db.Prestamo;

// Crear un nuevo préstamo
exports.create = async (req, res) => {
  try {
    const prestamo = await Prestamo.create(req.body);
    res.json(prestamo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los préstamos
exports.findAll = async (req, res) => {
  try {
    const prestamos = await Prestamo.findAll();
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un préstamo por ID
exports.findOne = async (req, res) => {
  try {
    const prestamo = await Prestamo.findByPk(req.params.id);
    if (prestamo) {
      res.json(prestamo);
    } else {
      res.status(404).json({ message: 'Préstamo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un préstamo por ID
exports.update = async (req, res) => {
  try {
    const [updated] = await Prestamo.update(req.body, {
      where: { numeroPedido: req.params.id }
    });
    if (updated) {
      const updatedPrestamo = await Prestamo.findByPk(req.params.id);
      res.json(updatedPrestamo);
    } else {
      res.status(404).json({ message: 'Préstamo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un préstamo por ID
exports.delete = async (req, res) => {
  try {
    const deleted = await Prestamo.destroy({
      where: { numeroPedido: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Préstamo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
