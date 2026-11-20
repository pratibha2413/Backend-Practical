// config.js — central configuration
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'super_secret_jwt_key_2024',
  JWT_EXPIRES_IN: '1h',
  BCRYPT_SALT_ROUNDS: 10,
  PORT: process.env.PORT || 3000,
};
