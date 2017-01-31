'use strict';

// quotes-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const quotes = sequelize.define('quotes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fk_users_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    motorcycle_json: {
      type: Sequelize.JSONB
    },
    cart_json: {
      type: Sequelize.JSONB
    },
    part_json: {
      type: Sequelize.JSONB
    },
  }, {
    freezeTableName: true
  });

  return quotes;
};
