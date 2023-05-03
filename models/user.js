const Sequelize = require("sequelize");
const config = require("../config/config");

config.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER,

      autoIncrement: true,

      allowNull: false,

      primaryKey: true,
    },

    email: {
      type: Sequelize.STRING,

      allowNull: false,
    },

    password: {
      type: Sequelize.STRING,

      allowNull: false,
    },

    first_name: {
      type: Sequelize.STRING,

      allowNull: false,
    },

    last_name: {
      type: Sequelize.STRING,

      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,

      allowNull: true,
    },
  },
  { timestamps: false },
);

module.exports = User;
