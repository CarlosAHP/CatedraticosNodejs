let express = require('express');
let router = express.Router();

const customers = require('../controllers/customer.controller.js');
const providers = require('../controllers/provider.controller.js');
const employees = require('../controllers/employee.controller.js');
const supervisors = require('../controllers/supervisor.controller.js');
const songs = require('../controllers/song.controller.js');

// Customer routes
router.post('/api/customers/create', customers.create);
router.get('/api/customers/all', customers.retrieveAllCustomers);
router.get('/api/customers/onebyid/:id', customers.getCustomerById);
router.get('/api/customers/filteringbyage', customers.filteringByAge);
router.get('/api/customers/pagination', customers.pagination);
router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
router.put('/api/customers/update/:id', customers.updateById);
router.delete('/api/customers/delete/:id', customers.deleteById);

// Provider routes
router.post('/api/providers/create', providers.create);
router.get('/api/providers', providers.findAll);
router.get('/api/providers/:id', providers.findById);
router.put('/api/providers/:id', providers.update);
router.delete('/api/providers/:id', providers.delete);

// Employee routes
router.post('/api/employees/create', employees.create);
router.get('/api/employees', employees.findAll);
router.get('/api/employees/:id', employees.findById);
router.put('/api/employees/update/:id', employees.update);
router.delete('/api/employees/delete/:id', employees.delete);

// Supervisor routes
router.post('/api/supervisors/create', supervisors.create);
router.get('/api/supervisors', supervisors.findAll);
router.get('/api/supervisors/:id', supervisors.findById);
router.put('/api/supervisors/update/:id', supervisors.update);
router.delete('/api/supervisors/delete/:id', supervisors.delete);

// Song routes
router.post('/api/songs/create', songs.create);
router.get('/api/songs', songs.findAll);
router.get('/api/songs/:id', songs.findById);
router.put('/api/songs/update/:id', songs.update);
router.delete('/api/songs/delete/:id', songs.delete);

module.exports = router;
