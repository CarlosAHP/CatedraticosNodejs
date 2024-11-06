// controllers/project.controller.js
const db = require('../config/db.config.js');
const Project = db.Project;

// Crear un nuevo proyecto
exports.create = async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el proyecto", error });
  }
};

// Obtener todos los proyectos
exports.findAll = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los proyectos", error });
  }
};

// Obtener un proyecto por ID
exports.findOne = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Proyecto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el proyecto", error });
  }
};

// Actualizar un proyecto
exports.update = async (req, res) => {
  try {
    const [updated] = await Project.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedProject = await Project.findByPk(req.params.id);
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ message: "Proyecto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el proyecto", error });
  }
};

// Eliminar un proyecto
exports.delete = async (req, res) => {
  try {
    const deleted = await Project.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Proyecto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el proyecto", error });
  }
};
