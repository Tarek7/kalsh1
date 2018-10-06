module.exports = function(sequelize, Sequelize) {
  var Question = sequelize.define('question', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    category: {
      type: Sequelize.ENUM('sports', 'e-sports', 'entertainment', 'financials', 'politics'),
      notEmpty: true
    },
    status: {
      type: Sequelize.ENUM('suggested', 'open', 'closed'),
      defaultValue: 'suggested'
    },
    settle_date: {
      type: Sequelize.DATE,
      notEmpty: true
    },
    result: {
      type: Sequelize.ENUM('yes', 'no'),
    }
  });

  return Question;
}
