'use strict';
const Sequelize = require('sequelize');
module.exports = function (sequelize) {
    const leads = sequelize.define('leads', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        dba: {
            type: Sequelize.STRING,
            allowNull: true
        },
        subscribed: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        underscored: true
    });
    return leads;
};
//# sourceMappingURL=leads-model.js.map