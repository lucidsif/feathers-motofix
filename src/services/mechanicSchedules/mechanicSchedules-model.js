'use strict';

// mechanicSchedules-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const mechanicSchedules = sequelize.define('mechanicSchedules', {
    text: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  mechanicSchedules.sync();

  return mechanicSchedules;
};
