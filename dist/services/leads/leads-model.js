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
        }
    }, {
        freezeTableName: true
    });
    return leads;
};
//# sourceMappingURL=leads-model.js.map