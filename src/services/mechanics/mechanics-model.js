'use strict';

// mechanics-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const mechanics = sequelize.define('mechanics', {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
    },
    zipcode: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    travel_radius: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    mobile_number: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    available: {
      type: Sequelize.BOOLEAN,
    }
  }, {
    underscored: true,
  }
  );

  return mechanics;
};
