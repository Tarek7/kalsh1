module.exports = function(sequelize, Sequelize) {
  var Match = sequelize.define('match', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    yes_user_id: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    no_user_id: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    question_id: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    yes_odds_numerator: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    yes_odds_denominator: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    amount: {
      type: Sequelize.INTEGER, // TODO accept float
      notEmpty: true
    }
  });

  return Match;
}
