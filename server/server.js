var express = require('express');
var app = express();
var passport = require('passport');

// configure passport.
require('./config/passport.js')(passport);

// configure server with middleware.
require('./config/middleware.js')(app, express, passport);

// configure server with routing.

/* === connect database to server === */
var config = require('./db/config');
var sequelize = config.sequelize;
var controllers = require('./db/models/utilities/controllers')(sequelize, config.User);

require('./config/routes.js')(app, controllers);

/* === connect database to server === */
var { sequelize } = require('./db/config');

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Database connection has been established successfully.');
  })
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  });

/* IF YOU ARE WORKING WITH THIS CODE BASE FOR THE FIRST TIME, TO SET UP DATA BASE
MAKE SURE YOU ADD 'JOURNEY' TO MY SQL DATABASE! THEN UNCOMMENT BELOW CODE TO FORCE
DATABASE UPDATE! RECOMMENT AFTER YOU USE 'NPM START' ONCE. THEN RESTART YOUR SERVER 
AFTER RECOMMENTING BELOW CODE. */
// sequelize
//   .sync({ force: true })
//   .then(function(err) {
//     console.log('It worked!');
//   }, function (err) { 
//     console.log('An error occurred while creating the table:', err);
//   });

//start listening to requests on port 3000.
app.listen(3000, () => {
  console.log('Listening on Port: 3000');
  sequelize.sync().then(function() {
    console.log('Synced with mySQL through Sequelize.');
  });
});

module.exports = app;