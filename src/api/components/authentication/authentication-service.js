const authenticationRepository = require('./authentication-repository');
const { generateToken } = require('../../../utils/session-token');
const { passwordMatched } = require('../../../utils/password');

// Assume you have a database or cache to store failed login attempts per email
const failedLoginAttempts = new Map(); // Key: email, Value: number of attempts

/**
 * Check username and password for login.
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {object} An object containing, among others, the JWT token if the email and password are matched. Otherwise returns null.
 */
async function checkLoginCredentials(email, password) {
  const user = await authenticationRepository.getUserByEmail(email);

  // We define a default user password here as '<RANDOM_PASSWORD_FILTER>'
  // to handle the case when the user login is invalid. We still want to
  // check the password anyway, so that it prevents attackers from guessing
  // login credentials by looking at the processing time.
  const userPassword = user ? user.password : '<RANDOM_PASSWORD_FILLER>';
  const passwordChecked = await passwordMatched(password, userPassword);

  // If the user is found (by email) and the password matches
  if (user && passwordChecked) {
    // Reset failed login attempts for this email
    failedLoginAttempts.delete(email);
    return {
      email: user.email,
      name: user.name,
      user_id: user.id,
      token: generateToken(user.email, user.id),
    };
  } else {
    // Increment failed login attempts for this email
    const attempts = failedLoginAttempts.get(email) || 0;
    failedLoginAttempts.set(email, attempts + 1);

    // Check if the limit is reached
    if (attempts >= 5) {
      // Return an error indicating too many failed attempts
      throw new Error('User email mencoba login, namun mendapat error 403 karena telah melebihi limit attempt.');
    } else if (attempts >= 7) {
      // give info if user can start try enter password again
      throw new Error('User email bisa mencoba login kembali karena sudah lebih dari 30 menit sejak pengenaan limit. Attempt di-reset kembali ke awal.');
    } else {
      // Return null for unsuccessful login
      return null;
    }
  }
}

module.exports = {
  checkLoginCredentials,
};
