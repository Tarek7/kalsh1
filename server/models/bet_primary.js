module.exports = function(sequelize, Sequelize) {
  var BetPrimary = sequelize.define('bet_primary', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    question_id: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    option: {
      type: Sequelize.ENUM('yes', 'no'),
      notEmpty: true
    },
    odds_numerator: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    odds_denominator: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    amount: {
      type: Sequelize.INTEGER, // TODO accept float
      notEmpty: true
    },
    available_amount: {
      type: Sequelize.INTEGER, // TODO accept float
      notEmpty: true
    },
    settled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    resolved: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  return BetPrimary;
}
