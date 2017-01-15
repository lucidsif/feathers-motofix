"use strict";
const base_1 = require("./base");
class Motorcycle extends base_1.default {
    getMotorcycles(offset, limit, filterByYear, filterByMake) {
        return this.connector.fetchPage('/vehicles/', offset, limit, filterByYear, filterByMake);
    }
    getMotorcycle(id, motorcycleID) {
        const url = `/vehicles/${motorcycleID}`;
        return this.connector.fetch(url);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Motorcycle;
//# sourceMappingURL=motorcycle.js.map