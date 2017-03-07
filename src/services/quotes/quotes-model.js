'use strict';

// quotes-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

// TODO: enforce required fields
// Should  I store price and labortimes here?
// Where should I store location?
module.exports = function(sequelize) {
  const quotes = sequelize.define('quotes', {
    // TODO: this should be non-nullable
    region: {
      type: Sequelize.STRING,
    },
    custom: {
      type: Sequelize.BOOLEAN,
    },
    total_labor_time: {
      type: Sequelize.INTEGER,
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
      type: Sequelize.JSONB,
      allowNull: false
    },
    cart_json: {
      type: Sequelize.JSONB,
      allowNull: false
    },
    part_json: {
      type: Sequelize.JSONB,
      allowNull: false
    },
    use_own_parts: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    voucher_code_status: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  }, {
    classMethods: {
      associate: (models) => {
        quotes.belongsTo(models.users, {
          foreignKey: {name: 'fk_user_id', allowNull: false},
        });
      },
    },
    underscored: true,
  });

  return quotes;
};
