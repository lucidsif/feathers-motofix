'use strict';
const Sequelize = require('sequelize');
module.exports = function (sequelize) {
    const mechanicSchedules = sequelize.define('mechanicSchedules', {
        day_of_week: {
            type: Sequelize.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
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
        available: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => {
                mechanicSchedules.belongsTo(models.mechanics, {
                    foreignKey: { name: 'fk_mechanic_id', allowNull: false },
                });
            },
        },
        tableName: 'mechanicSchedules',
        underscored: true,
    });
    return mechanicSchedules;
};
//# sourceMappingURL=mechanicSchedules-model.js.map