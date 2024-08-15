const db = require('../config/db.config.js');
const Libro = db.Libro;

// Crear un nuevo libro
exports.create = async (req, res) => {
  try {
    const libro = await Libro.create(req.body);
    res.json(libro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los libros
exports.findAll = async (req, res) => {
  try {
    const libros = await Libro.findAll();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un libro por ID
exports.findOne = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);
    if (libro) {
      res.json(libro);
    } else {
      res.status(404).json({ message: 'Libro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un libro por ID
exports.update = async (req, res) => {
  try {
    const [updated] = await Libro.update(req.body, {
      where: { codigo: req.params.id }
    });
    if (updated) {
      const updatedLibro = await Libro.findByPk(req.params.id);
      res.json(updatedLibro);
    } else {
      res.status(404).json({ message: 'Libro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un libro por ID
exports.delete = async (req, res) => {
  try {
    const deleted = await Libro.destroy({
      where: { codigo: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Libro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
