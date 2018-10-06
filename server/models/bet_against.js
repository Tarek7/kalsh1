module.exports = function(sequelize, Sequelize) {
  var BetAgainst = sequelize.define('bet_against', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    bet_primary_id: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    amount: {
      type: Sequelize.INTEGER, // TODO accept float
      notEmpty: true
    }
  });

  return BetAgainst;
}
