"use strict";
const autoDataBase_1 = require("./autoDataBase");
class Labor extends autoDataBase_1.default {
    getEstimates(year, make, model, service) {
        return this.connector.fetchPage('/users', year, make, model, service);
    }
    getEstimate() {
        const url = `/users`;
        return this.connector.fetch(url);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Labor;
//# sourceMappingURL=labor.js.map