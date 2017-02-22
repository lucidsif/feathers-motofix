'use strict';
const hooks = require('./hooks');
const stripe = require('stripe')('sk_test_bKGsU9xuWYRuw7p8WlQ09yl9');
class Service {
    constructor(options) {
        this.options = options || {};
    }
    find(params) {
        return Promise.resolve([]);
    }
    get(id, params) {
        return Promise.resolve({
            id, text: `A new message with ID: ${id}!`
        });
    }
    create(data, params) {
        console.log(data);
        console.log(params);
    }
    update(id, data, params) {
        return Promise.resolve(data);
    }
    patch(id, data, params) {
        return Promise.resolve(data);
    }
    remove(id, params) {
        return Promise.resolve({ id });
    }
}
module.exports = function () {
    const app = this;
    app.use('/stripes', new Service());
    const stripeService = app.service('/stripes');
    stripeService.before(hooks.before);
    stripeService.after(hooks.after);
};
module.exports.Service = Service;
//# sourceMappingURL=index.js.map