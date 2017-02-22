'use strict';
const Sequelize = require('sequelize');
module.exports = function (sequelize) {
    const appointments = sequelize.define('appointments', {
        motorcycle_address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        estimated_start_time: {
            type: Sequelize.DATE,
            allowNull: false
        },
        estimated_end_time: {
            type: Sequelize.DATE,
            allowNull: false
        },
        actual_start_time: {
            type: Sequelize.DATE,
        },
        actual_end_time: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.ENUM('pending', 'completed', 'cancelled', 'refunded'),
            allowNull: false
        },
    }, {
        classMethods: {
            associate: (models) => {
                appointments.belongsTo(models.quotes, {
                    foreignKey: { name: 'fk_quote_id', allowNull: false },
                });
                appointments.belongsTo(models.mechanics, {
                    foreignKey: { name: 'fk_mechanic_id', allowNull: false },
                });
                appointments.belongsTo(models.users, {
                    foreignKey: { name: 'fk_user_id', allowNull: false },
                });
            },
        },
        underscored: true,
    });
    return appointments;
};
//# sourceMappingURL=appointments-model.js.map