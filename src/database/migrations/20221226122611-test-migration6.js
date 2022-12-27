'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('user', {
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      user_name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      nick_name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true
      },
      real_name: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      created_at: {
        type: new DataTypes.DATE(),
        allowNull: false,
        defaultValue: new Date()
      },
      updated_at: {
        type: new DataTypes.DATE(),
        allowNull: false,
        defaultValue: new Date()
      }
    });

    await queryInterface.createTable('post', {
      post_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      post_title: {
        type: DataTypes.STRING(32),
        allowNull: false
      },
      poster_user_name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true
      },
      created_at: {
        type: new DataTypes.DATE(),
        allowNull: false,
        defaultValue: new Date()
      },
      updated_at: {
        type: new DataTypes.DATE(),
        allowNull: false,
        defaultValue: new Date()
      }
    });

    await queryInterface.createTable('parameters', {
      param_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      param_title: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      param_description: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      created_at: {
        type: new DataTypes.DATE(),
        allowNull: false,
        defaultValue: new Date()
      },
      updated_at: {
        type: new DataTypes.DATE(),
        allowNull: false,
        defaultValue: new Date()
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
