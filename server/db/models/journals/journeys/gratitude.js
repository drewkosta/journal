var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Gratitude = sequelize.define('gratitudes', {
    entry: Sequelize.STRING(500),
    interface: Sequelize.STRING(10),
    datetime: Sequelize.DATE,
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    }
  });

  return Gratitude;
};