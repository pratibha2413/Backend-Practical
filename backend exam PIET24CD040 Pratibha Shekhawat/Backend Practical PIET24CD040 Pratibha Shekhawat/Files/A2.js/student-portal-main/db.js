// db.js — in-memory "database" (array of users)
// In a real app this would be MongoDB / PostgreSQL, etc.

/** @type {Array<{id: number, name: string, email: string, password: string, role: string}>} */
const users = [];
let nextId = 1;

module.exports = {
  /**
   * Find a user by email (case-insensitive).
   * @param {string} email
   */
  findByEmail(email) {
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  /**
   * Find a user by id.
   * @param {number} id
   */
  findById(id) {
    return users.find((u) => u.id === id) || null;
  },

  /**
   * Insert a new user and return the saved object.
   * @param {{ name: string, email: string, password: string, role: string }} data
   */
  create(data) {
    const user = { id: nextId++, ...data };
    users.push(user);
    return user;
  },

  /**
   * Return all users (admin view) — omit passwords.
   */
  findAll() {
    return users.map(({ password, ...rest }) => rest);
  },
};
