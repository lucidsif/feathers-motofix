"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseModel;
//# sourceMappingURL=base.js.map