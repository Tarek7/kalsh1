var sleep = require('sleep');
const sequelize = require("sequelize");
var authController = require('../controllers/authcontroller.js');
var models = require("../models");

var appRouter = function (app, passport) {
  app.get("/", function (req, res) {
    res.status(200).send({ message: 'Welcome to our restful API' });
  });

  app.get('/questions/:category', (req, res) => {
    let conditions = {
      order: sequelize.literal("createdAt DESC")
    };
    if (req.params.category !== "all"){
      conditions = {
        where: {
          category: req.params.category
        },
        order: sequelize.literal("createdAt DESC")
      };
    }

    let questionData = [];

    models.question.findAll(conditions)
    .then(questions => {
      questions.forEach(question => {
        question_data = question.get({ plain: true });
        question_data["primary_bets"] = [];
        questionData.push(question_data);
      });
      return questionData;
    })
    .then((questions) => {
      return Promise.all(questions.map((question_data) => {
        return models.bet_primary.findAll({ where: { question_id: question_data.id } })
          .then(bets => {
            bets.forEach(bet => {
              question_data["primary_bets"].push(bet.get({ plain: true }));
            });
            return question_data;
          });
      }));
    })
    .then((questions) => {
      res.status(200).json({ questions });
    })
    .catch(error => {
      res.status(400).json({ 'message': 'Error' });
    });
  });

  app.post('/settle_yes', (req, res, next) => {
    console.log('Settling for yes');
    models.question.update({
        result: 'yes' }, { where: { id: req.body.question_primary_id }}
    )
    models.bet_primary.findAll({ where: { question_id: req.body.question_primary_id }})
    .then(bets => {
      bets.forEach(bet => {
      bet.update({settled: true })
      })
    })

    models.match.findAll({ where: { question_id: req.body.question_primary_id }})
    .then(bets => {
      bets.forEach(bet => {
      bet.update({settled: true })
      })
    })
    // console.log(models.user.findAll())
    // console.log("yooooooooooo")
    models.bet_primary.findAll({ where: { question_id: req.body.question_primary_id}})
    .then(bets => {
      console.log(bets)
      bets.forEach(bet => {
      // console.log(bet.user_id)
      // .then(use => {
      //   var use_balance = use.balance
      //   user.update({
      //     balance: use_balance + (1 *int(bet.option === 'yes') - 1 * int(bet.option === 'no')) * (float(bet.odds_numerator) / float(bet.odds_denominator)) * bet.amount
      //   })
      // })

      bet.update({resolved: true })
      })
    })

    res.status(200).json({ 'message': 'Ok' });
  });

  app.post('/settle_no', (req, res, next) => {
    console.log('Settling for yes');
    models.question.update({
        result: 'no' }, { where: { id: req.body.question_primary_id }}
    )
    console.log(models.question.findOne({ where: { id: req.body.question_primary_id} }))
    models.bet_primary.findAll({ where: { question_id: req.body.question_primary_id } })
    res.status(200).json({ 'message': 'Ok' });
  });

  app.get('/mybets', (req, res) => {
    let conditions = {
      order: sequelize.literal("createdAt DESC")
    };

    let matchesData = [];
    models.match.findAll({ where: { yes_user_id: req.query.user_id } })
    .then(matches => {
      matches.forEach(match => {
        match_data = match.get({ plain: true });
        match_data["option"] = "yes";
        matchesData.push(match_data);
      });
      return matchesData;
    })
    .then((matchesData) => {
      return models.match.findAll({ where: { no_user_id: req.query.user_id } })
      .then(matches => {
        matches.forEach(match => {
          match_data = match.get({ plain: true });
          match_data["option"] = "no";
          matchesData.push(match_data);
        });
        return matchesData;
      })
    })
    .then((matchesData) => {
      return Promise.all(matchesData.map((match_data) => {
        return models.question.findOne({ where: { id: match_data.question_id } })
          .then(question => {
            match_data["question"] = question.get({ plain: true });
            return match_data;
          });
      }));
    })
    .then((bets) => {
      res.status(200).json({ bets });
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ 'message': 'Error' });
    });
  });

  app.post('/question', (req, res, next) => {
    if (!req.body || !req.body.title) {
      return next({ status: 400, message: 'title is required' });
    }
    if (!req.body || !req.body.category) {
      return next({ status: 400, message: 'category is required' });
    }
    if (!req.body || !req.body.settle_date) {
      return next({ status: 400, message: 'settle_date is required' });
    }

    models.question.create({
      title: req.body.title,
      category: req.body.category,
      settle_date: req.body.settle_date
    }).then(newPost => {
      res.status(200).json({ newPost, success: true });
    }).catch(error => {
      res.status(400).json({ 'message': 'Error' });
    });
  });

  app.post('/bet_primary', (req, res, next) => {
    if (!req.body || !req.body.user_id) {
      return next({ status: 400, message: 'user_id is required' });
    }
    if (!req.body || !req.body.question_id) {
      return next({ status: 400, message: 'question_id is required' });
    }
    if (!req.body || !req.body.option) {
      return next({ status: 400, message: 'option is required' });
    }
    if (!req.body || !req.body.amount) {
      return next({ status: 400, message: 'amount is required' });
    }
    if (!req.body || !req.body.odds_numerator) {
      return next({ status: 400, message: 'odds_numerator is required' });
    }
    if (!req.body || !req.body.odds_denominator) {
      return next({ status: 400, message: 'odds_denominator is required' });
    }

    models.bet_primary.create({
      user_id: req.body.user_id,
      question_id: req.body.question_id,
      option: req.body.option,
      amount: req.body.amount,
      available_amount: req.body.amount,
      odds_numerator: req.body.odds_numerator,
      odds_denominator: req.body.odds_denominator,
    }).then(newBet => {
      res.status(200).json({ newBet, success: true });
    }).catch(error => {
      res.status(400).json({ 'message': 'Error' });
    });
  });

  app.post('/pick_bet', (req, res, next) => {
    if (!req.body || !req.body.user_id) {
      return next({ status: 400, message: 'user_id is required' });
    }
    if (!req.body || !req.body.amount) {
      return next({ status: 400, message: 'amount is required' });
    }
    if (!req.body || !req.body.bet_primary_id) {
      return next({ status: 400, message: 'bet_primary_id is required' });
    }

    // TODO use transactions
    models.bet_primary.update({
        available_amount: sequelize.literal('available_amount -' + req.body.amount) }, { where: { id: req.body.bet_primary_id }}
    )
    .then(() =>
      models.bet_primary.findOne({ where: { id: req.body.bet_primary_id } })
    )
    .then((bet_primary) => {
      let matchData;
      if (bet_primary.option === "yes") {
        matchData = {
          yes_user_id: bet_primary.user_id,
          no_user_id: req.body.user_id,
          question_id: bet_primary.question_id,
          yes_odds_numerator: bet_primary.odds_numerator,
          yes_odds_denominator: bet_primary.odds_denominator,
          amount: req.body.amount
        }
      } else {
        matchData = {
          yes_user_id: req.body.user_id,
          no_user_id: bet_primary.user_id,
          question_id: bet_primary.question_id,
          yes_odds_numerator: bet_primary.odds_denominator,
          yes_odds_denominator: bet_primary.odds_numerator,
          amount: req.body.amount
        }
      }
      return models.match.create(matchData);
    })
    .then(newBet => {
      res.status(200).json({ newBet, success: true });
    }).catch(error => {
      console.log(error);
      res.status(400).json({ 'message': 'Error' });
    });
  });

  // Authentication
  app.get('/signup', authController.signup);
  app.get('/signin', authController.signin);
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/rolou',
      failureRedirect: '/signup'
    }
  ));

  app.get('/logout', authController.logout);
  /*app.post('/signin', passport.authenticate('local-signin', {
      successRedirect: '/rolou2',
      failureRedirect: '/signin'
    }
  ));*/

  app.post(
    '/signin',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local-signin'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
  )

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/signin');
  }
}

module.exports = appRouter;
