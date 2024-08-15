const db = require('../config/db.config.js');
const Provider = db.Provider;

// Create a new Provider
exports.create = (req, res) => {
  let provider = {};

  try {
    provider.name = req.body.name;
    provider.contactNumber = req.body.contactNumber;
    provider.email = req.body.email;
    provider.address = req.body.address;

    Provider.create(provider).then(result => {
      res.status(200).json({
        message: "Provider created successfully",
        provider: result
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message
    });
  }
};

// Retrieve all Providers
exports.findAll = (req, res) => {
  Provider.findAll()
    .then(providers => {
      res.status(200).json({
        message: "Retrieve all providers successfully",
        providers: providers
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fail!",
        error: error.message
      });
    });
};

// Retrieve a single Provider by Id
exports.findById = (req, res) => {
  let providerId = req.params.id;
  Provider.findByPk(providerId)
    .then(provider => {
      if (!provider) {
        res.status(404).json({
          message: `Provider with id ${providerId} not found`
        });
      } else {
        res.status(200).json({
          message: `Retrieve provider with id ${providerId} successfully`,
          provider: provider
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fail!",
        error: error.message
      });
    });
};

// Update a Provider by Id
exports.update = (req, res) => {
  let providerId = req.params.id;
  let updatedProvider = {
    name: req.body.name,
    contactNumber: req.body.contactNumber,
    email: req.body.email,
    address: req.body.address
  };

  Provider.update(updatedProvider, { where: { id: providerId } })
    .then(result => {
      if (result[0] === 0) {
        res.status(404).json({
          message: `Provider with id ${providerId} not found or no changes made`
        });
      } else {
        res.status(200).json({
          message: `Provider with id ${providerId} updated successfully`,
          provider: updatedProvider
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fail!",
        error: error.message
      });
    });
};

// Delete a Provider by Id
exports.delete = (req, res) => {
  let providerId = req.params.id;

  Provider.destroy({ where: { id: providerId } })
    .then(result => {
      if (result === 0) {
        res.status(404).json({
          message: `Provider with id ${providerId} not found`
        });
      } else {
        res.status(200).json({
          message: `Provider with id ${providerId} deleted successfully`
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fail!",
        error: error.message
      });
    });
};
