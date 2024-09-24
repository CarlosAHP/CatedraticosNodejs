let express = require('express');
let router = express.Router();

const catedraticos = require('../controllers/catedraticos.controller.js');
const controlIngresos = require('../controllers/controlingreso.controller.js');
const providers = require('../controllers/provider.controller.js');

// Rutas para Catedraticos
router.post('/api/catedraticos/create', catedraticos.create);
router.get('/api/catedraticos', catedraticos.retrieveAll);
router.get('/api/catedraticos/:id', catedraticos.getById);
router.put('/api/catedraticos/:id', catedraticos.update);
router.delete('/api/catedraticos/:id', catedraticos.delete);

// Rutas para Control de Ingreso
router.post('/api/control-ingreso/create', controlIngresos.create);
router.get('/api/control-ingreso', controlIngresos.retrieveAll);
router.get('/api/control-ingreso/:id', controlIngresos.getById);
router.put('/api/control-ingreso/:id', controlIngresos.update); // Agregar si tienes un método update
router.delete('/api/control-ingreso/:id', controlIngresos.delete); // Agregar si tienes un método delete

// Provider routes
router.post('/api/providers/create', providers.create);
router.get('/api/providers', providers.findAll);
router.get('/api/providers/:id', providers.findById);
router.put('/api/providers/:id', providers.update);
router.delete('/api/providers/:id', providers.delete);

module.exports = router;
