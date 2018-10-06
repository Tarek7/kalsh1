module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define('user', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    birthdate: {
      type: Sequelize.DATE
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: Sequelize.TEXT,
      notEmpty: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cc_number: {
      type: Sequelize.TEXT,
      validate: {
        isCreditCard: true
      }
    },
    cc_ccv: {
      type: Sequelize.TEXT,
      validate: {
        len: [3,3],
        isNumeric: true
      }
    },
    cc_expiration_date: {
      type: Sequelize.TEXT
    },
    cc_name: {
      type: Sequelize.TEXT
    },
    last_login: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    balance: {
      type: Sequelize.DECIMAL,
      defaultValue: 100 / this.id
    }
  });
  
  return User;

}
