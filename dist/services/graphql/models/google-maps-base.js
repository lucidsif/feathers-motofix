"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseModel {
    constructor(connector) {
        this.connector = connector;
    }
    getConnections(urls) {
        return this.connector.loader.loadMany(urls);
    }
    getConnection(url) {
        return this.connector.loader.load(url);
    }
}
exports.default = BaseModel;
//# sourceMappingURL=google-maps-base.js.map