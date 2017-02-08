'use strict';

// appointments-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const appointments = sequelize.define('appointments', {
    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    start_time: {
      type: Sequelize.TIME,
      allowNull: false
    },
    end_time: {
      type: Sequelize.TIME,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM(
        'pending', 'completed', 'cancelled'
      ),
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        appointments.belongsTo(models.quotes, {
          foreignKey: 'fk_quote_id',
        });
        appointments.belongsTo(models.mechanics, {
          foreignKey: 'fk_mechanic_id'
        });
      },
    },
    underscored: true,
  });

  return appointments;
};
