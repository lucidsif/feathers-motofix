'use strict';

// mechanicSchedules-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const mechanicSchedules = sequelize.define('mechanicSchedules', {
    day_of_week: {
      type: Sequelize.ENUM(
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
      ),
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
    break_start: {
      type: Sequelize.TIME,
      allowNull: false
    },
    break_end: {
      type: Sequelize.TIME,
      allowNull: false
    },
    unavailable: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        mechanicSchedules.belongsTo(models.mechanics, {
          foreignKey: 'fk_mechanic_id'
        });
      },
    },
    tableName: 'mechanicSchedules',
    underscored: true,
  });

  return mechanicSchedules;
};
