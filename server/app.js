require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

require('./config/passport-stuff');

mongoose
  .connect('mongodb://localhost/api-recipe-buyer', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// // default value for title local
// app.locals.title = 'Express - Generated with IronGenerator';

app.use(session({
  secret: "some secret goes here",
  resave: true,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());



app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'https://blah.herokuapp.com']
}));


const ingredientsRouteVar = require('./routes/ingredientsRoutes');
app.use('/api/ingredients', ingredientsRouteVar);

const recipeRouteVar = require('./routes/recipeRoutes')
app.use('/api/recipes', recipeRouteVar)

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', cartRoutes);


module.exports = app;
