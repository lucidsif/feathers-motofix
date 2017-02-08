'use strict';

// quotes-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');


// Should  I store price and labortimes here?
// Where should I store location?
module.exports = function(sequelize) {
  const quotes = sequelize.define('quotes', {
    region: {
      type: Sequelize.STRING,
    },
    custom: {
      type: Sequelize.BOOLEAN,
    },
    total_labor_time: {
      type: Sequelize.INTEGER
    },
    total_labor_price: {
      type: Sequelize.INTEGER
    },
    total_parts_price: {
      type: Sequelize.INTEGER
    },
    total_price: {
      type: Sequelize.INTEGER
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
    classMethods: {
      associate: (models) => {
        quotes.belongsTo(models.users, {
          foreignKey: 'fk_user_id'
        });
      },
    },
    underscored: true,
  });

  return quotes;
};
