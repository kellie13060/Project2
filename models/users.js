var bcrypt = require("bcryptjs");
//adding a user using sequelize
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 25]
      }
    },
    email: {
      type: DataTypes.STRING,
      isUnique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7, 25]
      }
    }
  });

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password

User.beforeCreate(user => {
   user.password = bcrypt.hashSync(
     user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
