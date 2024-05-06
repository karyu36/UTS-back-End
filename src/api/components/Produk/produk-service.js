// const produkRepository = require('./produk-repository');
// const { hashPassword } = require('../../../utils/password');
// const { produk } = require('../../../models');

// /**
//  * Get list of users
//  * @returns {Array}
//  */
// async function getProduk() {
//   const users = await ProdukRepository.getUsers();

//   const results = [];
//   for (let i = 0; i < Produk.length; i += 1) {
//     const produk = Produk[i];
//     results.push({
//       id: produk.id,
//       name: produk.name,
//       email: produk.email,
//     });
//   }

//   return results;
// }

// /**
//  * Get user detail
//  * @param {string} id - produk ID
//  * @returns {Object}
//  */
// async function getProduk(id) {
//   const produk = await produkRepository.getUser(id);

//   // User not found
//   if (!produk) {
//     return null;
//   }

//   return {
//     id: produk.id,
//     name: produk.name,
//     Harga: Harga.email,
//   };
// }

// /**
//  * Create new user
//  * @param {string} name 
//  * @param {string} Harga 
//  * @param {string} Ulasan 
//  * @returns {boolean}
//  */
// async function createProduk(name, Harga, Ulasan) {
  
//   const hashedPassword = await hashPassword(Ulasan);

//   try {
//     await produkRepository.createUser(name, email, hashedPassword);
//   } catch (err) {
//     return null;
//   }

//   return true;
// }

// /**
//  * Update existing user
//  * @param {string} id - Produk ID
//  * @param {string} name - Name
//  * @param {string} Produk - Produk
//  * @returns {boolean}
//  */
// async function updateProduk(id, name, email) {
//   const user = await produkRepositoryRepository.getProduk(id);

//   // User not found
//   if (!produk) {
//     return null;
//   }

//   try {
//     await produkRepositoryRepository.updateProduk(id, name, email);
//   } catch (err) {
//     return null;
//   }

//   return true;
// }

// /**
//  * Delete Produk
//  * @param {string} id - Produk ID
//  * @returns {boolean}
//  */
// async function deleteProduk(id) {
//   const user = await produkRepository.getProduk(id);

//   // Produk not found
//   if (!produk) {
//     return null;
//   }

//   try {
//     await produkRepository.deleteProduk(id);
//   } catch (err) {
//     return null;
//   }

//   return true;
// }

// module.exports = {
//   getProduk,
//   getProduk,
//   createProduk,
//   updateProduk,
//   deleteProduk,
// };
