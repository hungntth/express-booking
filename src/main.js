const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const { I18n } = require('i18n');
const cors = require('cors');
const {now} = require("moment");
const routes =  require('./routes');
const {secrets} = require('./utils');

// setup i18n
const i18n = new I18n({
  locales: ['en', 'vi'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'vi'
})

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);

app.use(function (req, res, next) {
  i18n.init(req, res);
  req.locale = 'vi';
  req.currentTime = now();
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, total, totalError, X-Total-Count");
  res.header("Access-Control-Expose-Headers", "Origin, X-Requested-With, Content-Type, Accept, total, totalError, X-Total-Count");
  next();
});

// setting passport
app.use(expressSession({secret: 'keyboard cat'}))
app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport');

// setting route init
app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const server = app.listen(secrets.PORT || 8086, () => {
  console.log('Server is started on 127.0.0.1:'+ (secrets.PORT || 8086))
})

module.exports = app;
