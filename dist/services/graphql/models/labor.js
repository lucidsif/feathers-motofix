"use strict";
const autoDataBase_1 = require("./autoDataBase");
class Labor extends autoDataBase_1.default {
    getMotorcycles(make, model, mid) {
        return this.connector.fetchMotorcycles('/', make, model, mid);
    }
    getEstimates(year, make, model, service) {
        return this.connector.fetchPage('/', year, make, model, service);
    }
    getEstimate() {
        const url = `/`;
        return this.connector.fetch(url);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Labor;
//# sourceMappingURL=labor.js.map