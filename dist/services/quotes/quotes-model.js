'use strict';
const Sequelize = require('sequelize');
module.exports = function (sequelize) {
    const quotes = sequelize.define('quotes', {
        region: {
            type: Sequelize.STRING,
        },
        custom: {
            type: Sequelize.BOOLEAN,
        },
        total_labor_time: {
            type: Sequelize.INTEGER,
        },
        total_labor_price: {
            type: Sequelize.INTEGER
        },
        total_parts_price: {
            type: Sequelize.INTEGER
        },
        total_price: {
            type: Sequelize.INTEGER
        },
        motorcycle_json: {
            type: Sequelize.JSONB,
            allowNull: false
        },
        cart_json: {
            type: Sequelize.JSONB,
            allowNull: false
        },
        part_json: {
            type: Sequelize.JSONB,
            allowNull: false
        },
        use_own_parts: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        created_at: {
            type: Sequelize.DATE,
        },
        updated_at: {
            type: Sequelize.DATE,
        },
    }, {
        classMethods: {
            associate: (models) => {
                quotes.belongsTo(models.users, {
                    foreignKey: { name: 'fk_user_id', allowNull: false },
                });
            },
        },
        underscored: true,
    });
    return quotes;
};
//# sourceMappingURL=quotes-model.js.map