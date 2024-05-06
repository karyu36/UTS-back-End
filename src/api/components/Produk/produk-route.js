// const express = require('express');

// const authenticationMiddleware = require('../../middlewares/authentication-middleware');
// const celebrate = require('../../../core/celebrate-wrappers');
// const produkControllers = require('./produk-controller');
// const produkValidator = require('./produk-validator');

// const route = express.Router();

// module.exports = (app) => {
//   app.use('/produk', route);

//   // Get list of users
//   route.get('/', authenticationMiddleware, produkControllers.getProduk);

//   // Create user
//   route.post(
//     '/',
//     authenticationMiddleware,
//     celebrate(produkValidator.createProduk),
//     produkControllers.createProduk
//   );

//   // Get user detail
//   route.get('/:id', authenticationMiddleware, produkControllers.getProduk);

//   // Update user
//   route.put(
//     '/:id',
//     authenticationMiddleware,
//     celebrate(produkValidator.updateProduk),
//     produkControllers.updateProduk
//   );

//   // Delete user
//   route.delete('/:id', authenticationMiddleware, produkControllers.deleteProduk);

//   // Change password
//   route.post(
//     '/:id/change-password',
//     authenticationMiddleware,
//     celebrate(produkValidator.changePassword),
//     produkControllers.changePassword
//   );
// };
