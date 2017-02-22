'use strict';
const Sequelize = require('sequelize');
module.exports = function (sequelize) {
    const vehicles = sequelize.define('vehicle', {
        year: {
            type: Sequelize.INTEGER
        },
        make: {
            type: Sequelize.STRING
        },
        model: {
            type: Sequelize.STRING
        },
        sub_model: {
            type: Sequelize.STRING
        },
        detail: {
            type: Sequelize.STRING
        },
        vehicle_type: {
            type: Sequelize.STRING
        },
    }, {
        freezeTableName: true,
        underscored: true,
    });
    return vehicles;
};
//# sourceMappingURL=vehicles-model.js.map