'use strict';

// customQuotes-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const customQuotes = sequelize.define('customQuotes', {
    motorcycle: {
      type: Sequelize.STRING,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false
    },
    services: {
      type: Sequelize.STRING,
      allowNull: false
    },
    notes: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    completed: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  }, {
    freezeTableName: true,
    underscored: true
  });

  return customQuotes;
};
