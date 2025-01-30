'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // isAlpha: {
        //   args: true,
        //   msg: 'Name should only contain alphabetic characters.'
        // },
        notEmpty: {
          msg: 'Name cannot be empty.'
        }
      }
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email is not in valid format.'
        },
        notEmpty: {
          msg: 'Email cannot be empty.'
        }
      }
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty.'
        },
        // isLength: {
        //   args: [6, 20],
        //   msg: 'Password must be between 6 and 20 characters long.'
        // }
      }
    },
    CPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Confirm Password cannot be empty.'
        },
        // isEqual: {
        //   args: sequelize.col('Password'),
        //   msg: 'Confirm Password does not match with Password.'
        // }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};