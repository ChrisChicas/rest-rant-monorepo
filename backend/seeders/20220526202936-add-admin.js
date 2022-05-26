'use strict';
const bcrypt = require("bcrypt")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [{
      first_name: "Lyzin",
      last_name: "Settol",
      email: "lyzin@example.com",
      role: "admin",
      password_digest: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12),
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulklDelete("users", {
      email: "lyzin@example.com"
    })
  }
};
