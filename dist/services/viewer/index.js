'use strict';
const hooks = require('./hooks');
class Service {
    constructor(options) {
        this.options = options || {};
    }
    find(params) {
        console.log('params inside viewer/index: ');
        console.log(token);
        return Promise.resolve(params);
    }
    get(id, params) {
        return Promise.resolve({
            id, text: `A new message with ID: ${id}!`
        });
    }
    create(data, params) {
        if (Array.isArray(data)) {
            return Promise.all(data.map(current => this.create(current)));
        }
        return Promise.resolve(data);
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
    app.use('/viewer', new Service());
    const viewerService = app.service('/viewer');
    viewerService.before(hooks.before);
    viewerService.after(hooks.after);
};
module.exports.Service = Service;
//# sourceMappingURL=index.js.map