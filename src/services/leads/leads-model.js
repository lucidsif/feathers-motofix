'use strict';

// leads-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const leads = sequelize.define('leads', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true
    },
    dba: {
      type: Sequelize.STRING,
      allowNull: true
    },
    subscribed: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    underscored: true
  });

  return leads;
};
