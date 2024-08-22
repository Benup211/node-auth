'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail:true,
        notEmpty:true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:true
      }
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true
      }
    },
    lastLogin:{
      type:DataTypes.DATE,
      defaultValue:DataTypes.NOW
    },
    isActive:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    resetPasswordToken:{
      type:DataTypes.STRING
    },
    resetPasswordExpires:{
      type:DataTypes.DATE
    },
    verificationToken:{
      type:DataTypes.STRING
    },
    verificationTokenExpires:{
      type:DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName:'Users'
  });
  return User;
};