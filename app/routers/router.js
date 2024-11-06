let express = require('express');
let router = express.Router();

const providers = require('../controllers/provider.controller.js');
const projectController = require('../controllers/project.controller.js');
const authController = require('../controllers/auth.controller');


// Provider routes
router.post('/api/providers/create', providers.create);
router.get('/api/providers', providers.findAll);
router.get('/api/providers/:id', providers.findById);
router.put('/api/providers/:id', providers.update);
router.delete('/api/providers/:id', providers.delete);

// Rutas para operaciones CRUD
router.post('/projects', projectController.create);
router.get('/projects', projectController.findAll);
router.get('/projects/:id', projectController.findOne);
router.put('/projects/:id', projectController.update);
router.delete('/projects/:id', projectController.delete);


// Rutas de autenticación
router.post('/login', authController.login); // Login con correo y contraseña
router.post('/google-login', authController.googleLogin); // Login con Google
router.get('/me', authController.obtenerUsuarioAutenticado); // Obtener datos del usuario autenticado
router.put('/me', authController.actualizarPerfil); // Actualizar perfil del usuario autenticado

module.exports = router;
