'use strict';
const Sequelize = require('sequelize');
module.exports = function (sequelize) {
    const vehicles = sequelize.define('vehicle', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        year: {
            type: Sequelize.INTEGER
        },
        make: {
            type: Sequelize.STRING
        },
        model: {
            type: Sequelize.STRING
        },
        submodel: {
            type: Sequelize.STRING
        },
        detail: {
            type: Sequelize.STRING
        },
        vehicletype: {
            type: Sequelize.STRING
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });
    vehicles.sync();
    return vehicles;
};
//# sourceMappingURL=vehicles-model.js.map