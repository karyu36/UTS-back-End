const { User } = require('../../../models');

/**
 * Get a list of users with pagination, filtering, and sorting
 * @param {number} pageNumber - Nomor halaman
 * @param {number} pageSize - Jumlah data per halaman
 * @param {string} search - Kata kunci pencarian berdasarkan nama atau email
 * @param {string} sortBy - Atribut untuk mengurutkan data
 * @param {string} sortOrder - Urutan pengurutan (asc/desc)
 * @returns {Promise} - Daftar pengguna sesuai kriteria
 */
async function getUsers(pageNumber = 1, pageSize = 10, search = '', sortBy = 'name', sortOrder = 'asc') {
  // Membuat objek query awal
  let query = {};

  // Jika ada kata kunci pencarian, tambahkan ke dalam query
  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: 'i' } }, // i berarti case-insensitive
        { email: { $regex: search, $options: 'i' } },
      ]
    };
  }

  // Membuat objek untuk mengurutkan data
  let sortCriteria = {};
  sortCriteria[sortBy] = sortOrder === 'desc' ? -1 : 1;

  try {
    // Mengambil data pengguna sesuai kriteria
    const users = await User.find(query)
      .sort(sortCriteria)
      .skip((pageNumber - 1) * pageSize) // Mengabaikan data sebelumnya berdasarkan halaman
      .limit(pageSize); // Batasi jumlah data yang diambil per halaman

    return users;
  } catch (error) {
    throw new Error('data pengguna gagal di dapat');
  }
}

/**
 * Get user detail by ID
 * @param {string} id - ID Pengguna
 * @returns {Promise} - Detail pengguna
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Membuat pengguna baru
 * @param {string} name - Nama
 * @param {string} email - Email
 * @param {string} password - Kata sandi terenkripsi
 * @returns {Promise} - Pengguna yang baru dibuat
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Memperbarui pengguna yang ada
 * @param {string} id - User ID
 * @param {string} name - New name
 * @param {string} email - New Email
 * @returns {Promise} - Status pembaruan
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    { _id: id }, // Kriteria pencarian
    { $set: { name, email } } // Nilai baru
  );
}

/**
 * Menghapus pengguna
 * @param {string} id - ID Pengguna
 * @returns {Promise} - Status penghapusan
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Mendapatkan pengguna berdasarkan email untuk mencegah email ganda
 * @param {string} email - Email
 * @returns {Promise} - Detail pengguna
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Memperbarui kata sandi pengguna
 * @param {string} id - ID Pengguna
 * @param {string} password - Kata sandi baru terenkripsi
 * @returns {Promise} - Status pembaruan kata sandi
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
