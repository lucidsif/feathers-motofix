'use strict';
const Sequelize = require('sequelize');
module.exports = function (sequelize) {
    const users = sequelize.define('users', {
        facebookId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        googleId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mobile_number: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
        underscored: true,
    });
    return users;
};
//# sourceMappingURL=users-model.js.map