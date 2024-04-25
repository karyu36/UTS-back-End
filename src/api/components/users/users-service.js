const usersRepository = require('./users-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');
const bcrypt = require('bcrypt');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await usersRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Check whether the email is registered
 * @param {string} email - Email
 * @returns {boolean}
 */
async function emailIsRegistered(email) {
  const user = await usersRepository.getUserByEmail(email);

  if (user) {
    return true;
  }

  return false;
}

/**
 * Check whether the password is correct
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function checkPassword(userId, password) {
  const user = await usersRepository.getUser(userId);
  return passwordMatched(password, user.password);
}

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function changePassword(userId, password) {
  const user = await usersRepository.getUser(userId);

  // Check if user not found
  if (!user) {
    return null;
  }

  const hashedPassword = await hashPassword(password);

  const changeSuccess = await usersRepository.changePassword(
    userId,
    hashedPassword
  );

  if (!changeSuccess) {
    return null;
  }

  return true;
}

/**
 * Authenticate user login
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{success: boolean, message: string}>} - Authentication result
 */
async function login(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    return { success: false, message: "Invalid email or password." };
  }

  // Check if login attempts exceed the limit
  if (user.loginAttempts >= 5) {
    const now = new Date();
    const timeDiff = now - user.lastLoginAttempt;
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));

    // If more than 30 minutes have passed, reset login attempts
    if (minutesDiff >= 30) {
      user.loginAttempts = 0;
      user.lastLoginAttempt = now;
      await user.save();
    } else {
      return { success: false, message: "Too many failed login attempts. Try again later." };
    }
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    // Increase failed login attempts
    user.loginAttempts += 1;
    user.lastLoginAttempt = new Date();
    await user.save();

    // Check if login attempts exceed the limit
    if (user.loginAttempts >= 5) {
      return { success: false, message: "Too many failed login attempts. Try again later." };
    }

    return { success: false, message: "Invalid email or password." };
  }

  // Reset failed login attempts if successful
  user.loginAttempts = 0;
  await user.save();

  return { success: true, message: "Login successful." };
}

/**
 * Logout user
 * @param {string} email - User email
 * @returns {Promise<void>}
 */
async function logout(email) {
  // Implement logout functionality here, if needed
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  emailIsRegistered,
  checkPassword,
  changePassword,
  login,
  logout,
};
