var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const Sequelize = require('sequelize');
const morgan = require('morgan');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
const env = process.env.NODE_ENV || 'development';
const envConfig = require('./config/config.json')[env].DB;
const logger = require("./utilty/logSetup");
const bodyParser = require('body-parser');

var app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json({limit: '5mb'}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', require('./src/routes/ui_route'));

app.use('/api', require('./src/routes/api_route'));


app.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err)

    if (err) {
        res.json({success: false, message: err});
    }

})
const sequelize = new Sequelize(envConfig.db, envConfig.username, envConfig.password, {
    host: envConfig.host,
    dialect: envConfig.dialect,
    //operatorsAliases: false,

    pool: {
        max: envConfig.pool.max,
        min: envConfig.pool.min,
        acquire: envConfig.pool.acquire,
        idle: envConfig.pool.idle
    }
});
sequelize
    .authenticate()
    .then(() => {
        logger.info('DB Connection has been established successfully.');

    }).then(() => {

    require('./src/model/index').sequelize;
})
    .catch(err => {
        logger.error('Unable to connect to the database:', err);
    });

module.exports = app;
