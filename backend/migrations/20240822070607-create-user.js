'use strict';

const { Unique, NotEmpty } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        Unique: true,
        validate: {
          isEmail: true,
          NotEmpty: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          notEmpty:true
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          notEmpty:true
        }
      },
      lastLogin: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      resetPasswordToken: {
        type: Sequelize.STRING
      },
      resetPasswordExpires: {
        type: Sequelize.DATE
      },
      verificationToken: {
        type: Sequelize.STRING
      },
      verificationTokenExpires: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};