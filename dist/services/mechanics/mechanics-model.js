'use strict';
const Sequelize = require('sequelize');
module.exports = function (sequelize) {
    const mechanics = sequelize.define('mechanics', {
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
        },
        zipcode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        travel_radius: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        mobile_number: {
            type: Sequelize.STRING,
            allowNull: false
        },
        available: {
            type: Sequelize.BOOLEAN,
        }
    }, {
        underscored: true,
    });
    return mechanics;
};
//# sourceMappingURL=mechanics-model.js.map