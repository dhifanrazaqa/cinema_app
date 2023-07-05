require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
const users = require('../../Interfaces/http/api/users/routes');
const authentications = require('../../Interfaces/http/api/authentications/routes');
const movies = require('../../Interfaces/http/api/movies/routes');
const balances = require('../../Interfaces/http/api/balances/routes');
const seats = require('../../Interfaces/http/api/seats/routes');
const transactions = require('../../Interfaces/http/api/transactions/routes');

const createServer = () => {
  const app = express();
  const staticDirectory = path.join(__dirname, '../views');
  const oneDay = 1000 * 60 * 60 * 24;

  app.use(express.static(staticDirectory));
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');

  app.use(express.urlencoded({
    extended: true,
  }));
  app.use(cookieParser());
  app.use(sessions({
    secret: process.env.ACCESS_TOKEN_KEY,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
    store: new (require('connect-pg-simple')(sessions))({
      conString: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
    }),
  }));

  // const verifyLogin = (req, res, next) => {
  //   console.log(req.sessions);
  //   if (req.sessions === undefined) {
  //     return res.render('errornotauthorized', { req });
  //   }
  //   return next();
  // };

  app.use('/', users);
  app.use('/', authentications);
  app.use('/', movies);
  app.use('/', balances);
  app.use('/', seats);
  app.use('/', transactions);

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    const translatedError = DomainErrorTranslator.translate(err);

    if (translatedError.statusCode === 404) res.render('errornotfound', { req });
    else if (translatedError.statusCode === 400) res.render('errorbadrequest', { req });
    else res.render('errorserver', { req });
  });

  return app;
};

module.exports = createServer;
