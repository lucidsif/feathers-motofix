'use strict';
const Sequelize = require('sequelize');
module.exports = function (sequelize) {
    const user = sequelize.define('users', {
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
        }
    }, {
        freezeTableName: true
    });
    user.sync();
    return user;
};
//# sourceMappingURL=user-model.js.map