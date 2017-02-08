'use strict';

// MechanicSchedules-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const MechanicSchedules = sequelize.define('MechanicSchedules', {
    text: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  MechanicSchedules.sync();

  return MechanicSchedules;
};
