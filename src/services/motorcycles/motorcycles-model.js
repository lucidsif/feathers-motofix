'use strict';

// leads-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const motorcycles = sequelize.define('motorcycles', {
    year: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    make: {
      type: Sequelize.STRING,
      allowNull: false
    },
    model: {
      type: Sequelize.STRING,
      allowNull: false
    },
    submodel: {
      type: Sequelize.STRING,
      allowNull: false
    },
    detail: {
      type: Sequelize.STRING,
      allowNull: false
    },
    vehicletype: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    underscored: true
  });

  return motorcycles;
};
