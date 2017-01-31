'use strict';
const service = require('feathers-sequelize');
const users = require('./users-model');
const hooks = require('./hooks');
module.exports = function () {
    const app = this;
    const options = {
        Model: users(app.get('sequelize')),
        paginate: {
            default: 5,
            max: 25
        }
    };
    app.use('/users', service(options));
    const userService = app.service('/users');
    userService.before(hooks.before);
    userService.after(hooks.after);
};
//# sourceMappingURL=index.js.map