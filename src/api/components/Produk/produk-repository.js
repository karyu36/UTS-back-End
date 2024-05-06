// const { produk } = require('../../../models');

// /**
//  * Get a list of users
//  * @returns {Promise}
//  */
// async function getProduk() {
//   return produk.find({});
// }

// /**
//  * Get user detail
//  * @param {string} id - User ID
//  * @returns {Promise}
//  */
// async function getProduk(id) {
//   return produk.findById(id);
// }

// /**
//  * Create new user
//  * @param {string} name - Name
//  * @param {string} Harga - Email
//  * @param {string} Ulasan - Hashed password
//  * @returns {Promise}
//  */
// async function createProduk(name, harga, Ulasan) {
//   return produk.create({
//     name,
//     harga,
//     Ulasan,
//   });
// }

// /**
//  * Update existing produk
//  * @param {string} id 
//  * @param {string} name 
//  * @param {string} Harga 
//  * @returns {Promise}
//  */
// async function updateProduk(id, name, Harga) {
//   return produk.updateOne(
//     {
//       _id: id,
//     },
//     {
//       $set: {
//         name,
//         Harga,
//       },
//     }
//   );
// }

// /**
//  * 
//  * @param {string} id 
//  * @returns {Promise}
//  */
// async function deleteProduk(id) {
//   return User.deleteOne({ _id: id });
// }

// module.exports = {
//   getProduk,
//   getProduk,
//   createProduk,
//   updateProduk,
//   deleteProduk,
// };
